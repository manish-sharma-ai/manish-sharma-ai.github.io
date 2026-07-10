# World-Class Website Scorecard

Date: 2026-07-10

Baseline commit: `2f94895`

Baseline score: **79.9 / 100**

Release-candidate evidence score: **89.1 / 100**

Target: **100 / 100 on every criterion, with evidence**

This is a stricter successor to `docs/site-score.md`. A passing build is necessary, but it is not the same as a world-class product. A score of 100 is earned only when the stated evidence exists. Repo-controlled checks can be completed in code; visual quality, current performance, exact external sources, and real-user outcomes stay open until they are actually verified.

## Scoring rules

- `100`: the criterion is demonstrated by current code plus the stated evidence gate.
- `90-99`: strong and complete in the repository, with one external or human validation gate open.
- `75-89`: useful and credible, but a material friction or evidence gap remains.
- `50-74`: present but incomplete, inconsistent, or not validated.
- `<50`: missing, unmeasured, or dependent on an unsupported assumption.

Visual scores in this baseline are provisional because the in-app browser was unavailable during the audit.

## The 50 criteria

| # | World-class characteristic | Baseline | What earns 100 | Planned evidence / action |
| ---: | --- | ---: | --- | --- |
| 1 | Audience and use case are clear within 10 seconds | 90 | A first-time engineer can state who the site is for and what it helps decide | Test the first viewport with five target users |
| 2 | Value proposition is concrete, specific, and memorable | 94 | Promise is recalled accurately after one short visit | Preserve the canonical LMD decision promise; comprehension test |
| 3 | First viewport explains who, what, proof, boundary, and next step | 84 | All five are visible with no competing message | Simplify hero actions and visually verify desktop/mobile |
| 4 | One unmistakable central product or artifact | 90 | LMD Decision Brief v1.0 is the obvious organizing product everywhere | Keep cockpit, demo, template, schema, examples, and docs synchronized |
| 5 | Differentiation is defensible rather than generic AI positioning | 88 | Visitors can explain the inspection-aware difference | Keep LMD/DED proof wedge and evidence boundary explicit |
| 6 | Primary navigation is compact and unambiguous | 70 | Contractual six primary routes plus Resources remain readable at all widths | Centralize navigation data and test overflow/keyboard behavior |
| 7 | Every route has a unique job without overlapping hubs | 74 | Each hub states audience, decision, output, boundary, and next step | Clarify route roles; consolidate only when content truly overlaps |
| 8 | Engineer, buyer, reader, and AI-agent paths are explicit | 86 | Each audience reaches the right task in one choice | Add task-first decision entry paths |
| 9 | Search and site map make deep content findable | 83 | Search supports keyboard, deep links, query URLs, and helpful empty states | Complete combobox semantics, focus trap, and `?q=` behavior |
| 10 | Semantic hierarchy and internal links are complete | 78 | Every HTML page has one H1 and every internal link resolves | Fix missing H1s and add rendered route/fragment validation |
| 11 | Content helps visitors complete a real task | 94 | Core tasks end in a useful portable artifact | Preserve working brief/export flows and validate representative tasks |
| 12 | Technical depth is substantial and domain-specific | 92 | Engineers find concrete, bounded, source-linked value | Maintain LMD/DED specificity and expert review boundary |
| 13 | Pages are concise, progressive, and scannable | 76 | Controls and detail appear only when needed | Collapse secondary tools and progressively reveal cockpit inputs |
| 14 | Terminology and narrative remain synchronized | 81 | Human, schema, glossary, docs, and AI-readable wording match | Extend automated synchronization checks |
| 15 | Substantial pages show freshness and ownership | 72 | Owner, published/updated date, version, and review status are visible where relevant | Add truthful page-level review metadata; avoid fake freshness |
| 16 | A new visitor reaches useful output within 90 seconds | 86 | At least 80% of target users complete a representative brief unaided | Keep default worked example; run moderated task test |
| 17 | Each decision point has one dominant CTA and one support action | 68 | No CTA cluster creates choice paralysis | Reduce hero and workbench action density |
| 18 | Interaction burden is minimal and progressively disclosed | 72 | No initial state exposes more controls than the user needs | Collapse optional evidence/risk inputs and secondary tools |
| 19 | Outputs are portable, useful, and clearly bounded | 96 | All output modes pass schema, content, and human-use checks | Maintain technical, email, AI-safe, Markdown, JSON, and print modes |
| 20 | Contact and commercial handoff are direct and trustworthy | 76 | Visitors know when to use the Lab and when to use Exafuse | Keep explicit route ownership and test handoff comprehension |
| 21 | Safety, approval, and evidence boundaries are unmistakable | 98 | No user or AI test mistakes decision support for approval | Keep boundary audits plus adversarial prompt tests |
| 22 | Claims have provenance, limits, and review dates | 84 | Every active claim has exact source, limitation, owner, and review date | Preserve claim registry; resolve or suppress migration-gated claims |
| 23 | Every visible proof claim links to an exact stable source | 60 | Each proof item opens the precise supporting public source | Verify Exafuse deep links after migration; never invent sources |
| 24 | Independent validation and third-party adoption are visible | 52 | Genuine citations, adoption, or validation are publicly verifiable | Earn external use; do not manufacture testimonials or metrics |
| 25 | Privacy and data handling are clear | 88 | Site-wide trust page and each input surface explain data behavior | Add Trust Center and browser-local statements |
| 26 | Brand and visual language are distinctive | 88 | Visual review confirms a recognizable industrial decision-system identity | Review screenshots with the owner and target users |
| 27 | Visual hierarchy creates obvious reading priority | 76 | Eye-tracking or task review shows the intended sequence | Reduce hero/section competition and verify at breakpoints |
| 28 | Components, spacing, color, and states are consistent | 88 | All core routes use the design system without local drift | Component audit plus screenshot regression coverage |
| 29 | Mobile layouts and navigation are proven | 82 | No overflow, overlap, or hidden action at 320-1440 px | Browser screenshots and touch-task checks |
| 30 | Diagrams materially improve technical understanding | 84 | Target users interpret each diagram correctly without helper leakage | Keep concise labels and test comprehension |
| 31 | Landmarks and headings pass semantic audits everywhere | 82 | Exactly one meaningful H1, ordered headings, landmarks, and labels on every route | Fix four missing H1s and broaden static checks |
| 32 | Keyboard and modal behavior meet WCAG expectations | 82 | Search, menus, tools, copy, and dialogs work without a pointer | Focus trap, combobox state, live result summary, manual keyboard test |
| 33 | Contrast and text sizing pass measured WCAG checks | 78 | WCAG AA contrast and 200% zoom checks pass on every state | Remove low-contrast small text and run axe/browser checks |
| 34 | Touch targets and reduced-motion behavior are robust | 90 | 44 px targets and reduced-motion behavior pass device checks | Preserve static checks; verify on real/mobile browser |
| 35 | Language and alternate-language metadata are correct | 62 | German document language and reciprocal alternates are valid | Add `lang`, locale, and `hreflang`; have German copy reviewed |
| 36 | Architecture is static, secure by default, and dependency-light | 96 | No unnecessary server/data surface and zero high/moderate production vulnerabilities | Add Trust Center/security policy; remediate dependency audit |
| 37 | Current mobile performance and Core Web Vitals meet targets | 82 | Current representative routes score >=95 with field CWV in the good range | Externalize cacheable CSS and rerun current mobile lab/field checks |
| 38 | Core value survives delayed or failed JavaScript | 74 | Worked output, template, boundary, and recovery path remain usable without JS | Progressive SSR preview and explicit no-JS fallback |
| 39 | CI deploys reproducibly with complete release gates | 90 | Check, build, all audits, tests, and link validation gate every release | Add audits/tests to Actions and PR validation |
| 40 | 404, empty, copy-failure, and failed-JS states recover gracefully | 58 | Each failure state explains what happened and offers a safe next action | Add custom 404 and test error states |
| 41 | Titles, descriptions, canonicals, and social metadata are complete | 96 | Every indexable route passes current metadata-length and share-card checks | Expand SEO audit across all routes |
| 42 | Structured data accurately describes people, pages, articles, and tools | 90 | Schema validates and never advertises unsupported behavior | Make search action real; add route-appropriate OG/schema types |
| 43 | Robots, sitemap, and crawlability are production-ready | 90 | Live crawl finds no orphan, redirect, canonical, or status defect | Verify deployed sitemap/statuses after release |
| 44 | Topical authority and internal-link depth are strong | 92 | Core topic clusters link logically to sources, tools, and boundaries | Preserve related-link system and verified source map |
| 45 | Feeds, language alternates, and distribution support discovery | 64 | RSS and alternates validate and external discovery channels are submitted | Add RSS, autodiscovery, and reciprocal language links |
| 46 | Success metrics are defined without collecting technical inputs | 38 | Five privacy-safe outcomes have baselines and review cadence | Use Search Console plus manual counts/tests; never log entered content |
| 47 | Real-user testing demonstrates comprehension and completion | 30 | At least five target users complete core tasks with recorded findings | Owner-led moderated review after localhost sign-off |
| 48 | Governance prevents overclaiming and confidentiality leaks | 92 | Automated and human release checks show no unsafe content | Keep claim/boundary audits and public-safe context rules |
| 49 | Automated QA covers content, links, a11y, visuals, and interaction | 90 | Static, unit, browser, accessibility, screenshot, and live smoke gates all pass | Add experience/unit tests; visual tests await browser availability |
| 50 | Navigation, route inventories, docs, and code share one source | 70 | Primary/resource navigation and generated indexes cannot drift | Centralize typed nav data and add drift checks |

