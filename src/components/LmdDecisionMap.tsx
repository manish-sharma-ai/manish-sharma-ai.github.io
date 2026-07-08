import { useMemo, useState } from "react";
import DecisionBriefCard from "./DecisionBriefCard";
import { createDecisionBrief } from "../lib/decisionBrief";

const DISCLAIMER =
  "Preliminary decision-support only. Final feasibility depends on base material, geometry, service conditions, inspection requirements, and expert review.";

const DEFAULT_EXAFUSE_URL = "/contact";
const DEFAULT_EXAFUSE_LABEL = "Contact routes";

const defaults = {
  partState: "damaged",
  partScale: "large",
  goal: "local repair",
  problem: "wear",
  detailNeed: "normal external geometry",
  inspectionBurden: "defined inspection needed"
};

const exampleValues = {
  partState: "damaged",
  partScale: "large",
  goal: "local repair",
  problem: "wear",
  detailNeed: "tight final tolerance",
  inspectionBurden: "defined inspection needed"
};

interface DecisionMapProps {
  exafuseUrl?: string;
  exafuseLabel?: string;
}

export default function LmdDecisionMap({
  exafuseUrl = DEFAULT_EXAFUSE_URL,
  exafuseLabel = DEFAULT_EXAFUSE_LABEL
}: DecisionMapProps) {
  const [values, setValues] = useState(defaults);

  const result = useMemo(() => {
    let lmd = 0;
    let slm = 0;
    let machining = 0;
    let welding = 0;
    let replace = 0;
    const why: string[] = [];
    const riskFlags: string[] = [];
    const evidenceNeeded = [
      "exact material grade and base-material condition",
      "drawing/CAD or measured dimensions",
      "photos or scan of the damage/build area",
      "tolerance, finishing, and inspection requirements"
    ];

    if (values.partState === "damaged") {
      lmd += 3;
      welding += 1;
      why.push("A damaged part makes repair, cladding, welding, machining recovery, or replacement the first comparison.");
    } else {
      slm += 1;
      machining += 1;
      why.push("A new part should be compared against SLM/LPBF, CNC, casting, LMD build-up, and hybrid routes.");
    }

    if (values.partScale === "large") {
      lmd += 4;
      why.push("Large parts are a strong LMD signal when local deposition, repair, or cladding is useful.");
    }
    if (values.partScale === "small") {
      slm += 3;
      machining += 1;
      why.push("Small parts with fine detail may fit SLM/LPBF or CNC routes better than LMD.");
    }

    if (values.goal === "local repair") {
      lmd += 4;
      evidenceNeeded.push("damage depth and repair boundary");
      why.push("Local repair is one of the strongest LMD/DED signals.");
    }
    if (values.goal === "surface cladding") {
      lmd += 3;
      evidenceNeeded.push("surface function: wear, corrosion, heat, or dimensional restoration");
      why.push("Surface cladding points toward LMD/laser cladding when the base part can accept deposition and finishing.");
    }
    if (values.goal === "full geometry") {
      slm += values.partScale === "small" ? 3 : 1;
      lmd += values.partScale === "large" ? 2 : 0;
      machining += 1;
      why.push("Full geometry needs a process comparison against size, complexity, material, and finishing needs.");
    }
    if (values.goal === "machining error recovery") {
      lmd += 2;
      welding += 1;
      machining += 2;
      evidenceNeeded.push("missing-stock location and required final machining allowance");
      why.push("Machining error recovery depends on local stock restoration, machinability, and tolerance recovery.");
    }

    if (values.problem === "cracking") {
      riskFlags.push("Cracking needs root-cause review before any repair route is selected.");
      evidenceNeeded.push("crack extent, removal plan, and NDT requirement");
      lmd -= 1;
      replace += 2;
    }
    if (values.problem === "corrosion") {
      lmd += 1;
      evidenceNeeded.push("corrosion environment and required corrosion resistance");
      why.push("Corrosion can point toward cladding, but service environment and material compatibility decide the route.");
    }
    if (values.problem === "heat") {
      riskFlags.push("Heat exposure needs material and oxidation/thermal-fatigue context.");
      evidenceNeeded.push("temperature exposure and duty cycle");
    }
    if (values.problem === "wear") {
      lmd += 1;
      evidenceNeeded.push("wear mode: abrasion, adhesion, impact, erosion, or surface fatigue");
      why.push("Wear is often a cladding or repair signal when the damage is local and inspectable.");
    }

    if (values.detailNeed === "internal channels or fine lattice") {
      slm += 5;
      riskFlags.push("Internal channels and fine lattice features are weak LMD signals and often favor SLM/LPBF.");
    }
    if (values.detailNeed === "tight final tolerance") {
      machining += 3;
      riskFlags.push("Tight final tolerance requires a post-machining and inspection route.");
      evidenceNeeded.push("post-machining allowance and tolerance stack");
    }

    if (values.inspectionBurden === "safety critical or formal qualification") {
      riskFlags.push("Safety-critical or formally qualified parts require formal inspection/qualification planning.");
      evidenceNeeded.push("acceptance criteria, inspection standard, and expert review route");
    }

    const scores = [
      ["LMD repair with post-machining and inspection", lmd],
      ["Laser cladding / LMD surface route", values.goal === "surface cladding" ? lmd + 2 : lmd - 1],
      ["SLM/LPBF alternative", slm],
      ["CNC / machining-first route", machining],
      ["Welding or replacement review", Math.max(welding, replace)]
    ] as const;

    const [route] = [...scores].sort((a, b) => b[1] - a[1])[0];
    const recommendedRoute =
      riskFlags.length >= 3 && values.inspectionBurden === "safety critical or formal qualification"
        ? "Manual expert review before route selection"
        : route;

    const missingCritical = [
      "exact material grade",
      "damage depth or build area",
      "drawing/CAD or measured dimensions",
      "operating conditions",
      "inspection requirement"
    ];
    const missingUseful = [
      "photos from multiple angles",
      "post-machining allowance",
      "tolerance target",
      "failure history",
      "replacement and downtime context"
    ];

    return {
      recommendedRoute,
      why,
      missingCritical,
      missingUseful,
      riskFlags: riskFlags.length ? riskFlags : ["No major route blocker from selected inputs; missing RFQ data may still change the result."],
      evidenceNeeded: [...new Set(evidenceNeeded)],
      nextStep:
        "Convert this route signal into an LMD Decision Brief with material, geometry, damage/build area, operating conditions, tolerance, inspection requirement, and photos/CAD before expert review."
    };
  }, [values]);

  const brief = createDecisionBrief({
    situation: "Interactive LMD Decision Map route screening.",
    component: `${values.partScale} ${values.partState} part, exact component not yet specified.`,
    goal: values.goal,
    material: "Material grade still required for any serious recommendation.",
    geometryOrSize: `${values.partScale}; ${values.detailNeed}.`,
    damageOrBuildArea: `${values.problem}; ${values.goal}.`,
    availableData: [
      `Part state: ${values.partState}`,
      `Scale: ${values.partScale}`,
      `Goal: ${values.goal}`,
      `Problem: ${values.problem}`,
      `Detail need: ${values.detailNeed}`,
      `Inspection context: ${values.inspectionBurden}`
    ],
    knownFacts: result.why,
    missingInformation: [...result.missingCritical, ...result.missingUseful],
    missingCritical: result.missingCritical,
    missingUseful: result.missingUseful,
    missingOptional: ["quantity", "deadline", "replacement/downtime economics"],
    riskFlags: result.riskFlags,
    evidenceNeeded: result.evidenceNeeded,
    preliminaryRoute: result.recommendedRoute,
    reviewReadiness: "Ready for preliminary discussion",
    nextAction: result.nextStep,
    exafuseReviewRoute: `${exafuseLabel}. Use Exafuse for commercial and technical review after the route question is structured.`,
    generatedFrom: "LMD Decision Map"
  });

  return (
    <div className="tool-panel">
      <div>
        <div className="tool-input-grid">
          <Select label="Is the part damaged or new?" value={values.partState} options={["damaged", "new"]} onChange={(value) => setValues({ ...values, partState: value })} />
          <Select label="Is the part large or small?" value={values.partScale} options={["large", "medium", "small"]} onChange={(value) => setValues({ ...values, partScale: value })} />
          <Select label="What is the main goal?" value={values.goal} options={["local repair", "surface cladding", "full geometry", "machining error recovery"]} onChange={(value) => setValues({ ...values, goal: value })} />
          <Select label="What is the main problem?" value={values.problem} options={["wear", "corrosion", "heat", "cracking", "machining error"]} onChange={(value) => setValues({ ...values, problem: value })} />
          <Select label="Geometry/detail need" value={values.detailNeed} options={["normal external geometry", "tight final tolerance", "internal channels or fine lattice"]} onChange={(value) => setValues({ ...values, detailNeed: value })} />
          <Select label="Inspection context" value={values.inspectionBurden} options={["screening only", "defined inspection needed", "safety critical or formal qualification"]} onChange={(value) => setValues({ ...values, inspectionBurden: value })} />
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <button type="button" onClick={() => setValues(exampleValues)} className="btn btn-secondary">Use worn-part example</button>
          <button type="button" onClick={() => setValues(defaults)} className="btn btn-secondary">Reset</button>
        </div>
      </div>
      <aside className="ordered-card-strong h-fit p-6 md:p-7">
        <p className="metric-label">Decision map output</p>
        <p className="mt-3 rounded-lg border border-amber-300/25 bg-amber-400/10 p-3 text-sm font-bold text-amber-50">
          Route signal only. This is not approval, certification, release evidence, or a quality guarantee.
        </p>
        <ResultSection label="Recommended route" value={result.recommendedRoute} large />
        <ResultList label="Why" items={result.why} />
        <ResultList label="Critical missing information" items={result.missingCritical} />
        <ResultList label="Risk flags" items={result.riskFlags} />
        <ResultList label="Evidence needed" items={result.evidenceNeeded} />
        <ResultSection label="Suggested next step" value={result.nextStep} />
        <ResultSection label="Disclaimer" value={DISCLAIMER} tone="warning" />
        <DecisionBriefCard
          brief={brief}
          eyebrow="Standard artifact"
          exafuseUrl={exafuseUrl}
          exafuseLabel={exafuseLabel}
          matchingToolHref="/decision-map"
          matchingToolLabel="Open decision map"
        />
      </aside>
    </div>
  );
}

function Select({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="tool-field">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
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
        {items.map((item) => (
          <li key={item} className="result-card">{item}</li>
        ))}
      </ul>
    </div>
  );
}
