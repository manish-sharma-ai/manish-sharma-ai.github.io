import { useMemo, useState } from "react";

const categories = [
  "Material compatibility",
  "Damage geometry",
  "Access to repair zone",
  "Heat sensitivity and distortion risk",
  "Post-machining allowance",
  "Required properties",
  "Inspection feasibility",
  "Replacement cost",
  "Downtime cost",
  "Criticality and risk"
];

const bands = [
  { max: 20, label: "Not enough information or likely unsuitable" },
  { max: 40, label: "High uncertainty" },
  { max: 60, label: "Possible but needs engineering review" },
  { max: 80, label: "Likely candidate if material and inspection align" },
  { max: 100, label: "Strong candidate, subject to expert validation" }
];

export default function RepairabilityCalculator() {
  const [scores, setScores] = useState<Record<string, number>>(
    Object.fromEntries(categories.map((category) => [category, 5]))
  );

  const score = useMemo(
    () => Object.values(scores).reduce((total, value) => total + value, 0),
    [scores]
  );

  const band = bands.find((item) => score <= item.max) ?? bands[bands.length - 1];
  const missing = categories.filter((category) => scores[category] <= 3);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="grid gap-4">
        {categories.map((category) => (
          <label key={category} className="ordered-card grid gap-2 p-4">
            <span className="flex items-center justify-between gap-4 text-sm font-bold text-white">
              {category}
              <span className="font-mono text-cyan-100">{scores[category]}/10</span>
            </span>
            <input
              type="range"
              min="0"
              max="10"
              value={scores[category]}
              onChange={(event) =>
                setScores((current) => ({
                  ...current,
                  [category]: Number(event.target.value)
                }))
              }
              className="accent-cyan-300"
            />
          </label>
        ))}
      </div>
      <aside className="ordered-card-strong h-fit p-6">
        <p className="metric-label">Repairability screening band</p>
        <div className="mt-4 rounded-lg border border-cyan-300/25 bg-cyan-300/10 p-4 text-3xl font-black leading-tight text-white">{band.label}</div>
        <p className="mt-4 text-xl font-bold text-cyan-100">Qualitative output from a transparent checklist.</p>
        <p className="mt-4 text-sm leading-6 text-slate-400">
          Low category inputs indicate the next missing evidence to collect before a repair recommendation becomes credible.
        </p>
        <div className="mt-6">
          <p className="text-sm font-bold text-white">Watch items</p>
          <ul className="mt-3 grid gap-2 text-sm text-slate-300">
            {(missing.length ? missing : ["No severe weak category selected"]).map((item) => (
              <li key={item} className="ordered-card px-3 py-2">{item}</li>
            ))}
          </ul>
        </div>
        <p className="mt-6 rounded-md border border-orange-300/25 bg-orange-500/10 p-3 text-sm leading-6 text-orange-100">
          Preliminary decision-support only. Final feasibility depends on base material, geometry, service conditions, inspection requirements, and expert review.
        </p>
      </aside>
    </div>
  );
}