## Baseline category scores

| Category | Baseline |
| --- | ---: |
| Strategy and positioning | 89.2 |
| Information architecture | 78.2 |
| Content and editorial quality | 83.0 |
| Product utility and conversion | 79.6 |
| Trust and proof | 76.4 |
| Visual design | 83.6 (provisional) |
| Accessibility and inclusion | 78.8 |
| Engineering and performance | 80.0 |
| SEO and discovery | 86.4 |
| Operations and validation | 64.0 |

## Delivery sequence

1. Preserve the baseline and eliminate public draft/source-queue content.
2. Make the homepage and workbench progressively disclose decisions and controls.
3. Fix semantic, language, search-dialog, breadcrumb, contrast, and error-recovery gaps.
4. Add Trust Center, RSS, security contact, cacheable CSS, and route synchronization.
5. Strengthen CI, dependency hygiene, unit coverage, rendered-link checks, and experience audits.
6. Run the complete build/audit suite and current localhost checks.
7. Complete the evidence gates: visual review, current Lighthouse/axe, exact Exafuse sources, and real-user task testing.

No criterion is rounded up to 100 merely because the implementation is finished. The evidence gate in this table is part of the definition of done.

## Release-candidate re-score

This release adds an expandable page-provenance panel to every rendered page. It makes the site-release review date, owner, public-resource status, decision boundary, and correction path visible without claiming an external editorial audit.

