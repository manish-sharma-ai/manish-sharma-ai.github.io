import { useMemo, useState } from "react";
import DecisionBriefCard from "./DecisionBriefCard";
import { createDecisionBrief } from "../lib/decisionBrief";
import {
  documentedRouteExample,
  type RouteAnswers,
  type RouteField,
  screenLmdVsPbfRoute
} from "../lib/lmdRouteScreen";

const DISCLAIMER =
  "Preliminary decision-support only. Final feasibility depends on base material, geometry, service conditions, inspection requirements, and expert review.";
const DEFAULT_EXAFUSE_URL = "/contact";
const DEFAULT_EXAFUSE_LABEL = "Contact routes";

const fields: Array<{ field: RouteField; label: string; options: string[] }> = [
  { field: "partSize", label: "Part size", options: ["small", "medium", "large"] },
  { field: "complexity", label: "Geometry complexity", options: ["low", "medium", "high"] },
  { field: "jobType", label: "Job type", options: ["repair", "new build", "cladding", "prototype"] },
  { field: "localAddition", label: "Need local material addition", options: ["yes", "no"] },
  { field: "tolerance", label: "Tolerance requirement", options: ["loose", "medium", "tight"] },
  { field: "internalChannels", label: "Internal channels", options: ["yes", "no"] }
];

interface ToolProps {
  exafuseUrl?: string;
  exafuseLabel?: string;
}

export default function LmdVsSlmAdvisor({
  exafuseUrl = DEFAULT_EXAFUSE_URL,
  exafuseLabel = DEFAULT_EXAFUSE_LABEL
}: ToolProps) {
  const [values, setValues] = useState<RouteAnswers>({});
  const result = useMemo(() => screenLmdVsPbfRoute(values), [values]);

  const update = (field: RouteField, value: string) => {
    setValues((current) => ({ ...current, [field]: value || undefined }));
  };

  return (
    <div className="tool-panel">
      <div>
        <div className="tool-pane-heading mb-4">
          <p className="metric-label">Input pane</p>
          <p className="tool-pane-title">Route-selection signals</p>
          <p className="tool-pane-copy">Answer only what is known. This rule-based screen does not assume a part size, repair case, or local-deposition need.</p>
        </div>
        <div className="tool-input-grid">
          {fields.map((item) => (
            <Select
              key={item.field}
              label={item.label}
              value={values[item.field] ?? ""}
              options={item.options}
              onChange={(value) => update(item.field, value)}
            />
          ))}
        </div>
        <ul className="tool-action-list mt-5" aria-label="Process route input actions">
          <li><button type="button" onClick={() => setValues(documentedRouteExample)} className="btn btn-secondary">Load documented example</button></li>
          <li><button type="button" onClick={() => setValues({})} className="btn btn-secondary">Reset to unanswered</button></li>
          <li><button type="button" onClick={() => setValues({})} className="btn btn-secondary">Clear all inputs</button></li>
        </ul>
      </div>
      <ToolResult result={result} exafuseUrl={exafuseUrl} exafuseLabel={exafuseLabel} />
    </div>
  );
}

function Select({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="tool-field">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)} className="px-3">
        <option value="">Not answered</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

function ToolResult({
  result,
  exafuseUrl,
  exafuseLabel
}: {
  result: ReturnType<typeof screenLmdVsPbfRoute>;
  exafuseUrl: string;
  exafuseLabel: string;
}) {
  const brief = createDecisionBrief({
    situation: "Process-route comparison between LMD/DED and PBF-LB/M.",
    component: "Part or feature candidate not fully specified in this route screen.",
    goal: "Compare early route signals before committing to LMD/DED, PBF-LB/M, hybrid manufacturing, or review.",
    material: "Material grade still required for a detailed recommendation.",
    geometryOrSize: "The route screen records size, complexity, local-addition, tolerance, and internal-channel signals when supplied.",
    damageOrBuildArea: "Repair, cladding, or build-area context must be clarified in the RFQ.",
    availableData: result.why,
    knownFacts: result.why,
    missingInformation: result.missing,
    missingCritical: result.missing,
    missingUseful: ["batch/economics context", "reference route preference"],
    missingOptional: ["prior manufacturing route"],
    riskFlags: result.riskFlags,
    evidenceNeeded: result.evidenceNeeded,
    preliminaryRoute: result.routeSignals,
    reviewReadiness: result.informationCompleteness,
    nextAction: result.suggestedNextStep,
    exafuseReviewRoute: `${exafuseLabel}. Use Exafuse for commercial and technical review after the route question is structured.`,
    generatedFrom: "LMD vs PBF-LB/M Route Screen"
  });

  return (
    <aside className="ordered-card-strong tool-output-rail h-fit p-6 md:p-7">
      <div className="tool-pane-heading mb-5">
        <p className="metric-label">Output pane</p>
        <p className="tool-pane-title">Process-route brief</p>
        <p className="tool-pane-copy">A transparent rule-based screen for organizing an early route conversation.</p>
      </div>
      <ResultSection label="Route signals" value={result.routeSignals} large />
      <ResultSection label="Information completeness" value={result.informationCompleteness} />
      <ResultSection label="Review urgency" value={result.reviewUrgency} />
      <ResultList label="Why these signals matter" items={result.why} />
      <ResultList label="Missing information" items={result.missing} />
      <ResultList label="Risk flags" items={result.riskFlags} />
      <ResultList label="Evidence needed" items={result.evidenceNeeded} />
      <ResultSection label="Suggested next step" value={result.suggestedNextStep} />
      <ResultSection label="Important limitation" value={DISCLAIMER} tone="warning" />
      <DecisionBriefCard
        brief={brief}
        eyebrow="Standard artifact"
        exafuseUrl={exafuseUrl}
        exafuseLabel={exafuseLabel}
        matchingToolHref="/tools#route-module"
        matchingToolLabel="Open route module"
      />
    </aside>
  );
}

function ResultSection({ label, value, large = false, tone = "default" }: { label: string; value: string; large?: boolean; tone?: "default" | "warning" }) {
  return (
    <div className="mt-5">
      <p className="text-sm font-bold text-white">{label}:</p>
      <p className={`${tone === "warning" ? "result-card result-card--warning" : "result-card text-slate-300"} mt-2 leading-6 ${large ? "text-2xl font-black text-white" : "text-sm"}`}>
        {value}
      </p>
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
