# Final 100 Checklist

Use this before a public release.

- No visual prompt leakage in rendered text.
- Homepage operating loop appears once.
- Homepage puts the LMD Decision Cockpit before proof/resource sections.
- Homepage cockpit shows the public-safe worn-shaft example without requiring a click.
- A first-time visitor can start a guided decision flow within 90 seconds.
- `LMD Decision Brief v1.0` is visible across tools, demo, template, and playbooks.
- `/brief-standard/` presents LMD Decision Brief v1.0 as a public, portable, bounded standard.
- Public schema and example files exist under `/schemas/` and `/examples/`.
- Decision Brief outputs support Technical Decision Brief, Exafuse-ready email draft, AI-agent-safe summary, missing-information checklist, evidence-needed checklist, `.md` download, `.json` download, and print/PDF.
- Brief completeness is visible and clearly not feasibility.
- Evidence burden is visible and clearly not release approval.
- Missing information is grouped as critical gaps, useful gaps, and optional context.
- Email draft copy is manual/client-side only and does not imply automatic sending.
- Exafuse mode is correct for the current production site.
- No staging URLs appear in `dist`.
- No unsafe post-migration Exafuse deep-link labels appear in production-safe mode.
- Human pages do not render "Case source after migration", "RFQ path after migration", "Pathfinder after migration", or "Builder after migration".
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
- `/de/` includes LMD-Entscheidungsbrief v1.0, German boundary text, a German mini-template, and routes visitors to cockpit, no-hype boundary, and Exafuse.
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
npm run audit:brief-artifact
npm run audit:decision-brief
npm run audit:brief-boundaries
npm run audit:debug-text
npm run audit:a11y-static
npm run audit:german-brief
npm run audit:playbook-format
npm run audit:held-claims
npm run audit:mobile-static
npm run audit:public-profiles
npm run audit:decision-boundaries
npm run audit:exafuse-mode-human
npm run audit:brief-schema
npm run audit:human-exafuse-ctas
npm run audit:rubric-format
npm run audit:preflight
npm run audit:seo-social
npm run audit:all
git diff --check
```
