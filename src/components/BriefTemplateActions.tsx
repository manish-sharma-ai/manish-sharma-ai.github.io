import type { DecisionBrief } from "../lib/decisionBrief";
import {
  formatDecisionBriefJson,
  formatDecisionBriefMarkdown,
  formatDecisionBriefTemplateMarkdown
} from "../lib/decisionBrief";

interface BriefTemplateActionsProps {
  exampleBrief?: DecisionBrief;
}

const template = formatDecisionBriefTemplateMarkdown();

export default function BriefTemplateActions({ exampleBrief }: BriefTemplateActionsProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <button type="button" onClick={() => copyToClipboard(template)} className="btn btn-primary min-w-0 whitespace-normal text-left">
        Copy Markdown template
      </button>
      <button type="button" onClick={() => download("lmd-decision-brief-v1-template.md", template, "text/markdown;charset=utf-8")} className="btn btn-secondary min-w-0 whitespace-normal text-left">
        Download .md
      </button>
      {exampleBrief && (
        <>
          <button type="button" onClick={() => copyToClipboard(formatDecisionBriefMarkdown(exampleBrief))} className="btn btn-secondary min-w-0 whitespace-normal text-left">
            Copy filled example
          </button>
          <button type="button" onClick={() => download("lmd-decision-brief-v1-example.md", formatDecisionBriefMarkdown(exampleBrief), "text/markdown;charset=utf-8")} className="btn btn-secondary min-w-0 whitespace-normal text-left">
            Download example .md
          </button>
          <button type="button" onClick={() => download("lmd-decision-brief-v1-example.json", formatDecisionBriefJson(exampleBrief), "application/json;charset=utf-8")} className="btn btn-secondary min-w-0 whitespace-normal text-left">
            Download example .json
          </button>
        </>
      )}
    </div>
  );
}

function copyToClipboard(value: string) {
  void navigator.clipboard?.writeText(value);
}

function download(filename: string, value: string, mime: string) {
  const blob = new Blob([value], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
