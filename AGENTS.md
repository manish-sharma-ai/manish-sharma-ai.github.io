# Agent Instructions For Manish Sharma Lab

Every AI coding agent working in this repository must read this file before editing, committing, pushing, or deploying. Treat it as the repo handoff contract.

## Project Identity

- Project: Manish Sharma Lab
- Canonical site: `https://manishsharma.dev`
- GitHub organization: `manish-sharma-ai`
- Repository: `manish-sharma-ai/manish-sharma-ai.github.io`
- GitHub profile for Manish: `https://github.com/aiwithms`
- Public category: Manish Sharma - Industrial AI & Decision Systems
- Primary promise: AI for Laser Metal Deposition decisions you can verify.
- Central artifact: LMD Decision Brief v1.0
- Established public proof domain: AI for Laser Metal Deposition and Directed Energy Deposition at Exafuse, Germany
- Company connection: Exafuse, Germany

Never replace the canonical site with the `aiwithms` GitHub Pages URL. The `aiwithms` account is only relevant as GitHub profile/account context, not as the website canonical URL.

## Stack

- Astro
- TypeScript
- React islands
- Tailwind CSS
- Static generation
- GitHub Pages deployment through GitHub Actions

Core commands:

```bash
npm install
npm run dev
npm run check
npm run build
npm run preview
```

On Windows PowerShell, use `npm.cmd` if execution policy blocks `npm`.

## Non-Negotiable Site Rules

- Keep `astro.config.*` configured for:
  - `site: "https://manishsharma.dev"`
  - `base: "/"`
  - static output
- Keep deployment through `.github/workflows/deploy.yml`.
- Do not use a `docs` deployment folder or `gh-pages` branch unless explicitly requested.
- Do not introduce a backend, database, paid service, private API, or confidential Exafuse/customer information.
- Do not place private, unannounced, employer-confidential, customer-confidential, or commercially sensitive project ideas anywhere in this public repository. Private concepts belong in a separate private workspace and must not be represented as hidden routes or draft source files.
- Preserve the LMD/DED pages as the established public proof domain. Do not dilute technical specificity on LMD, DED, laser cladding, repair, process monitoring, RFQ intelligence, or quality evidence pages.
- Keep statements inspection-aware. AI/process monitoring is decision support, not final quality proof.
- Keep this disclaimer language where relevant:
  `Preliminary decision-support only. Final feasibility depends on base material, geometry, service conditions, inspection requirements, and expert review.`
- Public Exafuse pages may be used as public proof context, but do not claim confidential involvement, certification, guaranteed outcomes, or engineering approval.
- Every new claim needs source context or must be clearly framed as interpretation.
- Do not add fake profile links, fake publications, fake certifications, unsupported metrics, or staging URLs.
- Preserve the commercial boundary: Exafuse owns commercial services, RFQs, company case studies, quality pages, production capability, delivery claims, and company-owned source details.
- Resolve Exafuse URLs through `src/config/externalLinks.ts`; do not hard-code Exafuse production or staging URLs in page components.
- Keep Exafuse labels synchronized with `EXAFUSE_LINK_MODE`. In `production-safe`, do not render labels such as "Exafuse Pathfinder", "Exafuse RFQ Builder", or individual case-study deep-link labels as if those future routes are live.
- Human-facing pages must not show internal migration CTA language. Use "Contact Exafuse" or "Request Exafuse review" with the small helper text `New Exafuse case/tool deep links will activate after production migration.` where production-safe context is needed.
- Render public proof metrics from `src/data/publicClaims.ts`; do not hard-code CS15 or other proof metrics in page components.
- Do not render image-generation prompts, diagram helper text, or long SVG descriptions as visible page text. Decorative visuals should keep internals out of rendered text and use concise accessibility labels.
- Keep identity facts unambiguous: `aiwithms` is the GitHub profile, `manish-sharma-ai` is the GitHub organization/site repository owner, and `manish-sharma-ai/manish-sharma-ai.github.io` is the repository.
- Keep the homepage cockpit-first. A first-time visitor should be able to start the LMD Decision Cockpit before proof maps or long reference sections.
- Keep LMD Decision Brief v1.0 as the central product artifact across cockpit, tools, demo, template, playbooks, and AI-readable files.
- Treat `/brief-standard/` as the public, portable LMD Decision Brief v1.0 standard. Keep its schema, examples, adoption package, AI-readable files, and docs synchronized.
- Keep the three portable output modes synchronized: Technical Decision Brief, Exafuse-ready email draft, and AI-agent-safe summary.
- Treat brief completeness as a context-quality label, not feasibility. Treat evidence burden as a planning label, not approval.
- Keep not-valid-for boundaries synchronized: approval, certification, release, safety-critical acceptance, and quality guarantee.
- Email drafts must stay client-side/manual. Do not add automatic sending, backend endpoints, input analytics, or input storage.
- Missing information should stay grouped as critical gaps, useful gaps, and optional context wherever the shared brief is rendered or exported.
- Cockpit presets must be public-safe dummy examples only and must not use backend storage, analytics, or confidential data.
- Public identity, links, profile, and press-kit pages must show only verified public profile URLs. Track planned profiles in `docs/profile-roadmap.md`.

