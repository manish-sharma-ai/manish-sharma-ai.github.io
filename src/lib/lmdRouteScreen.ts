export const ROUTE_FIELDS = [
  "partSize",
  "complexity",
  "jobType",
  "localAddition",
  "tolerance",
  "internalChannels"
] as const;

export type RouteField = (typeof ROUTE_FIELDS)[number];
export type RouteAnswers = Partial<Record<RouteField, string>>;

export interface RouteScreenResult {
  routeSignals: string;
  informationCompleteness: string;
  reviewUrgency: string;
  why: string[];
  missing: string[];
  riskFlags: string[];
  evidenceNeeded: string[];
  suggestedNextStep: string;
}

const fieldLabels: Record<RouteField, string> = {
  partSize: "part size",
  complexity: "geometry complexity",
  jobType: "job type",
  localAddition: "need for local material addition",
  tolerance: "tolerance requirement",
  internalChannels: "internal-channel requirement"
};

export const documentedRouteExample: RouteAnswers = {
  partSize: "large",
  complexity: "low",
  jobType: "repair",
  localAddition: "yes",
  tolerance: "tight",
  internalChannels: "no"
};

export function screenLmdVsPbfRoute(values: RouteAnswers): RouteScreenResult {
  let lmd = 0;
  let pbf = 0;
  const why: string[] = [];
  const riskFlags: string[] = [];
  const answered = ROUTE_FIELDS.filter((field) => Boolean(values[field]));
  const missing = ROUTE_FIELDS.filter((field) => !values[field]).map((field) => fieldLabels[field]);

  if (values.partSize === "large") {
    lmd += 3;
    why.push("Large parts can make local deposition, repair, cladding, or hybrid routes worth examining.");
  }
  if (values.partSize === "small") {
    pbf += 2;
    why.push("Small parts can fit PBF-LB/M build-envelope and economics assumptions more readily.");
  }
  if (values.complexity === "high") {
    pbf += 3;
    why.push("High geometric complexity and fine internal detail can favor PBF-LB/M design freedom.");
  }
  if (values.complexity === "low") {
    lmd += 1;
    why.push("Lower geometry complexity can keep LMD/DED or hybrid manufacturing practical.");
  }
  if (values.jobType === "repair" || values.jobType === "cladding") {
    lmd += 4;
    why.push("Repair and cladding are strong LMD/DED route signals.");
  }
  if (values.jobType === "new build" || values.jobType === "prototype") {
    pbf += 1;
    why.push("New builds and prototypes need a comparison against geometry, batch size, and post-processing.");
  }
  if (values.localAddition === "yes") {
    lmd += 3;
    why.push("A need for local material addition is a strong LMD/DED route signal.");
  }
  if (values.tolerance === "tight") {
    pbf += 1;
    riskFlags.push("Tight tolerance needs a defined post-processing and inspection route.");
  }
  if (values.internalChannels === "yes") {
    pbf += 4;
    why.push("Internal channels often point toward PBF-LB/M design freedom.");
    riskFlags.push("Internal channels are weak LMD/DED signals unless the design changes.");
  }

  const enoughForRouteSignal = answered.length >= 3 && Boolean(values.jobType || values.localAddition || values.complexity);
  const routeGap = Math.abs(lmd - pbf);
  const routeSignals = !enoughForRouteSignal
    ? "Not enough route information to compare LMD/DED and PBF-LB/M."
    : routeGap <= 2
      ? "Balanced route signals; compare LMD/DED, PBF-LB/M, and hybrid options in a detailed assessment."
      : lmd > pbf
        ? "LMD/DED-aligned signals are present; confirm material, geometry, finishing, and inspection before choosing a route."
        : "PBF-LB/M-aligned signals are present; confirm build-envelope, post-processing, and inspection constraints before choosing a route.";

  const informationCompleteness =
    answered.length === 0
      ? "No route inputs selected"
      : answered.length < 3
        ? "Too little information for a route screen"
        : answered.length < ROUTE_FIELDS.length
          ? "Early route screen; complete the remaining inputs"
          : "Ready for detailed assessment";

  const reviewUrgency =
    riskFlags.length > 0
      ? "Needs expert review"
      : answered.length === ROUTE_FIELDS.length
        ? "Detailed assessment can be prepared"
        : "Continue information gathering";

  const evidenceNeeded = [
    "material grade and compatibility context",
    "drawing/CAD or dimensional envelope",
    "tolerance and post-processing plan",
    "inspection requirement linked to part risk"
  ];
  if (values.internalChannels === "yes") evidenceNeeded.push("powder removal and internal-feature inspection plan");
  if (values.jobType === "repair" || values.jobType === "cladding") {
    evidenceNeeded.push("damage depth, repair area, and base-material condition");
  }

  return {
    routeSignals,
    informationCompleteness,
    reviewUrgency,
    why: why.length > 0 ? why : ["No route-specific signals have been selected yet."],
    missing: missing.length > 0 ? missing : ["Core route inputs completed; part-specific engineering information is still required."],
    riskFlags: riskFlags.length > 0 ? riskFlags : ["No route-specific risk flag selected; part-specific data may still change the screen."],
    evidenceNeeded,
    suggestedNextStep:
      enoughForRouteSignal
        ? "Prepare material, geometry, service, tolerance, post-processing, and inspection information for a detailed route assessment."
        : "Select at least three route-relevant inputs, then add material, geometry, service, and inspection context before comparing routes."
  };
}
