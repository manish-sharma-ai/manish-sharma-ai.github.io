# Link Audit

Date: 2026-07-06

## Scope

This audit covers public links, staging-domain cleanup, canonical-site usage, profile links, Exafuse links, and source-placeholder handling for Manish Sharma Lab.

## Staging Links Found

- The old Exafuse Cloudflare Pages staging URL appeared in the Exafuse data layer and the public Exafuse proof-map JSON.
- Staging deployment links were treated as non-public deployment links and removed from site-facing content.

## Production Links Used

- Canonical site: `https://manish-sharma-ai.github.io`
- Exafuse base: `https://exafuse.de`
- Exafuse services: `https://exafuse.de/leistungen/`
- Exafuse metal additive manufacturing: `https://exafuse.de/leistungen/bauteilherstellung/`
- Exafuse repair/modification: `https://exafuse.de/leistungen/modifikation-reparatur/`
- Exafuse laser cladding: `https://exafuse.de/leistungen/laser-cladding/`
- Exafuse technology: `https://exafuse.de/technologie/`
- Exafuse quality: `https://exafuse.de/qualitaet/`
- Exafuse case studies: `https://exafuse.de/fallstudien/`
- Exafuse contact/RFQ: `https://exafuse.de/kontakt/`

## Pages Changed

- Homepage
- Thesis
- LMD/DED domain hub
- Evidence base
- Industrial proof map
- Public work
- Framework pages
- Tools and Agent Pack
- For AI Agents
- Press Kit
- Public Profile
- Glossary index and glossary term pages
- Lab notes through shared footer/source-note handling
- `llms.txt`
- `llms-full.txt`
- `README.md`
- Public Exafuse proof-map JSON

## Profile Link Handling

Active public URLs:

- Site: `https://manish-sharma-ai.github.io`
- Exafuse: `https://exafuse.de/`
- LinkedIn: `https://www.linkedin.com/in/manishsharma5/`
- GitHub: `https://github.com/aiwithms`

Planned profiles with no active URL:

- ORCID
- Zenodo
- Hugging Face
- Google Scholar
- ResearchGate

Planned profiles should remain disabled or marked planned until real public URLs exist. They must not be included in JSON-LD `sameAs`.

## Remaining Unresolved Links

Some Exafuse production slugs are intended final URLs but should be checked after the Exafuse production launch:

- Forging hammer repair case
- Extrusion screw repair case
- Build-and-coat drill case
- Large-part LMD guide
- Monitoring and quality guide
- BreitBahn DED guide
- LMD powder year-in-review article
- Hammer repair article
- Neural image processing article

See `docs/exafuse-link-map.md` for status.

## Verification Commands

```bash
rg -n "<staging-exafuse-domain>|<old-www-exafuse-domain>" src public docs README.md AGENTS.md
rg -n "<hash-placeholder-profile-links>" src public docs README.md
rg -n "<wrong-github-pages-canonical>" src public docs README.md AGENTS.md
```
