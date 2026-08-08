# Bitcoin42 Website Audit

**Site audited:** https://bitcoin42.github.io/ (also serves at https://bitcoin42.com/)  
**Repository:** `bitcoin42/bitcoin42.github.io`  
**Audit date:** 2026-08-08  
**Scope:** Current live pages (`index.html`, `impressum.html`), root assets, Git history, and publicly deployed `old-site-backup/`  
**Method:** Static code review, live HTTP checks, contrast calculation (WCAG relative luminance), and content inspection. No automated axe/Lighthouse run in this pass (marked where verification still needed).

---

## Executive summary

The current site is a clean, mostly self-contained German single-page marketing site for self-custody consulting, with a separate Impressum. Content quality, disclaimer tone, typography direction, and overall information architecture are already strong for a solo-operator practice site. There is no build system and almost no first-party JavaScript, which fits GitHub Pages well.

The most urgent problems are operational and legal rather than visual: the primary booking URL on Zeeg returns **404**, the linked **Datenschutz** page does not exist, the favicon path is wrong, and the entire legacy site plus an exchange-software tree is publicly reachable under `/old-site-backup/`. SEO basics (canonical, Open Graph, sitemap/robots) are missing, and several accessibility gaps remain (mobile nav removed with no alternative, orange accent contrast failures, no skip link / `main` landmark).

---

## Repository structure and technology stack

| Item | Observation |
|------|-------------|
| Stack | Static HTML + inline CSS + minimal inline JS; no npm/package manager, no bundler, no framework |
| Live pages | `index.html`, `impressum.html` |
| Assets | `alec-hahn.jpg` (~77 KB, progressive JPEG 1131×1550); SVG marks/lockups at repo root |
| Third parties | Google Fonts; Zeeg booking embed (`assets.zeeg.me`) |
| Deployment | GitHub Pages user/org site; `bitcoin42.com` serves the same HTML (Cloudflare in front). No `CNAME` file in repo — domain wiring appears external. |
| Legacy | `old-site-backup/` (~88 MB, 2300+ tracked files): previous Bootstrap/jQuery site, PHP endpoints, support chat stack, `exchange-software` Laravel tree |
| Build | None. Suitable for GitHub Pages as-is |
| Config missing | `robots.txt`, `sitemap.xml`, root `404.html`, `.nojekyll`, `datenschutz.html`, `logo/` directory |

---

## Current homepage structure and user journey

1. Sticky header: brand, section anchors, “Termin buchen”
2. Hero: value proposition + dual CTAs + decorative “seed phrase” card
3. Credibility strip (years / stats)
4. Leistungen → Ablauf → Preise → Person → FAQ
5. Booking band with contact details
6. Footer: Impressum, Datenschutz (broken), bitcoin42.com, legal disclaimer

**Journey intent:** Learn offer → understand process/price → trust person → book free call.  
**Journey break:** Booking CTA targets a Zeeg URL that currently returns 404, so conversion fails at the final step.

---

## Critical issues

### C-01 — Primary booking URL is broken
- **Category:** Navigation / CTA / Business conversion
- **Priority:** Critical
- **File and line:** `index.html` L177, L188, L334, L347, L359, L385, L426, L448–449; `impressum.html` L72
- **Problem:** Live check of `https://zeeg.me/afmhahn/kostenfreie-beratung` returns HTTP 404 with body `Not found. We ran into an issue. (ZG-F80280)`. Profile root `https://zeeg.me/afmhahn` also 404s.
- **User or business impact:** Every primary CTA fails. Users cannot book; trust and lead generation break.
- **Recommended fix:** Restore or recreate the Zeeg event/profile, or replace all booking hrefs (and the Zeeg popup URL) with a working booking destination or `mailto:` fallback. Until fixed, prefer a working contact path (email/phone) as the visible primary CTA.
- **Verification method:** `curl -I` / browser open of each booking URL; click every `.js-book` control; confirm popup or destination loads.

