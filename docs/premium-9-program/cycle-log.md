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

## Cycle 3 hypothesis — establish an evidence hierarchy

Lowest remaining dimensions: card/container restraint, informational-page storytelling, content-density rhythm, and evidence-route hierarchy.

Hypothesis: retaining substantive case records as bounded proof modules while converting supporting signals, classifications, rules, cited facts, knowledge items, and source destinations into open editorial sequences will make the evidence family more authoritative and easier to scan without weakening any boundary.

Acceptance gates: preserve every fact, citation, evidence class, case, metric, boundary, and destination; maintain source order; keep external-link behavior; do not leak styles into Public Work or long-form content.

### Cycle 3 result — accepted

- Reworked `EvidenceRail` visually as one open Sense → Model → Decide → Verify sequence with a mobile vertical reading order.
- Converted the evidence classification, strong/weak rules, field notes, and cited-fact grid from repeated dashboard cards into restrained editorial rows.
- Kept the four Industrial Proof cases as the dominant bounded proof records while opening capability signals, knowledge items, interpretation points, and source links.
- Removed nested mini-card treatment inside case records while preserving all wording, statuses, claims, tags, actions, and boundaries.
- Focused validation: 58-page build passed with 0 diagnostics; 22 accepted evidence and regression captures show no malformed output or horizontal overflow.
- Regression evidence: Public Work desktop and the representative Lab Note mobile remained visually stable.
- Reviewer result: all reviewers accept the evidence hierarchy. Reviewer D still rejects 9 because shared endings remain administratively heavy and interactive mobile routes require explicit focus, zoom, and hash-state evidence.

Estimated lowest-credible global score after cycle 3: **8.2**.

## Cycle 4 hypothesis — turn the shared ending into one conclusion

Lowest remaining dimensions: page endings, consistency without monotony,
mobile density, and perceived administrative weight.

Hypothesis: keeping the related destinations, provenance, correction route,
and full footer intact while reducing their outer chrome and merging their
surfaces will make unlike pages conclude calmly without hiding trust context.

Acceptance gates: preserve every destination and provenance fact; keep the
native details disclosure; retain visible focus and mobile touch targets; no
horizontal overflow; do not change page-body layout or source order.

### Cycle 4 result — accepted

- Reframed the closing-path header as one balanced editorial line and reduced
  the four destinations from tall panels to compact route records.
- Preserved every link description, index, action, and accessible name.
- Reduced Page Information to a quiet native disclosure line while retaining
  all facts, decision boundary, and correction destination when expanded.
- Dissolved the ending into the existing footer surface and reduced the
  footer's concluding weight without changing its content or grouping.
- Focused validation: lint passed with 0 diagnostics; 58-page build passed;
  `git diff --check` passed; representative desktop and mobile endings showed
  no malformed output or horizontal overflow.
- Evidence: focused captures under `output/playwright/premium-9/cycle-4/`.
- Reviewer result: all reviewers accept the quieter ending. Reviewer D still
  rejects 9 pending explicit keyboard, zoom, hash-target, and open-disclosure
  evidence across interactive and narrow-screen routes.

Estimated lowest-credible global score after cycle 4: **8.4**.

## Cycle 5 hypothesis — prove fragile responsive and interaction states

Lowest remaining dimensions: narrow-screen intentionality, keyboard clarity,
zoom resilience, disclosure behavior, hash landing, and interactive confidence.

Hypothesis: state evidence will either validate the shared system or expose a
small measurable defect. Any fix must be limited to the failing state and must
not change route content, information architecture, or tool logic.

Acceptance gates: 320px and zoom-equivalent reflow without horizontal
overflow; Resources remains dismissible by Escape and click-away; mobile menu
stays inside the viewport; Page Information expands; Cockpit and Decision Map
results update; one H1 remains; no browser errors.

### Cycle 5 result — accepted with one harness limitation

- Found and fixed a measured 3.2px left-edge clip in the open mobile menu at
  320px by constraining the panel to viewport width minus safe margins.
- Added an explicit two-pixel focus-visible outline to Resources and mobile
  navigation links; existing active, hover, and open states remain intact.
- Verified Resources opens, reports `aria-expanded=true`, closes on click-away,
  and closes on Escape.
- Verified open Page Information at 390px with no horizontal overflow.
- Verified `/tools#lmd-decision-cockpit` lands above the Cockpit content without
  header collision and the Prepare RFQ selection updates the live result.
- Exercised Decision Map with a new, small, full-geometry, internal-channel
  scenario; the live recommendation changed to `SLM/LPBF alternative` with no
  runtime warning or error.
- Measured 15 route/viewport combinations at 320px, 390px, and a 720px CSS
  viewport equivalent to a 1440px window at 200% zoom: zero horizontal
  overflow and exactly one H1 in every case.
- The in-app browser did not expose a working page-zoom command, so actual
  browser-chrome 200% zoom could not be captured. The equivalent CSS viewport
  was tested and this limitation is retained rather than reported as an exact
  browser-zoom pass.
- Focused validation: lint passed with 0 diagnostics; 58-page build passed;
  `git diff --check` passed.
- Evidence: captures and `responsive-matrix.json` under
  `output/playwright/premium-9/cycle-5/`.

Estimated lowest-credible global score after cycle 5: **8.6**.
