# Premium visual audit and polish pass

Date: 2026-07-17
Branch: `design/premium-2026-exploration`
Scope: 58 generated visual HTML routes, shared shell, representative real interactions, desktop/mobile production-build captures.

## Evidence and method

- Before: 116 full-page captures and 332 direct-major-section captures in `output/playwright/premium-audit/before/`.
- After: 116 full-page captures and 332 matching direct-major-section captures in `output/playwright/premium-audit/after/`.
- Interaction evidence: `output/playwright/premium-audit/after/interaction/`.
- Each visual route and its major regions are listed in `docs/premium-visual-audit-route-inventory.md`; direct `main` children provide the major-section manifest. Long articles were captured as masthead, representative reading/body, related/closing, provenance, and footer regions rather than paragraph-by-paragraph.
- Production build: 58 HTML pages. Nonvisual outputs such as RSS and sitemap are separate from the visual-route count.
- The local static preview at port 4322 was used for the final screenshots so Astro's development toolbar does not affect evidence.

## Link and structural validation

The generated HTML contained 4,553 relative internal-link instances, 67 in-page-anchor instances, and 651 external-link instances. Repository link/a11y audits are the authority for target validity; the route build and audit suite report no broken routes, missing anchors, duplicate IDs, nested anchors, or one-H1 failures. The generated-page scan found one H1 on each of the 58 HTML pages.

Representative interaction checks:

- The Resources native disclosure was opened at 1024px and remained entirely inside the viewport: `after/interaction/resources-open-1024.png`.
- The mobile navigation was opened at 390px: `after/interaction/mobile-menu-open-390.png`.
- The Cockpit moved between its real blank and worn-shaft example states without an error: `cockpit-blank-1440.png`, `cockpit-example-1440.png`.
- The Decision Map real worn-part example updated on mobile: `decision-map-worn-part-390.png`.
- Playwright reported 0 browser console errors and 0 warnings during the interaction pass. One early automation selector was malformed; it was corrected with fresh accessibility-tree references and was not a site error.

## Global scorecard

Scores use the requested strict 1-10 scale. They describe the visible local implementation, not design intent. Final scores are deliberately below 8 where necessary content density or available art direction still limits the result.

