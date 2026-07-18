# Page choreography audit

## Scope and evidence

- Branch: `design/premium-2026-exploration`
- Starting commit: `f10dc42caf5bb4a097134c53244c8568a55c5627`
- Generated visitor-facing routes: **58**, including `/404`; `/rss.xml` was validated separately as a nonvisual endpoint.
- Semantic/structural regions inventoried: **964** (**16.6** per route on average).
- Before evidence: **116** full-page captures at 1440px and 390px.
- After evidence: **116** matching full-page captures plus priority boundary and real interaction states.
- Baseline visible chapters: **346** (**6.0** per route).
- Final visible chapters: **233** (**4.0** per route).
- Route-wide browser audit: one H1 on every route; no duplicate IDs, nested anchors, or horizontal overflow.
- Browser findings: no normal-route console, hydration, or failed-request errors; the `/404` response produced only its expected HTTP 404 console entry.

The baseline was technically healthy. The design problem was page ownership: semantic sections too often rendered as autonomous visual modules rather than related parts of one chapter.

## Root causes

1. **Section ownership outweighed page ownership.** Many H2 regions introduced a separate background, border, grid, spacing reset, or label even when the argument continued.
2. **The same macro rhythm repeated.** Masthead, overlap, card group, band, related path, provenance, and footer made every route restart at predictable intervals.
3. **Cards carried too much hierarchy.** Narrative, proof, reference, and actions frequently used similar containers, weakening the functional distinction between them.
4. **Macro whitespace and local density conflicted.** Large inter-section gaps surrounded dense metadata and panels, so the whitespace felt discontinuous rather than calm.
5. **The ending behaved as an apparatus.** Related paths, provenance, and footer each announced themselves instead of resolving the page together.
6. **Family purpose was underexpressed.** Tools appropriately used dense instrumentation, but listings and reading pages inherited too much of that rhythm.

## Global re-score

Scores use the requested strict scale: 5 is usable but template-like, 7 is credible and polished, and 8 requires a genuinely premium, resolved route. No score was inflated to 8+.

| Parameter | Baseline | Final | Evidence and remaining constraint |
| --- | ---: | ---: | --- |
| Page-level hierarchy | 5.8 | 7.3 | Dominant route moments remain intact while secondary sections now share chapter canvases. |
| Visual storytelling | 5.2 | 6.9 | Cause-and-effect is clearer; content-heavy reference routes remain necessarily utilitarian. |
| Chapter clarity | 5.0 | 7.4 | 346 estimated chapters were consolidated to 233 without removing semantics. |
| Chapter pacing | 5.2 | 7.2 | Related modules now share one rhythm; very long source-authored pages still require sustained reading. |
| Seamless transitions | 5.0 | 6.9 | Chapter canvases and one ending dissolve replace repeated hard bands. |
| Narrative cause-and-effect | 5.1 | 6.9 | Homepage, Public Work, and Tools now express explicit page-level sequences. |
| Dominant visual moments | 6.0 | 7.2 | Melt-pool hero, proof sequence, workbench, reading surface, and collection each retain family-specific priority. |
| Composition variety | 5.6 | 6.8 | Families remain distinct without route-by-route novelty for its own sake. |
| Consistency without repetition | 5.2 | 7.0 | Shared family scopes replace duplicated section restarts. |
| Card/container restraint | 5.5 | 6.8 | Page-level boxes were reduced; cards remain where they carry real records or controls. |
| Visual density rhythm | 5.1 | 7.0 | Narrative, discovery, workbench, and ending scenes now use different densities. |
| Whitespace purpose | 5.0 | 6.9 | Spacing now separates chapters more than individual modules. |
| Alignment continuity | 6.4 | 7.3 | Existing container/grid alignment now persists across grouped scenes. |
| Background continuity | 4.9 | 7.2 | Repeated bands were neutralized inside shared page canvases. |
| Visual bridge quality | 5.2 | 6.8 | Short aligned chapter rules and surface shifts remain secondary to content. |
| Opening-to-middle flow | 5.4 | 7.3 | Priority routes now carry their opening directly into proof or workbench content. |
| Middle-page momentum | 4.9 | 6.9 | Knowledge, evidence, and tool modules no longer restart the page at every H2. |
| Ending resolution | 4.8 | 7.1 | Related links and provenance now dissolve into the global footer as one ending. |
| Footer integration | 5.2 | 7.2 | Footer tone inherits the reference scene rather than beginning a new block. |
| Mobile narrative flow | 5.6 | 7.0 | One-column order is unchanged; grouped canvases remove excess mobile restarts. |
| Tablet chapter behavior | 5.8 | 7.0 | 768px and 1024px layouts preserve chapter boundaries without overflow. |
| Interactive-product continuity | 6.4 | 7.3 | Tools retain dense, functional workbenches with narrative context and clear outputs. |
| Long-form calmness | 5.8 | 7.3 | Shared article templates use one reading canvas and a separate concluding reference scene. |
| Listing scanability | 6.2 | 7.2 | Masthead and collection now behave as one discovery chapter while rows/cards remain unchanged. |
| Premium impression | 5.2 | 6.9 | The system is calmer and more composed; source-heavy routes remain intentionally technical rather than cinematic. |
| Industrial-AI platform suitability | 6.8 | 7.5 | Editorial, evidence, and instrument modes are now related but functionally distinct. |

