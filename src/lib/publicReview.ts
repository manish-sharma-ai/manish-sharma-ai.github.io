export const PUBLIC_REVIEW_TASKS = [
  {
    id: "cockpit",
    label: "Create a worn-shaft decision brief",
    href: "/tools/#preset=worn-shaft",
    check: "Name the three most critical missing facts before treating the output as useful."
  },
  {
    id: "source",
    label: "Find a DED source and its limit",
    href: "/glossary/directed-energy-deposition",
    check: "State what the source helps explain and what it cannot prove for a specific part."
  },
  {
    id: "rfq",
    label: "Structure a rough RFQ",
    href: "/tools#rfq-module",
    check: "Use public-safe dummy text and identify the portable output you would use."
  },
  {
    id: "boundary",
    label: "Check the monitoring boundary",
    href: "/thesis#signal-is-not-proof",
    check: "Explain why a process signal is not final release evidence."
  },
  {
    id: "handoff",
    label: "Choose the right commercial route",
    href: "/contact",
    check: "Decide whether the next step belongs with this Lab or Exafuse."
  }
] as const;

export const PUBLIC_REVIEW_OUTCOMES = [
  { id: "completed", label: "Completed without help" },
  { id: "completed-with-friction", label: "Completed, but with friction" },
  { id: "needed-help", label: "Needed help" },
  { id: "blocked", label: "Could not complete" }
] as const;

export const PUBLIC_REVIEW_TIME_BANDS = [
  { id: "under-two", label: "Under 2 minutes" },
  { id: "two-to-five", label: "2-5 minutes" },
  { id: "over-five", label: "More than 5 minutes" },
  { id: "not-timed", label: "Not timed" }
] as const;

export const PUBLIC_REVIEW_BOUNDARY_RESPONSES = [
  { id: "clear", label: "Boundary was clear" },
  { id: "unclear", label: "Boundary was unclear" },
  { id: "not-seen", label: "Did not see the boundary" }
] as const;

export type PublicReviewTaskId = (typeof PUBLIC_REVIEW_TASKS)[number]["id"];
export type PublicReviewOutcomeId = (typeof PUBLIC_REVIEW_OUTCOMES)[number]["id"];
export type PublicReviewTimeBandId = (typeof PUBLIC_REVIEW_TIME_BANDS)[number]["id"];
export type PublicReviewBoundaryId = (typeof PUBLIC_REVIEW_BOUNDARY_RESPONSES)[number]["id"];

export interface PublicReviewNoteInput {
  taskId: PublicReviewTaskId;
  outcomeId: PublicReviewOutcomeId;
  timeBandId: PublicReviewTimeBandId;
  boundaryId: PublicReviewBoundaryId;
  comment?: string;
}

function optionLabel<T extends { id: string; label: string }>(options: readonly T[], id: string) {
  return options.find((option) => option.id === id)?.label ?? "Not selected";
}

export function formatPublicReviewNote(input: PublicReviewNoteInput) {
  const comment = input.comment?.trim() || "No public-safe comment added.";
  return [
    "Manish Sharma Lab public-review note",
    `Task: ${optionLabel(PUBLIC_REVIEW_TASKS, input.taskId)}`,
    `Outcome: ${optionLabel(PUBLIC_REVIEW_OUTCOMES, input.outcomeId)}`,
    `Time band: ${optionLabel(PUBLIC_REVIEW_TIME_BANDS, input.timeBandId)}`,
    `Decision-support boundary: ${optionLabel(PUBLIC_REVIEW_BOUNDARY_RESPONSES, input.boundaryId)}`,
    `First friction or comment: ${comment}`,
    "Privacy check: no technical, customer, employer, personal, credential, or safety-critical data included."
  ].join("\n");
}
