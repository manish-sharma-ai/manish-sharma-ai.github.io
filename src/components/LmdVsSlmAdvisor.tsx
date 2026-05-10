import { useMemo, useState } from "react";

const DISCLAIMER =
  "Preliminary decision-support only. Final feasibility depends on base material, geometry, service conditions, inspection requirements, and expert review.";
const EXAFUSE_URL = "https://www.exafuse.de/";

const defaults = {
  partSize: "medium",
  complexity: "medium",
  jobType: "repair",
  localAddition: "yes",
  tolerance: "medium",
  internalChannels: "no"
};

export default function LmdVsSlmAdvisor() {
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
    <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <div className="grid content-start gap-4 sm:grid-cols-2">
        <Select label="Part size" value={values.partSize} options={["small", "medium", "large"]} onChange={(value) => setValues({ ...values, partSize: value })} />
        <Select label="Geometry complexity" value={values.complexity} options={["low", "medium", "high"]} onChange={(value) => setValues({ ...values, complexity: value })} />
        <Select label="Job type" value={values.jobType} options={["repair", "new build", "cladding", "prototype"]} onChange={(value) => setValues({ ...values, jobType: value })} />
        <Select label="Need local material addition" value={values.localAddition} options={["yes", "no"]} onChange={(value) => setValues({ ...values, localAddition: value })} />
        <Select label="Tolerance requirement" value={values.tolerance} options={["loose", "medium", "tight"]} onChange={(value) => setValues({ ...values, tolerance: value })} />
        <Select label="Internal channels" value={values.internalChannels} options={["yes", "no"]} onChange={(value) => setValues({ ...values, internalChannels: value })} />
      </div>
      <ToolResult result={result} />
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
    <label className="ordered-card grid gap-2 p-4 text-sm font-bold text-white">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-11 rounded-md border border-white/10 bg-graphite-950 px-3 text-slate-100"
      >
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function ToolResult({
  result
}: {
  result: {
    recommendation: string;
    why: string[];
    missing: string[];
    riskFlags: string[];
    suggestedNextStep: string;
  };
}) {
  const copyText = formatResult(result);
  const rfqSummary = [
    `Process comparison: ${result.recommendation}`,
    `Missing information: ${result.missing.join(", ")}`,
    `Risk flags: ${result.riskFlags.join(", ")}`,
    result.suggestedNextStep,
    DISCLAIMER
  ].join("\n");

  return (
    <aside className="ordered-card-strong h-fit p-6">
      <p className="metric-label">Advisor output</p>
      <ResultSection label="Preliminary recommendation" value={result.recommendation} large />
      <ResultList label="Why" items={result.why} />
      <ResultList label="Missing information" items={result.missing} />
      <ResultList label="Risk flags" items={result.riskFlags} />
      <ResultSection label="Suggested next step" value={result.suggestedNextStep} />
      <ResultSection label="Disclaimer" value={DISCLAIMER} tone="warning" />
      <ActionRow copyText={copyText} rfqSummary={rfqSummary} />
    </aside>
  );
}

function ResultSection({ label, value, large = false, tone = "default" }: { label: string; value: string; large?: boolean; tone?: "default" | "warning" }) {
  return (
    <div className="mt-5">
      <p className="text-sm font-bold text-white">{label}:</p>
      <p className={`${tone === "warning" ? "border border-orange-300/25 bg-orange-500/10 text-orange-50" : "ordered-card text-slate-300"} mt-2 rounded-md p-3 leading-6 ${large ? "text-2xl font-black text-white" : "text-sm"}`}>
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
        {items.map((item) => <li key={item} className="ordered-card px-3 py-2">{item}</li>)}
      </ul>
    </div>
  );
}

function ActionRow({ copyText, rfqSummary }: { copyText: string; rfqSummary: string }) {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <button type="button" onClick={() => copyToClipboard(copyText)} className="btn btn-primary">Copy result</button>
      <button type="button" onClick={() => copyToClipboard(rfqSummary)} className="btn btn-secondary">Copy RFQ summary</button>
      <a href="/agent-pack" className="btn btn-secondary">Open RFQ Toolkit</a>
      <a href={EXAFUSE_URL} className="btn btn-secondary" target="_blank" rel="noreferrer">Visit Exafuse</a>
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
    `Preliminary recommendation: ${result.recommendation}`,
    `Why: ${result.why.join(" ")}`,
    `Missing information: ${result.missing.join(", ")}`,
    `Risk flags: ${result.riskFlags.join(", ")}`,
    `Suggested next step: ${result.suggestedNextStep}`,
    `Disclaimer: ${DISCLAIMER}`
  ].join("\n");
}

function copyToClipboard(value: string) {
  void navigator.clipboard?.writeText(value);
}
