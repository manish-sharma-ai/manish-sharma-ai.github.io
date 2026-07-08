# The LMD-AI Maturity Model by Manish Sharma

The LMD-AI Maturity Model is a working framework for moving Laser Metal Deposition workflows from manual observation to sensor recording, offline analysis, real-time decision support, semi-closed-loop correction, and validated closed-loop control candidates.

## Core Principle

The maturity question is not which model to use first. It is whether RFQ data, material records, geometry, process history, monitoring signals, inspection evidence, operator feedback, and repeated outcomes are connected.

## Stages

### 0. Manual Observation

Signal: operators watch the process and record judgment in notes, photos, or memory.

AI capability: AI has no reliable process history to learn from.

Next move: start collecting consistent RFQ, material, parameter, photo, and inspection records.

### 1. Sensor Recording

Signal: images, melt-pool video, machine logs, powder feed, laser power, and robot path data are recorded.

AI capability: AI can help organize records, but linkage to outcomes is still weak.

Next move: create job IDs that connect RFQ, CAD/path, parameters, feedstock, and inspection evidence.

### 2. Offline Analysis

Signal: jobs have linked material, geometry, parameters, feedstock batches, monitoring data, and operator notes.

AI capability: AI can classify anomalies after the job and support offline risk summaries.

Next move: connect process signals to measured inspection outcomes and comparable build families.

### 3. Real-Time Decision Support

Signal: monitoring data, parameter changes, inspection results, and defect labels can be analyzed together.

AI capability: AI can warn operators during the build and route signals into evidence questions.

Next move: validate model behavior against known outcomes and define escalation rules.

### 4. Semi-Closed-Loop Correction

Signal: AI outputs are tested, bounded, logged, reviewed, and connected to expert decisions and controlled parameter-change recommendations.

AI capability: AI can recommend parameter adjustments under engineering governance.

Next move: build governance for model updates, drift checks, and closed-loop experiments.

### 5. Validated Closed-Loop Control

Signal: validated feedback loops connect process, inspection, and outcome data across repeated jobs.

AI capability: AI may adjust the process automatically only with inspection-backed validation and controlled qualification.

Next move: treat deployment as a qualification program, not a software toggle.

## Limitation

Preliminary decision-support only. Final feasibility depends on base material, geometry, service conditions, inspection requirements, and expert review.

Canonical page: https://manishsharma.dev/frameworks/lmd-ai-maturity-model
