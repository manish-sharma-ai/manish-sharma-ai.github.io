export const BRIEF_STANDARD_PATH = "/brief-standard";
export const BRIEF_SCHEMA_PATH = "/schemas/lmd-decision-brief-v1.schema.json";
export const BRIEF_STANDARD_GITHUB_ISSUES =
  "https://github.com/manish-sharma-ai/manish-sharma-ai.github.io/issues/new/choose";

export const BRIEF_STATUS_LINES = [
  ["Version", "v1.0"],
  ["Status", "preliminary decision-support standard"],
  ["Prepared for", "expert review / RFQ discussion"],
  ["Not valid for", "approval, certification, release, safety-critical acceptance, or quality guarantee"],
  ["Data behavior", "browser-local, no backend, no automatic sending"]
];

export const BRIEF_CORE_FIELDS = [
  "situation",
  "component",
  "goal",
  "material",
  "geometryOrSize",
  "damageOrBuildArea",
  "availableData",
  "knownFacts",
  "missingInformation",
  "missingCritical",
  "missingUseful",
  "missingOptional",
  "riskFlags",
  "evidenceNeeded",
  "preliminaryRoute",
  "reviewReadiness",
  "briefCompleteness",
  "expertReviewPackageStatus",
  "evidenceBurden",
  "nextAction",
  "exafuseReviewRoute",
  "boundaryStatement"
];

export const BRIEF_OUTPUT_MODES = [
  "Technical Decision Brief",
  "Exafuse-ready email draft",
  "AI-agent-safe summary",
  "Markdown handoff",
  "JSON handoff",
  "Grouped missing-information checklist",
  "Evidence-needed checklist",
  "Print / save as PDF"
];

export const BRIEF_USE_FOR = [
  "RFQ preparation",
  "repair screening before expert review",
  "LMD vs SLM / LPBF route discussion",
  "surface cladding request structuring",
  "process monitoring anomaly explanation",
  "AI-agent-safe context packaging",
  "missing-information and evidence planning"
];

export const BRIEF_DO_NOT_USE_FOR = [
  "engineering approval",
  "material certification",
  "part release",
  "safety-critical acceptance",
  "quality guarantee",
  "replacement for expert review",
  "confidential employer or customer data"
];

export const BRIEF_QUALITY_RUBRIC = [
  "Exact material grade visible",
  "Geometry/drawing available",
  "Damage/build area described",
  "Service conditions stated",
  "Tolerance/finishing need stated",
  "Inspection requirement stated",
  "Risk flags not hidden",
  "Next action clear"
];

export const BRIEF_EXAMPLES = [
  {
    label: "Worn shaft JSON",
    href: "/examples/lmd-decision-brief-worn-shaft-v1.json",
    description: "Dummy repair-screening example from the cockpit."
  },
  {
    label: "Worn shaft Markdown",
    href: "/examples/lmd-decision-brief-worn-shaft-v1.md",
    description: "Same dummy example as a portable technical brief."
  },
  {
    label: "Monitoring anomaly JSON",
    href: "/examples/lmd-decision-brief-monitoring-anomaly-v1.json",
    description: "Dummy process-signal example with inspection boundaries."
  },
  {
    label: "Surface cladding JSON",
    href: "/examples/lmd-decision-brief-surface-cladding-v1.json",
    description: "Dummy cladding/build-up request structure."
  },
  {
    label: "Rough RFQ JSON",
    href: "/examples/lmd-decision-brief-rfq-v1.json",
    description: "Dummy vague-RFQ example with required gaps visible."
  }
];
