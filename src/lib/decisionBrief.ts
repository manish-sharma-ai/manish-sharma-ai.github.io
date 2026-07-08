export const BRIEF_VERSION = "LMD Decision Brief v1.0";
export const BRIEF_ARTIFACT_TYPE = "LMD Decision Brief";
export const BRIEF_STATUS = "Preliminary decision support";
export const BRIEF_PREPARED_FOR = "Expert review / RFQ discussion";
export const BRIEF_NOT_VALID_FOR = ["approval", "certification", "release", "safety-critical acceptance", "quality guarantee"];

export const BOUNDARY_STATEMENT =
  "Confidence is not approval. Preliminary decision-support only. Final feasibility depends on base material, geometry, service conditions, inspection requirements, and expert review.";

export const NO_BACKEND_NOTE = "No backend. No data sent by this site.";
export const NO_AUTOMATIC_SENDING_NOTE = "No automatic sending. Nothing is sent unless you send it from your own email client.";

export const BRIEF_COMPLETENESS_NOTE =
  "Completeness describes whether the brief can support a useful conversation. It is not feasibility, approval, or release evidence.";

export const EVIDENCE_BURDEN_NOTE = "Evidence burden is a planning label, not release approval.";

export const GERMAN_BRIEF_BOUNDARY =
  "Entscheidungshilfe, keine technische Freigabe. Prozesssignale sind kein Qualitätsnachweis. Die endgültige Bewertung erfordert Fachprüfung, Inspektion und geeignete Nachweise.";

export type BriefCompleteness =
  | "Too vague for useful review"
  | "Ready for preliminary discussion"
  | "Ready for expert review package"
  | "Requires formal inspection / qualification planning";

export type ExpertReviewPackageStatus =
  | "Not ready"
  | "Partially ready"
  | "Ready for expert review"
  | "Requires formal qualification planning";

export type EvidenceBurden =
  | "Low screening burden"
  | "Moderate review burden"
  | "High inspection burden"
  | "Formal qualification burden";