Route-level baseline and final scores are recorded in `page-choreography-matrix.csv`.

## Implemented chapter architecture

- A shared `page-flow` root classifies routes as home, recovery, tool, long-form, listing, evidence, or informational.
- Homepage uses five visible chapters: position; method and Cockpit; proof; knowledge routes; boundary and next action.
- Public Work uses five visible chapters: public identity; primary proof; supporting evidence; reference layer; boundary and closing.
- Tools uses five visible chapters: orientation; decision workbench; output and evidence; next paths; integrated ending.
- Lab Note, Framework, and Glossary article templates use brand, narrative/model, reference, and ending scenes.
- Listing indexes use compact orientation, continuous discovery, boundary/context, and ending scenes.
- Informational and evidence families keep every semantic section while removing repeated full-width visual restarts.
- Related paths and Page Provenance are grouped into one shared ending that dissolves into the footer.

## Validation findings

- All **58** routes rendered at desktop and mobile with one H1 and no horizontal overflow.
- **0** duplicate-ID and **0** nested-anchor findings.
- Header Resources disclosure opened, stayed inside the viewport, and closed with Escape.
- Mobile navigation opened at 390px without page overflow.
- Cockpit example selection, details disclosure, reset state, output updates, and visible focus remained functional.
- Representative routes passed at 320px, 768px, 1024px, and a 720-CSS-pixel practical equivalent of 200% zoom on a 1440px display.
- The Cockpit anchor landed clear of the header; no focus clipping was observed in the tested path.
- Reduced-motion was used for capture; no comprehension depends on animation.
- Representative cumulative layout shift observed by the harness was `0`.
- No new package, font, image, hydration directive, continuous animation, or remote request was introduced.

## Remaining issues

| Severity | Routes | Reason |
| --- | ---: | --- |
| P0 | 0 | No unusable or inaccessible choreography defect remains. |
| P1 | 0 | No addressable high-impact page-flow defect remains. |
| P2 | 7 | Public Work, Tools, Resources, About, Site Map, Brief Standard, and Decision Map remain unusually long or dense because their real content and functionality were preserved. |
| P3 | 51 | Minor route-specific density variation remains across otherwise resolved shared-family layouts. |

Further reduction on the seven P2 routes would require content prioritization, disclosure, or product-scope decisions. Those changes were intentionally excluded because this pass preserves copy, order, routes, evidence boundaries, and tool behavior.
