interface HeroLaserVisualProps {
  className?: string;
}

const signalNodes = [
  { x: 560, y: 255, label: "sense" },
  { x: 645, y: 210, label: "model" },
  { x: 740, y: 174, label: "verify" }
];

export default function HeroLaserVisual({ className = "" }: HeroLaserVisualProps) {
  return (
    <div
      className={["glass-panel relative overflow-hidden p-3 md:p-4", className].filter(Boolean).join(" ")}
      aria-label="Diagram of laser path, process signal, and verification evidence."
    >
      <svg className="hero-visual aspect-[16/10] w-full" viewBox="0 0 960 600" role="img" aria-labelledby="hero-visual-title hero-visual-desc">
        <title id="hero-visual-title">Laser path to process intelligence</title>
        <desc id="hero-visual-desc">
          Diagram of a laser path, deposited track, process signal, model layer, and verification boundary.
        </desc>
        <defs>
          <linearGradient id="heroBeam" x1="180" y1="70" x2="438" y2="318" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#83f0ff" stopOpacity="0.08" />
            <stop offset="54%" stopColor="#34ddff" stopOpacity="0.82" />
            <stop offset="100%" stopColor="#ffd27a" stopOpacity="0.92" />
          </linearGradient>
          <linearGradient id="heroTrack" x1="122" y1="430" x2="820" y2="250" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3d4d58" />
            <stop offset="45%" stopColor="#d8faff" />
            <stop offset="76%" stopColor="#34ddff" />
            <stop offset="100%" stopColor="#83f0ff" />
          </linearGradient>
          <linearGradient id="heroSignal" x1="466" y1="315" x2="744" y2="174" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffd27a" stopOpacity="0.2" />
            <stop offset="46%" stopColor="#34ddff" stopOpacity="0.78" />
            <stop offset="100%" stopColor="#83f0ff" />
          </linearGradient>
          <radialGradient id="heroFocus" cx="438" cy="318" r="86" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fff3c4" />
            <stop offset="28%" stopColor="#ffd27a" stopOpacity="0.86" />
            <stop offset="64%" stopColor="#ff6b35" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#ff6b35" stopOpacity="0" />
          </radialGradient>
          <filter id="heroGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="960" height="600" rx="26" fill="#05090d" />
        <rect x="30" y="30" width="900" height="540" rx="22" fill="none" stroke="rgba(154, 209, 226, 0.14)" />

        <g opacity="0.18">
          {Array.from({ length: 10 }).map((_, index) => (
            <line key={`h-${index}`} x1="72" x2="888" y1={118 + index * 42} y2={118 + index * 42} stroke="#9ad1e2" strokeWidth="1" />
          ))}
          {Array.from({ length: 11 }).map((_, index) => (
            <line key={`v-${index}`} x1={120 + index * 72} x2={120 + index * 72} y1="76" y2="524" stroke="#9ad1e2" strokeWidth="1" />
          ))}
        </g>

        <g fontFamily="JetBrains Mono, Consolas, monospace">
          <text x="74" y="86" fill="#92a8b5" fontSize="12" letterSpacing="1.8">
            LASER PATH / PROCESS SIGNAL / VERIFICATION
          </text>
        </g>

        <path
          d="M128 430 C238 356 332 392 438 318 C552 238 672 292 820 226"
          fill="none"
          stroke="#14212b"
          strokeWidth="58"
          strokeLinecap="round"
          opacity="0.86"
        />
        <path
          className="bead-flow"
          d="M128 430 C238 356 332 392 438 318 C552 238 672 292 820 226"
          fill="none"
          stroke="url(#heroTrack)"
          strokeWidth="13"
          strokeLinecap="round"
          opacity="0.9"
        />

        <line x1="192" y1="88" x2="438" y2="318" stroke="rgba(52, 221, 255, 0.08)" strokeWidth="42" strokeLinecap="round" />
        <line className="laser-core" x1="192" y1="88" x2="438" y2="318" stroke="url(#heroBeam)" strokeWidth="4" strokeLinecap="round" filter="url(#heroGlow)" />
        <circle className="melt-core" cx="438" cy="318" r="82" fill="url(#heroFocus)" filter="url(#heroGlow)" />
        <circle cx="438" cy="318" r="13" fill="#fff3c4" opacity="0.82" />

        <path
          className="graph-link"
          d="M466 300 C522 254 604 238 645 210 S700 178 740 174"
          fill="none"
          stroke="url(#heroSignal)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />

        {signalNodes.map((node, index) => (
          <g key={node.label} className="signal-dot">
            <circle cx={node.x} cy={node.y} r={index === 2 ? 25 : 18} fill={index === 2 ? "rgba(255, 210, 122, 0.09)" : "rgba(52, 221, 255, 0.1)"} />
            <circle cx={node.x} cy={node.y} r={index === 2 ? 6 : 5} fill={index === 2 ? "#ffd27a" : "#83f0ff"} />
            <text x={node.x - 22} y={node.y + 38} fill="#92a8b5" fontFamily="JetBrains Mono, Consolas, monospace" fontSize="10">
              {node.label}
            </text>
          </g>
        ))}

        <g className="readout-card" transform="translate(676 390)">
          <rect width="172" height="72" rx="18" fill="rgba(8, 14, 20, 0.72)" stroke="rgba(154, 209, 226, 0.16)" />
          <text x="20" y="31" fill="#92a8b5" fontFamily="JetBrains Mono, Consolas, monospace" fontSize="10">
            CLAIM BOUNDARY
          </text>
          <text x="20" y="52" fill="#d8faff" fontFamily="Inter, Arial, sans-serif" fontSize="15" fontWeight="800">
            evidence before approval
          </text>
        </g>
      </svg>
    </div>
  );
}
