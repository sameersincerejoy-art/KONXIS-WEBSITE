# Konxis Engineering — Website Audit Round 2

**Date:** 12 November 2026
**Scope:** 9 deployed pages (`index`, `capabilities`, `industries`, `case-studies`, `insights`, `about`, `contact`, `privacy`, `terms`), `styles.css`, `main.js`, `index.js`, `deploy.json`, published PDFs, case-study assets and `sitemap.xml`.
**Baseline reviewed:** `report.md` (round 1, described as “all errors FIXED”).
**Method:** Static HTML/CSS/JS analysis, link and anchor checks, metadata and heading inventory, WCAG contrast calculation, content review, PDF inspection, local HTTP delivery checks and worker redirect tests. No deployed HTTPS test, real-device test or screen-reader test was performed.

---

## 1. Executive summary

The round-1 audit correctly fixed the broken links, missing pages, duplicate markup and header CTA gaps it identified. Re-testing confirms those fixes still hold: no broken internal links or anchors, one `h1` per page, no duplicate IDs, balanced markup and a working local build.

It missed several issues that matter more than the ones it fixed:

1. **The core 12-column layout has no mobile behaviour.** Seven pages use a 12-column grid with 48 px gaps and inline column spans. On a 360 px phone the grid alone requires at least 528 px of gap space, so content overflows horizontally and/or is squeezed into unreadable columns.
2. **The published alternator PDF is marked “STUDY / NON-PUBLICATION” on its cover.** This directly conflicts with the public download and needs owner resolution before launch.
3. **The contact form promises an acknowledgement email that the site never sends.** The form only opens the visitor’s mail client; there is no server submission, acknowledgement or delivery confirmation.
4. **The practice has no named person, no real portrait and no verifiable profile link.** For a founder-led engineering consultancy this is a credibility problem, not a polish issue.

The site’s evidence language is substantially improved and the FSI study is correctly absent from the deployed files. The new case-study content itself is accurate and appropriately qualified.

### Severity counts

| Severity | Count |
|---|---:|
| Critical | 3 |
| High | 9 |
| Medium | 14 |
| Low / advisory | 9 |

### Judgement-based scorecard

| Area | Score | Main reason |
|---|---:|---|
| Markup and link integrity | 88 | Clean structure, links and anchors |
| Content and evidence accuracy | 80 | Strong qualification; a few stale/incorrect claims |
| Visual design | 68 | Strong editorial system, undermined by broken mobile grid |
| UX and usability | 62 | Contact promise, mobile nav, anchor behaviour |
| Accessibility (WCAG 2.2 AA) | 58 | Grid, skip link, focus and PDF gaps |
| SEO and discoverability | 55 | Soft 404s, metadata length, no canonical/robots |
| Performance | 78 | Light assets; third-party fonts and no cache policy |
| Trust and compliance | 48 | Anonymous founder, placeholder portrait, non-publication PDF |
| Maintainability / operations | 58 | Duplicated deploy tree, dead CSS, stale internal report |

**Overall: approximately 63/100.** The visual and content direction is credible; the site is not yet launch-ready on mobile, compliance and trust.

---

## 2. Critical findings

### C1 — The 12-column grid is unusable on phones and likely overflows tablets

**Evidence:** `styles.css:92–96`:

```css
.grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: var(--s5); }
```

There is **no media query anywhere that changes `.grid`**. The 48 px gap is applied at every width. Eleven column gaps alone require `11 × 48 = 528 px`. The `.wrap` content width at a 360 px viewport is `360 − 48 = 312 px`, so the grid is at least 528 px wide before any text is considered.

Inline spans make it worse and prevent a normal CSS override:

- `about.html`: `6, 6`
- `capabilities.html`: `6, 6, 6, 6`
- `contact.html`: `8, 4`
- `index.html`: `5, 7, 6, 6`
- `industries.html`: sixteen `5/7` and `6/6` spans
- `insights.html`: `3, 9` repeated three times

**Impact:** horizontal scrolling, clipped content, and contact/form columns compressed to unusable widths on phone and tablet. This affects the primary conversion page. A fixed 8/4 split on `contact.html` also makes the form and its aside unreadable on mobile.

