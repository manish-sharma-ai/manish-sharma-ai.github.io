# Privacy-Safe Outcome Validation

Date: 2026-07-10

Purpose: measure whether Manish Sharma Lab helps real visitors without collecting or storing their technical inputs.

## Five outcomes

| Outcome | Definition | Safe evidence source | Never collect |
| --- | --- | --- | --- |
| Cockpit start success | Visitor reaches a worked or blank brief and can explain the next action | Moderated task count; optional aggregate page-event count only if a future privacy review approves it | Selections, free text, component details, material, risk flags |
| Brief handoff success | Visitor produces the intended Markdown, JSON, print, email-draft, or AI-safe mode | Moderated task count; voluntary yes/no feedback | Export contents or filenames |
| Source verification success | Visitor opens the correct primary source and identifies what it does not prove | Moderated task observation; Search Console landing queries | Browsing history tied to a person |
| Exafuse routing success | Visitor chooses Exafuse for a genuine commercial/RFQ path and the Lab for public guidance | Moderated scenario test; voluntary aggregate referral count if Exafuse approves | RFQ contents, customer identity, commercial details |
| Comprehension success | Visitor correctly states that completeness is not feasibility and monitoring is not release proof | Short anonymous/manual comprehension test | Names, employer/customer data, technical case details |

## Baseline protocol

Run with at least five people across the priority audiences: manufacturing/LMD engineer, buyer or maintenance decision-maker, industrial-AI practitioner, researcher, and technical student/developer.

Give each participant public-safe dummy data only. Record task outcome, elapsed time, first wrong turn, language they found unclear, and whether they can state the boundary. Do not record their screen, identity, organization, or entered technical content unless they separately and explicitly agree.

## Core tasks

1. From the homepage, create a preliminary worn-shaft brief and name the three most critical missing facts.
2. Find the source that defines or orients DED terminology and state what that source cannot prove.
3. Turn a rough RFQ scenario into the correct portable output mode.
4. Explain the difference between monitoring evidence and final release evidence.
5. Decide whether a commercial feasibility request belongs with Manish Sharma Lab or Exafuse.
6. Recover from a deliberately invalid URL using search or the task links.

## Release thresholds

- At least 4 of 5 participants complete each core task without facilitator help.
- Median time to a useful worked brief is under 90 seconds.
- Every participant identifies that the output is preliminary decision support, not approval.
- No participant mistakes brief completeness for feasibility or evidence burden for release approval.
- No participant needs to provide confidential or real customer data.

## Current status

The public `/review/` journey now exposes all six protocol tasks as an executable browser-local task flow. Its manual note captures an optional audience category, selected task, outcome, time band, boundary comprehension, primary friction, and an optional public-safe comment. It does not submit, store, or analyze selections or comments. This makes the protocol easier to run; it does not create participant evidence by itself.

Participant evidence is still not collected. Do not score real-user validation as complete until the anonymized aggregate results are recorded here.

## Aggregate Result Record

After a moderated session, record only the anonymized aggregate below. Do not add participant names, employers, recordings, entered text, real technical inputs, customer identifiers, or any other personal/sensitive data.

| Review date | Number of participants | Tasks meeting threshold | Median worked-brief time | Boundary misunderstanding count | Main friction pattern | Follow-up change | Reviewer |
| --- | ---: | --- | --- | ---: | --- | --- | --- |
| Not yet run | 0 | Not yet measured | Not yet measured | Not yet measured | Not yet measured | Not yet measured | Not yet assigned |

One row should represent one completed review round. Mark the strict scorecard evidence gate only after at least five target users and all release thresholds above are met.
