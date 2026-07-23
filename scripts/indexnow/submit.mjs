import { join } from "node:path";
import {
  INDEXNOW_SITE,
  INDEXNOW_STATE_URL,
  assertIndexNowKey,
  canonicalFromHtml,
  fingerprintPageHtml,
  postIndexNow,
  readIndexNowPlan,
  safeErrorMessage,
  sha256,
  stableJson
} from "./lib.mjs";

const root = process.cwd();
const planPath = join(root, ".indexnow", "indexnow-plan.json");
const key = process.env.INDEXNOW_KEY;
const MAX_PROPAGATION_ATTEMPTS = 30;
const MAX_SUBMISSION_ATTEMPTS = 5;

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function pageEntries(plan) {
  return plan.urls.filter((entry) => entry.changeType === "added" || entry.changeType === "changed" || entry.changeType === "initial");
}

export async function waitForVerificationFile({ key, fetchImpl = fetch, sleepImpl = sleep, attempts = MAX_PROPAGATION_ATTEMPTS }) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const response = await fetchImpl(`${INDEXNOW_SITE}/${key}.txt`, { headers: { "Cache-Control": "no-cache" } });
      if (response.status === 200 && (await response.text()) === key) return;
    } catch {
      // The bounded retry below deliberately treats transient network errors as propagation delay.
    }
    if (attempt + 1 < attempts) await sleepImpl(10_000);
  }
  throw new Error("IndexNow verification file did not propagate before the timeout");
}

async function fetchLivePage(url, fetchImpl) {
  const response = await fetchImpl(url, { headers: { "Cache-Control": "no-cache" } });
  const html = await response.text();
  return { response, html };
}

export async function waitForLivePlan({ plan, fetchImpl = fetch, sleepImpl = sleep, attempts = MAX_PROPAGATION_ATTEMPTS }) {
  const entries = pageEntries(plan);
  if (entries.length === 0) {
    const [homepage, state] = await Promise.all([
      fetchLivePage(`${INDEXNOW_SITE}/`, fetchImpl),
      fetchImpl(INDEXNOW_STATE_URL, { headers: { "Cache-Control": "no-cache" } })
    ]);
    if (!homepage.response.ok || state.status !== 200) throw new Error("IndexNow deployment state is not available");
    const stateText = await state.text();
    let parsedState;
    try {
      parsedState = JSON.parse(stateText);
    } catch {
      throw new Error("IndexNow deployment state is invalid");
    }
    if (sha256(stableJson(parsedState)) !== plan.stateFingerprint) {
      throw new Error("IndexNow deployment state has not propagated");
    }
    return;
  }

  let remaining = entries;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    const checks = await Promise.all(
      remaining.map(async (entry) => {
        try {
          const { response, html } = await fetchLivePage(entry.url, fetchImpl);
          if (response.status !== 200) return entry;
          if (canonicalFromHtml(html, entry.url) !== entry.url) return entry;
          const page = fingerprintPageHtml({ html, canonical: entry.url, file: entry.url });
          return page.fingerprint === entry.expectedFingerprint ? null : entry;
        } catch {
          return entry;
        }
      })
    );
    remaining = checks.filter(Boolean);
    if (remaining.length === 0) return;
    if (attempt + 1 < attempts) await sleepImpl(10_000);
  }
  throw new Error("One or more changed IndexNow pages did not propagate before the timeout");
}

async function main() {
  assertIndexNowKey(key);
  const plan = await readIndexNowPlan(planPath);
  if (plan.skipReason) {
    console.warn(`IndexNow notification skipped: ${plan.skipReason}`);
    return;
  }
  if (plan.blocked) {
    console.error(`IndexNow notification blocked by the ${plan.urls.length}-URL safety limit.`);
    for (const entry of plan.urls) console.error(`- ${entry.changeType}: ${entry.url}`);
    process.exitCode = 1;
    return;
  }
  if (plan.urls.length === 0) {
    console.log("IndexNow notification skipped: no canonical page changes.");
    return;
  }

  console.log(`IndexNow notification: ${plan.mode} mode, ${plan.urls.length} canonical URL(s).`);
  for (const entry of plan.urls) console.log(`- ${entry.changeType}: ${entry.url}`);
  await waitForVerificationFile({ key });
  await waitForLivePlan({ plan });
  const result = await postIndexNow({
    urls: plan.urls.map((entry) => entry.url),
    key,
    sleepImpl: sleep,
    attempts: MAX_SUBMISSION_ATTEMPTS
  });
  console.log(`IndexNow notification received by the endpoint (HTTP ${result.status}) after ${result.attempts} attempt(s).`);
}

main().catch((error) => {
  console.error(`IndexNow notification failed: ${safeErrorMessage(error, key)}`);
  process.exit(1);
});
