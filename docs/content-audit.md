# Content Audit

Date: 2026-07-07

## Scope

This audit covers staging-domain cleanup, canonical-site usage, public/private boundaries, planned-profile handling, source placeholders, and overclaim language.

Search terms checked:

- `exafuse-website-react.pages.dev`
- `pages.dev`
- `staging Exafuse`
- `production URL pending review`
- `planned profile`
- `source link to be added`
- `coming soon`
- `TODO`
- `draft`
- `placeholder`
- `certificate`
- `guarantee`
- `approval`
- `safety-critical`
- `engineering approval`
- `quality guarantee`
- `final release`
- `Production URL pending`
- `Pending Exafuse`

## Issues Found And Actions

| Issue found | File/page | Public-facing | Action taken |
| --- | --- | --- | --- |
| Exafuse proof statuses used old wording around production URL review. | `src/data/exafuse.ts`, `public/research/exafuse-public-proof-map.json` | Yes | Replaced with public-safe statuses such as `Public Exafuse proof`, `Public Exafuse knowledge page`, and `Public Exafuse knowledge context`. |
| Stale Exafuse launch wording remained in the docs link map. | `docs/exafuse-link-map.md` | No | Reworded as final production URLs or post-cutover review work. |
| Long AI-agent resource list read like a link wall. | `/for-ai-agents` | Yes | Grouped links into canonical identity, evidence/proof, frameworks/tools, and agent/source boundary sections. |
| Curated source page used dense table layout for working-draft source categories. | `/research/core-lmd-ai-sources` | Yes | Converted the source map into source cards with clear working-draft status chips. |
| Command palette returned title-only results. | `src/components/CommandPalette.astro`, `src/data/site.ts` | Yes | Added optional page descriptions and made search include summary text. |
| Missing shared evidence-loop component. | Homepage, `/thesis`, `/evidence` | Yes | Added `EvidenceRail.astro` and reused it across the operating-model pages. |
| Exafuse owned tools were not part of the central link list. | `src/data/siteConfig.ts`, `src/data/exafuse.ts` | Yes | Added Exafuse tools, Pathfinder, RFQ Builder, and AI-agent page to central config/link lists. |

## Safe Limitation Language Confirmed

Public pages intentionally contain limitation language such as:

- Not engineering approval
- Not material certification
- Not safety-critical acceptance
- Not a quality guarantee
- Melt-pool monitoring is process evidence, not final quality proof

These are not issues; they are required claim boundaries.

## Remaining Human TODO

| Item | Location | Why it remains |
| --- | --- | --- |
| Planned external profiles: ORCID, Zenodo, Hugging Face, Google Scholar, ResearchGate. | `src/data/profiles.ts`, `/links`, `/profile/public-profile`, docs | Real URLs are not known. They must stay disabled or planned until Manish supplies verified URLs. |
| Curated source categories need verified citations. | `/research/core-lmd-ai-sources`, `docs/public-profile-todo.md` | The site should not invent DOIs, authors, venues, or paper details. |
| Several Exafuse case/article slugs should be checked after production cutover. | `docs/exafuse-link-map.md` | The personal site uses canonical `exafuse.de` links, but docs retain a review list for future live checks. |
| About and press-kit claims should be checked against LinkedIn/CV before external reuse. | `/about`, `/press-kit` | Public-safe wording is used, but external media reuse should still be verified by the owner. |

## Public Boundary

No confidential Exafuse, customer, machine, process, material, pricing, inspection, or private project data should be added to this repository. Exafuse remains the canonical commercial source for services, RFQs, case studies, production capability, and quality/company claims.

