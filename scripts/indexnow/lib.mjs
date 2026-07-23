import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { parse } from "parse5";
import { canonicalPath, isFileEndpoint } from "../../src/utils/urlPolicy.mjs";

export const INDEXNOW_SITE = "https://manishsharma.dev";
export const INDEXNOW_STATE_VERSION = 1;
export const INDEXNOW_MAX_URLS = 100;
export const INDEXNOW_STATE_URL = `${INDEXNOW_SITE}/indexnow-state.json`;
export const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
export const INDEXNOW_PRIORITY_URLS = Object.freeze([
  `${INDEXNOW_SITE}/`,
  `${INDEXNOW_SITE}/about/`,
  `${INDEXNOW_SITE}/identity/`,
  `${INDEXNOW_SITE}/thesis/`,
  `${INDEXNOW_SITE}/public-work/`,
  `${INDEXNOW_SITE}/domains/lmd-ded/`,
  `${INDEXNOW_SITE}/lab-notes/`,
  `${INDEXNOW_SITE}/lab-notes/a-prediction-is-not-yet-an-industrial-decision/`,
  `${INDEXNOW_SITE}/contact/`,
  `${INDEXNOW_SITE}/de/`
]);

const OMITTED_MAIN_TAGS = new Set(["script", "style", "noscript", "template", "svg", "nav", "header", "footer", "aside"]);
const MEANINGFUL_META_NAMES = new Set([
  "description",
  "robots",
  "twitter:card",
  "twitter:title",
  "twitter:description",
  "twitter:image",
  "article:published_time",
  "article:modified_time"
]);
const MEANINGFUL_OG_PROPERTIES = new Set(["og:title", "og:description", "og:url", "og:image", "og:type"]);

function compact(value = "") {
  return String(value).replace(/\s+/g, " ").trim();
}

function attributes(node) {
  return Object.fromEntries((node.attrs ?? []).map((attribute) => [attribute.name.toLowerCase(), attribute.value]));
}

function attribute(node, name) {
  return attributes(node)[name.toLowerCase()] ?? "";
}

function elementName(node) {
  return node.tagName?.toLowerCase() ?? "";
}

function visit(node, callback) {
  callback(node);
  for (const child of node.childNodes ?? []) visit(child, callback);
}

function elements(document, tagName) {
  const found = [];
  visit(document, (node) => {
    if (elementName(node) === tagName) found.push(node);
  });
  return found;
}

function firstElement(document, tagName) {
  return elements(document, tagName)[0] ?? null;
}

function textFrom(node, omittedTags = new Set()) {
  if (!node) return "";
  if (node.nodeName === "#text") return node.value ?? "";
  if (omittedTags.has(elementName(node))) return "";
  return (node.childNodes ?? []).map((child) => textFrom(child, omittedTags)).join(" ");
}

function elementsWithin(node, names) {
  const found = [];
  function walk(current) {
    const name = elementName(current);
    if (current !== node && OMITTED_MAIN_TAGS.has(name)) return;
    if (names.has(name)) found.push(current);
    for (const child of current.childNodes ?? []) walk(child);
  }
  walk(node);
  return found;
}

function normalizedUrl(value, base = INDEXNOW_SITE) {
  const url = new URL(value, base);
  return url.origin === INDEXNOW_SITE ? `${url.pathname}${url.search}${url.hash}` : url.toString();
}

function metadata(document) {
  const values = {};
  for (const node of elements(document, "meta")) {
    const name = attribute(node, "name").toLowerCase();
    const property = attribute(node, "property").toLowerCase();
    const content = compact(attribute(node, "content"));
    if (!content) continue;
    if (MEANINGFUL_META_NAMES.has(name)) values[name] = content;
    if (MEANINGFUL_OG_PROPERTIES.has(property)) values[property] = content;
  }
  return values;
}

