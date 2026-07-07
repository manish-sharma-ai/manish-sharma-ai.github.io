import { useMemo, useState } from "react";

const DISCLAIMER =
  "Preliminary decision-support only. Final feasibility depends on base material, geometry, service conditions, inspection requirements, and expert review.";
const DEFAULT_EXAFUSE_URL = "/contact";
const DEFAULT_EXAFUSE_LABEL = "Contact routes";

const situations = [
  {
    id: "repair",
    label: "Repair damaged/worn part",
    route: "/tools#repairability-module",
    tool: "LMD Repairability Quick Check",
    action: "Screen repairability before asking for expert review."
  },
  {
    id: "new-build",
    label: "Build new metal feature/part",
    route: "/tools#route-module",
    tool: "LMD vs SLM Advisor",
    action: "Compare process route signals before choosing LMD, SLM/LPBF, hybrid manufacturing, or review."
  },
  {
    id: "cladding",
    label: "Add coating/cladding",
    route: "/brief-template",
    tool: "Decision brief template",
    action: "Structure coating function, base material, surface target, finishing, and inspection needs."
  },
  {
    id: "compare",
    label: "Compare LMD vs SLM",
    route: "/tools#route-module",
    tool: "LMD vs SLM Advisor",
    action: "Start with size, local addition, complexity, tolerance, and internal-feature constraints."
  },
  {
    id: "rfq",
    label: "Prepare RFQ",
    route: "/tools#rfq-module",
    tool: "RFQ Prompt-to-Structure Converter",
    action: "Convert vague text into known facts, missing fields, risk flags, and an RFQ summary."
  },
  {
    id: "monitoring",
    label: "Understand monitoring/evidence",
    route: "/frameworks/lmd-quality-evidence-ladder",
    tool: "LMD Quality Evidence Ladder",
    action: "Separate process signals from inspection evidence and release proof."
  }
] as const;

const infoOptions = [
  ["materialKnown", "Material known?"],
  ["drawingAvailable", "Drawing/CAD available?"],
  ["photosAvailable", "Photos available?"],
  ["damageDepthKnown", "Damage depth known?"],
  ["toleranceKnown", "Tolerance known?"],
  ["operatingKnown", "Operating conditions known?"],
  ["inspectionKnown", "Inspection requirement known?"]
] as const;

const riskOptions = [
  ["safetyCritical", "Safety critical?"],
  ["highDowntime", "High downtime cost?"],
  ["tightTolerance", "Tight tolerance?"],
  ["unknownMaterial", "Unknown material?"],
  ["noInspection", "No inspection path?"]
] as const;

const examples = [
  {
    label: "Worn shaft near bearing seat",
    situation: "repair",
    info: ["materialKnown", "photosAvailable", "toleranceKnown"],
    risk: ["highDowntime", "tightTolerance"]
  },
  {
    label: "Large cracked steel component",
    situation: "repair",
    info: ["materialKnown", "photosAvailable"],
    risk: ["highDowntime", "noInspection"]
  },
  {
    label: "Surface wear / cladding request",
    situation: "cladding",
    info: ["materialKnown", "photosAvailable", "operatingKnown"],
    risk: ["tightTolerance"]
  },
  {
    label: "New part with fine internal channels",
    situation: "compare",
    info: ["drawingAvailable", "toleranceKnown", "operatingKnown"],
    risk: ["tightTolerance"]
  },
  {
    label: "Bridge-like large structural LMD context",
    situation: "new-build",
    info: ["materialKnown", "drawingAvailable", "inspectionKnown"],
    risk: ["safetyCritical", "highDowntime"]
  },
  {
    label: "Monitoring signal / melt-pool anomaly",
    situation: "monitoring",
    info: ["photosAvailable", "inspectionKnown"],
    risk: ["noInspection"]
  }
] as const;

type SituationId = (typeof situations)[number]["id"];
type InfoId = (typeof infoOptions)[number][0];
type RiskId = (typeof riskOptions)[number][0];

interface CockpitProps {
  exafuseUrl?: string;
  exafuseLabel?: string;
  compact?: boolean;
}

const emptyState = {
  situation: "repair" as SituationId,
  info: [] as InfoId[],
  risk: [] as RiskId[]
};

