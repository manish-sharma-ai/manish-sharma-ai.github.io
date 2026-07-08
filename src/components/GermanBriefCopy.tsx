import { Check, Clipboard } from "lucide-react";
import { useState } from "react";
import { formatGermanDecisionBriefTemplateMarkdown } from "../lib/decisionBrief";

const germanTemplate = formatGermanDecisionBriefTemplateMarkdown();

export default function GermanBriefCopy() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard?.writeText(germanTemplate);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="btn btn-primary min-w-0 whitespace-normal text-left"
      aria-label="Deutschen LMD-Entscheidungsbrief kopieren"
    >
      {copied ? <Check aria-hidden="true" className="h-4 w-4 shrink-0" /> : <Clipboard aria-hidden="true" className="h-4 w-4 shrink-0" />}
      <span>{copied ? "Kopiert" : "Deutschen Kurzbrief kopieren"}</span>
    </button>
  );
}
