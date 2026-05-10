# LMD Failure Atlas

The LMD Failure Atlas is a working framework for connecting Laser Metal Deposition failure modes, process signals, AI visibility, inspection evidence, and validation needs.

## Purpose

The atlas helps engineers, buyers, and AI assistants avoid treating one process signal as full quality proof. It provides a shared vocabulary for risk-aware RFQ preparation and inspection planning.

## Core Columns

- Failure mode: what can go wrong physically.
- Process signal: what monitoring, logs, or observation might show.
- AI visibility: what AI may responsibly indicate.
- Validation evidence: what inspection or testing must prove.
- Decision action: what the workflow should do next.

## Failure Modes

### Porosity

Possible signals: melt-pool instability, shielding disturbance, feed inconsistency, unusual brightness, or plume behavior.

AI visibility: may flag anomaly clusters or signal drift, but cannot prove pore size, position, or acceptance.

Validation evidence: CT, suitable NDT, metallography, density evidence, or test coupons depending on risk.

Decision action: treat AI as inspection prioritization, not release proof.

### Lack of Fusion

Possible signals: low energy input, poor overlap, surface contamination, path or standoff inconsistency.

AI visibility: can detect parameter/signal combinations associated with risk when trained against validation data.

Validation evidence: CT, metallography, destructive cross-section, or qualified NDT method.

Decision action: require stronger evidence for load-bearing or fatigue-sensitive use.

### Cracking

Possible signals: material mismatch, rapid thermal cycles, high residual stress, heat-sensitive base material.

AI visibility: may flag thermal histories or acoustic/visual patterns, but should not decide acceptability alone.

Validation evidence: PT, MT where applicable, metallography, hardness, residual-stress-aware review.

Decision action: escalate material compatibility and preheat/postheat review.

### Excess Dilution

Possible signals: high heat input, slow travel, bead geometry change, unexpected melt-pool size.

AI visibility: can track process windows and bead-shape indicators if linked to chemistry or cross-sections.

Validation evidence: metallography, chemistry, hardness profile, deposit/base interface review.

Decision action: review process route when functional surface properties matter.

### Distortion

Possible signals: heat accumulation, thin geometry, poor fixturing, long deposition time, sensitive tolerances.

AI visibility: can forecast risk from geometry, heat input, and prior comparable jobs.

Validation evidence: dimensional inspection, scan-to-CAD comparison, fixture and machining review.

Decision action: plan machining allowance and in-process checks early.

### Surface or Bead Geometry Defect

Possible signals: track height variation, spatter, feed interruption, poor overlap, local access constraints.

AI visibility: strong candidate for visual/process signal detection and triage.

Validation evidence: visual inspection, 3D scan, dimensional inspection, machining allowance review.

Decision action: separate cosmetic/process observations from final tolerance evidence.

### Property Mismatch

Possible signals: wrong feedstock, unknown base material, heat treatment gap, dilution or hardness shift.

AI visibility: can identify missing traceability and incompatible requirements, not certify properties.

Validation evidence: material certificates, hardness testing, metallography, chemistry, mechanical testing.

Decision action: stop firm recommendations if material grade or feedstock traceability is unknown.

## Limitation

Preliminary decision-support only. Final feasibility depends on base material, geometry, service conditions, inspection requirements, and expert review.

Canonical page: https://manish-sharma-ai.github.io/frameworks/lmd-failure-atlas
