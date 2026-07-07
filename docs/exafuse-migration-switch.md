# Exafuse Migration Switch

Use this checklist when the new Exafuse production site is live and verified.

## Current Mode

The personal site uses `EXAFUSE_LINK_MODE = "production-safe"` in `src/config/externalLinks.ts`.

In this mode, migration-sensitive links for new tools, case pages, and knowledge pages resolve to safe production pages such as Exafuse home, case-study index, knowledge index, or contact.

## Switch Steps

1. Verify the Exafuse production site is live on `https://exafuse.de`.
2. Check every required production path below with browser and HTTP status.
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
