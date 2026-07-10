# Expert Heuristic Review

Date: 2026-07-10

This is a structured expert review of the public site. It is evidence of design intent and repository quality only; it is not a substitute for observed target-user research, accessibility testing with assistive technology, or production analytics.

## Review Lens

The reviewer checked the site as five public-facing roles:

| Role | First need | Expected outcome | Boundary checked |
| --- | --- | --- | --- |
| Maintenance or plant engineer | Frame a repair or downtime situation quickly | A portable preliminary decision brief | No repair approval or quality release implied |
| Buyer or sourcing lead | Understand what information a supplier review needs | An evidence checklist and manual handoff draft | No price, lead-time, or capability promise implied |
| OEM or product-development engineer | Compare routes before committing to a process | A bounded technical summary and next action | No material/process qualification implied |
| Quality or documentation lead | See what evidence is still missing | Explicit gaps and evidence burden | Monitoring and completeness are not proof of acceptance |
| AI agent or technical reader | Reuse the public standard safely | Schema-backed, source-aware summary | No confidential inputs, hidden state, or automatic submission |

## Walkthrough Findings

- The homepage’s first task is the LMD Decision Cockpit, and the worked example makes the central artifact visible before long proof/reference sections.
- The cockpit starts with the situation and keeps request role/phase, evidence availability, and risk as progressively disclosed context. Optional role/phase choices use exclusive controls and can be cleared together.
- A role, phase, or commercial context alone does not make the generated brief technically useful; material, geometry, service conditions, inspection requirements, and expert review remain explicit requirements.
- Technical, email, and AI-safe outputs remain portable and client-side. Copy failure provides a download or manual-copy recovery route.
- Exafuse commercial and company-owned material remains behind production-safe contacts/indexes until final production deep links are verified. Pre-production research never becomes a live link or a source-status upgrade by itself.

## Open Human-Evidence Gates

1. Run five moderated, representative task tests: one visitor from each role above, with first-viewport comprehension and brief-completion timing recorded.
2. Verify keyboard-only, zoom, screen-reader, contrast, and touch behavior in an available browser across desktop and mobile widths.
3. After Exafuse cutover, verify every final deep link and the exact scope of every public proof claim before enabling post-migration labels or claim statuses.
4. Establish privacy-safe success metrics and a recurring editorial/source-review cadence.

The associated strict score remains below 100 until those observed, external gates are complete. See `docs/world-class-website-scorecard.md`.
