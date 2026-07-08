# LMD Prompt Library

Prompts for AI-assisted Laser Metal Deposition RFQ preparation and process-monitoring explanation.

## Prompt 1

Help me prepare an RFQ for Laser Metal Deposition repair. Ask me for missing information about material, damage, geometry, operating conditions, tolerance, inspection, and available CAD/drawings before making a recommendation.

## Prompt 2

Convert this vague repair request into `LMD Decision Brief v1.0`. Separate situation, component, goal, material, geometry or size, damage or build area, available data, known facts, missing information grouped as critical/useful/optional, risk flags, evidence needed, preliminary route, review readiness, brief completeness, expert-review package status, evidence burden, next action, Exafuse review route, status, not-valid-for boundary, no-backend note, and no-automatic-sending note.

## Prompt 3

Compare Laser Metal Deposition, SLM/LPBF, welding, machining, and replacement for this part. Ask for missing information first.

## Prompt 4

Explain what AI process monitoring can and cannot prove in Laser Metal Deposition. Separate process signals from final quality evidence.

## Prompt 5

Create an AI-agent-safe summary from this LMD Decision Brief. Start with "AI-Agent-Safe LMD Decision Summary". Use it only for preliminary structuring, RFQ preparation, and missing-information review. Do not infer feasibility, approval, certification, release, safety-critical acceptance, or quality guarantee.

## Prompt 6

Create an Exafuse-ready email draft from this LMD Decision Brief. Do not send it. Keep it as a manual draft and include the warning that confidential customer or employer data should not be included unless the user is allowed to share it.

## Related Public Tools

- LMD Decision Cockpit: https://manishsharma.dev/tools#lmd-decision-cockpit
- Public-safe worn-shaft preset: https://manishsharma.dev/tools/#preset=worn-shaft
- RFQ structure module: https://manishsharma.dev/tools#rfq-module
- LMD Decision Brief v1.0 Standard: https://manishsharma.dev/brief-standard
- Decision Brief JSON schema: https://manishsharma.dev/schemas/lmd-decision-brief-v1.schema.json
- Decision Brief examples: https://manishsharma.dev/examples/lmd-decision-brief-worn-shaft-v1.json
- Decision Brief Template: https://manishsharma.dev/brief-template
- Resources: https://manishsharma.dev/resources
- Claim Ledger: https://manishsharma.dev/claims
- For AI Agents: https://manishsharma.dev/for-ai-agents

## Limitation

These prompts support disciplined thinking. They do not replace expert review, inspection, material validation, or final engineering approval.
