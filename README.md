# Manish Sharma Lab

Canonical site: https://manishsharma.dev

GitHub organization: https://github.com/manish-sharma-ai

Repository: https://github.com/manish-sharma-ai/manish-sharma-ai.github.io

GitHub user profile: https://github.com/aiwithms

## Purpose

Manish Sharma Lab is a public technical website for industrial AI and decision systems.

Top-level public identity:

Manish Sharma = Industrial AI & Decision Systems.

Primary promise:

AI for Laser Metal Deposition decisions you can verify.

Central artifact:

LMD Decision Brief v1.0.

Established public proof domain:

AI, monitoring, RFQ intelligence, and decision-support resources for Laser Metal Deposition, Directed Energy Deposition, laser cladding, industrial repair, and metal additive manufacturing at Exafuse in Germany.

The site is educational and decision-support oriented. It does not expose confidential Exafuse, customer, employer, or private project information.

## Identity Hierarchy

- Broad category: Industrial AI & Decision Systems
- Public thesis: Sense -> Model -> Decide -> Verify
- Established proof: AI for LMD/DED at Exafuse
- Boundary: preliminary decision-support only, not final engineering approval

## Tech Stack

- Astro
- TypeScript
- React islands
- Tailwind CSS
- Static site generation
- GitHub Pages deployment through GitHub Actions

## Local Development

Prerequisite: Node.js 22.12 or newer.

```bash
npm install
npm run dev
npm run check
npm run build
npm run preview
npm run quality
```

On Windows PowerShell, use `npm.cmd` if script execution policy blocks `npm`:

```bash
npm.cmd run check
npm.cmd run build
```

## Deployment

The repository deploys to GitHub Pages through `.github/workflows/deploy.yml`.

Astro config:

```js
site: "https://manishsharma.dev"
base: "/"
output: "static"
```

Pushing to `main` triggers the GitHub Actions deployment when GitHub Pages is configured to use Actions.

## Current Route Structure

Primary navigation:

- Start: `/`
- Thesis: `/thesis`
- LMD / DED: `/domains/lmd-ded`
- Tools: `/tools`
- Proof: `/public-work`
- About: `/about`

Resources remain available through the Resources menu, footer, command search, and Site Map.

Core routes:

- `/`
- `/thesis`
- `/domains/lmd-ded`
- `/identity`
- `/profile/public-profile`
- `/about`
- `/public-work`
- `/evidence`
- `/research/core-lmd-ai-sources`
- `/industrial-proof`
- `/frameworks`
- `/agent-pack`
- `/resources`
- `/tools`
- `/decision-map`
- `/playbooks`
- `/claims`
- `/no-hype`
- `/brief-standard`
- `/brief-template`
- `/demo`
- `/de`
- `/lab-notes`
- `/glossary`
- `/press-kit`
- `/for-ai-agents`
- `/trust`
- `/review`
- `/site-map`

Discovery and trust files:

- `/rss.xml`
- `/trust.md`
- `/trust`
- `/.well-known/security.txt`
- `/humans.txt`

## External URL Policy

External public URLs are resolved through `src/config/externalLinks.ts`, surfaced through `src/data/externalUrls.ts`, and consumed through `src/data/siteConfig.ts`, `src/data/profiles.ts`, and `src/data/site.ts`.

Canonical URL rules:

- Site: `https://manishsharma.dev`
- Exafuse base: `https://exafuse.de`
- GitHub profile: `https://github.com/aiwithms`
- GitHub repository: `https://github.com/manish-sharma-ai/manish-sharma-ai.github.io`
- LinkedIn: `https://www.linkedin.com/in/manishsharma5/`

Do not add staging URLs, `www.exafuse.de` variants, fake profile URLs, or `href="#"` placeholders to production-facing content.

Exafuse launch mode:

- `EXAFUSE_LINK_MODE = "production-safe"` keeps migration-sensitive Exafuse deep links on safe production routes.
- `EXAFUSE_LINK_MODE = "post-migration"` should be used only after the production Exafuse paths are verified.
- Follow `docs/exafuse-migration-switch.md` before changing link mode.
- Human-facing labels must also follow link mode. In `production-safe`, do not show internal migration CTA language such as "Case source after migration", "RFQ path after migration", "Pathfinder after migration", "Builder after migration", or "Source activates after Exafuse production migration". Use "Contact Exafuse" or "Request Exafuse review" with the small helper text: `New Exafuse case/tool deep links will activate after production migration.`

