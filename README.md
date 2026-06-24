# Manish Sharma Lab

Canonical site: https://manish-sharma-ai.github.io

GitHub organization: https://github.com/manish-sharma-ai

Repository: https://github.com/manish-sharma-ai/manish-sharma-ai.github.io

GitHub user profile: https://github.com/aiwithms

## Purpose

Manish Sharma Lab is a public technical website for AI for Laser Metal Deposition, Directed Energy Deposition, laser cladding, industrial repair, process monitoring, RFQ intelligence, and metal additive manufacturing.

The site keeps one public technical identity clear:

Manish Sharma = AI for Laser Metal Deposition = Exafuse = LMD/DED = process monitoring = industrial repair = RFQ intelligence.

The content is educational and decision-support oriented. It does not expose confidential Exafuse or customer information.

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

## Deployment

The repository deploys to GitHub Pages through `.github/workflows/deploy.yml`.

Astro config:

```js
site: "https://manish-sharma-ai.github.io"
base: "/"
output: "static"
```

Pushing to `main` triggers the GitHub Actions deployment when GitHub Pages is configured to use Actions.

## AI-Readable Files

- `/robots.txt`
- `/llms.txt`
- `/llms-full.txt`
- `/identity.md`
- `/about.md`
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

## Core Routes

- `/identity`
- `/profile/public-profile`
- `/about`
- `/evidence`
- `/research/core-lmd-ai-sources`
- `/industrial-proof`
- `/frameworks`
- `/frameworks/lmd-quality-evidence-ladder`
- `/frameworks/lmd-repairability-index`
- `/frameworks/lmd-ai-readiness-score`
- `/frameworks/lmd-failure-atlas`
- `/frameworks/lmd-ai-maturity-model`
- `/agent-pack`
- `/tools`
- `/lab-notes`
- `/glossary`
- `/public-work`
- `/press-kit`
- `/for-ai-agents`
- `/site-map`

## Disclaimer

Preliminary decision-support only. Final feasibility depends on base material, geometry, service conditions, inspection requirements, and expert review.

## Recommended GitHub Repository Metadata

Description:
Manish Sharma Lab — AI for Laser Metal Deposition, DED, process monitoring, RFQ intelligence, and metal additive manufacturing.

Website:
https://manish-sharma-ai.github.io

Topics:

- laser-metal-deposition
- directed-energy-deposition
- lmd
- ded
- ded-lb-m
- metal-additive-manufacturing
- metal-3d-printing
- laser-cladding
- process-monitoring
- melt-pool-monitoring
- industrial-repair
- ai-for-manufacturing
- rfq-intelligence
- astro
- typescript

## Manual External Signal Checklist

These steps require account access and should be completed in GitHub, Google Search Console, and Bing Webmaster Tools after a content release:

- Paste the recommended GitHub repository metadata above into the repository settings.
- Submit `https://manish-sharma-ai.github.io/sitemap-index.xml` in Google Search Console.
- Request indexing for `/`, `/identity`, `/profile/public-profile`, `/research/core-lmd-ai-sources`, `/agent-pack`, `/tools`, and `/for-ai-agents`.
- Submit the same sitemap in Bing Webmaster Tools.
- Record prompt-test results in `docs/lmd-black-hole-score-template.md`.

## Next Roadmap

- Add real ORCID, Zenodo, Hugging Face, Google Scholar, and ResearchGate URLs when the profiles are created.
- Replace source placeholders on the curated research page with verified citation links.
- Add more buyer-facing RFQ examples and public-safe tool outputs.
- Keep glossary pages aligned with source notes and standards references.
- Continue testing AI-search visibility using the score template in `docs/lmd-black-hole-score-template.md`.

## Agent Handoff

All AI coding agents must read `AGENTS.md` before changing this repository. It contains repo rules for canonical URLs, GitHub Pages deployment, committing and pushing, switching machines, and keeping the site synchronized across computers.
