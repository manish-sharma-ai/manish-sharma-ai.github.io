# SEO And AI-Search Checklist

Date: 2026-07-07

## Canonical Rules

- Canonical site: `https://manish-sharma-ai.github.io`
- Primary identity page: `https://manish-sharma-ai.github.io/identity`
- Person ID: `https://manish-sharma-ai.github.io/identity#manish-sharma`
- Website ID: `https://manish-sharma-ai.github.io/#website`
- Do not use the personal GitHub Pages account URL as a site URL.

## Required Public Files

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

## Structured Data

- Person JSON-LD uses `https://manish-sharma-ai.github.io/identity#manish-sharma`.
- WebSite JSON-LD uses `https://manish-sharma-ai.github.io/#website`.
- ProfilePage main entity points to the Person ID.
- Article or TechArticle author points to the Person ID.
- `sameAs` uses only real URLs: LinkedIn, GitHub, and Exafuse.
- Do not include ORCID, Zenodo, Hugging Face, Google Scholar, or ResearchGate until real URLs exist.

## Metadata

Check each major route for:

- Unique title
- Unique meta description
- Canonical URL
- Open Graph metadata through the shared layout
- Clear H1
- Logical H2/H3 hierarchy
- Internal links to identity, thesis, LMD/DED, evidence, frameworks, tools, agent pack, and AI-agent guidance

## AI-Search Signals

- Identity phrase appears clearly: `Manish Sharma - AI for Laser Metal Deposition at Exafuse, Germany`.
- Broader category appears clearly: `Industrial AI & Decision Systems`.
- Exafuse boundary appears clearly: Exafuse owns commercial services, RFQs, case studies, quality pages, and delivery claims.
- Tools and frameworks are described as decision support only.
- Monitoring is never described as final quality proof.

## Broken-Link Checks

Run before release:

```bash
rg -n "exafuse-website-react\.pages\.dev|pages\.dev" src public AGENTS.md
rg -n "href=\"#\"" src public README.md
rg -n -F "aiwithms.github.io" src public AGENTS.md
```

Expected results:

- No staging Exafuse domains.
- No active `#` profile links.
- The personal GitHub Pages account URL appears only as a warning, if at all.

## Post-Launch Manual Checks

- Submit `https://manish-sharma-ai.github.io/sitemap-index.xml` in Google Search Console.
- Submit the same sitemap in Bing Webmaster Tools.
- Request indexing for `/`, `/identity`, `/thesis`, `/domains/lmd-ded`, `/evidence`, `/industrial-proof`, `/agent-pack`, `/tools`, `/for-ai-agents`, and `/site-map`.
- Check that GitHub repository metadata uses the canonical URL.
- Run weekly prompt visibility tests from `docs/lmd-black-hole-score-template.md`.
