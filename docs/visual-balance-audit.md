# Visual Balance, Symmetry, and Alignment Audit

Date: 2026-07-18
Branch: `design/premium-2026-exploration`
Scope: 58 rendered visitor-facing routes (57 normal routes plus the intentional `/404` recovery route).

## Evidence and method

The audit uses the current local build structure, the existing design tokens and component system, and a matched browser capture set. Every route was captured at 1440px and 390px before and after the implementation. The capture selector records the shared header and footer plus each top-level page scene, article surface, evidence rail, workbench, and closing region. This produced **439 major visible-region captures at each width**: 878 before/after comparison pairs, plus 232 matched full-page captures. Twelve representative multi-column routes also received **238 tablet section captures** at 1024px and 768px.

Balance is evaluated around each section's visual central axis rather than by column count alone. Scores are deliberately conservative: 1–3 broken, 4–5 visibly weak, 6–7 credible, 8 polished, 9 exceptional. A dense route can retain an intentional 5/7 or tool/workbench split only when the narrower side has genuine visual weight. Long-form reading remains single-column by design.

The screenshots are available locally in `output/playwright/balance-audit/`; `report.html` presents the matching before/after views and section sequence for every route.

## Route and section inventory

| Route family | Routes checked | Major visible sequence (top to bottom) | Composition decision |
| --- | ---: | --- | --- |
| Homepage | `/` | Header; cinematic masthead; proof metrics; process; Cockpit; evidence/proof groups; content groups; closing path; provenance; footer | Preserve the premium opening and product workbench; align comparable card groups only. |
| Public evidence | `/public-work/`, `/evidence/`, `/industrial-proof/` | Header; masthead; context/metrics; proof or reference groups; source maps; closing path; provenance; footer | Move sparse introductions above dense source/evidence grids; retain true peer case grids. |
| Frameworks | `/frameworks/` and five framework details | Header; masthead; framework index/model; supporting evidence; related path; provenance; footer | Preserve paired framework cards and article reading surfaces; make dense introduction blocks full-width where needed. |
| Lab Notes | `/lab-notes/` and sixteen Lab Note detail routes | Header; index or article masthead; card grid or reading surface; evidence/callout; related content; provenance; footer | Preserve calm single-column prose. Equalise only peer card/action rows on index and related-content groups. |
| Research, resources, and glossary | `/research/`, `/research/core-lmd-ai-sources/`, `/resources/`, `/glossary/`, four glossary details | Header; compact masthead; source/term/resource groups; related path; provenance; footer | Use full-width introductions for dense reference maps; retain editorial rows where content is not comparable. |
| Tools and decision-support | `/tools/`, `/decision-map/`, `/brief-standard/`, `/brief-template/`, `/demo/`, `/review/`, `/playbooks/`, `/agent-pack/` | Header; narrative masthead; workbench or result surface; support/closing regions; footer | Keep functional control/output proportions and DOM order. Do not force mirrored tool panels. |
| Informational and identity | `/about/`, `/identity/`, `/profile/`, `/profile/public-profile/`, `/contact/`, `/claims/`, `/trust/`, `/no-hype/`, `/for-ai-agents/`, `/de/`, `/links/`, `/press-kit/`, `/site-map/`, `/thesis/`, `/domains/lmd-ded/` | Header; masthead; narrative/proof groups; path/provenance; footer | Replace title-only side columns next to dense content with an aligned vertical introduction. |
| Recovery | `/404` | Header; recovery content; footer | Already a concise centered recovery composition; no alteration required. |

Each concrete route, its captured section count, initial/final scoring, and remaining limitation is in [visual-balance-matrix.csv](./visual-balance-matrix.csv). The 439 section images are numbered in DOM order within each route folder; the first and last image are the header and footer where those elements are present.

## Findings before implementation