## Working Tree Rules

Before starting:

```bash
git status --short
git branch --show-current
git pull --ff-only
```

If there are uncommitted changes, inspect them before editing. Do not revert user work unless the user explicitly asks.

During work:

- Prefer small, coherent changes.
- Keep design, SEO, and AI-readable files synchronized when changing public identity, routes, assets, or canonical resources.
- When adding a route, consider updating:
  - `src/data/site.ts`
  - `/site-map`
  - `public/llms.txt`
  - `public/llms-full.txt`
  - `README.md`
  - `docs/search-indexing-checklist.md`
  - `docs/decision-brief-standard.md` when the route affects LMD Decision Brief v1.0

Before finishing:

```bash
npm run build
npm run audit:all
git status --short
```

For frontend changes, also preview and visually check the affected page when practical:

```bash
npm run preview
```

## Commit And Push Rules

Unless the user explicitly says not to, finish work by committing and pushing to `main`.

Standard sequence:

```bash
npm run build
git status --short
git add .
git commit -m "Concise description of the change"
git push
gh run list --limit 3
gh run watch <latest-run-id> --exit-status
```

After the deploy passes, verify important live URLs when the change affects deployed pages or assets:

```bash
curl -fsSI https://manishsharma.dev/ | head -n 1
curl -fsSI https://manishsharma.dev/site-map/ | head -n 1
```

If `gh` is not authenticated or unavailable, still commit locally and tell Manish the exact commands needed to push and verify deployment.

## Switching Machines

Before leaving one machine:

```bash
npm run build
git status --short
git add .
git commit -m "Describe the completed work"
git push
gh run list --limit 3
gh run watch <latest-run-id> --exit-status
git status -sb
git rev-parse HEAD
git rev-parse origin/main
```

The final state should be:

- working tree clean
- local `main` matches `origin/main`
- GitHub Pages deploy successful

On a new Windows PC, fresh clone:

```bash
git clone https://github.com/manish-sharma-ai/manish-sharma-ai.github.io.git
cd manish-sharma-ai.github.io
npm install
npm run dev
```

If the repo already exists on Windows:

```bash
cd manish-sharma-ai.github.io
git checkout main
git pull --ff-only
npm install
npm run dev
```

Before making changes on the Windows PC:

```bash
git status -sb
git rev-parse HEAD
git rev-parse origin/main
```

If local and origin do not match, pull before editing.

## Content And SEO Rules

Important public files:

