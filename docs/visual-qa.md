# Visual QA

Date: 2026-07-10

## Current release matrix

Check at 360 px, 768 px, 1024 px, and 1440 px where practical:

- `/`
- `/tools`
- `/trust`
- `/research/core-lmd-ai-sources`
- `/frameworks`
- `/for-ai-agents`
- `/domains/lmd-ded`
- `/de`
- `/404.html`
- `/review`

## Interaction checklist

- Desktop header shows Start, Thesis, LMD / DED, Tools, Proof, About, and a readable Resources control without overflow.
- Mobile menu opens as a grouped panel with large tap targets and closes on outside click or Escape.
- Command search traps focus, supports arrow keys and Enter, restores focus, and opens a `?q=` query automatically.
- Homepage has one dominant cockpit action, one worked-example action, and one Exafuse handoff.
- Homepage task paths make repair, RFQ, monitoring, and process-selection starts obvious.
- Compact cockpit shows the worked brief before optional controls; “Start your own brief” reveals controls.
- Information and risk controls are progressively disclosed.
- Secondary workbench modules stay collapsed until requested and open when their hash route is used.
- Trust, source, 404, and German pages preserve the same hierarchy and contrast as core routes.
- The public-review page exposes all six protocol tasks, keeps audience/friction notes optional and browser-local, and clearly says that no participant results are claimed.
- Cards do not overlap; text does not overflow controls or chips.
- Focus states remain visible at 200% zoom.
- Reduced-motion mode removes nonessential motion without hiding information.

## Automated status

- Astro 7 production build: passing, 57 generated pages.
- Astro diagnostics: 126 files, 0 errors, warnings, or hints.
- Decision Brief and public-review tests: 12 passing.
- `audit:all`: passing, including the comprehensive experience/link/fragment audit.
- Production dependency audit: 0 vulnerabilities.
- External shared CSS reduced homepage HTML from the 134 KB baseline to about 76 KB and tools HTML from 216 KB to about 167 KB before transfer compression.

## Manual status

The in-app browser backend was unavailable in this coding session, so screenshots, real-browser keyboard behavior, measured contrast, and responsive visual sign-off remain open evidence gates. The localhost preview must be reviewed before deployment. Do not convert historical Lighthouse results into current claims until the representative-route matrix is rerun.