**Fix:** remove inline `grid-column` declarations in favour of utility classes (`.span-3` … `.span-9`), then add:

```css
@media (max-width: 900px) {
  .grid { grid-template-columns: 1fr; gap: var(--s4); }
  .grid > * { grid-column: 1 / -1; }
}
```

Test at 320, 360, 390, 768 and 1024 px. This is the single highest-value fix on the site.

### C2 — The alternator PDF is publicly downloadable while marked “NON-PUBLICATION”

**Evidence:** page 1 of `public/downloads/Konxis-Engineering-Alternator-Bracket-Fatigue-Study.pdf` contains:

> `STUDY / NON-PUBLICATION — NO NEW CAD OR FEA — SOURCES DISCLOSED AT END`

The card and the homepage both offer a direct download. The brief described this study as “eligible for website consideration subject to final owner approval”, but no written approval is recorded in the repository.

**Impact:** potential breach of the document’s own distribution marking. This is a reputational and contractual risk, not a design issue.

**Fix:** obtain written publication approval or withhold this PDF and card until a distribution-approved version exists. If “non-publication” means “not a peer-reviewed paper”, replace that cover line with explicit wording such as “Technical study — not a peer-reviewed publication” and record the approval. Do not rely on an inferred interpretation.

### C3 — The contact form promises an acknowledgement email that does not exist

**Evidence:** `contact.html:158`:

> “Drawings, plots or photographs can be attached when you reply to the acknowledgement email.”

`main.js` only builds a `mailto:` URL and sets the status to “Opening your email client with the enquiry prepared…”. It does not submit to a server, send an acknowledgement or confirm delivery.

**Impact:** the visitor is told to expect a reply that will never arrive unless their mail client actually sends the message. Attachments cannot be added through the form, and the submit can fail silently when no mail handler is configured. This is a direct usability and trust failure on the site’s only conversion path.

**Fix (choose one):**
- Connect the form to a server-side form endpoint and send a real acknowledgement; or
- Rewrite the copy honestly: “This button opens your email client. Nothing is sent until you press Send in your email app,” remove the acknowledgement-email sentence, and provide a visible fallback address. Also show a persistent confirmation state after the `mailto:` handoff rather than assuming success.

---

## 3. High findings

### H1 — No skip link; keyboard users traverse the full navigation on every page

All nine pages repeat seven nav links plus a CTA before `<main>`. There is no “Skip to content” link and no `id`/`tabindex="-1"` target on `<main>`.

**Impact:** WCAG 2.4.1 (Bypass Blocks) is only partially mitigated by the `main` landmark; keyboard-only users must tab through the header on every page.

**Fix:** add a visually-hidden-on-blur skip link before the header, target `<main id="main" tabindex="-1">`, and ensure the focus style is visible.

### H2 — Form controls lose the visible focus outline

**Evidence:** `styles.css:599–603` uses `.field input:focus { outline: none; … }`. This selector (specificity 0,2,1) overrides the global `input:focus-visible` rule at `styles.css:1209–1216` (0,1,1). The only remaining cue is a 1 px border colour change.

**Impact:** WCAG 2.4.7 / 2.4.11 focus visibility is weak, particularly for low-vision and keyboard users.

**Fix:** remove `outline: none`; use `:focus-visible` with a 2 px outline plus the border change, or explicitly re-add the outline inside `.field input:focus-visible`.

### H3 — Form errors are not associated with their fields

`aria-invalid` is never set, error text is not tied to inputs with `aria-describedby`, and the summary message is the only announcement. The `role="status"` live region is a positive, but screen-reader users are not told which field failed when focus moves.

**Also:** error text is `#B7792B` on `#F5F4F0`, a contrast ratio of **3.3:1**, below the 4.5:1 requirement for normal text. Red/amber is not the only cue (text changes too), but the contrast still fails.

**Fix:** set `aria-invalid="true"` and `aria-describedby`, add per-field error text, keep focus on the first invalid field, and use a darker error colour (e.g. `#8A5318`) or a bordered error block.

### H4 — In-page anchors land underneath the sticky header

