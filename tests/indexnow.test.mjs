import { mkdtemp, readFile, rm, writeFile, mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  INDEXNOW_MAX_URLS,
  INDEXNOW_PRIORITY_URLS,
  assertInventoryMatchesSitemap,
  canonicalFromHtml,
  createCanonicalInventory,
  createIndexNowPlan,
  createIndexNowState,
  fetchPreviousIndexNowState,
  inventoryFromHtmlEntries,
  postIndexNow,
  prepareIndexNow,
  safeErrorMessage,
  validateIndexNowKey,
  writeVerificationFile
} from "../scripts/indexnow/lib.mjs";

const KEY = "a".repeat(64);

function fileFor(url) {
  const pathname = new URL(url).pathname;
  return pathname === "/" ? "dist/index.html" : `dist${pathname}index.html`;
}

function page(url, options = {}) {
  const title = options.title ?? "Page title";
  const description = options.description ?? "Page description";
  const body = options.body ?? "Meaningful article body.";
  const navigation = options.navigation ?? "Navigation one";
  const footer = options.footer ?? "Footer one";
  const robots = options.noindex ? '<meta name="robots" content="noindex" />' : '<meta name="robots" content="index, follow" />';
  const jsonLd = options.jsonLd ?? { "@context": "https://schema.org", "@type": "WebPage", url };
  const assets = options.assets ?? '<link rel="stylesheet" href="/_astro/site.abc.css" /><script src="/_astro/site.abc.js"></script>';
  return `<!doctype html><html lang="en"><head><title>${title}</title><meta name="description" content="${description}" />${robots}<link rel="canonical" href="${options.canonical ?? url}" /><meta property="og:title" content="${title}" /><meta property="og:description" content="${description}" /><meta property="og:url" content="${url}" /><meta property="og:image" content="https://manishsharma.dev/images/page.png" /><meta name="twitter:title" content="${title}" />${assets}<script type="application/ld+json">${JSON.stringify(jsonLd)}</script></head><body><main><nav>${navigation}</nav><article><h1>${title}</h1><p>${body}</p><a href="/about/">About</a><img src="/images/page.png" alt="Page image" /></article><footer>${footer}</footer></main></body></html>`;
}

function inventory(urls = INDEXNOW_PRIORITY_URLS, options = {}) {
  return inventoryFromHtmlEntries(urls.map((url) => ({ file: fileFor(url), html: page(url, options[url] ?? {}) })));
}

function state(urls = INDEXNOW_PRIORITY_URLS, key = KEY, options = {}) {
  return createIndexNowState(key, inventory(urls, options));
}

function response(status, body = "", headers = {}) {
  return new Response(body, { status, headers });
}

