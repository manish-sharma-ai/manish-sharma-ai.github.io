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

## 2026-07-19 local delivery check

This is a source and browser-smoke check, not a replacement for a fresh Lighthouse or field-Core-Web-Vitals run.

- The homepage hero now prefers responsive local WebP assets and retains the existing JPEGs as fallbacks.
- Desktop WebP: `1586 × 992`, 125,508 bytes (29% smaller than the 176,776-byte JPEG fallback).
- Mobile WebP: `1024 × 640`, 60,314 bytes (25% smaller than the 80,603-byte JPEG fallback).
- Chromium selected the desktop WebP at 1440px and the mobile WebP at 320px.
- Local browser smoke checks found no failed first-party requests, console errors, hydration warnings, or horizontal overflow on the representative routes.
- The browser harness did not expose usable navigation timing or transfer-size entries, so no current FCP, LCP, CLS, INP, or Lighthouse score is claimed here.

Before publishing new performance claims, run the representative-route Lighthouse matrix and review Search Console field data for `/`, `/about`, `/public-work`, `/tools`, and one Lab Note.
