import { SITE } from "@data/site";
import {
  canonicalPath as canonicalRoutePath,
  internalHref as normalizeInternalHref,
  isFileEndpoint,
  routePath as normalizeRoutePath
} from "./urlPolicy.mjs";

export { isFileEndpoint };

const siteUrl = new URL(SITE.canonicalUrl);
const siteOrigin = siteUrl.origin;

function pathnameFrom(input = "/") {
  const url = new URL(input, siteUrl);
  if (url.origin !== siteOrigin) {
    throw new Error(`Expected a first-party URL, received "${input}".`);
  }

  return url.pathname;
}

/** The route form used for matching navigation and page families. */
export function routePath(pathname?: string) {
  return normalizeRoutePath(pathnameFrom(pathname));
}

/** The canonical path for a first-party route: directory pages end in one slash, files do not. */
export function canonicalPath(pathname?: string) {
  return canonicalRoutePath(pathnameFrom(pathname));
}

/** A query-free, fragment-free absolute canonical URL on the production domain. */
export function absoluteUrl(path = "/") {
  return new URL(canonicalPath(path), siteUrl).toString();
}

/** Normalize a first-party navigation link while preserving a deliberate query string or fragment. */
export function internalHref(href: string) {
  if (href.startsWith("#")) return href;

  const url = new URL(href, siteUrl);
  if (url.origin !== siteOrigin) return href;

  return normalizeInternalHref(`${url.pathname}${url.search}${url.hash}`);
}

function normalizeStructuredDataUrl(value: string) {
  if (!value.startsWith("/") && !value.startsWith(siteOrigin)) return value;

  const url = new URL(value, siteUrl);
  if (url.origin !== siteOrigin) return value;

  return `${siteOrigin}${canonicalPath(url.pathname)}${url.hash}`;
}

/** Normalize first-party URL values in JSON-LD without changing claims or external references. */
export function normalizeStructuredDataUrls(value: unknown): unknown {
  if (typeof value === "string") return normalizeStructuredDataUrl(value);
  if (Array.isArray(value)) return value.map(normalizeStructuredDataUrls);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, nestedValue]) => [key, normalizeStructuredDataUrls(nestedValue)])
    );
  }
  return value;
}
