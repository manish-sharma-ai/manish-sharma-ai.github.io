export const BRIEF_VERSION = "LMD Decision Brief v1.0";

export const BOUNDARY_STATEMENT =
  "Confidence is not approval. Preliminary decision-support only. Final feasibility depends on base material, geometry, service conditions, inspection requirements, and expert review.";

export const NO_BACKEND_NOTE = "No backend. No data sent by this site.";

export interface DecisionBrief {
  briefVersion: typeof BRIEF_VERSION;
  situation: string;
  component: string;
  goal: string;
  material: string;
  geometryOrSize: string;
  damageOrBuildArea: string;
  availableData: string[];
  knownFacts: string[];
  missingInformation: string[];
  riskFlags: string[];
  evidenceNeeded: string[];
  preliminaryRoute: string;
  reviewReadiness: string;
  nextAction: string;
  exafuseReviewRoute: string;
  boundaryStatement: string;
  generatedFrom: string;
  createdAt?: string;
  noBackendNote: string;
}

export interface CockpitPreset {
  id: string;
  label: string;
  scenario: string;
  state: {
    situation: string;
    info: string[];
    risk: string[];
  };
  brief: DecisionBrief;
}

type BriefInput = Partial<Omit<DecisionBrief, "briefVersion" | "boundaryStatement" | "noBackendNote">>;

function asList(items?: string[]) {
  return items?.filter(Boolean) ?? [];
}

export function createDecisionBrief(input: BriefInput): DecisionBrief {
  return {
    briefVersion: BRIEF_VERSION,
    situation: input.situation ?? "LMD/DED question not yet structured.",
    component: input.component ?? "Component not yet specified.",
    goal: input.goal ?? "Clarify whether LMD/DED, repair, cladding, or another route is worth expert review.",
    material: input.material ?? "Material not yet specified.",
    geometryOrSize: input.geometryOrSize ?? "Geometry or size not yet specified.",
    damageOrBuildArea: input.damageOrBuildArea ?? "Damage or build area not yet specified.",
    availableData: asList(input.availableData),
    knownFacts: asList(input.knownFacts),
    missingInformation: asList(input.missingInformation),
    riskFlags: asList(input.riskFlags),
    evidenceNeeded: asList(input.evidenceNeeded),
    preliminaryRoute: input.preliminaryRoute ?? "Structure the question before choosing a process route.",
    reviewReadiness: input.reviewReadiness ?? "Not enough information",
    nextAction: input.nextAction ?? "Collect missing information and prepare a bounded review package.",
    exafuseReviewRoute:
      input.exafuseReviewRoute ??
      "Use Exafuse for commercial and technical review after the question is structured.",
    boundaryStatement: BOUNDARY_STATEMENT,
    generatedFrom: input.generatedFrom ?? "Manish Sharma Lab decision-support resource",
    createdAt: input.createdAt,
    noBackendNote: NO_BACKEND_NOTE
  };
}

export const WORN_SHAFT_SCENARIO =
  "Worn steel shaft near bearing seat; photos available; CAD missing; tight tolerance; operating conditions unknown.";

export const WORN_SHAFT_BRIEF = createDecisionBrief({
  situation: "Public-safe dummy example: worn steel shaft near bearing seat.",
  component: "Shaft near bearing seat",
  goal: "Screen whether local LMD repair is worth expert review.",
  material: "Steel material family mentioned; exact grade not confirmed.",
  geometryOrSize: "Local bearing-seat area; dimensions not yet provided.",
  damageOrBuildArea: "Local wear near bearing seat; damage depth not yet provided.",
  availableData: ["Photos available", "CAD missing", "Tight tolerance mentioned"],
  knownFacts: [
    "Steel material family",
    "Photos available",
    "Local wear near bearing seat",
    "Tight tolerance mentioned"
  ],
  missingInformation: [
    "Exact material grade",
    "CAD/drawing",
    "Damage depth",
    "Dimensions",
    "Operating conditions",
    "Inspection requirement",
    "Deadline"
  ],
  riskFlags: [
    "Tight tolerance likely requires post-machining and dimensional inspection.",
    "Unknown service conditions can change material compatibility and evidence needs.",
    "CAD/drawing missing, so geometry recovery cannot be assessed yet."
  ],
  evidenceNeeded: [
    "Confirmed material grade",
    "Damage map and depth estimate",
    "Machining allowance",
    "Tolerance target",
    "Inspection requirement",
    "Expert review"
  ],
  preliminaryRoute: "Screen with LMD Repairability Quick Check before expert review.",
  reviewReadiness: "Ready for preliminary discussion",
  nextAction: "Prepare an Exafuse-ready review package with missing facts clearly marked.",
  exafuseReviewRoute:
    "Use Exafuse for commercial and technical review after material, geometry, damage, and inspection facts are structured.",
  generatedFrom: "LMD Decision Cockpit public-safe worn-shaft example"
});

