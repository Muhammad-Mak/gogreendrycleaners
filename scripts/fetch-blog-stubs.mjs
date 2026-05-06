// Six posts on the source site duplicated their slugs — the canonical
// (full) version lives at the -2 / -services / -choose alternate URL.
// This script overwrites the stub bodies with the canonical content,
// while keeping our slug stable.

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT_DIR = resolve(ROOT, "content", "blog-bodies");

const REPLACEMENTS = [
  ["how-can-dry-cleaning-save-you-money-and-time", "how-can-dry-cleaning-save-you-money-and-time-2"],
  ["tips-for-choosing-the-right-dry-cleaning-service", "tips-for-choosing-the-right-dry-cleaning-service-choose"],
  ["freshen-up-your-style-the-power-of-regular-dry-cleaning", "freshen-up-your-style-the-power-of-regular-dry-cleaning-2"],
  ["dry-cleaning-myths-what-you-need-to-know", "dry-cleaning-myths-what-you-need-to-know-services"],
  ["cleaning-up-our-act-the-eco-friendly-revolution-in-dry-cleaning", "cleaning-up-our-act-the-eco-friendly-revolution-in-dry-cleaning-2"],
  ["dapper-delicate-unveiling-the-secrets-of-expert-dry-cleaning", "dapper-delicate-unveiling-the-secrets-of-expert-dry-cleaning-2"],
];

const PROXY = "https://r.jina.ai/";
const BASE = "https://gogreendrycleaners.net/blog/";

await mkdir(OUT_DIR, { recursive: true });

for (const [ourSlug, sourceSlug] of REPLACEMENTS) {
  const url = `${PROXY}${BASE}${sourceSlug}/`;
  process.stdout.write(`fetch  ${ourSlug} <- ${sourceSlug} ... `);
  const res = await fetch(url, { headers: { "User-Agent": "GoGreenBlogMigrator/1.0" } });
  if (!res.ok) {
    console.log(`FAIL HTTP ${res.status}`);
    continue;
  }
  const md = await res.text();
  await writeFile(resolve(OUT_DIR, `${ourSlug}.md`), md, "utf8");
  console.log(`ok (${md.length} bytes)`);
  await new Promise((r) => setTimeout(r, 800));
}
