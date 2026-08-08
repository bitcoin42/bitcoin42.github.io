# Bitcoin42 Improvement Todo

Practical implementation checklist derived from [`website-audit.md`](./website-audit.md).  
Work top to bottom within each group. Check items off as they ship.

**Rules of engagement**
- Preserve the Bitcoin self-custody message and historical context.
- Do not invent company details, team members, stats, partnerships, testimonials, prices, investment promises, or legal claims.
- Prefer fewer dependencies and no tracking.
- Keep the site static and GitHub Pages–friendly.

---

## 0. Blockers before design polish

- [ ] **C-01** Restore a working booking destination (fix Zeeg event/profile or replace URL) and update every `.js-book` / Impressum booking link
- [ ] **C-01** Verify popup path and no-JS fallback both reach a working page
- [ ] **C-02** Draft and publish accurate `datenschutz.html` (controller, contact, purposes, third parties actually used, rights, hosting)
- [ ] **C-02** Link Datenschutz from footer on all public pages; keep wording aligned with real processors only
- [ ] **H-06** Replace EU ODR URL in Impressum with the current official destination after operator verification
- [ ] **H-08** Turn email / phone / Telegram in the booking band into real `mailto:`, `tel:`, and `https://t.me/...` links

---

## 1. Security, privacy, and publish surface

- [ ] **C-03** Remove `old-site-backup/` from the published GitHub Pages branch (archive privately if needed)
- [ ] **C-03** Confirm `/old-site-backup/` returns 404 on github.io and bitcoin42.com
- [ ] **SP-04** Spot-check that no real `.env` or credentials remain in the published tree
- [ ] **H-05** Document Google Fonts + Zeeg (or remove them) in Datenschutz
- [ ] **M-12** Delete tracked `.DS_Store` and add a root `.gitignore`
- [ ] **H-09** Add on-brand root `404.html` with links home + Impressum + Datenschutz

---

## 2. Broken assets and site basics

- [ ] **C-04** Fix favicon href to `bitcoin42-favicon.svg` (or recreate `logo/` consistently) on `index.html` and `impressum.html`
- [ ] **C-04** Hard-reload and confirm favicon 200
- [ ] **B-01–B-05** Re-crawl known 404s after fixes (`datenschutz`, favicon path, Zeeg, robots, sitemap, 404 page)
- [ ] **L-02** Remove unused `.todo` CSS from `impressum.html`

---

## 3. SEO foundation

- [ ] **H-03** Choose canonical host (likely `https://bitcoin42.com/`) and add `<link rel="canonical">` on each public page
- [ ] **H-03** Add Open Graph + Twitter meta (title, description, url, image, locale)
- [ ] **H-03** Create a dedicated share image (absolute URL) — do not invent claims in the image text
- [ ] **H-04** Add `robots.txt` allowing public pages; disallow any temporary archive paths
- [ ] **H-04** Add `sitemap.xml` with only canonical public URLs
- [ ] **M-08** Reconsider `noindex` on Impressum (prefer indexable legal pages)
- [ ] **M-04** Add conservative JSON-LD (`Person` / `ProfessionalService` / `FAQPage`) from on-page facts only
- [ ] **G-04** Verify GitHub Pages custom-domain + DNS/Cloudflare settings match the canonical choice (add `CNAME` in repo if that is the intended source of truth)

---

## 4. Accessibility (WCAG 2.2 AA)

- [ ] **H-07** Wrap homepage content in `<main id="main">`
- [ ] **H-07** Add skip link “Zum Inhalt” as first focusable control
- [ ] **H-01** Implement accessible mobile navigation (button, `aria-expanded`, Esc/focus management) instead of hiding `nav`
- [ ] **H-02** Recolor text/icon uses of `--signal` to ≥4.5:1 on steel/card (keep brighter orange only if decorative and not sole cue)
- [ ] **H-02** Re-test tags, seed numerals, FAQ +/- affordances
- [ ] **M-11** Add `scroll-padding-top` for sticky header anchor offsets
- [ ] **M-05** Avoid unnecessary `target="_blank"` or disclose “öffnet in neuem Tab”; use `rel="noopener noreferrer"`
- [ ] **A-06** Keyboard-test Zeeg popup (or replacement) for focus trap, labels, and Esc
- [ ] Run axe DevTools / Lighthouse accessibility on home + Impressum + Datenschutz and fix regressions

