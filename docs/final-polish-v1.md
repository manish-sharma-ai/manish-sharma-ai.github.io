# Final Polish v1

Date: 2026-07-08

Scope: tighten the public LMD Decision Brief surface, production-safe Exafuse language, claim ledger readability, German handoff, demo page, and AI-readable files without adding confidential or backend behavior.

## Decision Brief Contract

- `LMD Decision Brief v1.0` is preliminary decision support.
- Header must show status, prepared-for context, and not-valid-for boundaries.
- Brief completeness describes whether the brief can support a useful conversation. It is not feasibility, approval, or release evidence.
- Expert-review package status describes whether the current package is ready for expert review, not approval.
- Evidence burden is a planning label, not release approval.
- Email drafts are manual drafts. Nothing is sent unless the user sends it from their own email client.

## Worn-Shaft Example

Expected status trio:

- Brief completeness: `Ready for preliminary discussion`
- Expert-review package status: `Not ready`
- Evidence burden: `High inspection burden`

Reason: the example has enough structure for a useful conversation, but critical gaps remain around exact material grade, CAD/drawing, damage depth, dimensions, operating conditions, and inspection requirement.

## Human Exafuse Language

Human-facing labels should be buyer/source oriented:

- `Contact Exafuse`
- `Request Exafuse review`

Helper text: `New Exafuse case/tool deep links will activate after production migration.`

Do not render these strings in human HTML:

- `Case source after migration`
- `RFQ path after migration`
- `Pathfinder after migration`
- `Builder after migration`
- `View Exafuse after migration`
- `Source activates after Exafuse production migration`

Machine-readable files may keep explicit migration-mode details where useful.

## Added Audits

- `audit:brief-status-consistency`
- `audit:human-migration-language`
- `audit:control-text-readability`
- `audit:claims-human-surface`
- `audit:ai-safe-summary`
- `audit:email-manual-boundary`
- `audit:brief-schema`
- `audit:human-exafuse-ctas`
- `audit:rendered-public-language`
- `audit:rubric-format`
- `audit:preflight`
- `audit:seo-social`

These should remain included in `audit:all`.
