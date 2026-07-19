import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const mode = process.argv[2] ?? "all";
const root = process.cwd();
const canonicalSite = "https://manishsharma.dev";
const oldGithubPagesSite = "https://manish-sharma-ai.github.io";

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

const publicMigrationLeakPhrases = [
  "Case source after migration",
  "RFQ path after migration",
  "Pathfinder after migration",
  "Builder after migration",
  "Source activates after Exafuse production migration",
  "Source link pending until Exafuse production migration",
  "View Exafuse after migration",
  "Exafuse RFQ path after migration",
  "Exafuse case link after migration",
  "Exafuse tool path after migration",
  "Exafuse AI-agent path after migration",
  "Exafuse knowledge link after migration",
  "Production link after Exafuse migration",
  "New Exafuse case/tool deep links will activate after production migration",
  "migration-gated",
  "Migration-gated",
  "link mode",
  "Link mode",
  "production-safe",
  "Production-safe"
];

const humanLanguageLeakPhrases = [
  "public-safe",
  "Public-safe",
  "AI-agent-safe",
  "AI-Agent-Safe",
  "canonical identity",
  "Canonical identity",
  "claim ledger",
  "Claim Ledger",
  "proof domain",
  "Proof domain",
  "authority layer",
  "source governance",
  "allowed pages",
  "Allowed pages",
  "registry ID",
  "Registry id",
  "source type/status",
  "Source type/status",
  "do-not-render",
  "audit marker",
  "internal claim status"
];

const humanFirstRenderedPages = [
  "/",
  "/about/",
  "/thesis/",
  "/domains/lmd-ded/",
  "/public-work/",
  "/evidence/",
  "/industrial-proof/",
  "/resources/",
  "/tools/",
  "/decision-map/",
  "/playbooks/",
  "/lab-notes/",
  "/glossary/",
  "/contact/",
  "/no-hype/",
  "/de/"
];