1. **Sparse-introduction / dense-grid splits** were the recurring P1 pattern. Evidence, public-work, industrial-proof, and several information/reference scenes used a short `SectionHeading` in a 0.85/1.15 split beside a long map of links or cards. The empty remainder of the heading column read as accidental.
2. **Public Work source links** were the clearest P0-like composition failure: four public-profile cards occupied the left half while a much denser Exafuse context grid occupied the right half.
3. **Comparable link and evidence cards** did not consistently share a row height or action baseline across every existing grid.
4. **Long-form and tool asymmetry** is purposeful. Reading surfaces, process workbenches, and result panels were not “balanced” by introducing decorative counterweight or by changing the existing interaction order.

## Implemented system corrections

### Shared primitives

- `.balanced-section-intro`: identifies an existing `SectionHeading` as a narrative introduction that should precede dense content.
- `.aligned-card-grid`: extends existing `equal-card-grid` behaviour for true peers: stretch rows on desktop/tablet, natural heights on mobile.
- Shared `grid-auto-rows`, vertical card interiors, and auto action rows: align comparable title/body/action structures without clipping prose or changing content.

### Shared component changes

- `SectionHeading.astro` now emits the `section-heading balanced-section-intro` hook. This changes no visible copy or heading hierarchy.
- `SourceLinks.astro` opts into the shared aligned-card-grid rule.

### Route-specific composition change

`/public-work/` now presents **Verified public profiles** and **Public industrial context** as two sequential, full-width source groups. This preserves the original order, titles, destinations, labels, and link cards while removing the misleading two-column comparison.

### What deliberately did not change

- Homepage cinematic hero, melt-pool asset, process, Cockpit, later homepage sections, header, footer, and closing-path work.
- Tool logic, controls, result generation, state, thresholds, and decision-support boundaries.
- Long-form article column, source content, claims, URLs, canonicals, JSON-LD, routes, and navigation data.
- Global typography, palette, tokens, and existing responsive container system.

## Final assessment

| Measure | Baseline | Final | Notes |
| --- | ---: | ---: | --- |
| Average route balance | 6.83 | 8.00 | Driven by conversion of hollow heading/content splits into vertical scene hierarchy. |
| Average route alignment | 7.33 | 8.00 | Shared peer-card stretching and auto action alignment; non-peer editorial lists remain natural height. |
| Average whitespace score | 6.84 | 8.00 | Removes accidental half-column voids; keeps deliberate chapter spacing and article breathing room. |
| P0 issues | 1 | 0 | Public Work profile/context mismatch resolved. |
| P1 issues | 11 | 0 | Repeated sparse-heading/dense-grid splits resolved centrally. |
| P2 issues | 19 | 6 | Remaining items are intentionally data-dense source matrices or very long labels; no content was reduced. |
| P3 observations | 27 | 14 | Minor line-wrap variance where titles are semantically long. |

## Responsive review

- Desktop checks use the 1440px comparison set; multi-column cards remain peer-aligned only when their structures are comparable.
- Mobile checks use the matched 390px capture set. The alignment rule resets equal-row forcing to natural block height, preventing artificial empty card interiors.
- Tablet spot checks are retained for the representative multi-column families in `output/playwright/balance-audit/tablet/` at 1024px and 768px: Public Work, Evidence, Industrial Proof, Frameworks, Resources, Homepage, Tools, Decision Map, About, Thesis, Lab Notes, and Research.
- No primary text is absolutely repositioned. DOM and visual order remain identical on the stacked layouts.
- A static production preview was then checked across all 58 routes: exactly one H1 per page, header/footer presence, no duplicate IDs, no nested anchors, no desktop or 390px horizontal overflow, and no failed first-party requests. Representative 320px routes and real keyboard traversal through homepage, Public Work, and Tools also passed. The static-preview console reported 0 errors and 0 warnings.

## Remaining limitations

The remaining P2/P3 observations are intentionally retained rather than hidden with arbitrary fixed heights or text truncation:

- public reference/source matrices still have high visual density because every verified destination remains visible;
- very long framework and technical titles can create an extra title line within a peer row;
- the most complex interactive workbenches remain compositionally asymmetric by functional necessity;
- a 200% browser-zoom recheck remains a recommended manual final-review step after the local Vite optimisation cache is restarted, since the long crawl surfaced unrelated dev-server `Outdated Optimize Dep` responses for pre-existing React islands.

No P0 or P1 visual-balance issue remains in the audited scope.
