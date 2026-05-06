// Re-encodes each upscaled PNG in tools/upscaled/ at quality 90 and
// writes it back over the original public/images file with the same
// extension. Reports the size and dimension change per file.
//
// Caps width at MAX_DIMENSION since next/image will resize down at
// request time anyway, and oversized source files just bloat the repo.

import { copyFile, stat, unlink, mkdir, rename } from "node:fs/promises";
import { dirname, resolve, basename, extname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const TMP = resolve(ROOT, "tools/upscaled");
const BACKUP = resolve(ROOT, "tools/originals-backup");

const MAX_DIMENSION = 2400;

const TARGETS = [
  "public/images/topics/dry-cleaning-rack.jpg",
  "public/images/topics/suits.jpg",
  "public/images/topics/alterations.jpg",
  "public/images/topics/petrochemical-free.png",
];

await mkdir(BACKUP, { recursive: true });

for (const src of TARGETS) {
  const srcAbs = resolve(ROOT, src);
  const stem = basename(src, extname(src));
  const ext = extname(src).toLowerCase();
  const upscaledPng = resolve(TMP, `${stem}.png`);
  const backupPath = resolve(BACKUP, basename(src));

  const beforeStat = await stat(srcAbs);
  const beforeMeta = await sharp(srcAbs).metadata();

  // Backup original
  await copyFile(srcAbs, backupPath);

  // Re-encode and overwrite
  let pipeline = sharp(upscaledPng);
  const upMeta = await pipeline.metadata();
  if (upMeta.width && upMeta.width > MAX_DIMENSION) {
    pipeline = pipeline.resize({ width: MAX_DIMENSION, withoutEnlargement: true });
  }
  const tmpPath = srcAbs + ".tmp";
  if (ext === ".png") {
    await pipeline.png({ compressionLevel: 9, palette: false }).toFile(tmpPath);
  } else {
    await pipeline.jpeg({ quality: 90, mozjpeg: true }).toFile(tmpPath);
  }
  // Delete then rename — Windows refuses to copy onto a file that
  // might still be held open by a watcher/AV scan, but unlink+rename
  // succeeds.
  await unlink(srcAbs).catch(() => {});
  await rename(tmpPath, srcAbs);

  const afterStat = await stat(srcAbs);
  const afterMeta = await sharp(srcAbs).metadata();
  console.log(
    `${src}: ${beforeMeta.width}x${beforeMeta.height} ${(beforeStat.size / 1024).toFixed(0)}KB ` +
    `-> ${afterMeta.width}x${afterMeta.height} ${(afterStat.size / 1024).toFixed(0)}KB`
  );
}

console.log("\nOriginals backed up to tools/originals-backup/ in case revert is needed.");
