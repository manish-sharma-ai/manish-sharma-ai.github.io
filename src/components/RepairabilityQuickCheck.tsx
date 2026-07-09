import { useMemo, useState } from "react";
import DecisionBriefCard from "./DecisionBriefCard";
import { createDecisionBrief } from "../lib/decisionBrief";

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
        <div className="tool-pane-heading">
          <p className="metric-label">Input pane</p>
          <p className="tool-pane-title">Repairability screening checklist</p>
          <p className="tool-pane-copy">Mark only public-safe known signals. Unknown material, undefined inspection, and safety-critical service stay visible as risk.</p>
        </div>
        <fieldset className="grid gap-3">
          <legend className="metric-label mb-1">Repairability inputs</legend>
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
        </fieldset>
        <ul className="tool-action-list mt-2" aria-label="Repairability input actions">
          <li><button type="button" onClick={() => { setSelected(exampleSelected); setSafetyCritical(false); }} className="btn btn-secondary">Use example</button></li>
          <li><button type="button" onClick={() => { setSelected(["Damage local?", "Access possible?", "Downtime important?"]); setSafetyCritical(false); }} className="btn btn-secondary">Reset</button></li>
          <li><button type="button" onClick={() => { setSelected([]); setSafetyCritical(false); }} className="btn btn-secondary">Clear all inputs</button></li>
        </ul>
      </div>
      <aside className="ordered-card-strong tool-output-rail h-fit p-6 md:p-7">
        <div className="tool-pane-heading mb-5">
          <p className="metric-label">Output pane</p>
          <p className="tool-pane-title">Repairability review brief</p>
          <p className="tool-pane-copy">The score screens review readiness; it does not approve repair or replace inspection planning.</p>
        </div>
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
        <DecisionBriefCard
          brief={createDecisionBrief({
            situation: "Preliminary LMD repairability screening.",
            component: "Repair candidate not fully specified in this quick check.",
            goal: "Screen whether the repair question is worth expert review.",
            material: selected.includes("Material known?")
              ? "Material marked known; exact grade and compatibility still need review context."
              : "Material not yet specified.",
            geometryOrSize: "Geometry, access, and post-machining context must be confirmed outside this checklist.",
            damageOrBuildArea: selected.includes("Damage local?")
              ? "Local damage indicated; depth and extent still need evidence."
              : "Damage location, extent, and depth not yet defined.",
            availableData: result.why,
            knownFacts: result.why,
            missingInformation: result.missing.length ? result.missing : ["No major missing field from selected checklist."],
            missingCritical: result.missing.filter((item) =>
              ["material", "damage", "post-machining", "inspection", "expert approval"].some((term) => item.includes(term))
            ),
            missingUseful: result.missing.filter((item) =>
              ["replacement cost", "downtime", "access"].some((term) => item.includes(term))
            ),
            missingOptional: ["prior repair history", "reference part", "budget estimate"],
            riskFlags: result.riskFlags,
            evidenceNeeded: result.evidenceNeeded,
            preliminaryRoute: `${result.recommendation} (${result.score}/100)`,
            reviewReadiness: result.reviewReadiness,
            nextAction: result.suggestedNextStep,
            exafuseReviewRoute: `${exafuseLabel}. Use Exafuse for commercial and technical review after the repair question is structured.`,
            generatedFrom: "LMD Repairability Quick Check"
          })}
          eyebrow="Standard artifact"
          exafuseUrl={exafuseUrl}
          exafuseLabel={exafuseLabel}
          matchingToolHref="/tools#repairability-module"
          matchingToolLabel="Open repairability module"
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
