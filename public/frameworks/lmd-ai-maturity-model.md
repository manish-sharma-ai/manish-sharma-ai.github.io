# LMD-AI Maturity Model

The LMD-AI Maturity Model is a public framework for moving Laser Metal Deposition workflows from manual records to structured data capture, analytics, AI decision support, and validated closed-loop development.

## Core Principle

The maturity question is not which model to use first. It is whether RFQ data, material records, geometry, process history, monitoring signals, inspection evidence, operator feedback, and repeated outcomes are connected.

## Stages

### 0. Unstructured Craft Memory

Signal: knowledge lives in people, screenshots, PDFs, and machine-side notes.

AI capability: AI can only summarize generic guidance.

Next move: start collecting consistent RFQ, material, parameter, photo, and inspection records.

### 1. Basic Digital Records

Signal: machine logs, photos, drawings, and inspection results exist but are not reliably linked.

AI capability: AI can help with search, checklists, and missing-information prompts.

Next move: create job IDs that connect RFQ, CAD/path, parameters, feedstock, and inspection evidence.

### 2. Traceable Process History

Signal: jobs have linked material, geometry, parameters, feedstock batches, and operator notes.

AI capability: AI can support offline analytics and risk summaries.

Next move: connect process signals to measured inspection outcomes and comparable build families.

### 3. Inspection-Linked Analytics

Signal: monitoring data, parameter changes, inspection results, and defect labels can be analyzed together.

AI capability: AI can provide anomaly triage, evidence routing, and repairability decision support.

Next move: validate model behavior against known outcomes and define escalation rules.

### 4. Validated AI Decision Support

Signal: AI outputs are tested, bounded, logged, reviewed, and connected to expert decisions.

AI capability: AI can support RFQ review, process monitoring interpretation, and inspection planning.

Next move: build governance for model updates, drift checks, and closed-loop experiments.

### 5. Closed-Loop Development Candidate

Signal: validated feedback loops connect process, inspection, and outcome data across repeated jobs.

AI capability: AI may support controlled closed-loop development under engineering governance.

Next move: treat deployment as a qualification program, not a software toggle.

## Limitation

Preliminary decision-support only. Final feasibility depends on base material, geometry, service conditions, inspection requirements, and expert review.

Canonical page: https://manish-sharma-ai.github.io/frameworks/lmd-ai-maturity-model
