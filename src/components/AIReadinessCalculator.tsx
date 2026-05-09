import { useMemo, useState } from "react";

const checks = [
  "Process images recorded",
  "Machine logs captured",
  "Parameter changes tracked",
  "Powder/feedstock batch traceability",
  "CAD/path data linked to process data",
  "Inspection results connected to builds",
  "Defect labels available",
  "Repeated jobs or comparable builds exist",
  "Operator feedback captured",
  "Feedback loop from inspection to process improvement"
];

const bands = [
  { max: 20, label: "Not AI-ready" },
  { max: 40, label: "Data capture stage" },
  { max: 60, label: "Offline analytics stage" },
  { max: 80, label: "AI decision-support candidate" },
  { max: 100, label: "Candidate for validated closed-loop development" }
];

export default function AIReadinessCalculator() {
  const [selected, setSelected] = useState<string[]>(checks.slice(0, 3));
  const score = useMemo(() => selected.length * 10, [selected]);
  const band = bands.find((item) => score <= item.max) ?? bands[bands.length - 1];
  const missing = checks.filter((item) => !selected.includes(item));

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="grid gap-3">
        {checks.map((item) => (
          <label key={item} className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-4 text-sm font-semibold text-slate-200">
            <input
              type="checkbox"
              checked={selected.includes(item)}
              onChange={(event) => {
                setSelected((current) =>
                  event.target.checked ? [...current, item] : current.filter((entry) => entry !== item)
                );
              }}
              className="mt-1 accent-cyan-300"
            />
            <span>{item}</span>
          </label>
        ))}
      </div>
      <aside className="glass-panel h-fit rounded-lg p-6">
        <p className="metric-label">AI readiness</p>
        <div className="mt-4 text-6xl font-black text-white">{score}</div>
        <p className="mt-4 text-xl font-bold text-cyan-100">{band.label}</p>
        <p className="mt-4 text-sm leading-6 text-slate-400">
          The useful AI threshold is less about model choice and more about traceability between process data, inspection outcomes, and repeated learning loops.
        </p>
        <div className="mt-6">
          <p className="text-sm font-bold text-white">Next data foundations</p>
          <ul className="mt-3 grid gap-2 text-sm text-slate-300">
            {missing.slice(0, 5).map((item) => (
              <li key={item} className="rounded-md border border-white/10 bg-black/20 px-3 py-2">{item}</li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
