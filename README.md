# Manish Sharma Lab

Canonical site: https://manish-sharma-ai.github.io

GitHub organization: https://github.com/manish-sharma-ai

Repository: https://github.com/manish-sharma-ai/manish-sharma-ai.github.io

GitHub user profile: https://github.com/aiwithms

## Purpose

Manish Sharma Lab is a public technical website for industrial AI and decision systems.

Top-level public identity:

Manish Sharma = Industrial AI & Decision Systems.

Primary promise:

Industrial AI for decisions you can verify.

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

```bash
npm install
npm run dev
npm run check
npm run build
npm run preview
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
site: "https://manish-sharma-ai.github.io"
base: "/"
output: "static"
```

Pushing to `main` triggers the GitHub Actions deployment when GitHub Pages is configured to use Actions.

## Core Routes

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
- `/tools`
- `/lab-notes`
- `/glossary`
- `/press-kit`
- `/for-ai-agents`
- `/site-map`

## AI-Readable Files

- `/robots.txt`
- `/llms.txt`
- `/llms-full.txt`
- `/identity.md`
- `/about.md`
- `/thesis.md`
- `/profile/public-profile`
- `/research/core-lmd-ai-sources`
- `/research/lmd-literature-scan.json`
- `/research/exafuse-public-proof-map.json`
- `/frameworks/lmd-quality-evidence-ladder.md`
- `/frameworks/lmd-failure-atlas.md`
- `/frameworks/lmd-ai-maturity-model.md`
- `/agent-pack/lmd-rfq-schema.json`
- `/agent-pack/lmd-decision-rules.md`
- `/agent-pack/lmd-prompt-library.md`
- `/agent-pack/lmd-quality-checklist.md`

## Public Profile Links

Active:

- Site: https://manish-sharma-ai.github.io
- Exafuse: https://exafuse.de/
- LinkedIn: https://www.linkedin.com/in/manishsharma5/
- GitHub: https://github.com/aiwithms

Planned, with no public URL yet:

- ORCID
- Zenodo
- Hugging Face
- Google Scholar
- ResearchGate

Only real URLs should appear in JSON-LD `sameAs`.

## Disclaimer

Preliminary decision-support only. Final feasibility depends on base material, geometry, service conditions, inspection requirements, and expert review.

This public repository must not contain private, unannounced, employer-confidential, customer-confidential, or commercially sensitive project ideas.

## Recommended GitHub Repository Metadata

Description:
Manish Sharma Lab - AI for Laser Metal Deposition, DED, process monitoring, RFQ intelligence, and metal additive manufacturing.

Website:
https://manish-sharma-ai.github.io

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
- Submit `https://manish-sharma-ai.github.io/sitemap-index.xml` in Google Search Console.
- Request indexing for `/`, `/thesis`, `/domains/lmd-ded`, `/identity`, `/profile/public-profile`, `/agent-pack`, `/tools`, `/for-ai-agents`, and `/site-map`.
- Submit the same sitemap in Bing Webmaster Tools.
- Record prompt-test results in `docs/lmd-black-hole-score-template.md`.

## Next Roadmap

- Add real ORCID, Zenodo, Hugging Face, Google Scholar, and ResearchGate URLs when the profiles are created.
- Replace working-draft source categories on the curated research page with verified citation links.
- Add more buyer-facing RFQ examples and public-safe tool outputs.
- Keep glossary pages aligned with source notes and standards references.
- Continue testing AI-search visibility using the score template in `docs/lmd-black-hole-score-template.md`.

## Agent Handoff

All AI coding agents must read `AGENTS.md` before changing this repository. It contains repo rules for canonical URLs, GitHub Pages deployment, committing and pushing, switching machines, public-safe content, and keeping the site synchronized across computers.