### C-02 — Privacy policy page linked but missing
- **Category:** Content / Legal / Security & privacy
- **Priority:** Critical
- **File and line:** `index.html` L460; `impressum.html` L122; file `datenschutz.html` absent
- **Problem:** Footer links to `datenschutz.html`. Live URL returns 404. Site loads Google Fonts and Zeeg (third-party processors) without a published privacy notice.
- **User or business impact:** Legal/transparency failure for a German business site; broken trust for privacy-focused Bitcoin audience.
- **Recommended fix:** Add an accurate `datenschutz.html` covering controller identity, contact, purposes, legal bases, third parties (Google Fonts, Zeeg, Telegram if linked), retention, rights, and hosting (GitHub Pages / Cloudflare). Do not invent processors—document only what is actually used.
- **Verification method:** Open `/datenschutz.html` (200); crawl footer links; legal review by the operator.

### C-03 — Legacy site and exchange-software tree publicly deployed
- **Category:** Security and privacy / GitHub Pages
- **Priority:** Critical
- **File and line:** `old-site-backup/` (entire tree); confirmed live `https://bitcoin42.github.io/old-site-backup/` and `.../old-site-backup/index.html` return 200
- **Problem:** ~88 MB of outdated site, PHP form handlers, support stack, and Laravel `exchange-software` (including `.env.example` with placeholder secrets and production-oriented defaults) is world-readable on the same origin as the new site.
- **User or business impact:** Confusing duplicate content, SEO pollution, expanded attack/recon surface, reputational risk (old claims, forms that cannot work on Pages).
- **Recommended fix:** Remove `old-site-backup/` from the GitHub Pages-published branch, or exclude it via Pages/source settings. Keep archives offline or in a private repo. Add root `robots.txt` disallow for any temporary archival path if retention is unavoidable.
- **Verification method:** After change, confirm `/old-site-backup/` returns 404; search Git history/private backup for any real secrets before deletion if needed.

### C-04 — Favicon path 404
- **Category:** Assets / Brand
- **Priority:** Critical (broken asset on every page)
- **File and line:** `index.html` L8; `impressum.html` L8
- **Problem:** `href="logo/bitcoin42-favicon.svg"` but file exists at repo root as `bitcoin42-favicon.svg`. Live `/logo/bitcoin42-favicon.svg` → 404; `/bitcoin42-favicon.svg` → 200.
- **User or business impact:** Missing tab icon; looks unfinished; extra 404 noise.
- **Recommended fix:** Point icon links to `bitcoin42-favicon.svg` (or create `logo/` and move assets consistently). Add `apple-touch-icon` if desired.
- **Verification method:** Hard-reload; Network tab shows 200 for favicon.

---

## High-priority issues

### H-01 — No mobile navigation alternative
- **Category:** Navigation / Accessibility / Responsive
- **Priority:** High
- **File and line:** `index.html` L51–54 (`nav{display:none}` below 820px), L170–176
- **Problem:** Primary section navigation is hidden on viewports ≤820px with no menu button, drawer, or in-page substitute.
- **User or business impact:** Mobile users (likely majority) lose wayfinding to Leistungen/Ablauf/Preise/FAQ; only brand + book button remain.
- **Recommended fix:** Add an accessible disclosure menu (`button` + `aria-expanded` + focus trap/escape) or a compact anchor row that remains visible.
- **Verification method:** Resize ≤820px; keyboard and screen-reader open/close; all anchors reachable.

### H-02 — Signal orange fails WCAG AA contrast on light backgrounds
- **Category:** Accessibility / Visual design
- **Priority:** High
- **File and line:** CSS `--signal:#E8871A` (`index.html` L22); used for tags L106, seed numbers L80, FAQ `summary::after` L147–148, eyebrows/mono accents
- **Problem:** Calculated contrast ≈ **2.42:1** on `--card` `#F4F5F1` and ≈ **1.97:1** on `--steel` `#DCDFD9`. AA body/UI text requires 4.5:1 (3:1 for large/non-text UI depending on role).
- **User or business impact:** Category tags and FAQ expand icons are hard to read for low-vision users; fails WCAG 1.4.3 / 1.4.11 for meaningful UI text/icons.
- **Recommended fix:** Darken accent for text/icons (e.g. toward `#9A5A0A`–`#8A4B00` range—re-test), or keep bright orange only for large decorative non-text elements that are not the sole cue.
- **Verification method:** Contrast checker on each orange-on-light pair; axe/WAVE.

