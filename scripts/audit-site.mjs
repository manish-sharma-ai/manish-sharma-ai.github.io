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
  "/resources/",
  "/playbooks/",
  "/claims/",
  "/no-hype/",
  "/brief-template/",
  "/demo/",
  "/de/",
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

function auditHomepageProduct() {
  const file = "dist/index.html";
  const findings = [];
  if (!existsSync(join(root, file))) {
    fail("Homepage product audit failed", [`${file}: missing built homepage`]);
    return;
  }
  const text = read(file);
  const visibleText = visibleTextFromHtml(text);
  const required = [
    "AI for Laser Metal Deposition decisions you can verify.",
    "LMD Decision Cockpit",
    "Worn steel shaft near bearing seat",
    "Decision support only",
    "Not final engineering approval",
    "A signal is not proof."
  ];
  for (const phrase of required) {
    if (!visibleText.includes(phrase)) findings.push(`${file}: missing "${phrase}"`);
  }
  const cockpitIndex = visibleText.indexOf("LMD Decision Cockpit");
  const proofIndex = visibleText.indexOf("Public proof");
  if (cockpitIndex < 0 || proofIndex < 0 || cockpitIndex > proofIndex) {
    findings.push(`${file}: LMD Decision Cockpit should appear before Public proof`);
  }
  const operatingLoopMatches = visibleText.match(/Operating loop/g) ?? [];
  if (operatingLoopMatches.length !== 1) {
    findings.push(`${file}: expected exactly one visible "Operating loop" section, found ${operatingLoopMatches.length}`);
  }
  fail("Homepage product audit failed", findings);
}

function auditDecisionBrief() {
  const findings = [];
  const sourceRequired = [
    "src/lib/decisionBrief.ts",
    "src/components/DecisionBriefExport.tsx",
    "src/components/DecisionBriefCard.tsx"
  ];
  for (const file of sourceRequired) {
    if (!existsSync(join(root, file))) findings.push(`${file}: missing decision-brief source`);
  }

  const pages = ["dist/tools/index.html", "dist/demo/index.html", "dist/brief-template/index.html"];
  for (const file of pages) {
    if (!existsSync(join(root, file))) {
      findings.push(`${file}: missing built page`);
      continue;
    }
    const visibleText = visibleTextFromHtml(read(file));
    for (const phrase of [
      "LMD Decision Brief v1.0",
      "Confidence is not approval",
      "No backend. No data sent by this site."
    ]) {
      if (!visibleText.includes(phrase)) findings.push(`${file}: missing "${phrase}"`);
    }
  }

  const exportSource = existsSync(join(root, "src/components/DecisionBriefExport.tsx"))
    ? read("src/components/DecisionBriefExport.tsx")
    : "";
  for (const phrase of [
    "Copy decision brief",
    "Copy missing-information checklist",
    "Copy evidence-needed checklist",
    "Copy Exafuse review summary",
    "Download .md",
    "Download .json"
  ]) {
    if (!exportSource.includes(phrase)) findings.push(`src/components/DecisionBriefExport.tsx: missing "${phrase}"`);
  }

  const toolSources = [
    "src/components/LmdDecisionCockpit.tsx",
    "src/components/LmdVsSlmAdvisor.tsx",
    "src/components/RepairabilityQuickCheck.tsx",
    "src/components/RfqStructureConverter.tsx",
    "src/components/DecisionBriefExport.tsx"
  ];
  for (const file of toolSources) {
    if (!existsSync(join(root, file))) continue;
    const text = read(file);
    for (const forbidden of ["fetch(", "XMLHttpRequest", "sendBeacon", "localStorage", "sessionStorage"]) {
      if (text.includes(forbidden)) findings.push(`${file}: contains possible backend/storage usage "${forbidden}"`);
    }
  }

  fail("Decision brief audit failed", findings);
}

