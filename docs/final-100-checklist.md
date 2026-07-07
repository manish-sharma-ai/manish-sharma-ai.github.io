# Final 100 Checklist

Use this before a public release.

- No visual prompt leakage in rendered text.
- Homepage operating loop appears once.
- Homepage puts the LMD Decision Cockpit before proof/resource sections.
- Homepage cockpit shows the public-safe worn-shaft example without requiring a click.
- A first-time visitor can start a guided decision flow within 90 seconds.
- `LMD Decision Brief v1.0` is visible across tools, demo, template, and playbooks.
- Decision Brief outputs support Markdown copy, missing-information checklist, evidence-needed checklist, Exafuse review summary, `.md` download, and `.json` download.
- Exafuse mode is correct for the current production site.
- No staging URLs appear in `dist`.
- No unsafe post-migration Exafuse deep-link labels appear in production-safe mode.
- Press kit links are verified and unambiguous.
- Public identity/profile/link pages do not render planned profiles.
- GitHub profile, repository owner, and repository are clearly separated.
- Public proof metrics render from the claim registry.
- `/claims/` renders active public claims by default, and held claims only in the collapsed `Held for source review` section.
- `/no-hype/` states the claim boundaries clearly.
- No hard-coded proof metrics appear in page components.
- Tools and cockpit copy clean Markdown.
- Tools remain frontend-only and do not store or send inputs.
- Workbench outputs include missing information, risk flags, evidence needed, next action, and "Confidence is not approval."
- Playbooks use real lists, stable anchors, and copyable LMD Decision Brief starters.
- `/resources/` groups site assets by user intent.
- `/de/` routes German visitors to cockpit, no-hype boundary, and Exafuse.
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
npm run audit:decision-brief
npm run audit:playbook-format
npm run audit:held-claims
npm run audit:mobile-static
npm run audit:public-profiles
npm run audit:decision-boundaries
npm run audit:exafuse-mode-human
npm run audit:all
git diff --check
```