### H-03 — Missing SEO canonical and social metadata
- **Category:** SEO
- **Priority:** High
- **File and line:** `index.html` `<head>` L3–14 (absent); same for `impressum.html`
- **Problem:** No `link rel="canonical"`, Open Graph, or Twitter card tags. Site is reachable on both `bitcoin42.github.io` and `bitcoin42.com`.
- **User or business impact:** Duplicate-URL risk, weak link previews when shared, diluted ranking signals.
- **Recommended fix:** Canonical to the preferred domain (likely `https://bitcoin42.com/`); add `og:title`, `og:description`, `og:url`, `og:image`, `og:locale`, and Twitter equivalents; use an absolute image URL.
- **Verification method:** View-source; Facebook/LinkedIn/Twitter debuggers; Search Console URL inspection.

### H-04 — No `robots.txt` or `sitemap.xml`
- **Category:** SEO
- **Priority:** High
- **File and line:** Missing at repo root; live `/robots.txt` and `/sitemap.xml` → 404
- **Problem:** Crawlers get no explicit sitemap or crawl hints; legacy backup paths are currently indexable.
- **User or business impact:** Slower/unclear discovery; risk that backup URLs get indexed.
- **Recommended fix:** Add `robots.txt` + `sitemap.xml` listing only canonical public pages; disallow `/old-site-backup/` if that path still exists temporarily.
- **Verification method:** Fetch both files; validate sitemap URLs return 200.

### H-05 — Third-party fonts and booking scripts without privacy documentation
- **Category:** Security and privacy / Performance
- **Priority:** High
- **File and line:** `index.html` L9–14; `impressum.html` L9–11
- **Problem:** Google Fonts CSS and Zeeg CSS/JS load from third-party origins. No first-party privacy page explains this. Fonts CSS is render-blocking; Zeeg CSS is render-blocking (JS is `defer`).
- **User or business impact:** Privacy exposure (IP to Google/Zeeg); GDPR documentation gap; slower first paint.
- **Recommended fix:** Document in Datenschutz; prefer self-hosted fonts (`font-display: swap`); load Zeeg only on intent (click) or replace with plain link; minimize third parties for a privacy-positioned brand.
- **Verification method:** Network waterfalls with/without consent strategy; Datenschutz accuracy review.

### H-06 — EU ODR link in Impressum lands on relocation notice
- **Category:** Content / Legal
- **Priority:** High
- **File and line:** `impressum.html` L95
- **Problem:** `https://ec.europa.eu/consumers/odr/` redirects to an EU “Site relocation” page, not a usable ODR entry point.
- **User or business impact:** Required consumer-dispute information may be ineffective/outdated.
- **Recommended fix:** Replace with the current official EU dispute-resolution URL after operator verification of the live Commission destination (do not invent a URL).
- **Verification method:** Manual browser follow of the final URL; confirm it presents ODR/consumer redress content.

### H-07 — Missing document landmark `main` and skip link
- **Category:** Accessibility / HTML semantics
- **Priority:** High
- **File and line:** `index.html` body L165–466 (hero/facts outside `<section>`; no `<main>`); no “skip to content” link
- **Problem:** Homepage has `header`/`nav`/`footer` but no `main`. Sticky header without skip link forces keyboard users to tab through chrome repeatedly.
- **User or business impact:** Harder screen-reader orientation; slower keyboard access to content.
- **Recommended fix:** Wrap primary content in `<main id="main">`; add visually hidden skip link as first focusable element.
- **Verification method:** Landmark navigation in NVDA/VoiceOver; Tab order from load.

