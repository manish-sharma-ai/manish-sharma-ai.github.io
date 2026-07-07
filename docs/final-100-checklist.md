# Final 100 Checklist

Use this before a public release.

- No visual prompt leakage in rendered text.
- Homepage operating loop appears once.
- Exafuse mode is correct for the current production site.
- No staging URLs appear in `dist`.
- No unsafe post-migration Exafuse deep-link labels appear in production-safe mode.
- Press kit links are verified and unambiguous.
- GitHub profile, repository owner, and repository are clearly separated.
- Public proof metrics render from the claim registry.
- No hard-coded proof metrics appear in page components.
- Tools copy clean Markdown.
- Tools remain frontend-only and do not store or send inputs.
- AI-agent files are updated after identity, link, or source-map changes.
- `llms.txt`, `llms-full.txt`, identity Markdown, and public profile Markdown match the human pages.
- No page implies certification, final approval, automatic release, or guaranteed quality.
- Build, check, and audits pass.

Required commands:

```bash
npm run check
npm run build
npm run audit:visual-text
npm run audit:rendered-text
npm run audit:links
npm run audit:claims
npm run audit:boundaries
npm run audit:all
git diff --check
```