Public proof metrics are centralized in `src/data/publicClaims.ts`. Do not hard-code CS15 bridge metrics or other proof numbers in page components.

Visual text rule:

- Decorative SVG/diagram internals should not leak prompt-like text into rendered page output.
- Use concise wrapper labels or alt text for accessibility.
- Do not render image-generation prompts, diagram descriptions, or helper strings as page text.

Identity alias rule:

- GitHub profile: `https://github.com/aiwithms`
- Site/repository owner: `https://github.com/manish-sharma-ai`
- Repository: `https://github.com/manish-sharma-ai/manish-sharma-ai.github.io`
- Do not blur the personal GitHub profile with the GitHub organization/repository owner.

Recommended audits:

```bash
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
npm run audit:experience
npm run audit:all
npm run audit:security
npm test
npm run audit:links:report
npm run smoke:live
```

## AI-Readable Files

- `/robots.txt`
- `/llms.txt`
- `/llms-full.txt`
- `/identity.md`
- `/trust.md`
- `/about.md`
- `/profile/public-profile.md`
- `/thesis.md`
- `/profile/public-profile`
- `/playbooks`
- `/claims`
- `/no-hype`
- `/brief-standard`
- `/brief-template`
- `/demo`
- `/schemas/lmd-decision-brief-v1.schema.json`
- `/examples/lmd-decision-brief-worn-shaft-v1.json`
- `/examples/lmd-decision-brief-worn-shaft-v1.md`
- `/examples/lmd-decision-brief-monitoring-anomaly-v1.json`
- `/examples/lmd-decision-brief-surface-cladding-v1.json`
- `/examples/lmd-decision-brief-rfq-v1.json`
- `/research/core-lmd-ai-sources`
- `/resources`
- `/decision-map`
- `/decision-map/lmd-decision-map-v1.md`
- `/research/lmd-literature-scan.json`
- `/research/exafuse-public-proof-map.json`
- `/frameworks/lmd-quality-evidence-ladder.md`
- `/frameworks/lmd-failure-atlas.md`
- `/frameworks/lmd-ai-maturity-model.md`
- `/agent-pack/lmd-rfq-schema.json`
- `/agent-pack/lmd-decision-rules.md`
- `/agent-pack/lmd-prompt-library.md`
- `/agent-pack/lmd-quality-checklist.md`
- `/de`

## LMD Decision Brief v1.0

The central artifact of the site is `LMD Decision Brief v1.0`.

It appears across the cockpit, tools, public standard, demo, template, playbooks, schema, and examples. It separates situation, component, goal, material, geometry/size, damage/build area, available data, known facts (including optional request role/phase context), grouped missing information, risk flags, evidence needed, preliminary route, review readiness, brief completeness, expert-review package status, evidence burden, next action, Exafuse review route, boundary statement, generated-from note, no-backend note, and no-automatic-sending note.

Public standard and machine-readable files:

- `/brief-standard`
- `/brief-standard#adoption`
- `/schemas/lmd-decision-brief-v1.schema.json`
- `/examples/lmd-decision-brief-worn-shaft-v1.json`
- `/examples/lmd-decision-brief-worn-shaft-v1.md`
- `/examples/lmd-decision-brief-monitoring-anomaly-v1.json`
- `/examples/lmd-decision-brief-surface-cladding-v1.json`
- `/examples/lmd-decision-brief-rfq-v1.json`

Portable output modes:

- Technical Decision Brief
- Exafuse-ready email draft
- AI-agent-safe summary
- Missing-information checklist grouped as critical/useful/optional
- Evidence-needed checklist with evidence burden
- Markdown download
- JSON download
- Print / save as PDF

Artifact boundaries:

- Confidence is not approval.
- Brief completeness is not feasibility.
- Evidence burden is a planning label, not release approval.
- Not-valid-for boundaries include approval, certification, release, safety-critical acceptance, and quality guarantee.
- Email drafts are manual drafts only; the site does not automatically send email.
- The cockpit/workbench are frontend-only: no backend endpoints, no input storage, and no analytics around user-entered technical content.

Public-safe cockpit presets:

