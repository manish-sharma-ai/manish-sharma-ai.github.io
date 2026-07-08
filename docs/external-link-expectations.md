# External Link Expectations

Current Exafuse mode: `production-safe`.

Manish Sharma Lab links to Exafuse as the company/commercial source. The production Exafuse site is expected to remain old-site-compatible until the migration is explicitly verified.

## Allowed In Production-Safe Mode

- `https://exafuse.de/`
- `https://exafuse.de/kontakt/`
- Existing production service, technology, quality, material, case-index, and knowledge-index pages that are verified live.
- Buyer-facing labels such as `Contact Exafuse`, `Request Exafuse review`, `Discuss with Exafuse`, `View Exafuse after migration`, and `Case source after migration`.

## Migration-Gated Links

These should not render as live deep links while `EXAFUSE_LINK_MODE` is `production-safe`:

- Exafuse Pathfinder
- Exafuse RFQ Builder
- Individual new case-study deep links
- New LMD/DED knowledge article deep links
- New AI-agent page

In production-safe mode, those routes must point to a safe production index/contact page and use a buyer-facing or source-status label. Public helper text should say: `New Exafuse case/tool deep links activate after production migration.`

## Switch To Post-Migration Mode

1. Verify every target route on production Exafuse.
2. Update `EXAFUSE_LINK_MODE` in `src/config/externalLinks.ts` from `production-safe` to `post-migration`.
3. Run `npm run build`.
4. Run `npm run audit:links`.
5. Run `npm run audit:all`.
6. Manually open the affected Exafuse routes from the built site.

## Revert If Migration Fails

1. Change `EXAFUSE_LINK_MODE` back to `production-safe`.
2. Run `npm run build`.
3. Run `npm run audit:links`.
4. Commit and push the revert if the broken links already reached production.

## Link Audit Commands

```bash
npm run audit:links
npm run audit:links:report
npm run audit:all
```

`audit:links:report` prints external URLs found in source and built output so link targets can be reviewed before release.
