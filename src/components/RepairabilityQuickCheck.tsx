import { useMemo, useState } from "react";

const DISCLAIMER =
  "Preliminary decision-support only. Final feasibility depends on base material, geometry, service conditions, inspection requirements, and expert review.";
const DEFAULT_EXAFUSE_URL = "/contact";
const DEFAULT_EXAFUSE_LABEL = "Contact routes";

const questions = [
  "Material known?",
  "Damage local?",
  "Access possible?",
  "Post-machining possible?",
  "Inspection requirement known?",
  "Replacement cost high?",
  "Downtime important?"
];

const exampleSelected = [
  "Material known?",
  "Damage local?",
  "Access possible?",
  "Post-machining possible?",
  "Inspection requirement known?",
  "Downtime important?"
];

interface ToolProps {
  exafuseUrl?: string;
  exafuseLabel?: string;
}

export default function RepairabilityQuickCheck({
  exafuseUrl = DEFAULT_EXAFUSE_URL,
  exafuseLabel = DEFAULT_EXAFUSE_LABEL
}: ToolProps) {
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
    const evidenceNeeded = [
      selected.includes("Material known?") ? "confirmed material grade" : "material grade and compatibility check",
      selected.includes("Damage local?") ? "damage map and depth estimate" : "damage extent and depth evidence",
      selected.includes("Post-machining possible?") ? "post-machining allowance and tolerance plan" : "finishing route and tolerance recovery plan",
      selected.includes("Inspection requirement known?") ? "defined inspection requirement" : "inspection requirement and acceptance criteria"
    ];
    const reviewReadiness = safetyCritical
      ? "Requires formal inspection/qualification planning"
      : score < 30
        ? "Not enough information"
        : score < 55
          ? "Ready for preliminary discussion"
          : "Ready for expert review";

    return {
      score,
      recommendation,
      why,
      missing: safetyCritical ? [...missing, "expert approval path"] : missing,
      riskFlags: riskFlags.length > 0 ? riskFlags : ["No major risk flag from the selected inputs; missing RFQ data may still change the result."],
      evidenceNeeded,
      reviewReadiness,
      suggestedNextStep:
        "Collect the missing evidence, then send a structured RFQ with photos, drawings or CAD, material grade, operating conditions, tolerance, and inspection expectations."
    };
  }, [selected, safetyCritical]);

  return (
    <div className="tool-panel">
      <div className="grid content-start gap-3">
        {questions.map((question) => (
          <label key={question} className="tool-field grid-cols-[auto_1fr] items-start gap-3 text-sm font-semibold text-slate-200">
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
        <label className="flex items-start gap-3 rounded-[18px] border border-orange-300/20 bg-orange-500/10 p-4 text-sm font-semibold text-orange-50">
          <input
            type="checkbox"
            checked={safetyCritical}
            onChange={(event) => setSafetyCritical(event.target.checked)}
            className="mt-1 accent-orange-400"
          />
          <span>Safety critical?</span>
        </label>
        <div className="mt-2 flex flex-wrap gap-3">
          <button type="button" onClick={() => { setSelected(exampleSelected); setSafetyCritical(false); }} className="btn btn-secondary">Use example</button>
          <button type="button" onClick={() => { setSelected(["Damage local?", "Access possible?", "Downtime important?"]); setSafetyCritical(false); }} className="btn btn-secondary">Reset</button>
          <button type="button" onClick={() => { setSelected([]); setSafetyCritical(false); }} className="btn btn-secondary">Clear all inputs</button>
        </div>
      </div>
      <aside className="ordered-card-strong h-fit p-6 md:p-7">
        <p className="metric-label">Quick-check output</p>
        <p className="mt-3 rounded-lg border border-amber-300/25 bg-amber-400/10 p-3 text-sm font-bold text-amber-50">
          Confidence is not approval. This score screens review readiness; it does not approve repair.
        </p>
        <p className="mt-4 font-mono text-5xl font-black text-white">{result.score}</p>
        <ResultSection label="Decision signal" value={result.recommendation} large />
        <ResultSection label="Review readiness" value={result.reviewReadiness} />
        <ResultList label="Why" items={result.why} />
        <ResultList label="Missing information" items={result.missing.length ? result.missing : ["No major missing field from selected checklist."]} />
        <ResultList label="Risk flags" items={result.riskFlags} />
        <ResultList label="Evidence needed" items={result.evidenceNeeded} />
        <ResultSection label="Next action" value={result.suggestedNextStep} />
        <ResultSection label="Exafuse route" value={`${exafuseLabel}. Use Exafuse for commercial and technical review after the repair question is structured.`} />
        <ResultSection label="Disclaimer" value={DISCLAIMER} tone="warning" />
        <ActionRow
          copyText={formatResult(result, exafuseLabel)}
          rfqSummary={formatRfqSummary(result, exafuseLabel, exafuseUrl)}
          missingChecklist={result.missing.join("\n") || "No major missing field from selected checklist."}
          exafuseUrl={exafuseUrl}
          exafuseLabel={exafuseLabel}
        />
      </aside>
    </div>
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
  score: number;
  recommendation: string;
  why: string[];
  missing: string[];
  riskFlags: string[];
  evidenceNeeded: string[];
  reviewReadiness: string;
  suggestedNextStep: string;
}, exafuseLabel: string) {
  return [
    `## LMD Repairability Quick Check`,
    ``,
    `Decision signal: ${result.recommendation} (${result.score}/100)`,
    `Review readiness: ${result.reviewReadiness}`,
    `Why: ${result.why.join(", ")}`,
    `Missing information: ${result.missing.join(", ") || "none flagged by checklist"}`,
    `Risk flags: ${result.riskFlags.join(", ")}`,
    `Evidence needed: ${result.evidenceNeeded.join(", ")}`,
    `Next action: ${result.suggestedNextStep}`,
    `Exafuse route: ${exafuseLabel}. Use Exafuse for commercial and technical review after the repair question is structured.`,
    `Disclaimer: ${DISCLAIMER}`,
    `Confidence is not approval.`
  ].join("\n");
}

function formatRfqSummary(result: {
  score: number;
  recommendation: string;
  missing: string[];
  riskFlags: string[];
  evidenceNeeded: string[];
  reviewReadiness: string;
  suggestedNextStep: string;
}, exafuseLabel: string, exafuseUrl: string) {
  return [
    `## LMD repairability RFQ summary`,
    ``,
    `Decision signal: ${result.recommendation} (${result.score}/100)`,
    `Review readiness: ${result.reviewReadiness}`,
    `Missing RFQ fields: ${result.missing.join(", ") || "none flagged by checklist"}`,
    `Risk flags: ${result.riskFlags.join(", ")}`,
    `Evidence needed: ${result.evidenceNeeded.join(", ")}`,
    result.suggestedNextStep,
    `Exafuse route: ${exafuseLabel} (${exafuseUrl})`,
    DISCLAIMER
  ].join("\n");
}

function copyToClipboard(value: string) {
  void navigator.clipboard?.writeText(value);
}
