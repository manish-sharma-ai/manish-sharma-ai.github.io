import { Check, Clipboard, Download, Mail, Printer } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { COPY_UNAVAILABLE_MESSAGE, copyText } from "../lib/clipboard";
import type { DecisionBrief } from "../lib/decisionBrief";
import {
  formatAiAgentPrompt,
  formatAiAgentSafeSummary,
  formatDecisionBriefJson,
  formatEvidenceNeededChecklist,
  formatExafuseEmailDraft,
  formatExafuseMailtoHref,
  formatExafuseReviewSummary,
  formatInternalEngineeringMessage,
  formatLinkedInSafeSnippet,
  formatMissingInformationChecklist,
  formatTechnicalDecisionBrief
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

type CopyKey = "technical" | "missing" | "evidence" | "email" | "ai" | "internal" | "linkedin" | "prompt" | "exafuse" | null;

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
  const [copyError, setCopyError] = useState<string | null>(null);
  const markdown = formatTechnicalDecisionBrief(brief);
  const json = formatDecisionBriefJson(brief);
  const emailDraft = formatExafuseEmailDraft(brief);
  const aiSummary = formatAiAgentSafeSummary(brief);
  const mailtoHref = formatExafuseMailtoHref(brief);

  async function copy(key: Exclude<CopyKey, null>, value: string) {
    try {
      await copyText(value);
      setCopyError(null);
      setCopied(key);
      window.setTimeout(() => setCopied(null), 1600);
    } catch {
      setCopied(null);
      setCopyError(COPY_UNAVAILABLE_MESSAGE);
    }
  }

  function printBrief() {
    window.print();
  }

  return (
    <div className="no-print mt-6">
      <div className="mb-4 rounded-lg border border-amber-300/25 bg-amber-400/10 p-3 text-sm font-bold leading-6 text-amber-50">
        Do not include confidential customer or employer data unless you are allowed to share it.
        <br />
        Manual draft only. Nothing is sent unless you send it from your own email client.
      </div>
      <p className="sr-only" aria-live="polite">{copyError ?? (copied ? "Brief copied." : "")}</p>
      {copyError && (
        <p className="mb-4 rounded-lg border border-orange-300/25 bg-orange-400/10 p-3 text-sm font-bold leading-6 text-orange-50" role="status">
          {copyError}
        </p>
      )}
      <section aria-labelledby="brief-copy-actions">
        <h4 id="brief-copy-actions" className="metric-label mb-2">Copy and export</h4>
        <ul className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          <ActionItem>
            <ActionButton
              copied={copied === "technical"}
              onClick={() => copy("technical", markdown)}
              label="Copy technical brief"
            />
          </ActionItem>
          <ActionItem>
            <ActionButton
              copied={copied === "email"}
              onClick={() => copy("email", emailDraft)}
              label="Copy Exafuse email draft"
            />
          </ActionItem>
          <ActionItem>
            <ActionButton
              copied={copied === "ai"}
              onClick={() => copy("ai", aiSummary)}
              label="Copy AI summary"
            />
          </ActionItem>
          <ActionItem>
            <ActionButton
              copied={copied === "missing"}
              onClick={() => copy("missing", formatMissingInformationChecklist(brief))}
              label="Copy missing-information checklist"
            />
          </ActionItem>
          <ActionItem>
            <ActionButton
              copied={copied === "evidence"}
              onClick={() => copy("evidence", formatEvidenceNeededChecklist(brief))}
              label="Copy evidence-needed checklist"
            />
          </ActionItem>
          <ActionItem>
            <DownloadButton label="Download .md" filename="lmd-decision-brief-v1.md" content={markdown} mime="text/markdown;charset=utf-8" />
          </ActionItem>
          <ActionItem>
            <DownloadButton label="Download .json" filename="lmd-decision-brief-v1.json" content={json} mime="application/json;charset=utf-8" />
          </ActionItem>
          <ActionItem>
            <button
              type="button"
              onClick={printBrief}
              className="btn btn-secondary w-full min-w-0 justify-start whitespace-normal text-left"
              aria-label="Print / save as PDF for this LMD Decision Brief"
            >
              <Printer aria-hidden="true" className="h-4 w-4 shrink-0" />
              <span>Print / save as PDF</span>
            </button>
          </ActionItem>
        </ul>
      </section>

      {!compact && (
        <section className="mt-4" aria-labelledby="brief-next-actions">
          <h4 id="brief-next-actions" className="metric-label mb-2">Next actions</h4>
          <p className="mb-3 text-xs font-bold leading-5 text-slate-400">
            Review before sending. Remove confidential data if needed.
          </p>
          <ul className="flex flex-wrap gap-3">
          {matchingToolHref && (
            <ActionItem>
              <a href={matchingToolHref} className="btn btn-secondary">
                {matchingToolLabel}
              </a>
            </ActionItem>
          )}
          <ActionItem>
            <a href={toolkitHref} className="btn btn-secondary">
              Open RFQ Toolkit
            </a>
          </ActionItem>
          <ActionItem>
            <a href="/for-ai-agents" className="btn btn-secondary">
              Guidance for AI systems
            </a>
          </ActionItem>
          <ActionItem>
            <button
              type="button"
              onClick={() => {
                window.location.href = mailtoHref;
              }}
              className="btn btn-secondary"
              aria-label="Open mail client with draft: local Exafuse-ready email draft"
            >
              <Mail aria-hidden="true" className="h-4 w-4 shrink-0" />
              Open mail client with draft
            </button>
          </ActionItem>
          {exafuseUrl && (
            <ActionItem>
              <a
                href={exafuseUrl}
                className="btn btn-laser"
                target={exafuseUrl.startsWith("http") ? "_blank" : undefined}
                rel={exafuseUrl.startsWith("http") ? "noreferrer" : undefined}
              >
                {exafuseLabel}
              </a>
            </ActionItem>
          )}
          </ul>
        </section>
      )}

      {!compact && (
        <details className="ordered-card mt-4 p-4">
          <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-black text-white">
            <span>Copy share snippets</span>
            <span className="metric-label">No auto-posting</span>
          </summary>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            These snippets are generated locally from the same brief. They do not post, send, track, or store anything.
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            <ActionItem>
              <ActionButton
                copied={copied === "internal"}
                onClick={() => copy("internal", formatInternalEngineeringMessage(brief))}
                label="Copy internal engineering message"
              />
            </ActionItem>
            <ActionItem>
              <ActionButton
                copied={copied === "linkedin"}
                onClick={() => copy("linkedin", formatLinkedInSafeSnippet(brief))}
                label="Copy LinkedIn snippet"
              />
            </ActionItem>
            <ActionItem>
              <ActionButton
                copied={copied === "prompt"}
                onClick={() => copy("prompt", formatAiAgentPrompt(brief))}
                label="Copy AI prompt"
              />
            </ActionItem>
            <ActionItem>
              <ActionButton
                copied={copied === "exafuse"}
                onClick={() => copy("exafuse", formatExafuseReviewSummary(brief))}
                label="Copy Exafuse review summary"
              />
            </ActionItem>
          </ul>
        </details>
      )}
    </div>
  );
}

function ActionItem({ children }: { children: ReactNode }) {
  return (
    <li>
      {children}
      <span className="sr-only">; </span>
    </li>
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
    <button
      type="button"
      onClick={onClick}
      className="btn btn-secondary w-full min-w-0 justify-start whitespace-normal text-left"
      aria-label={label}
    >
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
      aria-label={label}
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
