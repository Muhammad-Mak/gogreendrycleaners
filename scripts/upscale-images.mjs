// Runs Real-ESRGAN on the small site images, then re-encodes the output
// to the original format/quality and replaces the source files in place.
//
// Two-step pipeline so we can visually QA the upscaled PNGs in
// tools/upscaled/ before letting the script overwrite originals.
//
// Usage: node scripts/upscale-images.mjs [--dry-run] [--no-replace]

import { spawn } from "node:child_process";
import { mkdir, copyFile, stat, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve, basename, extname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const BIN = resolve(ROOT, "tools/realesrgan/realesrgan-ncnn-vulkan.exe");
const MODELS = resolve(ROOT, "tools/realesrgan/models");
const TMP = resolve(ROOT, "tools/upscaled");

const DRY_RUN = process.argv.includes("--dry-run");
const NO_REPLACE = process.argv.includes("--no-replace");

// Files to upscale. scale=4 (default Real-ESRGAN-x4plus); we'll then
// downscale slightly with sharp if the resulting dimensions are
// excessive for the target display size.
const TARGETS = [
  { src: "public/images/services/geotagged-1.jpg", scale: 4 },
  { src: "public/images/services/geotagged-2.jpg", scale: 4 },
  { src: "public/images/services/geotagged-3.jpg", scale: 4 },
  { src: "public/images/services/geotagged-4.jpg", scale: 4 },
  { src: "public/images/services/geotagged-5.jpg", scale: 4 },
  { src: "public/images/services/geotagged-6.jpg", scale: 4 },
  { src: "public/images/services/geotagged-7.jpg", scale: 4 },
  { src: "public/images/topics/dry-cleaning-rack.jpg", scale: 2 },
  { src: "public/images/topics/suits.jpg", scale: 2 },
  { src: "public/images/topics/alterations.jpg", scale: 2 },
  { src: "public/images/topics/petrochemical-free.png", scale: 2 },
];

// Maximum pixel dimensions after re-encode. next/image will resize down
// further at request time; this just keeps source files reasonable.
const MAX_DIMENSION = 2400;

function runUpscaler(srcAbs, dstAbs, scale) {
  return new Promise((resolveProm, reject) => {
    const args = [
      "-i", srcAbs,
      "-o", dstAbs,
      "-n", "realesrgan-x4plus",
      "-s", String(scale),
      "-m", MODELS,
      // Tile size — auto (0) picks values too small on integrated GPUs
      // and produces visible tile seams on uniform backgrounds. 1200
      // fits any of our source dimensions in a single tile, eliminating
      // the seams entirely.
      "-t", "1200",
    ];
    const proc = spawn(BIN, args, { stdio: ["ignore", "pipe", "pipe"] });
    let stderr = "";
    proc.stderr.on("data", (d) => {
      stderr += d.toString();
    });
    proc.on("close", (code) => {
      if (code === 0) resolveProm();
      else reject(new Error(`upscaler exited ${code}\n${stderr.slice(-500)}`));
    });
    proc.on("error", reject);
  });
}

async function reencode(upscaledPng, outOriginal) {
  // Read upscaled PNG, optionally downscale if larger than MAX_DIMENSION,
  // then re-encode to the original extension at quality 90.
  const ext = extname(outOriginal).toLowerCase();
  let pipeline = sharp(upscaledPng);
  const meta = await pipeline.metadata();
  if (meta.width && meta.width > MAX_DIMENSION) {
    pipeline = pipeline.resize({ width: MAX_DIMENSION, withoutEnlargement: true });
  }

  if (ext === ".png") {
    await pipeline.png({ compressionLevel: 9, palette: false }).toFile(outOriginal + ".tmp");
  } else {
    await pipeline.jpeg({ quality: 90, mozjpeg: true }).toFile(outOriginal + ".tmp");
  }

  // Move the temp on top of the original
  await copyFile(outOriginal + ".tmp", outOriginal);
  const { unlink } = await import("node:fs/promises");
  await unlink(outOriginal + ".tmp");
}

async function main() {
  await mkdir(TMP, { recursive: true });

  let okCount = 0, failCount = 0;
  const results = [];

  for (const { src, scale } of TARGETS) {
    const srcAbs = resolve(ROOT, src);
    const stem = basename(src, extname(src));
    const upPng = resolve(TMP, `${stem}.png`);

    try {
      const beforeStat = await stat(srcAbs);
      const beforeMeta = await sharp(srcAbs).metadata();

      process.stdout.write(`upscale  ${src} (×${scale}) ... `);
      if (!DRY_RUN) {
        await runUpscaler(srcAbs, upPng, scale);
      }
      const upMeta = !DRY_RUN ? await sharp(upPng).metadata() : { width: beforeMeta.width * scale, height: beforeMeta.height * scale };
      console.log(`-> ${upMeta.width}x${upMeta.height}`);

      if (!NO_REPLACE && !DRY_RUN) {
        process.stdout.write(`replace  ${src} ... `);
        await reencode(upPng, srcAbs);
        const afterStat = await stat(srcAbs);
        const afterMeta = await sharp(srcAbs).metadata();
        console.log(`${beforeMeta.width}x${beforeMeta.height} ${(beforeStat.size / 1024).toFixed(0)}KB -> ${afterMeta.width}x${afterMeta.height} ${(afterStat.size / 1024).toFixed(0)}KB`);
        results.push({ src, before: `${beforeMeta.width}x${beforeMeta.height} ${(beforeStat.size / 1024).toFixed(0)}KB`, after: `${afterMeta.width}x${afterMeta.height} ${(afterStat.size / 1024).toFixed(0)}KB` });
      }
      okCount++;
    } catch (err) {
      failCount++;
      console.log(`FAIL: ${err.message.split("\n")[0]}`);
    }
  }

  console.log(`\nDone. ok=${okCount} fail=${failCount}`);
  if (results.length > 0) {
    console.log("\nSummary:");
    for (const r of results) console.log(`  ${r.src}: ${r.before} -> ${r.after}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
