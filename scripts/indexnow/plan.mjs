import { appendFile } from "node:fs/promises";
import { join } from "node:path";
import { prepareIndexNow, safeErrorMessage } from "./lib.mjs";

const root = process.cwd();
const distDir = join(root, "dist");
const planDir = join(root, ".indexnow");
const key = process.env.INDEXNOW_KEY;

function outputLines(plan) {
  return [
    "enabled=true",
    `mode=${plan.mode}`,
    `url_count=${plan.urls.length}`,
    `has_urls=${plan.urls.length > 0 && !plan.skipReason && !plan.blocked}`,
    `skip_reason=${plan.skipReason ?? ""}`,
    `blocked=${plan.blocked}`
  ];
}

async function writeGithubOutput(plan) {
  if (!process.env.GITHUB_OUTPUT) return;
  await appendFile(process.env.GITHUB_OUTPUT, `${outputLines(plan).join("\n")}\n`, "utf8");
}

async function main() {
  if (!key) throw new Error("INDEXNOW_KEY is not configured");
  const result = await prepareIndexNow({
    distDir,
    planDir,
    key,
    deploymentSha: process.env.GITHUB_SHA ?? ""
  });
  await writeGithubOutput(result.plan);

  if (result.plan.skipReason) {
    console.warn(`IndexNow notification skipped: ${result.plan.skipReason}`);
  } else if (result.plan.blocked) {
    console.warn(`IndexNow notification plan is blocked by the ${result.plan.urls.length}-URL safety limit.`);
  } else {
    console.log(`IndexNow plan prepared: ${result.plan.mode} mode, ${result.plan.urls.length} canonical URL(s).`);
  }
}

main().catch((error) => {
  console.error(`IndexNow preparation failed: ${safeErrorMessage(error, key)}`);
  process.exit(1);
});
