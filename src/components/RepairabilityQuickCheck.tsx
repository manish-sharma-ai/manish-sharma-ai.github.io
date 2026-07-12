import { useMemo, useState } from "react";
import DecisionBriefCard from "./DecisionBriefCard";
import { createDecisionBrief } from "../lib/decisionBrief";
import {
  documentedRepairabilityExample,
  emptyRepairabilityAnswers,
  screenRepairability,
  TECHNICAL_RULES,
  type CommercialRule,
  type QualificationRule,
  type TechnicalRule
} from "../lib/repairabilityScreen";

const DISCLAIMER =
  "Preliminary decision-support only. Final feasibility depends on base material, geometry, service conditions, inspection requirements, and expert review.";
const DEFAULT_EXAFUSE_URL = "/contact";
const DEFAULT_EXAFUSE_LABEL = "Contact routes";

const technicalInputs: Array<{ rule: TechnicalRule; label: string }> = [
  { rule: "materialIdentified", label: "Material identified" },
  { rule: "damageCharacterised", label: "Damage localised and characterised" },
  { rule: "physicalAccess", label: "Physical access available" },
  { rule: "postMachiningRoute", label: "Post-machining route possible" },
  { rule: "inspectionRequirements", label: "Inspection requirements known" }
];

const qualificationInputs: Array<{ rule: QualificationRule; label: string }> = [
  { rule: "safetyCriticalService", label: "Safety-critical service" },
  { rule: "uncertainMaterialCondition", label: "Material condition uncertain" },
  { rule: "undefinedAcceptanceCriteria", label: "Acceptance criteria undefined" },
  { rule: "noInspectionRoute", label: "No suitable inspection route" }
];

const commercialInputs: Array<{ rule: CommercialRule; label: string }> = [
  { rule: "replacementCost", label: "Replacement cost is high" },
  { rule: "downtimePressure", label: "Downtime pressure is high" }
];

interface ToolProps {
  exafuseUrl?: string;
  exafuseLabel?: string;
}

