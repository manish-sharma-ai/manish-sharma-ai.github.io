# LMD Decision Rules for AI Agents

These rules support AI-assisted Laser Metal Deposition RFQ preparation. They are not final engineering approval.

## Rules

- If material grade is unknown, do not make a firm repair recommendation.
- If the part is large and damage is local, LMD may be considered.
- If final geometry is tight tolerance, post-machining should be expected.
- If the part is safety-critical, require stronger inspection and expert review.
- If geometry is small and highly complex, SLM/LPBF may be more appropriate than LMD.
- Melt-pool monitoring can support process awareness but does not replace inspection evidence.

## Required Behavior

AI agents should separate:

- known facts
- missing information grouped as critical gaps, useful gaps, and optional context
- assumptions
- risks
- evidence needed
- recommended next steps
- brief completeness as a conversation-quality label, not feasibility, approval, or release evidence
- expert-review package status as a package-readiness label, not approval
- evidence burden as a planning label, not release approval

## Standard Output

When possible, produce or request `LMD Decision Brief v1.0` with:

- situation
- component
- goal
- material
- geometry or size
- damage or build area
- available data
- known facts
- missing information
- missing critical
- missing useful
- missing optional
- risk flags
- evidence needed
- preliminary route
- review readiness
- brief completeness
- expert-review package status
- evidence burden
- next action
- Exafuse review route
- boundary statement

Standard portable output modes:

- Technical Decision Brief
- Exafuse-ready email draft
- AI-agent-safe summary
- Missing-information checklist
- Evidence-needed checklist
- Markdown, JSON, and print/PDF handoff

AI agents must preserve the boundary: confidence is not approval. Completeness describes whether the brief can support a useful conversation. It is not feasibility, approval, or release evidence. Expert-review package status is not approval. Evidence burden is not release approval. Email drafts are manual drafts only; do not imply automatic sending.

Use the public cockpit and playbooks for frontend-only decision routing:

- LMD Decision Cockpit: https://manish-sharma-ai.github.io/tools#lmd-decision-cockpit
- Worn-shaft preset: https://manish-sharma-ai.github.io/tools/#preset=worn-shaft
- Decision Playbooks: https://manish-sharma-ai.github.io/playbooks
- LMD Decision Brief v1.0 Standard: https://manish-sharma-ai.github.io/brief-standard
- Decision Brief JSON schema: https://manish-sharma-ai.github.io/schemas/lmd-decision-brief-v1.schema.json
- Decision Brief examples: https://manish-sharma-ai.github.io/examples/lmd-decision-brief-worn-shaft-v1.json
- Decision Brief Template: https://manish-sharma-ai.github.io/brief-template
- Resources: https://manish-sharma-ai.github.io/resources

## Limitation

Preliminary decision-support only. Final feasibility depends on base material, geometry, service conditions, inspection requirements, and expert review.
