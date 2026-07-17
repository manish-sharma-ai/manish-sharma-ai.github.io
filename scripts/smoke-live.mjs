import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const SITE = "https://manishsharma.dev";
const root = process.cwd();

const checks = [
  { path: "/", type: "html" },
  { path: "/tools/", type: "html" },
  { path: "/decision-map/", type: "html" },
  { path: "/brief-standard/", type: "html" },
  { path: "/brief-template/", type: "html" },
  { path: "/demo/", type: "html" },
  { path: "/claims/", type: "html" },
  { path: "/no-hype/", type: "html" },
  { path: "/for-ai-agents/", type: "html" },
  { path: "/de/", type: "html" },
  { path: "/llms.txt", type: "text" },
  { path: "/schemas/lmd-decision-brief-v1.schema.json", type: "json" }
];

const humanLanguageLeaks = [
  "Case source after migration",
  "RFQ path after migration",
  "Pathfinder after migration",
  "Builder after migration",
  "Source activates after Exafuse production migration",
  "View Exafuse after migration",
  "Exafuse RFQ path after migration",
  "Exafuse case link after migration",
  "Exafuse tool path after migration",
  "Exafuse AI-agent path after migration",
  "Exafuse knowledge link after migration",
  "Production link after Exafuse migration"
];

const forbiddenEverywhere = [
  "pages.dev",
  "exafuse-website-react",
  "www.exafuse.de",
  "Default example text",
  "TODO",
  "FIXME"
];

function readLocal(rel) {
  return readFileSync(join(root, rel), "utf8");
}

function visibleTextFromHtml(html) {
  const body = html.match(/<body[\s\S]*?>([\s\S]*?)<\/body>/i)?.[1] ?? html;
  return body
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function assertNoForbidden(findings, label, text, phrases) {
  for (const phrase of phrases) {
    if (text.includes(phrase)) findings.push(`${label}: contains "${phrase}"`);
  }
}

async function fetchText(path) {
  const url = `${SITE}${path}`;
  const response = await fetch(url, {
    headers: {
      "Cache-Control": "no-cache",
      "User-Agent": "ManishSharmaLab-live-smoke/1.0"
    }
  });
  const text = await response.text();
  return { url, response, text };
}

async function main() {
  const findings = [];

  const configPath = "src/config/externalLinks.ts";
  if (!existsSync(join(root, configPath))) {
    findings.push(`${configPath}: missing`);
  } else if (!readLocal(configPath).includes('EXAFUSE_LINK_MODE: ExafuseLinkMode = "production-safe"')) {
    findings.push(`${configPath}: EXAFUSE_LINK_MODE is not production-safe`);
  }

  for (const check of checks) {
    let result;
    try {
      result = await fetchText(check.path);
    } catch (error) {
      findings.push(`${SITE}${check.path}: fetch failed (${error.message})`);
      continue;
    }

    const { url, response, text } = result;
    if (!response.ok) findings.push(`${url}: expected 200 OK, got ${response.status}`);
    assertNoForbidden(findings, url, text, forbiddenEverywhere);

    if (check.type === "html") {
      const visibleText = visibleTextFromHtml(text);
      assertNoForbidden(findings, url, visibleText, [...humanLanguageLeaks, "debug"]);
    }

    if (check.path === "/") {
      const visibleText = visibleTextFromHtml(text);
      for (const phrase of ["Manish Sharma Lab", "I build AI systems for industrial decisions that need evidence, not just predictions."]) {
        if (!visibleText.includes(phrase)) findings.push(`${url}: missing homepage marker "${phrase}"`);
      }
    }

    if (check.path === "/brief-standard/") {
      const visibleText = visibleTextFromHtml(text);
      if (!visibleText.includes("LMD Decision Brief v1.0 Standard")) {
        findings.push(`${url}: missing brief-standard H1`);
      }
    }

    if (check.path === "/decision-map/") {
      const visibleText = visibleTextFromHtml(text);
      if (!visibleText.includes("Laser Metal Deposition Decision Map")) {
        findings.push(`${url}: missing decision-map H1`);
      }
    }

    if (check.path === "/llms.txt" && !text.includes("Central artifact: LMD Decision Brief v1.0")) {
      findings.push(`${url}: missing central artifact line`);
    }

    if (check.type === "json") {
      try {
        JSON.parse(text);
      } catch (error) {
        findings.push(`${url}: expected JSON (${error.message})`);
      }
    }
  }

  if (findings.length > 0) {
    console.error("smoke:live failed");
    findings.forEach((finding) => console.error(`- ${finding}`));
    process.exit(1);
  }

  console.log("smoke:live passed");
}

main();
