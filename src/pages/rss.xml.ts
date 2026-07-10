import type { APIRoute } from "astro";
import { LAB_NOTES, SITE } from "@data/site";

export const prerender = true;

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const toRfc822 = (date: string) => new Date(date + "T00:00:00Z").toUTCString();

export const GET: APIRoute = () => {
  const siteUrl = SITE.canonicalUrl.replace(/\/$/, "");
  const homeUrl = siteUrl + "/";
  const feedUrl = siteUrl + "/rss.xml";
  const notes = LAB_NOTES.map((note, index) => ({ ...note, index })).sort((a, b) => {
    const byDate = b.date.localeCompare(a.date);
    return byDate === 0 ? a.index - b.index : byDate;
  });
  const newestDate = notes[0]?.date ?? SITE.lastUpdated;

  const items = notes
    .map((note) => {
      const itemUrl = siteUrl + note.href;
      const categories = note.tags
        .map((tag) => "      <category>" + escapeXml(tag) + "</category>")
        .join("\n");

      return [
        "    <item>",
        "      <title>" + escapeXml(note.title) + "</title>",
        "      <link>" + escapeXml(itemUrl) + "</link>",
        '      <guid isPermaLink="true">' + escapeXml(itemUrl) + "</guid>",
        "      <pubDate>" + toRfc822(note.date) + "</pubDate>",
        "      <description>" + escapeXml(note.description) + "</description>",
        categories,
        "    </item>"
      ].join("\n");
    })
    .join("\n");

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    "    <title>" + escapeXml(SITE.name + " - Lab Notes") + "</title>",
    "    <link>" + escapeXml(homeUrl) + "</link>",
    "    <description>" + escapeXml("Applied public notes on industrial AI, LMD/DED decisions, monitoring, repairability, RFQs, and inspection evidence.") + "</description>",
    "    <language>en</language>",
    "    <lastBuildDate>" + toRfc822(newestDate) + "</lastBuildDate>",
    "    <generator>Astro</generator>",
    '    <atom:link href="' + escapeXml(feedUrl) + '" rel="self" type="application/rss+xml" />',
    items,
    "  </channel>",
    "</rss>",
    ""
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
};
