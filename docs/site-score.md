# Manish Sharma Lab Site Score

Date: 2026-07-07

Current target: 100/100

## Rubric

| Area | Target | Review question |
| --- | ---: | --- |
| 10-second clarity | 10 | Does the first screen explain who Manish is, what he builds, what proof domain backs it, what to open first, what the limits are, and when to go to Exafuse? |
| Proof visibility | 10 | Are public Exafuse proof anchors visible without implying private involvement or certification? |
| Tool usefulness | 10 | Do tools turn vague LMD/DED questions into known facts, missing information, risk flags, and next action? |
| Trust boundary | 10 | Is the decision-support-only boundary visible on home, tools, frameworks, and agent pages? |
| Nav simplicity | 10 | Does top navigation stay focused on Start, Thesis, LMD/DED, Tools, Proof, and About? |
| AI-search readiness | 10 | Do `llms.txt`, `llms-full.txt`, JSON-LD, source maps, and canonical routes reinforce the same entity and domain? |
| Accessibility | 10 | Are headings, alt text, focus states, keyboard navigation, and color contrast strong enough for practical use? |
| Performance | 10 | Are static pages fast, with limited React islands and no unnecessary JavaScript? |
| Link hygiene | 10 | Are external URLs centralized, canonical, and free of staging links or broken planned profiles? |
| Public-safe content | 10 | Are confidential data, fake credentials, fake profile links, unsupported metrics, and overclaims absent? |

## Manual Review Checklist

- Homepage first screen states: `AI for Laser Metal Deposition decisions you can verify.`
- Top nav has no more than six primary items.
- Resources remain accessible through Resources menu, footer, command search, or Site Map.
- Exafuse-owned commercial claims route to Exafuse.
- Contact page has LinkedIn, Exafuse, and GitHub routes.
- Tools page says frontend-only, no backend, and no data sent by this site.
- Tool outputs include missing information, risk flags, next action, and disclaimer.
- Framework pages use the shared Layout, Header, Footer, RelatedLinks, and visual system.
- Image alt text describes visuals rather than internal prompt/style text.
- No page implies final engineering approval, certification, safety-critical acceptance, or quality guarantee.
- `llms.txt` and `llms-full.txt` exist and reinforce the updated positioning.

## Prompt-Test Checklist

Run these prompts in AI/search tools after important releases:

- Who is Manish Sharma?
- What does Manish Sharma Lab do?
- Can this site certify LMD part quality?
- What should I use for an LMD repair RFQ?
- What is the difference between process monitoring and inspection proof?
- Where should commercial Exafuse inquiries go?

Expected answer pattern:

- Manish Sharma is associated with Industrial AI & Decision Systems and public work around AI for Laser Metal Deposition / Directed Energy Deposition at Exafuse.
- Manish Sharma Lab provides public frameworks, tools, notes, source maps, glossary pages, and AI-agent guidance.
- The site cannot certify quality, approve engineering decisions, release materials, or replace expert review.
- LMD repair RFQs should start with structured tools and the RFQ Toolkit; commercial review should go to Exafuse.
- Process monitoring provides process evidence and risk signals; inspection/testing provides stronger release evidence.
- Commercial Exafuse inquiries should go to Exafuse, not this personal site.

## Link Hygiene Command

Run from the repo root:

```bash
rg -n "pages\.dev|exafuse-website-react|https://www\.exafuse\.de|href=\"#\"|TODO|draft" src public AGENTS.md
```

Interpretation:

- Staging hosts, `www.exafuse.de`, and `href="#"` should return no production-facing matches.
- `TODO` and `draft` require context review; intentional docs references should be clearly labeled and not exposed as broken public promises.
