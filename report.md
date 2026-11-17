# Konxis Engineering — Website Error Report

**Audited by:** automated link/markup audit (`audit.py`), plus expert review from four perspectives: **website builder / web engineer**, **engineering-industry client**, **UI/UX designer**, and **content & compliance reviewer**.
**Scope:** all 9 pages, stylesheet, and behaviour script — reviewed from scratch.
**Status:** all errors below are **FIXED** and re-verified.

---

## Verification summary (after fixes)

| Check | Result |
|---|---|
| Internal links → existing files | ✅ 0 broken (was 59 broken references) |
| In-page anchors (`#…`) | ✅ all targets exist |
| Dead `href="#"` links | ✅ 0 (was 10) |
| HTML tag balance | ✅ all 9 pages balanced |
| Duplicate `id`s | ✅ 0 |
| Exactly one `<h1>` per page | ✅ 9/9 |
| Stray escape artifacts (`\"`) | ✅ 0 (was 12 lines) |
| Form present + labels bound | ✅ `contact.html` intake form valid |
| `main.js` syntax (`node --check`) | ✅ passes |
| Every page: header, footer, CSS, JS | ✅ 9/9 |

Re-run any time with: `python audit.py`

---

## MAJOR errors (site-breaking)

### M1 — `contact.html` did not exist — 40 dead links
- **Perspective:** website builder + client
- **Detail:** every primary CTA on the site (“Discuss an Engineering Problem”, 40 references) pointed to a file that was never created. The site’s single most important action — starting an enquiry — ended in a 404.
- **Fix:** built `contact.html` as an **engineering intake**, per brief: name, company, work email, phone, industry, help-needed, timeline, website, a large “Engineering problem” textarea, a “What decision do you need to make?” field, and a **“What evidence do you already have?”** multi-select (CAD/drawings, existing FEA, test data, field failure info, photographs, vibration measurements, material data, none yet). Supporting statement included verbatim: *“You do not need to know which analysis method you need…”*

### M2 — `about.html` did not exist — 12 dead links
- **Perspective:** website builder + client
- **Fix:** built `about.html` with founder portrait placeholder, credentials (M.E. IIT Bombay / Airbus Bangalore), the required **founder professional experience vs. Konxis client work** distinction, six-stage methodology pathway, and direct-contact philosophy. Content is understated and founder-led — not a fake “Our Team” page.

### M3 — `insights.html` was unfinished — marker left in output, 6 broken in-page anchors
- **Perspective:** website builder + UX
- **Detail:** the `<!--ARTICLES-->` placeholder was still in the file and `#article-1/2/3` had no targets, so all three “Read article” links failed.
- **Fix:** wrote all three full articles (“Why FEA results can be misleading”, “What makes a simulation trustworthy?”, “When nonlinear analysis is actually necessary”) as editorial columns with correct `id` anchors. Content stays within the brief’s technical claims — no invented results or citations.

### M4 — Contact form did not exist at all (no way to submit anything)
- **Perspective:** client + UI/UX
- **Fix:** added client-side validation (required fields, email format, amber error borders + status message) and a **mailto composer** that assembles a structured enquiry to `hello@konxis.in`, since the site is static with no backend. Evidence checkboxes are grouped into one list in the composed email.
- **Honest limitation:** file attachments cannot be uploaded from a static page — the form states this and tells users to attach files when replying to the acknowledgement email.

### M5 — Mobile users had **no** header CTA on any page
- **Perspective:** UI/UX (responsive)
- **Detail:** `.header__cta` was hidden ≤1080px; index.html’s fallback nav CTA was inline `style="display:none"` with no CSS/JS ever showing it; the other 8 pages had no fallback at all. Between 901–1080px the nav was still horizontal but the CTA had already vanished.
- **Fix:** added `.nav__cta` (hidden on desktop, shown inside the collapsed nav panel) to **all 9 pages**, and moved the nav-collapse breakpoint from 900px to **1080px** so the hamburger + panel CTA appear exactly when the header CTA hides — no width gap.

---

## HIGH errors (broken paths / dead ends)

### H1 — 10 dead legal links (`href="#"`)
- Privacy Policy and Terms of Engagement in all 5 footers pointed nowhere.
- **Fix:** created `privacy.html` and `terms.html` (honest, non-fabricated wording — no fake certifications or regulatory claims) and pointed all 10 links at them.

### H2 — 12 lines of escaped-quote artifacts in `about.html`
- **Detail:** attributes like `class=\"body mt3\"` were written with literal backslashes, producing class names such as `body mt3\`, `stage__body\` — silently breaking styling **and the hover-reveal of every methodology stage** (`.stage__body` never matched).
- **Fix:** all backslashes removed (`sed`), confirmed 0 remaining across the site.

### H3 — Orphan form label (`label for="f-files"` with no input)
- **Fix:** replaced with a non-binding `<span class="mono">Attachments</span>` heading, since the attachment flow is handled by the reply-to-email note.

---

## MEDIUM errors (behaviour / consistency)

### M6 — Evidence checkboxes composed the email incorrectly
- **Detail:** in `main.js`, `FormData` values for checkboxes are strings, so they hit the generic branch and emitted repeated `Evidence: …` lines instead of a grouped list.
- **Fix:** Evidence keys are collected first, then appended as one grouped “Evidence already available:” block.

### M7 — Footer / header / asset consistency across pages
- **Fix:** verified all 9 pages share identical header, footer, `styles.css` and `main.js` references, privacy/terms links, and the LinkedIn + email entries.

### M8 — Active-nav highlighting relies on `main.js`
- **Note:** `aria-current`/`.is-active` is applied by script; without JS the nav still works (plain links), it just shows no active state. Accepted as progressive enhancement.

---

## LOW / advisory (not defects — flagged for the owner)

| # | Item | Recommendation |
|---|---|---|
| L1 | **LinkedIn URL is generic** (`linkedin.com`) — no profile URL was supplied and inventing one would be wrong | Replace all 9 footer/aside links with Konxis’s real profile URL |
| L2 | **Form has no server backend** — relies on the visitor’s mail client | If mailto proves insufficient, connect the form to a form-endpoint/hosted handler |
| L3 | **Google Fonts require network** — fallbacks (`Inter`, system sans, monospace) are defined | Consider self-hosting IBM Plex for full offline parity |
| L4 | **Founder portrait is a marked placeholder** (honest, no stock person) | Drop in the real founder photograph when available |
| L5 | **Privacy/Terms dates** say “November 2026”, wording is current-practice only | Have counsel review before launch |
| L6 | **Article reading times/dates** (8/6/7 min, 2026) are editorial metadata | Adjust to actual published values |
| L7 | `audit.py` is a development tool left in the folder | Exclude from deployment if the host serves all files |

---

## What was checked and found **clean**

- Every cross-page anchor (`capabilities#failure`, `industries#aerospace`, `case-studies#case-01…18`) resolves.
- No duplicate ids; no unclosed tags; no missing `lang`, `title`, `viewport`, or meta description.
- All SVG figures carry `role="img"` + `aria-label`.
- Colour system, type scale, 12-column grid, 0–4px radii, and mono-for-labels-only rule are respected site-wide.
- Evidence badges (Technical Demonstration / Client Case Study / Professional Experience) appear consistently; **no invented clients, certifications, results, or software claims** anywhere.
- No pill/glass/neon/purple/glow styling; amber used only for warnings and critical annotations.

**Final state:** 9 pages · 4,806 lines · **0 broken links · 0 dead anchors · 0 markup errors · 1 working intake form.**