---

## 5. Performance and dependency reduction

- [ ] **M-09 / H-05** Self-host subsetted WOFF2 fonts with `font-display: swap`; remove Google Fonts requests if possible
- [ ] **H-05** Load Zeeg only on booking intent, or drop embed JS/CSS and use a plain link
- [ ] **M-10** Export resized WebP/JPEG portrait variants + small avatar crop; add `srcset`
- [ ] **M-03** Extract shared CSS (e.g. `styles.css`) used by home, Impressum, Datenschutz, 404
- [ ] **M-03** Either use lockup SVGs in chrome or remove unused logo files deliberately
- [ ] **P-07** Run Lighthouse (mobile + desktop) and record LCP/INP/CLS after the above

---

## 6. Content clarity and trust

- [ ] **M-06** Operator-verify fact-strip numbers; rewrite “Alpha-Trader” into plain, defensible language
- [ ] **M-07** Link NightTrader / whitepaper / Telegram only if those public destinations should stay promoted
- [ ] **T-07** Verify Impressum street spelling/address against official data
- [ ] **L-03** Add a simple footer credit/copyright line without inventing a legal entity
- [ ] **T-01** Final German copy pass after structural edits (no meaning changes unless correcting errors)
- [ ] Keep / strengthen non-advice + no-custody disclaimers near CTAs and footer

---

## 7. Design and UX refinement

- [ ] **M-01** Simplify first viewport: brand, one headline, one support sentence, one CTA group, one dominant visual; move stats out of the opening screen if they compete
- [ ] **M-02** Reduce non-interactive card chrome in Leistungen; keep hierarchy typographic where possible
- [ ] Preserve Bitcoin-aligned visual direction (steel/vault/signal) while fixing contrast
- [ ] Ensure responsive layout passes for ~360px, ~768px, and ≥1200px widths
- [ ] Add 2–3 intentional, restrained motions only where they aid hierarchy; keep `prefers-reduced-motion` coverage (**L-06**)

---

## 8. Maintainability and GitHub Pages hygiene

- [ ] Confirm no build step is required for deploy (keep static unless a clear win appears)
- [ ] Add a short `README.md` with local preview instructions and canonical domain notes — only if helpful for the operator
- [ ] **L-05** Decide footer treatment of `bitcoin42.com` vs github.io to avoid redundant self-links
- [ ] **L-01** Decide FAQ default open/closed state intentionally
- [ ] **L-04** Defer English locale unless there is a concrete audience need
- [ ] After each deploy: smoke-test home, Impressum, Datenschutz, booking CTA, favicon, and mobile nav

---

## Suggested sprint packing

### Sprint A — Unbreak trust and conversion
Items in groups **0** and **1**, plus favicon (**C-04**).

### Sprint B — Discoverability and a11y baseline
Groups **3** and **4**.

### Sprint C — Speed, privacy posture, polish
Groups **5**, **6**, and **7**.

---

## Verification checklist (release gate)

- [ ] All primary CTAs open a working booking or contact path
- [ ] No footer/nav 404s
- [ ] `/old-site-backup/` not publicly reachable
- [ ] Datenschutz present and matches real third parties
- [ ] Favicon + share preview image load
- [ ] Canonical, robots, sitemap valid
- [ ] Mobile nav usable with keyboard
- [ ] Orange text/icons pass AA contrast
- [ ] Skip link + `main` landmark present
- [ ] Lighthouse a11y ≥ target agreed with operator; no critical SEO/a11y issues remaining
)
