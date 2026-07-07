import { useMemo, useState } from "react";

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

    const recommendation =
      Math.abs(lmd - slm) <= 2 ? "Manual review" : lmd > slm ? "LMD likely better" : "SLM/LPBF likely better";
    const missing = ["material grade", "part drawing or CAD", "service conditions", "inspection requirement"];
    if (values.tolerance === "tight") missing.push("post-machining plan");
    if (values.jobType === "repair" || values.jobType === "cladding") missing.push("damage depth and repair area");

    return {
      recommendation,
      why:
        why.length > 0
          ? why
          : ["The selected signals are balanced; process choice depends on material, geometry, economics, post-processing, and inspection."],
      missing,
      riskFlags: riskFlags.length > 0 ? riskFlags : ["No major risk flag from the selected inputs; missing RFQ data may still change the result."],
      suggestedNextStep:
        "Prepare a structured RFQ with material grade, CAD or drawing, operating conditions, tolerance target, inspection expectations, and the reason LMD or SLM is being considered."
    };
  }, [values]);

  return (
    <div className="tool-panel">
      <div>
        <div className="tool-input-grid">
          <Select label="Part size" value={values.partSize} options={["small", "medium", "large"]} onChange={(value) => setValues({ ...values, partSize: value })} />
          <Select label="Geometry complexity" value={values.complexity} options={["low", "medium", "high"]} onChange={(value) => setValues({ ...values, complexity: value })} />
          <Select label="Job type" value={values.jobType} options={["repair", "new build", "cladding", "prototype"]} onChange={(value) => setValues({ ...values, jobType: value })} />
          <Select label="Need local material addition" value={values.localAddition} options={["yes", "no"]} onChange={(value) => setValues({ ...values, localAddition: value })} />
          <Select label="Tolerance requirement" value={values.tolerance} options={["loose", "medium", "tight"]} onChange={(value) => setValues({ ...values, tolerance: value })} />
          <Select label="Internal channels" value={values.internalChannels} options={["yes", "no"]} onChange={(value) => setValues({ ...values, internalChannels: value })} />
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <button type="button" onClick={() => setValues(exampleValues)} className="btn btn-secondary">Use example</button>
          <button type="button" onClick={() => setValues(defaults)} className="btn btn-secondary">Reset</button>
        </div>
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
    suggestedNextStep: string;
  };
  exafuseUrl: string;
  exafuseLabel: string;
}) {
  const copyText = formatResult(result);
  const rfqSummary = [
    `## LMD vs SLM RFQ summary`,
    ``,
    `Recommendation: ${result.recommendation}`,
    `Missing information: ${result.missing.join(", ")}`,
    `Risk flags: ${result.riskFlags.join(", ")}`,
    result.suggestedNextStep,
    `Exafuse route: ${exafuseLabel} (${exafuseUrl})`,
    DISCLAIMER
  ].join("\n");

  return (
    <aside className="ordered-card-strong h-fit p-6 md:p-7">
      <p className="metric-label">Advisor output</p>
      <p className="mt-3 rounded-lg border border-amber-300/25 bg-amber-400/10 p-3 text-sm font-bold text-amber-50">
        Confidence is not approval. This output is a route signal, not a release decision.
      </p>
      <ResultSection label="Recommendation" value={result.recommendation} large />
      <ResultList label="Why-signals" items={result.why} />
      <ResultList label="Missing information" items={result.missing} />
      <ResultList label="Risk flags" items={result.riskFlags} />
      <ResultSection label="Suggested next step" value={result.suggestedNextStep} />
      <ResultSection label="Exafuse route" value={`${exafuseLabel}. Use Exafuse for commercial and technical review after the question is structured.`} />
      <ResultSection label="Disclaimer" value={DISCLAIMER} tone="warning" />
      <ActionRow copyText={copyText} rfqSummary={rfqSummary} missingChecklist={result.missing.join("\n")} exafuseUrl={exafuseUrl} exafuseLabel={exafuseLabel} />
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

function ActionRow({
  copyText,
  rfqSummary,
  missingChecklist,
  exafuseUrl,
  exafuseLabel
}: {
  copyText: string;
  rfqSummary: string;
  missingChecklist: string;
  exafuseUrl: string;
  exafuseLabel: string;
}) {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <button type="button" onClick={() => copyToClipboard(copyText)} className="btn btn-primary">Copy result</button>
      <button type="button" onClick={() => copyToClipboard(copyText)} className="btn btn-secondary">Copy full technical brief</button>
      <button type="button" onClick={() => copyToClipboard(rfqSummary)} className="btn btn-secondary">Copy RFQ summary</button>
      <button type="button" onClick={() => copyToClipboard(missingChecklist)} className="btn btn-secondary">Copy missing-information checklist</button>
      <a href="/agent-pack" className="btn btn-secondary">Open RFQ Toolkit</a>
      <a href={exafuseUrl} className="btn btn-laser" target={exafuseUrl.startsWith("http") ? "_blank" : undefined} rel={exafuseUrl.startsWith("http") ? "noreferrer" : undefined}>{exafuseLabel}</a>
    </div>
  );
}

function formatResult(result: {
  recommendation: string;
  why: string[];
  missing: string[];
  riskFlags: string[];
  suggestedNextStep: string;
}) {
  return [
    `## LMD vs SLM Advisor`,
    ``,
    `Recommendation: ${result.recommendation}`,
    `Why-signals: ${result.why.join(" ")}`,
    `Missing information: ${result.missing.join(", ")}`,
    `Risk flags: ${result.riskFlags.join(", ")}`,
    `Suggested next step: ${result.suggestedNextStep}`,
    `Exafuse route: Use Exafuse for commercial and technical review after the question is structured.`,
    `Disclaimer: ${DISCLAIMER}`,
    `Confidence is not approval.`
  ].join("\n");
}

function copyToClipboard(value: string) {
  void navigator.clipboard?.writeText(value);
}
