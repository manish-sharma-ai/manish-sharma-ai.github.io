# Design System

Date: 2026-07-07

## Direction

Manish Sharma Lab should feel like an industrial AI lab and verification cockpit: dark, ordered, technical, premium, and useful. It should not look like a generic portfolio, a plain documentation wiki, a crypto dashboard, or a flashy AI landing page.

The design should make the public strategy clear:

- Manish Sharma Lab owns the personal expert layer: identity, thesis, frameworks, source maps, tools, lab notes, glossary, and AI-agent guidance.
- Exafuse owns commercial services, RFQs, company case studies, quality pages, production capability, and delivery claims.
- AI and monitoring content is decision support only, not engineering approval.

## Tokens

Core CSS variables live in `src/styles/global.css`.

| Token | Purpose | Current value |
| --- | --- | --- |
| `--bg` | Page canvas | `#050608` |
| `--panel` | Standard glass/card surface | `rgba(13, 18, 24, 0.78)` |
| `--panel-strong` | Strong card surface | `rgba(18, 24, 32, 0.88)` |
| `--line` | Subtle card and grid border | `rgba(156, 201, 217, 0.16)` |
| `--line-strong` | Emphasized border | `rgba(156, 201, 217, 0.26)` |
| `--text` | Primary text | `#edf7fb` |
| `--muted` | Secondary text | `#9bb0bd` |
| `--cyan` | Primary technical accent | `#33d6ff` |
| `--blue` | Secondary technical accent | `#2f80ff` |
| `--laser` | Laser/action accent | `#ff4d2e` |
| `--amber` | Caution/evidence accent | `#ffb547` |

## Typography

- Use the existing system sans stack for body and headings.
- Use the existing mono stack for metric labels, route labels, schema blocks, and short machine-readable identifiers.
- Keep body copy at 16px or larger.
- Do not use negative letter spacing.
- Reserve very large type for true page heroes. Cards, panels, and utility surfaces should use tighter headings.

## Layout

- Use `.site-shell` as the main max-width container.
- Use `.section-y` for vertical rhythm.
- Use `.band` for full-width section separation.
- Keep desktop layouts aligned to clear grids, usually two columns or responsive bento grids.
- Mobile should stack without horizontal overflow and with comfortable tap targets.

## Cards

Primary classes:

- `.ordered-card`: standard surface for cards, link cards, small panels, and tool output sections.
- `.ordered-card-strong`: stronger surface for hero support panels, important source blocks, and primary framework cards.
- `.card-hover`: interactive lift and focus treatment for linked cards.
- `.disabled-card`: planned profile or unavailable resource state.

Rules:

- Use cards for repeated items, tool panels, link cards, and structured evidence blocks.
- Do not nest decorative cards inside other cards.
- Keep card radii at `0.5rem`.
- Use consistent padding: `p-4`, `p-5`, or `p-6` depending on density.

## Navigation

Primary desktop navigation:

- Thesis
- Work & Proof
- LMD / DED
- Frameworks
- Tools
- Writing
- About

Utility actions:

- Search
- Exafuse
- Contact / Links

Mobile navigation should keep grouped sections from `NAV_GROUPS` and avoid wrapping dense inline lists.

## Reusable Components

Core components:

- `Header.astro`
- `Footer.astro`
- `Layout.astro`
- `SectionHeading.astro`
- `PageHeroVisual.astro`
- `EvidenceRail.astro`
- `SourceLinks.astro`
- `RelatedLinks.astro`
- `CommandPalette.astro`
- `FrameworkCard.astro`
- `LabNoteFooter.astro`

Use `EvidenceRail.astro` when a page needs to explain the operating method:

1. Sense
2. Model
3. Decide
4. Verify

Use `SourceLinks.astro` instead of raw inline link walls.

## Motion

- Motion should be subtle: hover lift, signal-line drift, card state, and command-palette transitions.
- Avoid constant or distracting animation.
- `prefers-reduced-motion` is handled globally by simplifying transitions and animations.

## Accessibility

- Keep visible focus states through `:focus-visible`.
- Preserve the skip link.
- Search, nav, links, buttons, and tool controls must remain keyboard reachable.
- Do not hide critical information behind hover-only states.
- Use caution/orange surfaces only for warnings, boundaries, or limitations.

## Content Rules

Use:

- Inspection-aware
- Decision support
- Public proof
- Evidence path
- Human review
- Expert review
- Verification

Avoid:

- Final engineering approval
- Guaranteed repair feasibility
- Final quality proof
- Certification claims
- Confidential employer/customer claims
- Unsupported job titles, awards, degrees, publications, or project roles

