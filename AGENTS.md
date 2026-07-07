# Agent Instructions For Manish Sharma Lab

Every AI coding agent working in this repository must read this file before editing, committing, pushing, or deploying. Treat it as the repo handoff contract.

## Project Identity

- Project: Manish Sharma Lab
- Canonical site: `https://manish-sharma-ai.github.io`
- GitHub organization: `manish-sharma-ai`
- Repository: `manish-sharma-ai/manish-sharma-ai.github.io`
- GitHub profile for Manish: `https://github.com/aiwithms`
- Public category: Manish Sharma - Industrial AI & Decision Systems
- Primary promise: AI for Laser Metal Deposition decisions you can verify.
- Established public proof domain: AI for Laser Metal Deposition and Directed Energy Deposition at Exafuse, Germany
- Company connection: Exafuse, Germany

Never replace the canonical site with `https://aiwithms.github.io`. That URL is only relevant as a GitHub profile/account context, not as the website canonical URL.

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
  - `site: "https://manish-sharma-ai.github.io"`
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
- Render public proof metrics from `src/data/publicClaims.ts`; do not hard-code CS15 or other proof metrics in page components.

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
curl -fsSI https://manish-sharma-ai.github.io/ | head -n 1
curl -fsSI https://manish-sharma-ai.github.io/site-map/ | head -n 1
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
- `public/agent-pack/lmd-rfq-schema.json`
- `public/agent-pack/lmd-decision-rules.md`
- `public/agent-pack/lmd-prompt-library.md`
- `public/agent-pack/lmd-quality-checklist.md`

When updating SEO-sensitive content:

- Keep canonical URLs on `https://manish-sharma-ai.github.io`.
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

## Useful Live URLs

- Home: `https://manish-sharma-ai.github.io/`
- Thesis: `https://manish-sharma-ai.github.io/thesis`
- LMD/DED domain: `https://manish-sharma-ai.github.io/domains/lmd-ded`
- About: `https://manish-sharma-ai.github.io/about`
- Identity: `https://manish-sharma-ai.github.io/identity`
- Public Profile: `https://manish-sharma-ai.github.io/profile/public-profile`
- Public Work: `https://manish-sharma-ai.github.io/public-work`
- Evidence: `https://manish-sharma-ai.github.io/evidence`
- Industrial Proof Map: `https://manish-sharma-ai.github.io/industrial-proof`
- Frameworks: `https://manish-sharma-ai.github.io/frameworks`
- Agent Pack: `https://manish-sharma-ai.github.io/agent-pack`
- Tools: `https://manish-sharma-ai.github.io/tools`
- Lab Notes: `https://manish-sharma-ai.github.io/lab-notes`
- Glossary: `https://manish-sharma-ai.github.io/glossary`
- Press Kit: `https://manish-sharma-ai.github.io/press-kit`
- For AI Agents: `https://manish-sharma-ai.github.io/for-ai-agents`
- Site Map: `https://manish-sharma-ai.github.io/site-map`
