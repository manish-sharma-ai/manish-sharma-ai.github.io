# Exafuse media attribution

Exafuse-derived media is evidence context, not decorative stock imagery.

## Required rendering pattern

Use `src/components/ExafuseProofMedia.astro` with an item from `src/data/exafusePublicProof.ts`. The component renders:

1. responsive AVIF, WebP, and JPEG fallback sources;
2. explicit dimensions and loading behavior;
3. concise descriptive alternative text;
4. visible `Exafuse — [case title]` attribution;
5. a caption; and
6. a direct verified Exafuse source link.

Do not place imported media in a CSS background when its attribution or caption would be lost. Do not recolor, watermark, or digitally alter technical meaning. Cropping for responsive presentation is permitted only when it does not change the evidence claim.

## Asset rules

- Keep a source-media path in the public proof registry.
- Keep AVIF/WebP widths at 480, 768, and 960 pixels unless a justified layout needs another size.
- Keep the JPEG fallback at 960 pixels or smaller.
- Use lazy loading except for a genuine page lead image.
- Do not copy original giant files or private/internal image names into page text.
- Remove an asset by removing its registry entry, derivatives, and any rendered component usage together.

## Claim boundary

The caption and nearby copy must identify what the image shows in its photographed context. It must not convert an image, monitoring result, dye inspection, or finished component into a universal quality, certification, or performance claim.
