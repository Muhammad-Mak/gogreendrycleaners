// Lanczos + sharpen upscale for the 4 topic images that produce tile
// artifacts on Real-ESRGAN-ncnn-vulkan. No AI but no seams either —
// clean smooth upscale that we then sharpen lightly to recover crispness.
//
// Output goes to tools/upscaled/<stem>.png so the replace step picks
// these up alongside the AI-upscaled geotagged ones.

import { mkdir } from "node:fs/promises";
import { dirname, resolve, basename, extname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const TMP = resolve(ROOT, "tools/upscaled");

const TARGETS = [
  "public/images/topics/dry-cleaning-rack.jpg",
  "public/images/topics/suits.jpg",
  "public/images/topics/alterations.jpg",
  "public/images/topics/petrochemical-free.png",
];

await mkdir(TMP, { recursive: true });

for (const src of TARGETS) {
  const srcAbs = resolve(ROOT, src);
  const stem = basename(src, extname(src));
  const dst = resolve(TMP, `${stem}.png`);

  const meta = await sharp(srcAbs).metadata();
  const targetW = Math.round((meta.width ?? 1000) * 2);
  const targetH = Math.round((meta.height ?? 1000) * 2);

  await sharp(srcAbs)
    .resize(targetW, targetH, { kernel: sharp.kernel.lanczos3 })
    // Mild unsharp mask — sigma 1.0, flat 1.0, jagged 2.0
    .sharpen({ sigma: 1.0, m1: 1.0, m2: 2.0 })
    .png({ compressionLevel: 9 })
    .toFile(dst);

  console.log(`upscaled ${src} -> ${targetW}x${targetH}`);
}
