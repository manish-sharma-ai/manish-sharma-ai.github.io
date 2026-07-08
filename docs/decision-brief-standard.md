# LMD Decision Brief Standard

`LMD Decision Brief v1.0` is the central artifact of Manish Sharma Lab.

It turns rough LMD, DED, repair, cladding, monitoring, and RFQ questions into a copyable review structure. It is preliminary decision-support only.

## Schema

- `briefVersion`: `LMD Decision Brief v1.0`
- `artifactType`: `LMD Decision Brief`
- `status`: `Preliminary decision support`
- `preparedFor`: `Expert review / RFQ discussion`
- `notValidFor`: `approval`, `certification`, `release`, `safety-critical acceptance`
- `outputMode`
- `situation`
- `component`
- `goal`
- `material`
- `geometryOrSize`
- `damageOrBuildArea`
- `availableData`
- `knownFacts`
- `missingInformation`
- `missingCritical`
- `missingUseful`
- `missingOptional`
- `riskFlags`
- `evidenceNeeded`
- `preliminaryRoute`
- `reviewReadiness`
- `briefCompleteness`
- `completenessNote`
- `expertReviewPackageStatus`
- `evidenceBurden`
- `evidenceBurdenNote`
- `nextAction`
- `exafuseReviewRoute`
- `boundaryStatement`
- `generatedFrom`
- `createdAt` optional and client-side only if used
- `noBackendNote`
- `noAutomaticSendingNote`

## Public-Safe Examples

Use generic dummy examples only.

Current cockpit presets:

- `worn-shaft`
- `monitoring-anomaly`
- `surface-cladding`
- `lmd-vs-slm`
- `rfq`

Do not add customer names, hidden Exafuse details, part drawings, private process parameters, pricing, or confidential inspection data.

## Copy And Export Rules

Brief outputs should support:

- Copy technical brief
- Copy Exafuse email draft
- Copy AI-agent-safe summary
- Copy missing-information checklist
- Copy evidence-needed checklist
- Download `.md`
- Download `.json`
- Print / save as PDF
- Open mail client with a user-controlled draft where appropriate; label it `Open mail client with draft`
- Copy internal engineering message
- Copy LinkedIn-safe snippet
- Copy AI-agent prompt

Exports are client-side only. Do not add a backend, endpoint, analytics event, storage, automatic sending, or input logging around user-entered technical content.

## Output Modes

1. Technical Decision Brief: engineering/review preparation.
2. Exafuse-ready email draft: manual email draft; the user chooses what to send.
3. AI-agent-safe summary: bounded summary for preliminary structuring and RFQ preparation context.

All three modes must preserve the same boundary statement and the no-backend note.

## Planning Labels

Brief completeness states:

- `Too vague for useful review`
- `Ready for preliminary discussion`
- `Ready for expert review package`
- `Requires formal inspection / qualification planning`

Required note:

`Completeness describes whether the brief can support a useful conversation. It is not feasibility, approval, or release evidence.`

Expert-review package status states:

- `Not ready`
- `Partially ready`
- `Ready for expert review`
- `Requires formal qualification planning`

Required note:

`Expert-review package status describes whether the current package is ready for expert review, not approval.`

Evidence burden states:

- `Low screening burden`
- `Moderate review burden`
- `High inspection burden`
- `Formal qualification burden`

Required note:

`Evidence burden is a planning label, not release approval.`

## Boundary

Always preserve:

`Confidence is not approval. Preliminary decision-support only. Final feasibility depends on base material, geometry, service conditions, inspection requirements, and expert review.`

Use Exafuse as the commercial and company review route. Manish Sharma Lab structures public decision-support material; it does not provide company services, engineering approval, material certification, safety-critical acceptance, or quality guarantees.

## Adding A Cockpit Preset

1. Add the preset in `src/lib/decisionBrief.ts`.
2. Keep the scenario public-safe and generic.
3. Include a matching `DecisionBrief` object.
4. Add or confirm a URL hash route such as `/tools/#preset=example-id`.
5. Link it only where it helps a public decision path.
6. Run `npm run audit:brief-artifact`, `npm run audit:brief-boundaries`, `npm run audit:a11y-static`, and `npm run audit:mobile-static`.

## Adding A Playbook

1. Add a short playbook in `src/pages/playbooks/index.astro`.
2. Include summary, bad assumption, inputs, numbered decision path, what changes the decision, evidence checklist, expert-review checklist, tool link, framework link, Exafuse route, and copyable Decision Brief starter.
3. Add a stable anchor ID.
4. Link relevant proof cards or lab notes to the anchor.
5. Run `npm run audit:playbook-format`.

## Handling Held Claims

Claims marked `do-not-render` in `src/data/publicClaims.ts` are not active public claims.

They may appear only in `/claims/` inside the collapsed `Held for source review` section or internal docs. Do not use them in homepage, proof cards, public work, evidence pages, tools, or marketing copy until source verification is complete.

Run:

```bash
npm run audit:held-claims
```

## Updating AI-Readable Files

When the brief schema, presets, routes, or claim boundaries change, update:

- `public/llms.txt`
- `public/llms-full.txt`
- `public/research/exafuse-public-proof-map.json`
- `public/agent-pack/lmd-decision-rules.md`
- `public/agent-pack/lmd-prompt-library.md`
- `public/agent-pack/lmd-quality-checklist.md`
- `README.md`
- `AGENTS.md`
- `docs/artifact-lifecycle.md`