function alternateLinks(document, canonical) {
  return elements(document, "link")
    .filter((node) => attribute(node, "hreflang") && attribute(node, "href"))
    .map((node) => ({
      lang: attribute(node, "hreflang").toLowerCase(),
      href: normalizedUrl(attribute(node, "href"), canonical)
    }))
    .sort((left, right) => `${left.lang}:${left.href}`.localeCompare(`${right.lang}:${right.href}`));
}

function stableValue(value) {
  if (Array.isArray(value)) return value.map(stableValue);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(Object.keys(value).sort().map((key) => [key, stableValue(value[key])]));
}

export function stableJson(value) {
  return JSON.stringify(stableValue(value));
}

export function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function jsonLd(document, file) {
  const items = [];
  for (const node of elements(document, "script")) {
    if (attribute(node, "type").toLowerCase() !== "application/ld+json") continue;
    try {
      items.push(stableValue(JSON.parse(textFrom(node))));
    } catch {
      throw new Error(`${file}: contains invalid JSON-LD`);
    }
  }
  return items.sort((left, right) => stableJson(left).localeCompare(stableJson(right)));
}

function mainContent(document, canonical) {
  const main = firstElement(document, "main");
  if (!main) throw new Error(`${canonical}: missing main content`);

  const headings = elementsWithin(main, new Set(["h1", "h2", "h3", "h4", "h5", "h6"])).map((node) => ({
    level: elementName(node),
    text: compact(textFrom(node, OMITTED_MAIN_TAGS))
  }));
  const links = elementsWithin(main, new Set(["a"]))
    .map((node) => ({ href: attribute(node, "href"), text: compact(textFrom(node, OMITTED_MAIN_TAGS)) }))
    .filter((link) => link.href && link.text)
    .map((link) => ({ ...link, href: normalizedUrl(link.href, canonical) }));
  const images = elementsWithin(main, new Set(["img"])).map((node) => ({
    alt: compact(attribute(node, "alt")),
    source: normalizedUrl(attribute(node, "src"), canonical)
  }));

  return {
    text: compact(textFrom(main, OMITTED_MAIN_TAGS)),
    headings,
    links,
    images
  };
}

function canonicalLinks(document) {
  return elements(document, "link").filter((node) =>
    attribute(node, "rel")
      .toLowerCase()
      .split(/\s+/)
      .includes("canonical")
  );
}

export function canonicalFromHtml(html, file = "generated HTML") {
  const document = parse(html);
  const matches = canonicalLinks(document);
  if (matches.length !== 1) throw new Error(`${file}: expected exactly one canonical link, found ${matches.length}`);
  return normalizeCanonicalUrl(attribute(matches[0], "href"));
}

function noindex(document) {
  return elements(document, "meta").some(
    (node) => attribute(node, "name").toLowerCase() === "robots" && /\bnoindex\b/i.test(attribute(node, "content"))
  );
}

export function normalizeCanonicalUrl(value) {
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`Invalid canonical URL: ${value}`);
  }

  if (url.protocol !== "https:" || url.origin !== INDEXNOW_SITE) {
    throw new Error(`Canonical URL is not on ${INDEXNOW_SITE}: ${value}`);
  }
  if (url.search || url.hash) throw new Error(`Canonical URL must not contain a query or fragment: ${value}`);
  if (isFileEndpoint(url.pathname)) throw new Error(`Canonical URL must not be a file endpoint: ${value}`);
  if (url.pathname !== canonicalPath(url.pathname)) throw new Error(`Canonical URL must use a trailing slash: ${value}`);
  return url.toString();
}

function expectedCanonicalForFile(file, distDir) {
  const path = relative(distDir, file).replaceAll("\\", "/");
  if (path === "index.html") return `${INDEXNOW_SITE}/`;
  if (!path.endsWith("/index.html")) return null;
  return `${INDEXNOW_SITE}/${path.slice(0, -"/index.html".length)}/`;
}

async function outputFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) return outputFiles(path);
      return entry.isFile() ? [path] : [];
    })
  );
  return nested.flat();
}

