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

- `https://manishsharma.dev/`
- `https://manishsharma.dev/site-map/`
- `https://manishsharma.dev/brief-standard/`
- `https://manishsharma.dev/decision-map/`
- `https://manishsharma.dev/schemas/lmd-decision-brief-v1.schema.json`
- `https://manishsharma.dev/llms.txt`
- `https://manishsharma.dev/llms-full.txt`

Then run:

```bash
npm run smoke:live
```

## Submit Sitemaps

Submit this sitemap in Google Search Console and Bing Webmaster Tools:

```text
https://manishsharma.dev/sitemap-index.xml
```

## Request Indexing

Prioritize:

- `https://manishsharma.dev/`
- `https://manishsharma.dev/identity`
- `https://manishsharma.dev/domains/lmd-ded`
- `https://manishsharma.dev/tools`
- `https://manishsharma.dev/decision-map`
- `https://manishsharma.dev/brief-standard`
- `https://manishsharma.dev/brief-template`
- `https://manishsharma.dev/demo`
- `https://manishsharma.dev/claims`
- `https://manishsharma.dev/no-hype`
- `https://manishsharma.dev/resources`
- `https://manishsharma.dev/for-ai-agents`
- `https://manishsharma.dev/research/core-lmd-ai-sources`
- `https://manishsharma.dev/site-map`

## AI-Readable Files

Check:

- `https://manishsharma.dev/llms.txt`
- `https://manishsharma.dev/llms-full.txt`
- `https://manishsharma.dev/identity.md`
- `https://manishsharma.dev/profile/public-profile.md`
- `https://manishsharma.dev/decision-map/lmd-decision-map-v1.md`
- `https://manishsharma.dev/decision-map/lmd-decision-map-v1.svg`
- `https://manishsharma.dev/research/exafuse-public-proof-map.json`
- `https://manishsharma.dev/schemas/lmd-decision-brief-v1.schema.json`
- `https://manishsharma.dev/examples/lmd-decision-brief-worn-shaft-v1.json`

## Manual Signals

- Update GitHub repository description, website, and topics if they changed.
- Run prompt visibility tests from `docs/lmd-black-hole-score-template.md`.
- Record any AI answer drift and update `llms.txt`, `llms-full.txt`, or page copy only if the public source itself needs clarification.
- Use `docs/launch-distribution-pack.md` for ready-to-copy launch posts, expert-review email text, and the "what not to claim" list.
