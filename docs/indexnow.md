# IndexNow deployment notifications

This site can notify participating search engines after a successful production GitHub Pages deployment. IndexNow is a notification protocol: a successful `200` or `202` response confirms that the endpoint received the URL list; it does not guarantee crawling, ranking, or indexing.

## Configuration and public verification

Configure the repository Actions secret named `INDEXNOW_KEY`. The secret is never committed, printed, placed in the submission-plan artifact, or written to the public state document.

When the secret is configured, the production build creates the protocol-required verification text file in the Pages artifact only. The file is public by protocol and contains exactly the key. It is not added to the sitemap, repository, diagnostics artifact, or job summary.

If `INDEXNOW_KEY` is absent, the website build and deployment continue normally. The workflow reports that IndexNow is disabled, creates neither the verification file nor the public state file, and makes no notification. Adding the secret later makes the next enabled production deployment the genuine first run.

Create or rotate a key as a 64-character lowercase hexadecimal value. Add it in GitHub: repository **Settings → Secrets and variables → Actions → New repository secret**, named `INDEXNOW_KEY`. Do not place a key in a repository file or chat message. To rotate, replace that secret and deploy again; the key-fingerprint change safely triggers the initial priority set once.

## Planning and state

After a production build, `npm run indexnow:plan` derives indexable canonical pages from generated HTML, verifies them against the sitemap, and writes:

- `dist/indexnow-state.json`: public, versioned semantic fingerprints and a one-way key fingerprint;
- `.indexnow/indexnow-plan.json`: a short-lived, non-secret diagnostic artifact containing canonical URLs and their change types.

Before planning, the workflow retrieves the previous public state document. A valid `200` response enables a normal comparison. A `404` is a genuine first run. Timeouts, DNS failures, `429`, `5xx`, invalid JSON, and unsupported state documents cause a safe notification skip rather than a broad resubmission.

The semantic fingerprint includes search-facing page metadata, hreflang, JSON-LD, language, headings, visible main-content text, meaningful main-content links, and main-content image identity. It deliberately excludes scripts, styles, hashed bundles, preloads, navigation, footer chrome, comments, whitespace, and build metadata. Consequently CSS-only, bundle-only, navigation-only, and footer-only releases plan zero URLs.

## Notification behavior

The first enabled deployment sends exactly these ten canonical pages:

- homepage;
- About;
- Identity;
- Thesis;
- Public Work;
- LMD/DED;
- Lab Notes;
- “A Prediction Is Not Yet an Industrial Decision”;
- Contact;
- German entry page.

Later deployments send only added pages, pages whose semantic fingerprint changed, and previously canonical pages that were removed. Deleted URLs are notified as their former canonical URL and may legitimately be live `301`, `404`, or `410` after deployment. A defensive 100-URL limit blocks a suspiciously large plan without undoing the completed Pages deployment.

The post-deployment job runs only after both the existing build and Pages deployment jobs succeed on the default branch. It verifies the public verification file without logging its URL or contents, waits for changed pages to serve their new canonical semantic content, then sends one bulk request to the global IndexNow endpoint. The job logs only mode, count, canonical URLs, change types, safe HTTP status, and elapsed result category.

Response handling is intentionally bounded: `200` and `202` are accepted; `400`, `403`, and `422` fail safely; `429`, network failures, and `5xx` responses retry with bounded backoff. Check **Bing Webmaster Tools → IndexNow** for received-notification evidence. A successful endpoint response is not proof of indexing.

## Local checks and troubleshooting

Run the deterministic checks without a secret or network access:

```bash
npm run test:indexnow
npm run build
npm run audit:indexnow
```

Do not run `indexnow:plan` locally with a real production secret unless you intentionally need a local dry run; it writes only ignored `.indexnow/` diagnostics and a generated verification file under `dist/`.

For `403` or `422`, verify the Actions secret is correctly configured and deploy again so the public verification file and public state use the current key. For `429`, the workflow already respects a bounded `Retry-After`/backoff policy; wait for a later deployment rather than submitting the same URLs manually. For a skipped notification, inspect the job’s sanitized previous-state warning and wait for a later successful production deployment.

Submissions deliberately exclude redirect aliases, preview and old domains, files, assets, feeds, sitemap files, state files, verification files, query variants, `noindex` pages, and non-production URLs.
