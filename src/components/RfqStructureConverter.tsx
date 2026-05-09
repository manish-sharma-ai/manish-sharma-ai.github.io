import { useMemo, useState } from "react";

const materialTerms = ["steel", "stainless", "inconel", "titanium", "aluminum", "tool steel", "nickel", "cobalt", "bronze"];
const damageTerms = ["crack", "wear", "worn", "corrosion", "chip", "erosion", "missing", "dent", "machining error"];

export default function RfqStructureConverter() {
  const [text, setText] = useState("Repair a worn stainless steel shaft with local damage near the bearing seat. Photos are available but CAD is missing. Need tight tolerance and hardness requirement.");

  const parsed = useMemo(() => {
    const lower = text.toLowerCase();
    const material = materialTerms.find((term) => lower.includes(term));
    const damage = damageTerms.filter((term) => lower.includes(term));
    const hasPhotos = lower.includes("photo");
    const hasCad = lower.includes("cad") && !lower.includes("cad is missing") && !lower.includes("no cad");
    const hasDrawing = lower.includes("drawing");
    const missing = [
      !material && "material grade",
      damage.length === 0 && "damage type and depth",
      !hasCad && "CAD file or repair-zone geometry",
      !hasDrawing && "drawing with tolerance",
      !lower.includes("temperature") && "operating temperature",
      !lower.includes("inspection") && "inspection requirement",
      !lower.includes("timeline") && "timeline or downtime constraint"
    ].filter(Boolean) as string[];

    return {
      part: lower.includes("shaft") ? "shaft" : lower.includes("tool") ? "tooling part" : "not clearly identified",
      material: material ?? "unknown",
      damage: damage.length > 0 ? damage.join(", ") : "not clearly described",
      known: [
        hasPhotos && "photos available",
        hasCad && "CAD available",
        hasDrawing && "drawing mentioned",
        lower.includes("tight") && "tight tolerance mentioned",
        lower.includes("hardness") && "hardness requirement mentioned"
      ].filter(Boolean) as string[],
      missing
    };
  }, [text]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <label className="grid gap-2 text-sm font-bold text-white">
        Repair request text
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={12}
          className="ordered-card min-h-[24rem] p-4 text-sm leading-6 text-slate-100 outline-none transition focus:border-cyan-300/50"
        />
      </label>
      <aside className="ordered-card-strong p-6">
        <p className="metric-label">Structured RFQ preview</p>
        <div className="mt-5 grid gap-4 text-sm">
          <Field label="Part" value={parsed.part} />
          <Field label="Material" value={parsed.material} />
          <Field label="Damage" value={parsed.damage} />
          <Field label="Known information" value={parsed.known.length ? parsed.known.join(", ") : "limited"} />
          <div>
            <p className="font-bold text-white">Missing information</p>
            <ul className="mt-2 grid gap-2 text-slate-300">
              {parsed.missing.map((item) => <li key={item} className="ordered-card px-3 py-2">{item}</li>)}
            </ul>
          </div>
          <div>
            <p className="font-bold text-white">Next questions</p>
            <p className="mt-2 leading-6 text-slate-300">
              Confirm material grade, damage depth, operating conditions, tolerance, inspection method, and whether CAD or drawings can be shared.
            </p>
          </div>
        </div>
        <p className="mt-6 rounded-md border border-orange-300/25 bg-orange-500/10 p-3 text-sm leading-6 text-orange-50">
          Basic heuristic demo. It uses keyword rules only and does not call an AI model.
        </p>
      </aside>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-bold text-white">{label}</p>
      <p className="ordered-card mt-1 px-3 py-2 text-slate-300">{value}</p>
    </div>
  );
}