export function fingerprintPageHtml({ html, canonical, file = "generated HTML" }) {
  const document = parse(html);
  const htmlNode = firstElement(document, "html");
  const title = compact(textFrom(firstElement(document, "title")));
  const pageMetadata = metadata(document);
  const representation = {
    canonical,
    language: compact(attribute(htmlNode, "lang")).toLowerCase(),
    title,
    metadata: pageMetadata,
    hreflang: alternateLinks(document, canonical),
    jsonLd: jsonLd(document, file),
    main: mainContent(document, canonical)
  };
  return { representation, fingerprint: sha256(stableJson(representation)) };
}

export function inventoryFromHtmlEntries(entries, { distDir = "dist" } = {}) {
  const records = [];
  const canonicalOwners = new Map();

  for (const entry of entries) {
    if (entry.file.replaceAll("\\", "/").endsWith("/404.html") || entry.file.replaceAll("\\", "/") === "404.html") continue;
    const expectedCanonical = expectedCanonicalForFile(entry.file, distDir);
    if (!expectedCanonical) continue;

    const document = parse(entry.html);
    if (noindex(document)) continue;
    const canonical = canonicalFromHtml(entry.html, entry.file);
    if (canonical !== expectedCanonical) {
      throw new Error(`${entry.file}: canonical ${canonical} must self-reference ${expectedCanonical}`);
    }
    if (canonicalOwners.has(canonical)) {
      throw new Error(`${entry.file}: duplicate canonical ${canonical} also appears in ${canonicalOwners.get(canonical)}`);
    }
    canonicalOwners.set(canonical, entry.file);

    const { fingerprint, representation } = fingerprintPageHtml({ html: entry.html, canonical, file: entry.file });
    records.push({ canonical, file: entry.file, fingerprint, representation });
  }

  records.sort((left, right) => left.canonical.localeCompare(right.canonical));
  return {
    records,
    pages: Object.fromEntries(records.map((record) => [record.canonical, { fingerprint: record.fingerprint }]))
  };
}

export async function createCanonicalInventory(distDir) {
  const files = (await outputFiles(distDir)).filter((file) => file.endsWith(".html"));
  const entries = await Promise.all(files.map(async (file) => ({ file, html: await readFile(file, "utf8") })));
  return inventoryFromHtmlEntries(entries, { distDir });
}

export async function readSitemapUrls(distDir) {
  const index = await readFile(join(distDir, "sitemap-index.xml"), "utf8");
  const childLocations = [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  const urls = [];
  for (const location of childLocations) {
    const url = new URL(location);
    if (url.origin !== INDEXNOW_SITE || !url.pathname.startsWith("/sitemap-") || !url.pathname.endsWith(".xml")) {
      throw new Error(`Sitemap index contains an unsupported child location: ${location}`);
    }
    const child = await readFile(join(distDir, url.pathname.slice(1)), "utf8");
    urls.push(...[...child.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]));
  }
  return urls;
}

export function assertInventoryMatchesSitemap(inventory, sitemapUrls) {
  const expected = Object.keys(inventory.pages).sort();
  const actual = [...sitemapUrls].sort();
  if (new Set(actual).size !== actual.length) throw new Error("Sitemap contains duplicate URLs");
  if (actual.some((url) => url === INDEXNOW_STATE_URL || url.endsWith(".txt"))) {
    throw new Error("Sitemap contains an IndexNow state or verification endpoint");
  }
  if (stableJson(expected) !== stableJson(actual)) {
    const missing = expected.filter((url) => !actual.includes(url));
    const unexpected = actual.filter((url) => !expected.includes(url));
    throw new Error(`Sitemap and canonical inventory differ (missing: ${missing.join(", ") || "none"}; unexpected: ${unexpected.join(", ") || "none"})`);
  }
}

export function validateIndexNowKey(key) {
  if (typeof key !== "string") return { valid: false, reason: "missing" };
  if (key.length < 8 || key.length > 128) return { valid: false, reason: "invalid length" };
  if (!/^[A-Za-z0-9_-]+$/.test(key)) return { valid: false, reason: "invalid characters" };
  return { valid: true };
}