const keyRenderedPages = [
  "/",
  "/thesis/",
  "/domains/lmd-ded/",
  "/public-work/",
  "/contact/",
  "/tools/",
  "/resources/",
  "/decision-map/",
  "/playbooks/",
  "/claims/",
  "/no-hype/",
  "/brief-standard/",
  "/brief-template/",
  "/demo/",
  "/de/",
  "/trust/",
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

function auditRenderedPublicLanguage() {
  const findings = [];
  for (const { file, text } of scanFiles(distRoot, [".html"])) {
    const visibleText = visibleTextFromHtml(text);
    for (const phrase of publicMigrationLeakPhrases) {
      if (visibleText.includes(phrase)) {
        findings.push(`${file}: public rendered HTML contains internal migration wording "${phrase}"`);
      }
    }
  }
  for (const route of humanFirstRenderedPages) {
    const file = pagePathToDistFile(route);
    if (!existsSync(join(root, file))) continue;
    const visibleText = visibleTextFromHtml(read(file));
    for (const phrase of humanLanguageLeakPhrases) {
      if (visibleText.includes(phrase)) {
        findings.push(`${file}: human-first page exposes internal wording "${phrase}"`);
      }
    }
    for (const phrase of ["Confidence is not approval", "Decision support only", "Preliminary decision-support only", "No backend"]) {
      const count = visibleText.split(phrase).length - 1;
      const generatedArtifactRoute = ["/tools/", "/playbooks/", "/decision-map/"].includes(route);
      const maxAllowed = generatedArtifactRoute ? 12 : route === "/no-hype/" ? 3 : 2;
      if (count > maxAllowed) findings.push(`${file}: repeats caveat "${phrase}" ${count} times`);
    }
  }
  fail("Rendered public-language audit failed", findings);
}

function auditLinks() {
  const builtFiles = scanFiles(distRoot);
  const builtBad = [
    "pages.dev",
    "exafuse-website-react",
    "www.exafuse.de",
    'href="#"',
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
    "src/data/exafusePublicProof.ts",
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
      if (text.includes(phrase) && !text.includes("data-claim-id") && !text.includes("data-exafuse-proof-metric")) {
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
    "I build AI systems for industrial decisions that need evidence, not just predictions.",
    "LMD Decision Cockpit",
    "Example scenario: worn steel shaft near bearing seat.",
    "Compact brief preview",
    "Decision signal",
    "Brief completeness",
    "Expert-review package status",
    "Evidence burden",
    "Top 3 critical gaps",
    "Top 3 risk flags",
    "Copy brief",
    "Open full brief",
    "Start your own brief",
    "Evidence-aware by design",
    "Run the Decision Cockpit",
    "View public proof",
    "Read the method",
    "Duisburg bridge components",
    "Exafuse",
    "The broader question behind the current work",
    "One public industrial story, supported by a working product and an authored note",
    "One idea behind the broader platform",
    "A Prediction Is Not Yet an Industrial Decision"
  ];
  for (const phrase of required) {
    if (!visibleText.includes(phrase)) findings.push(`${file}: missing "${phrase}"`);
  }
  for (const phrase of ["Default example text:", "audit marker", "test marker", "placeholder for audit", "debug", "TODO", "FIXME"]) {
    if (visibleText.includes(phrase)) findings.push(`${file}: visible text contains "${phrase}"`);
  }
  const proofIndex = text.indexOf('data-page-chapter="public-proof"');
  const cockpitIndex = text.indexOf('data-page-chapter="product"');
  const methodIndex = text.indexOf('data-page-chapter="method"');
  const selectedWorkIndex = text.indexOf('data-page-chapter="knowledge"');
  if (proofIndex < 0 || cockpitIndex < 0 || methodIndex < 0 || selectedWorkIndex < 0 || !(proofIndex < cockpitIndex && cockpitIndex < methodIndex && methodIndex < selectedWorkIndex)) {
    findings.push(`${file}: expected proof strip -> Cockpit -> method -> selected work sequence`);
  }
  for (const duplicatedHomepageModule of [
    "Current LMD/DED work: choose the question you need to structure",
    "Current LMD/DED proof, with public source context"
  ]) {
    if (visibleText.includes(duplicatedHomepageModule)) {
      findings.push(`${file}: retains duplicated specialist homepage module "${duplicatedHomepageModule}"`);
    }
  }
  const operatingLoopSections = text.match(/data-operating-loop="homepage"/g) ?? [];
  if (operatingLoopSections.length !== 1) {
    findings.push(`${file}: expected exactly one homepage operating-loop section, found ${operatingLoopSections.length}`);
  }
  const operatingLoopH2Matches = text.match(/<h2[^>]*>\s*Sense\s*(?:-&gt;|->|→)\s*Model\s*(?:-&gt;|->|→)\s*Decide\s*(?:-&gt;|->|→)\s*Verify\s*<\/h2>/g) ?? [];
  if (operatingLoopH2Matches.length !== 1) {
    findings.push(`${file}: expected exactly one H2 matching "Sense -> Model -> Decide -> Verify", found ${operatingLoopH2Matches.length}`);
  }
  for (const phrase of [
    "How to use this brief",
    "Copy Exafuse email draft",
    "Copy AI summary",
    "Download .json",
    "Open mail client with draft"
  ]) {
    if (visibleText.includes(phrase)) findings.push(`${file}: homepage should not render full brief wall phrase "${phrase}"`);
  }
  if (!text.includes('data-compact-brief-preview="homepage"')) {
    findings.push(`${file}: missing compact brief preview marker`);
  }
  fail("Homepage product audit failed", findings);
}

function auditBriefArtifact() {
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
    const visibleLower = visibleText.toLowerCase();
    for (const phrase of [
      "lmd decision brief v1.0",
      "confidence is not approval",
      "technical decision brief",
      "exafuse-ready email draft",
      "ai summary",
      "copy exafuse email draft",
      "download .json",
      "how to use this brief"
    ]) {
      if (!visibleLower.includes(phrase)) findings.push(`${file}: missing "${phrase}"`);
    }
  }

  const exportSource = existsSync(join(root, "src/components/DecisionBriefExport.tsx"))
    ? read("src/components/DecisionBriefExport.tsx")
    : "";
  for (const phrase of [
    "Copy technical brief",
    "Copy Exafuse email draft",
    "Copy AI summary",
    "Copy missing-information checklist",
    "Copy evidence-needed checklist",
    "Download .md",
    "Download .json",
    "Print / save as PDF",
    "Open mail client"
  ]) {
    if (!exportSource.includes(phrase)) findings.push(`src/components/DecisionBriefExport.tsx: missing "${phrase}"`);
  }

  const libSource = existsSync(join(root, "src/lib/decisionBrief.ts")) ? read("src/lib/decisionBrief.ts") : "";
  for (const phrase of [
    "formatTechnicalDecisionBrief",
    "formatExafuseEmailDraft",
    "formatAiAgentSafeSummary",
    "Use for: preliminary structuring, RFQ preparation, missing-information review",
    "Do not use for: approval, certification, release, safety-critical acceptance, quality guarantee",
    "Commercial/company review: Exafuse.",
    "Status: no backend/no automatic sending/user-provided context only.",
    "quality guarantee",
    "Confidence is not approval"
  ]) {
    if (!libSource.includes(phrase)) findings.push(`src/lib/decisionBrief.ts: missing "${phrase}"`);
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

  fail("Brief artifact audit failed", findings);
}

function auditDecisionBrief() {
  auditBriefArtifact();
}

function boundaryNegated(text, index, phrase) {
  const window = text.slice(Math.max(0, index - 80), Math.min(text.length, index + phrase.length + 80)).toLowerCase();
  return ["not ", "no ", "do not", "does not", "cannot", "never", "not as", "not release", "without"].some((marker) => window.includes(marker));
}

function auditBriefBoundaries() {
  const findings = [];
  const explicitUnsafe = [
    /brief completeness\s+(?:is|=|as|means)\s+feasibility/i,
    /brief completeness[^.]{0,80}feasibility score/i,
    /evidence burden\s+(?:is|=|as|means)\s+approval/i,
    /repairability score\s+(?:approves|approval|is approval)/i,
    /monitoring\s+(?:certifies|certification|proves final quality|proves quality)/i
  ];
  for (const { file, text } of scanFiles([...sourceRoots, ...distRoot])) {
    for (const regex of explicitUnsafe) {
      const match = text.match(regex);
      if (match) findings.push(`${file}: unsafe boundary wording "${match[0]}"`);
    }
    for (const phrase of ["automatic sending", "automatically sends", "sends automatically", "auto-sends"]) {
      const lower = text.toLowerCase();
      const index = lower.indexOf(phrase);
      if (index >= 0 && !boundaryNegated(lower, index, phrase)) {
        findings.push(`${file}: email wording implies automatic sending via "${phrase}"`);
      }
    }
  }
  fail("Brief boundary audit failed", findings);
}

function auditDebugText() {
  const findings = [];
  const phrases = ["Default example text", "debug", "TODO", "FIXME", "placeholder for audit", "test marker", "audit marker"];
  for (const { file, text } of scanFiles(distRoot, [".html"])) {
    const visibleText = visibleTextFromHtml(text);
    for (const phrase of phrases) {
      if (visibleText.includes(phrase)) findings.push(`${file}: visible text contains "${phrase}"`);
    }
  }
  fail("Debug text audit failed", findings);
}

function auditA11yStatic() {
  const findings = [];
  const cockpitFile = "src/components/LmdDecisionCockpit.tsx";
  if (!existsSync(join(root, cockpitFile))) {
    findings.push(`${cockpitFile}: missing cockpit source`);
  } else {
    const cockpit = read(cockpitFile);
    for (const phrase of ["<fieldset", "<legend", "aria-pressed", "aria-label"]) {
      if (!cockpit.includes(phrase)) findings.push(`${cockpitFile}: missing "${phrase}"`);
    }
  }

  const exportFile = "src/components/DecisionBriefExport.tsx";
  if (!existsSync(join(root, exportFile))) {
    findings.push(`${exportFile}: missing export source`);
  } else {
    const source = read(exportFile);
    for (const phrase of ["aria-label={label}", "Copy technical brief", "Download .json", "Print / save as PDF"]) {
      if (!source.includes(phrase)) findings.push(`${exportFile}: missing accessible/export control "${phrase}"`);
    }
    if (/<button[^>]*>\s*<\/button>/i.test(source)) findings.push(`${exportFile}: contains empty button`);
  }

  for (const file of ["src/components/LmdDecisionCockpit.tsx", "src/components/DecisionBriefCard.tsx", "src/components/DecisionBriefExport.tsx"]) {
    if (!existsSync(join(root, file))) continue;
    const text = read(file);
    const fixedWidthMatches = text.match(/\b(?:w|min-w)-\[(?:[7-9]\d{2,}px|\d{3,}rem)\]/g) ?? [];
    fixedWidthMatches.forEach((match) => findings.push(`${file}: possible fixed-width overflow "${match}"`));
  }
  fail("Static accessibility audit failed", findings);
}

function auditGermanBrief() {
  const file = "dist/de/index.html";
  const findings = [];
  if (!existsSync(join(root, file))) {
    fail("German brief audit failed", [`${file}: missing built German page`]);
    return;
  }
  const html = read(file);
  const visibleText = visibleTextFromHtml(html);
  if (!/<html[^>]+lang="de"/i.test(html)) findings.push(`${file}: missing lang="de"`);
  if (!html.includes('rel="alternate" hreflang="en"')) findings.push(`${file}: missing English hreflang`);
  if (!html.includes('rel="alternate" hreflang="de"')) findings.push(`${file}: missing German hreflang`);
  for (const phrase of [
    "LMD-Entscheidungsbrief v1.0",
    "Industrielle KI für Entscheidungen mit belastbaren Nachweisen.",
    "Für mich ist eine Modellvorhersage nur ein Teil der Aufgabe.",
    "Status: vorläufige technische Einordnung",
    "Geeignet für: Vorbereitung einer Machbarkeitsbewertung oder technischen Anfrage",
    "LMD-Entscheidungswerkzeug öffnen",
    "Methode auf Englisch lesen",
    "Seiteninformationen",
    "Startseite",
    "Vertrauen & Datenschutz",
    "Suche"
  ]) {
    if (!visibleText.includes(phrase)) findings.push(`${file}: missing "${phrase}"`);
  }
  for (const phrase of [
    "Skip to content",
    "Search all pages",
    "Page information",
    "Resources",
    "Contact",
    "German Handoff",
    "German Page",
    "Open route",
    "Preliminary decision-support only",
    "Canonical:",
    "Kanonisch:",
    "Handoff",
    "Prüfroute",
    "Fachprüfung / RFQ-Gespräch",
    "überprüfbar bleiben",
    "Lab Notes",
    "Website prüfen",
    "browser-lokal",
    "Exafuse ist der richtige Weg für RFQs und kommerzielle Prüfung",
    "Diese Seite hilft"
  ]) {
    if (visibleText.includes(phrase)) findings.push(`${file}: German page leaks English or awkward interface text "${phrase}"`);
  }
  if (html.includes("Ã") || html.includes("â€")) findings.push(`${file}: contains likely mojibake`);
  fail("German brief audit failed", findings);
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
      "Copy standard brief starter"
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
  const sourceExpectations = {
    "src/components/LmdDecisionCockpit.tsx": ["Confidence is not approval", "Missing information", "Risk flags", "Evidence needed"],
    "src/components/LmdVsSlmAdvisor.tsx": ["Route signals", "Information completeness", "Review urgency", "Not answered", "Clear all inputs", "rule-based"],
    "src/components/RepairabilityQuickCheck.tsx": ["Technical screening status", "Qualification burden", "Commercial urgency", "Clear all inputs", "Preliminary decision-support only"],
    "src/components/RfqStructureConverter.tsx": ["Preliminary decision-support only", "Missing information", "Risk flags", "Evidence needed"]
  };
  for (const [file, expectations] of Object.entries(sourceExpectations)) {
    if (!existsSync(join(root, file))) {
      findings.push(`${file}: missing decision tool source`);
      continue;
    }
    const text = read(file);
    for (const phrase of expectations) {
      if (!text.includes(phrase)) findings.push(`${file}: missing "${phrase}"`);
    }
  }

  const routeScreen = existsSync(join(root, "src/lib/lmdRouteScreen.ts"))
    ? read("src/lib/lmdRouteScreen.ts")
    : "";
  const routeAdvisor = existsSync(join(root, "src/components/LmdVsSlmAdvisor.tsx"))
    ? read("src/components/LmdVsSlmAdvisor.tsx")
    : "";
  for (const phrase of ["LMD likely better", "SLM/LPBF likely better", "better than"]) {
    if (routeAdvisor.includes(phrase)) findings.push(`src/components/LmdVsSlmAdvisor.tsx: route output is too confident via "${phrase}"`);
  }
  for (const phrase of [
    "LMD/DED-aligned signals are present",
    "PBF-LB/M-aligned signals are present",
    "Not enough route information to compare LMD/DED and PBF-LB/M."
  ]) {
    if (!routeScreen.includes(phrase)) findings.push(`src/lib/lmdRouteScreen.ts: missing calibrated route wording "${phrase}"`);
  }
  for (const phrase of ["useState<RouteAnswers>({})", "Not answered", "Information completeness", "Review urgency", "Needs expert review"]) {
    const source = ["Needs expert review"].includes(phrase) ? routeScreen : routeAdvisor;
    const file = source === routeScreen ? "src/lib/lmdRouteScreen.ts" : "src/components/LmdVsSlmAdvisor.tsx";
    if (!source.includes(phrase)) findings.push(`${file}: missing unanswered-state or readiness/urgency behavior "${phrase}"`);
  }
  if (routeScreen.includes("Ready for expert review")) {
    findings.push("src/lib/lmdRouteScreen.ts: high-risk cases must use Needs expert review, not Ready for expert review");
  }

  for (const file of ["src/components/RepairabilityQuickCheck.tsx", "src/components/RepairabilityCalculator.tsx"]) {
    if (!existsSync(join(root, file))) continue;
    const text = read(file);
    if (text.includes("Repairability score") || text.includes("${result.score}/100") || text.includes("/100)") || text.includes("* 12") || text.includes("? 18")) {
      findings.push(`${file}: public repairability output should use qualitative screening bands, not a pseudo-precise /100 score`);
    }
    for (const phrase of ["Technical suitability", "Qualification burden", "Commercial context"]) {
      if (!text.includes(phrase)) findings.push(`${file}: missing explicit repairability rule group "${phrase}"`);
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
    const unsafeHumanLabels = [
      "Exafuse Pathfinder",
      "Exafuse RFQ Builder",
      "Use these production Exafuse URLs",
      "migration-gated",
      "link mode",
      "production-safe",
      "production migration"
    ];
    for (const { file, text } of rendered) {
      const visibleText = visibleTextFromHtml(text);
      for (const label of unsafeHumanLabels) {
        if (visibleText.includes(label)) {
          findings.push(`${file}: human text exposes internal Exafuse route state: "${label}"`);
        }
      }
    }
  }
  fail("Exafuse human link-mode audit failed", findings);
}

function auditBriefStatusConsistency() {
  const findings = [];
  const libFile = "src/lib/decisionBrief.ts";
  if (!existsSync(join(root, libFile))) {
    fail("Brief status consistency audit failed", [`${libFile}: missing`]);
    return;
  }
  const source = read(libFile);
  for (const phrase of [
    "Too vague for useful review",
    "Ready for preliminary discussion",
    "Ready for expert review package",
    "Requires formal inspection / qualification planning",
    "ExpertReviewPackageStatus",
    "Not ready",
    "Partially ready",
    "Ready for expert review",
    "Requires formal qualification planning",
    "Completeness describes whether the brief can support a useful conversation. It is not feasibility, approval, or release evidence.",
    "expertReviewPackageStatus: \"Not ready\"",
    "evidenceBurden: \"High inspection burden\""
  ]) {
    if (!source.includes(phrase)) findings.push(`${libFile}: missing "${phrase}"`);
  }
  for (const old of ["Too vague for review", "Needs formal inspection / qualification planning"]) {
    if (source.includes(old)) findings.push(`${libFile}: contains old state "${old}"`);
  }

  for (const file of ["dist/demo/index.html", "dist/brief-template/index.html", "dist/tools/index.html"]) {
    if (!existsSync(join(root, file))) {
      findings.push(`${file}: missing built page`);
      continue;
    }
    const visibleText = visibleTextFromHtml(read(file));
    for (const phrase of [
      "Ready for preliminary discussion",
      "Expert-review package status",
      "Not ready",
      "High inspection burden",
      "Completeness describes whether the brief can support a useful conversation. It is not feasibility, approval, or release evidence."
    ]) {
      if (!visibleText.includes(phrase)) findings.push(`${file}: missing "${phrase}"`);
    }
  }
  fail("Brief status consistency audit failed", findings);
}

function auditHumanMigrationLanguage() {
  const findings = [];
  for (const { file, text } of scanFiles(distRoot, [".html"])) {
    const visibleText = visibleTextFromHtml(text);
    for (const phrase of publicMigrationLeakPhrases) {
      if (visibleText.includes(phrase)) findings.push(`${file}: visible text contains old migration phrase "${phrase}"`);
    }
  }
  const externalConfig = existsSync(join(root, "src/config/externalLinks.ts")) ? read("src/config/externalLinks.ts") : "";
  for (const phrase of ["Request Exafuse review", "Contact Exafuse"]) {
    if (!externalConfig.includes(phrase)) findings.push(`src/config/externalLinks.ts: missing human label "${phrase}"`);
  }
  fail("Human migration language audit failed", findings);
}

function auditControlTextReadability() {
  const findings = [];
  const collapsedStrings = [
    "Repair damaged/worn part Build new metal feature/part Add coating/cladding",
    "Worn shaft near bearing seat Monitoring anomaly Surface cladding request",
    "Copy technical brief Copy Exafuse email draft",
    "Material known?Drawing",
    "Photos available?Damage",
    "Safety critical?High",
    "Copy technical brief Copy",
    "Download .md Download",
    "Show example Start blank",
    "Reset blank90-second demo"
  ];
  for (const { file, text } of scanFiles(distRoot, [".html"])) {
    const visibleText = visibleTextFromHtml(text);
    for (const phrase of collapsedStrings) {
      if (visibleText.includes(phrase)) findings.push(`${file}: visible controls collapse into "${phrase}"`);
    }
  }
  const cockpitSource = "src/components/LmdDecisionCockpit.tsx";
  if (!existsSync(join(root, cockpitSource))) {
    findings.push(`${cockpitSource}: missing control source`);
  } else {
    const source = read(cockpitSource);
    for (const phrase of ["<fieldset", "<legend", "<ul", "<li", "aria-pressed", "sr-only"]) {
      if (!source.includes(phrase)) findings.push(`${cockpitSource}: missing control-readability marker "${phrase}"`);
    }
  }
  const exportSource = "src/components/DecisionBriefExport.tsx";
  if (!existsSync(join(root, exportSource))) {
    findings.push(`${exportSource}: missing control source`);
  } else {
    const source = read(exportSource);
    for (const phrase of ["<section", "<ul", "<li", "sr-only", "aria-labelledby", "Open mail client with draft"]) {
      if (!source.includes(phrase)) findings.push(`${exportSource}: missing control-readability marker "${phrase}"`);
    }
  }
  fail("Control text readability audit failed", findings);
}

function auditClaimsHumanSurface() {
  const findings = [];
  const file = "dist/claims/index.html";
  if (!existsSync(join(root, file))) {
    fail("Claims human surface audit failed", [`${file}: missing built claims page`]);
    return;
  }
  const html = read(file);
  const visibleText = visibleTextFromHtml(html);
  for (const phrase of [
    "Claims are public context, not transferable feasibility or approval.",
    "Claim",
    "Why it matters",
    "Limitation",
    "Review details",
    "Source context",
    "Reference id",
    "Public source fallback through Exafuse contact/current production site",
    "Large bridge-node mass helps readers",
    "The image volume shows why AI and monitoring can help organize process evidence"
  ]) {
    if (!visibleText.includes(phrase)) findings.push(`${file}: missing "${phrase}"`);
  }
  for (const phrase of ["Audit details", "Source type/status", "Registry id", "Allowed pages", "Source link pending until Exafuse production migration"]) {
    if (visibleText.includes(phrase)) findings.push(`${file}: visible text still contains old claim-registry label "${phrase}"`);
  }
  if (visibleText.includes("It gives readers a bounded public reference point for LMD/DED scale")) {
    findings.push(`${file}: claim ledger still uses generic why-it-matters boilerplate`);
  }
  if (!html.includes("<details")) findings.push(`${file}: audit details are not collapsed with details`);
  fail("Claims human surface audit failed", findings);
}

function auditAiSafeSummary() {
  const findings = [];
  const file = "src/lib/decisionBrief.ts";
  if (!existsSync(join(root, file))) {
    fail("AI-safe summary audit failed", [`${file}: missing`]);
    return;
  }
  const source = read(file);
  for (const phrase of [
    "AI-Agent-Safe LMD Decision Summary",
    "Use for: preliminary structuring, RFQ preparation, missing-information review",
    "Do not use for: approval, certification, release, safety-critical acceptance, quality guarantee",
    "Source context: generated from",
    "Commercial/company review: Exafuse.",
    "Boundary signal is not proof",
    "Status: no backend/no automatic sending/user-provided context only."
  ]) {
    if (!source.includes(phrase)) findings.push(`${file}: missing "${phrase}"`);
  }
  fail("AI-safe summary audit failed", findings);
}

function auditEmailManualBoundary() {
  const findings = [];
  const exportFile = "src/components/DecisionBriefExport.tsx";
  const libFile = "src/lib/decisionBrief.ts";
  const exportSource = existsSync(join(root, exportFile)) ? read(exportFile) : "";
  const libSource = existsSync(join(root, libFile)) ? read(libFile) : "";
  for (const phrase of [
    "Manual draft only. Nothing is sent unless you send it from your own email client.",
    "Open mail client with draft",
    "Review before sending. Remove confidential data if needed."
  ]) {
    if (!exportSource.includes(phrase)) findings.push(`${exportFile}: missing "${phrase}"`);
  }
  for (const phrase of [
    "This was generated locally in the browser.",
    "Please review; this is not approval.",
    "NO_AUTOMATIC_SENDING_NOTE"
  ]) {
    if (!libSource.includes(phrase)) findings.push(`${libFile}: missing "${phrase}"`);
  }
  fail("Email manual boundary audit failed", findings);
}

function auditPublicReviewRecordSchema() {
  const findings = [];
  const schemaFile = "public/schemas/public-review-v1.schema.json";
  const builtSchemaFile = "dist/schemas/public-review-v1.schema.json";
  if (!existsSync(join(root, schemaFile))) {
    fail("Public review record schema audit failed", [`${schemaFile}: missing`]);
    return;
  }

  let schema;
  try {
    schema = JSON.parse(read(schemaFile));
  } catch (error) {
    findings.push(`${schemaFile}: invalid JSON (${error.message})`);
  }

  for (const field of [
    "recordVersion",
    "recordType",
    "audience",
    "task",
    "outcome",
    "timeBand",
    "boundaryComprehension",
    "primaryFriction",
    "publicSafeComment",
    "noTechnicalDataStatement"
  ]) {
    if (!schema?.required?.includes(field)) findings.push(`${schemaFile}: missing required field "${field}"`);
  }
  if (schema?.$id !== "https://manishsharma.dev/schemas/public-review-v1.schema.json") findings.push(`${schemaFile}: canonical $id is incorrect`);
  if (schema?.additionalProperties !== false) findings.push(`${schemaFile}: must reject additional properties`);
  if (schema?.properties?.recordVersion?.const !== "public-review-v1") findings.push(`${schemaFile}: recordVersion const is incorrect`);
  if (schema?.properties?.recordType?.const !== "public-safe-review-note") findings.push(`${schemaFile}: recordType const is incorrect`);
  if (schema?.properties?.publicSafeComment?.maxLength !== 500) findings.push(`${schemaFile}: publicSafeComment maxLength must be 500`);
  if (schema?.$defs?.choice?.additionalProperties !== false) findings.push(`${schemaFile}: choice records must reject additional properties`);
  if (!existsSync(join(root, builtSchemaFile))) findings.push(`${builtSchemaFile}: missing built schema`);

  fail("Public review record schema audit failed", findings);
}

function auditBriefSchema() {
  const findings = [];
  const schemaFile = "public/schemas/lmd-decision-brief-v1.schema.json";
  const exampleFiles = [
    "public/examples/lmd-decision-brief-worn-shaft-v1.json",
    "public/examples/lmd-decision-brief-monitoring-anomaly-v1.json",
    "public/examples/lmd-decision-brief-surface-cladding-v1.json",
    "public/examples/lmd-decision-brief-rfq-v1.json"
  ];
  const markdownExample = "public/examples/lmd-decision-brief-worn-shaft-v1.md";

  if (!existsSync(join(root, schemaFile))) findings.push(`${schemaFile}: missing`);
  if (!existsSync(join(root, markdownExample))) findings.push(`${markdownExample}: missing`);
  if (findings.length > 0) {
    fail("Brief schema audit failed", findings);
    return;
  }

  let schema;
  try {
    schema = JSON.parse(read(schemaFile));
  } catch (error) {
    findings.push(`${schemaFile}: invalid JSON (${error.message})`);
  }

  const topRequired = schema?.required ?? [];
  const briefSchema = schema?.$defs?.decisionBrief ?? {};
  const briefRequired = briefSchema.required ?? [];
  const arrayFields = [
    "notValidFor",
    "availableData",
    "knownFacts",
    "missingInformation",
    "missingCritical",
    "missingUseful",
    "missingOptional",
    "riskFlags",
    "evidenceNeeded"
  ];
  const requiredBoundaryPhrases = [
    "Preliminary decision-support only",
    "Final feasibility depends on base material, geometry, service conditions, inspection requirements, and expert review",
    "No backend",
    "No automatic sending"
  ];
  const notValidForRequired = ["approval", "certification", "release", "safety-critical acceptance", "quality guarantee"];
  const enumChecks = [
    ["briefVersion", schema?.properties?.briefVersion?.const],
    ["artifactType", schema?.properties?.artifactType?.const],
    ["status", schema?.properties?.status?.const],
    ["outputMode", schema?.properties?.outputMode?.const]
  ];
  const nestedEnumChecks = [
    ["briefVersion", briefSchema.properties?.briefVersion?.const],
    ["artifactType", briefSchema.properties?.artifactType?.const],
    ["status", briefSchema.properties?.status?.const],
    ["preparedFor", briefSchema.properties?.preparedFor?.const],
    ["briefCompleteness", briefSchema.properties?.briefCompleteness?.enum],
    ["expertReviewPackageStatus", briefSchema.properties?.expertReviewPackageStatus?.enum],
    ["evidenceBurden", briefSchema.properties?.evidenceBurden?.enum]
  ];

  for (const phrase of ["$id", "https://manishsharma.dev/schemas/lmd-decision-brief-v1.schema.json", "quality guarantee"]) {
    if (!read(schemaFile).includes(phrase)) findings.push(`${schemaFile}: missing "${phrase}"`);
  }

  for (const file of exampleFiles) {
    if (!existsSync(join(root, file))) {
      findings.push(`${file}: missing`);
      continue;
    }
    let data;
    try {
      data = JSON.parse(read(file));
    } catch (error) {
      findings.push(`${file}: invalid JSON (${error.message})`);
      continue;
    }
    for (const field of topRequired) {
      if (data[field] === undefined) findings.push(`${file}: missing top-level field "${field}"`);
    }
    for (const [field, expected] of enumChecks) {
      if (expected !== undefined && data[field] !== expected) findings.push(`${file}: ${field} must be "${expected}"`);
    }
    if (!data.brief || typeof data.brief !== "object") {
      findings.push(`${file}: missing nested brief object`);
      continue;
    }
    for (const field of briefRequired) {
      if (data.brief[field] === undefined) findings.push(`${file}: missing brief field "${field}"`);
    }
    for (const field of arrayFields) {
      const target = field === "notValidFor" ? data[field] : data.brief[field];
      if (!Array.isArray(target)) findings.push(`${file}: ${field} must be an array`);
      if (Array.isArray(target) && target.length === 0) findings.push(`${file}: ${field} must not be empty`);
    }
    for (const value of notValidForRequired) {
      if (!data.notValidFor?.includes(value)) findings.push(`${file}: top-level notValidFor missing "${value}"`);
      if (!data.brief.notValidFor?.includes(value)) findings.push(`${file}: brief notValidFor missing "${value}"`);
    }
    for (const [field, expected] of nestedEnumChecks) {
      if (Array.isArray(expected) && !expected.includes(data.brief[field])) {
        findings.push(`${file}: brief.${field} has non-schema value "${data.brief[field]}"`);
      } else if (typeof expected === "string" && data.brief[field] !== expected) {
        findings.push(`${file}: brief.${field} must be "${expected}"`);
      }
    }
    const serialized = JSON.stringify(data);
    for (const phrase of requiredBoundaryPhrases) {
      if (!serialized.includes(phrase)) findings.push(`${file}: missing boundary phrase "${phrase}"`);
    }
    for (const bad of ["pages.dev", "exafuse-website-react", "www.exafuse.de"]) {
      if (serialized.includes(bad)) findings.push(`${file}: contains staging or wrong production host "${bad}"`);
    }
    for (const regex of [/\bfeasible\b/i, /\bapproved\b/i, /\bcertified\b/i, /\bqualified\b/i, /\bguaranteed\b/i]) {
      const match = serialized.match(regex);
      if (match) findings.push(`${file}: contains unsafe positive word "${match[0]}"`);
    }
  }

  const libSource = existsSync(join(root, "src/lib/decisionBrief.ts")) ? read("src/lib/decisionBrief.ts") : "";
  for (const phrase of ["formatDecisionBriefJson", "WORN_SHAFT_BRIEF", "COCKPIT_PRESETS", "quality guarantee"]) {
    if (!libSource.includes(phrase)) findings.push(`src/lib/decisionBrief.ts: missing generated fixture marker "${phrase}"`);
  }
  const exportSource = existsSync(join(root, "src/components/DecisionBriefExport.tsx"))
    ? read("src/components/DecisionBriefExport.tsx")
    : "";
  if (!exportSource.includes("formatDecisionBriefJson(brief)")) {
    findings.push("src/components/DecisionBriefExport.tsx: exported JSON is not generated through formatDecisionBriefJson(brief)");
  }
  if (!read(markdownExample).includes("Not valid for: approval, certification, release, safety-critical acceptance, or quality guarantee")) {
    findings.push(`${markdownExample}: missing updated not-valid-for line`);
  }

  fail("Brief schema audit failed", findings);
}

function auditHumanExafuseCtas() {
  const findings = [];
  for (const { file, text } of scanFiles(distRoot, [".html"])) {
    const visibleText = visibleTextFromHtml(text);
    for (const phrase of publicMigrationLeakPhrases) {
      if (visibleText.includes(phrase)) findings.push(`${file}: human HTML contains "${phrase}"`);
    }
  }
  fail("Human Exafuse CTA audit failed", findings);
}

function auditRubricFormat() {
  const findings = [];
  const builtFiles = ["dist/brief-template/index.html", "dist/brief-standard/index.html", "dist/tools/index.html"];
  for (const file of builtFiles) {
    if (!existsSync(join(root, file))) {
      findings.push(`${file}: missing built page`);
      continue;
    }
    const html = read(file);
    const visibleText = visibleTextFromHtml(html);
    if (html.includes("Exact material grade visible Geometry/drawing available")) {
      findings.push(`${file}: brief rubric renders as run-on text`);
    }
    if (!html.includes("<ul") || !html.includes("<li")) {
      findings.push(`${file}: expected rubric/checklist list markup`);
    }
    if (!visibleText.includes("This rubric checks brief quality, not technical feasibility.")) {
      findings.push(`${file}: missing rubric boundary explanation`);
    }
  }
  const sourceFiles = ["src/pages/brief-template.astro", "src/pages/brief-standard.astro", "src/pages/tools.astro"];
  for (const file of sourceFiles) {
    if (!existsSync(join(root, file))) {
      findings.push(`${file}: missing source page`);
      continue;
    }
    const source = read(file);
    if (!source.includes("BRIEF_QUALITY_RUBRIC.map") || !source.includes("<li")) {
      findings.push(`${file}: rubric should render BRIEF_QUALITY_RUBRIC as list items`);
    }
  }
  fail("Rubric format audit failed", findings);
}

function sitemapText() {
  return scanFiles(["dist"], [".xml"])
    .filter(({ file }) => file.startsWith("dist/sitemap"))
    .map(({ text }) => text)
    .join("\n");
}

function preflightBoundaryContext(text, index, phrase) {
  const window = text.slice(Math.max(0, index - 600), Math.min(text.length, index + phrase.length + 180)).toLowerCase();
  return [
    "not valid for",
    "do_not_use_for",
    "do not use for",
    "do not use this site as",
    "do not use this site for",
    "do not use",
    "not final",
    "not engineering",
    "not approval",
    "not certification",
    "not release",
    "cannot",
    "replacement for expert review",
    "limitation",
    "boundary",
    "explicit limitations"
  ].some((marker) => window.includes(marker));
}

function auditPreflight() {
  const findings = [];
  const expectedRoutes = [
    "/",
    "/thesis/",
    "/domains/lmd-ded/",
    "/identity/",
    "/profile/public-profile/",
    "/resources/",
    "/tools/",
    "/decision-map/",
    "/brief-standard/",
    "/brief-template/",
    "/demo/",
    "/trust/",
    "/for-ai-agents/",
    "/site-map/"
  ];
  const expectedFiles = [
    "dist/robots.txt",
    "dist/llms.txt",
    "dist/llms-full.txt",
    "dist/identity.md",
    "dist/trust.md",
    "dist/rss.xml",
    "dist/.well-known/security.txt",
    "dist/humans.txt",
    "dist/agent-pack/lmd-rfq-schema.json",
    "dist/agent-pack/lmd-decision-rules.md",
    "dist/agent-pack/lmd-prompt-library.md",
    "dist/agent-pack/lmd-quality-checklist.md",
    "dist/decision-map/lmd-decision-map-v1.md",
    "dist/schemas/lmd-decision-brief-v1.schema.json",
    "dist/examples/lmd-decision-brief-worn-shaft-v1.json",
    "dist/examples/lmd-decision-brief-worn-shaft-v1.md",
    "dist/examples/lmd-decision-brief-monitoring-anomaly-v1.json",
    "dist/examples/lmd-decision-brief-surface-cladding-v1.json",
    "dist/examples/lmd-decision-brief-rfq-v1.json"
  ];
  const sitemap = sitemapText();

  for (const route of expectedRoutes) {
    const file = pagePathToDistFile(route);
    if (!existsSync(join(root, file))) {
      findings.push(`${file}: missing built route`);
      continue;
    }
    const html = read(file);
    const visibleText = visibleTextFromHtml(html);
    if ((html.match(/<h1\b/gi) ?? []).length !== 1) findings.push(`${file}: expected exactly one H1`);
    if (!/<title>[^<]{8,}<\/title>/i.test(html)) findings.push(`${file}: missing nonempty title`);
    if (!/<meta name="description" content="[^"]{20,}"/i.test(html)) findings.push(`${file}: missing nonempty description`);
    if (!/<link rel="canonical" href="https:\/\/manishsharma\.dev[^"]*"/i.test(html)) {
      findings.push(`${file}: missing canonical URL`);
    }
    for (const phrase of ["TODO", "FIXME", "Default example text:", "audit marker", "test marker", "debug"]) {
      if (visibleText.includes(phrase)) findings.push(`${file}: visible text contains "${phrase}"`);
    }
    for (const bad of ["pages.dev", "exafuse-website-react", "www.exafuse.de"]) {
      if (html.includes(bad)) findings.push(`${file}: contains staging or wrong production host "${bad}"`);
    }
    const lowerVisible = visibleText.toLowerCase();
    for (const unsafe of ["final engineering approval", "material certification", "quality guarantee", "safety-critical acceptance"]) {
      let index = lowerVisible.indexOf(unsafe);
      while (index >= 0) {
        if (!preflightBoundaryContext(lowerVisible, index, unsafe)) {
          findings.push(`${file}: visible text contains unsafe phrase without boundary context "${unsafe}"`);
          break;
        }
        index = lowerVisible.indexOf(unsafe, index + unsafe.length);
      }
    }
    const routeUrl = `https://manishsharma.dev${route === "/" ? "/" : route}`;
    if (!sitemap.includes(routeUrl)) findings.push(`sitemap: missing ${routeUrl}`);
  }

  for (const file of expectedFiles) {
    if (!existsSync(join(root, file))) findings.push(`${file}: missing public build artifact`);
  }
  for (const file of ["dist/llms.txt", "dist/llms-full.txt"]) {
    if (!existsSync(join(root, file))) continue;
    const text = read(file);
    for (const phrase of [
      "https://manishsharma.dev/brief-standard",
      "https://manishsharma.dev/schemas/lmd-decision-brief-v1.schema.json",
      "https://manishsharma.dev/examples/lmd-decision-brief-worn-shaft-v1.json"
    ]) {
      if (!text.includes(phrase)) findings.push(`${file}: missing "${phrase}"`);
    }
  }
  if (!existsSync(join(root, ".github/workflows/deploy.yml"))) findings.push(".github/workflows/deploy.yml: missing deploy workflow");
  fail("Preflight audit failed", findings);
}

function auditSeoSocial() {
  const findings = [];
  const pages = [
    "/",
    "/thesis/",
    "/domains/lmd-ded/",
    "/identity/",
    "/resources/",
    "/tools/",
    "/decision-map/",
    "/brief-standard/",
    "/brief-template/",
    "/demo/",
    "/claims/",
    "/no-hype/",
    "/de/",
    "/trust/",
    "/for-ai-agents/"
  ];
  for (const route of pages) {
    const file = pagePathToDistFile(route);
    if (!existsSync(join(root, file))) {
      findings.push(`${file}: missing built page`);
      continue;
    }
    const html = read(file);
    for (const marker of [
      '<meta property="og:title"',
      '<meta property="og:description"',
      '<meta property="og:type"',
      '<meta property="og:url"',
      '<link rel="canonical"',
      '<meta name="twitter:card"',
      '<meta name="twitter:title"',
      '<meta name="twitter:description"'
    ]) {
      if (!html.includes(marker)) findings.push(`${file}: missing ${marker}`);
    }
    if (!html.includes("https://manishsharma.dev")) findings.push(`${file}: missing canonical host in metadata`);
    for (const bad of ["pages.dev", "exafuse-website-react", "www.exafuse.de"]) {
      if (html.includes(bad)) findings.push(`${file}: contains staging or wrong production host "${bad}"`);
    }
  }
  fail("SEO/social audit failed", findings);
}

function auditExperience() {
  const findings = [];
  const requiredFiles = [
    "dist/trust/index.html",
    "dist/404.html",
    "dist/rss.xml",
    "dist/trust.md",
    "dist/.well-known/security.txt",
    "dist/humans.txt"
  ];

  for (const file of requiredFiles) {
    if (!existsSync(join(root, file))) findings.push(`${file}: missing world-class trust/discovery artifact`);
  }

  const homeFile = "dist/index.html";
  if (existsSync(join(root, homeFile))) {
    const html = read(homeFile);
    const visibleText = visibleTextFromHtml(html);
    for (const phrase of [
      "Run the Decision Cockpit",
      "View public proof",
      "Read the method",
      "The broader question behind the current work",
      "One public industrial story, supported by a working product and an authored note",
      "One idea behind the broader platform",
      "A Prediction Is Not Yet an Industrial Decision"
    ]) {
      if (!visibleText.includes(phrase)) findings.push(`${homeFile}: missing product-path marker "${phrase}"`);
    }
    if (!html.includes('rel="alternate" hreflang="de"')) findings.push(`${homeFile}: missing German alternate link`);
    if (!html.includes('rel="stylesheet"')) findings.push(`${homeFile}: missing cacheable external stylesheet`);
    if (!html.includes('name="last-modified" content="2026-07-17"')) findings.push(`${homeFile}: release date is not current`);
  }

  const toolsFile = "dist/tools/index.html";
  if (existsSync(join(root, toolsFile))) {
    const visibleText = visibleTextFromHtml(read(toolsFile));
    for (const marker of ["Decision signal", "Top 3 critical gaps", "Top 3 risk flags", "Evidence needed", "Open full brief"]) {
      if (!visibleText.includes(marker)) findings.push(`${toolsFile}: missing progressive-output marker "${marker}"`);
    }
    const cockpitSource = read("src/components/LmdDecisionCockpit.tsx");
    for (const marker of [
      "What is the review context?",
      "Dimensions / approximate mass known?",
      "Quantity / target date known?",
      "This only gives the reviewer context; it does not change technical evidence requirements."
    ]) {
      if (!cockpitSource.includes(marker)) findings.push(`${cockpitSource}: missing progressive intake-context marker "${marker}"`);
    }
  }

  const reviewFile = "dist/review/index.html";
  if (existsSync(join(root, reviewFile))) {
    const visibleText = visibleTextFromHtml(read(reviewFile));
    for (const marker of [
      "Review one decision journey. Help make the next one clearer.",
      "No data collection",
      "Make a non-confidential review note.",
      "Ready to test, not yet tested",
      "Review audience (optional)",
      "Primary friction",
      "Recover from an invalid route",
      "Download review record .json",
      "Do not include customer, employer, personal, credential, technical, or safety-critical information."
    ]) {
      if (!visibleText.includes(marker)) findings.push(`${reviewFile}: missing public-review marker "${marker}"`);
    }
  } else {
    findings.push(`${reviewFile}: missing public-review page`);
  }

  const publicReviewSource = "src/lib/publicReview.ts";
  if (existsSync(join(root, publicReviewSource))) {
    const source = read(publicReviewSource);
    for (const marker of ["Privacy check:", "No non-confidential comment added.", "public-review note", "Audience:", "Primary friction:", "recovery", "PUBLIC_REVIEW_RECORD_VERSION", "noTechnicalDataStatement"]) {
      if (!source.includes(marker)) findings.push(`${publicReviewSource}: missing safe-review note marker "${marker}"`);
    }
  } else {
    findings.push(`${publicReviewSource}: missing`);
  }

  const cockpitSource = "src/components/LmdDecisionCockpit.tsx";
  if (existsSync(join(root, cockpitSource))) {
    const source = read(cockpitSource);
    for (const marker of ['inputType="radio"', 'name="review-role"', 'name="review-phase"', "Clear optional context"]) {
      if (!source.includes(marker)) findings.push(`${cockpitSource}: missing exclusive optional-context control "${marker}"`);
    }
  }

  for (const { file, text } of scanFiles(distRoot, [".html"])) {
    const visibleText = visibleTextFromHtml(text);
    const expectedLabel = file === "dist/de/index.html" ? "Seiteninformationen" : "Page information";
    if (!visibleText.includes(expectedLabel)) findings.push(`${file}: missing visible page provenance label "${expectedLabel}"`);
    if (!visibleText.includes("Manish Sharma Lab")) findings.push(`${file}: missing visible page provenance owner`);
  }

  const germanFile = "dist/de/index.html";
  if (existsSync(join(root, germanFile))) {
    const html = read(germanFile);
    if (!/<html[^>]+lang="de"/i.test(html)) findings.push(`${germanFile}: document language is not German`);
    if (!html.includes('rel="alternate" hreflang="en"')) findings.push(`${germanFile}: missing English alternate link`);
    if (html.includes("Ã") || html.includes("â€”")) findings.push(`${germanFile}: contains likely mojibake`);
  }

  const trustFile = "dist/trust/index.html";
  if (existsSync(join(root, trustFile))) {
    const visibleText = visibleTextFromHtml(read(trustFile));
    for (const phrase of [
      "No first-party cookies or analytics",
      "Static, public-source surface",
      "No formal accessibility certification is claimed.",
      "Decision support is not decision authority"
    ]) {
      if (!visibleText.includes(phrase)) findings.push(`${trustFile}: missing trust marker "${phrase}"`);
    }
  }

  const sourcesFile = "dist/research/core-lmd-ai-sources/index.html";
  if (existsSync(join(root, sourcesFile))) {
    const visibleText = visibleTextFromHtml(read(sourcesFile));
    for (const forbidden of ["Working draft", "Sources to verify", "source URL not yet verified", "review source to verify"]) {
      if (visibleText.includes(forbidden)) findings.push(`${sourcesFile}: still exposes internal source-queue language "${forbidden}"`);
    }
    for (const required of ["ISO/ASTM 52900:2021", "NIST AI Risk Management Framework", "Does not prove"]) {
      if (!visibleText.includes(required)) findings.push(`${sourcesFile}: missing verified-source marker "${required}"`);
    }
  }

  if (existsSync(join(root, "dist/rss.xml"))) {
    const rss = read("dist/rss.xml");
    for (const marker of ['<rss version="2.0"', '<atom:link ', "<item>", "<guid isPermaLink=\"true\">"]) {
      if (!rss.includes(marker)) findings.push(`dist/rss.xml: missing ${marker}`);
    }
  }

  if (existsSync(join(root, "dist/404.html"))) {
    const html = read("dist/404.html");
    if (!html.includes('name="robots" content="noindex, follow"')) findings.push("dist/404.html: missing noindex recovery metadata");
    if (!visibleTextFromHtml(html).includes("Search the site")) findings.push("dist/404.html: missing search recovery action");
  }

  if (existsSync(join(root, "dist/index.html"))) {
    const html = read("dist/index.html");
    for (const marker of ["aria-activedescendant", "URLSearchParams", "setBackgroundInert", 'role="combobox"']) {
      if (!html.includes(marker)) findings.push(`dist/index.html: search dialog missing behavior marker "${marker}"`);
    }
  }

  const toolsSource = read("src/pages/tools.astro");
  if (toolsSource.includes("document.querySelector(window.location.hash)")) {
    findings.push("src/pages/tools.astro: raw URL hashes must not be passed to querySelector");
  }
  for (const marker of ['rawHash.startsWith("preset=")', "document.getElementById(targetId)"]) {
    if (!toolsSource.includes(marker)) findings.push(`src/pages/tools.astro: missing safe hash marker "${marker}"`);
  }

  const clipboardSource = read("src/lib/clipboard.ts");
  for (const marker of ['legacyDocument.execCommand("copy")', "COPY_UNAVAILABLE_MESSAGE"]) {
    if (!clipboardSource.includes(marker)) findings.push(`src/lib/clipboard.ts: missing copy-recovery marker "${marker}"`);
  }
  for (const exportFile of ["src/components/DecisionBriefExport.tsx", "src/components/DecisionBriefCard.tsx"]) {
    const source = read(exportFile);
    for (const marker of ["copyText(", "COPY_UNAVAILABLE_MESSAGE", 'aria-live="polite"']) {
      if (!source.includes(marker)) findings.push(`${exportFile}: missing copy-recovery marker "${marker}"`);
    }
  }

  for (const { file, text } of scanFiles(["src"], [".astro"])) {
    if (text.includes("datePublished: SITE.lastUpdated")) {
      findings.push(`${file}: datePublished must use the truthful original publication date, not the global modification date`);
    }
  }

  const htmlFiles = scanFiles(["dist"], [".html"]);
  const allowedPresetIds = new Set(["worn-shaft", "monitoring-anomaly", "surface-cladding", "lmd-vs-slm", "rfq"]);
  const routeFileForHref = (href) => {
    const path = href.split("#")[0].split("?")[0] || "/";
    if (path === "/") return "dist/index.html";
    if (/\.[a-z0-9]+$/i.test(path)) return `dist${path}`;
    return `dist${path.replace(/\/$/, "")}/index.html`;
  };

  for (const { file, text } of htmlFiles) {
    const h1Count = (text.match(/<h1\b/gi) ?? []).length;
    if (h1Count !== 1) findings.push(`${file}: expected exactly one H1, found ${h1Count}`);

    const visibleText = visibleTextFromHtml(text);
    const visibleLabDate = visibleText.match(/Lab note\s*[·-]\s*(\d{4}-\d{2}-\d{2})/i)?.[1];
    const structuredPublishedDate = text.match(/"datePublished":"(\d{4}-\d{2}-\d{2})"/)?.[1];
    const structuredModifiedDate = text.match(/"dateModified":"(\d{4}-\d{2}-\d{2})"/)?.[1];
    if (visibleLabDate && structuredPublishedDate && visibleLabDate !== structuredPublishedDate) {
      findings.push(`${file}: visible publication date ${visibleLabDate} differs from structured date ${structuredPublishedDate}`);
    }
    if (structuredPublishedDate && structuredModifiedDate && structuredModifiedDate < structuredPublishedDate) {
      findings.push(`${file}: dateModified ${structuredModifiedDate} predates datePublished ${structuredPublishedDate}`);
    }

    const hrefs = [...text.matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi)].map((match) => match[1]);
    for (const href of hrefs) {
      if (!href.startsWith("/") || href.startsWith("//")) continue;
      const targetFile = routeFileForHref(href);
      if (!existsSync(join(root, targetFile))) {
        findings.push(`${file}: internal link target is missing (${href} -> ${targetFile})`);
        continue;
      }
      const fragment = href.includes("#") ? href.split("#")[1].split("?")[0] : "";
      if (!fragment) continue;
      if (fragment.startsWith("preset=")) {
        const presetId = fragment.slice("preset=".length).split("&")[0];
        if (targetFile !== "dist/tools/index.html") {
          findings.push(`${file}: preset fragment must target the tools workbench (${href})`);
        } else if (!allowedPresetIds.has(presetId)) {
          findings.push(`${file}: unknown cockpit preset fragment (${href})`);
        }
        continue;
      }
      let decodedFragment;
      try {
        decodedFragment = decodeURIComponent(fragment);
      } catch {
        findings.push(`${file}: internal fragment is not valid URL encoding (${href})`);
        continue;
      }
      const targetHtml = read(targetFile);
      const escaped = decodedFragment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      if (!new RegExp(`\\bid=["']${escaped}["']`, "i").test(targetHtml)) {
        findings.push(`${file}: internal fragment target is missing (${href})`);
      }
    }
  }

  fail("Experience audit failed", findings);
}

function auditVisualSystem() {
  const findings = [];
  const packageJson = read("package.json");
  const bannedRuntimeTerms = ["mermaid", "lottie", "three", "@lottiefiles", "pixi.js"];

  for (const term of bannedRuntimeTerms) {
    if (packageJson.includes(`"${term}"`)) findings.push(`package.json: visual runtime dependency "${term}" is not allowed`);
  }

  for (const { file, text } of scanFiles(["src"], [".astro", ".tsx", ".ts", ".js", ".mjs"])) {
    for (const term of ["mermaid.initialize", "mermaid.render", "lottie.loadAnimation", "new THREE."]) {
      if (text.includes(term)) findings.push(`${file}: contains browser-side visual runtime "${term}"`);
    }
  }

  for (const file of walk("public").filter((item) => item.endsWith(".svg"))) {
    const svg = read(file);
    if (/<metadata\b/i.test(svg)) findings.push(`${file}: SVG contains editor metadata`);
    if (/data:image\//i.test(svg)) findings.push(`${file}: SVG embeds a raster image`);
  }

  for (const file of walk("public").filter((item) => /\.(png|jpe?g)$/i.test(item))) {
    const size = statSync(join(root, file)).size;
    if (size > 600_000) findings.push(`${file}: large raster visual exceeds 600 KB (${size} bytes)`);
  }

  const heroSource = read("src/components/HeroLaserVisual.tsx");
  for (const match of heroSource.matchAll(/fontSize="(\d+)"/g)) {
    if (Number(match[1]) < 16) findings.push(`src/components/HeroLaserVisual.tsx: SVG label below 16px (${match[1]}px)`);
  }

  const diagramSources = [
    "src/components/HeroLaserVisual.tsx",
    "src/components/PageHeroVisual.astro",
    "src/components/ProcessLoop.astro",
    "src/components/EvidenceRail.astro",
    "src/components/EvidenceLadder.astro",
    "src/components/IdentityGraph.astro"
  ];
  for (const file of diagramSources) {
    if (!existsSync(join(root, file))) {
      findings.push(`${file}: missing diagram source`);
      continue;
    }
    const source = read(file);
    if (!source.includes("data-visual-type") && !source.includes("diagram-frame")) {
      findings.push(`${file}: missing visual classification marker`);
    }
  }

  const homeFile = "dist/index.html";
  if (existsSync(join(root, homeFile))) {
    const home = read(homeFile);
    const homeImages = [...home.matchAll(/<img\b[^>]*\bsrc="([^"]+)"[^>]*>/gi)].map((match) => match[1]);
    const visualBytes = homeImages
      .filter((src) => src.startsWith("/"))
      .reduce((total, src) => {
        const file = join(root, "public", src.replace(/^\//, ""));
        return total + (existsSync(file) ? statSync(file).size : 0);
      }, 0);
    if (visualBytes > 350_000) findings.push(`${homeFile}: homepage visual asset budget exceeds 350 KB (${visualBytes} bytes)`);
    if (!home.includes("Illustrative LMD process schematic")) findings.push(`${homeFile}: missing labelled LMD process schematic`);
  }

  for (const { file, text } of scanFiles(distRoot, [".html"])) {
    for (const tag of text.match(/<img\b[^>]*>/gi) ?? []) {
      if (!/\bwidth="\d+"/i.test(tag) || !/\bheight="\d+"/i.test(tag)) {
        findings.push(`${file}: image omits explicit width or height`);
      }
      if (!/\bloading="(?:lazy|eager)"/i.test(tag)) findings.push(`${file}: image omits documented loading behavior`);
    }
  }

  const deFile = "dist/de/index.html";
  if (existsSync(join(root, deFile))) {
    const html = read(deFile);
    if (/<img\b/i.test(html)) findings.push(`${deFile}: German overview must not use a baked-text visual asset`);
    for (const phrase of ["Arbeit", "Referenz"]) {
      if (!visibleTextFromHtml(html).includes(phrase)) findings.push(`${deFile}: missing German visual/navigation label "${phrase}"`);
    }
  }

  for (const { file, text } of scanFiles(distRoot, [".html", ".js", ".json", ".txt", ".md", ".svg", ".xml"])) {
    if (text.includes("github.com/manish-sharma-ai")) {
      findings.push(`${file}: contains a public repository or organization reference`);
    }
  }

  fail("Visual-system audit failed", findings);
}

function auditExafuseReadonlyRecord() {
  const findings = [];
  const registry = "src/data/exafusePublicProof.ts";
  const record = "docs/exafuse-public-proof-import.md";
  for (const file of [registry, record]) {
    if (!existsSync(join(root, file))) findings.push(`${file}: missing public-proof import record`);
  }
  if (findings.length === 0) {
    const source = read(registry);
    const docs = read(record);
    if (!/sourceCommit\s*=\s*"[0-9a-f]{40}"/.test(source)) findings.push(`${registry}: missing 40-character reviewed source commit`);
    for (const marker of ["read-only", "0d4938331eaf2f586661587e427bc29aabdbf61c", "private repository location"]) {
      if (!docs.toLowerCase().includes(marker.toLowerCase())) findings.push(`${record}: missing "${marker}"`);
    }
    for (const forbidden of ["OneDrive - Creative Polymer", "C:\\Users\\", "github.com-manishsharma05"]) {
      if (source.includes(forbidden) || docs.includes(forbidden)) findings.push(`proof import record exposes private source locator "${forbidden}"`);
    }
  }
  fail("Exafuse readonly-record audit failed", findings);
}

function auditExafuseAttribution() {
  const findings = [];
  const mediaRoot = "public/media/exafuse";
  const mediaFiles = existsSync(join(root, mediaRoot)) ? walk(mediaRoot) : [];
  const registry = existsSync(join(root, "src/data/exafusePublicProof.ts")) ? read("src/data/exafusePublicProof.ts") : "";
  for (const file of mediaFiles.filter((file) => /\.(avif|webp|jpe?g)$/i.test(file))) {
    const basename = file.split("/").pop()?.replace(/-\d+\.(avif|webp|jpe?g)$/i, "") ?? "";
    if (!registry.includes(basename)) findings.push(`${file}: no matching media family in the proof registry`);
  }
  for (const { file, text } of scanFiles(distRoot, [".html"])) {
    const mediaMatches = text.match(/\/media\/exafuse\//g) ?? [];
    if (mediaMatches.length > 0 && !visibleTextFromHtml(text).includes("Exafuse")) {
      findings.push(`${file}: imports Exafuse media without visible Exafuse attribution`);
    }
  }
  fail("Exafuse attribution audit failed", findings);
}

function auditExafuseProofClaims() {
  const findings = [];
  const registryPath = "src/data/exafusePublicProof.ts";
  if (!existsSync(join(root, registryPath))) {
    fail("Exafuse proof-claims audit failed", [`${registryPath}: missing`]);
    return;
  }
  const source = read(registryPath);
  for (const marker of ["sourcePath:", "limitation:", "whatItDoesNotProve:", "personalContribution: null", "selectedMedia:"]) {
    if (!source.includes(marker)) findings.push(`${registryPath}: missing required proof field marker "${marker}"`);
  }
  for (const { file, text } of scanFiles(distRoot, [".html"])) {
    if (!text.includes("/media/exafuse/")) continue;
    for (const phrase of ["staging", "localhost", "OneDrive - Creative Polymer", "github.com-manishsharma05"]) {
      if (text.toLowerCase().includes(phrase.toLowerCase())) findings.push(`${file}: rendered unsafe proof phrase "${phrase}"`);
    }
  }
  fail("Exafuse proof-claims audit failed", findings);
}

function auditPersonalContribution() {
  const findings = [];
  const registryPath = "src/data/exafusePublicProof.ts";
  const source = existsSync(join(root, registryPath)) ? read(registryPath) : "";
  const entriesSource = source.slice(source.indexOf("export const EXAFUSE_PUBLIC_PROOF"));
  const nullContributions = entriesSource.match(/personalContribution:\s*null/g) ?? [];
  if (nullContributions.length !== 4) findings.push(`${registryPath}: all four imported company cases must retain null personalContribution without public contribution evidence`);
  const risky = /Manish Sharma[^.]{0,100}\b(designed|built|led|validated|delivered|manufactured)\b/gi;
  for (const { file, text } of scanFiles(["src"], [".astro", ".ts", ".tsx"])) {
    if (file === registryPath) continue;
    if (risky.test(text) && /Exafuse/i.test(text)) findings.push(`${file}: potential unsourced personal contribution claim near Exafuse content`);
  }
  fail("Personal-contribution audit failed", findings);
}

function auditHomepageSequence() {
  const findings = [];
  const file = "dist/index.html";
  if (!existsSync(join(root, file))) {
    fail("Homepage-sequence audit failed", [`${file}: missing`]);
    return;
  }
  const text = read(file);
  const visible = visibleTextFromHtml(text);
  const order = ["public-proof", "product", "method", "knowledge"].map((chapter) => text.indexOf(`data-page-chapter="${chapter}"`));
  if (order.some((index) => index < 0) || !(order[0] < order[1] && order[1] < order[2] && order[2] < order[3])) {
    findings.push(`${file}: expected public proof -> product -> method -> selected-work chapter order`);
  }
  for (const phrase of ["Run the Decision Cockpit", "Duisburg bridge components", "Exafuse", "Personal mission"]) {
    if (!visible.includes(phrase)) findings.push(`${file}: missing homepage proof narrative marker "${phrase}"`);
  }
  if ((text.match(/data-operating-loop="homepage"/g) ?? []).length !== 1) findings.push(`${file}: must contain exactly one homepage operating loop`);
  fail("Homepage-sequence audit failed", findings);
}

function auditReferenceMenu() {
  const findings = [];
  const header = "src/components/Header.astro";
  const mobile = "src/components/MobileMenu.astro";
  for (const file of [header, mobile]) {
    if (!existsSync(join(root, file))) {
      findings.push(`${file}: missing`);
      continue;
    }
    const source = read(file);
    const destinationCount = (source.match(/href: "\/(tools|frameworks|evidence|brief-standard|resources)"/g) ?? []).length;
    if (file === mobile && destinationCount < 5) findings.push(`${file}: compact Reference group does not expose the five approved destinations`);
  }
  const home = existsSync(join(root, "dist/index.html")) ? read("dist/index.html") : "";
  const referenceSection = home.match(/<details[^>]*data-nav-flyout[\s\S]*?<\/details>/i)?.[0] ?? "";
  if (referenceSection && (referenceSection.match(/class="nav-menu-link/g) ?? []).length > 5) findings.push("dist/index.html: Reference menu exposes more than five destinations");
  fail("Reference-menu audit failed", findings);
}

function auditAssetBudget() {
  const findings = [];
  const mediaRoot = "public/media/exafuse";
  const files = existsSync(join(root, mediaRoot)) ? walk(mediaRoot).filter((file) => /\.(avif|webp|jpe?g)$/i.test(file)) : [];
  const total = files.reduce((sum, file) => sum + statSync(join(root, file)).size, 0);
  if (files.length !== 28) findings.push(`${mediaRoot}: expected 28 responsive derivative files, found ${files.length}`);
  if (total > 12 * 1024 * 1024) findings.push(`${mediaRoot}: total imported media exceeds 12 MB (${total} bytes)`);
  for (const file of files) {
    const size = statSync(join(root, file)).size;
    if (size > 500_000) findings.push(`${file}: derivative exceeds 500 KB (${size} bytes)`);
  }
  fail("Asset-budget audit failed", findings);
}

function auditBoundaryDensity() {
  const findings = [];
  const phrases = ["Preliminary decision-support only", "Confidence is not approval"];
  for (const { file, text } of scanFiles(distRoot, [".html"])) {
    const interactiveArtifact = ["dist/tools/index.html", "dist/brief-standard/index.html", "dist/brief-template/index.html", "dist/demo/index.html", "dist/playbooks/index.html"].includes(file);
    const visible = visibleTextFromHtml(text);
    for (const phrase of phrases) {
      const count = visible.split(phrase).length - 1;
      if (!interactiveArtifact && count > 3) findings.push(`${file}: repeats "${phrase}" ${count} times`);
      if (interactiveArtifact && count > 3) console.warn(`${file}: ${phrase} appears ${count} times in a functional artifact surface.`);
    }
  }
  fail("Boundary-density audit failed", findings);
}

function auditPublicSafeCopy() {
  const findings = [];
  const forbidden = ["OneDrive - Creative Polymer", "C:\\Users\\", "TODO", "FIXME", "exafuse-website-react", "github.com-manishsharma05", "localhost"];
  for (const { file, text } of scanFiles(distRoot, [".html", ".js", ".json", ".txt", ".xml", ".md"])) {
    for (const phrase of forbidden) {
      if (text.includes(phrase)) findings.push(`${file}: exposes non-public phrase "${phrase}"`);
    }
  }
  fail("Public-safe-copy audit failed", findings);
}

function auditSourceCopyLength() {
  const findings = [];
  const casePages = walk("src/pages/public-work/exafuse").filter((file) => file.endsWith(".astro"));
  for (const file of casePages) {
    const text = read(file);
    for (const literal of text.match(/"([^"\n]{200,})"/g) ?? []) {
      if (literal.length > 480) findings.push(`${file}: contains an unusually long literal; keep proof-story copy concise and paraphrased`);
    }
  }
  fail("Source-copy-length audit failed", findings);
}

function auditCanonicalDomain() {
  const findings = [];
  const requiredFiles = [
    "dist/index.html",
    "dist/tools/index.html",
    "dist/brief-standard/index.html",
    "dist/llms.txt",
    "dist/llms-full.txt",
    "dist/robots.txt",
    "dist/sitemap-index.xml",
    "dist/sitemap-0.xml",
    "dist/schemas/lmd-decision-brief-v1.schema.json"
  ];

  if (distRoot.length === 0) {
    findings.push("dist: missing production output; run npm run build before audit:canonical-domain");
  }

  for (const file of requiredFiles) {
    if (!existsSync(join(root, file))) findings.push(`${file}: missing`);
  }

  const cnameFile = "dist/CNAME";
  if (!existsSync(join(root, cnameFile))) {
    findings.push(`${cnameFile}: missing`);
  } else if (read(cnameFile).trim() !== "manishsharma.dev") {
    findings.push(`${cnameFile}: must contain exactly "manishsharma.dev"`);
  }

  for (const { file, text } of scanFiles(distRoot, [".html", ".js", ".json", ".txt", ".xml", ".md", ".svg"])) {
    if (text.includes(oldGithubPagesSite)) {
      findings.push(`${file}: contains old GitHub Pages site URL "${oldGithubPagesSite}"`);
    }
    for (const bad of ["pages.dev", "exafuse-website-react", "www.exafuse.de"]) {
      if (text.includes(bad)) findings.push(`${file}: contains staging or wrong production host "${bad}"`);
    }
  }

  const routeChecks = [
    "/",
    "/identity/",
    "/tools/",
    "/brief-standard/",
    "/brief-template/",
    "/demo/",
    "/for-ai-agents/"
  ];
  for (const route of routeChecks) {
    const file = pagePathToDistFile(route);
    if (!existsSync(join(root, file))) continue;
    const html = read(file);
    const canonicalUrl = `${canonicalSite}${route === "/" ? "/" : route.replace(/\/$/, "")}`;
    for (const marker of [
      `<link rel="canonical" href="${canonicalUrl}"`,
      `<meta property="og:url" content="${canonicalUrl}"`,
      `<meta property="og:image" content="${canonicalSite}/og-image.png"`,
      `<meta name="twitter:image" content="${canonicalSite}/og-image.png"`
    ]) {
      if (!html.includes(marker)) findings.push(`${file}: missing "${marker}"`);
    }
    if (!html.includes(`${canonicalSite}/identity#manish-sharma`)) {
      findings.push(`${file}: missing canonical Person @id reference`);
    }
  }

  const textExpectations = [
    ["dist/robots.txt", `Sitemap: ${canonicalSite}/sitemap-index.xml`],
    ["dist/llms.txt", `Canonical site: ${canonicalSite}`],
    ["dist/llms-full.txt", `Canonical URL: ${canonicalSite}`],
    ["dist/llms.txt", `${canonicalSite}/brief-standard`],
    ["dist/llms.txt", `${canonicalSite}/schemas/lmd-decision-brief-v1.schema.json`],
    ["dist/llms.txt", `${canonicalSite}/examples/lmd-decision-brief-worn-shaft-v1.json`],
    ["dist/llms-full.txt", `${canonicalSite}/brief-standard`],
    ["dist/llms-full.txt", `${canonicalSite}/schemas/lmd-decision-brief-v1.schema.json`],
    ["dist/llms-full.txt", `${canonicalSite}/examples/lmd-decision-brief-worn-shaft-v1.json`],
    ["dist/schemas/lmd-decision-brief-v1.schema.json", `"${canonicalSite}/schemas/lmd-decision-brief-v1.schema.json"`],
    ["dist/sitemap-index.xml", `${canonicalSite}/sitemap-0.xml`],
    ["dist/sitemap-0.xml", `${canonicalSite}/brief-standard`]
  ];
  for (const [file, expected] of textExpectations) {
    if (!existsSync(join(root, file))) continue;
    if (!read(file).includes(expected)) findings.push(`${file}: missing "${expected}"`);
  }

  const configPath = "src/config/externalLinks.ts";
  if (!existsSync(join(root, configPath))) {
    findings.push(`${configPath}: missing`);
  } else {
    const config = read(configPath);
    if (!config.includes(`MANISH_SITE_URL = "${canonicalSite}"`)) {
      findings.push(`${configPath}: MANISH_SITE_URL is not ${canonicalSite}`);
    }
    if (!config.includes('EXAFUSE_LINK_MODE: ExafuseLinkMode = "production-safe"')) {
      findings.push(`${configPath}: EXAFUSE_LINK_MODE is not production-safe`);
    }
  }

  fail("Canonical-domain audit failed", findings);
}

const audits = {
  "visual-text": auditVisualText,
  "rendered-text": auditRenderedText,
  "rendered-public-language": auditRenderedPublicLanguage,
  links: auditLinks,
  "links:report": auditLinksReport,
  claims: auditClaims,
  boundaries: auditBoundaries,
  "homepage-product": auditHomepageProduct,
  "brief-artifact": auditBriefArtifact,
  "decision-brief": auditDecisionBrief,
  "brief-boundaries": auditBriefBoundaries,
  "debug-text": auditDebugText,
  "a11y-static": auditA11yStatic,
  "german-brief": auditGermanBrief,
  "playbook-format": auditPlaybookFormat,
  "held-claims": auditHeldClaims,
  "mobile-static": auditMobileStatic,
  "public-profiles": auditPublicProfiles,
  "decision-boundaries": auditDecisionBoundaries,
  "exafuse-mode-human": auditExafuseModeHuman,
  "brief-status-consistency": auditBriefStatusConsistency,
  "human-migration-language": auditHumanMigrationLanguage,
  "control-text-readability": auditControlTextReadability,
  "claims-human-surface": auditClaimsHumanSurface,
  "ai-safe-summary": auditAiSafeSummary,
  "email-manual-boundary": auditEmailManualBoundary,
  "public-review-schema": auditPublicReviewRecordSchema,
  "brief-schema": auditBriefSchema,
  "human-exafuse-ctas": auditHumanExafuseCtas,
  "rubric-format": auditRubricFormat,
  preflight: auditPreflight,
  "seo-social": auditSeoSocial,
  experience: auditExperience,
  visuals: auditVisualSystem,
  "canonical-domain": auditCanonicalDomain,
  "exafuse-readonly-record": auditExafuseReadonlyRecord,
  "exafuse-attribution": auditExafuseAttribution,
  "exafuse-proof-claims": auditExafuseProofClaims,
  "personal-contribution": auditPersonalContribution,
  "homepage-sequence": auditHomepageSequence,
  "reference-menu": auditReferenceMenu,
  "asset-budget": auditAssetBudget,
  "boundary-density": auditBoundaryDensity,
  "public-safe-copy": auditPublicSafeCopy,
  "source-copy-length": auditSourceCopyLength,
  all() {
    auditVisualText();
    auditRenderedText();
    auditRenderedPublicLanguage();
    auditLinks();
    auditClaims();
    auditBoundaries();
    auditHomepageProduct();
    auditBriefArtifact();
    auditDecisionBrief();
    auditBriefBoundaries();
    auditDebugText();
    auditA11yStatic();
    auditGermanBrief();
    auditPlaybookFormat();
    auditHeldClaims();
    auditMobileStatic();
    auditPublicProfiles();
    auditDecisionBoundaries();
    auditExafuseModeHuman();
    auditBriefStatusConsistency();
    auditHumanMigrationLanguage();
    auditControlTextReadability();
    auditClaimsHumanSurface();
    auditAiSafeSummary();
    auditEmailManualBoundary();
    auditPublicReviewRecordSchema();
    auditBriefSchema();
    auditHumanExafuseCtas();
    auditRubricFormat();
    auditPreflight();
    auditSeoSocial();
    auditExperience();
    auditVisualSystem();
    auditCanonicalDomain();
    auditExafuseReadonlyRecord();
    auditExafuseAttribution();
    auditExafuseProofClaims();
    auditPersonalContribution();
    auditHomepageSequence();
    auditReferenceMenu();
    auditAssetBudget();
    auditBoundaryDensity();
    auditPublicSafeCopy();
    auditSourceCopyLength();
  }
};

if (!audits[mode]) {
  console.error(`Unknown audit mode: ${mode}`);
  process.exit(1);
}

audits[mode]();
if (!process.exitCode) console.log(`audit:${mode} passed`);