describe("IndexNow key and output safety", () => {
  it("accepts a 64-character lowercase hexadecimal key", () => {
    expect(validateIndexNowKey(KEY)).toEqual({ valid: true });
  });

  it("rejects whitespace, slashes, shell metacharacters, and invalid lengths", () => {
    for (const invalid of ["short", `${KEY} `, "a".repeat(7), "a".repeat(129), "a/b", "a b", "a$bc", "a.b"]) {
      expect(validateIndexNowKey(invalid).valid).toBe(false);
    }
  });

  it("writes a verification file whose body is exactly the key", async () => {
    const directory = await mkdtemp(join(tmpdir(), "indexnow-test-"));
    try {
      await writeVerificationFile(directory, KEY);
      expect(await readFile(join(directory, `${KEY}.txt`), "utf8")).toBe(KEY);
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  it("never serializes the raw key into public state or private plan", () => {
    const current = state();
    const plan = createIndexNowPlan({ state: current, previousState: null, previousMode: "first" });
    expect(JSON.stringify(current)).not.toContain(KEY);
    expect(JSON.stringify(plan)).not.toContain(KEY);
  });

  it("redacts a secret value from an error message", () => {
    expect(safeErrorMessage(new Error(`unexpected ${KEY}`), KEY)).not.toContain(KEY);
  });
});

describe("IndexNow canonical inventory", () => {
  it("maps the homepage and a nested index.html to trailing-slash canonicals", () => {
    const pages = inventory(["https://manishsharma.dev/", "https://manishsharma.dev/lab-notes/example/"]).pages;
    expect(Object.keys(pages)).toEqual(["https://manishsharma.dev/", "https://manishsharma.dev/lab-notes/example/"]);
  });

  it("excludes file endpoints, 404.html, and noindex pages", () => {
    const result = inventoryFromHtmlEntries([
      { file: "dist/index.html", html: page("https://manishsharma.dev/") },
      { file: "dist/rss.xml", html: "not an HTML page" },
      { file: "dist/404.html", html: page("https://manishsharma.dev/404/") },
      { file: "dist/private/index.html", html: page("https://manishsharma.dev/private/", { noindex: true }) }
    ]);
    expect(Object.keys(result.pages)).toEqual(["https://manishsharma.dev/"]);
  });

  it("fails duplicate canonical URLs", () => {
    expect(() =>
      inventoryFromHtmlEntries([
        { file: "dist/a/index.html", html: page("https://manishsharma.dev/a/", { canonical: "https://manishsharma.dev/a/" }) },
        { file: "dist/b/index.html", html: page("https://manishsharma.dev/b/", { canonical: "https://manishsharma.dev/a/" }) }
      ])
    ).toThrow(/self-reference|duplicate canonical/);
  });

  it("fails non-production and slashless canonical URLs", () => {
    expect(() => canonicalFromHtml(page("https://manishsharma.dev/about/", { canonical: "https://preview.example/about/" }))).toThrow(/not on/);
    expect(() => canonicalFromHtml(page("https://manishsharma.dev/about/", { canonical: "https://manishsharma.dev/about" }))).toThrow(/trailing slash/);
  });

  it("requires the sitemap to match the canonical page inventory", () => {
    const current = inventory(["https://manishsharma.dev/"]);
    expect(() => assertInventoryMatchesSitemap(current, ["https://manishsharma.dev/"])).not.toThrow();
    expect(() => assertInventoryMatchesSitemap(current, ["https://manishsharma.dev/about/"])).toThrow(/differ/);
  });
});

describe("IndexNow semantic fingerprints", () => {
  const url = "https://manishsharma.dev/lab-notes/example/";

  function fingerprint(options) {
    return inventory([url], { [url]: options }).pages[url].fingerprint;
  }

  it("ignores CSS-only and hashed JavaScript/CSS asset-name changes", () => {
    const baseline = fingerprint({ assets: '<link rel="stylesheet" href="/_astro/a.111.css" /><script src="/_astro/a.111.js"></script>' });
    const changed = fingerprint({ assets: '<link rel="stylesheet" href="/_astro/b.222.css" /><script src="/_astro/b.222.js"></script>' });
    expect(changed).toBe(baseline);
  });

  it("ignores navigation-only and footer-only changes", () => {
    const baseline = fingerprint({});
    expect(fingerprint({ navigation: "Different navigation" })).toBe(baseline);
    expect(fingerprint({ footer: "Different footer" })).toBe(baseline);
  });

  it("changes for an article body, title, meta description, or JSON-LD claim", () => {
    const baseline = fingerprint({});
    expect(fingerprint({ body: "Changed article body." })).not.toBe(baseline);
    expect(fingerprint({ title: "Changed title" })).not.toBe(baseline);
    expect(fingerprint({ description: "Changed description" })).not.toBe(baseline);
    expect(fingerprint({ jsonLd: { "@context": "https://schema.org", "@type": "WebPage", url, name: "Changed claim" } })).not.toBe(baseline);
  });
});

describe("IndexNow change planning", () => {
  it("emits exactly the required ten URLs on the genuine first run", () => {
    const plan = createIndexNowPlan({ state: state(), previousState: null, previousMode: "first" });
    expect(plan.mode).toBe("first");
    expect(plan.urls.map((entry) => entry.url).sort()).toEqual([...INDEXNOW_PRIORITY_URLS].sort());
    expect(plan.urls).toHaveLength(10);
  });

  it("does not treat a previous-state fetch failure as a first run", async () => {
    const previous = await fetchPreviousIndexNowState({ fetchImpl: async () => { throw new Error("offline"); } });
    const plan = createIndexNowPlan({ state: state(), previousState: previous.state, previousMode: previous.mode });
    expect(previous.mode).toBe("unavailable");
    expect(plan.mode).toBe("skipped");
    expect(plan.urls).toHaveLength(0);
  });

  it("emits zero URLs when semantic state is unchanged", () => {
    const current = state();
    expect(createIndexNowPlan({ state: current, previousState: current }).urls).toEqual([]);
  });

  it("emits only a changed article URL for one article-body change", () => {
    const url = "https://manishsharma.dev/lab-notes/example/";
    const previous = state([url]);
    const current = state([url], KEY, { [url]: { body: "Changed body" } });
    expect(createIndexNowPlan({ state: current, previousState: previous }).urls).toEqual([
      { url, changeType: "changed", expectedFingerprint: current.pages[url].fingerprint }
    ]);
  });

  it("emits only the affected URL for title and meta-description changes", () => {
    const url = "https://manishsharma.dev/about/";
    const previous = state([url]);
    for (const changes of [{ title: "New title" }, { description: "New description" }]) {
      const current = state([url], KEY, { [url]: changes });
      expect(createIndexNowPlan({ state: current, previousState: previous }).urls.map((entry) => entry.url)).toEqual([url]);
    }
  });

  it("emits only the affected URL for a JSON-LD claim change", () => {
    const url = "https://manishsharma.dev/thesis/";
    const previous = state([url]);
    const current = state([url], KEY, { [url]: { jsonLd: { "@context": "https://schema.org", "@type": "WebPage", url, name: "New claim" } } });
    expect(createIndexNowPlan({ state: current, previousState: previous }).urls.map((entry) => entry.url)).toEqual([url]);
  });

  it("emits added and deleted canonical URLs with deterministic types", () => {
    const oldUrl = "https://manishsharma.dev/old/";
    const newUrl = "https://manishsharma.dev/new/";
    const plan = createIndexNowPlan({ state: state([newUrl]), previousState: state([oldUrl]) });
    expect(plan.urls).toEqual([
      { url: newUrl, changeType: "added", expectedFingerprint: plan.urls[0].expectedFingerprint },
      { url: oldUrl, changeType: "deleted", expectedFingerprint: null }
    ]);
  });

  it("deduplicates candidates and only permits canonical production URLs", () => {
    const current = state();
    const plan = createIndexNowPlan({ state: current, previousState: null, previousMode: "first" });
    expect(new Set(plan.urls.map((entry) => entry.url)).size).toBe(plan.urls.length);
    expect(plan.urls.every((entry) => entry.url.startsWith("https://manishsharma.dev/") && entry.url.endsWith("/"))).toBe(true);
  });

  it("rejects a previous state that contains a slashless alias", () => {
    const current = state();
    const unsafePrevious = structuredClone(current);
    unsafePrevious.pages["https://manishsharma.dev/about"] = unsafePrevious.pages["https://manishsharma.dev/about/"];
    delete unsafePrevious.pages["https://manishsharma.dev/about/"];
    expect(() => createIndexNowPlan({ state: current, previousState: unsafePrevious })).toThrow(/invalid previous state/);
  });

  it("blocks plans over the defensive maximum", () => {
    const urls = Array.from({ length: INDEXNOW_MAX_URLS + 1 }, (_, index) => `https://manishsharma.dev/pages/${index}/`);
    const plan = createIndexNowPlan({ state: state(urls), previousState: state([]) });
    expect(plan.blocked).toBe(true);
    expect(plan.urls).toHaveLength(INDEXNOW_MAX_URLS + 1);
  });

  it("treats a key rotation as one initialization set and a second unchanged run as empty", () => {
    const original = state();
    const rotated = state(INDEXNOW_PRIORITY_URLS, "b".repeat(64));
    expect(createIndexNowPlan({ state: rotated, previousState: original }).urls).toHaveLength(10);
    expect(createIndexNowPlan({ state: rotated, previousState: rotated }).urls).toHaveLength(0);
  });
});

describe("IndexNow submission protocol", () => {
  const urls = ["https://manishsharma.dev/about/"];

  it("accepts both 200 and 202 responses", async () => {
    for (const status of [200, 202]) {
      await expect(postIndexNow({ urls, key: KEY, fetchImpl: async () => response(status), sleepImpl: async () => {} })).resolves.toMatchObject({ status });
    }
  });

  it("fails safely for permanent 400, 403, and 422 responses", async () => {
    for (const status of [400, 403, 422]) {
      await expect(postIndexNow({ urls, key: KEY, fetchImpl: async () => response(status), sleepImpl: async () => {} })).rejects.toThrow(`HTTP ${status}`);
    }
  });

  it("rejects duplicate and slashless submission URLs before constructing a request", async () => {
    await expect(postIndexNow({ urls: [urls[0], urls[0]], key: KEY, fetchImpl: async () => response(200) })).rejects.toThrow(/duplicate/);
    await expect(postIndexNow({ urls: ["https://manishsharma.dev/about"], key: KEY, fetchImpl: async () => response(200) })).rejects.toThrow(/trailing slash/);
  });

  it("retries a 429 with bounded backoff", async () => {
    let calls = 0;
    const result = await postIndexNow({
      urls,
      key: KEY,
      fetchImpl: async () => (calls++ === 0 ? response(429, "", { "retry-after": "0" }) : response(202)),
      sleepImpl: async () => {}
    });
    expect(result).toEqual({ status: 202, attempts: 2 });
    expect(calls).toBe(2);
  });

  it("retries transient network and 5xx failures with a bounded attempt count", async () => {
    let calls = 0;
    const result = await postIndexNow({
      urls,
      key: KEY,
      fetchImpl: async () => {
        calls += 1;
        if (calls === 1) throw new Error("temporary network error");
        if (calls === 2) return response(503);
        return response(200);
      },
      sleepImpl: async () => {}
    });
    expect(result).toEqual({ status: 200, attempts: 3 });
    expect(calls).toBe(3);
  });
});

describe("IndexNow production preparation", () => {
  it("creates a public state and a non-secret first-run plan only after a valid build inventory", async () => {
    const directory = await mkdtemp(join(tmpdir(), "indexnow-dist-"));
    try {
      const urls = INDEXNOW_PRIORITY_URLS;
      for (const url of urls) {
        const file = join(directory, fileFor(url).replace(/^dist\//, ""));
        await mkdir(join(file, ".."), { recursive: true });
        await writeFile(file, page(url), "utf8");
      }
      await writeFile(join(directory, "sitemap-index.xml"), "<sitemapindex><sitemap><loc>https://manishsharma.dev/sitemap-0.xml</loc></sitemap></sitemapindex>", "utf8");
      await writeFile(join(directory, "sitemap-0.xml"), `<urlset>${urls.map((url) => `<url><loc>${url}</loc></url>`).join("")}</urlset>`, "utf8");
      const planDirectory = join(directory, ".private");
      const result = await prepareIndexNow({ distDir: directory, planDir: planDirectory, key: KEY, fetchImpl: async () => response(404) });
      expect(result.plan.urls).toHaveLength(10);
      expect(await readFile(join(directory, "indexnow-state.json"), "utf8")).not.toContain(KEY);
      expect(await readFile(join(planDirectory, "indexnow-plan.json"), "utf8")).not.toContain(KEY);
      expect(await readFile(join(directory, `${KEY}.txt`), "utf8")).toBe(KEY);
      expect((await createCanonicalInventory(directory)).records).toHaveLength(10);
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });
});
