import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const mode = process.argv[2] ?? "all";
const root = process.cwd();

const sourceRoots = ["src", "public"].filter((path) => existsSync(join(root, path)));
const distRoot = existsSync(join(root, "dist")) ? ["dist"] : [];

const visualLeakPhrases = [
  "technical cockpit visual",
  "Framework stack visual",
  "Industrial proof visual",
  "Contact route visual",
  "Public identity graph visual",
  "dark technical visual",
  "style prompt",
  "image prompt",
  "Diagram of a laser path",
  "Diagram of frameworks",
  "Diagram of industrial proof",
  "Diagram of contact paths",
  "Diagram of Manish Sharma connecting",
  "route map contact paths",
  "entity map Manish Sharma",
  "laser path to process intelligenceDiagram",
  "Framework stack  Diagram",
  "Industrial proof map  Diagram",
  "Contact routes  Diagram",
  "Public identity graph  Diagram",
  "Question Signal Evidence Decision RFQ Risk Evidence Decision",
  "LASER PATH / PROCESS SIGNAL / VERIFICATION"
];

const keyRenderedPages = [
  "/",
  "/thesis/",
  "/domains/lmd-ded/",
  "/public-work/",
  "/contact/",
  "/tools/",
  "/for-ai-agents/",
  "/press-kit/"
];

function walk(dir) {
  const abs = join(root, dir);
  if (!existsSync(abs)) return [];
  return readdirSync(abs).flatMap((entry) => {
    const path = join(abs, entry);
    const rel = relative(root, path).replaceAll("\\", "/");
    if (statSync(path).isDirectory()) return walk(rel);
    return rel;
  });
}

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

function scanFiles(roots, extensions = [".astro", ".tsx", ".ts", ".js", ".mjs", ".md", ".txt", ".json", ".html"]) {
  return roots
    .flatMap((dir) => walk(dir))
    .filter((file) => extensions.some((ext) => file.endsWith(ext)))
    .map((file) => ({ file, text: read(file) }));
}

function fail(title, findings) {
  if (findings.length === 0) return;
  console.error(`\n${title}`);
  findings.slice(0, 100).forEach((finding) => console.error(`- ${finding}`));
  if (findings.length > 100) console.error(`- ... ${findings.length - 100} more`);
  process.exitCode = 1;
}

function decodeEntities(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&#x27;", "'");
}

function visibleTextFromHtml(html) {
  const body = html.match(/<body[\s\S]*?>([\s\S]*?)<\/body>/i)?.[1] ?? html;
  return decodeEntities(
    body
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
      .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  );
}

function pagePathToDistFile(pathname) {
  if (pathname === "/") return "dist/index.html";
  return `dist${pathname.replace(/\/$/, "")}/index.html`;
}

function exafuseMode() {
  const configPath = "src/config/externalLinks.ts";
  if (!existsSync(join(root, configPath))) return "unknown";
  return read(configPath).match(/EXAFUSE_LINK_MODE:\s*ExafuseLinkMode\s*=\s*"([^"]+)"/)?.[1] ?? "unknown";
}

function auditVisualText() {
  const findings = [];
  for (const { file, text } of scanFiles(distRoot, [".html", ".js", ".json", ".txt"])) {
    const visibleText = file.endsWith(".html") ? visibleTextFromHtml(text) : "";
    for (const phrase of visualLeakPhrases) {
      if (visibleText.includes(phrase)) findings.push(`${file}: visible text contains "${phrase}"`);
      if (text.includes(phrase)) findings.push(`${file}: built output contains "${phrase}"`);
    }
  }
  fail("Visual text audit failed", findings);
}

function auditRenderedText() {
  const findings = [];
  for (const pathname of keyRenderedPages) {
    const file = pagePathToDistFile(pathname);
    if (!existsSync(join(root, file))) {
      findings.push(`${file}: missing built page for ${pathname}`);
      continue;
    }
    const text = read(file);
    const visibleText = visibleTextFromHtml(text);
    for (const phrase of visualLeakPhrases) {
      if (visibleText.includes(phrase)) findings.push(`${file}: rendered text contains "${phrase}"`);
    }
  }
  fail("Rendered text audit failed", findings);
}