export function assertIndexNowKey(key) {
  const result = validateIndexNowKey(key);
  if (!result.valid) throw new Error(`INDEXNOW_KEY is invalid (${result.reason})`);
}

export function safeErrorMessage(error, key) {
  const message = error instanceof Error ? error.message : String(error);
  return key ? message.split(key).join("[redacted]") : message;
}

export function validateIndexNowPlan(plan) {
  if (!plan || typeof plan !== "object") return { valid: false, reason: "not an object" };
  if (plan.version !== INDEXNOW_STATE_VERSION || plan.enabled !== true) return { valid: false, reason: "unsupported schema" };
  if (!["first", "rotation", "normal", "skipped"].includes(plan.mode)) return { valid: false, reason: "invalid mode" };
  if (!Array.isArray(plan.urls)) return { valid: false, reason: "invalid URLs" };
  const seen = new Set();
  for (const entry of plan.urls) {
    if (!entry || typeof entry !== "object") return { valid: false, reason: "invalid URL entry" };
    try {
      normalizeCanonicalUrl(entry.url);
    } catch {
      return { valid: false, reason: "invalid canonical URL" };
    }
    if (seen.has(entry.url)) return { valid: false, reason: "duplicate canonical URL" };
    seen.add(entry.url);
    if (!["initial", "added", "changed", "deleted"].includes(entry.changeType)) return { valid: false, reason: "invalid change type" };
    if (entry.changeType === "deleted" ? entry.expectedFingerprint !== null : !/^[a-f0-9]{64}$/.test(entry.expectedFingerprint ?? "")) {
      return { valid: false, reason: "invalid expected fingerprint" };
    }
  }
  if (typeof plan.blocked !== "boolean" || !/^[a-f0-9]{64}$/.test(plan.stateFingerprint ?? "")) {
    return { valid: false, reason: "invalid plan metadata" };
  }
  if (plan.urls.length > INDEXNOW_MAX_URLS && !plan.blocked) return { valid: false, reason: "missing candidate-limit block" };
  return { valid: true };
}

function retryAfterMilliseconds(response, fallback) {
  const header = response.headers?.get?.("retry-after");
  const seconds = Number(header);
  if (Number.isFinite(seconds) && seconds >= 0) return Math.min(seconds * 1000, 60_000);
  return fallback;
}

export async function postIndexNow({ urls, key, fetchImpl = fetch, sleepImpl = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds)), attempts = 5 }) {
  assertIndexNowKey(key);
  if (!Array.isArray(urls) || urls.length === 0 || urls.length > INDEXNOW_MAX_URLS) {
    throw new Error("IndexNow URL batch is outside the allowed size");
  }
  const normalizedUrls = urls.map((url) => normalizeCanonicalUrl(url));
  if (new Set(normalizedUrls).size !== normalizedUrls.length || normalizedUrls.some((url, index) => url !== urls[index])) {
    throw new Error("IndexNow URL batch contains a duplicate or non-canonical URL");
  }
  const body = JSON.stringify({
    host: "manishsharma.dev",
    key,
    keyLocation: `${INDEXNOW_SITE}/${key}.txt`,
    urlList: normalizedUrls
  });

  let lastCategory = "network";
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const response = await fetchImpl(INDEXNOW_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body
      });
      if (response.status === 200 || response.status === 202) return { status: response.status, attempts: attempt + 1 };
      if ([400, 403, 422].includes(response.status)) throw new Error(`IndexNow rejected the request (HTTP ${response.status})`);
      lastCategory = response.status === 429 ? "rate-limited" : response.status >= 500 ? "server" : "unexpected";
      if (response.status !== 429 && response.status < 500) throw new Error(`IndexNow returned an unexpected HTTP status (${response.status})`);
      if (attempt + 1 < attempts) {
        await sleepImpl(retryAfterMilliseconds(response, 1_000 * 2 ** attempt));
        continue;
      }
    } catch (error) {
      if (error instanceof Error && /IndexNow (rejected|returned)/.test(error.message)) throw error;
      lastCategory = "network";
      if (attempt + 1 < attempts) {
        await sleepImpl(1_000 * 2 ** attempt);
        continue;
      }
    }
  }
  throw new Error(`IndexNow submission did not succeed after bounded retries (${lastCategory})`);
}