The header is `position: sticky` with `height: 76px`. There is no `scroll-margin-top` on `#cam-follower`, `#alternator-bracket`, `#article-1/2/3` or other anchor targets.

**Impact:** clicking “Read the summary” on the homepage or “Read article” on Insights positions the target heading behind the header. This is a real navigation defect, not cosmetic.

**Fix:** add `:target { scroll-margin-top: calc(var(--header-h) + 16px); }` or apply `scroll-margin-top` to all anchor target sections.

### H5 — SPA fallback creates soft 404s and hides broken URLs

**Evidence:** `deploy.json` sets `"spa": true`, and there is no `404.html`. With static-asset SPA fallback, an unknown URL such as `/typo`, `/old-page` or even `/favicon.ico` can return the homepage with HTTP 200.

**Impact:** search engines index the homepage at arbitrary URLs; users see the homepage instead of a clear “not found” page; broken PDF or asset paths may return HTML with a 200 status. This conflicts with the brief’s instruction not to redirect unrelated pages to the homepage.

**Fix:** disable SPA fallback for this static site, add a branded `404.html`, and keep only intentional 301s in `index.js`.

### H6 — One published PDF is untagged; both need accessibility review

**Evidence:** the alternator PDF contains no `/StructTreeRoot` and no `/Lang`; the cam PDF is tagged and has `/Lang`. Neither is offered as HTML.

**Impact:** the alternator report is likely unusable with a screen reader and lacks a declared language. WCAG 2.2 AA applies to the PDF as published content.

**Fix:** publish tagged PDFs with reading order, headings, table headers, figure descriptions, document title and language. Alternatively provide an accessible HTML version of each report. Test with a screen reader and a PDF accessibility checker.

### H7 — Metadata is too long and lacks canonical/social tags

| Page | Title length | Description length |
|---|---:|---:|
| `index.html` | **78** | **290** |
| `about.html` | 29 | **198** |
| `capabilities.html` | 48 | **184** |
| `case-studies.html` | 48 | **180** |
| `contact.html` | 31 | **171** |
| `insights.html` | 44 | **208** |

Titles should generally stay under ~60 characters and descriptions under ~160. The homepage title and description will be truncated in search results.

There are **no canonical tags**, **no Open Graph or Twitter cards**, **no `og:image`**, and **no robots.txt**. The sitemap assumes `https://konxis.in/` and is not referenced from a robots file.

**Fix:** tighten the homepage metadata, shorten overlong descriptions, add self-referencing canonicals, add Open Graph/Twitter metadata with a real image, add `robots.txt` referencing the sitemap, and confirm the production domain before launch.

### H8 — Trust signals are incomplete or placeholder-grade

- No founder name appears anywhere on the site. The About page and homepage both refer only to “the engineer”.
- Both founder portraits are patterned placeholders labelled “Founder portrait” (`index.html:656`, `about.html:64`).
- The LinkedIn link is the generic `https://www.linkedin.com/` on the contact page, About page and every footer.
- There is no phone number, physical address, company registration information or response-time expectation.
- The IIT Bombay / Airbus Bangalore claims are not independently verifiable from the site.

**Impact:** for a consultancy selling judgement and accountability, an anonymous founder and placeholder portrait undercut the strongest differentiator. Engineering buyers routinely check who is accountable for the analysis.

**Fix:** publish the founder’s name, a real photograph, a working LinkedIn/profile URL, and a verifiable career summary. Add a business city/address and a response-time statement. If anonymity is intentional, explain why and provide an alternative accountability signal.

### H9 — Residual FSI disclosure contradicts the removal request

**Evidence:** `index.html:595` still says:

> “A third investigation remains withheld pending written publication authorisation.”

The Case Studies publication note was removed at the client’s request. This homepage sentence now (a) reintroduces the subject on the main marketing page, and (b) leaves a reference to a study the visitor cannot see. It also conflicts with the Case Studies intro’s “Two investigations are currently published.”

Additionally, the Case Studies meta description (`case-studies.html:7`) advertises “fluid–structure interaction” although no FSI study is published.

**Fix:** remove the homepage sentence and adjust the meta description to describe the two published studies (mechanism dynamics and fatigue). If the third study must be acknowledged, do it in one consistent, approved place.

