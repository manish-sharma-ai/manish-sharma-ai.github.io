import { join } from "node:path";
import { auditIndexNowOutput } from "./lib.mjs";

const result = await auditIndexNowOutput(join(process.cwd(), "dist"));
console.log(`audit:indexnow passed (${result.pages} canonical pages, ${result.sitemapUrls} sitemap URLs)`);