export function createIndexNowState(key, inventory) {
  assertIndexNowKey(key);
  return {
    version: INDEXNOW_STATE_VERSION,
    site: `${INDEXNOW_SITE}/`,
    keyFingerprint: sha256(key),
    pages: Object.fromEntries(
      Object.entries(inventory.pages)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([url, page]) => [url, { fingerprint: page.fingerprint }])
    )
  };
}

export function validateIndexNowState(state) {
  if (!state || typeof state !== "object") return { valid: false, reason: "not an object" };
  if (state.version !== INDEXNOW_STATE_VERSION) return { valid: false, reason: "unsupported version" };
  if (state.site !== `${INDEXNOW_SITE}/`) return { valid: false, reason: "unexpected site" };
  if (!/^[a-f0-9]{64}$/.test(state.keyFingerprint ?? "")) return { valid: false, reason: "invalid key fingerprint" };
  if (!state.pages || typeof state.pages !== "object" || Array.isArray(state.pages)) return { valid: false, reason: "invalid pages" };
  for (const [url, page] of Object.entries(state.pages)) {
    try {
      normalizeCanonicalUrl(url);
    } catch {
      return { valid: false, reason: "invalid page URL" };
    }
    if (!page || typeof page !== "object" || !/^[a-f0-9]{64}$/.test(page.fingerprint ?? "")) {
      return { valid: false, reason: "invalid page fingerprint" };
    }
  }
  return { valid: true };
}

export function createIndexNowPlan({ state, previousState, previousMode = "normal", deploymentSha = "" }) {
  const valid = validateIndexNowState(state);
  if (!valid.valid) throw new Error(`Cannot create IndexNow plan from invalid state (${valid.reason})`);
  if (previousMode === "normal" && previousState) {
    const previousValidation = validateIndexNowState(previousState);
    if (!previousValidation.valid) throw new Error(`Cannot create IndexNow plan from invalid previous state (${previousValidation.reason})`);
  }

  let mode = previousMode;
  let entries = [];
  let skipReason = null;

  if (previousMode === "unavailable" || previousMode === "invalid") {
    mode = "skipped";
    skipReason = previousMode === "unavailable" ? "previous-state-unavailable" : "previous-state-invalid";
  } else if (previousMode === "first" || !previousState) {
    mode = "first";
    entries = INDEXNOW_PRIORITY_URLS.map((url) => ({ url, changeType: "initial", expectedFingerprint: state.pages[url]?.fingerprint ?? null }));
  } else if (previousState.keyFingerprint !== state.keyFingerprint) {
    mode = "rotation";
    entries = INDEXNOW_PRIORITY_URLS.map((url) => ({ url, changeType: "initial", expectedFingerprint: state.pages[url]?.fingerprint ?? null }));
  } else {
    const currentUrls = Object.keys(state.pages);
    const previousUrls = Object.keys(previousState.pages);
    entries = [
      ...currentUrls
        .filter((url) => !previousState.pages[url])
        .map((url) => ({ url, changeType: "added", expectedFingerprint: state.pages[url].fingerprint })),
      ...currentUrls
        .filter((url) => previousState.pages[url] && previousState.pages[url].fingerprint !== state.pages[url].fingerprint)
        .map((url) => ({ url, changeType: "changed", expectedFingerprint: state.pages[url].fingerprint })),
      ...previousUrls
        .filter((url) => !state.pages[url])
        .map((url) => ({ url, changeType: "deleted", expectedFingerprint: null }))
    ];
  }

  entries = [...new Map(entries.map((entry) => [entry.url, entry])).values()].sort((left, right) => left.url.localeCompare(right.url));
  for (const entry of entries) normalizeCanonicalUrl(entry.url);

  const blocked = entries.length > INDEXNOW_MAX_URLS;
  return {
    version: INDEXNOW_STATE_VERSION,
    enabled: true,
    mode,
    deploymentSha,
    stateFingerprint: sha256(stableJson(state)),
    skipReason,
    blocked,
    urls: entries
  };
}