function auditPlaybookFormat() {
  const findings = [];
  const sourceFile = "src/pages/playbooks/index.astro";
  if (!existsSync(join(root, sourceFile))) {
    fail("Playbook format audit failed", [`${sourceFile}: missing`]);
    return;
  }
  const source = read(sourceFile);
  for (const phrase of [
    "<ol",
    "<ul",
    "CopyBlock",
    "Confidence is not approval",
    "/tools/#preset=",
    "exafuseRfqLink"
  ]) {
    if (!source.includes(phrase)) findings.push(`${sourceFile}: missing "${phrase}"`);
  }
  for (const anchor of ["#lmd-repair", "#lmd-vs-slm", "#monitoring-evidence", "#rfq-preparation"]) {
    if (!source.includes(anchor.replace("#", "id: \""))) {
      findings.push(`${sourceFile}: missing playbook anchor data for ${anchor}`);
    }
  }

  const file = "dist/playbooks/index.html";
  if (!existsSync(join(root, file))) {
    findings.push(`${file}: missing built page`);
  } else {
    const visibleText = visibleTextFromHtml(read(file));
    for (const phrase of [
      "What to ask first",
      "Decision path",
      "What changes the decision",
      "What evidence closes the loop",
      "What to send for expert review",
      "LMD Decision Brief starter"
    ]) {
      if (!visibleText.includes(phrase)) findings.push(`${file}: missing "${phrase}"`);
    }
  }

  fail("Playbook format audit failed", findings);
}

function auditHeldClaims() {
  const findings = [];
  const heldPhrases = [
    "machine-hour scale",
    "print-time reduction",
    "nearly 1,000",
    "almost 20",
    "cs15-machine-hours-1000",
    "cs15-print-time-reduction-20"
  ];
  const forbiddenPages = [
    "dist/index.html",
    "dist/public-work/index.html",
    "dist/industrial-proof/index.html",
    "dist/evidence/index.html",
    "dist/tools/index.html",
    "dist/resources/index.html"
  ];
  for (const file of forbiddenPages) {
    if (!existsSync(join(root, file))) continue;
    const text = read(file);
    for (const phrase of heldPhrases) {
      if (text.includes(phrase)) findings.push(`${file}: renders held claim phrase "${phrase}"`);
    }
  }

  const claimsFile = "dist/claims/index.html";
  if (!existsSync(join(root, claimsFile))) {
    findings.push(`${claimsFile}: missing built claims page`);
  } else {
    const text = read(claimsFile);
    const visibleText = visibleTextFromHtml(text);
    for (const phrase of ["Held for source review", "These are not active public claims"]) {
      if (!visibleText.includes(phrase)) findings.push(`${claimsFile}: missing "${phrase}"`);
    }
    for (const phrase of heldPhrases.slice(0, 2)) {
      if (!text.includes(phrase)) findings.push(`${claimsFile}: held claim "${phrase}" not visible in review section`);
    }
  }

  fail("Held-claims audit failed", findings);
}

function auditMobileStatic() {
  const findings = [];
  const files = [
    "src/components/LmdDecisionCockpit.tsx",
    "src/components/DecisionBriefExport.tsx",
    "src/components/DecisionBriefCard.tsx",
    "src/pages/playbooks/index.astro",
    "src/pages/claims.astro"
  ];
  for (const file of files) {
    if (!existsSync(join(root, file))) continue;
    const text = read(file);
    const fixedWidthMatches = text.match(/\b(?:w|min-w)-\[(?:[7-9]\d{2,}px|\d{3,}rem)\]/g) ?? [];
    fixedWidthMatches.forEach((match) => findings.push(`${file}: possible overflow fixed width "${match}"`));
    if (text.includes("whitespace-nowrap") && !text.includes("overflow-x-auto")) {
      findings.push(`${file}: possible giant unwrapped button row via whitespace-nowrap`);
    }
    if (text.includes("flex flex-wrap gap-3") && text.includes("whitespace-nowrap")) {
      findings.push(`${file}: button cluster may not wrap cleanly on mobile`);
    }
  }

  fail("Mobile static audit failed", findings);
}

function auditPublicProfiles() {
  const findings = [];
  const publicProfileFiles = [
    "dist/identity/index.html",
    "dist/profile/public-profile/index.html",
    "dist/press-kit/index.html",
    "dist/links/index.html",
    "dist/identity.md",
    "dist/profile/public-profile.md"
  ];
  const plannedLabels = ["ORCID", "Zenodo", "Hugging Face", "Google Scholar", "ResearchGate", "Planned profiles", "planned profiles", "planned profile"];
  for (const file of publicProfileFiles) {
    if (!existsSync(join(root, file))) continue;
    const text = read(file);
    const visibleText = file.endsWith(".html") ? visibleTextFromHtml(text) : text;
    for (const label of plannedLabels) {
      if (visibleText.includes(label)) findings.push(`${file}: public profile surface contains planned-profile text "${label}"`);
    }
  }
  const sameAsBad = ["orcid.org", "zenodo.org", "huggingface.co", "scholar.google", "researchgate.net", "#"];
  for (const file of ["dist/identity/index.html", "dist/press-kit/index.html"]) {
    if (!existsSync(join(root, file))) continue;
    const text = read(file);
    const sameAsBlocks = text.match(/"sameAs":\[[^\]]*\]/g) ?? [];
    for (const block of sameAsBlocks) {
      for (const bad of sameAsBad) {
        if (block.includes(bad)) findings.push(`${file}: JSON-LD sameAs contains unsafe profile value "${bad}"`);
      }
    }
  }
  fail("Public profile audit failed", findings);
}

