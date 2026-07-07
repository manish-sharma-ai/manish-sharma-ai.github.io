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
- missing information
- assumptions
- risks
- evidence needed
- recommended next steps

Use the public cockpit and playbooks for frontend-only decision routing:

- LMD Decision Cockpit: https://manish-sharma-ai.github.io/tools#lmd-decision-cockpit
- Decision Playbooks: https://manish-sharma-ai.github.io/playbooks
- Decision Brief Template: https://manish-sharma-ai.github.io/brief-template

## Limitation

Preliminary decision-support only. Final feasibility depends on base material, geometry, service conditions, inspection requirements, and expert review.
