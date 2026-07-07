# Visual QA

Date: 2026-07-07

## Pages To Check In Browser

- `/`
- `/tools`
- `/frameworks`
- `/for-ai-agents`
- `/domains/lmd-ded`
- `/evidence`
- `/identity`
- `/about`

## Checklist

- Header shows five primary links on desktop: Thesis, Proof, LMD / DED, Frameworks, Writing.
- `More` menu contains secondary routes and does not overflow.
- Mobile menu opens as a grouped panel with large tap targets.
- Homepage first viewport clearly says `Manish Sharma Lab` and `AI for Laser Metal Deposition`.
- The three flagship assets are visually dominant directly after the hero.
- Exafuse actions are visually distinct and point to production Exafuse URLs.
- Tool outputs show preliminary recommendation, why, missing information, risk flags, suggested next step, and disclaimer.
- Tool copy buttons are visible.
- Cards do not overlap on mobile.
- Text does not overflow buttons, chips, nav items, cards, or tool controls.
- Focus states are visible for keyboard navigation.
- Motion is subtle and not required for understanding.

## Automated Status

- `npm.cmd run check`: passing after visual refactor.
- `npm.cmd run lint`: passing; script aliases to `astro check`.
- `npm.cmd run build`: passing; generated 41 static pages.
- Local preview HTTP checks returned `200` for:
  - `/`
  - `/tools/`
  - `/frameworks/`
  - `/for-ai-agents/`

## Manual Notes

Preview screenshots were not captured in this Windows shell because the available Playwright wrapper requires `bash`, no repo-local Playwright binary is installed, and no browser connector was exposed for screenshot capture. Run the local preview and check the pages above before pushing to production if visual screenshots are required.
