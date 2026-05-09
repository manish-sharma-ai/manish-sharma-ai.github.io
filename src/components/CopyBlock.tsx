import { Clipboard, Check } from "lucide-react";
import { useState } from "react";

export default function CopyBlock({ label, text }: { label: string; text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-black/30">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <p className="font-mono text-xs font-bold uppercase text-slate-400">{label}</p>
        <button
          type="button"
          onClick={copy}
          className="inline-flex min-h-9 items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 text-sm font-bold text-slate-200 transition hover:border-cyan-300/35 hover:text-white"
        >
          {copied ? <Check aria-hidden="true" className="h-4 w-4 text-cyan-200" /> : <Clipboard aria-hidden="true" className="h-4 w-4" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="max-h-96 overflow-auto p-4 text-sm leading-6 text-slate-200"><code>{text}</code></pre>
    </div>
  );
}
