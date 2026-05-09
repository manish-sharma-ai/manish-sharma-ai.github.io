import { SITE } from "@data/site";

export function absoluteUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, SITE.canonicalUrl).toString().replace(/\/$/, normalized === "/" ? "/" : "");
}

export function canonicalPath(pathname?: string) {
  if (!pathname || pathname === "/") return "/";
  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}
