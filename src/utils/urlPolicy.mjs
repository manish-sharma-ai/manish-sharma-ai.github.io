const fileEndpointPattern = /\/[^/]+\.[a-z0-9][a-z0-9._-]*$/i;

function normalizedPath(pathname = "/") {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const collapsed = path.replace(/\/{2,}/g, "/");
  return collapsed === "/" ? "/" : collapsed.replace(/\/+$/, "");
}

export function isFileEndpoint(pathname) {
  return fileEndpointPattern.test(pathname);
}

export function routePath(pathname = "/") {
  const path = normalizedPath(pathname);
  return path === "/" || isFileEndpoint(path) ? path : path.replace(/\/$/, "");
}

export function canonicalPath(pathname = "/") {
  const path = routePath(pathname);
  return path === "/" || isFileEndpoint(path) ? path : `${path}/`;
}

export function internalHref(href) {
  if (!href.startsWith("/") || href.startsWith("//")) return href;

  const match = href.match(/^([^?#]*)(.*)$/);
  if (!match) return href;
  return `${canonicalPath(match[1])}${match[2]}`;
}
