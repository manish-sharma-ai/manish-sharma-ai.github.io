import { useMemo, useState } from "react";
import DecisionBriefCard from "./DecisionBriefCard";
import { createDecisionBrief } from "../lib/decisionBrief";

const DISCLAIMER =
  "Preliminary decision-support only. Final feasibility depends on base material, geometry, service conditions, inspection requirements, and expert review.";
const DEFAULT_EXAFUSE_URL = "/contact";
const DEFAULT_EXAFUSE_LABEL = "Contact routes";

const defaults = {
  partSize: "medium",
  complexity: "medium",
  jobType: "repair",
  localAddition: "yes",
  tolerance: "medium",
  internalChannels: "no"
};

const exampleValues = {
  partSize: "large",
  complexity: "low",
  jobType: "repair",
  localAddition: "yes",
  tolerance: "tight",
  internalChannels: "no"
};

interface ToolProps {
  exafuseUrl?: string;
  exafuseLabel?: string;
}

export default function LmdVsSlmAdvisor({
  exafuseUrl = DEFAULT_EXAFUSE_URL,
  exafuseLabel = DEFAULT_EXAFUSE_LABEL
}: ToolProps) {
  const [values, setValues] = useState(defaults);

  const result = useMemo(() => {
    let lmd = 0;
    let slm = 0;
    const why: string[] = [];
    const riskFlags: string[] = [];

    if (values.partSize === "large") {
      lmd += 3;
      why.push("Large parts often favor local deposition, repair, cladding, or hybrid routes.");
    }
    if (values.partSize === "small") {
      slm += 2;
      why.push("Small parts can fit powder-bed routes more easily when geometry and economics align.");
    }
    if (values.complexity === "high") {
      slm += 3;
      why.push("High geometric complexity and fine internal detail often favor SLM/LPBF.");
    }
    if (values.complexity === "low") {
      lmd += 1;
      why.push("Lower geometry complexity can make LMD or hybrid manufacturing practical.");
    }
    if (values.jobType === "repair" || values.jobType === "cladding") {
      lmd += 4;
      why.push("Repair and cladding are strong LMD signals.");
    }
    if (values.jobType === "new build" || values.jobType === "prototype") {
      slm += 1;
      why.push("New builds and prototypes need a process comparison against geometry, batch size, and post-processing.");
    }
    if (values.localAddition === "yes") {
      lmd += 3;
      why.push("Local material addition is one of the strongest LMD signals.");
    }
    if (values.tolerance === "tight") {
      slm += 1;
      riskFlags.push("Tight tolerance requires a defined post-processing and inspection route.");
    }
    if (values.internalChannels === "yes") {
      slm += 4;
      why.push("Internal channels and powder-bed design freedom often point toward SLM/LPBF.");
      riskFlags.push("Internal channels are usually weak signals for LMD unless the design changes.");
    }

    const missing = ["material grade", "part drawing or CAD", "service conditions", "inspection requirement"];
    if (values.tolerance === "tight") missing.push("post-machining plan");
    if (values.jobType === "repair" || values.jobType === "cladding") missing.push("damage depth and repair area");
    const routeGap = Math.abs(lmd - slm);
    const recommendation =
      missing.length > 5 && routeGap <= 2
        ? "Insufficient information for a route preference; build a structured RFQ first."
        : routeGap <= 2
          ? "Balanced route signals; compare LMD/DED, PBF-LB/M, and hybrid options with expert review."
          : lmd > slm
            ? "LMD/DED-aligned signals are present; confirm material, geometry, finishing, and inspection before choosing a route."
            : "PBF-LB/M-aligned signals are present; confirm powder-bed constraints, post-processing, and inspection before choosing a route.";
    const evidenceNeeded = [
      "material grade and compatibility context",
      "drawing/CAD or dimensional envelope",
      "tolerance and post-processing plan",
      "inspection requirement linked to part risk"
    ];
    if (values.internalChannels === "yes") evidenceNeeded.push("powder removal and internal-feature inspection plan");
    if (values.jobType === "repair" || values.jobType === "cladding") evidenceNeeded.push("damage depth, repair area, and base-material condition");
    const reviewReadiness =
      riskFlags.length > 1 || values.tolerance === "tight"
        ? "Ready for expert review"
        : missing.length > 4
          ? "Not enough information"
          : "Ready for preliminary discussion";

    return {
      recommendation,
      why:
        why.length > 0
          ? why
          : ["The selected signals are balanced; process choice depends on material, geometry, economics, post-processing, and inspection."],
      missing,
      riskFlags: riskFlags.length > 0 ? riskFlags : ["No major risk flag from the selected inputs; missing RFQ data may still change the result."],
      evidenceNeeded,
      reviewReadiness,
      suggestedNextStep:
        "Prepare a structured RFQ with material grade, CAD or drawing, operating conditions, tolerance target, inspection expectations, and the reason LMD or SLM is being considered."
    };
  }, [values]);

  return (
    <div className="tool-panel">
      <div>
        <div className="tool-pane-heading mb-4">
          <p className="metric-label">Input pane</p>
          <p className="tool-pane-title">Route-selection signals</p>
          <p className="tool-pane-copy">Adjust the early process signals. The output stays conservative until material, geometry, tolerance, and inspection context are clear.</p>
        </div>
        <div className="tool-input-grid">
          <Select label="Part size" value={values.partSize} options={["small", "medium", "large"]} onChange={(value) => setValues({ ...values, partSize: value })} />
          <Select label="Geometry complexity" value={values.complexity} options={["low", "medium", "high"]} onChange={(value) => setValues({ ...values, complexity: value })} />
          <Select label="Job type" value={values.jobType} options={["repair", "new build", "cladding", "prototype"]} onChange={(value) => setValues({ ...values, jobType: value })} />
          <Select label="Need local material addition" value={values.localAddition} options={["yes", "no"]} onChange={(value) => setValues({ ...values, localAddition: value })} />
          <Select label="Tolerance requirement" value={values.tolerance} options={["loose", "medium", "tight"]} onChange={(value) => setValues({ ...values, tolerance: value })} />
          <Select label="Internal channels" value={values.internalChannels} options={["yes", "no"]} onChange={(value) => setValues({ ...values, internalChannels: value })} />
        </div>
        <ul className="tool-action-list mt-5" aria-label="Process route input actions">
          <li><button type="button" onClick={() => setValues(exampleValues)} className="btn btn-secondary">Use example</button></li>
          <li><button type="button" onClick={() => setValues(defaults)} className="btn btn-secondary">Reset</button></li>
          <li><button type="button" onClick={() => setValues(defaults)} className="btn btn-secondary">Clear all inputs</button></li>
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
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="px-3"
      >
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function ToolResult({
  result,
  exafuseUrl,
  exafuseLabel
}: {
  result: {
    recommendation: string;
    why: string[];
    missing: string[];
    riskFlags: string[];
    evidenceNeeded: string[];
    reviewReadiness: string;
    suggestedNextStep: string;
  };
  exafuseUrl: string;
  exafuseLabel: string;
}) {
  const brief = createDecisionBrief({
    situation: "Process-route comparison between LMD/DED and SLM/LPBF.",
    component: "Part or feature candidate not fully specified in this quick advisor.",
    goal: "Compare early process-selection signals before committing to LMD, SLM/LPBF, hybrid manufacturing, or review.",
    material: "Material grade still required for any serious recommendation.",
    geometryOrSize: "Advisor inputs cover part size, complexity, local addition, tolerance, and internal-channel signals.",
    damageOrBuildArea: "Route-selection context; repair/cladding/build area must be clarified in the RFQ.",
    availableData: result.why,
    knownFacts: result.why,
    missingInformation: result.missing,
    missingCritical: result.missing.filter((item) =>
      ["material grade", "part drawing", "CAD", "service conditions", "inspection requirement"].some((term) =>
        item.toLowerCase().includes(term.toLowerCase())
      )
    ),
    missingUseful: result.missing.filter((item) =>
      ["post-machining", "damage depth", "repair area"].some((term) => item.toLowerCase().includes(term.toLowerCase()))
    ),
    missingOptional: ["batch/economics context", "reference route preference"],
    riskFlags: result.riskFlags,
    evidenceNeeded: result.evidenceNeeded,
    preliminaryRoute: result.recommendation,
    reviewReadiness: result.reviewReadiness,
    nextAction: result.suggestedNextStep,
    exafuseReviewRoute: `${exafuseLabel}. Use Exafuse for commercial and technical review after the route question is structured.`,
    generatedFrom: "LMD vs SLM Advisor"
  });

  return (
    <aside className="ordered-card-strong tool-output-rail h-fit p-6 md:p-7">
      <div className="tool-pane-heading mb-5">
        <p className="metric-label">Output pane</p>
        <p className="tool-pane-title">Process-route brief</p>
        <p className="tool-pane-copy">This is a rule-based route screen. Use it as a first signal, then validate the real part context through expert review.</p>
      </div>
      <p className="metric-label">Advisor output</p>
      <p className="mt-3 rounded-lg border border-amber-300/25 bg-amber-400/10 p-3 text-sm font-bold text-amber-50">
        Confidence is not approval. This output is a route signal, not a release decision.
      </p>
      <ResultSection label="Decision signal" value={result.recommendation} large />
      <ResultSection label="Review readiness" value={result.reviewReadiness} />
      <ResultList label="Why" items={result.why} />
      <ResultList label="Missing information" items={result.missing} />
      <ResultList label="Risk flags" items={result.riskFlags} />
      <ResultList label="Evidence needed" items={result.evidenceNeeded} />
      <ResultSection label="Next action" value={result.suggestedNextStep} />
      <ResultSection label="Exafuse route" value={`${exafuseLabel}. Use Exafuse for commercial and technical review after the question is structured.`} />
      <ResultSection label="Disclaimer" value={DISCLAIMER} tone="warning" />
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
