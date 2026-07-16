interface HeroLaserVisualProps {
  className?: string;
}

const legend = [
  ["Laser beam", "Focused energy reaches the deposition zone."],
  ["Melt pool", "The local molten region is a process observation point."],
  [
    "Deposited track",
    "Material is added along the intended repair or build path.",
  ],
  [
    "Process signal",
    "Monitoring can flag a review question, not final quality.",
  ],
  [
    "Inspection evidence",
    "Inspection and expert review establish the next defensible claim.",
  ],
];

const processSteps = [
  { index: "01", label: "Sense", detail: "Signals", tone: "success" },
  { index: "02", label: "Model", detail: "Assumptions", tone: "signal" },
  { index: "03", label: "Decide", detail: "Evidence plan", tone: "warning" },
  { index: "04", label: "Verify", detail: "Inspection", tone: "risk" },
];

export default function HeroLaserVisual({
  className = "",
}: HeroLaserVisualProps) {
  return (
    <figure
      className={["instrument-cluster diagram-frame", className]
        .filter(Boolean)
        .join(" ")}
      data-visual-type="hero-instrumentation"
    >
      <figcaption className="sr-only">
        Illustrative LMD process schematic. Process signal to inspection
        evidence. Read from the deposition zone toward the evidence needed for
        technical review.
      </figcaption>
      <ol className="sr-only" aria-label="LMD process schematic legend">
        {legend.map(([label, text]) => (
          <li key={label}>
            <strong>{label}</strong>: {text}
          </li>
        ))}
      </ol>

      <div className="instrument-cluster__header">
        <p className="instrument-cluster__label">Decision signal // live</p>
        <p className="instrument-cluster__status">
          <span aria-hidden="true" /> Monitoring
        </p>
      </div>

      <ol
        className="instrument-cluster__steps"
        aria-label="Sense, model, decide, verify process"
      >
        {processSteps.map((step) => (
          <li
            key={step.index}
            className={`instrument-cluster__step instrument-cluster__step--${step.tone}`}
          >
            <span className="instrument-cluster__step-index">{step.index}</span>
            <strong>{step.label}</strong>
            <span>{step.detail}</span>
          </li>
        ))}
      </ol>

      <section
        className="instrument-cluster__evidence"
        aria-labelledby="hero-evidence-title"
      >
        <p className="instrument-cluster__label">Evidence status</p>
        <h2 id="hero-evidence-title">A signal is not proof.</h2>
        <p>
          Process signals can support review. They do not replace inspection,
          testing, expert review, or release evidence.
        </p>
        <dl className="instrument-cluster__source">
          <div>
            <dt>Source note</dt>
            <dd>Public context only</dd>
          </div>
        </dl>
      </section>
    </figure>
  );
}
