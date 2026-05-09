import { useMemo, useState } from "react";

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
    const reasons: string[] = [];
    const missing: string[] = [];

    if (values.partSize === "large") {
      lmd += 3;
      reasons.push("Large parts often favor local deposition, repair, cladding, or hybrid routes.");
    }
    if (values.partSize === "small") slm += 2;
    if (values.complexity === "high") slm += 3;
    if (values.complexity === "low") lmd += 1;
    if (values.jobType === "repair" || values.jobType === "cladding") lmd += 4;
    if (values.jobType === "new build" || values.jobType === "prototype") slm += 1;
    if (values.localAddition === "yes") {
      lmd += 3;
      reasons.push("Local material addition is one of the strongest LMD signals.");
    }
    if (values.tolerance === "tight") {
      slm += 1;
      missing.push("post-processing and inspection route");
    }
    if (values.internalChannels === "yes") {
      slm += 4;
      reasons.push("Internal channels and powder-bed design freedom often point toward SLM/LPBF.");
    }

    const recommendation =
      Math.abs(lmd - slm) <= 2 ? "Manual review" : lmd > slm ? "LMD likely better" : "SLM/LPBF likely better";

    return {
      recommendation,
      explanation:
        reasons.join(" ") ||
        "The selected signals are balanced; process choice depends on material, geometry, economics, post-processing, and inspection.",
      missing:
        missing.length > 0
          ? missing
          : ["material grade", "part drawing or CAD", "service conditions", "inspection requirement"]
    };
  }, [values]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <div className="grid gap-4 sm:grid-cols-2">
        <Select label="Part size" value={values.partSize} options={["small", "medium", "large"]} onChange={(value) => setValues({ ...values, partSize: value })} />
        <Select label="Geometry complexity" value={values.complexity} options={["low", "medium", "high"]} onChange={(value) => setValues({ ...values, complexity: value })} />
        <Select label="Job type" value={values.jobType} options={["repair", "new build", "cladding", "prototype"]} onChange={(value) => setValues({ ...values, jobType: value })} />
        <Select label="Need local material addition" value={values.localAddition} options={["yes", "no"]} onChange={(value) => setValues({ ...values, localAddition: value })} />
        <Select label="Tolerance requirement" value={values.tolerance} options={["loose", "medium", "tight"]} onChange={(value) => setValues({ ...values, tolerance: value })} />
        <Select label="Internal channels" value={values.internalChannels} options={["yes", "no"]} onChange={(value) => setValues({ ...values, internalChannels: value })} />
      </div>
      <ToolResult title={result.recommendation} explanation={result.explanation} missing={result.missing} />
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

function ToolResult({ title, explanation, missing }: { title: string; explanation: string; missing: string[] }) {
  return (
    <aside className="ordered-card-strong h-fit p-6">
      <p className="metric-label">Advisor output</p>
      <p className="mt-4 text-3xl font-black text-white">{title}</p>
      <p className="mt-4 text-sm leading-6 text-slate-300">{explanation}</p>
      <p className="mt-6 text-sm font-bold text-white">Missing information</p>
      <ul className="mt-3 grid gap-2 text-sm text-slate-300">
        {missing.map((item) => <li key={item} className="ordered-card px-3 py-2">{item}</li>)}
      </ul>
      <p className="mt-6 rounded-md border border-cyan-300/20 bg-cyan-300/10 p-3 text-sm leading-6 text-cyan-50">
        Basic frontend decision demo. It does not replace engineering review, material validation, or supplier feasibility assessment.
      </p>
    </aside>
  );
}
