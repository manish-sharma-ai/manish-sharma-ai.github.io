interface HeroLaserVisualProps {
  className?: string;
}

const sensorStreams = [
  "M456 296 C536 216 626 208 722 230",
  "M494 346 C594 330 664 360 748 430",
  "M402 322 C332 270 254 268 176 308"
];

const graphLinks = [
  [58, 88, 132, 54],
  [132, 54, 200, 96],
  [58, 88, 112, 148],
  [112, 148, 200, 96],
  [200, 96, 252, 146]
];

const graphNodes = [
  { x: 58, y: 88, color: "#34ddff", label: "signal" },
  { x: 132, y: 54, color: "#ffb64c", label: "risk" },
  { x: 200, y: 96, color: "#34ddff", label: "model" },
  { x: 112, y: 148, color: "#8a91ff", label: "rule" },
  { x: 252, y: 146, color: "#ff6b35", label: "review" }
];

const readouts = [
  ["POOL", "stable"],
  ["BEAD", "tracked"],
  ["CLAIM", "bounded"]
];

export default function HeroLaserVisual({ className = "" }: HeroLaserVisualProps) {
  return (
    <div
      className={["glass-panel relative overflow-hidden p-3 md:p-4", className].filter(Boolean).join(" ")}
      aria-label="Animated industrial AI cockpit visual for Laser Metal Deposition"
    >
      <svg className="hero-visual aspect-[16/10] w-full" viewBox="0 0 960 600" role="img" aria-labelledby="hero-visual-title hero-visual-desc">
        <title id="hero-visual-title">Laser Metal Deposition process cockpit</title>
        <desc id="hero-visual-desc">
          A technical cockpit visual showing a laser beam forming a melt pool, a deposited bead path, sensor streams, an AI decision graph, and an evidence checkpoint.
        </desc>
        <defs>
          <linearGradient id="heroLaserGradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#ff4d2e" stopOpacity="0.06" />
            <stop offset="48%" stopColor="#ff4d2e" stopOpacity="0.94" />
            <stop offset="100%" stopColor="#ffb64c" stopOpacity="0.88" />
          </linearGradient>
          <linearGradient id="heroBeadGradient" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#273542" />
            <stop offset="44%" stopColor="#71909f" />
            <stop offset="72%" stopColor="#34ddff" />
            <stop offset="100%" stopColor="#ffb64c" />
          </linearGradient>
          <linearGradient id="heroPanelStroke" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#34ddff" stopOpacity="0.72" />
            <stop offset="100%" stopColor="#ffb64c" stopOpacity="0.34" />
          </linearGradient>
          <radialGradient id="heroMeltGradient">
            <stop offset="0%" stopColor="#fff8ca" stopOpacity="1" />
            <stop offset="24%" stopColor="#ffd27a" stopOpacity="0.98" />
            <stop offset="58%" stopColor="#ff6b35" stopOpacity="0.56" />
            <stop offset="100%" stopColor="#ff4d2e" stopOpacity="0" />
          </radialGradient>
          <filter id="heroSoftGlow" x="-70%" y="-70%" width="240%" height="240%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="heroHotGlow" x="-90%" y="-90%" width="280%" height="280%">
            <feGaussianBlur stdDeviation="14" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="960" height="600" rx="10" fill="#03070b" />
        <rect x="18" y="18" width="924" height="564" rx="8" fill="none" stroke="rgba(154, 209, 226, 0.16)" />
        <rect className="scan-bar" x="-260" y="42" width="300" height="486" fill="rgba(52, 221, 255, 0.055)" />

        <g opacity="0.24">
          {Array.from({ length: 18 }).map((_, index) => (
            <line key={`v-${index}`} x1={index * 56 + 20} x2={index * 56 + 20} y1="18" y2="582" stroke="#9ad1e2" strokeWidth="1" opacity="0.3" />
          ))}
          {Array.from({ length: 11 }).map((_, index) => (
            <line key={`h-${index}`} x1="18" x2="942" y1={index * 54 + 32} y2={index * 54 + 32} stroke="#9ad1e2" strokeWidth="1" opacity="0.28" />
          ))}
        </g>

        <g fontFamily="JetBrains Mono, Consolas, monospace">
          <text x="48" y="58" fill="#9ad1e2" fontSize="12" letterSpacing="1.8">
            LMD PROCESS COCKPIT
          </text>
          <text x="48" y="88" fill="#ffffff" fontSize="26" fontWeight="850">
            sense / model / decide / verify
          </text>
          <text x="48" y="112" fill="#92a8b5" fontSize="12">
            decision support only - inspection remains the boundary
          </text>
        </g>

        <g opacity="0.95">
          <path d="M118 418 C238 356 344 378 442 420 S638 486 812 418" fill="none" stroke="#17232e" strokeWidth="82" strokeLinecap="round" />
          <path d="M124 422 C244 362 348 382 444 424 S642 490 818 424" fill="none" stroke="#05080c" strokeWidth="48" strokeLinecap="round" opacity="0.68" />
          <path className="bead-flow" d="M126 412 C244 356 348 374 446 416 S646 480 816 414" fill="none" stroke="url(#heroBeadGradient)" strokeWidth="18" strokeLinecap="round" opacity="0.92" />
          <path d="M160 450 C278 416 354 430 444 466 S628 520 780 470" fill="none" stroke="rgba(154, 209, 226, 0.18)" strokeWidth="2" strokeDasharray="8 12" />
        </g>

        <g>
          <path d="M262 78 L372 78 L422 126 L360 176 L246 176 L206 126 Z" fill="rgba(8, 14, 20, 0.78)" stroke="rgba(154, 209, 226, 0.2)" />
          <path d="M282 100 L352 100 L382 128 L346 152 L272 152 L244 126 Z" fill="rgba(52, 221, 255, 0.08)" stroke="rgba(52, 221, 255, 0.28)" />
          <text x="252" y="202" fill="#9ad1e2" fontFamily="JetBrains Mono, Consolas, monospace" fontSize="11">
            laser input
          </text>
        </g>

        <line x1="318" y1="152" x2="456" y2="344" stroke="rgba(255, 77, 46, 0.14)" strokeWidth="42" strokeLinecap="round" />
        <line className="laser-core" x1="318" y1="152" x2="456" y2="344" stroke="url(#heroLaserGradient)" strokeWidth="4" strokeLinecap="round" filter="url(#heroHotGlow)" />
        <circle className="thermal-halo" cx="456" cy="344" r="78" fill="url(#heroMeltGradient)" filter="url(#heroHotGlow)" opacity="0.76" />
        <circle className="melt-core" cx="456" cy="344" r="48" fill="url(#heroMeltGradient)" filter="url(#heroSoftGlow)" />
        <ellipse cx="456" cy="352" rx="46" ry="16" fill="#fff8ca" opacity="0.42" />

        <g fill="none" strokeWidth="2.2" opacity="0.72">
          {sensorStreams.map((path, index) => (
            <path
              key={path}
              className={index === 1 ? "sensor-stream sensor-stream-alt" : "sensor-stream"}
              d={path}
              stroke={index === 2 ? "#ffb64c" : "#34ddff"}
            />
          ))}
        </g>

        <g className="signal-dot" filter="url(#heroSoftGlow)">
          <circle cx="722" cy="230" r="5" fill="#34ddff" />
          <circle cx="748" cy="430" r="5" fill="#34ddff" />
          <circle cx="176" cy="308" r="5" fill="#ffb64c" />
          <circle cx="582" cy="270" r="4" fill="#9ad1e2" />
          <circle cx="632" cy="386" r="4" fill="#9ad1e2" />
        </g>

        <g transform="translate(616 82)">
          <path d="M0 0 H282 L306 24 V210 H24 L0 186 Z" fill="rgba(5, 10, 15, 0.78)" stroke="url(#heroPanelStroke)" />
          <text x="22" y="34" fill="#9ad1e2" fontFamily="JetBrains Mono, Consolas, monospace" fontSize="12" letterSpacing="1.4">
            AI DECISION GRAPH
          </text>
          <text x="22" y="56" fill="#d8faff" fontFamily="JetBrains Mono, Consolas, monospace" fontSize="11">
            signals to bounded recommendation
          </text>
          {graphLinks.map(([x1, y1, x2, y2], index) => (
            <line key={`link-${index}`} className="graph-link" x1={x1} y1={y1} x2={x2} y2={y2} stroke="#34ddff" strokeWidth="2" opacity="0.66" />
          ))}
          {graphNodes.map((node) => (
            <g key={node.label} className="graph-node">
              <circle cx={node.x} cy={node.y} r="18" fill={node.color} opacity="0.14" />
              <circle cx={node.x} cy={node.y} r="5.5" fill={node.color} />
              <text x={node.x - 24} y={node.y + 34} fill="#cfe5ee" fontFamily="JetBrains Mono, Consolas, monospace" fontSize="9">
                {node.label}
              </text>
            </g>
          ))}
        </g>

        <g transform="translate(612 360)">
          <path d="M0 0 H272 L296 24 V116 H24 L0 92 Z" fill="rgba(5, 10, 15, 0.76)" stroke="rgba(255, 182, 76, 0.34)" />
          <text x="22" y="33" fill="#ffde9c" fontFamily="JetBrains Mono, Consolas, monospace" fontSize="12" letterSpacing="1.2">
            EVIDENCE CHECKPOINT
          </text>
          <path className="evidence-link" d="M24 62 H112 L136 82 H272" fill="none" stroke="#ffb64c" strokeWidth="2.4" />
          <circle cx="112" cy="62" r="7" fill="#ffb64c" filter="url(#heroSoftGlow)" />
          <circle cx="136" cy="82" r="7" fill="#34ddff" filter="url(#heroSoftGlow)" />
          <text x="24" y="104" fill="#d8e8ef" fontFamily="JetBrains Mono, Consolas, monospace" fontSize="10">
            {"monitor -> inspect -> expert review"}
          </text>
        </g>

        <g transform="translate(58 500)">
          {readouts.map(([label, value], index) => (
            <g key={label} className="readout-card" transform={`translate(${index * 138} 0)`}>
              <rect width="116" height="48" rx="6" fill="rgba(5, 10, 15, 0.7)" stroke="rgba(154, 209, 226, 0.18)" />
              <text x="14" y="20" fill="#92a8b5" fontFamily="JetBrains Mono, Consolas, monospace" fontSize="9">
                {label}
              </text>
              <text x="14" y="36" fill={index === 2 ? "#ffde9c" : "#d8faff"} fontFamily="JetBrains Mono, Consolas, monospace" fontSize="12" fontWeight="850">
                {value}
              </text>
            </g>
          ))}
        </g>

        <g fontFamily="JetBrains Mono, Consolas, monospace" fontSize="11" fill="#9ad1e2" opacity="0.88">
          <text x="330" y="318">melt pool</text>
          <text x="146" y="386">deposited bead path</text>
          <text x="548" y="330">sensor streams</text>
        </g>
      </svg>
    </div>
  );
}