### H10 — Header may overflow just above the mobile breakpoint

**Evidence:** at `max-width: 1080px` the header CTA disappears and the hamburger appears. Above 1080 px the full seven-link nav plus CTA and wordmark must fit in one row with 32 px gaps. Approximate content width at 1081 px is already close to the available width.

**Impact:** a narrow band around 1081–1120 px may wrap or overflow. This needs browser measurement to confirm, but the breakpoint has no intermediate state.

**Fix:** test 1081, 1100 and 1200 px; raise the collapse breakpoint or reduce nav gaps/CTA width until measured clearance exists.

### H11 — Mobile navigation lacks dismissal and height handling

`main.js` toggles `.is-open` and `aria-expanded` only. The toggle has no `aria-controls`; the panel cannot be closed with Escape or an outside click; and `.nav` has no `max-height`/`overflow-y`.

**Impact:** on short landscape viewports (e.g. 667 × 375), the expanded panel can extend beyond the viewport with no internal scroll. Keyboard and screen-reader users get no standard menu relationship.

**Fix:** add `aria-controls="primary-nav"`/matching ID, Escape-to-close with focus returned to the toggle, outside-click close, and `max-height: calc(100vh - var(--header-h)); overflow-y: auto`.

### H12 — PDF download behaviour is not explicitly controlled

The links use the HTML `download` attribute, but no `Content-Disposition` or cache headers are configured. Depending on browser and host, the PDF may open inline instead of downloading, even though the label says “Download”.

**Impact:** inconsistent expectation; mobile Safari may open a viewer rather than save the file.

**Fix:** confirm behaviour on iOS/Android; if a download is intended, set `Content-Disposition: attachment` for `/downloads/*.pdf` via the host’s header configuration, and add sensible `Cache-Control`. Label the link honestly if it opens in a viewer.

---

## 4. Medium findings

### M1 — Footer heading hierarchy skips levels

Every page ends `h1/h2 → h4` (“Navigate”, “Contact”) with no `h3`. This is an outline defect for screen-reader navigation and SEO.

**Fix:** use `h2`/`h3` for footer group labels, styled as they are now.

### M2 — Amber text fails normal-text contrast

`#B7792B` on `#F5F4F0` is **3.3:1**; on `#FBFAF7` it is **3.48:1**. It is used for:

- form error text (`main.js`),
- 9 px technical annotations in inline SVGs (`.t-amber`).

It passes 3:1 only for large text, which these are not.

**Fix:** use a darker amber for text (`#8A5318` or similar) and keep the current amber for lines/borders only. Technical figure annotations are part of the content, so they also need 4.5:1.

### M3 — No reduced-motion support

`html { scroll-behavior: smooth; }` and hover transitions run unconditionally. There is no `@media (prefers-reduced-motion: reduce)` override.

**Fix:** disable smooth scrolling and non-essential transitions for users who request reduced motion.

### M4 — Contact form asks for company and personal data without a consent/privacy link

Name, company and email are required; there is no link to the privacy policy beside the submit button and no consent statement. The privacy link exists only in the footer.

**Fix:** add a short line above submit: “We use this information only to respond to your enquiry. See our Privacy Policy.” Link directly to `privacy.html`.

### M5 — No response-time expectation

“What happens next” explains the process but not when. For an “Urgent — a problem is occurring now” option, this is a mismatch.

**Fix:** state a realistic response window (e.g. “We aim to respond within two working days”) and what urgent enquiries should do instead.

### M6 — No favicon, web manifest or theme colour

There is no `favicon.ico`, `<link rel="icon">`, `site.webmanifest` or `theme-color`. Browsers request `/favicon.ico`; with SPA fallback this can return the homepage as a 200 HTML response.

**Fix:** add a simple SVG favicon derived from the wordmark and reference it from every page.

### M7 — Sitemap domain and discoverability need validation

`public/sitemap.xml` is valid XML and all nine listed files exist. However, it hard-codes `konxis.in`; if the deployment domain differs, every URL is wrong. It is also not referenced by `robots.txt`.

**Fix:** generate the sitemap from the production base URL at build time, or document the domain assumption; add `Sitemap:` to robots.txt.

