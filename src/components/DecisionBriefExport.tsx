import { Check, Clipboard, Download } from "lucide-react";
import { useState } from "react";
import type { DecisionBrief } from "../lib/decisionBrief";
import {
  formatDecisionBriefJson,
  formatDecisionBriefMarkdown,
  formatEvidenceNeededChecklist,
  formatExafuseReviewSummary,
  formatMissingInformationChecklist
} from "../lib/decisionBrief";

interface DecisionBriefExportProps {
  brief: DecisionBrief;
  exafuseUrl?: string;
  exafuseLabel?: string;
  toolkitHref?: string;
  matchingToolHref?: string;
  matchingToolLabel?: string;
  compact?: boolean;
}

type CopyKey = "brief" | "missing" | "evidence" | "exafuse" | null;

export default function DecisionBriefExport({
  brief,
  exafuseUrl,
  exafuseLabel = "Visit Exafuse",
  toolkitHref = "/agent-pack",
  matchingToolHref,
  matchingToolLabel = "Open matching tool",
  compact = false
}: DecisionBriefExportProps) {
  const [copied, setCopied] = useState<CopyKey>(null);
  const markdown = formatDecisionBriefMarkdown(brief);
  const json = formatDecisionBriefJson(brief);

  async function copy(key: Exclude<CopyKey, null>, value: string) {
    await navigator.clipboard?.writeText(value);
    setCopied(key);
    window.setTimeout(() => setCopied(null), 1600);
  }

  return (
    <div className="mt-6">
      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
        <ActionButton
          copied={copied === "brief"}
          onClick={() => copy("brief", markdown)}
          label="Copy decision brief"
        />
        <ActionButton
          copied={copied === "missing"}
          onClick={() => copy("missing", formatMissingInformationChecklist(brief))}
          label="Copy missing-information checklist"
        />
        <ActionButton
          copied={copied === "evidence"}
          onClick={() => copy("evidence", formatEvidenceNeededChecklist(brief))}
          label="Copy evidence-needed checklist"
        />
        <ActionButton
          copied={copied === "exafuse"}
          onClick={() => copy("exafuse", formatExafuseReviewSummary(brief))}
          label="Copy Exafuse review summary"
        />
        <DownloadButton label="Download .md" filename="lmd-decision-brief-v1.md" content={markdown} mime="text/markdown;charset=utf-8" />
        <DownloadButton label="Download .json" filename="lmd-decision-brief-v1.json" content={json} mime="application/json;charset=utf-8" />
      </div>

      {!compact && (
        <div className="mt-4 flex flex-wrap gap-3">
          {matchingToolHref && (
            <a href={matchingToolHref} className="btn btn-secondary">
              {matchingToolLabel}
            </a>
          )}
          <a href={toolkitHref} className="btn btn-secondary">
            Open RFQ Toolkit
          </a>
          {exafuseUrl && (
            <a
              href={exafuseUrl}
              className="btn btn-laser"
              target={exafuseUrl.startsWith("http") ? "_blank" : undefined}
              rel={exafuseUrl.startsWith("http") ? "noreferrer" : undefined}
            >
              {exafuseLabel}
            </a>
          )}
        </div>
      )}
    </div>
  );
}

function ActionButton({
  copied,
  onClick,
  label
}: {
  copied: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button type="button" onClick={onClick} className="btn btn-secondary w-full min-w-0 justify-start whitespace-normal text-left">
      {copied ? <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-cyan-200" /> : <Clipboard aria-hidden="true" className="h-4 w-4 shrink-0" />}
      <span>{copied ? "Copied" : label}</span>
    </button>
  );
}

function DownloadButton({
  label,
  filename,
  content,
  mime
}: {
  label: string;
  filename: string;
  content: string;
  mime: string;
}) {
  return (
    <button
      type="button"
      onClick={() => download(filename, content, mime)}
      className="btn btn-secondary w-full min-w-0 justify-start whitespace-normal text-left"
    >
      <Download aria-hidden="true" className="h-4 w-4 shrink-0" />
      <span>{label}</span>
    </button>
  );
}

function download(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
