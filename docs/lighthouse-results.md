# Lighthouse Results

> Historical lab result, not current release evidence. These scores were recorded on 2026-05-10 before the current 56-page product, trust, accessibility, and Astro 7 release. Re-run the representative-route matrix after localhost visual approval and before claiming current Lighthouse scores.

Run date: 2026-05-10

Targets: local production preview of the homepage and press kit page.

Command:

```bash
npx --yes lighthouse@latest http://127.0.0.1:4321/ --output=json --output-path=/tmp/manish-lighthouse-home-final.json --chrome-flags="--headless=new --no-sandbox" --quiet
npx --yes lighthouse@latest http://127.0.0.1:4321/press-kit --output=json --output-path=/tmp/manish-lighthouse-press-kit-final.json --chrome-flags="--headless=new --no-sandbox" --quiet
```

## Final Homepage Scores

| Category | Score |
| --- | ---: |
| Performance | 100 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |
| Agentic Browsing | 100 |

## Key Metrics

| Metric | Result |
| --- | ---: |
| First Contentful Paint | 0.8 s |
| Largest Contentful Paint | 0.9 s |
| Speed Index | 0.8 s |
| Total Blocking Time | 0 ms |
| Cumulative Layout Shift | 0 |

## Final Press Kit Scores

| Category | Score |
| --- | ---: |
| Performance | 100 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |
| Agentic Browsing | 100 |

## Press Kit Key Metrics

| Metric | Result |
| --- | ---: |
| First Contentful Paint | 0.8 s |
| Largest Contentful Paint | 1.2 s |
| Speed Index | 0.8 s |
| Total Blocking Time | 0 ms |
| Cumulative Layout Shift | 0 |

## Tuning Completed

- Replaced the global React command palette with a lightweight Astro/vanilla JavaScript component.
- Updated `llms.txt` to use Markdown links so Lighthouse's Agentic Browsing audit recognizes the file.
- Kept React islands scoped to interactive tools and copy blocks instead of loading React for the homepage search overlay.
- Added a WebP preview version of the Open Graph image for the press kit page while keeping the PNG as the canonical social image.
