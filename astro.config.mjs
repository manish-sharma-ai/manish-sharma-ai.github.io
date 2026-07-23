import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { internalHref } from "./src/utils/urlPolicy.mjs";

const canonicalOrigin = "https://manishsharma.dev";
const publicTextExtensions = new Set([".json", ".md", ".txt"]);

async function outputFiles(directory) {
  const baseDirectory = directory.href.endsWith("/") ? directory : new URL(`${directory.href}/`);
  const entries = await readdir(baseDirectory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const path = new URL(entry.isDirectory() ? `${entry.name}/` : entry.name, baseDirectory);
      if (entry.isDirectory()) return outputFiles(path);
      return entry.isFile() ? [path] : [];
    })
  );
  return files.flat();
}

function normalizePublishedUrl(value) {
  const punctuation = value.match(/[.,;:]+$/)?.[0] ?? "";
  const cleanValue = punctuation ? value.slice(0, -punctuation.length) : value;
  const url = new URL(cleanValue);
  if (url.origin !== canonicalOrigin) return value;
  return `${canonicalOrigin}${internalHref(`${url.pathname}${url.search}${url.hash}`)}${punctuation}`;
}

function normalizeBuiltHtmlUrls() {
  return {
    name: "normalize-built-html-urls",
    hooks: {
      "astro:build:generated": async ({ dir, logger }) => {
        let normalizedCount = 0;

        const files = await outputFiles(dir);

        for (const file of files.filter((file) => file.pathname.endsWith(".html"))) {
          const html = await readFile(file, "utf8");
          const normalized = html.replace(/\bhref=(['"])(\/(?!\/)[^'"]*)\1/g, (match, quote, href) => {
            const normalizedHref = internalHref(href);
            if (normalizedHref === href) return match;
            normalizedCount += 1;
            return `href=${quote}${normalizedHref}${quote}`;
          });

          if (normalized !== html) await writeFile(fileURLToPath(file), normalized);
        }

        for (const file of files) {
          const pathname = fileURLToPath(file);
          if (![...publicTextExtensions].some((extension) => pathname.endsWith(extension))) continue;

          const text = await readFile(file, "utf8");
          const normalized = text.replace(/https:\/\/manishsharma\.dev(?:\/[^\s'"<>()\[\]{}]*)?/g, (value) => {
            const normalizedUrl = normalizePublishedUrl(value);
            if (normalizedUrl !== value) normalizedCount += 1;
            return normalizedUrl;
          });

          if (normalized !== text) await writeFile(pathname, normalized);
        }

        logger.info(`normalized ${normalizedCount} first-party URLs in build output`);
      }
    }
  };
}

export default defineConfig({
  site: "https://manishsharma.dev",
  base: "/",
  trailingSlash: "always",
  output: "static",
  compressHTML: true,
  build: {
    inlineStylesheets: "never"
  },
  integrations: [react(), sitemap(), normalizeBuiltHtmlUrls()],
  markdown: {
    shikiConfig: {
      theme: "github-dark"
    }
  }
});
