import { useMemo, useState } from "react";

const DISCLAIMER =
  "Preliminary decision-support only. Final feasibility depends on base material, geometry, service conditions, inspection requirements, and expert review.";
const EXAFUSE_URL = "https://www.exafuse.de/";

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
    const recommendation =
      score < 30
        ? "High uncertainty"
        : score < 55
          ? "Possible candidate with missing data"
          : score < 75
            ? "Promising candidate for review"
            : "Strong preliminary candidate";
    const missing = questions.filter((item) => !selected.includes(item)).map((item) => item.replace("?", "").toLowerCase());
    const why = selected.length > 0 ? selected.map((item) => item.replace("?", "").toLowerCase()) : ["No positive screening signals selected yet."];
    const riskFlags = [
      safetyCritical && "Safety-critical use requires stronger inspection and expert approval.",
      !selected.includes("Material known?") && "Unknown material keeps feasibility uncertain.",
      !selected.includes("Inspection requirement known?") && "Inspection path is not defined.",
      !selected.includes("Post-machining possible?") && "Final geometry recovery may be difficult."
    ].filter(Boolean) as string[];

    return {
      score,
      recommendation,
      why,
      missing: safetyCritical ? [...missing, "expert approval path"] : missing,
      riskFlags: riskFlags.length > 0 ? riskFlags : ["No major risk flag from the selected inputs; missing RFQ data may still change the result."],
      suggestedNextStep:
        "Collect the missing evidence, then send a structured RFQ with photos, drawings or CAD, material grade, operating conditions, tolerance, and inspection expectations."
    };
  }, [selected, safetyCritical]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <div className="grid content-start gap-3">
        {questions.map((question) => (
          <label key={question} className="ordered-card flex items-start gap-3 p-4 text-sm font-semibold text-slate-200">
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
      <aside className="ordered-card-strong h-fit p-6">
        <p className="metric-label">Quick-check output</p>
        <p className="mt-4 font-mono text-5xl font-black text-white">{result.score}</p>
        <ResultSection label="Preliminary recommendation" value={result.recommendation} large />
        <ResultList label="Why" items={result.why} />
        <ResultList label="Missing information" items={result.missing.length ? result.missing : ["No major missing field from selected checklist."]} />
        <ResultList label="Risk flags" items={result.riskFlags} />
        <ResultSection label="Suggested next step" value={result.suggestedNextStep} />
        <ResultSection label="Disclaimer" value={DISCLAIMER} tone="warning" />
        <ActionRow copyText={formatResult(result)} rfqSummary={formatRfqSummary(result)} />
      </aside>
    </div>
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
  score: number;
  recommendation: string;
  why: string[];
  missing: string[];
  riskFlags: string[];
  suggestedNextStep: string;
}) {
  return [
    `Preliminary recommendation: ${result.recommendation} (${result.score}/100)`,
    `Why: ${result.why.join(", ")}`,
    `Missing information: ${result.missing.join(", ") || "none flagged by checklist"}`,
    `Risk flags: ${result.riskFlags.join(", ")}`,
    `Suggested next step: ${result.suggestedNextStep}`,
    `Disclaimer: ${DISCLAIMER}`
  ].join("\n");
}

function formatRfqSummary(result: {
  score: number;
  recommendation: string;
  missing: string[];
  riskFlags: string[];
  suggestedNextStep: string;
}) {
  return [
    `LMD repairability quick check: ${result.recommendation} (${result.score}/100)`,
    `Missing RFQ fields: ${result.missing.join(", ") || "none flagged by checklist"}`,
    `Risk flags: ${result.riskFlags.join(", ")}`,
    result.suggestedNextStep,
    DISCLAIMER
  ].join("\n");
}

function copyToClipboard(value: string) {
  void navigator.clipboard?.writeText(value);
}
