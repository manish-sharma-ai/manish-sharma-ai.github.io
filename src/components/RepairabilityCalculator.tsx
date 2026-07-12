import { useMemo, useState } from "react";
import {
  documentedRepairabilityExample,
  emptyRepairabilityAnswers,
  screenRepairability,
  type CommercialRule,
  type QualificationRule,
  type TechnicalRule
} from "../lib/repairabilityScreen";

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

export default function RepairabilityCalculator() {
  const [answers, setAnswers] = useState(emptyRepairabilityAnswers);
  const result = useMemo(() => screenRepairability(answers), [answers]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="grid gap-6">
        <RuleGroup
          label="Technical suitability"
          description="These are the facts that establish whether a repair candidate can move toward a technical assessment."
          inputs={technicalInputs}
          values={answers.technical}
          onToggle={(rule) => setAnswers((current) => ({ ...current, technical: { ...current.technical, [rule]: !current.technical[rule] } }))}
        />
        <RuleGroup
          label="Qualification burden"
          description="These flags increase the evidence and review burden; they cannot improve technical suitability."
          inputs={qualificationInputs}
          values={answers.qualification}
          onToggle={(rule) => setAnswers((current) => ({ ...current, qualification: { ...current.qualification, [rule]: !current.qualification[rule] } }))}
        />
        <RuleGroup
          label="Commercial context"
          description="Commercial context can affect urgency and the business case, never the technical screening status."
          inputs={commercialInputs}
          values={answers.commercial}
          onToggle={(rule) => setAnswers((current) => ({ ...current, commercial: { ...current.commercial, [rule]: !current.commercial[rule] } }))}
        />
        <div className="flex flex-wrap gap-3">
          <button type="button" className="btn btn-secondary" onClick={() => setAnswers(documentedRepairabilityExample())}>Load documented example</button>
          <button type="button" className="btn btn-secondary" onClick={() => setAnswers(emptyRepairabilityAnswers())}>Reset to unanswered</button>
          <button type="button" className="btn btn-secondary" onClick={() => setAnswers(emptyRepairabilityAnswers())}>Clear all inputs</button>
        </div>
      </div>
      <aside className="ordered-card-strong h-fit p-6">
        <p className="metric-label">Repairability rule screen</p>
        <Result label="Technical screening status" value={result.technicalScreeningStatus} strong />
        <ResultList label="Missing technical information" items={result.missingTechnicalInformation} />
        <Result label="Qualification burden" value={result.qualificationBurden} />
        <ResultList label="Qualification flags" items={result.qualificationFlags} />
        <Result label="Commercial urgency" value={result.commercialUrgency} />
        <ResultList label="Commercial context" items={result.commercialContext} />
        <Result label="Recommended next action" value={result.recommendedNextAction} />
        <p className="mt-6 rounded-md border border-orange-300/25 bg-orange-500/10 p-3 text-sm leading-6 text-orange-100">
          Preliminary decision-support only. Final feasibility depends on base material, geometry, service conditions, inspection requirements, and expert review.
        </p>
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
    <fieldset className="ordered-card grid gap-3 p-5">
      <legend className="metric-label px-1">{label}</legend>
      <p className="text-sm leading-6 text-slate-400">{description}</p>
      {inputs.map((input) => (
        <label key={input.rule} className="flex items-start gap-3 text-sm font-semibold text-slate-200">
          <input type="checkbox" checked={values[input.rule]} onChange={() => onToggle(input.rule)} className="mt-1 accent-cyan-300" />
          <span>{input.label}</span>
        </label>
      ))}
    </fieldset>
  );
}

function Result({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="mt-5">
      <p className="text-sm font-bold text-white">{label}:</p>
      <p className={`result-card mt-2 leading-6 ${strong ? "text-xl font-black text-white" : "text-sm text-slate-300"}`}>{value}</p>
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