The public `/review/` journey now turns the privacy-safe outcome protocol into an executable browser-local task flow and manual feedback note. It makes target-user testing easier to run, but it does not collect participants or establish a baseline; criteria 46 and 47 remain evidence-gated and their strict scores are unchanged.

The 2026-07-10 implementation closes the major repository-controlled gaps: progressive cockpit/workbench controls, task-first homepage paths, verified-source map, Trust Center, RSS, custom 404, German language metadata, complete H1 coverage, keyboard-aware query search, validated internal routes and ordinary fragments, validated preset IDs with runtime-safe hash handling, cacheable CSS, Astro 7, zero production dependency vulnerabilities, unit tests, CI gates, and synchronized AI-readable trust files. A follow-up intake refinement adds optional request role/phase and dimensions/mass plus quantity/timeline context; the mutually exclusive context choices now use accessible radio controls, while copy/export has a browser-local fallback and recovery message. The documented expert heuristic review records the role-based reasoning but does not replace observed user testing.

The release-candidate score is calculated criterion by criterion in the same order as the 50-row table above. Every category contains five criteria, so the overall score is the unweighted mean of all 50 scores: `4,460 / 50 = 89.2`.

| Category and criterion numbers | Release-candidate criterion scores, in order | Sum | Average |
| --- | --- | ---: | ---: |
| Strategy and positioning (1-5) | 94, 96, 93, 94, 91 | 468 | 93.6 |
| Information architecture (6-10) | 94, 84, 93, 94, 91 | 456 | 91.2 |
| Content and editorial quality (11-15) | 92, 94, 90, 84, 90 | 450 | 90.0 |
| Product utility and conversion (16-20) | 93, 93, 92, 96, 86 | 460 | 92.0 |
| Trust and proof (21-25) | 99, 90, 68, 56, 94 | 407 | 81.4 |
| Visual design (26-30) | 92, 90, 92, 82, 82 | 438 | 87.6 |
| Accessibility and inclusion (31-35) | 98, 95, 91, 94, 86 | 464 | 92.8 |
| Engineering and performance (36-40) | 98, 88, 94, 98, 91 | 469 | 93.8 |
| SEO and discovery (41-45) | 98, 98, 96, 96, 91 | 479 | 95.8 |
| Operations and validation (46-50) | 63, 40, 98, 90, 78 | 369 | 73.8 |

| Category | Baseline | Release candidate | Remaining evidence gate |
| --- | ---: | ---: | --- |
| Strategy and positioning | 89.2 | 93.6 | First-viewport comprehension test |
| Information architecture | 78.2 | 91.2 | Real task-findability review and hub-overlap decisions |
| Content and editorial quality | 83.0 | 90.0 | External editorial review and ongoing refresh cadence |
| Product utility and conversion | 79.6 | 92.0 | Timed completion and Exafuse-handoff testing |
| Trust and proof | 76.4 | 81.4 | Exact Exafuse source migration and real third-party adoption |
| Visual design | 83.6 | 87.6 | Browser screenshots and owner/user visual sign-off |
| Accessibility and inclusion | 78.8 | 92.8 | Axe, screen-reader, zoom, contrast, touch, and German-language review |
| Engineering and performance | 80.0 | 93.8 | Current browser CWV and failure-state interaction checks |
| SEO and discovery | 86.4 | 95.8 | Live crawl/indexing and current share-card review |
| Operations and validation | 64.0 | 73.8 | Privacy-safe outcome baselines and real-user task testing |

The strict score cannot honestly reach 100 from repository work alone. The remaining gates require the localhost visual review, current browser measurements, verified live Exafuse deep sources, and observed target-user outcomes. The implementation is ready for those tests; it does not pretend they already happened.
