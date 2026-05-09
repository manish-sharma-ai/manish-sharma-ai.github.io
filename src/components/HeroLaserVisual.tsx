export default function HeroLaserVisual() {
  return (
    <div className="glass-panel relative overflow-hidden rounded-lg p-4 md:p-6" aria-label="Animated laser metal deposition process visual">
      <svg className="hero-visual aspect-[16/10] w-full" viewBox="0 0 960 600" role="img" aria-labelledby="hero-visual-title hero-visual-desc">
        <title id="hero-visual-title">Laser beam to AI decision graph</title>
        <desc id="hero-visual-desc">
          A technical visual showing a laser beam forming a melt pool, deposited bead, sensor signals, and AI graph nodes.
        </desc>
        <defs>
          <linearGradient id="laserGradient" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#ff4d2e" stopOpacity="0.1" />
            <stop offset="42%" stopColor="#ff4d2e" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#ffb547" stopOpacity="0.82" />
          </linearGradient>
          <linearGradient id="beadGradient" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#384653" />
            <stop offset="52%" stopColor="#6f8796" />
            <stop offset="100%" stopColor="#33d6ff" />
          </linearGradient>
          <radialGradient id="meltGradient">
            <stop offset="0%" stopColor="#fff3c4" stopOpacity="1" />
            <stop offset="26%" stopColor="#ffb547" stopOpacity="0.95" />
            <stop offset="62%" stopColor="#ff4d2e" stopOpacity="0.48" />
            <stop offset="100%" stopColor="#ff4d2e" stopOpacity="0" />
          </radialGradient>
          <filter id="softGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="960" height="600" rx="18" fill="#071018" />
        <g opacity="0.26">
          {Array.from({ length: 18 }).map((_, index) => (
            <line key={`v-${index}`} x1={index * 58 + 8} x2={index * 58 + 8} y1="0" y2="600" stroke="#9cc9d9" strokeWidth="1" opacity="0.32" />
          ))}
          {Array.from({ length: 12 }).map((_, index) => (
            <line key={`h-${index}`} x1="0" x2="960" y1={index * 54 + 10} y2={index * 54 + 10} stroke="#9cc9d9" strokeWidth="1" opacity="0.28" />
          ))}
        </g>

        <path d="M120 405 C235 366 314 382 404 424 S591 489 760 431" fill="none" stroke="#1d2934" strokeWidth="72" strokeLinecap="round" opacity="0.9" />
        <path className="bead-flow" d="M122 404 C236 366 315 382 405 424 S592 489 760 431" fill="none" stroke="url(#beadGradient)" strokeWidth="22" strokeLinecap="round" opacity="0.86" />
        <path d="M118 438 C238 400 320 415 411 456 S590 516 770 465" fill="none" stroke="#0a0f14" strokeWidth="28" strokeLinecap="round" opacity="0.68" />

        <line x1="224" y1="82" x2="430" y2="356" stroke="rgba(255, 77, 46, 0.16)" strokeWidth="34" strokeLinecap="round" />
        <line className="laser-core" x1="224" y1="82" x2="430" y2="356" stroke="url(#laserGradient)" strokeWidth="4" strokeLinecap="round" filter="url(#softGlow)" />
        <circle className="melt-core" cx="430" cy="356" r="58" fill="url(#meltGradient)" filter="url(#softGlow)" />
        <ellipse cx="430" cy="363" rx="42" ry="17" fill="#fff3c4" opacity="0.42" />

        <g fill="none" stroke="#33d6ff" strokeWidth="2" opacity="0.6">
          <path d="M428 322 C482 259 558 243 627 247" />
          <path d="M458 372 C530 359 590 383 652 424" />
          <path d="M390 340 C330 304 270 297 210 314" />
        </g>

        <g className="signal-dot" filter="url(#softGlow)">
          <circle cx="626" cy="246" r="5" fill="#33d6ff" />
          <circle cx="652" cy="424" r="5" fill="#33d6ff" />
          <circle cx="210" cy="314" r="5" fill="#ffb547" />
          <circle cx="534" cy="302" r="4" fill="#9cc9d9" />
          <circle cx="596" cy="386" r="4" fill="#9cc9d9" />
        </g>

        <g transform="translate(652 104)">
          <rect x="0" y="0" width="224" height="178" rx="14" fill="rgba(5, 10, 14, 0.72)" stroke="rgba(156, 201, 217, 0.2)" />
          <text x="18" y="32" fill="#9cc9d9" fontFamily="monospace" fontSize="13">AI decision graph</text>
          <line className="graph-link" x1="48" y1="78" x2="122" y2="50" stroke="#33d6ff" strokeWidth="2" opacity="0.72" />
          <line className="graph-link" x1="122" y1="50" x2="174" y2="104" stroke="#33d6ff" strokeWidth="2" opacity="0.72" />
          <line className="graph-link" x1="48" y1="78" x2="106" y2="132" stroke="#33d6ff" strokeWidth="2" opacity="0.72" />
          <line className="graph-link" x1="106" y1="132" x2="174" y2="104" stroke="#33d6ff" strokeWidth="2" opacity="0.72" />
          {[
            [48, 78, "#33d6ff"],
            [122, 50, "#ffb547"],
            [174, 104, "#33d6ff"],
            [106, 132, "#ff4d2e"]
          ].map(([cx, cy, color], index) => (
            <g key={index}>
              <circle cx={cx} cy={cy} r="13" fill={String(color)} opacity="0.15" />
              <circle cx={cx} cy={cy} r="5" fill={String(color)} />
            </g>
          ))}
        </g>

        <g fontFamily="monospace" fontSize="12" fill="#9cc9d9" opacity="0.88">
          <text x="78" y="96">laser input</text>
          <text x="344" y="306">melt pool</text>
          <text x="132" y="473">deposited bead path</text>
          <text x="572" y="476">sensor signals</text>
        </g>
      </svg>
    </div>
  );
}
