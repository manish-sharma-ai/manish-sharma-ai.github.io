# Figma-driven redesign implementation brief

Date: 2026-07-16

## Purpose and scope

This document is the handoff for a visual redesign of manishsharma.dev. It records the current implementation so that a Figma design can be translated without breaking public content, decision-support boundaries, browser-local tool behavior, search discovery, or deployment.

This is an audit only. It does not propose changes to claims, routes, tool logic, data collection, or the Exafuse commercial boundary.

## 1. Framework, build, package manager, and deployment

| Concern | Current implementation | Files to preserve |
| --- | --- | --- |
| Framework | Astro 7 static site, with Astro file-based routes | package.json, src/pages |
| Interactive UI | React 18 islands through the Astro React integration | package.json, astro.config.mjs, src/components/*.tsx |
| Language | TypeScript in strict Astro configuration | tsconfig.json |
| Styling build | Tailwind CSS 3 through PostCSS and authored global CSS | tailwind.config.mjs, postcss.config.mjs, src/styles |
| Package manager | npm, locked with package-lock.json | package-lock.json |
| Static integrations | Astro sitemap integration; no server runtime or database | astro.config.mjs |
| Output | Static HTML in dist, with HTML compression and externally emitted stylesheets | astro.config.mjs |
| Deployment | GitHub Actions deploys dist to GitHub Pages on pushes to main | .github/workflows/deploy.yml |

Astro is configured with the canonical production settings:

~~~ts
export default defineConfig({
  site: "https://manishsharma.dev",
  base: "/",
  output: "static",
  compressHTML: true,
  build: { inlineStylesheets: "never" },
  integrations: [react(), sitemap()]
});
~~~

The deployment workflow uses Node 24, npm ci, production dependency auditing, Vitest, Astro build/check, and the complete release-audit suite before uploading dist to GitHub Pages. A redesign must stay compatible with that zero-server deployment model.

Relevant scripts:

- npm run check runs Astro type/content checks.
- npm test runs Vitest.
- npm run build runs Astro check and static build.
- npm run audit:all runs the release guardrail suite.
- npm run smoke:live checks live production URLs after deployment.

There is no dependency on a runtime animation, chart, database, analytics, cookie, or CMS product. Do not introduce one as part of visual implementation without a separate product and privacy decision.

## 2. Styling approach

The site uses a hybrid styling model:

1. CSS custom properties define the core visual system in src/styles/design-tokens.css.
2. Authored global CSS defines layout, visual primitives, navigation, search, tool-panel, responsive, print, and reduced-motion behavior in src/styles/layout.css and src/styles/components.css.
3. Tailwind utility classes are used directly in Astro and React markup for local composition, spacing, typography, responsive variants, and one-off state styling.
4. src/styles/global.css imports the authored CSS and the Tailwind base, components, and utilities layers. It is imported once by src/layouts/Layout.astro.

There are no CSS modules, CSS-in-JS, design-token package, runtime theme provider, or light theme. The root explicitly declares a dark color scheme. The two PostCSS config files are equivalent CommonJS and ESM forms; Tailwind is configured from tailwind.config.mjs.

The Figma library should therefore map to the CSS-variable system first. Tailwind colors are useful implementation conveniences, but they are not the complete visual source of truth.

### Current visual primitives

- Page canvas: layered graphite/navy gradients, fixed technical grid, and very subtle noise texture.
- Surfaces: translucent dark glass panels with thin steel borders, top/bottom edge treatments, internal highlights, and restrained blur.
- Accents: cyan for primary technical action and positive emphasis; amber/orange for caution, evidence burden, and Exafuse handoff.
- Typography: Inter/system sans for general content; JetBrains Mono/system monospace for labels, chips, keycaps, and metadata.
- Interaction: small translate and border/glow transitions; hover is supplementary, never the only source of meaning.
- Structure: wide ordered bands, 12-column/bento grids, large section rhythm, and cards with consistent surface treatment.

### Token inventory

| Category | Current values and use |
| --- | --- |
| Width and padding | page max 1240px; desktop/tablet/mobile horizontal pad 32px, 24px, 16px |
| Vertical rhythm | section gap 96px desktop, 72px tablet, 56px mobile; grid gap 24px, 16px mobile |
| Cards | card padding 24px, 18px mobile; standard radius 16px, small radius 12px; panel radius 24px |
| Controls | pill button radius 999px; form/control radius 10px; header height 72px |
| Backgrounds | deep #010204; base #030507; secondary #071018; navy #06101f; glass surfaces use dark rgba values |
| Text | primary #f1fbff; strong #ffffff; soft #cfdee7; muted #92a8b5; secondary muted #687e8c |
| Accents | cyan #34ddff and strong cyan #83f0ff; mint #78f7d2; blue #2f80ff; amber #ffb64c; molten #ff6b35; laser #ff4d2e |
| Borders and shadow | steel/cyan alpha borders, cyan and amber glows, deep card shadows |
| Motion | 140ms, 220ms, and 720ms; industrial and standard ease-out curves |

The Tailwind extension mirrors part of this system under graphite and beam colors, adds glow/panel shadows, and declares Inter and JetBrains Mono stacks. It does not replace the CSS variables above.

### Responsive behavior

The authored CSS has intentionally meaningful breakpoints:

| Breakpoint | Behavior |
| --- | --- |
| 1180px | Desktop primary navigation/actions switch to the mobile menu. |
| 1023px | 12-column and bento grids move to six columns; hero and tool grids stack; tablet page padding applies. |
| 860px | Diagram legends and identity graph reduce from multi-column layouts. |
| 639px | Single-column grids; mobile tokens, reduced card padding/radii, simplified home hero and tool UI. |
| 520px | Small-screen diagram content stacks. |

Tailwind utilities add their normal breakpoints at 640px, 768px, 1024px, and 1280px. A new Figma breakpoint specification must reconcile both sets rather than changing only a component at a time.

## 3. Routes and shared layouts

### Shared shell

All normal public routes use one shared layout:

- src/layouts/Layout.astro imports the global stylesheet and owns document metadata, canonical URLs, Open Graph/Twitter tags, JSON-LD output, the skip link, Header, breadcrumbs, main landmark, related links, provenance panel, Footer, and command-palette search.
- src/components/SiteShell.astro is a minimal full-height wrapper.
- src/pages/404.astro is intentionally standalone because it needs noindex recovery metadata and its own compact recovery search.

Page authors currently provide title, description, canonical path, optional JSON-LD, dates, language, robots policy, and alternates:

~~~astro
<Layout
  title={title}
  description={description}
  canonical="/tools"
  jsonLd={workbenchJsonLd}
>
  <!-- page-specific content -->
</Layout>
~~~

There is no dedicated ArticleLayout. Article-like routes repeat a well-established composition: hero grid, optional PageHeroVisual, explanatory NoteBox rail, prose-lab column, and a route-specific footer/related resources. A redesign can establish Figma templates for that pattern, but should not assume an existing shared code layout for it.

### Route groups

| Group | Route sources | Public routes |
| --- | --- | --- |
| Core and identity | src/pages/index.astro and top-level identity files | /, /thesis, /about, /identity, /profile, /profile/public-profile, /public-work, /press-kit, /links, /contact, /site-map |
| Trust and public boundaries | top-level pages | /trust, /review, /claims, /no-hype, /for-ai-agents, /de |
| LMD/DED content | src/pages/domains and src/pages/research | /domains/lmd-ded, /evidence, /industrial-proof, /research, /research/core-lmd-ai-sources |
| Frameworks | src/pages/frameworks | /frameworks plus quality-evidence-ladder, repairability-index, ai-readiness-score, failure-atlas, and ai-maturity-model |
| Workbench and resources | top-level pages plus playbooks | /resources, /tools, /decision-map, /agent-pack, /brief-standard, /brief-template, /demo, /playbooks |
| Editorial content | src/pages/lab-notes | /lab-notes plus 14 individual note routes |
| Glossary | src/pages/glossary | /glossary plus directed-energy-deposition, laser-cladding, laser-metal-deposition, and melt-pool-monitoring |
| Utility output | src/pages/rss.xml.ts and public assets | /rss.xml plus robots, sitemap, llms, AI-readable Markdown, schemas, examples, and research JSON files |

The canonical navigation inventory is centralized in src/data/site.ts and src/data/resourceNavigation.ts. These are the sources used by the header, mobile menu, command search, breadcrumbs, related links, and site map. Keep this data-led navigation model; do not duplicate route labels in a new navigation component.

## 4. Existing reusable UI components

### Shell, navigation, and page primitives

| Component | Role |
| --- | --- |
| src/components/Header.astro | Sticky desktop header, primary navigation, resources flyout, search trigger, Exafuse action, and contact action. |
| src/components/MobileMenu.astro | Grouped responsive navigation, external links, and search trigger. |
| src/components/Footer.astro | Product boundary, action cluster, four link columns, public ownership line, and trust route. |
| src/components/CommandPalette.astro | Client-side command search with focus management, keyboard navigation, URL query support, and focus restoration. |
| src/components/Breadcrumbs.astro | Accessible breadcrumb navigation derived from the canonical path and command inventory. |
| src/components/RelatedLinks.astro | Contextual end-of-page navigation from centralized related-link sets. |
| src/components/PageProvenance.astro | Expandable release date, owner, status, boundary, and correction route. |
| src/components/PageContainer.astro | Standard max-width container. |
| src/components/Section.astro | Standard or compact vertical section wrapper, optionally with a full-width band. |
| src/components/SectionHeading.astro | Eyebrow, heading, supporting text, and technical divider mark. |

### Content, cards, calls to action, and visuals

| Component | Role |
| --- | --- |
| BentoGrid.astro and BentoCard.astro | Responsive resource/card grids with optional linked-card CTA. |
| FrameworkCard.astro | Framework-specific card with status, tags, problem, and framework idea. |
| LinkCard.astro and SourceLinks.astro | Source/resource cards, including a deliberate non-clickable state when a source has no verified URL. |
| CTAButton.astro | Primary, secondary, laser/Exafuse, and ghost action variants. |
| Badge.astro and Chip.astro | Compact metadata/status markers. |
| NoteBox.astro | Concise cyan, amber/orange, and steel explanatory callouts. |
| ProfileImage.astro | Responsive WebP/JPEG portrait with supplied sizes, dimensions, loading, decoding, and fetch-priority choices. |
| BrandMark.astro | Inline SVG brand mark with unique gradient IDs. |
| HeroLaserVisual.tsx | Inline SVG LMD visual with a semantic figure/legend. |
| PageHeroVisual.astro, IdentityGraph.astro, ProcessLoop.astro, EvidenceRail.astro, EvidenceLadder.astro | Small code-authored explanatory diagrams; their content is not raster artwork. |

### React islands and browser-local tools

| Component | Role |
| --- | --- |
| LmdDecisionCockpit.tsx | Central LMD Decision Brief intake/output interface. |
| DecisionBriefCard.tsx | Standard brief rendering and compact homepage preview. |
| DecisionBriefExport.tsx | Copy/export/download/print and manual email-draft actions. |
| LmdVsSlmAdvisor.tsx | Early process-route comparison. |
| RepairabilityQuickCheck.tsx and RepairabilityCalculator.tsx | LMD repairability screening. |
| RfqStructureConverter.tsx | Free-text RFQ structure helper. |
| AIReadinessCalculator.tsx | AI readiness assessment. |
| LmdDecisionMap.tsx | Interactive process-route map. |
| SignalNotProofExplainer.tsx | Thesis interaction. |
| ReviewFeedbackComposer.tsx | Browser-local public-review record generation. |
| BriefTemplateActions.tsx and GermanBriefCopy.tsx | Copy/download helpers for standard/template content. |
| CopyBlock.tsx | Reusable copyable text control. |

Their business rules and formatting live in src/lib/decisionBrief.ts, src/lib/lmdRouteScreen.ts, src/lib/repairabilityScreen.ts, src/lib/publicReview.ts, and src/lib/clipboard.ts. The redesign should keep those layers separate from visual components.

## 5. Current typography, color, spacing, radii, and breakpoints

The requested practical source files are:

- Tokens: src/styles/design-tokens.css
- Global and Tailwind entry point: src/styles/global.css
- Containers, grids, section rhythm, and responsive layout: src/styles/layout.css
- Cards, navigation, forms, tool workbench, visual panels, print mode, and responsive component behavior: src/styles/components.css
- Tailwind theme extension: tailwind.config.mjs

The current visual language is premium dark graphite/black-metal rather than neutral documentation UI. The page background, glass panels, ordered edge lines, cyan signal color, amber caution color, mono metadata labels, and large segmented section rhythm are all recurring brand cues. The Figma redesign can refine them, but changing all of them at once would make it difficult to retain visual continuity.

## 6. Icons and image handling

### Icons

- lucide-react is the icon source for React controls, notably the copy, confirmation, download, mail, and print controls in src/components/DecisionBriefExport.tsx.
- Most navigation and content cues use CSS/typographic markers rather than an icon library.
- The brand mark is authored inline in src/components/BrandMark.astro, not loaded as an image.
- Decorative inline SVGs use aria-hidden. Explanatory diagrams use figure/figcaption and visible legends/text instead of hiding operational meaning inside an image.

### Images and visual assets

- Public static assets are under public.
- The social image is public/og-image.png, with SVG source and WebP preview adjacent to it.
- The profile image has a JPEG fallback and several responsive WebP widths under public/images.
- The official logo/mark assets live in public/brand.
- Homepage visual interest is mostly code-authored SVG and CSS, not heavy photo/video assets.

The visual audit enforces useful performance rules:

- No Mermaid, Lottie, Three.js, PixiJS, or similar visual runtime dependency.
- Public PNG/JPEG assets must remain below 600 KB individually.
- Home-page image assets have a 350 KB aggregate budget.
- Every rendered img needs explicit width, height, and documented eager/lazy loading.
- The German overview must not use a baked-text image asset.

## 7. Accessibility, SEO, structured-data, and performance requirements to preserve

### Accessibility

Preserve these implementation behaviors:

- Skip link to the main landmark in Layout.astro.
- Strong visible focus indicator globally through :focus-visible.
- Buttons and controls are generally at least 44px high.
- Header and mobile navigation use native details/summary behavior, update aria-expanded, close outside the menu, and close on Escape.
- CommandPalette.astro is a modal dialog with keyboard navigation, background inertness, focus trap/restoration, result announcement, and Ctrl/Cmd+K support.
- Cockpit controls use fieldset/legend, native checkbox/radio inputs, aria-pressed buttons, labels, screen-reader separators, and a polite live output announcement.
- Copy controls announce successful/failed copy actions without hiding an error.
- Tool layouts must keep controls and results usable without fixed-width overflow.
- Motion must remain optional through prefers-reduced-motion styles.
- Important information cannot depend on hover or on a decorative visual.

The static a11y and mobile audits explicitly inspect the cockpit and export controls. Keep their semantic markers when refactoring markup.

### SEO and structured data

Layout.astro owns the reusable metadata contract:

- canonical URLs under https://manishsharma.dev
- title, description, robots, author, theme color, RSS alternate, favicon
- Open Graph and Twitter large-image metadata
- per-page JSON-LD plus a generated BreadcrumbList
- English/German hreflang alternates where supplied

Structured data is page-specific and should remain page-specific:

- Home supplies WebSite, Person, and ProfilePage data.
- Tools supplies WebApplication data.
- Lab notes use Article.
- Frameworks and technical research use TechArticle.
- Glossary pages use DefinedTerm, FAQPage, and TechArticle where relevant.

Preserve public discovery files and their canonical host references:

- public/robots.txt
- public/llms.txt
- public/llms-full.txt
- public/CNAME
- public/identity.md
- public/trust.md
- public/schemas and public/examples
- public/agent-pack and public/research

The sitemap is produced through the Astro sitemap integration. The design work must not introduce route changes incidentally.

### Content and commercial-boundary requirements

The visual redesign must preserve the distinction between this public technical lab and Exafuse commercial services. In practice:

- Resolve Exafuse actions from src/config/externalLinks.ts, rather than hard-coding an Exafuse URL in components.
- Keep all Decision Brief outputs marked as preliminary decision support, not approval, certification, release, safety-critical acceptance, or quality guarantee.
- Preserve grouped missing information, risk flags, evidence needed, and decision-boundary copy in the cockpit/brief UI.
- Preserve browser-local/manual behavior: no backend, input storage, analytics around entered data, or automatic email sending.
- Keep public claims source-aware and render proof metrics from src/data/publicClaims.ts.

These are product and trust requirements, not optional copy treatments.

### Performance and verification

- Preserve static generation and client:visible hydration for heavyweight interactive React islands.
- Do not move all React islands into the base shell or eagerly hydrate the workbench.
- Keep external stylesheet emission and HTML compression.
- Preserve no-script fallbacks on the home cockpit and tools route.
- Retain print styles for Decision Brief output.
- Run at least npm run check, npm run build, and npm run audit:all for the visual implementation.
- Review the visual QA matrix at 360px, 768px, 1024px, and 1440px, especially home, tools, trust, sources, frameworks, agent guidance, LMD/DED hub, German overview, 404, and review.

## 8. Exact implementation files for high-value surfaces

| Surface | Primary file(s) | Supporting files |
| --- | --- | --- |
| Global navigation | src/components/Header.astro | src/components/MobileMenu.astro, src/data/site.ts, src/data/resourceNavigation.ts, src/styles/components.css |
| Global footer | src/components/Footer.astro | src/data/site.ts, src/styles/components.css |
| Site shell / metadata | src/layouts/Layout.astro | src/components/SiteShell.astro, Breadcrumbs.astro, RelatedLinks.astro, PageProvenance.astro, CommandPalette.astro |
| Homepage | src/pages/index.astro | src/components/LmdDecisionCockpit.tsx, DecisionBriefCard.tsx, HeroLaserVisual.tsx, BentoCard.astro, SectionHeading.astro |
| Article/content pattern | individual route files in src/pages/lab-notes and src/pages/glossary | Layout.astro, PageHeroVisual.astro, NoteBox.astro, LabNoteFooter.astro, SourceLinks.astro, global prose-lab styles |
| Framework content pattern | individual route files in src/pages/frameworks | FrameworkCard.astro, EvidenceLadder.astro, EvidenceRail.astro, ProcessLoop.astro, PageHeroVisual.astro |
| Interactive Decision Cockpit | src/components/LmdDecisionCockpit.tsx | DecisionBriefCard.tsx, DecisionBriefExport.tsx, src/lib/decisionBrief.ts, src/lib/clipboard.ts, src/pages/tools.astro |
| Cockpit visual/workbench styling | src/styles/components.css | src/styles/design-tokens.css, src/styles/layout.css |
| Exafuse link safety | src/config/externalLinks.ts | src/data/site.ts and every consuming CTA |

### Cockpit integration example

The cockpit is deliberately a React island, loaded when it becomes visible:

~~~astro
<LmdDecisionCockpit
  client:visible
  defaultMode="example"
  exafuseUrl={exafuseRfqLink.href}
  exafuseLabel={exafuseRfqLink.label}
/>
~~~

It appears in a compact form on the home page and in a full workbench form at /tools. Those two variants share one component and must stay behaviorally synchronized.

## 9. Components to reuse rather than rebuild

### Reuse directly

- Layout.astro, Header.astro, MobileMenu.astro, Footer.astro, CommandPalette.astro, Breadcrumbs.astro, RelatedLinks.astro, and PageProvenance.astro: these carry essential information architecture, search, accessibility, SEO shell, and trust context.
- BrandMark.astro: reuse the exact mark or carefully reproduce its SVG semantics. It is the most recognizable compact brand asset.
- PageContainer.astro, Section.astro, SectionHeading.astro, CTAButton.astro, Chip.astro, Badge.astro, BentoGrid.astro, BentoCard.astro, LinkCard.astro, FrameworkCard.astro, and NoteBox.astro: redesign their visual skin and variants rather than creating parallel versions.
- ProfileImage.astro: retains responsive-image and layout-stability safeguards.
- PageHeroVisual.astro, HeroLaserVisual.tsx, ProcessLoop.astro, EvidenceLadder.astro, EvidenceRail.astro, and IdentityGraph.astro: retain as the current code-native visual system, with Figma equivalents used to guide polish rather than as large image replacements.

### Preserve function and data contract; redesign presentation carefully

- LmdDecisionCockpit.tsx
- DecisionBriefCard.tsx
- DecisionBriefExport.tsx
- BriefTemplateActions.tsx
- GermanBriefCopy.tsx
- LmdVsSlmAdvisor.tsx
- RepairabilityQuickCheck.tsx and RepairabilityCalculator.tsx
- RfqStructureConverter.tsx
- AIReadinessCalculator.tsx
- LmdDecisionMap.tsx
- SignalNotProofExplainer.tsx
- ReviewFeedbackComposer.tsx

These components can receive a Figma-driven structural and visual update, but their browser-local state, labels, output groupings, export actions, safety boundaries, hash presets, and accessible control patterns should not be reinvented.

## 10. Recommended visual redesign implementation order

1. Establish the Figma foundation.
   Map existing CSS variables into Figma color, type, spacing, radius, elevation, and motion tokens. Include desktop, tablet, and mobile constraints. Treat cyan technical action and amber warning/Exafuse action as semantic roles, not merely colors.

2. Define reusable Figma templates before page redesign.
   Create shell, header, mobile menu, footer, command palette, section heading, cards, buttons, badges/chips, source cards, note boxes, visual-frame, and form/input states. Map them to existing component names.

3. Implement the global token and primitive layer first.
   Update design-tokens.css, Tailwind extension if necessary, and shared component styles before editing page-level markup. This keeps a wide redesign coherent and limits duplicated local CSS.

4. Implement shell navigation and footer next.
   Validate desktop, 1180px transition, and mobile menu. Preserve the resource grouping, search dialog behavior, Exafuse action, breadcrumb rail, and page provenance.

5. Redesign the home page around its existing product sequence.
   Keep the cockpit-first hierarchy: primary cockpit action, worked example, Exafuse handoff, task paths, flagship assets, public proof context, and lab notes. Do not let a decorative Figma hero push the cockpit below the initial decision path.

6. Create code templates for content families.
   Apply the same Figma system to framework indexes/details, lab-note details/index, glossary details/index, resource hubs, identity pages, and source pages. Avoid a one-off redesign per route.

7. Redesign the tools/workbench after primitives are stable.
   Treat the Decision Cockpit as a desktop/touch application, not a decorative card. Design compact homepage preview, full desktop split pane, progressively disclosed controls, sticky workbench navigation, focus/pressed/selected/error states, output states, export controls, and print output.

8. Refine code-authored visual assets.
   Align HeroLaserVisual, PageHeroVisual, evidence diagrams, and process loops to Figma measurements. Preserve their semantic labels and low-weight implementation.

9. Verify preservation gates continuously.
   Run check/build/audits; review reduced-motion, keyboard search, control announcements, hash presets, no-script fallback, print/PDF output, image dimensions/loading, canonical metadata, JSON-LD, sitemap, German alternates, and public boundary language.

10. Perform route-wide visual QA and release.
    Compare the agreed viewport matrix and the visual QA checklist before committing any redesign. Keep docs/design-system.md and docs/visual-qa.md synchronized if the approved token or QA contract changes.

## Redesign constraints summary

- Do not change runtime behavior, claims, route ownership, or external-link policy merely to match a Figma mockup.
- Do not add a backend, analytics, cookies, automatic email sending, input storage, or dependency installation as visual work.
- Keep the homepage cockpit-first.
- Keep the Decision Brief central and preserve its three portable output modes.
- Keep the public LMD/DED and Exafuse commercial boundary legible in every new visual hierarchy.
- Prefer existing components and shared tokens to duplicate variants or page-specific design forks.