function auditLinks() {
  const builtFiles = scanFiles(distRoot);
  const builtBad = [
    "pages.dev",
    "exafuse-website-react",
    "www.exafuse.de",
    'href="#"',
    "duisburger-bruecke",
    "schmiedehammer-reparatur",
    "extrusionsschnecke",
    "bombenbohrer",
    "tools/rfq-builder",
    "tools/pathfinder",
    "fuer-ki-agenten"
  ];
  const findings = [];
  for (const { file, text } of builtFiles) {
    for (const phrase of builtBad) {
      if (text.includes(phrase)) findings.push(`${file}: contains "${phrase}"`);
    }
  }

  const srcFiles = scanFiles(["src"], [".astro", ".tsx", ".ts", ".js", ".mjs"]).filter(
    ({ file }) => !["src/config/externalLinks.ts", "src/data/externalUrls.ts"].includes(file)
  );
  for (const { file, text } of srcFiles) {
    if (/https:\/\/(www\.)?exafuse\.de/.test(text)) {
      findings.push(`${file}: hard-coded Exafuse URL outside resolver/config`);
    }
  }

  if (exafuseMode() === "production-safe") {
    const unsafeLabels = [
      "Duisburg bridge LMD case",
      "Exafuse Pathfinder",
      "Exafuse RFQ Builder",
      "Exafuse LMD / DED-LB/M guide",
      "Exafuse LMD vs SLM"
    ];
    for (const { file, text } of scanFiles(distRoot, [".html"])) {
      const visibleText = visibleTextFromHtml(text);
      for (const label of unsafeLabels) {
        if (visibleText.includes(label)) {
          findings.push(`${file}: production-safe rendered text contains migration-gated label "${label}"`);
        }
      }
    }
  }

  const profilePlaceholders = ["orcid.org/0000", "scholar.google.com/citations?user=", "researchgate.net/profile/TODO"];
  for (const { file, text } of [...builtFiles, ...scanFiles(sourceRoots)]) {
    for (const phrase of profilePlaceholders) {
      if (text.includes(phrase)) findings.push(`${file}: contains placeholder profile URL "${phrase}"`);
    }
  }

  fail("Link audit failed", findings);
}

function auditLinksReport() {
  const files = scanFiles([...sourceRoots, ...distRoot]);
  const rows = [];
  for (const { file, text } of files) {
    const matches = text.match(/https?:\/\/[^\s"'<>),]+/g) ?? [];
    [...new Set(matches)].sort().forEach((url) => rows.push(`${file}\t${url}`));
  }
  console.log(rows.length ? rows.join("\n") : "No external links found.");
}

function auditClaims() {
  const claimPhrases = ["50 Mio", "50M", "1M+", "1 Mio", "750 kg", "219 h", "38 km"];
  const findings = [];
  const sourceAllow = new Set([
    "src/data/publicClaims.ts",
    "public/research/exafuse-public-proof-map.json",
    "scripts/audit-site.mjs"
  ]);

  for (const { file, text } of scanFiles(["src"], [".astro", ".tsx", ".ts"])) {
    if (sourceAllow.has(file)) continue;
    for (const phrase of claimPhrases) {
      if (text.includes(phrase)) findings.push(`${file}: hard-coded claim phrase "${phrase}"`);
    }
  }

  for (const { file, text } of scanFiles(distRoot, [".html"])) {
    for (const phrase of claimPhrases) {
      if (text.includes(phrase) && !text.includes("data-claim-id")) {
        findings.push(`${file}: claim phrase "${phrase}" rendered without claim registry marker`);
      }
    }
  }

  fail("Claim audit failed", findings);
}

function auditBoundaries() {
  const unsafe = [
    "certifies quality",
    "guarantees final quality",
    "automatic release",
    "AI approves",
    "AI certifies"
  ];
  const findings = [];
  const isNegated = (text, index, phrase) => {
    const window = text.slice(Math.max(0, index - 120), Math.min(text.length, index + phrase.length + 120)).toLowerCase();
    return [
      "not ",
      "do not",
      "does not",
      "cannot",
      "never",
      "avoid",
      "limitation",
      "limitations",
      "do_not_use",
      "do not use",
      "not as",
      "not final",
      "is not"
    ].some((marker) => window.includes(marker));
  };
  for (const { file, text } of scanFiles([...sourceRoots, ...distRoot])) {
    for (const phrase of unsafe) {
      const index = text.indexOf(phrase);
      if (index >= 0 && !isNegated(text, index, phrase)) {
        findings.push(`${file}: contains unsafe phrase "${phrase}"`);
      }
    }
    const lower = text.toLowerCase();
    const phrase = "final engineering approval";
    const index = lower.indexOf(phrase);
    if (index >= 0 && !isNegated(lower, index, phrase)) {
      findings.push(`${file}: contains "${phrase}" without explicit negation`);
    }
  }
  fail("Boundary audit failed", findings);
}

const audits = {
  "visual-text": auditVisualText,
  "rendered-text": auditRenderedText,
  links: auditLinks,
  "links:report": auditLinksReport,
  claims: auditClaims,
  boundaries: auditBoundaries,
  all() {
    auditVisualText();
    auditRenderedText();
    auditLinks();
    auditClaims();
    auditBoundaries();
  }
};

if (!audits[mode]) {
  console.error(`Unknown audit mode: ${mode}`);
  process.exit(1);
}

audits[mode]();
if (!process.exitCode) console.log(`audit:${mode} passed`);
