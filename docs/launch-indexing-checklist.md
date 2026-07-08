# Launch Indexing Checklist

Use this after deploying a meaningful release.

## Verify Deployment

```bash
npm run check
npm run build
npm run audit:all
git diff --check
```

After pushing, confirm the GitHub Actions deployment passes and verify:

- `https://manish-sharma-ai.github.io/`
- `https://manish-sharma-ai.github.io/site-map/`
- `https://manish-sharma-ai.github.io/brief-standard/`
- `https://manish-sharma-ai.github.io/decision-map/`
- `https://manish-sharma-ai.github.io/schemas/lmd-decision-brief-v1.schema.json`
- `https://manish-sharma-ai.github.io/llms.txt`
- `https://manish-sharma-ai.github.io/llms-full.txt`

Then run:

```bash
npm run smoke:live
```

## Submit Sitemaps

Submit this sitemap in Google Search Console and Bing Webmaster Tools:

```text
https://manish-sharma-ai.github.io/sitemap-index.xml
```

## Request Indexing

Prioritize:

- `https://manish-sharma-ai.github.io/`
- `https://manish-sharma-ai.github.io/identity`
- `https://manish-sharma-ai.github.io/domains/lmd-ded`
- `https://manish-sharma-ai.github.io/tools`
- `https://manish-sharma-ai.github.io/decision-map`
- `https://manish-sharma-ai.github.io/brief-standard`
- `https://manish-sharma-ai.github.io/brief-template`
- `https://manish-sharma-ai.github.io/demo`
- `https://manish-sharma-ai.github.io/claims`
- `https://manish-sharma-ai.github.io/no-hype`
- `https://manish-sharma-ai.github.io/resources`
- `https://manish-sharma-ai.github.io/for-ai-agents`
- `https://manish-sharma-ai.github.io/research/core-lmd-ai-sources`
- `https://manish-sharma-ai.github.io/site-map`

## AI-Readable Files

Check:

- `https://manish-sharma-ai.github.io/llms.txt`
- `https://manish-sharma-ai.github.io/llms-full.txt`
- `https://manish-sharma-ai.github.io/identity.md`
- `https://manish-sharma-ai.github.io/profile/public-profile.md`
- `https://manish-sharma-ai.github.io/decision-map/lmd-decision-map-v1.md`
- `https://manish-sharma-ai.github.io/decision-map/lmd-decision-map-v1.svg`
- `https://manish-sharma-ai.github.io/research/exafuse-public-proof-map.json`
- `https://manish-sharma-ai.github.io/schemas/lmd-decision-brief-v1.schema.json`
- `https://manish-sharma-ai.github.io/examples/lmd-decision-brief-worn-shaft-v1.json`

## Manual Signals

- Update GitHub repository description, website, and topics if they changed.
- Run prompt visibility tests from `docs/lmd-black-hole-score-template.md`.
- Record any AI answer drift and update `llms.txt`, `llms-full.txt`, or page copy only if the public source itself needs clarification.
- Use `docs/launch-distribution-pack.md` for ready-to-copy launch posts, expert-review email text, and the "what not to claim" list.
