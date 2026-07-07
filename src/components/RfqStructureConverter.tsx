import { useMemo, useState } from "react";
import DecisionBriefCard from "./DecisionBriefCard";
import { createDecisionBrief } from "../lib/decisionBrief";

const DISCLAIMER =
  "Preliminary decision-support only. Final feasibility depends on base material, geometry, service conditions, inspection requirements, and expert review.";
const DEFAULT_EXAFUSE_URL = "/contact";
const DEFAULT_EXAFUSE_LABEL = "Contact routes";

const partTerms = ["shaft", "die", "gear", "valve", "hammer", "mold", "tool", "bracket", "node", "component"];
const materialTerms = ["steel", "stainless", "aluminium", "aluminum", "inconel", "nickel", "copper", "titanium", "unknown"];
const damageTerms = ["worn", "wear", "corrosion", "crack", "cracked", "broken", "damaged", "pitted", "eroded", "machining error"];
const exampleText =
  "Repair a worn stainless steel shaft with local damage near the bearing seat. Photos are available but CAD is missing. Need tight tolerance and hardness requirement.";

interface ToolProps {
  exafuseUrl?: string;
  exafuseLabel?: string;
}

export default function RfqStructureConverter({
  exafuseUrl = DEFAULT_EXAFUSE_URL,
  exafuseLabel = DEFAULT_EXAFUSE_LABEL
}: ToolProps) {
  const [text, setText] = useState(exampleText);

  const parsed = useMemo(() => {
    const lower = text.toLowerCase();
    const part = partTerms.find((term) => lower.includes(term));
    const material = materialTerms.find((term) => lower.includes(term));
    const damage = damageTerms.filter((term) => lower.includes(term));
    const hasExactMaterialGrade =
      /\b(316l|304l|304|17-4|ti-6al-4v|inconel\s?625|inconel\s?718|42crmo4|1\.\d{4}|aisi\s?\d{3,4}|en\s?\d{3,5})\b/.test(lower);
    const hasPhotos = lower.includes("photo") && !lower.includes("no photo") && !lower.includes("photos missing");
    const hasCad = (lower.includes("cad") || lower.includes("3d model")) && !lower.includes("cad is missing") && !lower.includes("no cad") && !lower.includes("cad missing");
    const hasDrawing = lower.includes("drawing") && !lower.includes("no drawing") && !lower.includes("drawing missing");
    const hasDimensions = lower.includes("dimension") || /\b\d+\s?(mm|cm|m|inch|in)\b/.test(lower);
    const hasTolerance = lower.includes("tolerance") || lower.includes("tight") || lower.includes("+/-");
    const hasOperating = lower.includes("operating") || lower.includes("temperature") || lower.includes("load") || lower.includes("pressure") || lower.includes("wear environment");
    const hasInspection = lower.includes("inspection") || lower.includes("ndt") || lower.includes("ct") || lower.includes("hardness");
    const hasDeadline = lower.includes("deadline") || lower.includes("timeline") || lower.includes("urgent") || lower.includes("downtime");
    const materialLooksGeneric = !material || material === "unknown" || lower.includes("unknown material") || !hasExactMaterialGrade;
    const riskFlags = [
      materialLooksGeneric && "Exact material grade is not confirmed, even if a broad material family is mentioned.",
      damage.length === 0 && "Damage mechanism is not clearly described.",
      !hasCad && !hasDrawing && "No CAD or drawing is available yet.",
      (lower.includes("crack") || lower.includes("cracked")) && "Crack repair needs stronger material, removal, inspection, and expert review.",
      hasTolerance && "Tight tolerance requires machining and inspection planning."
    ].filter(Boolean) as string[];

    const missing = [
      materialLooksGeneric && "exact material grade",
      !lower.includes("depth") && "damage depth",
      !hasPhotos && "photos",
      !hasCad && !hasDrawing && "drawing/CAD",
      !hasDimensions && "dimensions",
      !hasTolerance && "tolerance",
      !hasOperating && "operating conditions",
      !hasInspection && "inspection requirement",
      !hasDeadline && "deadline"
    ].filter(Boolean) as string[];

    const known = [
      part && `possible part: ${part}`,
      material && material !== "unknown" && `material hint: ${material}`,
      damage.length > 0 && `damage hint: ${damage.join(", ")}`,
      hasPhotos && "photos available",
      hasCad && "CAD available",
      hasDrawing && "drawing mentioned",
      hasDimensions && "dimensions mentioned",
      hasTolerance && "tolerance mentioned",
      hasOperating && "operating conditions mentioned",
      hasInspection && "inspection requirement mentioned",
      hasDeadline && "deadline or downtime mentioned"
    ].filter(Boolean) as string[];

    return {
      part: part ?? "not clearly identified",
      material: material ?? "unknown",
      damage: damage.length > 0 ? damage.join(", ") : "not clearly described",
      known,
      missing,
      riskFlags: riskFlags.length > 0 ? riskFlags : ["No major risk flag detected by keyword rules; expert review is still required."],
      recommendation: missing.length > 4 ? "RFQ needs more information before feasibility review" : "RFQ is partly structured and ready for a first expert review",
      evidenceNeeded: [
        hasExactMaterialGrade ? "confirmed material grade" : "exact material grade",
        hasCad || hasDrawing ? "drawing/CAD context" : "drawing/CAD or dimensional sketch",
        hasInspection ? "inspection requirement" : "inspection requirement and acceptance criteria",
        hasTolerance ? "tolerance and finishing plan" : "tolerance target"
      ],
      reviewReadiness:
        riskFlags.length > 2 || missing.length > 5
          ? "Not enough information"
          : missing.length > 2
            ? "Ready for preliminary discussion"
            : "Ready for expert review",
      suggestedNextStep:
        "Ask the buyer for the missing fields, then prepare a compact RFQ summary with photos, drawing or CAD, material grade, damage depth, tolerance, operating conditions, inspection requirement, and deadline."
    };
  }, [text]);

  const brief = createDecisionBrief({
    situation: "RFQ prompt-to-structure conversion for an LMD/DED, repair, or cladding request.",
    component: parsed.part,
    goal: "Turn free text into a bounded review brief with known facts, missing facts, risk flags, and evidence needs.",
    material: parsed.material,
    geometryOrSize: parsed.known.find((item) => item.includes("dimensions")) ?? "Geometry or size not yet fully specified.",
    damageOrBuildArea: parsed.damage,
    availableData: parsed.known.length ? parsed.known : ["Not enough clear facts detected yet."],
    knownFacts: parsed.known.length ? parsed.known : ["Not enough clear facts detected yet."],
    missingInformation: parsed.missing.length ? parsed.missing : ["No major missing field detected by keyword rules."],
    riskFlags: parsed.riskFlags,
    evidenceNeeded: parsed.evidenceNeeded,
    preliminaryRoute: parsed.recommendation,
    reviewReadiness: parsed.reviewReadiness,
    nextAction: parsed.suggestedNextStep,
    exafuseReviewRoute: `${exafuseLabel}. Use Exafuse for commercial and technical review after the RFQ facts and gaps are structured.`,
    generatedFrom: "RFQ Prompt-to-Structure Converter"
  });

  return (
    <div className="tool-panel">
      <label className="tool-field">
        Repair request text
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={12}
          className="min-h-[24rem] p-4 text-sm leading-6 text-slate-100 outline-none"
        />
        <span className="mt-4 flex flex-wrap gap-3">
          <button type="button" onClick={() => setText(exampleText)} className="btn btn-secondary">Use example</button>
          <button type="button" onClick={() => setText("")} className="btn btn-secondary">Reset</button>
          <button type="button" onClick={() => setText("")} className="btn btn-secondary">Clear all inputs</button>
        </span>
      </label>
      <aside className="ordered-card-strong p-6 md:p-7">
        <p className="metric-label">Structured RFQ output</p>
        <p className="mt-3 rounded-lg border border-amber-300/25 bg-amber-400/10 p-3 text-sm font-bold text-amber-50">
          Confidence is not approval. This parser structures a request; it does not decide feasibility.
        </p>
        <ResultSection label="Decision signal" value={parsed.recommendation} large />
        <ResultSection label="Review readiness" value={parsed.reviewReadiness} />
        <ResultList label="Why" items={parsed.known.length ? parsed.known : ["Not enough clear facts detected yet."]} />
        <div className="mt-5 grid gap-3 text-sm">
          <Field label="Part" value={parsed.part} />
          <Field label="Material" value={parsed.material} />
          <Field label="Damage" value={parsed.damage} />
        </div>
        <ResultList label="Missing information" items={parsed.missing.length ? parsed.missing : ["No major missing field detected by keyword rules."]} />
        <ResultList label="Risk flags" items={parsed.riskFlags} />
        <ResultList label="Evidence needed" items={parsed.evidenceNeeded} />
        <ResultSection label="Next action" value={parsed.suggestedNextStep} />
        <ResultSection label="Exafuse route" value={`${exafuseLabel}. Use Exafuse for commercial and technical review after the RFQ facts and gaps are structured.`} />
        <ResultSection label="Disclaimer" value={DISCLAIMER} tone="warning" />
        <DecisionBriefCard
          brief={brief}
          eyebrow="Standard artifact"
          exafuseUrl={exafuseUrl}
          exafuseLabel={exafuseLabel}
          matchingToolHref="/tools#rfq-module"
          matchingToolLabel="Open RFQ structure module"
        />
      </aside>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-bold text-white">{label}</p>
      <p className="result-card mt-1 text-slate-300">{value}</p>
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