export const COCKPIT_PRESETS: CockpitPreset[] = [
  {
    id: "worn-shaft",
    label: "Worn shaft near bearing seat",
    scenario: WORN_SHAFT_SCENARIO,
    state: {
      situation: "repair",
      info: ["materialKnown", "photosAvailable", "toleranceKnown"],
      risk: ["highDowntime", "tightTolerance"]
    },
    brief: WORN_SHAFT_BRIEF
  },
  {
    id: "monitoring-anomaly",
    label: "Monitoring anomaly",
    scenario: "Melt-pool signal anomaly on an LMD job; inspection requirement mentioned; final proof not available.",
    state: {
      situation: "monitoring",
      info: ["inspectionKnown", "photosAvailable"],
      risk: ["noInspection"]
    },
    brief: createDecisionBrief({
      situation: "Public-safe dummy example: melt-pool or camera anomaly needs interpretation.",
      component: "LMD job with process signal anomaly",
      goal: "Separate process awareness from quality evidence.",
      material: "Material not specified.",
      geometryOrSize: "Track/layer context not yet linked to full part geometry.",
      damageOrBuildArea: "Process signal anomaly; physical defect not confirmed.",
      availableData: ["Process signal or image available", "Inspection requirement mentioned"],
      knownFacts: ["Monitoring signal exists", "Inspection requirement mentioned"],
      missingInformation: [
        "Sensor context",
        "Calibration context",
        "Linked track/layer/part record",
        "Inspection result",
        "Acceptance criteria"
      ],
      riskFlags: [
        "A process signal does not prove final part quality.",
        "Unlinked signal data can create false confidence.",
        "No inspection result has been connected to the signal."
      ],
      evidenceNeeded: [
        "Linked job and layer context",
        "Sensor condition or calibration context",
        "Dimensional or NDT evidence where risk requires it",
        "Inspection result",
        "Expert review"
      ],
      preliminaryRoute: "Use the Quality Evidence Ladder before treating the signal as proof.",
      reviewReadiness: "Requires formal inspection/qualification planning",
      nextAction: "Connect the signal to inspection evidence before making a quality claim.",
      exafuseReviewRoute:
        "Use Exafuse for commercial and technical review when the monitoring question affects a real job or acceptance route.",
      generatedFrom: "LMD Decision Cockpit public-safe monitoring preset"
    })
  },
  {
    id: "surface-cladding",
    label: "Surface cladding request",
    scenario: "Surface wear/cladding request; base material mentioned; photos available; operating duty partially known.",
    state: {
      situation: "cladding",
      info: ["materialKnown", "photosAvailable", "operatingKnown"],
      risk: ["tightTolerance"]
    },
    brief: createDecisionBrief({
      situation: "Public-safe dummy example: surface cladding request.",
      component: "Worn surface or functional coating area",
      goal: "Clarify whether cladding or build-up should move to expert review.",
      material: "Base material family mentioned; exact grade not confirmed.",
      geometryOrSize: "Surface area not dimensioned yet.",
      damageOrBuildArea: "Surface wear or coating area; depth and function not fully defined.",
      availableData: ["Photos available", "Operating duty partly known"],
      knownFacts: ["Surface function matters", "Base material family mentioned", "Photos available"],
      missingInformation: [
        "Exact material grade",
        "Coating function",
        "Wear/corrosion/heat duty",
        "Surface area dimensions",
        "Finishing requirement",
        "Inspection requirement"
      ],
      riskFlags: [
        "Coating function can change material selection.",
        "Tight final geometry requires machining and inspection planning."
      ],
      evidenceNeeded: [
        "Material grade",
        "Duty and surface-function target",
        "Damage/build-area map",
        "Finishing plan",
        "Inspection requirement"
      ],
      preliminaryRoute: "Structure as a cladding/build-up decision brief before expert review.",
      reviewReadiness: "Ready for preliminary discussion",
      nextAction: "Collect coating duty, area dimensions, finishing, and inspection requirements.",
      exafuseReviewRoute:
        "Use Exafuse for commercial and technical review after surface function and evidence needs are clear.",
      generatedFrom: "LMD Decision Cockpit public-safe cladding preset"
    })
  },
  {
    id: "lmd-vs-slm",
    label: "LMD vs SLM route",
    scenario: "Large part with local feature addition; CAD available; tight tolerance; no internal channels.",
    state: {
      situation: "compare",
      info: ["drawingAvailable", "toleranceKnown", "operatingKnown"],
      risk: ["tightTolerance"]
    },
    brief: createDecisionBrief({
      situation: "Public-safe dummy example: route selection between LMD and SLM/LPBF.",
      component: "Large part or local feature candidate",
      goal: "Compare early route signals before committing to LMD, SLM/LPBF, hybrid, machining, or replacement.",
      material: "Material family not yet confirmed.",
      geometryOrSize: "Large envelope with local feature addition; CAD available.",
      damageOrBuildArea: "Local feature/build area; not an internal-channel requirement.",
      availableData: ["CAD available", "Tolerance mentioned", "Operating conditions mentioned"],
      knownFacts: ["Large/local feature signal", "CAD available", "No internal channels stated"],
      missingInformation: [
        "Exact material grade",
        "Feature dimensions",
        "Batch/economics context",
        "Post-processing plan",
        "Inspection requirement"
      ],
      riskFlags: [
        "Tight tolerance requires post-processing and inspection.",
        "Balanced route signals may need manual expert comparison."
      ],
      evidenceNeeded: [
        "Geometry envelope",
        "Feature accessibility",
        "Material route",
        "Finishing plan",
        "Inspection and qualification requirement"
      ],
      preliminaryRoute: "Use the LMD vs SLM Advisor, then escalate balanced cases.",
      reviewReadiness: "Ready for preliminary discussion",
      nextAction: "Compare scale, local addition, internal features, tolerance, and inspection burden.",
      exafuseReviewRoute:
        "Use Exafuse for commercial and technical review after route signals and RFQ data are structured.",
      generatedFrom: "LMD Decision Cockpit public-safe LMD-vs-SLM preset"
    })
  },
  {
    id: "rfq",
    label: "Rough RFQ text",
    scenario: "Buyer asks whether a worn component can be repaired; material grade, CAD, damage depth, and inspection needs are missing.",
    state: {
      situation: "rfq",
      info: ["photosAvailable"],
      risk: ["unknownMaterial", "highDowntime"]
    },
    brief: createDecisionBrief({
      situation: "Public-safe dummy example: rough LMD repair RFQ.",
      component: "Industrial component not yet fully identified",
      goal: "Turn a vague RFQ into known facts, gaps, risk flags, evidence needs, and review route.",
      material: "Material grade missing.",
      geometryOrSize: "Geometry not yet provided.",
      damageOrBuildArea: "Damage area mentioned but depth not defined.",
      availableData: ["Photos may be available"],
      knownFacts: ["Repair intent", "Local damage implied", "Downtime pressure possible"],
      missingInformation: [
        "Exact material grade",
        "Damage depth",
        "Photos",
        "Drawing/CAD",
        "Dimensions",
        "Tolerance",
        "Operating conditions",
        "Inspection requirement",
        "Deadline"
      ],
      riskFlags: [
        "Unknown material blocks firm repair recommendations.",
        "Missing geometry and damage depth can change the route.",
        "Downtime pressure should not remove inspection requirements."
      ],
      evidenceNeeded: [
        "Material grade",
        "Drawing/CAD or dimensional sketch",
        "Damage depth and photos",
        "Tolerance target",
        "Inspection requirement",
        "Expert review"
      ],
      preliminaryRoute: "Use the RFQ Prompt-to-Structure Converter before asking for feasibility.",
      reviewReadiness: "Not enough information",
      nextAction: "Ask for missing fields and prepare a compact Exafuse-ready review summary.",
      exafuseReviewRoute:
        "Use Exafuse for commercial and technical review after the RFQ facts and gaps are structured.",
      generatedFrom: "LMD Decision Cockpit public-safe RFQ preset"
    })
  }
];