### H-08 — Contact details are not links
- **Category:** Navigation / Accessibility / UX
- **Priority:** High
- **File and line:** `index.html` L431–436
- **Problem:** Email, phone, and Telegram appear as plain `<span>` text, not `mailto:`, `tel:`, or `https://t.me/...` links. Booking CTA above them is currently broken (see C-01).
- **User or business impact:** Mobile users cannot tap to call/mail; fallback contact is harder than it should be.
- **Recommended fix:** Convert to proper links with clear accessible names; keep visible labels.
- **Verification method:** Keyboard activation opens correct handlers; link name announcement.

### H-09 — Root custom 404 page missing
- **Category:** GitHub Pages / UX
- **Priority:** High
- **File and line:** Former `404.html` moved to `old-site-backup/404.html` (commit `b8ba2ee`); live `/404.html` → 404
- **Problem:** Unknown paths fall back to default GitHub Pages 404, not an on-brand page with path home/Impressum.
- **User or business impact:** Dead ends after typos or old inbound links.
- **Recommended fix:** Add a minimal root `404.html` matching current design system.
- **Verification method:** Visit a nonsense path on the Pages site.

---

## Medium-priority improvements

### M-01 — Hero composition is card-and-stats heavy for a branded first viewport
- **Category:** Visual design / UX
- **Priority:** Medium
- **File and line:** `index.html` L181–224
- **Problem:** First viewport pairs a strong headline with an inset “seedcard” and immediately follows with a four-stat strip. Brand appears in nav/eyebrow but the visual plane is not a full-bleed atmospheric image of product/place; stats compete with the primary CTA.
- **User or business impact:** Slightly noisier first impression; less distinctive brand presence than the copy deserves.
- **Recommended fix:** Keep message and seed metaphor, but simplify first viewport to brand + one headline + one support line + one CTA group + one dominant visual; move stats below the fold or integrate into Person section with clearer sourcing.
- **Verification method:** 5-second first-viewport test on mobile/desktop; brand recall without nav.

### M-02 — Non-interactive content uses card chrome extensively
- **Category:** Visual design
- **Priority:** Medium
- **File and line:** `index.html` L100–107, L232–280, L116–126, L324–361
- **Problem:** Leistungen and Preise are presented as bordered cards even though most are not interactive containers (CTAs sit inside price cards).
- **User or business impact:** Visual clutter; weaker hierarchy between reading content and actions.
- **Recommended fix:** Prefer typographic sections/lists; reserve card treatment for interactive pricing actions if needed.
- **Verification method:** Design review; remove borders/shadows and confirm comprehension remains.

### M-03 — Duplicated CSS and unused logo assets reduce maintainability
- **Category:** Maintainability / Performance
- **Priority:** Medium
- **File and line:** Parallel `:root`/component CSS in `index.html` and `impressum.html`; unused `bitcoin42-lockup.svg`, `bitcoin42-lockup-dark.svg`, `bitcoin42-mark.svg` (mark is inlined in HTML instead)
- **Problem:** Style drift risk; assets unused by pages; favicon folder mismatch shows process fragility.
- **User or business impact:** Future edits break one page and not the other; larger repo/cognitive load.
- **Recommended fix:** Extract shared `styles.css` (still fine for Pages) or a tiny include strategy; use lockup assets in header/footer or delete unused files deliberately.
- **Verification method:** Both pages share tokens; no 404 assets; visual regression check.

### M-04 — No structured data
- **Category:** SEO
- **Priority:** Medium
- **File and line:** `index.html` `<head>` / FAQ block L391–418
- **Problem:** No JSON-LD for `ProfessionalService`/`Person`/`FAQPage`.
- **User or business impact:** Missed rich-result eligibility and clearer entity signals.
- **Recommended fix:** Add conservative JSON-LD from on-page facts only (name, URL, areaServed, FAQ Q&As already published). Do not invent ratings, reviews, or priceValidUntil unless accurate.
- **Verification method:** Google Rich Results Test.

