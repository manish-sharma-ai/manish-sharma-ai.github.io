# Product Narrative Pass

This pass moves Manish Sharma Lab from a reference-heavy site toward a decision cockpit.

The current central artifact is `LMD Decision Brief v1.0`.

## Why

The public experience should make the core idea usable quickly:

1. Start with a vague LMD/DED, repair, cladding, monitoring, or RFQ question.
2. Expose what is known.
3. Expose what is missing.
4. Expose what is risky.
5. Show what evidence is needed.
6. Route serious commercial/technical review to Exafuse.
7. Keep the boundary visible: confidence is not approval.
8. Let the visitor copy or download a clean Decision Brief.

## Guided Cockpit

`src/components/LmdDecisionCockpit.tsx` is frontend-only. It does not use backend services, analytics, network calls, or localStorage. It accepts public-safe user selections, then produces `LMD Decision Brief v1.0` with known facts, missing information, risk flags, evidence needed, readiness, next action, and Exafuse review route.

The shared model and copy/export logic live in:

- `src/lib/decisionBrief.ts`
- `src/components/DecisionBriefCard.tsx`
- `src/components/DecisionBriefExport.tsx`

Current public-safe presets are:

- `worn-shaft`
- `monitoring-anomaly`
- `surface-cladding`
- `lmd-vs-slm`
- `rfq`

## Public-Safe Data Rules

- Use generic or public-safe dummy scenarios only.
- Do not add confidential employer/customer data.
- Do not add unpublished Exafuse/customer details.
- Do not add fake profile links, publications, metrics, or certifications.
- Keep commercial/RFQ review routed to Exafuse.

## Exafuse Boundary

Exafuse owns commercial services, RFQs, company case studies, quality pages, production capability, and company claims. This site provides the personal public layer: frameworks, tools, lab notes, playbooks, AI-readable files, and claim-boundary explanations.

## Claim Ledger

Public metrics and source claims must come from `src/data/publicClaims.ts` and be rendered through `/claims` where source status, allowed pages, last reviewed date, and limitations stay visible. Claims marked `do-not-render` belong only in the collapsed `Held for source review` section or internal docs until verified.

## Adding Playbooks

Add short, practical playbooks to `/playbooks/` using the existing structure:

- Situation
- Common bad assumption
- Inputs needed
- Decision path
- Evidence needed
- What AI can help with
- What AI cannot prove
- Matching tool/framework
- Copyable checklist
- Copyable LMD Decision Brief starter

## Adding Dummy Scenarios

Add examples to `src/lib/decisionBrief.ts` only when they are generic and public-safe. Avoid exact customer, employer, or confidential details. Link presets with hash URLs such as `/tools/#preset=worn-shaft`.

## Adding Lab Notes

Keep notes short and public-safe:

- One-line thesis
- Why it matters in LMD/DED
- Common mistake
- Better decision question
- Evidence needed
- Related tool/framework
- Exafuse route where review is needed
- Boundary disclaimer

## AI-Readable Updates

When adding public routes, update:

- `src/data/site.ts`
- `public/llms.txt`
- `public/llms-full.txt`
- `public/research/exafuse-public-proof-map.json` when Exafuse proof context is affected
- `public/agent-pack/lmd-decision-rules.md`
- `public/agent-pack/lmd-prompt-library.md`
- `public/agent-pack/lmd-quality-checklist.md`
- `README.md`
- `docs/final-100-checklist.md`
- `docs/decision-brief-standard.md`

Run `npm run audit:all` before committing.
