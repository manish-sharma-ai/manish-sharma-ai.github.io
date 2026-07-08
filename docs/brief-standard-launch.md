# LMD Decision Brief Standard Launch

Use this when changing `/brief-standard/`, the public schema, examples, or export behavior.

## Public Contract

- Route: `https://manish-sharma-ai.github.io/brief-standard`
- Adoption section: `https://manish-sharma-ai.github.io/brief-standard#adoption`
- Schema: `https://manish-sharma-ai.github.io/schemas/lmd-decision-brief-v1.schema.json`
- Examples: `https://manish-sharma-ai.github.io/examples/`

The standard is preliminary decision-support only. It is prepared for expert review / RFQ discussion and is not valid for approval, certification, release, safety-critical acceptance, or quality guarantee.

## Release Checks

```bash
npm run check
npm run build
npm run audit:brief-schema
npm run audit:human-exafuse-ctas
npm run audit:rubric-format
npm run audit:preflight
npm run audit:seo-social
npm run audit:all
git diff --check
```

## Public-Safe Content Rules

- Examples must be generic dummy examples.
- Do not include customer names, drawings, private process parameters, pricing, inspection data, or employer-confidential details.
- Do not present Exafuse migration-gated deep links as live human CTAs.
- Keep the migration helper text where production-safe context needs it: `New Exafuse case/tool deep links activate after production migration.`

## Files To Keep Synchronized

- `src/lib/decisionBrief.ts`
- `src/data/briefStandard.ts`
- `src/pages/brief-standard.astro`
- `src/pages/brief-template.astro`
- `src/pages/tools.astro`
- `public/schemas/lmd-decision-brief-v1.schema.json`
- `public/examples/`
- `public/llms.txt`
- `public/llms-full.txt`
- `public/research/exafuse-public-proof-map.json`
- `public/agent-pack/lmd-decision-rules.md`
- `public/agent-pack/lmd-prompt-library.md`
- `public/agent-pack/lmd-quality-checklist.md`
- `README.md`
- `AGENTS.md`
