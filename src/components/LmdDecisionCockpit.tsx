import { useEffect, useMemo, useState } from "react";
import DecisionBriefCard from "./DecisionBriefCard";
import type { DecisionBrief } from "../lib/decisionBrief";
import {
  COCKPIT_PRESETS,
  REVIEW_PHASE_OPTIONS,
  REVIEW_ROLE_OPTIONS,
  WORN_SHAFT_SCENARIO,
  createDecisionBrief,
  formatReviewContextFacts,
  getCockpitPreset
} from "../lib/decisionBrief";
import type { ReviewPhaseId, ReviewRoleId } from "../lib/decisionBrief";

const DEFAULT_EXAFUSE_URL = "/contact";
const DEFAULT_EXAFUSE_LABEL = "Contact routes";
const OUTPUT_BOUNDARY_LABELS = ["Confidence is not approval", "Missing information", "Risk flags", "Evidence needed"];

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
    route: "/tools#lmd-decision-cockpit",
    tool: "LMD Decision Brief",
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
  ["inspectionKnown", "Inspection requirement known?"],
  ["dimensionsKnown", "Dimensions / approximate mass known?"],
  ["timelineKnown", "Quantity / target date known?"]
] as const;

const riskOptions = [
  ["safetyCritical", "Safety critical?"],
  ["highDowntime", "High downtime cost?"],
  ["tightTolerance", "Tight tolerance?"],
  ["unknownMaterial", "Unknown material?"],
  ["noInspection", "No inspection path?"]
] as const;

type SituationId = (typeof situations)[number]["id"];
type InfoId = (typeof infoOptions)[number][0];
type RiskId = (typeof riskOptions)[number][0];

interface CockpitProps {
  exafuseUrl?: string;
  exafuseLabel?: string;
  compact?: boolean;
  defaultMode?: "example" | "blank";
}

interface CockpitState {
  situation: SituationId;
  info: InfoId[];
  risk: RiskId[];
  role: ReviewRoleId | null;
  phase: ReviewPhaseId | null;
}

const emptyState: CockpitState = {
  situation: "repair",
  info: [],
  risk: [],
  role: null,
  phase: null
};

const wornShaftPreset = getCockpitPreset("worn-shaft") ?? COCKPIT_PRESETS[0];

function stateFromPreset(presetId: string): CockpitState {
  const preset = getCockpitPreset(presetId) ?? wornShaftPreset;
  return {
    situation: preset.state.situation as SituationId,
    info: [...preset.state.info] as InfoId[],
    risk: [...preset.state.risk] as RiskId[],
    role: null,
    phase: null
  };
}

function labelForInfo(id: InfoId) {
  return infoOptions.find(([optionId]) => optionId === id)?.[1].replace("?", "") ?? id;
}

function labelForRisk(id: RiskId) {
  return riskOptions.find(([optionId]) => optionId === id)?.[1].replace("?", "") ?? id;
}