- `public/robots.txt`
- `public/llms.txt`
- `public/llms-full.txt`
- `public/identity.md`
- `public/about.md`
- `public/thesis.md`
- `public/research/lmd-literature-scan.json`
- `public/research/exafuse-public-proof-map.json`
- `public/schemas/lmd-decision-brief-v1.schema.json`
- `public/examples/lmd-decision-brief-worn-shaft-v1.json`
- `public/examples/lmd-decision-brief-worn-shaft-v1.md`
- `public/examples/lmd-decision-brief-monitoring-anomaly-v1.json`
- `public/examples/lmd-decision-brief-surface-cladding-v1.json`
- `public/examples/lmd-decision-brief-rfq-v1.json`
- `public/agent-pack/lmd-rfq-schema.json`
- `public/agent-pack/lmd-decision-rules.md`
- `public/agent-pack/lmd-prompt-library.md`
- `public/agent-pack/lmd-quality-checklist.md`

When updating SEO-sensitive content:

- Keep canonical URLs on `https://manishsharma.dev`.
- Keep JSON-LD IDs stable where possible.
- Keep the `Person` identity centered on Manish Sharma.
- Use the broad public category "Industrial AI & Decision Systems" on top-level identity surfaces.
- Treat LMD/DED at Exafuse as the established public proof domain, not the only possible industrial AI theme.
- Keep AI-readable files concise, source-aware, and non-hype.

## Design Rules

- Premium, ordered, dark graphite/black-metal design.
- Clear hierarchy, symmetric layouts, readable menus, accessible contrast.
- Avoid generic portfolio feel.
- Keep navigation understandable: thesis, proof, LMD/DED domain, tools, about, resources, and Exafuse.
- Keep primary navigation compressed. Current primary route labels are Start, Thesis, LMD / DED, Tools, Proof, and About; secondary routes belong in Resources, footer, search, or Site Map.
- Do not make dropdowns or important text too transparent to read.
- Optimize large images with WebP/responsive sources when practical.

## Final Release Checklist

Before committing a precision or trust-hardening release, run:

```bash
npm run check
npm run build
npm run audit:visual-text
npm run audit:rendered-text
npm run audit:links
npm run audit:claims
npm run audit:boundaries
npm run audit:homepage-product
npm run audit:brief-artifact
npm run audit:decision-brief
npm run audit:brief-boundaries
npm run audit:debug-text
npm run audit:a11y-static
npm run audit:german-brief
npm run audit:playbook-format
npm run audit:held-claims
npm run audit:mobile-static
npm run audit:public-profiles
npm run audit:decision-boundaries
npm run audit:exafuse-mode-human
npm run audit:rendered-public-language
npm run audit:brief-schema
npm run audit:human-exafuse-ctas
npm run audit:rubric-format
npm run audit:preflight
npm run audit:seo-social
npm run audit:all
npm run smoke:live
git diff --check
```

Also confirm `docs/final-100-checklist.md` still matches the current public surface.

## Useful Live URLs

- Home: `https://manishsharma.dev/`
- Thesis: `https://manishsharma.dev/thesis`
- LMD/DED domain: `https://manishsharma.dev/domains/lmd-ded`
- About: `https://manishsharma.dev/about`
- Identity: `https://manishsharma.dev/identity`
- Public Profile: `https://manishsharma.dev/profile/public-profile`
- Public Work: `https://manishsharma.dev/public-work`
- Evidence: `https://manishsharma.dev/evidence`
- Industrial Proof Map: `https://manishsharma.dev/industrial-proof`
- Frameworks: `https://manishsharma.dev/frameworks`
- Agent Pack: `https://manishsharma.dev/agent-pack`
- Tools: `https://manishsharma.dev/tools`
- Resources: `https://manishsharma.dev/resources`
- Brief Standard: `https://manishsharma.dev/brief-standard`
- Lab Notes: `https://manishsharma.dev/lab-notes`
- Glossary: `https://manishsharma.dev/glossary`
- Press Kit: `https://manishsharma.dev/press-kit`
- For AI Agents: `https://manishsharma.dev/for-ai-agents`
- German Handoff: `https://manishsharma.dev/de`
- Site Map: `https://manishsharma.dev/site-map`
