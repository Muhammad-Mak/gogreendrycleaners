// Parses markdown files in content/blog-bodies/*.md into a typed
// structure (paragraphs, h2, h3, lists) and emits a single TypeScript
// module at src/data/blog-bodies.ts. The blog detail page renders this
// structure into HTML.
//
// Strips:
//   - Title/URL/Published metadata header lines from the Jina reader
//   - "Markdown Content:" preamble
//   - Social-media follow blocks (### Follow us on Social Media + image links)
//   - Footer browse/services menus and copyright
//   - Inline images
//   - All raw URLs and link wrappers (keeps the link text only)
//
// Preserves:
//   - Bold (**text**) — emitted as <strong>
//   - Headings (## h2, ### h3)
//   - Bulleted lists (* item) and ordered lists (1. item)
//   - Paragraph breaks

import { readFile, writeFile, readdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const IN_DIR = resolve(ROOT, "content", "blog-bodies");
const OUT_FILE = resolve(ROOT, "src", "data", "blog-bodies.ts");

const STUB_THRESHOLD = 1500; // bytes — anything smaller is a Jina-truncated stub
const STUB_MARKER = "Dry cleaning plays an essential role"; // appears in stub teasers

const SKIP_HEADINGS = new Set([
  "Follow us on Social Media",
  "Browse",
  "Our Services",
  "Contact",
  "Address",
]);

function stripInline(s) {
  // Convert markdown links [text](url) -> text
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");
  // Strip raw image syntax
  s = s.replace(/!\[[^\]]*\]\([^)]*\)/g, "");
  // Normalise stray multi-asterisk runs (***, ****, ******) down to **
  // The source HTML often had adjacent <strong> blocks that markdown
  // serialised as ****Why Care:****Eco-friendly... — produces unbalanced
  // bold spans. Collapse runs of 3+ stars to 2 so we always end up with
  // even pairs.
  s = s.replace(/\*{3,}/g, "**");
  // Drop empty bold runs ** ** -> nothing
  s = s.replace(/\*\*\s*\*\*/g, "");
  // Ensure space between consecutive bold→plain transitions like
  // "**Why Care:**Eco-friendly..." → "**Why Care:** Eco-friendly..."
  s = s.replace(/\*\*([^*]+?)\*\*([A-Za-z])/g, "**$1** $2");
  // Collapse multiple spaces
  s = s.replace(/\s+/g, " ").trim();
  return s;
}

function cleanHeadingText(s) {
  // Strip leading/trailing **bold** wrappers around heading text
  s = s.replace(/^\*\*(.+?)\*\*$/, "$1");
  return stripInline(s).trim();
}

function parseMarkdown(md, slug) {
  const lines = md.split(/\r?\n/);

  // Skip header (Title/URL/Published Time) until "Markdown Content:" line
  let i = 0;
  while (i < lines.length && !/^Markdown Content:/i.test(lines[i])) i++;
  i++; // skip the marker line itself

  const nodes = [];
  let listBuf = null; // { type: "ul" | "ol", items: [...] }

  const flushList = () => {
    if (listBuf && listBuf.items.length > 0) {
      nodes.push({ type: listBuf.type, items: listBuf.items });
    }
    listBuf = null;
  };

  for (; i < lines.length; i++) {
    const raw = lines[i];
    const line = raw.trim();
    if (!line) {
      flushList();
      continue;
    }

    // Skip image markdown lines wholesale
    if (/^!\[/.test(line)) continue;

    // Skip plain link-only lines (social media badge images wrapped in links)
    if (/^\[!\[/.test(line)) continue;

    // Heading detection
    const h2 = line.match(/^##\s+(.+)$/);
    const h3 = line.match(/^###\s+(.+)$/);
    const h4 = line.match(/^####\s+(.+)$/);

    if (h2 || h3 || h4) {
      flushList();
      const rawText = (h2 || h3 || h4)[1];
      const text = cleanHeadingText(rawText);
      // Skip junk headings (footer menus, social blocks)
      if (SKIP_HEADINGS.has(text)) continue;
      // Stop once we hit footer-y headings that always appear at the end
      if (/^Browse$|^Our Services$|^Follow us/i.test(text)) continue;
      const type = h2 ? "h2" : "h3"; // collapse h4 to h3
      nodes.push({ type, text });
      continue;
    }

    // Bullet list
    if (/^\*\s+/.test(line) || /^-\s+/.test(line)) {
      const item = stripInline(line.replace(/^[*-]\s+/, ""));
      if (!listBuf || listBuf.type !== "ul") {
        flushList();
        listBuf = { type: "ul", items: [] };
      }
      listBuf.items.push(item);
      continue;
    }

    // Ordered list
    const ol = line.match(/^\d+\.\s+(.+)$/);
    if (ol) {
      const item = stripInline(ol[1]);
      if (!listBuf || listBuf.type !== "ol") {
        flushList();
        listBuf = { type: "ol", items: [] };
      }
      listBuf.items.push(item);
      continue;
    }

    // Skip copyright footer
    if (/^©\s*\d{4}/.test(line)) {
      flushList();
      // Everything after the copyright is footer junk; bail.
      break;
    }

    // Skip anything that looks like a footer menu link list
    if (/^GoGreen Dry Cleaners(™)? makes things easier/i.test(line)) {
      // Stop at the canonical footer paragraph
      flushList();
      break;
    }

    // Default: paragraph
    flushList();
    const text = stripInline(line);
    if (!text) continue;
    nodes.push({ type: "p", text });
  }

  flushList();

  // Drop trailing FAQ if it became an empty heading at end
  while (nodes.length > 0 && (nodes[nodes.length - 1].type === "h2" || nodes[nodes.length - 1].type === "h3")) {
    nodes.pop();
  }

  return nodes;
}

async function main() {
  const files = (await readdir(IN_DIR)).filter((f) => f.endsWith(".md")).sort();
  const bodies = {};
  let realCount = 0;
  let stubCount = 0;

  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    const path = resolve(IN_DIR, file);
    const md = await readFile(path, "utf8");

    if (md.length < STUB_THRESHOLD || md.includes(STUB_MARKER)) {
      stubCount++;
      continue; // leave body undefined; page falls back to excerpt
    }

    const nodes = parseMarkdown(md, slug);
    if (nodes.length < 3) {
      stubCount++;
      continue;
    }
    bodies[slug] = nodes;
    realCount++;
  }

  // Emit TypeScript module
  const banner =
    "// AUTO-GENERATED by scripts/parse-blog-bodies.mjs — do not edit by hand.\n" +
    "// Regenerate after re-running scripts/fetch-blog-bodies.mjs.\n\n";

  const types =
    "export type BlogBodyNode =\n" +
    "  | { type: \"p\"; text: string }\n" +
    "  | { type: \"h2\"; text: string }\n" +
    "  | { type: \"h3\"; text: string }\n" +
    "  | { type: \"ul\" | \"ol\"; items: string[] };\n\n";

  const body =
    `export const blogBodies: Record<string, BlogBodyNode[]> = ${JSON.stringify(bodies, null, 2)};\n`;

  await writeFile(OUT_FILE, banner + types + body, "utf8");

  console.log(`Wrote ${OUT_FILE}`);
  console.log(`real=${realCount} stubs=${stubCount} total=${files.length}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
