// Fetches verbatim blog post bodies from gogreendrycleaners.net via the
// r.jina.ai reader proxy (the source is behind Sucuri and refuses direct
// fetches from non-browser clients). Writes each post to
// content/blog-bodies/<slug>.md as a markdown document. Idempotent: skips
// files that already exist unless --force is passed.
//
// Usage: node scripts/fetch-blog-bodies.mjs [--force] [--only=<slug>]

import { mkdir, writeFile, access } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT_DIR = resolve(ROOT, "content", "blog-bodies");

const FORCE = process.argv.includes("--force");
const ONLY = process.argv.find((a) => a.startsWith("--only="))?.split("=")[1];

const POSTS = [
  ["eco-friendly-dry-cleaning-in-florida-garment-care", "uncategorized"],
  ["how-our-petrochemical-free-dry-cleaning-process-protects-delicate-fabrics", "blog"],
  ["how-to-care-for-your-business-attire-professional-clothing-tips-for-the-modern-workforce", "blog"],
  ["wedding-dress-care-why-eco-friendly-cleaning-is-the-best-way-to-preserve-memories", "blog"],
  ["why-eco-friendly-dry-cleaning-is-the-future-of-fashion-retail-partnerships", "blog"],
  ["sustainable-living-starts-in-your-closet-how-small-choices-make-a-big-impact", "blog"],
  ["eco-friendly-dry-cleaning-myths-separating-fact-from-fiction", "blog"],
  ["the-truth-about-eco-friendly-labels-in-dry-cleaning-what-to-look-for", "blog"],
  ["behind-the-scenes-how-go-green-dry-cleaners-protects-your-clothes-and-the-planet", "blog"],
  ["go-green-dry-cleaners-expands-in-south-florida-new-locations-coming-soon", "blog"],
  ["eco-friendly-dry-cleaning-in-palm-beach-county", "blog"],
  ["eco-friendly-dry-cleaning-in-miami-sustainable-garment-care-you-can-trust", "blog"],
  ["eco-friendly-dry-cleaning-in-new-york-serving-brewster-cortlandt-manor-larchmont-pelham", "blog"],
  ["eco-friendly-vs-traditional-dry-cleaning-whats-the-real-difference-going-green-makes", "blog"],
  ["the-future-of-fashion-care-why-eco-friendly-dry-cleaning-matters", "blog"],
  ["make-your-clothes-last-longer-with-eco-friendly-dry-cleaning-tips-for-south-florida-and-new-york-lifestyles", "blog"],
  ["5-signs-its-time-to-take-your-clothes-to-the-cleaner", "blog"],
  ["how-green-dry-cleaning-extends-life-of-clothes", "blog"],
  ["is-dry-cleaning-delivery-the-solution-to-your-busy-life", "blog"],
  ["how-can-dry-cleaning-save-you-money-and-time", "blog"],
  ["tips-for-choosing-the-right-dry-cleaning-service", "blog"],
  ["freshen-up-your-style-the-power-of-regular-dry-cleaning", "blog"],
  ["dry-cleaning-myths-what-you-need-to-know", "blog"],
  ["top-10-items-you-can-take-to-the-dry-cleaners", "blog"],
  ["eco-friendly-dry-cleaning-in-connecticut-stamford-norwalk-harbour-point", "blog"],
  ["why-south-florida-and-tri-state-residents-are-going-green-with-their-dry-cleaning", "blog"],
  ["how-to-get-special-event-clothing-cleaning-done-the-right-way", "blog"],
  ["cleaning-up-our-act-the-eco-friendly-revolution-in-dry-cleaning", "blog"],
  ["dapper-delicate-unveiling-the-secrets-of-expert-dry-cleaning", "blog"],
];

const BASE = "https://gogreendrycleaners.net";
const PROXY = "https://r.jina.ai/";

async function fileExists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function fetchOne(slug, segment) {
  const sourceUrl = `${BASE}/${segment}/${slug}/`;
  const proxied = `${PROXY}${sourceUrl}`;
  const res = await fetch(proxied, {
    headers: {
      // Plain text reader output is more parseable than markdown for
      // our use case, but the default markdown is fine too.
      "User-Agent": "GoGreenBlogMigrator/1.0",
    },
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${sourceUrl}`);
  }
  return await res.text();
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const targets = ONLY ? POSTS.filter(([s]) => s === ONLY) : POSTS;
  if (ONLY && targets.length === 0) {
    console.error(`No post matches --only=${ONLY}`);
    process.exit(1);
  }

  let written = 0;
  let skipped = 0;
  let failed = 0;

  for (const [slug, segment] of targets) {
    const outPath = resolve(OUT_DIR, `${slug}.md`);
    if (!FORCE && (await fileExists(outPath))) {
      skipped++;
      console.log(`skip   ${slug}`);
      continue;
    }
    try {
      process.stdout.write(`fetch  ${slug} ... `);
      const md = await fetchOne(slug, segment);
      await writeFile(outPath, md, "utf8");
      written++;
      console.log(`ok (${md.length} bytes)`);
    } catch (err) {
      failed++;
      console.log(`FAIL: ${err.message}`);
    }
    // Polite spacing between requests
    await new Promise((r) => setTimeout(r, 800));
  }

  console.log(`\nDone. written=${written} skipped=${skipped} failed=${failed}`);
  if (failed > 0) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