### M-05 — `target="_blank"` without new-window disclosure
- **Category:** Accessibility
- **Priority:** Medium
- **File and line:** Booking anchors with `target="_blank"` e.g. `index.html` L177
- **Problem:** Opens new tab/window without visible or SR text such as “öffnet in neuem Tab”. `rel` includes `noopener` but not always `noreferrer` (minor).
- **User or business impact:** Disorienting for screen-reader and cognitive users.
- **Recommended fix:** Prefer same-tab for booking, or append accessible indication; keep `rel="noopener noreferrer"`.
- **Verification method:** SR announcement; keyboard return path.

### M-06 — Facts strip claims need clearer framing
- **Category:** Content quality / Trust
- **Priority:** Medium
- **File and line:** `index.html` L218–223 (“300+ Alpha-Trader betreut”, “2,5 Jahre Börsen-Beta geleitet”, etc.)
- **Problem:** Strong quantitative claims appear without context definitions (“Alpha-Trader”) or links to verifiable artifacts. Accuracy not independently verified in this audit.
- **User or business impact:** Credibility risk if readers cannot interpret or verify claims; conflicts with “no unsupported claims” goal if overstated.
- **Recommended fix:** Operator-verify numbers; rephrase to specific, defensible wording (e.g. “300+ Beta-Tester bei NightTrader”) and optionally link to whitepaper/public materials.
- **Verification method:** Operator confirmation; wording review against evidence.

### M-07 — NightTrader / Telegram references are not linked
- **Category:** Content / UX
- **Priority:** Medium
- **File and line:** `index.html` L375–383, L434
- **Problem:** NightTrader.Exchange and Telegram handle mentioned as text only. `https://nighttrader.exchange` currently returns 200 (verified), Telegram handle page returns 200.
- **User or business impact:** Users must copy manually; missed trust path to prior work.
- **Recommended fix:** Link only destinations the operator wants public; use descriptive link text.
- **Verification method:** Click-through; ensure links match intended public presence.

### M-08 — Impressum `noindex` may be overly aggressive
- **Category:** SEO
- **Priority:** Medium
- **File and line:** `impressum.html` L7
- **Problem:** `meta name="robots" content="noindex"` prevents indexing of legally required info.
- **User or business impact:** Users searching for “bitcoin42 Impressum” may not find the official page.
- **Recommended fix:** Allow indexing of Impressum/Datenschutz; keep `noindex` only for true utility/thank-you pages if any.
- **Verification method:** URL inspection after crawl.

### M-09 — Google Fonts dependency vs. brand privacy posture
- **Category:** Performance / Privacy / Design system
- **Priority:** Medium
- **File and line:** `index.html` L9–11
- **Problem:** Three families (Familjen Grotesk, Newsreader, JetBrains Mono) with multiple weights load from Google. Distinctive and appropriate typographically, but external.
- **User or business impact:** Extra DNS/TLS/CSS requests; privacy leakage; possible FOIT/FOUT depending on network.
- **Recommended fix:** Self-host subsetted WOFF2 files; keep `font-display: swap`; subset to used weights.
- **Verification method:** Lighthouse fonts audit; Network shows first-party font URLs only.

### M-10 — Portrait image not responsive-srcset / modern format
- **Category:** Performance
- **Priority:** Medium
- **File and line:** `index.html` L370, L428
- **Problem:** Single 1131×1550 JPEG (~77 KB) used for large portrait and 52×52 avatar. `loading="lazy"` present on main portrait (good). No `srcset`/`webp`.
- **User or business impact:** Extra bytes on mobile; avatar pulls full image.
- **Recommended fix:** Provide resized WebP/JPEG variants; separate small avatar crop; keep dimensions attributes (already present).
- **Verification method:** Lighthouse performance; Network payload comparison.

