# Premium 9 autonomous cycle log

## Baseline

- Starting SHA: `2972829289c9c7f71d2aa533eca1db8b1119140c`
- Branch: `design/autonomous-premium-9-plus`
- Routes: 58 visual HTML routes plus `/rss.xml`
- Accepted screenshots: 522
- Technical baseline: 0 lint findings, 0 Astro/TypeScript diagnostics, 20 tests passed, 58 pages built, `audit:all` passed, `git diff --check` passed
- Lowest-credible global score: 7.4

## Cycle 1 hypothesis — remove shared legacy outer chrome

Lowest dimensions: card/container restraint (6.8), consistency without monotony (6.9), composition variety (7.0), seamless transitions (7.1).

Hypothesis: opening shared narrative/reference hero models and warming their residual cool surfaces will improve premium impression, balance, card restraint, and family distinction without changing content or templates. A separate compact recovery treatment is warranted for `/404` because its utility purpose is genuinely unique.

Acceptance gates: no clipped content, no loss of conceptual order, no new overflow, no family regression of 0.3+, and no route-specific content change.

### Cycle 1 result — accepted

- Opened the shared `PageHeroVisual` treatment into an editorial sequence while preserving figure, list, labels, order, and reading direction.
- Reworked `/404` as a warm, compact recovery chapter with the same links and wording.
- Found a real Demo defect: the unsupported `lg:grid-cols-[0.42fr_0.58fr]` rule produced a 1,513px first column and a 50px second column outside the clipped canvas. Replaced both Demo arbitrary splits with explicit responsive grids.
- Focused validation: lint passed with 0 diagnostics; 58-page build passed; `git diff --check` passed.
- Evidence: 30 accepted screenshots under `output/playwright/premium-9/cycle-1/`.
- Reviewer result: all four reviewers accept the shared model and recovery changes. Reviewer D rejects a 9 because Demo's visible output still creates a hollow left column beside a long right column, and listing cards remain too tall.

Estimated lowest-credible global score after cycle 1: **7.7**. This is improvement, not completion.

## Cycle 2 hypothesis — resolve hollow splits and legacy listing density

Lowest remaining dimensions: whitespace purpose, density rhythm, composition variety, and listing scanability.

Hypothesis: turning Demo's final artifact into a one-column editorial sequence, reducing equal-height research destination blocks to compact rows, and compacting mobile footer groups to a balanced two-column grid will remove large unused regions without hiding content.

Acceptance gates: preserve source order and every destination; no nested links; keep minimum touch targets; no horizontal overflow at 320px; no regression to long-form reading or tools.

### Cycle 2 result — accepted

- Replaced Demo's hollow paired output with a single-column final-artifact sequence; all six real output modes, actions, and copy remain in their original order.
- Reduced Research's four oversized destination containers to compact two-column editorial rows on desktop and one column on mobile.
- Compacted the mobile footer to two balanced columns at ordinary phone widths, with a one-column fallback at 360px and below for zoom and narrow-screen safety.
- Preserved all content, links, hydration, tool behavior, and semantic order.
- Focused validation: 58-page build passed with 0 Astro/TypeScript diagnostics; no screenshot was malformed or showed horizontal overflow.
- Evidence: 31 accepted screenshots under `output/playwright/premium-9/cycle-2/`, plus a targeted Demo artifact capture.
- Reviewer result: all reviewers accept the density correction. The site remains below 9 because evidence-heavy routes still contain too many comparable proof panels, and shared endings still carry too much administrative weight.

Estimated lowest-credible global score after cycle 2: **8.0**. The change is materially better, but it is not a 9.
