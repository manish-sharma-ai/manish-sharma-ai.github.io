# Content and Technical Style Guide

## Route Audiences

- Human-first pages should sound like an experienced engineer speaking clearly to engineers, buyers, researchers, and technical managers.
- Hybrid pages may show structured details, but the first visible layer must be readable without knowing the site's internal audit system.
- Machine-first resources may keep strict fields, schemas, version labels, and AI-agent instructions when those improve reliability.

## English Voice

- Use calm, direct engineering language.
- Prefer concrete questions: what is known, what is missing, what risk changes the decision, and what evidence is needed.
- On personal pages, first-person wording is acceptable when it is factual.
- Avoid internal terms in human copy: public-safe, canonical identity, proof domain, claim ledger, registry ID, allowed pages, migration-gated, link mode, production-safe, source governance, and do-not-render.
- Avoid generic AI language such as unlock insights, leverage, navigate the landscape, and at the intersection of.

## German Voice

- `/de/` should read as a German industrial overview, not an English page with German paragraphs.
- Use formal, neutral technical German.
- Preferred terms: Laserauftragschweißen, LMD, laserbasiertes Directed Energy Deposition, Prozessüberwachung, Prozesssignal, Grundwerkstoff, Werkstoffzustand, Schadenstiefe, Bearbeitungszugabe, Nachbearbeitung, Prüfanforderungen, Abnahmekriterien, technische Prüfung, Machbarkeitsbewertung, technische Anfrage, RFQ, Instandsetzung, Beschichtung, Materialauftrag, Bauteilfreigabe.
- Avoid Handoff, Prüfroute, öffentlich sicher, kanonische Identität, and repeated slogans such as überprüfbar bleiben.

## Technical Terminology

- DED is the broader process category.
- LMD is laser-based DED. Depending on the system, powder or wire may be supplied.
- Laser cladding overlaps with LMD applications, but it is not automatically additive manufacturing in every context.
- Use PBF-LB/M for standards-oriented metal laser powder bed fusion language. LPBF is widely understood. SLM may be used as a familiar or legacy/commercial term.
- Do not present LMD versus SLM/LPBF as a universal competition. The route depends on size, feature scale, local versus full-volume addition, internal channels, material, tolerances, surface requirements, post-processing, quantity, qualification, repair context, economics, and available equipment.

## Evidence Words

- Use proof only when the cited source genuinely demonstrates the specific point.
- Prefer evidence, documented example, source-backed example, public context, or public work for most pages.
- Validation means the source validated a defined thing. Do not imply a whole part, process, institution, or service was certified unless the source says so.
- Approval, release, certification, acceptance, and qualification are high-risk terms. Use them mainly in explicit limitation statements.

## Monitoring and AI

- Process monitoring can document process behavior and support review.
- Anomaly detection is not automatically defect detection.
- Process signals may support quality assurance, but final acceptance can require dimensional inspection, NDT, destructive testing, material testing, process qualification, or other part-specific evidence.
- Rule-based tools must identify themselves as screening or route-signal tools, not trained or validated AI models.

## Scores and Bands

- Do not expose precise numerical scores for heuristic repairability or route screens unless the calculation, weights, intended use, sensitivity, validation status, and scale meaning are documented.
- Prefer qualitative bands such as insufficient information, major uncertainties, candidate for technical review, and stronger candidate for detailed assessment.

## Privacy and Tool Copy

- State browser-local behavior once near an input area.
- Do not repeat no backend, no data sent, and no automatic sending across multiple badges on the same screen.
- Generated exports may carry compact privacy and limitation text because they can leave the website context.

## Claims and Sources

- Every prominent numerical claim must come from shared claim data and render with a `data-claim-id`.
- Claims without a suitable public source should stay out of promotional surfaces.
- Held claims may appear only in separated review context and must not be active page copy.
- Do not invent publications, customer names, validation, certification, or performance outcomes.

## Exafuse Boundary

- Manish Sharma Lab is the personal technical and research-facing site.
- Exafuse owns commercial services, RFQs, company case studies, quality pages, production capability, delivery claims, and company-owned source details.
- Route real commercial enquiries to Exafuse.
- Do not expose staging URLs, migration state, internal link modes, or future deep links as live public CTAs.