export function getCockpitPreset(id: string | null | undefined) {
  return COCKPIT_PRESETS.find((preset) => preset.id === id);
}

function listMarkdown(items: string[]) {
  return items.length ? items.map((item) => `- ${item}`).join("\n") : "- Not specified.";
}

function section(title: string, body: string | string[]) {
  return [`## ${title}`, Array.isArray(body) ? listMarkdown(body) : body || "Not specified."].join("\n");
}

export function formatDecisionBriefMarkdown(brief: DecisionBrief) {
  return [
    `# ${brief.briefVersion}`,
    "",
    section("Situation", brief.situation),
    "",
    section("Component", brief.component),
    "",
    section("Goal", brief.goal),
    "",
    section("Material", brief.material),
    "",
    section("Geometry / size", brief.geometryOrSize),
    "",
    section("Damage or build area", brief.damageOrBuildArea),
    "",
    section("Available data", brief.availableData),
    "",
    section("Preliminary route", brief.preliminaryRoute),
    "",
    section("Review readiness", brief.reviewReadiness),
    "",
    section("Known facts", brief.knownFacts),
    "",
    section("Missing information", brief.missingInformation),
    "",
    section("Risk flags", brief.riskFlags),
    "",
    section("Evidence needed", brief.evidenceNeeded),
    "",
    section("Next action", brief.nextAction),
    "",
    section("Exafuse review route", brief.exafuseReviewRoute),
    "",
    section("Generated from", brief.generatedFrom),
    "",
    section("Boundary", brief.boundaryStatement),
    "",
    brief.noBackendNote
  ].join("\n");
}

