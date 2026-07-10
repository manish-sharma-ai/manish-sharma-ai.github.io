import { Check, Clipboard } from "lucide-react";
import { useMemo, useState } from "react";
import { copyText } from "../lib/clipboard";
import {
  PUBLIC_REVIEW_BOUNDARY_RESPONSES,
  PUBLIC_REVIEW_OUTCOMES,
  PUBLIC_REVIEW_TASKS,
  PUBLIC_REVIEW_TIME_BANDS,
  formatPublicReviewNote,
  type PublicReviewBoundaryId,
  type PublicReviewOutcomeId,
  type PublicReviewTaskId,
  type PublicReviewTimeBandId
} from "../lib/publicReview";

const COPY_ERROR = "Copy is unavailable in this browser. Select the generated note and copy it manually.";

export default function ReviewFeedbackComposer() {
  const [taskId, setTaskId] = useState<PublicReviewTaskId>("cockpit");
  const [outcomeId, setOutcomeId] = useState<PublicReviewOutcomeId>("completed");
  const [timeBandId, setTimeBandId] = useState<PublicReviewTimeBandId>("under-two");
  const [boundaryId, setBoundaryId] = useState<PublicReviewBoundaryId>("clear");
  const [comment, setComment] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState<string | null>(null);

  const note = useMemo(
    () => formatPublicReviewNote({ taskId, outcomeId, timeBandId, boundaryId, comment }),
    [taskId, outcomeId, timeBandId, boundaryId, comment]
  );

  async function copyNote() {
    try {
      await copyText(note);
      setCopyError(null);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
      setCopyError(COPY_ERROR);
    }
  }

  return (
    <section className="ordered-card-strong p-5 md:p-7" aria-labelledby="review-feedback-title">
      <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
        <div>
          <p className="metric-label">Browser-local feedback</p>
          <h2 id="review-feedback-title" className="mt-3 text-3xl font-black leading-tight text-white">Make a privacy-safe review note.</h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            The selections and note remain in this browser. Nothing is submitted, stored, or analyzed by this site. Keep every comment public-safe.
          </p>
          <div className="mt-5 rounded-lg border border-amber-300/25 bg-amber-400/10 p-4 text-sm font-bold leading-6 text-amber-50">
            Do not include customer, employer, personal, credential, technical, or safety-critical information.
          </div>
          <div className="mt-5 grid gap-4">
            <SelectField label="Task reviewed" value={taskId} onChange={(value) => setTaskId(value as PublicReviewTaskId)} options={PUBLIC_REVIEW_TASKS} />
            <SelectField label="Outcome" value={outcomeId} onChange={(value) => setOutcomeId(value as PublicReviewOutcomeId)} options={PUBLIC_REVIEW_OUTCOMES} />
            <SelectField label="Time band" value={timeBandId} onChange={(value) => setTimeBandId(value as PublicReviewTimeBandId)} options={PUBLIC_REVIEW_TIME_BANDS} />
            <SelectField label="Was the decision-support boundary clear?" value={boundaryId} onChange={(value) => setBoundaryId(value as PublicReviewBoundaryId)} options={PUBLIC_REVIEW_BOUNDARY_RESPONSES} />
            <label className="tool-field" htmlFor="review-public-comment">
              First friction or public-safe comment <span className="text-slate-500">(optional)</span>
              <textarea
                id="review-public-comment"
                value={comment}
                maxLength={500}
                rows={4}
                onChange={(event) => setComment(event.target.value)}
                className="mt-2 min-h-28 p-3 text-sm leading-6 text-slate-100 outline-none"
                placeholder="For example: I expected the source link near the tool output."
              />
              <span className="mt-2 block text-xs font-semibold text-slate-400">{comment.length}/500 characters. Keep it public-safe.</span>
            </label>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/20 p-4 md:p-5">
          <p className="metric-label">Your manual feedback note</p>
          <p className="mt-3 text-sm leading-6 text-slate-400">Review it before copying. Sending it is your own manual choice.</p>
          <textarea
            aria-label="Generated public review note"
            value={note}
            readOnly
            rows={13}
            className="mt-4 min-h-[20rem] w-full rounded-lg border border-white/10 bg-black/30 p-4 font-mono text-xs leading-6 text-slate-200 outline-none"
          />
          <p className="sr-only" aria-live="polite">{copyError ?? (copied ? "Review note copied." : "")}</p>
          {copyError && <p className="mt-3 rounded-lg border border-orange-300/25 bg-orange-400/10 p-3 text-sm font-bold leading-6 text-orange-50" role="status">{copyError}</p>}
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" onClick={copyNote} className="btn btn-primary">
              {copied ? <Check aria-hidden="true" className="h-4 w-4" /> : <Clipboard aria-hidden="true" className="h-4 w-4" />}
              {copied ? "Copied" : "Copy review note"}
            </button>
            <a href="/contact" className="btn btn-secondary">Open contact routes</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: readonly { id: string; label: string }[] }) {
  return (
    <label className="tool-field">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 min-h-11 w-full rounded-lg border border-white/10 bg-black/30 px-3 text-sm font-semibold text-white outline-none focus:border-cyan-300/70">
        {options.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
      </select>
    </label>
  );
}