export default function RepairabilityQuickCheck({
  exafuseUrl = DEFAULT_EXAFUSE_URL,
  exafuseLabel = DEFAULT_EXAFUSE_LABEL
}: ToolProps) {
  const [answers, setAnswers] = useState(emptyRepairabilityAnswers);
  const result = useMemo(() => screenRepairability(answers), [answers]);

  const toggleTechnical = (rule: TechnicalRule) => {
    setAnswers((current) => ({ ...current, technical: { ...current.technical, [rule]: !current.technical[rule] } }));
  };
  const toggleQualification = (rule: QualificationRule) => {
    setAnswers((current) => ({ ...current, qualification: { ...current.qualification, [rule]: !current.qualification[rule] } }));
  };
  const toggleCommercial = (rule: CommercialRule) => {
    setAnswers((current) => ({ ...current, commercial: { ...current.commercial, [rule]: !current.commercial[rule] } }));
  };

  const knownTechnicalFacts = TECHNICAL_RULES.filter((rule) => answers.technical[rule]).map((rule) =>
    technicalInputs.find((item) => item.rule === rule)?.label ?? rule
  );

  return (
    <div className="tool-panel">
      <div className="grid content-start gap-5">
        <div className="tool-pane-heading">
          <p className="metric-label">Input pane</p>
          <p className="tool-pane-title">Repairability rule groups</p>
          <p className="tool-pane-copy">Technical suitability, qualification burden, and commercial context are kept separate so business pressure cannot raise a technical screening result.</p>
        </div>
        <RuleGroup label="Technical suitability" description="Mark only facts that are known for the candidate." inputs={technicalInputs} values={answers.technical} onToggle={toggleTechnical} />
        <RuleGroup label="Qualification burden" description="These flags increase the evidence and review burden; they do not decide feasibility." inputs={qualificationInputs} values={answers.qualification} onToggle={toggleQualification} />
        <RuleGroup label="Commercial context" description="These inputs can affect urgency or the business case, never technical suitability." inputs={commercialInputs} values={answers.commercial} onToggle={toggleCommercial} />
        <ul className="tool-action-list" aria-label="Repairability input actions">
          <li><button type="button" onClick={() => setAnswers(documentedRepairabilityExample())} className="btn btn-secondary">Load documented example</button></li>
          <li><button type="button" onClick={() => setAnswers(emptyRepairabilityAnswers())} className="btn btn-secondary">Reset to unanswered</button></li>
          <li><button type="button" onClick={() => setAnswers(emptyRepairabilityAnswers())} className="btn btn-secondary">Clear all inputs</button></li>
        </ul>
      </div>
      <aside className="ordered-card-strong tool-output-rail h-fit p-6 md:p-7">
        <div className="tool-pane-heading mb-5">
          <p className="metric-label">Output pane</p>
          <p className="tool-pane-title">Repairability review brief</p>
          <p className="tool-pane-copy">A transparent rule screen for preparing the next technical conversation.</p>
        </div>
        <ResultSection label="Technical screening status" value={result.technicalScreeningStatus} large />
        <ResultList label="Missing technical information" items={result.missingTechnicalInformation} />
        <ResultSection label="Qualification burden" value={result.qualificationBurden} />
        <ResultList label="Qualification flags" items={result.qualificationFlags} />
        <ResultSection label="Commercial urgency" value={result.commercialUrgency} />
        <ResultList label="Commercial context" items={result.commercialContext} />
        <ResultSection label="Recommended next action" value={result.recommendedNextAction} />
        <ResultSection label="Important limitation" value={DISCLAIMER} tone="warning" />
        <DecisionBriefCard
          brief={createDecisionBrief({
            situation: "Preliminary LMD repairability screening.",
            component: "Repair candidate not fully specified in this quick check.",
            goal: "Screen whether the repair question has enough technical information for detailed assessment.",
            material: answers.technical.materialIdentified ? "Material identified; exact grade and condition still need review." : "Material not yet identified.",
            geometryOrSize: answers.technical.physicalAccess ? "Physical access marked available; dimensions and geometry still need confirmation." : "Access and geometry not yet confirmed.",
            damageOrBuildArea: answers.technical.damageCharacterised ? "Damage marked localised and characterised; evidence still needs review." : "Damage location, extent, and depth are not yet defined.",
            availableData: knownTechnicalFacts.length ? knownTechnicalFacts : ["No technical repairability facts selected yet."],
            knownFacts: knownTechnicalFacts.length ? knownTechnicalFacts : ["No technical repairability facts selected yet."],
            missingInformation: result.missingTechnicalInformation,
            missingCritical: result.missingTechnicalInformation,
            missingUseful: result.qualificationFlags,
            missingOptional: result.commercialContext,
            riskFlags: result.qualificationFlags,
            evidenceNeeded: result.missingTechnicalInformation,
            preliminaryRoute: result.technicalScreeningStatus,
            reviewReadiness: result.qualificationBurden,
            nextAction: result.recommendedNextAction,
            exafuseReviewRoute: `${exafuseLabel}. Use Exafuse for commercial and technical review after the repair question is structured.`,
            generatedFrom: "LMD Repairability Rule Screen"
          })}
          eyebrow="Standard artifact"
          exafuseUrl={exafuseUrl}
          exafuseLabel={exafuseLabel}
          matchingToolHref="/tools#repairability-module"
          matchingToolLabel="Open repairability module"
        />
      </aside>
    </div>
  );
}

function RuleGroup<T extends string>({
  label,
  description,
  inputs,
  values,
  onToggle
}: {
  label: string;
  description: string;
  inputs: Array<{ rule: T; label: string }>;
  values: Record<T, boolean>;
  onToggle: (rule: T) => void;
}) {
  return (
    <fieldset className="grid gap-3">
      <legend className="metric-label mb-1">{label}</legend>
      <p className="-mt-1 text-sm leading-6 text-slate-400">{description}</p>
      {inputs.map((input) => (
        <label key={input.rule} className="tool-field grid-cols-[auto_1fr] items-start gap-3 text-sm font-semibold text-slate-200">
          <input type="checkbox" checked={values[input.rule]} onChange={() => onToggle(input.rule)} className="mt-1 accent-cyan-300" />
          <span>{input.label}</span>
        </label>
      ))}
    </fieldset>
  );
}

function ResultSection({ label, value, large = false, tone = "default" }: { label: string; value: string; large?: boolean; tone?: "default" | "warning" }) {
  return (
    <div className="mt-5">
      <p className="text-sm font-bold text-white">{label}:</p>
      <p className={`${tone === "warning" ? "result-card result-card--warning" : "result-card text-slate-300"} mt-2 leading-6 ${large ? "text-2xl font-black text-white" : "text-sm"}`}>{value}</p>
    </div>
  );
}

function ResultList({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="mt-5">
      <p className="text-sm font-bold text-white">{label}:</p>
      <ul className="mt-2 grid gap-2 text-sm text-slate-300">
        {items.map((item) => <li key={item} className="result-card">{item}</li>)}
      </ul>
    </div>
  );
}