export function formatDecisionBriefJson(brief: DecisionBrief) {
  return JSON.stringify(brief, null, 2);
}

export function formatChecklist(title: string, items: string[]) {
  return [`# ${title}`, "", ...(items.length ? items.map((item) => `- [ ] ${item}`) : ["- [ ] Not specified."])].join("\n");
}

export function formatMissingInformationChecklist(brief: DecisionBrief) {
  return formatChecklist(`${brief.briefVersion} - Missing-information checklist`, brief.missingInformation);
}

export function formatEvidenceNeededChecklist(brief: DecisionBrief) {
  return formatChecklist(`${brief.briefVersion} - Evidence-needed checklist`, brief.evidenceNeeded);
}

export function formatExafuseReviewSummary(brief: DecisionBrief) {
  return [
    `# ${brief.briefVersion} - Exafuse review summary`,
    "",
    `Situation: ${brief.situation}`,
    `Component: ${brief.component}`,
    `Goal: ${brief.goal}`,
    `Material: ${brief.material}`,
    `Geometry / size: ${brief.geometryOrSize}`,
    `Damage or build area: ${brief.damageOrBuildArea}`,
    `Preliminary route: ${brief.preliminaryRoute}`,
    `Review readiness: ${brief.reviewReadiness}`,
    "",
    section("Known facts", brief.knownFacts),
    "",
    section("Missing information", brief.missingInformation),
    "",
    section("Risk flags", brief.riskFlags),
    "",
    section("Evidence needed", brief.evidenceNeeded),
    "",
    `Next action: ${brief.nextAction}`,
    `Exafuse route: ${brief.exafuseReviewRoute}`,
    "",
    brief.boundaryStatement,
    brief.noBackendNote
  ].join("\n");
}

export function formatDecisionBriefTemplateMarkdown() {
  return [
    `# ${BRIEF_VERSION}`,
    "",
    "## Situation",
    "",
    "## Component",
    "",
    "## Goal",
    "",
    "## Material",
    "",
    "## Geometry / size",
    "",
    "## Damage or build area",
    "",
    "## Available data",
    "- ",
    "",
    "## Preliminary route",
    "",
    "## Review readiness",
    "",
    "## Known facts",
    "- ",
    "",
    "## Missing information",
    "- ",
    "",
    "## Risk flags",
    "- ",
    "",
    "## Evidence needed",
    "- ",
    "",
    "## Next action",
    "",
    "## Exafuse review route",
    "",
    "## Boundary",
    BOUNDARY_STATEMENT,
    "",
    NO_BACKEND_NOTE
  ].join("\n");
}
