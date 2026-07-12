interface HeroLaserVisualProps {
  className?: string;
}

const legend = [
  ["Laser beam", "Focused energy reaches the deposition zone."],
  ["Melt pool", "The local molten region is a process observation point."],
  ["Deposited track", "Material is added along the intended repair or build path."],
  ["Process signal", "Monitoring can flag a review question, not final quality."],
  ["Inspection evidence", "Inspection and expert review establish the next defensible claim."]
];

export default function HeroLaserVisual({ className = "" }: HeroLaserVisualProps) {
  return (
    <figure className={["diagram-frame diagram-frame--hero", className].filter(Boolean).join(" ")}>
      <figcaption className="diagram-frame__header">
        <p className="metric-label">Illustrative LMD process schematic</p>
        <h2 className="mt-2 text-xl font-black leading-tight text-white">Process signal to inspection evidence</h2>
        <p className="mt-2 text-sm leading-6 text-slate-300">Read from the deposition zone toward the evidence needed for technical review.</p>
      </figcaption>
      <svg className="diagram-frame__canvas" viewBox="0 0 720 420" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="hero-laser" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#83f0ff" stopOpacity="0.25" />
            <stop offset="0.72" stopColor="#34ddff" stopOpacity="0.92" />
            <stop offset="1" stopColor="#ffd27a" stopOpacity="0.96" />
          </linearGradient>
          <radialGradient id="hero-melt-pool">
            <stop offset="0" stopColor="#fff3c4" />
            <stop offset="0.35" stopColor="#ffd27a" stopOpacity="0.96" />
            <stop offset="1" stopColor="#ff6b35" stopOpacity="0" />
          </radialGradient>
          <marker id="hero-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
            <path d="M0 0 L10 5 L0 10 Z" fill="#83f0ff" />
          </marker>
        </defs>

        <rect x="12" y="12" width="696" height="396" rx="18" fill="#071018" stroke="rgba(154, 209, 226, 0.2)" />
        <path d="M70 294 H382" stroke="#263640" strokeWidth="58" strokeLinecap="round" />
        <path d="M72 292 C146 270 208 276 286 292 C324 300 352 298 384 288" stroke="#d8faff" strokeWidth="12" strokeLinecap="round" fill="none" />
        <path d="M120 70 L274 262" stroke="url(#hero-laser)" strokeWidth="6" strokeLinecap="round" />
        <path d="M120 70 L274 262" stroke="#34ddff" strokeOpacity="0.14" strokeWidth="38" strokeLinecap="round" />
        <circle cx="278" cy="282" r="62" fill="url(#hero-melt-pool)" />
        <circle cx="278" cy="282" r="10" fill="#fff3c4" />

        <g fontFamily="Inter, Arial, sans-serif" fontWeight="700">
          <text x="70" y="54" fill="#d8faff" fontSize="18">Laser beam</text>
          <text x="208" y="360" fill="#d8faff" fontSize="18">Deposited track</text>
          <text x="222" y="226" fill="#ffd27a" fontSize="18">Melt pool</text>
        </g>

        <path d="M338 274 C402 224 430 156 490 138" stroke="#83f0ff" strokeWidth="2.5" fill="none" markerEnd="url(#hero-arrow)" />
        <path d="M510 160 C564 180 576 254 626 274" stroke="#ffd27a" strokeWidth="2.5" fill="none" markerEnd="url(#hero-arrow)" />
        <text x="390" y="194" fill="#9ad1e2" fontSize="16" fontFamily="Inter, Arial, sans-serif" fontWeight="700">observe</text>
        <text x="558" y="214" fill="#ffe1a2" fontSize="16" fontFamily="Inter, Arial, sans-serif" fontWeight="700">verify</text>

        <rect x="470" y="84" width="176" height="78" rx="12" fill="#0d1a22" stroke="#34ddff" strokeOpacity="0.5" />
        <rect x="514" y="246" width="164" height="78" rx="12" fill="#201a10" stroke="#ffd27a" strokeOpacity="0.54" />
        <text x="490" y="116" fill="#ffffff" fontSize="18" fontFamily="Inter, Arial, sans-serif" fontWeight="800">Process signal</text>
        <text x="490" y="142" fill="#b9d8e2" fontSize="16" fontFamily="Inter, Arial, sans-serif">Pattern or anomaly</text>
        <text x="534" y="278" fill="#ffffff" fontSize="18" fontFamily="Inter, Arial, sans-serif" fontWeight="800">Inspection evidence</text>
        <text x="534" y="304" fill="#f6d7a2" fontSize="16" fontFamily="Inter, Arial, sans-serif">Review before a claim</text>
      </svg>
      <ol className="diagram-frame__legend" aria-label="LMD process schematic legend">
        {legend.map(([label, text]) => (
          <li key={label}>
            <strong>{label}</strong>
            <span>{text}</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}
