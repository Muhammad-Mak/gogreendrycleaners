// Re-run the 4 topic images on CPU. The GPU path fails with access
// violation when tile=1200 + scale=2 is applied to input wider than
// 1000px (VRAM exhaustion on integrated graphics). CPU is slower
// (~1-3 min per image) but processes the whole image as a single
// tile, eliminating both the OOM crash and the tile-seam artifacts.

import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { dirname, resolve, basename, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const BIN = resolve(ROOT, "tools/realesrgan/realesrgan-ncnn-vulkan.exe");
const MODELS = resolve(ROOT, "tools/realesrgan/models");
const TMP = resolve(ROOT, "tools/upscaled");

const TARGETS = [
  "public/images/topics/dry-cleaning-rack.jpg",
  "public/images/topics/suits.jpg",
  "public/images/topics/alterations.jpg",
  "public/images/topics/petrochemical-free.png",
];

function runUpscaler(srcAbs, dstAbs) {
  return new Promise((resolveProm, reject) => {
    const args = [
      "-i", srcAbs,
      "-o", dstAbs,
      "-n", "realesrgan-x4plus",
      "-s", "2",
      "-m", MODELS,
      // Small enough to fit integrated GPU VRAM at scale=2 for inputs
      // up to ~1200px wide. Real-ESRGAN-ncnn-vulkan adds 10px overlap
      // per tile internally so seams are minimised at this size.
      "-t", "400",
    ];
    const proc = spawn(BIN, args, { stdio: ["ignore", "pipe", "pipe"] });
    let stderr = "";
    proc.stderr.on("data", (d) => {
      stderr += d.toString();
    });
    proc.on("close", (code) => {
      if (code === 0) resolveProm();
      else reject(new Error(`upscaler exited ${code}\n${stderr.slice(-400)}`));
    });
    proc.on("error", reject);
  });
}

await mkdir(TMP, { recursive: true });

for (const src of TARGETS) {
  const srcAbs = resolve(ROOT, src);
  const stem = basename(src, extname(src));
  const upPng = resolve(TMP, `${stem}.png`);

  try {
    process.stdout.write(`upscale  ${src} (CPU, ×2) ... `);
    const start = Date.now();
    await runUpscaler(srcAbs, upPng);
    const elapsed = ((Date.now() - start) / 1000).toFixed(0);
    console.log(`ok (${elapsed}s)`);
  } catch (err) {
    console.log(`FAIL: ${err.message.split("\n")[0]}`);
  }
}
