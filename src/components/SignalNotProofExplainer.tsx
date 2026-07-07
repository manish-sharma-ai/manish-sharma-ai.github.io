import { useMemo, useState } from "react";

const signals = [
  {
    id: "melt-pool",
    label: "Melt-pool image feature",
    suggests: "possible process drift, instability, spatter, geometry change, or review point",
    notProof: "final material quality, fatigue behavior, or service safety",
    needs: ["dimensional inspection", "NDT where risk requires it", "material testing or metallography when acceptance depends on it", "expert review"]
  },
  {
    id: "bead-height",
    label: "Bead height signal",
    suggests: "deposition consistency, layer planning issue, machining allowance risk, or path correction need",
    notProof: "final geometry after finishing or final surface function",
    needs: ["dimensional inspection", "machining plan", "acceptance criteria", "inspection-linked records"]
  },
  {
    id: "temperature",
    label: "Temperature drift",
    suggests: "thermal accumulation, process-window shift, or heat-sensitive repair risk",
    notProof: "microstructure, residual stress state, or final qualification",
    needs: ["thermal history review", "material evidence", "process qualification context", "expert review"]
  },
  {
    id: "camera",
    label: "Camera anomaly",
    suggests: "visual event that deserves review, especially when repeated or correlated with other signals",
    notProof: "defect presence, defect absence, or quality release",
    needs: ["sensor calibration context", "image quality review", "correlation with inspection", "operator notes"]
  },
  {
    id: "rfq-keyword",
    label: "RFQ keyword",
    suggests: "possible route, missing field, risk category, or next question",
    notProof: "repair feasibility, process selection, or commercial acceptance",
    needs: ["material grade", "drawing/CAD", "photos", "damage depth", "tolerance and inspection requirement"]
  },
  {
    id: "operator-note",
    label: "Operator note",
    suggests: "context that can explain process behavior or highlight uncertainty",
    notProof: "traceable evidence without measured support",
    needs: ["timestamped record", "process data", "inspection result", "review decision"]
  }
] as const;

export default function SignalNotProofExplainer() {
  const [selected, setSelected] = useState<(typeof signals)[number]["id"]>("melt-pool");
  const signal = useMemo(() => signals.find((item) => item.id === selected) ?? signals[0], [selected]);

  return (
    <section id="signal-is-not-proof" className="ordered-card-strong scroll-mt-24 p-5 md:p-7">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="metric-label">Interactive explainer</p>
          <h2 className="mt-3 text-3xl font-black leading-tight text-white md:text-4xl">Signal is not proof.</h2>
          <p className="mt-4 text-sm leading-6 text-slate-300 md:text-base md:leading-7">
            Select a signal. The useful question is not whether the signal is interesting; it is what the signal can suggest, what it cannot prove, and what evidence closes the loop.
          </p>
          <div className="mt-6 grid gap-2">
            {signals.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => setSelected(item.id)}
                className={`rounded-lg border p-3 text-left text-sm font-bold transition ${
                  selected === item.id
                    ? "border-cyan-300/70 bg-cyan-300/14 text-white"
                    : "border-white/10 bg-white/[0.035] text-slate-300 hover:border-cyan-300/35 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div className="ordered-card p-5">
          <p className="metric-label">Selected signal</p>
          <h3 className="mt-3 text-2xl font-black text-white">{signal.label}</h3>
          <Result label="What it can suggest" value={signal.suggests} />
          <Result label="What it cannot prove" value={signal.notProof} warning />
          <div className="mt-5">
            <p className="text-sm font-bold text-white">Evidence needed next:</p>
            <ul className="mt-2 grid gap-2 text-sm text-slate-300">
              {signal.needs.map((need) => <li key={need} className="result-card">{need}</li>)}
            </ul>
          </div>
          <p className="result-card result-card--warning mt-5 text-sm font-bold leading-6">
            Confidence is not approval. Monitoring can support review; it does not replace inspection, testing, expert review, or release evidence.
          </p>
        </div>
      </div>
    </section>
  );
}

function Result({ label, value, warning = false }: { label: string; value: string; warning?: boolean }) {
  return (
    <div className="mt-5">
      <p className="text-sm font-bold text-white">{label}:</p>
      <p className={`${warning ? "result-card result-card--warning" : "result-card text-slate-300"} mt-2 text-sm leading-6`}>{value}</p>
    </div>
  );
}
