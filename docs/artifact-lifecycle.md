# Artifact Lifecycle

This repository treats `LMD Decision Brief v1.0` as the central product artifact.

## Generation

The shared model lives in `src/lib/decisionBrief.ts`.

Every cockpit, workbench, demo, template, and playbook output should use the shared `DecisionBrief` object rather than inventing a separate summary format.

Required generated fields:

- known facts
- missing information grouped as critical gaps, useful gaps, and optional context
- risk flags
- evidence needed
- preliminary route
- review readiness
- brief completeness
- evidence burden
- next action
- Exafuse review route
- boundary statement
- no-backend note

## Travel Modes

The brief must remain portable as:

- Technical Decision Brief
- Exafuse-ready email draft
- AI-agent-safe summary
- missing-information checklist
- evidence-needed checklist
- Markdown
- JSON
- print/PDF

Email drafts are manual drafts only. Do not add automatic sending, backend endpoints, analytics around user-entered technical content, input logging, or storage.

## Boundaries

Always preserve:

`Confidence is not approval. Preliminary decision-support only. Final feasibility depends on base material, geometry, service conditions, inspection requirements, and expert review.`

Do not call brief completeness feasibility. Do not call evidence burden approval. Do not imply monitoring certifies final quality.

## German Summary

`/de/` should stay short and should include:

- `LMD-Entscheidungsbrief v1.0`
- German boundary text
- German copyable mini-template
- route to cockpit, no-hype boundary, and Exafuse contact

## Accessibility

Interactive brief controls should keep:

- fieldsets and legends for question groups
- accessible labels for buttons
- `aria-pressed` for selected button-style toggles
- visible focus states
- wrapping button rows on mobile

## Updating Future Presets

When adding a preset:

1. Use public-safe dummy data only.
2. Add the preset in `src/lib/decisionBrief.ts`.
3. Include grouped missing information when practical.
4. Route proof patterns to public-safe presets, not confidential case detail.
5. Update `public/llms.txt`, `public/llms-full.txt`, and agent-pack files when fields or modes change.
6. Run `npm run check`, `npm run build`, `npm run audit:all`, and `git diff --check`.
