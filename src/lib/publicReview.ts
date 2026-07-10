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
  },
  {
    id: "recovery",
    label: "Recover from an invalid route",
    href: "/404.html",
    check: "Use search or a task link to recover from a deliberately invalid URL."
  }
] as const;

export const PUBLIC_REVIEW_AUDIENCES = [
  { id: "manufacturing-engineer", label: "Manufacturing / LMD engineer" },
  { id: "buyer-maintenance", label: "Buyer or maintenance decision-maker" },
  { id: "industrial-ai", label: "Industrial-AI practitioner" },
  { id: "researcher", label: "Researcher" },
  { id: "technical-student", label: "Technical student / developer" },
  { id: "not-shared", label: "Prefer not to say" }
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

export const PUBLIC_REVIEW_FRICTION_OPTIONS = [
  { id: "none", label: "No meaningful friction" },
  { id: "navigation", label: "Finding the right route" },
  { id: "terminology", label: "Terminology or wording" },
  { id: "control", label: "Understanding a control or output" },
  { id: "boundary", label: "Finding the decision boundary" },
  { id: "access", label: "Access, display, or interaction" },
  { id: "other", label: "Other public-safe friction" }
] as const;

export type PublicReviewTaskId = (typeof PUBLIC_REVIEW_TASKS)[number]["id"];
export type PublicReviewAudienceId = (typeof PUBLIC_REVIEW_AUDIENCES)[number]["id"];
export type PublicReviewOutcomeId = (typeof PUBLIC_REVIEW_OUTCOMES)[number]["id"];
export type PublicReviewTimeBandId = (typeof PUBLIC_REVIEW_TIME_BANDS)[number]["id"];
export type PublicReviewBoundaryId = (typeof PUBLIC_REVIEW_BOUNDARY_RESPONSES)[number]["id"];
export type PublicReviewFrictionId = (typeof PUBLIC_REVIEW_FRICTION_OPTIONS)[number]["id"];

export interface PublicReviewNoteInput {
  taskId: PublicReviewTaskId;
  audienceId: PublicReviewAudienceId;
  outcomeId: PublicReviewOutcomeId;
  timeBandId: PublicReviewTimeBandId;
  boundaryId: PublicReviewBoundaryId;
  frictionId: PublicReviewFrictionId;
  comment?: string;
}

function optionLabel<T extends { id: string; label: string }>(options: readonly T[], id: string) {
  return options.find((option) => option.id === id)?.label ?? "Not selected";
}

export function formatPublicReviewNote(input: PublicReviewNoteInput) {
  const comment = input.comment?.trim() || "No public-safe comment added.";
  return [
    "Manish Sharma Lab public-review note",
    `Audience: ${optionLabel(PUBLIC_REVIEW_AUDIENCES, input.audienceId)}`,
    `Task: ${optionLabel(PUBLIC_REVIEW_TASKS, input.taskId)}`,
    `Outcome: ${optionLabel(PUBLIC_REVIEW_OUTCOMES, input.outcomeId)}`,
    `Time band: ${optionLabel(PUBLIC_REVIEW_TIME_BANDS, input.timeBandId)}`,
    `Decision-support boundary: ${optionLabel(PUBLIC_REVIEW_BOUNDARY_RESPONSES, input.boundaryId)}`,
    `Primary friction: ${optionLabel(PUBLIC_REVIEW_FRICTION_OPTIONS, input.frictionId)}`,
    `First friction or comment: ${comment}`,
    "Privacy check: no technical, customer, employer, personal, credential, or safety-critical data included."
  ].join("\n");
}
