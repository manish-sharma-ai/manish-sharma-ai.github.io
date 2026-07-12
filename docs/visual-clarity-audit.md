# Visual Clarity Audit

Date: 2026-07-12

Scope: major explanatory and conceptual visuals only. This is an internal review record, not a public route.

| Route | Component/file | Type | Intended message | Previous clarity problem | Action | Performance cost | Replacement |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | `HeroLaserVisual.tsx` | Explanatory diagram | Connect deposition, monitoring, and verification | Atmospheric beam-and-signal artwork had no readable technical labels | Redesign | Inline SVG, no network or client JS | Labelled LMD schematic with laser beam, melt pool, deposited track, process signal, and inspection evidence |
| Shared desktop page heroes | `PageHeroVisual.astro` | Conceptual model | Summarize each page's decision concept | Generic grids, bars, and nodes resembled dashboards without meaning | Simplify | Removed a large inline SVG; no asset request | Three-step semantic framework with classification, reading direction, and local copy |
| Thesis, tools, frameworks | `ProcessLoop.astro` | Navigation/decision flow | Explain Sense -> Model -> Decide -> Verify | Stages were readable but direction was implied only by layout | Simplify | HTML/CSS only | Explicit reading-direction note and directional connectors on wider layouts |
| `/evidence` | `EvidenceRail.astro` | Explanatory diagram | Show how signals become review and verification work | Visual connector was not explained | Simplify | HTML/CSS only | Captioned four-stage evidence workflow |
| `/frameworks/lmd-quality-evidence-ladder` | `EvidenceLadder.astro` | Conceptual model | Show evidence hierarchy | Long list could read as a numerical score | Keep and clarify | HTML/CSS only | Explicit hierarchy caption stating that levels are not approval or a universal score |
| `/decision-map` | `decision-map.astro`, `LmdDecisionMap` | Navigation/decision flow | Compare early LMD route signals | Static route map added visual density without improving the decision flow | Remove | Removed static SVG | Concise HTML question grid, accessible Markdown route map, and interactive decision flow |
| `/identity` | `IdentityGraph.astro` | Navigation model | Explain profile structure | Eight-node network had crossing relationships and undersized labels | Redesign | HTML/CSS only | Four-stage profile model: person, focus, technical domain, company context |
| Framework, glossary, research, notes pages | `PageHeroVisual.astro` variants | Conceptual model | Orient readers to the page concept | Repeated decorative technical patterns added visual density without context | Simplify | Removed duplicate SVG structure | Variant-specific text models using the same visual grammar |

## Classification Notes

- No page uses invented numerical charts, scientific curves, gauges, or pseudo-measurement axes.
- The decision map is an illustrative route screen, not sourced performance data.
- The evidence ladder, readiness, repairability, maturity, and failure pages are conceptual frameworks or rule-based screens; their labels state this in nearby text.
- Public case metrics remain separate from conceptual diagrams and retain their existing source context.

## Technical Review Notes

- The homepage process schematic is intentionally generic. It distinguishes laser beam, melt pool, deposited track, process signal, and inspection evidence without depicting a universal nozzle or powder trajectory.
- The process signal arrow ends at an inspection-evidence block to make the limitation explicit: monitoring may prompt review but does not certify final quality.
- The decision map uses early route signals only. It keeps material, geometry, service conditions, inspection requirements, and expert review outside the apparent certainty of the drawing.

## Validation Plan

- Build and static audits verify diagram structure, label sizes, asset properties, and absence of runtime diagram libraries.
- The in-app browser was unavailable in this environment, so automated desktop/mobile screenshots are not included. Generated HTML, responsive CSS breakpoints, asset dimensions, and live response bodies are inspected instead.