export default function LmdDecisionCockpit({
  exafuseUrl = DEFAULT_EXAFUSE_URL,
  exafuseLabel = DEFAULT_EXAFUSE_LABEL,
  compact = false,
  defaultMode = "example"
}: CockpitProps) {
  const defaultPresetId = defaultMode === "example" ? "worn-shaft" : null;
  const [state, setState] = useState<CockpitState>(defaultMode === "example" ? stateFromPreset("worn-shaft") : emptyState);
  const [activePresetId, setActivePresetId] = useState<string | null>(defaultPresetId);
  const [controlsExpanded, setControlsExpanded] = useState(!compact);

  useEffect(() => {
    const loadHashPreset = () => {
      const match = window.location.hash.match(/preset=([^&]+)/);
      const preset = match ? getCockpitPreset(decodeURIComponent(match[1])) : undefined;
      if (!preset) return;
      setState(stateFromPreset(preset.id));
      setActivePresetId(preset.id);
    };

    loadHashPreset();
    window.addEventListener("hashchange", loadHashPreset);
    return () => window.removeEventListener("hashchange", loadHashPreset);
  }, []);

  const result = useMemo(() => {
    const situation = situations.find((item) => item.id === state.situation) ?? situations[0];
    const knownTechnicalFacts = infoOptions
      .filter(([id]) => state.info.includes(id))
      .map(([id]) => labelForInfo(id).toLowerCase());
    const contextFacts = formatReviewContextFacts(state.role, state.phase);
    const known = knownTechnicalFacts.length
      ? [...contextFacts, ...knownTechnicalFacts]
      : ["No concrete technical facts selected yet.", ...contextFacts];
    const missing = infoOptions
      .filter(([id]) => !state.info.includes(id))
      .map(([id]) => labelForInfo(id).toLowerCase());
    const selectedRisks = riskOptions
      .filter(([id]) => state.risk.includes(id))
      .map(([id]) => labelForRisk(id).toLowerCase());

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
      state.info.includes("dimensionsKnown")
        ? "Dimensions / approximate mass context"
        : "Dimensions / approximate mass to be defined",
      state.info.includes("timelineKnown")
        ? "Quantity / target date context"
        : "Quantity / target date to be defined",
      state.situation === "monitoring"
        ? "Correlation between process signal and inspection result"
        : "Part-specific feasibility review"
    ];

    const reviewReadiness = state.risk.includes("safetyCritical") || state.risk.includes("noInspection")
      ? "Requires formal inspection / qualification planning"
      : missing.length > 4
        ? "Not enough information"
        : missing.length > 2
          ? "Ready for preliminary discussion"
          : "Ready for expert review";

    const decisionSignal = `${situation.label}: start with ${situation.tool}.`;
    const activePreset = activePresetId ? getCockpitPreset(activePresetId) : undefined;
    const brief =
      activePreset?.brief ??
      createDecisionBrief({
        situation: decisionSignal,
        component: "Component not specified in cockpit selections.",
        goal: situation.action,
        material: state.risk.includes("unknownMaterial")
          ? "Unknown material flagged."
          : state.info.includes("materialKnown")
            ? "Material marked known; exact grade still needs review context."
            : "Material not yet specified.",
        geometryOrSize: state.info.includes("drawingAvailable")
          ? "Drawing/CAD marked available."
          : "Geometry, CAD, or drawing not yet available.",
        damageOrBuildArea:
          state.situation === "repair"
            ? "Damage or wear area needs depth, extent, access, and finishing context."
            : state.situation === "cladding"
              ? "Surface function, build area, and finishing route need definition."
              : "Build area or feature context needs definition.",
        availableData: known,
        knownFacts: known,
        missingInformation: missing,
        riskFlags,
        evidenceNeeded,
        preliminaryRoute: decisionSignal,
        reviewReadiness,
        nextAction: situation.action,
        exafuseReviewRoute: `${exafuseLabel}. Exafuse performs commercial and technical review after the question is structured.`,
        generatedFrom: "LMD Decision Cockpit"
      });

    return {
      situation,
      known,
      missing,
      riskFlags,
      evidenceNeeded,
      reviewReadiness,
      decisionSignal,
      nextAction: situation.action,
      toolRoute: situation.route,
      brief
    };
  }, [activePresetId, exafuseLabel, state]);

  function loadPreset(id: string) {
    const preset = getCockpitPreset(id);
    if (!preset) return;
    setState(stateFromPreset(preset.id));
    setActivePresetId(preset.id);
    if (compact) setControlsExpanded(false);
  }

  function startBlank() {
    setState(emptyState);
    setActivePresetId(null);
    setControlsExpanded(true);
  }

  function updateState(nextState: CockpitState) {
    setState(nextState);
    setActivePresetId(null);
  }

  const activePreset = activePresetId ? getCockpitPreset(activePresetId) : undefined;
  const activeExampleText =
    activePreset?.id === "worn-shaft"
      ? "worn steel shaft near bearing seat."
      : activePreset?.scenario;

  return (
    <section id="lmd-decision-cockpit" className="decision-cockpit ordered-card-strong tool-app-frame scroll-mt-24 p-5 md:p-7">
      <div className="tool-window-bar mb-5">
        <div>
          <p className="metric-label">Active module</p>
          <p className="tool-window-title">Decision Cockpit</p>
        </div>
        <ul className="tool-window-status" aria-label="Decision Cockpit status">
          <li>Local session</li>
          <li>Browser-local</li>
          <li>Decision-support only</li>
        </ul>
      </div>
      <div className="tool-workbench-grid">
        <div className="tool-control-rail">
          <div className="flex flex-wrap gap-2">
            <span className="chip">LMD Decision Cockpit</span>
            <span className="chip chip--steel">LMD Decision Brief v1.0</span>
            <span className="chip chip--amber">Conservative output</span>
          </div>
          <h2 className="cockpit-title mt-4 text-3xl font-black leading-tight text-white md:text-4xl">
            Start with a rough LMD question. Leave with a brief.
          </h2>
          <p className="mt-4 text-sm leading-6 text-slate-300 md:text-base md:leading-7">
            Pick the situation, mark what is known, then expose missing information, risk flags, evidence needed, and an Exafuse review route. Inputs stay in this browser session only.
          </p>
          {!compact && (
            <div className="cockpit-output-modes mt-4 flex flex-wrap gap-2">
              <span className="chip chip--steel">Technical Decision Brief</span>
              <span className="chip chip--steel">Exafuse-ready email draft</span>
              <span className="chip chip--steel">AI summary</span>
            </div>
          )}

          <div className="mt-5 rounded-lg border border-cyan-300/22 bg-cyan-300/8 p-4" data-example-scenario={WORN_SHAFT_SCENARIO}>
            <ul className="flex flex-wrap gap-2" aria-label="Example controls">
              <li>
                <button
                  type="button"
                  onClick={() => loadPreset("worn-shaft")}
                  aria-pressed={Boolean(activePresetId)}
                  aria-label="Show example: worn-shaft example"
                  className={`btn min-h-10 px-4 py-2 text-sm ${activePresetId ? "btn-primary" : "btn-secondary"}`}
                >
                  Show example
                </button>
                <span className="sr-only">; </span>
              </li>
              <li>
                <button
                  type="button"
                  onClick={startBlank}
                  aria-pressed={!activePresetId}
                  aria-label="Start blank: LMD Decision Brief"
                  className={`btn min-h-10 px-4 py-2 text-sm ${activePresetId ? "btn-secondary" : "btn-primary"}`}
                >
                  {compact ? "Start your own brief" : "Start blank"}
                </button>
                <span className="sr-only">; </span>
              </li>
            </ul>
            {activePreset ? (
              <p className="mt-3 text-sm font-semibold leading-6 text-cyan-50">
                Example scenario: {activeExampleText}
              </p>
            ) : (
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-300">
                Blank mode: make selections below. The brief updates in this browser session.
              </p>
            )}
            {compact && !controlsExpanded && (
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Review the worked output, start your own brief here, or <a href="/tools#lmd-decision-cockpit" className="font-black text-cyan-100 hover:text-white">open the full workbench</a>.
              </p>
            )}
          </div>

          {(!compact || controlsExpanded) && <div className="mt-6 grid gap-5">
            <fieldset>
              <legend className="metric-label">1. What is the situation?</legend>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2" aria-label="Situation choices">
                {situations.map((situation) => (
                  <li key={situation.id}>
                    <button
                      type="button"
                      onClick={() => updateState({ ...state, situation: situation.id })}
                      aria-pressed={state.situation === situation.id}
                      aria-label={`Choose situation: ${situation.label}`}
                      className={`h-full w-full rounded-lg border p-3 text-left text-sm font-bold leading-5 transition ${
                        state.situation === situation.id
                          ? "border-cyan-300/70 bg-cyan-300/14 text-white"
                          : "border-white/10 bg-white/[0.035] text-slate-300 hover:border-cyan-300/35 hover:text-white"
                      }`}
                    >
                      {situation.label}
                    </button>
                    <span className="sr-only">; </span>
                  </li>
                ))}
              </ul>
            </fieldset>

            <details className="ordered-card p-4" data-review-context>
              <summary className="flex min-h-11 items-center justify-between gap-3 text-sm font-black text-white">
                <span>2. What is the review context? <span className="font-semibold text-slate-400">Optional</span></span>
                <span className="chip chip--steel">{Number(Boolean(state.role)) + Number(Boolean(state.phase))}/2 marked</span>
              </summary>
              <div className="mt-4 grid gap-5 border-t border-white/10 pt-4">
                <fieldset>
                  <legend className="text-sm font-bold text-white">Who is preparing the brief?</legend>
                  <p className="mt-1 text-xs leading-5 text-slate-400">This only gives the reviewer context; it does not change technical evidence requirements.</p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {REVIEW_ROLE_OPTIONS.map((option) => (
                      <Toggle
                        key={option.id}
                        label={option.label}
                        checked={state.role === option.id}
                        inputType="radio"
                        name="review-role"
                        onChange={(checked) => checked && updateState({ ...state, role: option.id })}
                      />
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="text-sm font-bold text-white">What needs to happen next?</legend>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {REVIEW_PHASE_OPTIONS.map((option) => (
                      <Toggle
                        key={option.id}
                        label={option.label}
                        checked={state.phase === option.id}
                        inputType="radio"
                        name="review-phase"
                        onChange={(checked) => checked && updateState({ ...state, phase: option.id })}
                      />
                    ))}
                  </div>
                </fieldset>
                {(state.role || state.phase) && (
                  <button
                    type="button"
                    className="btn btn-secondary w-fit"
                    onClick={() => updateState({ ...state, role: null, phase: null })}
                  >
                    Clear optional context
                  </button>
                )}
              </div>
            </details>

            <details className="ordered-card p-4">
              <summary className="flex min-h-11 items-center justify-between gap-3 text-sm font-black text-white">
                <span>3. What information is available?</span>
                <span className="chip chip--steel">{state.info.length}/{infoOptions.length} marked</span>
              </summary>
              <fieldset className="mt-4 border-t border-white/10 pt-4">
                <legend className="sr-only">What information is available?</legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {infoOptions.map(([id, label]) => (
                    <Toggle
                      key={id}
                      label={label}
                      checked={state.info.includes(id)}
                      onChange={(checked) =>
                        updateState({
                          ...state,
                          info: checked ? [...state.info, id] : state.info.filter((item) => item !== id)
                        })
                      }
                    />
                  ))}
                </div>
              </fieldset>
            </details>

            <details className="ordered-card p-4">
              <summary className="flex min-h-11 items-center justify-between gap-3 text-sm font-black text-white">
                <span>4. What is the risk?</span>
                <span className="chip chip--amber">{state.risk.length}/{riskOptions.length} flagged</span>
              </summary>
              <fieldset className="mt-4 border-t border-white/10 pt-4">
                <legend className="sr-only">What is the risk?</legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {riskOptions.map(([id, label]) => (
                    <Toggle
                      key={id}
                      label={label}
                      checked={state.risk.includes(id)}
                      onChange={(checked) =>
                        updateState({
                          ...state,
                          risk: checked ? [...state.risk, id] : state.risk.filter((item) => item !== id)
                        })
                      }
                      risk
                    />
                  ))}
                </div>
              </fieldset>
            </details>

            {!compact && (
              <div>
                <p className="metric-label">Example presets</p>
                <ul className="mt-3 flex flex-wrap gap-2" aria-label="Example presets">
                  {COCKPIT_PRESETS.map((preset) => (
                    <li key={preset.id}>
                      <button
                        type="button"
                        onClick={() => loadPreset(preset.id)}
                        aria-pressed={activePresetId === preset.id}
                        aria-label={`Load example preset: ${preset.label}`}
                        className={`btn min-h-10 px-4 py-2 text-sm ${activePresetId === preset.id ? "btn-primary" : "btn-secondary"}`}
                      >
                        {preset.label}
                      </button>
                      <span className="sr-only">; </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <ul className="flex flex-wrap gap-3" aria-label="Cockpit utility links">
              <li>
                <button type="button" onClick={startBlank} className="btn btn-secondary">
                  Reset blank
                </button>
                <span className="sr-only">; </span>
              </li>
              <li>
                <a href="/demo" className="btn btn-secondary">
                  90-second demo
                </a>
                <span className="sr-only">; </span>
              </li>
              <li>
                <a href="/brief-template" className="btn btn-secondary">
                  Brief template
                </a>
                <span className="sr-only">; </span>
              </li>
            </ul>
          </div>}
        </div>

        <p className="sr-only" aria-live="polite">
          {result.decisionSignal} {result.reviewReadiness}. Missing information and risk flags remain visible in the brief.
        </p>
        <aside className="ordered-card tool-output-rail h-fit p-5 md:p-6" aria-label={OUTPUT_BOUNDARY_LABELS.join(" / ")}>
          <div className="tool-pane-heading mb-5">
            <p className="metric-label">Output pane</p>
            <p className="tool-pane-title">Standard decision brief</p>
            <p className="tool-pane-copy">The result updates locally as the situation, evidence, and risk controls change.</p>
          </div>
          <ResultSection label="Decision signal" value={result.decisionSignal} large />
          <DecisionBriefCard
            brief={result.brief as DecisionBrief}
            eyebrow="Cockpit output"
            title={result.brief.briefVersion}
            exafuseUrl={exafuseUrl}
            exafuseLabel={exafuseLabel}
            matchingToolHref={compact && activePresetId ? `/tools/#preset=${activePresetId}` : compact ? "/tools#lmd-decision-cockpit" : result.toolRoute}
            matchingToolLabel={compact ? "Open full brief" : "Open matching tool"}
            compact={compact}
          />
        </aside>
      </div>
    </section>
  );
}

function Toggle({
  label,
  checked,
  onChange,
  risk = false,
  inputType = "checkbox",
  name
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  risk?: boolean;
  inputType?: "checkbox" | "radio";
  name?: string;
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
        type={inputType}
        name={name}
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 accent-cyan-300"
      />
      <span>{label}<span className="sr-only">; </span></span>
    </label>
  );
}

function ResultSection({
  label,
  value,
  large = false
}: {
  label: string;
  value: string;
  large?: boolean;
}) {
  return (
    <div className="mb-5">
      <p className="text-sm font-bold text-white">{label}:</p>
      <p className={`result-card mt-2 leading-6 text-slate-300 ${large ? "text-xl font-black text-white md:text-2xl" : "text-sm"}`}>
        {value}
      </p>
    </div>
  );
}