export default function LmdDecisionCockpit({
  exafuseUrl = DEFAULT_EXAFUSE_URL,
  exafuseLabel = DEFAULT_EXAFUSE_LABEL,
  compact = false
}: CockpitProps) {
  const [state, setState] = useState(emptyState);

  const result = useMemo(() => {
    const situation = situations.find((item) => item.id === state.situation) ?? situations[0];
    const known = infoOptions
      .filter(([id]) => state.info.includes(id))
      .map(([, label]) => label.replace("?", "").toLowerCase());
    const missing = infoOptions
      .filter(([id]) => !state.info.includes(id))
      .map(([, label]) => label.replace("?", "").toLowerCase());
    const selectedRisks = riskOptions
      .filter(([id]) => state.risk.includes(id))
      .map(([, label]) => label.replace("?", "").toLowerCase());

    const riskFlags = selectedRisks.length
      ? selectedRisks.map((risk) => `${risk} can change the route or evidence burden.`)
      : ["No high-risk flag selected yet; missing data may still change the decision."];

    const evidenceNeeded = [
      state.info.includes("inspectionKnown")
        ? "Defined inspection requirement"
        : "Inspection requirement to be defined",
      state.info.includes("materialKnown") && !state.risk.includes("unknownMaterial")
        ? "Confirmed material grade/source"
        : "Material grade and compatibility evidence",
      state.info.includes("toleranceKnown") || state.risk.includes("tightTolerance")
        ? "Dimensional inspection and post-machining plan"
        : "Tolerance target and finishing route",
      state.situation === "monitoring"
        ? "Correlation between process signal and inspection result"
        : "Part-specific feasibility review"
    ];

    const reviewReadiness = state.risk.includes("safetyCritical") || state.risk.includes("noInspection")
      ? "Requires formal inspection/qualification planning"
      : missing.length > 4
        ? "Not enough information"
        : missing.length > 2
          ? "Ready for preliminary discussion"
          : "Ready for expert review";

    return {
      situation,
      known,
      missing,
      riskFlags,
      evidenceNeeded,
      reviewReadiness,
      decisionSignal: `${situation.label}: start with ${situation.tool}.`,
      nextAction: situation.action,
      toolRoute: situation.route
    };
  }, [state]);

  const brief = formatBrief(result, exafuseLabel, exafuseUrl);
  const rfqSummary = formatRfqSummary(result, exafuseLabel, exafuseUrl);

  return (
    <section id="lmd-decision-cockpit" className="ordered-card-strong scroll-mt-24 p-5 md:p-7">
      <div className="grid gap-8 xl:grid-cols-[0.92fr_1.08fr]">
        <div>
          <div className="flex flex-wrap gap-2">
            <span className="chip">LMD Decision Cockpit</span>
            <span className="chip chip--steel">Frontend-only</span>
            <span className="chip chip--amber">No input tracking</span>
          </div>
          <h2 className="mt-4 text-3xl font-black leading-tight text-white md:text-4xl">
            Start with a part, not a perfect RFQ.
          </h2>
          <p className="mt-4 text-sm leading-6 text-slate-300 md:text-base md:leading-7">
            Pick the situation, mark what is known, then expose what is missing, risky, and needed as evidence. Inputs stay in this browser session only.
          </p>

          <div className="mt-6 grid gap-5">
            <fieldset>
              <legend className="metric-label">1. What is the situation?</legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {situations.map((situation) => (
                  <button
                    key={situation.id}
                    type="button"
                    onClick={() => setState((current) => ({ ...current, situation: situation.id }))}
                    className={`rounded-lg border p-3 text-left text-sm font-bold leading-5 transition ${
                      state.situation === situation.id
                        ? "border-cyan-300/70 bg-cyan-300/14 text-white"
                        : "border-white/10 bg-white/[0.035] text-slate-300 hover:border-cyan-300/35 hover:text-white"
                    }`}
                  >
                    {situation.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="metric-label">2. What information is available?</legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {infoOptions.map(([id, label]) => (
                  <Toggle
                    key={id}
                    label={label}
                    checked={state.info.includes(id)}
                    onChange={(checked) =>
                      setState((current) => ({
                        ...current,
                        info: checked ? [...current.info, id] : current.info.filter((item) => item !== id)
                      }))
                    }
                  />
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="metric-label">3. What is the risk?</legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {riskOptions.map(([id, label]) => (
                  <Toggle
                    key={id}
                    label={label}
                    checked={state.risk.includes(id)}
                    onChange={(checked) =>
                      setState((current) => ({
                        ...current,
                        risk: checked ? [...current.risk, id] : current.risk.filter((item) => item !== id)
                      }))
                    }
                    risk
                  />
                ))}
              </div>
            </fieldset>

            {!compact && (
              <div>
                <p className="metric-label">Use example</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {examples.map((example) => (
                    <button
                      key={example.label}
                      type="button"
                      onClick={() =>
                        setState({
                          situation: example.situation as SituationId,
                          info: [...example.info] as InfoId[],
                          risk: [...example.risk] as RiskId[]
                        })
                      }
                      className="btn btn-secondary"
                    >
                      {example.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={() => setState(emptyState)} className="btn btn-secondary">
                Reset
              </button>
              <a href="/demo" className="btn btn-secondary">90-second demo</a>
            </div>
          </div>
        </div>

        <aside className="ordered-card h-fit p-5 md:p-6">
          <p className="metric-label">Cockpit output</p>
          <p className="mt-3 rounded-lg border border-amber-300/25 bg-amber-400/10 p-3 text-sm font-bold text-amber-50">
            Confidence is not approval. This is a route signal, not engineering release.
          </p>
          <ResultSection label="Decision signal" value={result.decisionSignal} large />
          <ResultSection label="Review readiness" value={result.reviewReadiness} />
          <ResultSection label="Best matching tool" value={result.situation.tool} />
          <ResultList label="Known facts" items={result.known.length ? result.known : ["No concrete input facts selected yet."]} />
          <ResultList label="Missing information" items={result.missing} />
          <ResultList label="Risk flags" items={result.riskFlags} />
          <ResultList label="Evidence needed" items={result.evidenceNeeded} />
          <ResultSection label="Next action" value={result.nextAction} />
          <ResultSection label="Exafuse review route" value={`${exafuseLabel}. Exafuse performs commercial and technical review.`} />
          <ResultSection label="Boundary" value={DISCLAIMER} tone="warning" />
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={() => copyToClipboard(brief)} className="btn btn-primary">Copy brief</button>
            <a href={result.toolRoute} className="btn btn-secondary">Open matching tool</a>
            <button type="button" onClick={() => copyToClipboard(rfqSummary)} className="btn btn-secondary">
              Prepare Exafuse-ready RFQ summary
            </button>
            <a href={exafuseUrl} className="btn btn-laser" target={exafuseUrl.startsWith("http") ? "_blank" : undefined} rel={exafuseUrl.startsWith("http") ? "noreferrer" : undefined}>
              {exafuseLabel}
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Toggle({
  label,
  checked,
  onChange,
  risk = false
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  risk?: boolean;
}) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm font-semibold leading-5 transition ${
        checked
          ? risk
            ? "border-orange-300/55 bg-orange-500/12 text-orange-50"
            : "border-cyan-300/55 bg-cyan-300/10 text-white"
          : "border-white/10 bg-white/[0.035] text-slate-300 hover:border-white/20 hover:text-white"
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 accent-cyan-300"
      />
      <span>{label}</span>
    </label>
  );
}

function ResultSection({
  label,
  value,
  large = false,
  tone = "default"
}: {
  label: string;
  value: string;
  large?: boolean;
  tone?: "default" | "warning";
}) {
  return (
    <div className="mt-5">
      <p className="text-sm font-bold text-white">{label}:</p>
      <p className={`${tone === "warning" ? "result-card result-card--warning" : "result-card text-slate-300"} mt-2 leading-6 ${large ? "text-xl font-black text-white md:text-2xl" : "text-sm"}`}>
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

function formatBrief(
  result: {
    decisionSignal: string;
    reviewReadiness: string;
    situation: { tool: string };
    known: string[];
    missing: string[];
    riskFlags: string[];
    evidenceNeeded: string[];
    nextAction: string;
  },
  exafuseLabel: string,
  exafuseUrl: string
) {
  return [
    "## LMD Decision Cockpit brief",
    "",
    `Decision signal: ${result.decisionSignal}`,
    `Review readiness: ${result.reviewReadiness}`,
    `Best matching tool: ${result.situation.tool}`,
    `Known facts: ${result.known.join(", ") || "none selected"}`,
    `Missing information: ${result.missing.join(", ") || "none flagged"}`,
    `Risk flags: ${result.riskFlags.join(", ")}`,
    `Evidence needed: ${result.evidenceNeeded.join(", ")}`,
    `Next action: ${result.nextAction}`,
    `Exafuse review route: ${exafuseLabel} (${exafuseUrl})`,
    "Confidence is not approval.",
    DISCLAIMER
  ].join("\n");
}

function formatRfqSummary(
  result: {
    decisionSignal: string;
    known: string[];
    missing: string[];
    riskFlags: string[];
    evidenceNeeded: string[];
  },
  exafuseLabel: string,
  exafuseUrl: string
) {
  return [
    "## Exafuse-ready RFQ preparation summary",
    "",
    `Initial request: ${result.decisionSignal}`,
    `Known facts: ${result.known.join(", ") || "none selected"}`,
    `Missing facts to collect: ${result.missing.join(", ") || "none flagged"}`,
    `Risk flags: ${result.riskFlags.join(", ")}`,
    `Evidence needed: ${result.evidenceNeeded.join(", ")}`,
    `Exafuse route: ${exafuseLabel} (${exafuseUrl})`,
    "Confidence is not approval.",
    DISCLAIMER
  ].join("\n");
}

function copyToClipboard(value: string) {
  void navigator.clipboard?.writeText(value);
}
