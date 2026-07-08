import type { DecisionBrief } from "../lib/decisionBrief";
import DecisionBriefExport from "./DecisionBriefExport";

interface DecisionBriefCardProps {
  brief: DecisionBrief;
  eyebrow?: string;
  title?: string;
  exafuseUrl?: string;
  exafuseLabel?: string;
  matchingToolHref?: string;
  matchingToolLabel?: string;
  showExport?: boolean;
  compact?: boolean;
}

export default function DecisionBriefCard({
  brief,
  eyebrow = "Decision brief",
  title = brief.briefVersion,
  exafuseUrl,
  exafuseLabel,
  matchingToolHref,
  matchingToolLabel,
  showExport = true,
  compact = false
}: DecisionBriefCardProps) {
  return (
    <div className="print-brief grid gap-5" data-brief-version={brief.briefVersion}>
      <div>
        <p className="metric-label">{eyebrow}</p>
        <h3 className="mt-3 text-2xl font-black leading-tight text-white">{title}</h3>
        <p className="mt-3 rounded-lg border border-amber-300/25 bg-amber-400/10 p-3 text-sm font-bold text-amber-50">
          {brief.boundaryStatement}
        </p>
        {brief.createdAt && (
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
            Generated {brief.createdAt}
          </p>
        )}
      </div>

      <div className="grid gap-3">
        <BriefField label="Situation" value={brief.situation} large />
        <div className="grid gap-3 md:grid-cols-2">
          <BriefField label="Component" value={brief.component} />
          <BriefField label="Goal" value={brief.goal} />
          <BriefField label="Material" value={brief.material} />
          <BriefField label="Geometry / size" value={brief.geometryOrSize} />
          <BriefField label="Damage or build area" value={brief.damageOrBuildArea} />
          <BriefField label="Review readiness" value={brief.reviewReadiness} />
          <BriefField label="Brief completeness" value={brief.briefCompleteness} />
          <BriefField label="Evidence burden" value={brief.evidenceBurden} />
        </div>
        <BriefField label="Completeness note" value={brief.completenessNote} />
        <BriefField label="Evidence burden note" value={brief.evidenceBurdenNote} />
        <BriefField label="Preliminary route" value={brief.preliminaryRoute} />
        <BriefList label="Available data" items={brief.availableData} />
        <BriefList label="Known facts" items={brief.knownFacts} />
        <div>
          <p className="text-sm font-bold text-white">Missing information:</p>
          <div className="mt-2 grid gap-3 md:grid-cols-3">
            <BriefList label="Critical gaps" items={brief.missingCritical} warning />
            <BriefList label="Useful gaps" items={brief.missingUseful} />
            <BriefList label="Optional context" items={brief.missingOptional} />
          </div>
        </div>
        <BriefList label="Risk flags" items={brief.riskFlags} warning />
        <BriefList label="Evidence needed" items={brief.evidenceNeeded} />
        <BriefField label="Next action" value={brief.nextAction} />
        <BriefField label="Exafuse review route" value={brief.exafuseReviewRoute} />
        {!compact && <BriefField label="No-backend note" value={brief.noBackendNote} />}
      </div>

      {showExport && (
        <DecisionBriefExport
          brief={brief}
          exafuseUrl={exafuseUrl}
          exafuseLabel={exafuseLabel}
          matchingToolHref={matchingToolHref}
          matchingToolLabel={matchingToolLabel}
          compact={compact}
        />
      )}
    </div>
  );
}

function BriefField({ label, value, large = false }: { label: string; value: string; large?: boolean }) {
  return (
    <div>
      <p className="text-sm font-bold text-white">{label}:</p>
      <p className={`result-card mt-2 leading-6 text-slate-300 ${large ? "text-lg font-black text-white md:text-xl" : "text-sm"}`}>
        {value}
      </p>
    </div>
  );
}

function BriefList({ label, items, warning = false }: { label: string; items: string[]; warning?: boolean }) {
  return (
    <div>
      <p className="text-sm font-bold text-white">{label}:</p>
      <ul className="mt-2 grid gap-2 text-sm text-slate-300">
        {(items.length ? items : ["Not specified."]).map((item) => (
          <li key={item} className={warning ? "result-card result-card--warning" : "result-card"}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
