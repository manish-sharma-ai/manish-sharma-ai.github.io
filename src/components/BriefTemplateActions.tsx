const template = `# LMD decision brief

## Part / component

## Goal

## Material

## Geometry / size

## Damage or build area

## Available data

## Missing data

## Service conditions

## Tolerance / finishing

## Inspection requirement

## Risk flags

## Process route considered

## Evidence needed

## Next action

## Exafuse review route

Confidence is not approval.

Preliminary decision-support only. Final feasibility depends on base material, geometry, service conditions, inspection requirements, and expert review.
`;

export default function BriefTemplateActions() {
  return (
    <div className="flex flex-wrap gap-3">
      <button type="button" onClick={() => copyToClipboard(template)} className="btn btn-primary">Copy Markdown template</button>
      <button type="button" onClick={downloadTemplate} className="btn btn-secondary">Download .md</button>
    </div>
  );
}

function copyToClipboard(value: string) {
  void navigator.clipboard?.writeText(value);
}

function downloadTemplate() {
  const blob = new Blob([template], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "lmd-decision-brief-template.md";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