### M-11 — Sticky header focus obscuration risk
- **Category:** Accessibility
- **Priority:** Medium
- **File and line:** `index.html` L47 (`header{position:sticky}`)
- **Problem:** No `scroll-padding-top` / focus offset for in-page anchors under sticky header.
- **User or business impact:** Section headings may sit under header after skip/anchor navigation.
- **Recommended fix:** Set `html { scroll-padding-top: … }` matching header height.
- **Verification method:** Click each nav anchor; verify heading fully visible.

### M-12 — `.DS_Store` committed
- **Category:** Maintainability / Hygiene
- **Priority:** Medium
- **File and line:** `.DS_Store` at repo root (tracked)
- **Problem:** macOS metadata in git.
- **User or business impact:** Noise in diffs; minor professionalism issue.
- **Recommended fix:** Delete from git; add `.gitignore`.
- **Verification method:** `git ls-files` no longer lists `.DS_Store`.

---

## Low-priority improvements

### L-01 — FAQ first item forced open
- **Category:** UX
- **Priority:** Low
- **File and line:** `index.html` L397 `<details open>`
- **Problem:** First FAQ expanded by default.
- **User or business impact:** Minor content push on load; not wrong, but inconsistent disclosure pattern.
- **Recommended fix:** Decide intentionally; if space-constrained on mobile, start all collapsed.
- **Verification method:** Visual check mobile/desktop.

### L-02 — Unused `.todo` styles in Impressum CSS
- **Category:** Maintainability
- **Priority:** Low
- **File and line:** `impressum.html` L34–38
- **Problem:** `.todo` CSS remains though no matching markup.
- **User or business impact:** Dead code only.
- **Recommended fix:** Remove unused rules.
- **Verification method:** CSS grep; no visual change.

### L-03 — No copyright year in footer
- **Category:** Content
- **Priority:** Low
- **File and line:** `index.html` footer L454–466
- **Problem:** No © line / year. Not strictly required given Impressum, but common expectation.
- **User or business impact:** Minor freshness cue missing.
- **Recommended fix:** Add simple “© Alec F. M. Hahn / bitcoin42” without inventing entity names.
- **Verification method:** Footer content review.

### L-04 — English-speaking claim without English UI
- **Category:** Content / UX
- **Priority:** Low
- **File and line:** `index.html` L377
- **Problem:** Copy says German and English spoken; site is German-only (appropriate for DE market).
- **User or business impact:** English visitors rely on browser translate.
- **Recommended fix:** Optional concise English page later; not required for launch quality.
- **Verification method:** Product decision.

### L-05 — `bitcoin42.com` footer link may be self-referential depending on host
- **Category:** Navigation
- **Priority:** Low
- **File and line:** `index.html` L461
- **Problem:** On `bitcoin42.com`, footer link points to the same site origin; on `github.io`, it jumps to custom domain.
- **User or business impact:** Mild confusion / redundant control.
- **Recommended fix:** Use canonical domain consistently; omit self-link on the canonical host or label “Website”.
- **Verification method:** Check footer on both hosts.

### L-06 — Reduced motion covers animations but hover transform remains a minor motion cue
- **Category:** Accessibility
- **Priority:** Low
- **File and line:** `index.html` L84–88 (good `prefers-reduced-motion` for seed reveal & scroll); hover translate disabled there
- **Problem:** Coverage is mostly good; ensure any future motion respects the same media query.
- **User or business impact:** Currently acceptable.
- **Recommended fix:** Keep the media-query pattern as a hard rule for new CSS/JS.
- **Verification method:** OS reduce-motion on; no seed stagger.

---

## Accessibility findings