| Parameter | Baseline | Final | Delta | Evidence / reason | Remaining limit |
| --- | ---: | ---: | ---: | --- | --- |
| Premium/modern visual impression | 6.4 | 7.3 | +0.9 | Fewer heavy outer surfaces on editorial/reference pages | Non-homepage imagery is intentionally restrained |
| Brand distinctiveness | 7.1 | 7.3 | +0.2 | Melt-pool hero remains singular to home | Other pages rely mostly on typography/material tone |
| Visual hierarchy | 6.6 | 7.4 | +0.8 | Calmer reading/listing scenes improve primary-content emphasis | Dense public proof remains content-heavy |
| Composition | 6.1 | 7.2 | +1.1 | Wider real masthead visual columns; two-column framework index | Some information pages retain legacy multi-module compositions |
| Symmetry and visual balance | 5.9 | 7.1 | +1.2 | Corrected underweighted visual side in real visual mastheads | Not every older split can change without markup scope expansion |
| Grid and alignment | 6.7 | 7.5 | +0.8 | Shared list/visual column alignment is more deliberate | Dense supporting metadata remains intentionally compact |
| Spacing rhythm | 6.2 | 7.3 | +1.1 | Reduced heavy overlap/panel effect and closing-path weight | Resources remains necessarily long |
| Use of whitespace | 5.9 | 7.0 | +1.1 | Empty split-column imbalance reduced | Long-form pages still need generous reading rhythm |
| Section continuity | 6.6 | 7.4 | +0.8 | Narrative fades replace hard outer surfaces | Pages keep distinct functional modes by design |
| Seamless transitions | 6.4 | 7.3 | +0.9 | Shallower reading/listing/closing transitions | No animation was added, deliberately |
| Scene pacing | 6.1 | 7.2 | +1.1 | Editorial/reference scenes are quieter than instruments | Some legacy routes still have many real sections |
| Typography | 7.0 | 7.0 | 0.0 | Approved restored pre-Instrument heading treatment preserved | No new display font introduced |
| Color/material system | 7.3 | 7.4 | +0.1 | Warm black, graphite, bronze, mineral white, amber retained | Existing cyan-bearing control language remains in instruments |
| Imagery and art direction | 7.4 | 7.4 | 0.0 | Homepage melt-pool art remains homepage-specific | No generic stock imagery introduced |
| Card/container restraint | 5.8 | 7.1 | +1.3 | Listing destinations read as editorial rows rather than boxed grids | Public Work still has semantically distinct proof records |
| Content density | 6.0 | 6.8 | +0.8 | Row treatment reduces visual noise | Resources/Public Work are purposefully content-dense |
| Component consistency | 7.1 | 7.5 | +0.4 | Shared CSS applies through common roots | Legacy structure still exists beneath the visual system |
| Navigation clarity | 7.2 | 7.2 | 0.0 | Existing approved nav structure preserved | Primary navigation is intentionally broad for the product |
| Header quality | 7.4 | 7.4 | 0.0 | Current approved header retained | No change was warranted by this audit |
| Dropdown/menu quality | 7.3 | 7.3 | 0.0 | Resources opens within the 1024px viewport | Large content menu remains necessarily multi-group |
| Footer quality | 7.3 | 7.3 | 0.0 | Current footer retained as a quiet shared signature | Link volume reflects real destinations |
| Closing-path quality | 6.6 | 7.4 | +0.8 | Reduced vertical dominance; retained route continuity | Four links can remain substantive on some pages |
| Link affordance | 7.0 | 7.4 | +0.4 | Editorial rows keep clear focus/hover styles | Some static metadata links remain intentionally subtle |
| Interactive-state clarity | 7.6 | 7.6 | 0.0 | Real tool state changes verified | No behavior change was in scope |
| Tool/product clarity | 7.7 | 7.7 | 0.0 | Dense graphite instrument surfaces intentionally retained | Mobile tool depth is intrinsically substantial |
| Long-form readability | 6.3 | 7.3 | +1.0 | Reading background is a shallow scene rather than a boxed panel | Evidence rails retain needed contrast and separation |
| Listing scanability | 6.0 | 7.2 | +1.2 | Two-column framework rows and reduced container chrome | Resources remains long at mobile widths |
| Mobile composition | 6.6 | 7.1 | +0.5 | One-column row behavior and smaller overlaps retained | Long technical tools remain long by necessity |
| Tablet composition | 6.1 | 7.1 | +1.0 | Framework index switches to one-column before compression | Each legacy content grid was not structurally rewritten |
| Responsive reflow | 7.2 | 7.3 | +0.1 | No reflow regression in captures | Browser harness does not emulate physical touch |
| Visual accessibility | 7.4 | 7.5 | +0.1 | No text-over-new-image change; no information hidden by decoration | Contrast should remain periodically checked with real device settings |
| Focus visibility | 7.5 | 7.5 | 0.0 | Header focus and native disclosure checked; static audit passes | Full keyboard traversal is limited by CLI focus reporting |
| Contrast | 7.6 | 7.6 | 0.0 | No palette expansion; support copy kept legible | Dense metadata is visually secondary by design |
| Zoom resilience | 7.0 | 7.1 | +0.1 | No fixed heights or absolute primary text added | Manual 200% browser zoom follow-up remains recommended |
| Performance-sensitive visual design | 7.8 | 7.8 | 0.0 | CSS-only changes; no new image/font/dependency/hydration | Paint costs were not profiled numerically |
| Consistency without monotony | 6.1 | 7.2 | +1.1 | Narrative, reference, and instrument scenes now diverge more clearly | More future route markup refactoring would improve variation further |
| Suitability for an industrial-AI knowledge platform | 7.4 | 7.8 | +0.4 | Editorial, evidence, and workbench surfaces are more distinct | Image language remains intentionally concentrated on the home entry point |

**Baseline composite:** 6.7/10
**Final composite:** 7.4/10
**Practical target for a later asset/structure phase:** 8.2/10

## Section-level audit and root causes

