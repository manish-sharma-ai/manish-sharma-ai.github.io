import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://manishsharma.dev",
  base: "/",
  output: "static",
  compressHTML: true,
  build: {
    inlineStylesheets: "never"
  },
  integrations: [react(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: "github-dark"
    }
  }
});
