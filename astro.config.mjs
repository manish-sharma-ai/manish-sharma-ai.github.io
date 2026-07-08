import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://manishsharma.dev",
  base: "/",
  output: "static",
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false
    }),
    mdx(),
    sitemap()
  ],
  markdown: {
    shikiConfig: {
      theme: "github-dark"
    }
  }
});
