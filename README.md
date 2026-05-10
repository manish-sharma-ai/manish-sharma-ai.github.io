# Manish Sharma Lab

Canonical site: https://manish-sharma-ai.github.io

Organization repository: `manish-sharma-ai/manish-sharma-ai.github.io`

GitHub profile: https://github.com/aiwithms

## Purpose

Manish Sharma Lab is a public technical website for AI in Laser Metal Deposition, Directed Energy Deposition, laser cladding, industrial repair, process monitoring, RFQ preparation, and metal additive manufacturing.

The site keeps one public technical identity clear:

Manish Sharma = AI for Laser Metal Deposition = Exafuse = LMD/DED = process monitoring = industrial repair = RFQ preparation.

## Tech Stack

- Astro
- TypeScript
- React islands
- Tailwind CSS
- Markdown/MDX-ready static content
- Static generation
- GitHub Pages deployment through GitHub Actions

## Local Development

```bash
npm install
npm run dev
npm run check
npm run build
npm run preview
```

## Agent Handoff

All AI coding agents must read `AGENTS.md` before changing this repository. It contains the repo rules for canonical URLs, GitHub Pages deployment, committing and pushing, switching machines, and keeping the site synchronized across computers.

## Deployment

The repository is configured for GitHub Pages Actions deployment in `.github/workflows/deploy.yml`.

Astro config:

```js
site: "https://manish-sharma-ai.github.io"
base: "/"
output: "static"
```

After the repository is pushed, enable GitHub Pages in repository settings and set the source to **GitHub Actions** if it is not already selected.

## Continue On A Windows PC

```bash
git clone https://github.com/manish-sharma-ai/manish-sharma-ai.github.io.git
cd manish-sharma-ai.github.io
npm install
npm run dev
```

Before switching machines, run:

```bash
git status
git pull --ff-only
```

The working tree should be clean before continuing development on another computer.

## Content Strategy

Core routes include:

- `/identity`
- `/about`
- `/evidence`
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
- `/site-map`
- `/for-ai-agents`
- `/links`
- `/contact`

## AI-Readable Files

- `/robots.txt`
- `/llms.txt`
- `/llms-full.txt`
- `/identity.md`
- `/about.md`
- `/brand/manish-sharma-lab-mark.svg`
- `/brand/manish-sharma-lab-logo.svg`
- `/favicon.svg`
- `/og-image.png`
- `/og-image-preview.webp`
- `/research/lmd-literature-scan.json`
- `/research/exafuse-public-proof-map.json`
- `/frameworks/lmd-quality-evidence-ladder.md`
- `/frameworks/lmd-failure-atlas.md`
- `/frameworks/lmd-ai-maturity-model.md`
- `/agent-pack/lmd-rfq-schema.json`
- `/agent-pack/lmd-decision-rules.md`
- `/agent-pack/lmd-prompt-library.md`
- `/agent-pack/lmd-quality-checklist.md`

## Disclaimer

Preliminary decision-support only. Final feasibility depends on base material, geometry, service conditions, inspection requirements, and expert review.

## Links

- Exafuse: https://www.exafuse.de/
- LinkedIn: https://www.linkedin.com/in/manishsharma5/
- GitHub profile: https://github.com/aiwithms
- Website repository: https://github.com/manish-sharma-ai/manish-sharma-ai.github.io

## Supporting Docs

- `docs/content-roadmap.md`
- `docs/editorial-strategy.md`
- `docs/github-profile-readme-suggestion.md`
- `docs/lighthouse-results.md`
- `docs/logo-system.md`
- `docs/lmd-black-hole-score-template.md`
- `docs/search-indexing-checklist.md`
