export const TECHNICAL_RULES = [
  "materialIdentified",
  "damageCharacterised",
  "physicalAccess",
  "postMachiningRoute",
  "inspectionRequirements"
] as const;

export const QUALIFICATION_RULES = [
  "safetyCriticalService",
  "uncertainMaterialCondition",
  "undefinedAcceptanceCriteria",
  "noInspectionRoute"
] as const;

export const COMMERCIAL_RULES = ["replacementCost", "downtimePressure"] as const;

export type TechnicalRule = (typeof TECHNICAL_RULES)[number];
export type QualificationRule = (typeof QUALIFICATION_RULES)[number];
export type CommercialRule = (typeof COMMERCIAL_RULES)[number];

export interface RepairabilityAnswers {
  technical: Record<TechnicalRule, boolean>;
  qualification: Record<QualificationRule, boolean>;
  commercial: Record<CommercialRule, boolean>;
}

export interface RepairabilityScreenResult {
  technicalScreeningStatus: string;
  missingTechnicalInformation: string[];
  qualificationBurden: string;
  qualificationFlags: string[];
  commercialUrgency: string;
  commercialContext: string[];
  recommendedNextAction: string;
}

export const emptyRepairabilityAnswers = (): RepairabilityAnswers => ({
  technical: {
    materialIdentified: false,
    damageCharacterised: false,
    physicalAccess: false,
    postMachiningRoute: false,
    inspectionRequirements: false
  },
  qualification: {
    safetyCriticalService: false,
    uncertainMaterialCondition: false,
    undefinedAcceptanceCriteria: false,
    noInspectionRoute: false
  },
  commercial: {
    replacementCost: false,
    downtimePressure: false
  }
});

export const documentedRepairabilityExample = (): RepairabilityAnswers => ({
  technical: {
    materialIdentified: true,
    damageCharacterised: true,
    physicalAccess: true,
    postMachiningRoute: true,
    inspectionRequirements: true
  },
  qualification: {
    safetyCriticalService: false,
    uncertainMaterialCondition: false,
    undefinedAcceptanceCriteria: false,
    noInspectionRoute: false
  },
  commercial: {
    replacementCost: true,
    downtimePressure: true
  }
});

const technicalLabels: Record<TechnicalRule, string> = {
  materialIdentified: "material grade and condition",
  damageCharacterised: "damage location, extent, and depth",
  physicalAccess: "physical access to the repair zone",
  postMachiningRoute: "post-machining route and allowance",
  inspectionRequirements: "inspection requirements and acceptance context"
};

const qualificationLabels: Record<QualificationRule, string> = {
  safetyCriticalService: "Safety-critical service needs formal qualification planning.",
  uncertainMaterialCondition: "Uncertain material condition needs compatibility review.",
  undefinedAcceptanceCriteria: "Acceptance criteria are not yet defined.",
  noInspectionRoute: "No suitable inspection route is defined."
};

export function screenRepairability(input: RepairabilityAnswers): RepairabilityScreenResult {
  const technicalYes = TECHNICAL_RULES.filter((rule) => input.technical[rule]).length;
  const missingTechnicalInformation = TECHNICAL_RULES
    .filter((rule) => !input.technical[rule])
    .map((rule) => technicalLabels[rule]);
  const qualificationFlags = QUALIFICATION_RULES
    .filter((rule) => input.qualification[rule])
    .map((rule) => qualificationLabels[rule]);
  const commercialContext = COMMERCIAL_RULES.filter((rule) => input.commercial[rule]).map((rule) =>
    rule === "replacementCost" ? "Replacement cost may justify a detailed business case." : "Downtime pressure may increase the urgency of the review."
  );

  const technicalScreeningStatus =
    technicalYes === 0
      ? "No technical basis yet"
      : technicalYes <= 2
        ? "Weak technical case; collect core evidence"
        : technicalYes < TECHNICAL_RULES.length
          ? "Partial technical case; close the remaining gaps"
          : "Technically structured for detailed assessment";

  const qualificationBurden =
    qualificationFlags.length >= 2
      ? "High qualification burden"
      : qualificationFlags.length === 1
        ? "Qualification point to resolve"
        : "No qualification burden selected";

  const commercialUrgency =
    commercialContext.length === 2
      ? "High commercial urgency"
      : commercialContext.length === 1
        ? "Commercial context present"
        : "No commercial urgency selected";

  const recommendedNextAction =
    technicalYes === 0
      ? "Identify the material, characterize the damage, and define access, finishing, and inspection before considering repair. Commercial urgency does not establish technical suitability."
      : qualificationFlags.length >= 2
        ? "Prepare a material, inspection, and qualification plan before asking for a detailed repair assessment."
        : technicalYes < TECHNICAL_RULES.length
          ? "Collect the missing technical information, then prepare a structured repair brief for expert review."
          : "Prepare a detailed repair assessment with material evidence, damage documentation, machining plan, inspection route, and service context.";

  return {
    technicalScreeningStatus,
    missingTechnicalInformation:
      missingTechnicalInformation.length > 0 ? missingTechnicalInformation : ["Core technical screening fields are present; part-specific evidence is still required."],
    qualificationBurden,
    qualificationFlags:
      qualificationFlags.length > 0 ? qualificationFlags : ["No qualification burden has been selected; confirm this against the real service case."],
    commercialUrgency,
    commercialContext:
      commercialContext.length > 0 ? commercialContext : ["No commercial context selected. This does not change technical suitability."],
    recommendedNextAction
  };
}
