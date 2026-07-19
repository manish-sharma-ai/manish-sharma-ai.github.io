# Design System

Date: 2026-07-19

## Direction

Manish Sharma should feel like a premium personal platform for industrial AI and decision systems: dark, ordered, evidence-aware, personal where authorship matters, and technical where a tool or source system requires it. It should not feel like a generic portfolio, a service-agency landing page, a plain documentation wiki, or a single-purpose LMD portal.

The public split stays clear:

- Manish Sharma is the primary person and site entity. Manish Sharma Lab is the technical publishing layer for frameworks, source maps, public tools, lab notes, glossary pages, and AI-agent guidance.
- Exafuse owns commercial services, RFQs, company case studies, quality pages, production capability, and delivery claims.
- AI/process-monitoring outputs are preliminary decision support, not engineering approval.

## CSS Files

The strict visual system is split into:

- `src/styles/design-tokens.css`: colors, spacing, radii, shadows, typography tokens, motion timing.
- `src/styles/layout.css`: containers, responsive grids, section rhythm, bento grid, hero grids, bands.
- `src/styles/components.css`: cards, buttons, chips, header, footer, command palette, tool panels, cockpit visual, hover/focus states.
- `src/styles/global.css`: imports the system files and Tailwind layers.

## Core Tokens

| Token | Purpose | Value |
| --- | --- | --- |
| `--page-max` | Main content width | `1240px` |
| `--section-gap` | Section vertical rhythm | `96px` desktop, smaller on tablet/mobile |
| `--card-radius` | Premium cockpit cards | `24px` desktop, `18px` mobile |
| `--bg` | Page canvas | `#050608` |
| `--surface` | Standard panel surface | `rgba(13, 18, 24, 0.72)` |
| `--line` | Subtle technical border | `rgba(156, 201, 217, 0.15)` |
| `--accent` | Primary technical accent | `#33d6ff` |
| `--amber` | Caution/evidence accent | `#ffb547` |
| `--laser` | Exafuse/action accent | `#ff5c38` |

## Layout Rules

- Use `.site-shell` or `PageContainer.astro` for max-width alignment.
- Use `.section-y` or `Section.astro` for vertical rhythm.
- Use `.band` for full-width separators, not decorative floating page sections.
- Use `.bento-grid`, `BentoGrid.astro`, and `BentoCard.astro` for resource clusters.
- Use `.inner-hero-grid` and `.home-hero-grid` for hero pages with a cockpit visual panel.
- Mobile must stack cleanly without horizontal overflow.

## Editorial and instrument modes

The route-aware class on `Layout.astro` formalizes two deliberate roles without
changing body or control typography:

- `.page-mode--editorial`: Home, About, Thesis, Contact, Identity, and Lab Notes. Warm mineral text and restrained copper/amber support authorship and reading.
- `.page-mode--instrument`: Tools, Frameworks, Evidence, Research, Resources, Glossary, and other technical/reference routes. Cyan is reserved for active technical signals, controls, and source navigation.

The shared header and footer remain neutral graphite bridges. The homepage
melt-pool photograph is homepage-specific and must not become a generic page
background.

## Components

Shared visual components:

- `SiteShell.astro`
- `Header.astro`
- `Footer.astro`
- `MobileMenu.astro`
- `PageContainer.astro`
- `Section.astro`
- `SectionHeading.astro`
- `BentoGrid.astro`
- `BentoCard.astro`
- `LinkCard.astro`
- `CTAButton.astro`
- `Chip.astro`
- `VisualPanel.astro`
- `EvidenceRail.astro`
- `SourceLinks.astro`

## Navigation

Desktop header has three zones:

- Brand: `Manish Sharma`, with `Lab / Industrial AI & decisions` as the publishing descriptor.
- Primary nav, five visible links: Home, Work, Method, Notes, About.
- Actions: Reference, Search, Contact.

Specialist work and machine/reference pages live under `Reference`, the footer,
search, or Site Map. The public-profile route remains available as a reference
surface but is not promoted in the human header or footer. Mobile uses the same
grouped hierarchy with large tap targets.

## Cards And Buttons

- `.ordered-card`: standard surface.
- `.ordered-card-strong`: emphasized evidence/hero/primary panels.
- `.bento-card`: linked resource cards.
- `.link-card`: source and profile links, including disabled planned states.
- `.btn-primary`: main site action.
- `.btn-secondary`: internal supporting action.
- `.btn-laser`: Exafuse/commercial boundary action.

Avoid nested decorative cards. Use nested result cards only inside tools where the surface represents distinct output fields.

## Tool Panels

Tool islands should use:

- `.tool-panel`
- `.tool-input-grid`
- `.tool-field`
- `.result-card`
- `.result-card--warning`

Every tool output should show:

- Preliminary recommendation
- Why
- Missing information
- Risk flags
- Suggested next step
- Disclaimer

## Accessibility

- Preserve skip link and visible `:focus-visible` states.
- Keep touch targets near or above 44px.
- Do not hide important information behind hover-only states.
- Use amber/orange surfaces for warnings and limitations only.
- Motion is subtle and respects `prefers-reduced-motion`.

## Content Guardrails

Use wording such as:

- inspection-aware
- preliminary decision support
- public proof domain
- evidence path
- expert review
- verification

Avoid wording that implies:

- final engineering approval
- guaranteed repair feasibility
- final quality proof
- material certification
- confidential employer/customer proof