### M8 — No security headers

`index.js` forwards the request to static assets without adding security headers. Cloudflare may add some defaults, but there is no configured CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy` or `X-Frame-Options`/`frame-ancestors`.

**Fix:** add a header layer appropriate to the host. A CSP must allow `fonts.googleapis.com` and `fonts.gstatic.com`, or self-host the fonts.

### M9 — Duplicated deploy tree and unused worker

Root files and `public/` are byte-identical copies, and `worker.js` duplicates `index.js` though `deploy.json` points only to `index.js`. This has already required manual re-syncing.

**Impact:** future edits can silently diverge; a fix applied to root but not `public/` is invisible in production.

**Fix:** make `public/` the single source or generate it from a `src/` directory at build time. Delete `worker.js` or make it the single entrypoint.

### M10 — Inline styles and dead CSS

There are over 100 inline `style` attributes, including the `grid-column` declarations that block the mobile fix. CSS also retains unused rules (`.case`, `.badge--demo`, `.cs-gate`, old case-study layout) after the portfolio replacement.

**Fix:** remove inline layout declarations, add responsive utility classes, and remove dead selectors after a visual regression check.

### M11 — Internal audit artefacts are stale

`report.md` still describes the old 18-study portfolio, claims the site is fully fixed, and recommends removing `audit.py`. It no longer matches the deployed site and could mislead the next maintainer. `audit.py` also validates only root files and does not check images, CSS, JS, PDFs, responsive layout or HTTP behaviour — which is why C1 and C2 were missed.

**Fix:** replace `report.md` with this report, move audit artefacts outside the project or into a `tools/` folder, and extend checks to the deployed `public/` tree.

### M12 — Founder experience wording is inaccurate

`index.html:677` says:

> “Previous professional experience — gained at IIT Bombay and Airbus Bangalore…”

IIT Bombay is presented elsewhere as education, not professional experience. This conflates education and employment and weakens the otherwise careful separation.

**Fix:** “Education at IIT Bombay; professional experience at Airbus Bangalore. Both are background, clearly separated from Konxis client work.”

### M13 — Section numbering and figure numbering are inconsistent

- The homepage starts visible section numbering at “Section 02 — Where we are useful”; there is no Section 01.
- `about.html`, `capabilities.html` and `industries.html` all reuse “Fig. 02” for different figures.
- `industries.html` labels figures `I-01` and `I-03` with no `I-02` in the visible sequence.

**Fix:** either number continuously from 01 or remove visible numbering. Keep figure labels unique and sequential.

### M14 — Case-study copy hard-codes the current count

“Two investigations are currently published” and “What these two studies are not” will be wrong the moment a third study is approved. This is brittle editorial copy.

**Fix:** use count-neutral wording (“The studies currently published…”) and list the actual entries.

### M15 — No breadcrumb or section context on long pages

Capabilities and Industries are long pages with many sections but no sticky section navigation or breadcrumb. On mobile this becomes a very long scroll with no way to jump between capabilities.

**Fix:** add a compact in-page contents list or sticky section index for the two longest pages.

---

## 5. Low / advisory findings

### L1 — Title separator inconsistency
Case Studies uses `|` while every other title uses an em dash. Align for brand consistency.

### L2 — Very small mono text
Evidence labels, file metadata and figure labels are 9–10.5 px. Some are uppercase with wide tracking. This is legible on desktop but marginal on mobile and for low-vision users. Raise the smallest labels to 11–12 px where they carry information.

### L3 — Static elements in the tab order
Six `.stage` divs on the homepage use `tabindex="0"` solely to reveal hover content. They are not controls. This adds six unexplained tab stops. Prefer `<details>` or make the reveal work without focus, and remove `tabindex`.

### L4 — Orphan form hint ID
`contact.html` defines `id="f-files-hint"` but no input references it. “Attachments” is a `<span class="mono">`, not a group label/legend. Clean up the ID and use a proper group label if the section is retained.

### L5 — Form length and required company
Twelve fields is a long intake; `Company` is required. Consider making company optional or splitting the form into two steps. This is a conversion trade-off, not a defect.

### L6 — No internal links from capabilities/industries to the studies
The new case studies are linked only from the homepage and global navigation. Capability and industry pages would benefit from contextual “see this investigation” links, improving both UX and internal SEO.

### L7 — Article dates/read times are unverified
“8 min read”, “6 min read”, “7 min read” and “2026” look like editorial metadata but have no authored date or byline. Either verify or remove.

### L8 — Plain-text email exposure
`hello@konxis.in` appears in every footer and on contact/about, which invites scraping. A contact form endpoint would reduce exposure. Low priority for a consultancy site.

### L9 — Legal pages need professional review
Privacy and Terms are clearly written and appropriately cautious, but “Last reviewed: November 2026” is not a legal review. Have counsel confirm Indian IT/companies requirements, retention wording, liability and the absence of a registered address.

---

## 6. What passed re-testing

- **Links:** 0 broken internal links or anchors across all 9 pages, in both root and `public/`.
- **Markup:** one `h1` per page, no duplicate IDs, balanced tags, no literal escape artefacts.
- **Assets:** all referenced CSS, JS, SVG and PDF files exist in the deployed tree.
- **Case studies:** both PDFs are byte-identical to the supplied files; page counts (6 and 9) and file sizes are correct; summaries are 75 and 85 words.
- **Evidence language:** calculated results are consistently identified as calculated; measured outcomes, physical validation and client status are not claimed. The FSI PDF is not deployed and no public link points to it.
- **Sitemap:** 9 valid URLs, all resolving to existing files.
- **Redirects:** `/case-studies`, `/case-studies/*`, `/projects/*` and `/portfolio/*` return 301 to `/case-studies.html`.
- **Focus styling:** a global `:focus-visible` rule exists for links, buttons and form fields, though the form override in H2 weakens it.
- **Images:** both card images have descriptive alt text; inline SVGs carry `role="img"`/`aria-label` or `aria-hidden`.
- **Colour:** the primary graphite/blue/muted palette passes AA; only amber text fails.
- **Delivery:** local HTTP tests return 200 with `application/pdf` for both PDFs and `image/svg+xml` for both illustrations.
- **Privacy:** no analytics, advertising cookies or third-party scripts beyond Google Fonts.

---

## 7. Recommended order of work

### Before launch (P0)
1. Fix the responsive `.grid` (C1) and verify all pages at 360/768/1024 px.
2. Resolve the alternator PDF’s “NON-PUBLICATION” marking (C2).
3. Correct the contact-form promise and add a real submission/confirmation path (C3).
4. Remove the residual FSI sentence from the homepage and fix the Case Studies meta description (H9).
5. Add the founder’s name, real portrait and working profile link; remove placeholder portrait panels (H8).

### Next (P1, within a week)
6. Add skip link, restore form focus outlines, associate form errors (H1–H3).
7. Add `scroll-margin-top` for anchors (H4).
8. Add a 404 page and remove SPA fallback (H5).
9. Fix mobile nav dismissal/height/ARIA (H11).
10. Tighten metadata, add canonical/Open Graph/robots (H7).
11. Publish accessible PDFs or HTML equivalents (H6).
12. Correct founder-experience wording and section/figure numbering (M12–M13).

### Then (P2)
13. Security headers and PDF headers/caching (M8, H12).
14. Consolidate the deploy tree and retire stale audit artefacts (M9–M11).
15. Contrast, reduced motion, favicon, consent copy, response-time copy (M2–M6).
16. Contextual links from capability/industry pages (L6).
17. Legal review (L9).

---

## 8. Limitations of this audit

- No deployed URL was available, so HTTPS, host headers, CDN caching, DNS and production redirects were not tested.
- No browser automation or screen-reader run was performed; responsive findings are based on CSS values and layout arithmetic, not screenshots.
- External links (LinkedIn, Google Fonts, email) were not validated against live services.
- The author names, credentials, company registration and client status cannot be verified from the repository.
- “NON-PUBLICATION” on the alternator PDF was interpreted only as a risk requiring owner confirmation; the audit does not assert its legal meaning.

---

*This report supersedes `report.md` for the current site. `report.md` is retained for history only.*