| ID | Route scope | Section / component root | Current strength | Baseline problem | Severity | Implemented recommendation | Scope | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| G-01 | Frameworks, Research, Glossary indexes | `*__masthead` with real visual | Clear content and functional visual | Copy column outweighed a narrow visual column | P1 | Increase real visual column to a balanced 1/.78 split at desktop | Shared CSS | `before/frameworks/full-1440.png`, `after/frameworks/full-1440.png` |
| G-02 | Lab Notes, Framework and Glossary details | reading-layout/content | Strong content hierarchy and rails | Large continuous narrative surface read as a floating article panel | P1 | Shallow warm narrative fade, reduced overlap, transparent reading surface | Shared CSS | `before/lab-notes-camera-is-not-a-certificate/full-1440.png`, matching after |
| G-03 | Frameworks, Resources, Research, Public Work, Lab Notes indexes | destination cards/rows | Full-card links and metadata were correct | Repetitive outer cards made reference routes feel dashboard-like | P1 | Remove unnecessary side/bottom chrome; preserve full-link focus and hover | Shared CSS | `before/frameworks/full-1440.png`, matching after; `resources/full-390.png` |
| G-04 | Framework index | `frameworks-index__list` | Real independent framework destinations | Three narrow columns caused short, boxy repetition and uneven reading measure | P1 | Use two editorial columns, one column at tablet/mobile | Shared CSS | `after/frameworks/full-1440.png`, `after/frameworks/full-390.png` |
| G-05 | Static informational routes | `info-page` first narrative scene and bands | Existing dark material family | Grid/band backgrounds repeated as hard scene boundaries | P2 | Use quiet narrative fade; leave policy/conversion boundaries intact | Shared CSS | `before/about/full-1440.png`, `after/about/full-1440.png` |
| G-06 | All closing paths | `closing-path` | Strong related-route model | Path could visually compete with page conclusion | P2 | Reduce vertical weight without changing links or footer | Shared CSS | all route full-page captures |
| G-07 | Resources and Public Work | dense index lists | Real, useful discovery coverage | Necessary route density remains visually demanding, especially at mobile | P2 | Apply editorial row restraint; do not remove data or invent filters | Shared CSS | `after/resources/full-390.png`, `after/public-work/full-1440.png` |
| G-08 | Tool pages | Cockpit, Decision Map, brief/template/demo | Clear genuine controls and results | Risk of accidental editorial cleanup weakening workbench hierarchy | P1 risk | Excluded instrument controls from the changes; tested live states | Shared CSS boundary | `after/tools/full-390.png`, interaction captures |
| G-09 | Header/menu | `Header`, `MobileMenu` | Approved current shared navigation | Risk of menu clipping at narrower desktop state | P2 verification | No code change; confirmed menu open inside 1024px viewport | Verified, no change | `after/interaction/resources-open-1024.png` |
| G-10 | Footer/provenance | `Footer`, `PageProvenance` | Compact, grouped footer structure | Risk of footer reading as appended after a heavy closing block | P2 | Quiet closing path above it; no footer markup rewrite | Shared CSS | representative full-page captures |

### Root-cause classification

1. **Global-system:** scene backgrounds and overlap values were too uniform; corrected with final cascade-level CSS only.
2. **Shared-template:** article reading surfaces and index mastheads carried too much frame weight; corrected through existing class roots.
3. **Shared-component:** independent listing links had an unnecessarily card-like outer presentation; corrected while preserving anchors and focus behavior.
4. **Page-family:** Frameworks had an especially visible split-balance problem; its shared index root now uses two content columns.
5. **Route-specific exceptions:** none changed. Public Work and Resources remain dense because the actual content is dense.
6. **Responsive-only:** Framework cards collapse at 1023px; mobile overlap reduces without removing normal document flow.
7. **Accessibility-related visual:** no introduced clipping or contrast treatment; native menu semantics and tool controls remained untouched.

## Executed implementation plan

| Priority | Issue IDs | Files | Result | Validation |
| --- | --- | --- | --- | --- |
| 1 | G-01, G-04 | `src/styles/components.css` | Balanced visual mastheads and a two-column editorial framework index | Desktop/tablet/mobile screenshot sets |
| 2 | G-02 | `src/styles/components.css` | Long-form masthead-to-reading transition no longer appears as a large rounded panel | Lab Note, framework, glossary captures |
| 3 | G-03, G-07 | `src/styles/components.css` | Listing link chrome reduced while destination semantics remain unchanged | Index captures; static a11y/link audits |
| 4 | G-05 | `src/styles/components.css` | Static information bands use quieter narrative pacing | About/identity/thesis/full-site captures |
| 5 | G-06, G-10 | `src/styles/components.css` | Closing paths are visually quieter before provenance/footer | Representative full-page captures |
| 6 | G-08, G-09 | No source change | Existing instrument/navigation behavior preserved and actively tested | Interaction captures, console checks |

## Remaining issues

- **P0:** 0.
- **P1:** 0 unresolved within the approved CSS-only scope.
- **P2:** 3 - Resources mobile density, Public Work's necessary proof-object density, and manual 200% zoom verification on a physical browser.
- **P3:** 2 - future route-specific structural variation for static informational pages; a future asset phase could extend non-home material art without repeating the melt-pool image.

## Preservation and performance notes

- No content, claims, technical boundaries, URLs, canonicals, JSON-LD, navigation data, Cockpit logic, Decision Map logic, font assets, packages, lockfiles, audit scripts, or image assets were changed.
- No new dependency, font, remote request, client hydration boundary, or animation was introduced.
- No literal homepage melt-pool asset was reused outside the homepage.
- No layout-shift measurement was claimed. The changes are CSS-only and add no new intrinsic-size-sensitive media.
- Final detailed status and validation output should be read alongside `docs/premium-visual-audit-matrix.csv` and the local screenshot report.