function auditDecisionBoundaries() {
  const findings = [];
  const sourceFiles = [
    "src/components/LmdDecisionCockpit.tsx",
    "src/components/LmdVsSlmAdvisor.tsx",
    "src/components/RepairabilityQuickCheck.tsx",
    "src/components/RfqStructureConverter.tsx"
  ];
  for (const file of sourceFiles) {
    if (!existsSync(join(root, file))) {
      findings.push(`${file}: missing decision tool source`);
      continue;
    }
    const text = read(file);
    for (const phrase of ["Confidence is not approval", "Missing information", "Risk flags", "Evidence needed"]) {
      if (!text.includes(phrase)) findings.push(`${file}: missing "${phrase}"`);
    }
  }

  const unsafeClaims = [
    "monitoring proves final quality",
    "monitoring proves quality",
    "score approves repair",
    "repairability score approves",
    "AI approves repair",
    "AI approves quality"
  ];
  for (const { file, text } of scanFiles([...sourceRoots, ...distRoot])) {
    const lower = text.toLowerCase();
    for (const phrase of unsafeClaims) {
      if (lower.includes(phrase)) findings.push(`${file}: contains unsafe decision-boundary phrase "${phrase}"`);
    }
  }
  fail("Decision-boundary audit failed", findings);
}

function auditExafuseModeHuman() {
  const findings = [];
  for (const { file, text } of scanFiles(distRoot, [".html", ".js", ".json", ".txt", ".md"])) {
    for (const bad of ["pages.dev", "exafuse-website-react", "www.exafuse.de"]) {
      if (text.includes(bad)) findings.push(`${file}: contains forbidden Exafuse/staging URL text "${bad}"`);
    }
  }
  if (exafuseMode() === "production-safe") {
    const rendered = scanFiles(distRoot, [".html"]);
    const unsafeHumanLabels = ["Exafuse Pathfinder", "Exafuse RFQ Builder", "Use these production Exafuse URLs"];
    for (const { file, text } of rendered) {
      const visibleText = visibleTextFromHtml(text);
      for (const label of unsafeHumanLabels) {
        if (visibleText.includes(label)) {
          findings.push(`${file}: production-safe human text implies migration-gated path is live: "${label}"`);
        }
      }
    }
    const modeNotice = "Some Exafuse case and tool links are migration-gated";
    for (const file of ["dist/domains/lmd-ded/index.html", "dist/public-work/index.html"]) {
      if (existsSync(join(root, file)) && !visibleTextFromHtml(read(file)).includes(modeNotice)) {
        findings.push(`${file}: missing Exafuse migration notice`);
      }
    }
  }
  fail("Exafuse human link-mode audit failed", findings);
}

const audits = {
  "visual-text": auditVisualText,
  "rendered-text": auditRenderedText,
  links: auditLinks,
  "links:report": auditLinksReport,
  claims: auditClaims,
  boundaries: auditBoundaries,
  "homepage-product": auditHomepageProduct,
  "decision-brief": auditDecisionBrief,
  "playbook-format": auditPlaybookFormat,
  "held-claims": auditHeldClaims,
  "mobile-static": auditMobileStatic,
  "public-profiles": auditPublicProfiles,
  "decision-boundaries": auditDecisionBoundaries,
  "exafuse-mode-human": auditExafuseModeHuman,
  all() {
    auditVisualText();
    auditRenderedText();
    auditLinks();
    auditClaims();
    auditBoundaries();
    auditHomepageProduct();
    auditDecisionBrief();
    auditPlaybookFormat();
    auditHeldClaims();
    auditMobileStatic();
    auditPublicProfiles();
    auditDecisionBoundaries();
    auditExafuseModeHuman();
  }
};

if (!audits[mode]) {
  console.error(`Unknown audit mode: ${mode}`);
  process.exit(1);
}

audits[mode]();
if (!process.exitCode) console.log(`audit:${mode} passed`);
