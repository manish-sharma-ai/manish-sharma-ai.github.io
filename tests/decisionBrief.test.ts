import { describe, expect, it } from "vitest";
import { COPY_UNAVAILABLE_MESSAGE } from "../src/lib/clipboard";
import {
  BOUNDARY_STATEMENT,
  BRIEF_NOT_VALID_FOR,
  BRIEF_VERSION,
  COCKPIT_PRESETS,
  NO_AUTOMATIC_SENDING_NOTE,
  NO_BACKEND_NOTE,
  WORN_SHAFT_BRIEF,
  createDecisionBrief,
  formatAiAgentSafeSummary,
  formatDecisionBriefJson,
  formatExafuseEmailDraft,
  formatExafuseMailtoHref,
  formatMissingInformationChecklist,
  formatReviewContextFacts,
  getCockpitPreset
} from "../src/lib/decisionBrief";
import { PUBLIC_REVIEW_RECORD_VERSION, PUBLIC_REVIEW_TASKS, createPublicReviewRecord, formatPublicReviewNote, formatPublicReviewRecordJson } from "../src/lib/publicReview";

describe("LMD Decision Brief invariants", () => {
  it("provides a non-destructive recovery path when clipboard access is unavailable", () => {
    expect(COPY_UNAVAILABLE_MESSAGE).toContain("Use a download");
    expect(COPY_UNAVAILABLE_MESSAGE).toContain("copy it manually");
  });

  it("preserves the canonical identity and not-valid-for boundary", () => {
    const brief = createDecisionBrief({});

    expect(brief.briefVersion).toBe(BRIEF_VERSION);
    expect(brief.notValidFor).toEqual(BRIEF_NOT_VALID_FOR);
    expect(brief.boundaryStatement).toBe(BOUNDARY_STATEMENT);
    expect(brief.noBackendNote).toBe(NO_BACKEND_NOTE);
    expect(brief.noAutomaticSendingNote).toBe(NO_AUTOMATIC_SENDING_NOTE);
  });

  it("groups, trims, and deduplicates missing information", () => {
    const brief = createDecisionBrief({
      knownFacts: ["Photos available"],
      missingInformation: [
        " Exact material grade ",
        "Exact material grade",
        "Machining allowance",
        "Optional operator note"
      ]
    });

    expect(brief.missingCritical).toEqual(["Exact material grade"]);
    expect(brief.missingUseful).toEqual(["Machining allowance"]);
    expect(brief.missingOptional).toEqual(["Optional operator note"]);
    expect(brief.missingInformation).toHaveLength(3);
  });

  it("keeps role and phase as labeled request context rather than technical proof", () => {
    expect(formatReviewContextFacts("maintenance", "downtime")).toEqual([
      "Request role: Maintenance / plant engineering",
      "Request phase: Respond to downtime or a hard deadline"
    ]);
    expect(formatReviewContextFacts(null, null)).toEqual([]);

    const brief = createDecisionBrief({
      knownFacts: ["Request role: Buyer / sourcing", "No concrete technical facts selected yet."],
      missingInformation: ["Dimensions / approximate mass", "Quantity / target date"]
    });

    expect(brief.briefCompleteness).toBe("Too vague for useful review");
    expect(brief.missingCritical).toContain("Dimensions / approximate mass");
    expect(brief.missingUseful).toContain("Quantity / target date");
  });

  it("escalates safety-critical cases to formal qualification planning", () => {
    const brief = createDecisionBrief({
      situation: "Safety-critical repair question",
      knownFacts: ["Component identified"],
      riskFlags: ["Safety-critical service"],
      evidenceNeeded: ["Acceptance criteria"]
    });

    expect(brief.briefCompleteness).toBe("Requires formal inspection / qualification planning");
    expect(brief.expertReviewPackageStatus).toBe("Requires formal qualification planning");
    expect(brief.evidenceBurden).toBe("Formal qualification burden");
    expect(brief.missingCritical).toContain("Inspection requirement for safety-critical or high-risk cases");
  });

  it("does not treat an empty brief as useful review context", () => {
    const brief = createDecisionBrief({ knownFacts: [] });

    expect(brief.briefCompleteness).toBe("Too vague for useful review");
  });

  it("keeps every public preset resolvable and bounded", () => {
    expect(COCKPIT_PRESETS.length).toBeGreaterThanOrEqual(5);
    for (const preset of COCKPIT_PRESETS) {
      expect(getCockpitPreset(preset.id)).toBe(preset);
      expect(preset.brief.notValidFor).toEqual(BRIEF_NOT_VALID_FOR);
      expect(preset.brief.boundaryStatement).toBe(BOUNDARY_STATEMENT);
    }
    expect(getCockpitPreset("not-a-real-preset")).toBeUndefined();
  });

  it("exports a parseable JSON handoff without weakening boundaries", () => {
    const exported = JSON.parse(formatDecisionBriefJson(WORN_SHAFT_BRIEF));

    expect(exported.outputMode).toBe("JSON handoff");
    expect(exported.brief.outputMode).toBe("JSON handoff");
    expect(exported.notValidFor).toEqual(BRIEF_NOT_VALID_FOR);
    expect(exported.boundaryStatement).toBe(BOUNDARY_STATEMENT);
    expect(exported.noBackendNote).toBe(NO_BACKEND_NOTE);
  });

  it("keeps grouped gaps explicit in the portable checklist", () => {
    const checklist = formatMissingInformationChecklist(WORN_SHAFT_BRIEF);

    expect(checklist).toContain("## Critical gaps");
    expect(checklist).toContain("## Useful gaps");
    expect(checklist).toContain("## Optional context");
    expect(checklist).toContain("not feasibility");
  });

  it("marks email output as a manual review draft", () => {
    const email = formatExafuseEmailDraft(WORN_SHAFT_BRIEF);
    const mailto = formatExafuseMailtoHref(WORN_SHAFT_BRIEF);

    expect(email).toContain("Please review; this is not approval.");
    expect(email).toContain("generated locally in the browser");
    expect(mailto.startsWith("mailto:?subject=")).toBe(true);
    expect(decodeURIComponent(mailto)).toContain("preliminary decision brief");
  });

  it("keeps AI-agent output inside the explicit safe-use envelope", () => {
    const summary = formatAiAgentSafeSummary(WORN_SHAFT_BRIEF);

    expect(summary).toContain("AI-Agent-Safe LMD Decision Summary");
    expect(summary).toContain("Do not use for: approval, certification, release, safety-critical acceptance, quality guarantee");
    expect(summary).toContain("Commercial/company review: Exafuse.");
    expect(summary).toContain(NO_BACKEND_NOTE);
    expect(summary).toContain(NO_AUTOMATIC_SENDING_NOTE);
  });

  it("formats a public review note without technical intake fields", () => {
    const note = formatPublicReviewNote({
      taskId: "cockpit",
      audienceId: "manufacturing-engineer",
      outcomeId: "completed",
      timeBandId: "under-two",
      boundaryId: "clear",
      frictionId: "none"
    });

    expect(note).toContain("Create a worn-shaft decision brief");
    expect(note).toContain("Manufacturing / LMD engineer");
    expect(note).toContain("No meaningful friction");
    expect(note).toContain("No public-safe comment added.");
    expect(note).toContain("Privacy check:");
    expect(note).not.toContain("material grade");
  });

  it("keeps every published review task aligned with the six-task protocol", () => {
    expect(PUBLIC_REVIEW_TASKS).toHaveLength(6);
    expect(PUBLIC_REVIEW_TASKS.find((task) => task.id === "recovery")?.href).toBe("/404.html");
  });

  it("creates a portable review record without identity or timing metadata", () => {
    const input = {
      taskId: "recovery" as const,
      audienceId: "not-shared" as const,
      outcomeId: "completed-with-friction" as const,
      timeBandId: "two-to-five" as const,
      boundaryId: "clear" as const,
      frictionId: "navigation" as const,
      comment: "The recovery task was easy to find."
    };
    const record = createPublicReviewRecord(input);
    const json = JSON.parse(formatPublicReviewRecordJson(input));

    expect(record.recordVersion).toBe(PUBLIC_REVIEW_RECORD_VERSION);
    expect(record.task.id).toBe("recovery");
    expect(record).not.toHaveProperty("identity");
    expect(record).not.toHaveProperty("timestamp");
    expect(json.primaryFriction.id).toBe("navigation");
  });
});
