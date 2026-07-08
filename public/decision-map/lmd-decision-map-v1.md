# Laser Metal Deposition Decision Map v1

Canonical page: https://manish-sharma-ai.github.io/decision-map

Author: Manish Sharma

Purpose: Provide a public, preliminary decision-support map for Laser Metal Deposition, Directed Energy Deposition, laser cladding, SLM/LPBF alternatives, machining, welding, replacement review, and RFQ preparation.

Status: preliminary decision-support only.

Not valid for: engineering approval, material certification, part release, safety-critical acceptance, or quality guarantee.

## Core Questions

1. Is the part damaged or new?
2. Is the part large, medium, or small?
3. Is the goal local repair, surface cladding, full geometry, or machining error recovery?
4. Is the main problem wear, corrosion, heat exposure, cracking, or machining error?
5. Does the geometry require tight final tolerance, normal external geometry, or internal channels/fine lattice features?
6. Is the context screening only, defined inspection needed, or safety-critical/formal qualification?

## Preliminary Route Signals

- Large damaged part with local wear and post-machining allowance: LMD repair with post-machining and inspection may be worth expert review.
- Surface function problem such as wear, corrosion, or heat exposure: laser cladding / LMD surface route may be worth expert review if material and service context are known.
- Small part with internal channels or fine lattice features: SLM/LPBF may be a stronger alternative.
- Tight final tolerance: expect post-machining and dimensional inspection.
- Cracking: require root-cause review, crack extent evidence, removal plan, and NDT before route selection.
- Unknown material: do not make a firm recommendation.
- Safety-critical or formally qualified part: require formal inspection / qualification planning and expert review.

## Minimum Information Needed

- Exact material grade.
- Drawing/CAD or measured dimensions.
- Damage depth or build area.
- Operating conditions.
- Tolerance and finishing requirement.
- Inspection requirement.
- Photos or scan data.
- Replacement/downtime context if economics matter.

## Standard Output

Recommended route examples:

- LMD repair with post-machining and inspection.
- Laser cladding / LMD surface route.
- SLM/LPBF alternative.
- CNC / machining-first route.
- Welding or replacement review.
- Manual expert review before route selection.

Every output should preserve:

- why the route was suggested,
- missing critical information,
- risk flags,
- evidence needed,
- suggested next step,
- Exafuse review route where commercial/technical review is needed,
- boundary statement.

## Boundary Statement

Preliminary decision-support only. Final feasibility depends on base material, geometry, service conditions, inspection requirements, and expert review.