| ID | Topic | Status |
|----|-------|--------|
| A-01 | Page language `lang="de"` | Pass — `index.html` L2, `impressum.html` L2 |
| A-02 | Keyboard navigation | Partial — native links/details work; mobile nav absent (H-01); booking depends on Zeeg |
| A-03 | Focus states | Pass — `:focus-visible` outline `index.html` L162 |
| A-04 | Alt text | Pass/Partial — portrait has descriptive `alt` L370; decorative byline `alt=""` L428; seedcard has `role="img"` + `aria-label` L194 |
| A-05 | Color contrast | Fail for `--signal` text/icons on light surfaces (H-02); body text pairs tested pass (ink/ink-soft on steel/card) |
| A-06 | Form labels | N/A on first-party pages (no forms). Zeeg popup forms are third-party — **Needs verification** |
| A-07 | Link names | Mostly clear German CTAs; contact strings not links (H-08); brand links OK |
| A-08 | Reduced motion | Pass for seed animation & smooth scroll (`index.html` L84–88) |
| A-09 | Screen-reader usability | Partial — missing `main`/skip (H-07); FAQ `summary` OK; decorative SVG `aria-hidden` OK |
| A-10 | Heading hierarchy | Pass — single `h1`, logical `h2`/`h3` sequence (verified) |

**Contrast samples calculated (WCAG relative luminance):**

| Pair | Ratio | AA normal text |
|------|-------|----------------|
| `#14181C` on `#DCDFD9` | 13.25:1 | Pass |
| `#5A6169` on `#DCDFD9` | 4.66:1 | Pass |
| `#14181C` on `#E8871A` (signal button) | 6.72:1 | Pass |
| `#E8871A` on `#F4F5F1` (tags/icons) | 2.42:1 | Fail |
| `#B9C7D0` on `#1B3A4B` | 6.93:1 | Pass |

---

## SEO findings

| ID | Item | Status |
|----|------|--------|
| S-01 | Title tag | Pass — descriptive, branded (`index.html` L6) |
| S-02 | Meta description | Pass — present and relevant (L7) |
| S-03 | Canonical URL | Fail — missing (H-03); dual hosts confirmed |
| S-04 | Open Graph / Twitter | Fail — missing |
| S-05 | Heading structure | Pass |
| S-06 | Structured data | Fail — none (M-04) |
| S-07 | Sitemap / robots | Fail — 404 (H-04) |
| S-08 | Indexable legacy paths | Fail while `old-site-backup/` is public (C-03) |
| S-09 | Image SEO | Partial — portrait `alt` good; no OG image |

---

## Performance findings

| ID | Item | Finding |
|----|------|---------|
| P-01 | Font loading | Render-blocking Google Fonts CSS; three families/multiple weights (M-09) |
| P-02 | JS | Minimal first-party; Zeeg `embed.min.js` deferred but always loaded even if user never books |
| P-03 | CSS | Zeeg `embed.min.css` render-blocking; first-party CSS inlined (no extra request, but duplicated across pages) |
| P-04 | Images | Portrait ~77 KB progressive JPEG — acceptable but not optimized for avatar use (M-10) |
| P-05 | Unused assets | Lockup SVGs unused; legacy backup dominates repo weight |
| P-06 | Caching | Relies on GitHub Pages/Cloudflare defaults — **Needs verification** of cache headers for HTML vs hashed assets (no hashed filenames today) |
| P-07 | Core Web Vitals risks | LCP: fonts + hero text/card; INP: likely fine; CLS: seed opacity animation should be low risk. Full CWV lab/field data **Needs verification** (no Lighthouse run in this audit) |

---

## Security and privacy findings

| ID | Item | Finding |
|----|------|---------|
| SP-01 | External scripts | Zeeg embed JS/CSS; Google Fonts CSS |
| SP-02 | Tracking | No Google Analytics/Meta Pixel/etc. found on current pages |
| SP-03 | Unsafe links | Booking/external links use `rel="noopener"`; Zeeg destination currently 404 |
| SP-04 | Exposed secrets | No live secrets found in current pages. `old-site-backup/exchange-software/.env.example` has placeholder credentials only; no committed `.env` found. Still should not be publicly browsable. |
| SP-05 | Forms | No first-party forms on new site. Legacy `contact-form.php` / `search.php` under backup cannot run on GitHub Pages but remain downloadable source. |
| SP-06 | Privacy policy | Missing (C-02) despite third parties + personal contact data published |
| SP-07 | Public phone/email | Intentional for a solo consultancy; acceptable if mirrored in Impressum (yes) |

