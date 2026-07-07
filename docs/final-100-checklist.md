# Final 100 Checklist

Use this before a public release.

- No visual prompt leakage in rendered text.
- Homepage operating loop appears once.
- Homepage puts the LMD Decision Cockpit before proof/resource sections.
- A first-time visitor can start a guided decision flow within 90 seconds.
- Exafuse mode is correct for the current production site.
- No staging URLs appear in `dist`.
- No unsafe post-migration Exafuse deep-link labels appear in production-safe mode.
- Press kit links are verified and unambiguous.
- Public identity/profile/link pages do not render planned profiles.
- GitHub profile, repository owner, and repository are clearly separated.
- Public proof metrics render from the claim registry.
- `/claims/` renders the public claim ledger with source status and limitations.
- `/no-hype/` states the claim boundaries clearly.
- No hard-coded proof metrics appear in page components.
- Tools and cockpit copy clean Markdown.
- Tools remain frontend-only and do not store or send inputs.
- Workbench outputs include missing information, risk flags, evidence needed, next action, and "Confidence is not approval."
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
npm run audit:homepage-product
npm run audit:public-profiles
npm run audit:decision-boundaries
npm run audit:exafuse-mode-human
npm run audit:all
git diff --check
```