export async function fetchPreviousIndexNowState({ fetchImpl = fetch, stateUrl = INDEXNOW_STATE_URL } = {}) {
  try {
    const response = await fetchImpl(stateUrl, { headers: { "Cache-Control": "no-cache" } });
    if (response.status === 404) return { mode: "first", state: null, raw: null };
    if (response.status !== 200) return { mode: "unavailable", state: null, raw: null };
    const raw = await response.text();
    let state;
    try {
      state = JSON.parse(raw);
    } catch {
      return { mode: "invalid", state: null, raw: null };
    }
    const validation = validateIndexNowState(state);
    if (!validation.valid) return { mode: "invalid", state: null, raw: null };
    return { mode: "normal", state, raw };
  } catch {
    return { mode: "unavailable", state: null, raw: null };
  }
}

export async function writeJson(path, value) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, `${stableJson(value)}\n`, "utf8");
}

export async function writeVerificationFile(distDir, key) {
  assertIndexNowKey(key);
  await writeFile(join(distDir, `${key}.txt`), key, "utf8");
}

export async function prepareIndexNow({ distDir, planDir, key, deploymentSha = "", fetchImpl = fetch }) {
  assertIndexNowKey(key);
  const inventory = await createCanonicalInventory(distDir);
  const sitemapUrls = await readSitemapUrls(distDir);
  assertInventoryMatchesSitemap(inventory, sitemapUrls);

  const previous = await fetchPreviousIndexNowState({ fetchImpl });
  const state = createIndexNowState(key, inventory);
  const plan = createIndexNowPlan({ state, previousState: previous.state, previousMode: previous.mode, deploymentSha });

  if (["first", "rotation"].includes(plan.mode)) {
    for (const url of INDEXNOW_PRIORITY_URLS) {
      if (!state.pages[url] || !sitemapUrls.includes(url)) throw new Error(`IndexNow priority URL is missing from production output: ${url}`);
    }
  }

  await writeVerificationFile(distDir, key);
  await writeJson(join(distDir, "indexnow-state.json"), state);
  await mkdir(planDir, { recursive: true });
  if (previous.raw) await writeFile(join(planDir, "previous-state.json"), previous.raw, "utf8");
  await writeJson(join(planDir, "indexnow-plan.json"), plan);

  if (JSON.stringify(state).includes(key) || JSON.stringify(plan).includes(key)) {
    throw new Error("IndexNow preparation attempted to write a raw key outside the verification file");
  }
  return { inventory, sitemapUrls, state, plan, previousMode: previous.mode };
}

export async function readIndexNowPlan(path) {
  const plan = JSON.parse(await readFile(path, "utf8"));
  const validation = validateIndexNowPlan(plan);
  if (!validation.valid) throw new Error(`IndexNow plan has an unsupported schema (${validation.reason})`);
  return plan;
}

export async function fileExists(path) {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}

export async function auditIndexNowOutput(distDir) {
  const inventory = await createCanonicalInventory(distDir);
  const sitemapUrls = await readSitemapUrls(distDir);
  assertInventoryMatchesSitemap(inventory, sitemapUrls);

  const statePath = join(distDir, "indexnow-state.json");
  if (await fileExists(statePath)) {
    const state = JSON.parse(await readFile(statePath, "utf8"));
    const validation = validateIndexNowState(state);
    if (!validation.valid) throw new Error(`Published IndexNow state is invalid (${validation.reason})`);
    if (stableJson(Object.keys(state.pages).sort()) !== stableJson(Object.keys(inventory.pages).sort())) {
      throw new Error("Published IndexNow state does not match the canonical page inventory");
    }
  }
  return { pages: Object.keys(inventory.pages).length, sitemapUrls: sitemapUrls.length };
}