---

## Content findings

| ID | Item | Finding |
|----|------|---------|
| T-01 | Spelling/grammar | German copy is generally polished; no clear typos found in primary pages |
| T-02 | Clarity | Strong, specific self-custody framing; “Alpha-Trader” is insider jargon (M-06) |
| T-03 | Financial claims | Explicit non-advice disclaimer in FAQ + footer + Impressum — good. Pricing is presented as service fees, not investment returns |
| T-04 | Copyright year | Missing in footer (L-03) |
| T-05 | Contact information | Present in booking band + Impressum; booking band not linked (H-08) |
| T-06 | Legal pages | Impressum solid (DDG, MStV, Kleinunternehmer, risk). Datenschutz missing. ODR URL stale (H-06) |
| T-07 | Address spelling | “Geltingerstraße 12” in Impressum — **Needs verification** against official registration/signage |
| T-08 | Historical message | Bitcoin self-custody / “not your keys” metaphor preserved appropriately |

---

## GitHub Pages compatibility

| ID | Item | Status |
|----|------|--------|
| G-01 | Static hosting fit | Pass — HTML/CSS/JS/assets suitable |
| G-02 | PHP legacy | Not executable on Pages (good) but still publicly downloadable under backup |
| G-03 | Jekyll | No `_config.yml`; no Liquid in current pages. `.nojekyll` absent but not required for current root structure |
| G-04 | Custom domain | `bitcoin42.com` serves same content via Cloudflare; no `CNAME` in repo — **Needs verification** of GitHub Pages domain settings / DNS |
| G-05 | 404 handling | Root `404.html` missing (H-09) |

---

## Broken links, missing assets, console errors, and build errors

| ID | Resource | Result |
|----|----------|--------|
| B-01 | `datenschutz.html` | 404 (local + live) |
| B-02 | `logo/bitcoin42-favicon.svg` | 404 live |
| B-03 | `https://zeeg.me/afmhahn/kostenfreie-beratung` | 404 live |
| B-04 | `https://zeeg.me/afmhahn` | 404 live |
| B-05 | `/robots.txt`, `/sitemap.xml`, `/404.html` | 404 live |
| B-06 | `impressum.html`, `alec-hahn.jpg`, root SVGs | 200 |
| B-07 | `https://bitcoin42.com/`, `https://nighttrader.exchange/` | 200 at audit time |
| B-08 | Build errors | None — no build pipeline |
| B-09 | Console errors | **Needs verification** in browser (Zeeg 404 likely throws or fails widget init; first-party script guards with `typeof Zeeg === 'undefined'`) |

---

## Recommended implementation order

1. **Fix conversion and legal holes:** C-01 (Zeeg/booking), C-02 (Datenschutz), H-06 (ODR URL), H-08 (contact links as fallback CTA).
2. **Remove public legacy surface:** C-03 (unpublish/delete `old-site-backup/`), H-09 (root 404), M-12 (`.DS_Store` + gitignore).
3. **Repair basics:** C-04 (favicon path), H-03/H-04 (canonical, OG, robots, sitemap).
4. **Accessibility sprint:** H-01 (mobile nav), H-02 (orange contrast), H-07 (main + skip), M-11 (scroll-padding).
5. **Privacy/performance:** H-05/M-09 (self-host fonts; lazy Zeeg), M-10 (image variants).
6. **Content/design polish:** M-01/M-02 (hero/card simplification), M-06 (stats wording), M-04 (JSON-LD), M-03 (shared CSS), low-priority cleanup.

---

## Appendix — Files reviewed

- `/index.html` (469 lines)
- `/impressum.html` (126 lines)
- `/alec-hahn.jpg`, `/bitcoin42-*.svg`
- `/old-site-backup/**` (structure and sensitivity sampling; not a full line-by-line legacy audit)
- Git history (notably `b8ba2ee` replacing prior site and moving legacy tree into `old-site-backup/`)
)
