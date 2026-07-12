# Visual Review Artifacts

Date: 2026-07-12

This folder records the visual-clarity pass without deploying review artifacts.

## Screenshots

The in-app browser was unavailable in this environment. No automated screenshots were captured. The review instead checks built HTML, responsive CSS, SVG source, image dimensions, and asset sizes.

## Visual Inventory

- Homepage LMD process schematic: deterministic inline SVG and semantic legend.
- Shared page-hero models: semantic HTML/CSS, no raster or client-side diagram runtime.
- Decision map: concise HTML question grid, Markdown route map, and interactive route tool.
- Identity model, process loop, evidence rail, and evidence ladder: semantic HTML/CSS.

## Asset and Runtime Notes

- No new raster assets were introduced.
- No Figma, FigJam, Mermaid, Lottie, Three.js, WebGL, iframe, or third-party runtime dependency is shipped.
- The FigJam exploration is not embedded or exported to the public site; the implemented diagrams are deterministic source code.
- Existing `og-image.png` is social metadata and is not a homepage content image. Existing profile images retain responsive source variants.

## Measured Build Snapshot

| Item | Before | After | Notes |
| --- | ---: | ---: | --- |
| Decision map SVG | 4,920 B | removed | The static SVG was removed after visual review; route logic remains in accessible HTML, Markdown, and the interactive map. |
| New raster visual assets | 0 B | 0 B | No new PNG, JPEG, WebP, AVIF, or embedded raster data. |
| New visual client JavaScript | 0 B | 0 B | Final diagrams use Astro/HTML/CSS or inline SVG. No new island or dependency was introduced. |
| Current client JavaScript, raw build total | n/a | 258,758 B | Context only; a retained baseline bundle was not available for a byte-for-byte comparison. |

Current generated HTML sizes, before HTTP compression:

| Route | HTML bytes |
| --- | ---: |
| `/` | 75,858 |
| `/de/` | 54,755 |
| `/tools/` | 175,737 |
| `/domains/lmd-ded/` | 71,245 |
| `/frameworks/lmd-quality-evidence-ladder/` | 67,696 |
| `/decision-map/` | 81,701 |
| `/identity/` | 57,727 |

The new static audit enforces a 350 KB homepage content-image budget, blocks known visual runtimes, rejects large raster additions, requires static-image dimensions, checks selected SVG label sizing, and scans generated public files for organization/repository references.

## Performance and Visual Test Limitation

- `npm run build`, `npm run audit:visuals`, and `npm run audit:all` completed against the generated site.
- The in-app browser service was unavailable, and Lighthouse is not installed locally, so browser screenshots and Lighthouse runs could not be captured without switching to an unsupported browser-automation path.
- No Lighthouse or PageSpeed score is claimed in this review. A repeatable live Lighthouse/PageSpeed run remains the post-deploy acceptance step.

## Responsive Review Scope

CSS supports compact desktop, tablet, and mobile layouts. On narrow screens, diagram legends and identity stages stack, and directional decoration is removed where it would obscure reading order.

Checked responsive rules:

- `860px`: semantic diagram legends and identity stages change from multi-column to two-column/stacked layouts; process arrows are removed when they no longer clarify sequence.
- `520px`: legends and identity stages become single-column and spacing is reduced without hiding substantive labels.
- `/de/` has no baked English diagram asset; German content remains text-based and editable.
