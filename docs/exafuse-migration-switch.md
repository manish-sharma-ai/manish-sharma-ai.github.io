# Exafuse Migration Switch

Use this checklist when the new Exafuse production site is live and verified.

## Current Mode

The personal site uses `EXAFUSE_LINK_MODE = "production-safe"` in `src/config/externalLinks.ts`.

Verification on 2026-07-10: the RFQ Builder, Pathfinder, four case-study paths, LMD guide, and LMD-vs-SLM guide listed below each resolved to `404` after following the current `exafuse.de` redirect. Keep production-safe mode until every required deep path returns a real supporting page.

In this mode, migration-sensitive links for new tools, case pages, and knowledge pages resolve to safe production pages such as Exafuse home, case-study index, knowledge index, or contact.

## Research Boundary

A pre-production Exafuse site may be useful for content research and interaction ideas, but it is not a production-link authority. Do not copy its host name, assume its route IDs or slugs will survive cutover, or change a claim status from that research alone. The only switch authority is the final `https://exafuse.de` URL, its rendered supporting content, and a successful live check.

## Switch Steps

1. Verify the Exafuse production site is live on `https://exafuse.de`.
2. Check every required production path below with browser and HTTP status. Record the final URL after redirects, the page title, the check date, and whether the page explicitly supports the intended claim or handoff.
3. Change `EXAFUSE_LINK_MODE` in `src/config/externalLinks.ts` from `"production-safe"` to `"post-migration"`.
4. Update claim source statuses in `src/data/publicClaims.ts` from `needs-migration` to `publicly-supported` only where the production source explicitly supports the claim.
5. Update `public/llms.txt` and `public/llms-full.txt` to include verified Exafuse deep links.
6. Run:

```bash
npm run build
npm run audit:all
```

7. Confirm no staging URL remains:

```bash
rg -n "pages\.dev|exafuse-website-react|www\.exafuse\.de" src public dist
```

## Paths To Verify

- home: `/`
- contact: `/kontakt/`
- RFQ builder: `/tools/rfq-builder/`
- Pathfinder: `/tools/pathfinder/`
- CS15: `/fallstudien/duisburger-bruecke-lmd-fallstudie/`
- CS01: `/fallstudien/schmiedehammer-reparatur-lmd/`
- CS10: `/fallstudien/extrusionsschnecke-reparatur-lmd/`
- CS13: `/fallstudien/bombenbohrer-lmd-aufbau-beschichtung/`
- technology: `/technologie/`
- quality: `/qualitaet/`
- repair: `/leistungen/modifikation-reparatur/`
- metal AM: `/leistungen/bauteilherstellung/`
- cladding: `/leistungen/laser-cladding/`
- LMD guide: `/wissen/laser-metal-deposition-ded-lbm/`
- LMD vs SLM guide: `/wissen/lmd-vs-slm-lpbf/`

## Claim Source URL Update

For every claim in `src/data/publicClaims.ts`:

- Confirm the metric appears in the production source.
- Confirm the scope is clear.
- Keep `limitation` text intact.
- Do not render claims marked `do-not-render` until support is explicit.
- Keep the CS15 melt-pool image count conservative unless the production source clearly explains a broader dataset scope.

## Final Checks

- `npm run audit:links` passes.
- `npm run audit:claims` passes.
- `llms.txt` and `llms-full.txt` describe verified Exafuse links only.
- GitHub Pages deploy succeeds.
- Live pages return `200 OK`.
- The post-cutover route list is compared with the registry rather than inferred from pre-production route names.
