import { useMemo, useState } from "react";

const questions = [
  "Material known?",
  "Damage local?",
  "Access possible?",
  "Post-machining possible?",
  "Inspection requirement known?",
  "Replacement cost high?",
  "Downtime important?"
];

export default function RepairabilityQuickCheck() {
  const [selected, setSelected] = useState<string[]>(["Damage local?", "Access possible?", "Downtime important?"]);
  const [safetyCritical, setSafetyCritical] = useState(false);

  const result = useMemo(() => {
    const base = selected.length * 12 - (safetyCritical ? 18 : 0);
    const score = Math.max(0, Math.min(100, base));
    const band =
      score < 30 ? "High uncertainty" : score < 55 ? "Possible candidate with missing data" : score < 75 ? "Promising candidate for review" : "Strong preliminary candidate";
    const missing = questions.filter((item) => !selected.includes(item));
    if (safetyCritical) missing.push("stronger inspection and expert approval path");
    return { score, band, missing };
  }, [selected, safetyCritical]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <div className="grid gap-3">
        {questions.map((question) => (
          <label key={question} className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-4 text-sm font-semibold text-slate-200">
            <input
              type="checkbox"
              checked={selected.includes(question)}
              onChange={(event) =>
                setSelected((current) => event.target.checked ? [...current, question] : current.filter((item) => item !== question))
              }
              className="mt-1 accent-cyan-300"
            />
            <span>{question}</span>
          </label>
        ))}
        <label className="flex items-start gap-3 rounded-lg border border-orange-300/20 bg-orange-500/10 p-4 text-sm font-semibold text-orange-50">
          <input
            type="checkbox"
            checked={safetyCritical}
            onChange={(event) => setSafetyCritical(event.target.checked)}
            className="mt-1 accent-orange-400"
          />
          <span>Safety critical?</span>
        </label>
      </div>
      <aside className="glass-panel h-fit rounded-lg p-6">
        <p className="metric-label">Quick-check band</p>
        <p className="mt-4 text-5xl font-black text-white">{result.score}</p>
        <p className="mt-4 text-2xl font-black text-cyan-100">{result.band}</p>
        <p className="mt-6 text-sm font-bold text-white">Suggested next step</p>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          Collect the missing evidence, then send a structured RFQ with photos, drawings or CAD, material grade, operating conditions, tolerance, and inspection expectations.
        </p>
        <ul className="mt-4 grid gap-2 text-sm text-slate-300">
          {result.missing.slice(0, 6).map((item) => <li key={item} className="rounded-md border border-white/10 bg-black/20 px-3 py-2">{item}</li>)}
        </ul>
      </aside>
    </div>
  );
}