- `/tools/#preset=worn-shaft`
- `/tools/#preset=monitoring-anomaly`
- `/tools/#preset=surface-cladding`
- `/tools/#preset=lmd-vs-slm`
- `/tools/#preset=rfq`

Implementation and maintenance rules live in `docs/decision-brief-standard.md`.

Artifact lifecycle and future-preset rules live in `docs/artifact-lifecycle.md`.

## Laser Metal Deposition Decision Map

`/decision-map` is a browser-local route map for repair, cladding, large-part additive manufacturing, SLM/LPBF alternatives, machining, welding, replacement, and expert-review paths.

Public source files:

- `/decision-map/lmd-decision-map-v1.md`

The map is preliminary decision-support only. It should preserve missing information, risk flags, evidence needs, and expert-review routing instead of presenting route screening as feasibility approval.

## Public Profile Links

Active:

- Site: https://manishsharma.dev
- Exafuse: https://exafuse.de/
- LinkedIn: https://www.linkedin.com/in/manishsharma5/
- GitHub profile: https://github.com/aiwithms
- GitHub organization / repository owner: https://github.com/manish-sharma-ai
- Website repository: https://github.com/manish-sharma-ai/manish-sharma-ai.github.io

Only real URLs should appear in JSON-LD `sameAs`.

## Disclaimer

Preliminary decision-support only. Final feasibility depends on base material, geometry, service conditions, inspection requirements, and expert review.

This public repository must not contain private, unannounced, employer-confidential, customer-confidential, or commercially sensitive project ideas.

For services, RFQs, company case studies, quality pages, production capability, and delivery claims, use Exafuse. Manish Sharma Lab is the personal public layer for frameworks, tools, notes, source maps, and AI-readable guidance.

## Recommended GitHub Repository Metadata

Description:
Manish Sharma Lab - AI for Laser Metal Deposition, DED, process monitoring, RFQ intelligence, and metal additive manufacturing.

Website:
https://manishsharma.dev

Topics:

- industrial-ai
- decision-systems
- ai-for-manufacturing
- process-monitoring
- machine-vision
- robotics
- engineering-evidence
- laser-metal-deposition
- directed-energy-deposition
- lmd
- ded
- ded-lb-m
- metal-additive-manufacturing
- metal-3d-printing
- laser-cladding
- melt-pool-monitoring
- industrial-repair
- rfq-intelligence
- astro
- typescript

## Manual External Signal Checklist

These steps require account access and can be completed in GitHub, Google Search Console, and Bing Webmaster Tools after a content release:

- Paste the recommended GitHub repository metadata above into the repository settings.
- Submit `https://manishsharma.dev/sitemap-index.xml` in Google Search Console.
- Request indexing for `/`, `/thesis`, `/domains/lmd-ded`, `/identity`, `/profile/public-profile`, `/agent-pack`, `/resources`, `/tools`, `/decision-map`, `/playbooks`, `/claims`, `/no-hype`, `/trust`, `/brief-standard`, `/brief-template`, `/demo`, `/de`, `/for-ai-agents`, and `/site-map`.
- Submit the same sitemap in Bing Webmaster Tools.
- Record prompt-test results in `docs/lmd-black-hole-score-template.md`.
- Run the `docs/site-score.md` prompt-test checklist after major positioning or navigation changes.
- Run `docs/ai-answer-tests.md` after major AI-readable or schema changes.
- Run `docs/final-100-checklist.md` before a precision release.

## Next Roadmap

- Add real ORCID, Zenodo, Hugging Face, Google Scholar, and ResearchGate URLs only after they are created and verified. Track future profile work in `docs/profile-roadmap.md`.
- Switch Exafuse link mode only after following `docs/exafuse-migration-switch.md`.
- Run `npm run smoke:live` after deployment before distribution.
- Keep the curated research map limited to verified sources with explicit source types and evidence boundaries.
- Add more buyer-facing RFQ examples and public-safe tool outputs.
- Keep glossary pages aligned with source notes and standards references.
- Continue testing AI-search visibility using the score template in `docs/lmd-black-hole-score-template.md`.

## Agent Handoff

All AI coding agents must read `AGENTS.md` before changing this repository. It contains repo rules for canonical URLs, GitHub Pages deployment, committing and pushing, switching machines, public-safe content, and keeping the site synchronized across computers.