export interface DecisionBrief {
  briefVersion: typeof BRIEF_VERSION;
  artifactType: typeof BRIEF_ARTIFACT_TYPE;
  status: typeof BRIEF_STATUS;
  preparedFor: typeof BRIEF_PREPARED_FOR;
  notValidFor: string[];
  outputMode: string;
  situation: string;
  component: string;
  goal: string;
  material: string;
  geometryOrSize: string;
  damageOrBuildArea: string;
  availableData: string[];
  knownFacts: string[];
  missingInformation: string[];
  missingCritical: string[];
  missingUseful: string[];
  missingOptional: string[];
  riskFlags: string[];
  evidenceNeeded: string[];
  preliminaryRoute: string;
  reviewReadiness: string;
  briefCompleteness: BriefCompleteness;
  expertReviewPackageStatus: ExpertReviewPackageStatus;
  completenessNote: typeof BRIEF_COMPLETENESS_NOTE;
  evidenceBurden: EvidenceBurden;
  evidenceBurdenNote: typeof EVIDENCE_BURDEN_NOTE;
  nextAction: string;
  exafuseReviewRoute: string;
  boundaryStatement: string;
  generatedFrom: string;
  createdAt?: string;
  noBackendNote: string;
  noAutomaticSendingNote: string;
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

type BriefInput = Partial<
  Omit<
    DecisionBrief,
    | "briefVersion"
    | "artifactType"
    | "status"
    | "preparedFor"
    | "notValidFor"
    | "boundaryStatement"
    | "noBackendNote"
    | "noAutomaticSendingNote"
    | "completenessNote"
    | "evidenceBurdenNote"
  >
>;

function asList(items?: string[]) {
  return items?.filter(Boolean) ?? [];
}

function unique(items: string[]) {
  return [...new Set(items.map((item) => item.trim()).filter(Boolean))];
}

function includesAny(value: string, needles: string[]) {
  const lower = value.toLowerCase();
  return needles.some((needle) => lower.includes(needle));
}

function groupMissingInformation(items: string[], riskFlags: string[]) {
  const criticalTerms = [
    "exact material grade",
    "material grade",
    "damage depth",
    "geometry",
    "drawing",
    "cad",
    "dimensions",
    "service conditions",
    "operating conditions",
    "inspection requirement",
    "inspection path",
    "acceptance criteria"
  ];
  const usefulTerms = ["photos", "deadline", "downtime", "machining allowance", "post-machining", "tolerance", "finishing"];
  const criticalRisk = riskFlags.some((risk) =>
    includesAny(risk, ["safety-critical", "safety critical", "no inspection", "unknown material", "crack", "qualification"])
  );

  const missingCritical = items.filter((item) => includesAny(item, criticalTerms));
  const missingUseful = items.filter((item) => !missingCritical.includes(item) && includesAny(item, usefulTerms));
  const missingOptional = items.filter((item) => !missingCritical.includes(item) && !missingUseful.includes(item));

  if (criticalRisk && !missingCritical.some((item) => includesAny(item, ["inspection", "qualification"]))) {
    missingCritical.push("Inspection requirement for safety-critical or high-risk cases");
  }

  return {
    missingCritical: unique(missingCritical),
    missingUseful: unique(missingUseful),
    missingOptional: unique(missingOptional)
  };
}

function inferBriefCompleteness({
  missingCritical,
  missingUseful,
  riskFlags,
  knownFacts
}: {
  missingCritical: string[];
  missingUseful: string[];
  riskFlags: string[];
  knownFacts: string[];
}): BriefCompleteness {
  if (riskFlags.some((risk) => includesAny(risk, ["safety-critical", "safety critical", "no inspection", "qualification"]))) {
    return "Requires formal inspection / qualification planning";
  }
  if (knownFacts.length === 0 || knownFacts.some((fact) => fact.toLowerCase().includes("no concrete"))) {
    return "Too vague for useful review";
  }
  if (missingCritical.length > 0 || missingUseful.length > 2) {
    return "Ready for preliminary discussion";
  }
  return "Ready for expert review package";
}

function inferExpertReviewPackageStatus({
  missingCritical,
  missingUseful,
  riskFlags
}: {
  missingCritical: string[];
  missingUseful: string[];
  riskFlags: string[];
}): ExpertReviewPackageStatus {
  if (riskFlags.some((risk) => includesAny(risk, ["safety-critical", "safety critical", "no inspection", "qualification"]))) {
    return "Requires formal qualification planning";
  }
  if (missingCritical.length > 0) return "Not ready";
  if (missingUseful.length > 0 || riskFlags.length > 1) return "Partially ready";
  return "Ready for expert review";
}

function inferEvidenceBurden({
  missingCritical,
  riskFlags,
  evidenceNeeded,
  situation
}: {
  missingCritical: string[];
  riskFlags: string[];
  evidenceNeeded: string[];
  situation: string;
}): EvidenceBurden {
  const combined = [...riskFlags, ...evidenceNeeded, situation].join(" | ");
  if (includesAny(combined, ["safety-critical", "safety critical", "qualification", "acceptance", "release criteria"])) {
    return "Formal qualification burden";
  }
  if (
    missingCritical.length >= 3 ||
    includesAny(combined, ["unknown material", "no inspection", "tight tolerance", "crack", "monitoring", "anomaly"])
  ) {
    return "High inspection burden";
  }
  if (missingCritical.length > 0 || riskFlags.length > 1) {
    return "Moderate review burden";
  }
  return "Low screening burden";
}

export function createDecisionBrief(input: BriefInput): DecisionBrief {
  const knownFacts = asList(input.knownFacts);
  const inputMissing = asList(input.missingInformation);
  const riskFlags = asList(input.riskFlags);
  const evidenceNeeded = asList(input.evidenceNeeded);
  const hasGroupedMissing =
    asList(input.missingCritical).length > 0 ||
    asList(input.missingUseful).length > 0 ||
    asList(input.missingOptional).length > 0;
  const groupedMissing = hasGroupedMissing
    ? {
        missingCritical: asList(input.missingCritical),
        missingUseful: asList(input.missingUseful),
        missingOptional: asList(input.missingOptional)
      }
    : groupMissingInformation(inputMissing, riskFlags);
  const missingInformation = unique([
    ...groupedMissing.missingCritical,
    ...groupedMissing.missingUseful,
    ...groupedMissing.missingOptional,
    ...inputMissing
  ]);
  const situation = input.situation ?? "LMD/DED question not yet structured.";
  const briefCompleteness =
    input.briefCompleteness ??
    inferBriefCompleteness({
      missingCritical: groupedMissing.missingCritical,
      missingUseful: groupedMissing.missingUseful,
      riskFlags,
      knownFacts
    });
  const evidenceBurden =
    input.evidenceBurden ??
    inferEvidenceBurden({
      missingCritical: groupedMissing.missingCritical,
      riskFlags,
      evidenceNeeded,
      situation
    });
  const expertReviewPackageStatus =
    input.expertReviewPackageStatus ??
    inferExpertReviewPackageStatus({
      missingCritical: groupedMissing.missingCritical,
      missingUseful: groupedMissing.missingUseful,
      riskFlags
    });

  return {
    briefVersion: BRIEF_VERSION,
    artifactType: BRIEF_ARTIFACT_TYPE,
    status: BRIEF_STATUS,
    preparedFor: BRIEF_PREPARED_FOR,
    notValidFor: [...BRIEF_NOT_VALID_FOR],
    outputMode: input.outputMode ?? "Technical Decision Brief",
    situation,
    component: input.component ?? "Component not yet specified.",
    goal: input.goal ?? "Clarify whether LMD/DED, repair, cladding, or another route is worth expert review.",
    material: input.material ?? "Material not yet specified.",
    geometryOrSize: input.geometryOrSize ?? "Geometry or size not yet specified.",
    damageOrBuildArea: input.damageOrBuildArea ?? "Damage or build area not yet specified.",
    availableData: asList(input.availableData),
    knownFacts,
    missingInformation,
    missingCritical: unique(groupedMissing.missingCritical),
    missingUseful: unique(groupedMissing.missingUseful),
    missingOptional: unique(groupedMissing.missingOptional),
    riskFlags,
    evidenceNeeded,
    preliminaryRoute: input.preliminaryRoute ?? "Structure the question before choosing a process route.",
    reviewReadiness: input.reviewReadiness ?? "Not enough information",
    briefCompleteness,
    expertReviewPackageStatus,
    completenessNote: BRIEF_COMPLETENESS_NOTE,
    evidenceBurden,
    evidenceBurdenNote: EVIDENCE_BURDEN_NOTE,
    nextAction: input.nextAction ?? "Collect missing information and prepare a bounded review package.",
    exafuseReviewRoute:
      input.exafuseReviewRoute ??
      "Use Exafuse for commercial and technical review after the question is structured.",
    boundaryStatement: BOUNDARY_STATEMENT,
    generatedFrom: input.generatedFrom ?? "Manish Sharma Lab decision-support resource",
    createdAt: input.createdAt,
    noBackendNote: NO_BACKEND_NOTE,
    noAutomaticSendingNote: NO_AUTOMATIC_SENDING_NOTE
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
  missingCritical: [
    "Exact material grade",
    "CAD/drawing",
    "Damage depth",
    "Dimensions",
    "Operating conditions",
    "Inspection requirement"
  ],
  missingUseful: ["Deadline", "Machining allowance"],
  missingOptional: ["Prior repair history", "Reference part"],
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
  briefCompleteness: "Ready for preliminary discussion",
  expertReviewPackageStatus: "Not ready",
  evidenceBurden: "High inspection burden",
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
      missingCritical: [
        "Linked track/layer/part record",
        "Inspection result",
        "Acceptance criteria"
      ],
      missingUseful: ["Sensor context", "Calibration context"],
      missingOptional: ["Prior signal history"],
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
      reviewReadiness: "Requires formal inspection / qualification planning",
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
      missingCritical: [
        "Exact material grade",
        "Coating function",
        "Wear/corrosion/heat duty",
        "Inspection requirement"
      ],
      missingUseful: ["Surface area dimensions", "Finishing requirement"],
      missingOptional: ["Prior repair history"],
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
      missingCritical: ["Exact material grade", "Feature dimensions", "Inspection requirement"],
      missingUseful: ["Post-processing plan"],
      missingOptional: ["Batch/economics context", "Reference part"],
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
      missingCritical: [
        "Exact material grade",
        "Damage depth",
        "Drawing/CAD",
        "Dimensions",
        "Operating conditions",
        "Inspection requirement"
      ],
      missingUseful: ["Photos", "Tolerance", "Deadline"],
      missingOptional: ["Prior repair history", "Budget estimate", "Reference part"],
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

function groupedMissingMarkdown(brief: DecisionBrief) {
  return [
    "### Critical gaps",
    listMarkdown(brief.missingCritical),
    "",
    "### Useful gaps",
    listMarkdown(brief.missingUseful),
    "",
    "### Optional context",
    listMarkdown(brief.missingOptional)
  ].join("\n");
}

function notValidForText(items: string[]) {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")}, or ${items[items.length - 1]}`;
}

function briefStandardHeader(brief: DecisionBrief, title: string = brief.artifactType) {
  return [
    `# ${brief.briefVersion}`,
    "",
    title,
    `Status: ${brief.status}`,
    `Prepared for: ${brief.preparedFor}`,
    `Not valid for: ${notValidForText(brief.notValidFor)}`
  ].join("\n");
}

function briefMetadataMarkdown(brief: DecisionBrief) {
  return [
    "Generated from: " + brief.generatedFrom,
    "Mode: " + brief.outputMode,
    "No backend: " + brief.noBackendNote,
    "No automatic sending: " + brief.noAutomaticSendingNote,
    "Boundary: " + brief.boundaryStatement
  ];
}

function howToUseBriefMarkdown() {
  return [
    "Use it to prepare a useful RFQ or expert-review conversation.",
    "Treat completeness and evidence burden as planning labels, not a result.",
    "Resolve critical gaps before treating the package as review-ready.",
    "Route commercial/company review to Exafuse when a real part or RFQ is involved."
  ];
}

export function formatTechnicalDecisionBrief(brief: DecisionBrief) {
  return [
    briefStandardHeader(brief, "Technical Decision Brief"),
    "",
    section("Metadata", briefMetadataMarkdown(brief)),
    "",
    section("How to use this brief", howToUseBriefMarkdown()),
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
    section("Brief completeness", `${brief.briefCompleteness}\n\n${brief.completenessNote}`),
    "",
    section("Expert-review package status", brief.expertReviewPackageStatus),
    "",
    section("Evidence burden", `${brief.evidenceBurden}\n\n${brief.evidenceBurdenNote}`),
    "",
    section("Known facts", brief.knownFacts),
    "",
    "## Missing information",
    groupedMissingMarkdown(brief),
    "",
    section("Risk flags", brief.riskFlags),
    "",
    section("Evidence needed", brief.evidenceNeeded),
    "",
    section("Next action", brief.nextAction),
    "",
    section("Exafuse review route", brief.exafuseReviewRoute),
    "",
    section("Boundary", `${brief.boundaryStatement}\n\n${brief.noBackendNote}\n\n${brief.noAutomaticSendingNote}`)
  ].join("\n");
}

export function formatDecisionBriefMarkdown(brief: DecisionBrief) {
  return formatTechnicalDecisionBrief(brief);
}

export function formatDecisionBriefJson(brief: DecisionBrief) {
  return JSON.stringify(
    {
      briefVersion: brief.briefVersion,
      artifactType: brief.artifactType,
      status: brief.status,
      notValidFor: brief.notValidFor,
      outputMode: "JSON handoff",
      boundaryStatement: brief.boundaryStatement,
      noBackendNote: brief.noBackendNote,
      noAutomaticSendingNote: brief.noAutomaticSendingNote,
      brief: { ...brief, outputMode: "JSON handoff" }
    },
    null,
    2
  );
}

export function formatChecklist(title: string, items: string[]) {
  return [`# ${title}`, "", ...(items.length ? items.map((item) => `- [ ] ${item}`) : ["- [ ] Not specified."])].join("\n");
}

export function formatMissingInformationChecklist(brief: DecisionBrief) {
  return [
    `# ${brief.briefVersion} - Missing-information checklist`,
    "",
    "## Critical gaps",
    ...(brief.missingCritical.length ? brief.missingCritical.map((item) => `- [ ] ${item}`) : ["- [ ] Not specified."]),
    "",
    "## Useful gaps",
    ...(brief.missingUseful.length ? brief.missingUseful.map((item) => `- [ ] ${item}`) : ["- [ ] Not specified."]),
    "",
    "## Optional context",
    ...(brief.missingOptional.length ? brief.missingOptional.map((item) => `- [ ] ${item}`) : ["- [ ] Not specified."]),
    "",
    brief.completenessNote
  ].join("\n");
}

export function formatEvidenceNeededChecklist(brief: DecisionBrief) {
  return [
    formatChecklist(`${brief.briefVersion} - Evidence-needed checklist`, brief.evidenceNeeded),
    "",
    `Evidence burden: ${brief.evidenceBurden}`,
    brief.evidenceBurdenNote
  ].join("\n");
}

export function formatExafuseReviewSummary(brief: DecisionBrief) {
  return [
    briefStandardHeader({ ...brief, outputMode: "Exafuse review summary" }, "Exafuse review summary"),
    "",
    `Situation: ${brief.situation}`,
    `Component: ${brief.component}`,
    `Goal: ${brief.goal}`,
    `Material: ${brief.material}`,
    `Geometry / size: ${brief.geometryOrSize}`,
    `Damage or build area: ${brief.damageOrBuildArea}`,
    `Preliminary route: ${brief.preliminaryRoute}`,
    `Review readiness: ${brief.reviewReadiness}`,
    `Brief completeness: ${brief.briefCompleteness}`,
    `Expert-review package status: ${brief.expertReviewPackageStatus}`,
    `Evidence burden: ${brief.evidenceBurden}`,
    "",
    section("Known facts", brief.knownFacts),
    "",
    "## Missing information",
    groupedMissingMarkdown(brief),
    "",
    section("Risk flags", brief.riskFlags),
    "",
    section("Evidence needed", brief.evidenceNeeded),
    "",
    `Next action: ${brief.nextAction}`,
    `Exafuse route: ${brief.exafuseReviewRoute}`,
    "",
    brief.boundaryStatement,
    brief.noBackendNote,
    brief.noAutomaticSendingNote
  ].join("\n");
}

export function formatExafuseEmailDraft(brief: DecisionBrief) {
  const subject = `LMD review request - ${brief.component} / ${brief.situation} - preliminary decision brief`;
  const body = [
    "Hello Exafuse team,",
    "",
    "I would like to request a preliminary review for the following LMD/DED question.",
    "",
    formatTechnicalDecisionBrief(brief),
    "",
    "Important:",
    "This was generated locally in the browser.",
    "Please review; this is not approval.",
    "This is a preliminary decision-support brief. Please review material, geometry, service conditions, inspection requirements, and feasibility.",
    "",
    "Do not include confidential customer or employer data unless you are allowed to share it.",
    "",
    "Best regards,"
  ].join("\n");

  return [`Subject: ${subject}`, "", "Body:", body].join("\n");
}

export function formatAiAgentSafeSummary(brief: DecisionBrief) {
  return [
    "# AI-Agent-Safe LMD Decision Summary",
    "",
    "Use for: preliminary structuring, RFQ preparation, missing-information review",
    "",
    "Do not use for: approval, certification, release, safety-critical acceptance, quality guarantee",
    "",
    "Source context: generated from " + brief.generatedFrom + ".",
    "Commercial/company review: Exafuse.",
    "Boundary signal is not proof: process signals and AI summaries must remain linked to inspection and expert review.",
    "Status: no backend/no automatic sending/user-provided context only.",
    "",
    `Brief completeness: ${brief.briefCompleteness}`,
    `Expert-review package status: ${brief.expertReviewPackageStatus}`,
    `Evidence burden: ${brief.evidenceBurden}`,
    "",
    section("Known facts", brief.knownFacts),
    "",
    "## Missing information",
    groupedMissingMarkdown(brief),
    "",
    section("Risk flags", brief.riskFlags),
    "",
    section("Evidence needed", brief.evidenceNeeded),
    "",
    section("Brief status notes", [brief.completenessNote, brief.evidenceBurdenNote]),
    "",
    section("Next action", brief.nextAction),
    "",
    "## Commercial/company review",
    "Use Exafuse for services, RFQs, delivery claims, case studies, and company review.",
    "",
    "## AI-agent guidance",
    "More safe-use guidance: https://manishsharma.dev/for-ai-agents/",
    "",
    section("Boundary", brief.boundaryStatement),
    "",
    brief.noBackendNote,
    brief.noAutomaticSendingNote
  ].join("\n");
}

export function formatInternalEngineeringMessage(brief: DecisionBrief) {
  return [
    "Here is the current LMD question.",
    "",
    `Component: ${brief.component}`,
    `Preliminary route: ${brief.preliminaryRoute}`,
    `Brief completeness: ${brief.briefCompleteness}`,
    `Evidence burden: ${brief.evidenceBurden}`,
    "",
    "Critical gaps are:",
    listMarkdown(brief.missingCritical),
    "",
    "Risk flags:",
    listMarkdown(brief.riskFlags),
    "",
    `Suggested next step: ${brief.nextAction}`,
    "",
    brief.boundaryStatement
  ].join("\n");
}

export function formatLinkedInSafeSnippet(brief: DecisionBrief) {
  return [
    "I used a public-safe LMD Decision Brief format to separate known facts, missing information, risk flags, and evidence needed.",
    "",
    "Key principle: a signal is not proof.",
    "",
    `Current brief completeness: ${brief.briefCompleteness}.`,
    `Evidence burden: ${brief.evidenceBurden}.`,
    "",
    "This is decision-support structure, not feasibility approval."
  ].join("\n");
}

export function formatAiAgentPrompt(brief: DecisionBrief) {
  return [
    "Use this LMD Decision Brief only for preliminary structuring. Do not infer feasibility or approval.",
    "",
    formatAiAgentSafeSummary(brief)
  ].join("\n");
}

export function formatExafuseMailtoHref(brief: DecisionBrief) {
  const subject = `LMD review request - ${brief.component} / ${brief.situation} - preliminary decision brief`;
  const body = formatExafuseEmailDraft(brief).replace(/^Subject:.*\n\nBody:\n/, "");
  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function formatDecisionBriefTemplateMarkdown() {
  return [
    `# ${BRIEF_VERSION}`,
    "",
    "Technical Decision Brief",
    `Status: ${BRIEF_STATUS}`,
    `Prepared for: ${BRIEF_PREPARED_FOR}`,
    `Not valid for: ${notValidForText(BRIEF_NOT_VALID_FOR)}`,
    "",
    "## Metadata",
    "- Generated from: Blank LMD Decision Brief starter",
    "- Mode: Technical Decision Brief",
    `- No backend: ${NO_BACKEND_NOTE}`,
    `- No automatic sending: ${NO_AUTOMATIC_SENDING_NOTE}`,
    `- Boundary: ${BOUNDARY_STATEMENT}`,
    "",
    "## How to use this brief",
    listMarkdown(howToUseBriefMarkdown()),
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
    "## Brief completeness",
    "Too vague for useful review / Ready for preliminary discussion / Ready for expert review package / Requires formal inspection / qualification planning",
    "",
    BRIEF_COMPLETENESS_NOTE,
    "",
    "## Expert-review package status",
    "Not ready / Partially ready / Ready for expert review / Requires formal qualification planning",
    "",
    "## Evidence burden",
    "Low screening burden / Moderate review burden / High inspection burden / Formal qualification burden",
    "",
    EVIDENCE_BURDEN_NOTE,
    "",
    "## Known facts",
    "- ",
    "",
    "## Missing information",
    "### Critical gaps",
    "- ",
    "",
    "### Useful gaps",
    "- ",
    "",
    "### Optional context",
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
    NO_BACKEND_NOTE,
    "",
    NO_AUTOMATIC_SENDING_NOTE
  ].join("\n");
}

export function formatGermanDecisionBriefTemplateMarkdown() {
  return [
    "# LMD-Entscheidungsbrief v1.0",
    "",
    "Status: Vorläufige Entscheidungshilfe",
    "Geeignet für: Vorbereitung von Fachprüfung / RFQ-Gespräch",
    "Nicht geeignet für: Freigabe, Zertifizierung, Bauteilabnahme oder sicherheitskritische Entscheidung",
    "",
    "## Ausgangssituation",
    "",
    "## Bauteil",
    "",
    "## Ziel",
    "",
    "## Material",
    "",
    "## Vorhandene Daten",
    "- ",
    "",
    "## Fehlende Informationen",
    "- ",
    "",
    "## Risiken",
    "- ",
    "",
    "## Benötigte Nachweise",
    "- ",
    "",
    "## Nächster Schritt",
    "",
    "## Exafuse-Prüfroute",
    "",
    "## Grenze",
    GERMAN_BRIEF_BOUNDARY
  ].join("\n");
}
