# Exafuse public proof import

## Scope

This site consumes a small, reviewed subset of public Exafuse case context as evidence for Manish Sharma Lab’s decision-support explanations. It is not a mirror of Exafuse case studies and does not create a runtime, build, or Git dependency on an Exafuse repository.

## Read-only source record

- Source: a locally available, read-only Exafuse website source repository containing public website material.
- Reviewed source commit: `0d4938331eaf2f586661587e427bc29aabdbf61c`.
- Review date: 2026-07-19.
- Public source links are resolved only through `src/config/externalLinks.ts`.
- The private repository location and remote are intentionally not reproduced in this public repository.

The source worktree was already dirty before review. No file, branch, commit, formatter, build, or dependency operation was run in it. This import reads committed blobs only.

## Selected public cases

| Case | Role | Public source status | Reason selected |
| --- | --- | --- | --- |
| Duisburg bridge components (CS15) | Flagship large-part LMD evidence | Verified individual production page | Strong physical imagery, public scale context, monitoring boundary, and an explicit validation route. |
| Nobufil extrusion screw repair (CS10) | Supporting repair story | Verified individual production page | Clear damage → rebuild → finish → inspection decision chain. |
| Valve-seat ring cladding (CS05) | Supporting surface-function story | Verified individual production page | Shows why coating, heat, finishing, and inspection remain coupled. |
| 130 mm drill build-and-coat (CS13) | Supporting hybrid-route story | Verified public case index | Makes geometry and surface-function planning visible without a transferable performance claim. |

Forging-hammer material was not selected in this pass: it would have duplicated the repair narrative and had no imported approved derivative in this review.

## Imported media

Each derivative is stored under `public/media/exafuse/` with AVIF, WebP, and JPEG fallback variants. The exact original public path is recorded per case in `src/data/exafusePublicProof.ts`.

| Local family | Source media purpose | Attribution |
| --- | --- | --- |
| `bridge/` | Large LMD bridge-node context | Exafuse — Duisburg bridge components |
| `repair/` | Finished extrusion-screw repair context | Exafuse — Nobufil screw repair |
| `cladding/` | Dye-inspected valve-seat ring context | Exafuse — Valve-seat ring cladding |
| `build-coat/` | 130 mm drill route context | Exafuse — 130 mm drill build-and-coat |

Every rendered use includes the Exafuse name, a concise caption, and a direct public source link. The derivatives remove unnecessary file metadata and declare intrinsic dimensions. Original large files are not imported.

## Claim and contribution rules

- Metrics live in `src/data/exafusePublicProof.ts` and include a source path and limitation.
- Existing public claim IDs remain in `src/data/publicClaims.ts` where a metric is used by a legacy claim surface.
- Manish Sharma’s `personalContribution` is `null` for every imported company case unless a separate public contribution source exists.
- Pages state that the material is public Exafuse case context used for an interpretation and decision pattern.
- Monitoring, images, and project figures are never presented as final approval, certification, release, quality guarantee, or transferable feasibility.

## Future maintenance

1. Verify the source material is already public and intended for a public Exafuse page.
2. Confirm the exact production URL independently; otherwise use the safe case index or contact fallback.
3. Add the case to `src/data/exafusePublicProof.ts` with source paths, reviewed date, limitations, and `personalContribution: null` unless separately sourced.
4. Generate responsive derivatives only; do not copy a media library wholesale.
5. Use `ExafuseProofMedia.astro` so visible attribution is not omitted.
6. Run the Exafuse proof audits before release.
