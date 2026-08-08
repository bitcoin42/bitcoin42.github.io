# Bitcoin42 Improvement Todo

Practical implementation checklist derived from [`website-audit.md`](./website-audit.md).  
Status reflects the implementation pass of 2026-08-08.

**Rules of engagement**
- Preserve the Bitcoin self-custody message and historical context.
- Do not invent company details, team members, stats, partnerships, testimonials, prices, investment promises, or legal claims.
- Prefer fewer dependencies and no tracking.
- Keep the site static and GitHub Pages–friendly.

---

## 0. Blockers before design polish

- [x] **C-01** Restore a working booking destination — Zeeg removed; primary CTA is `mailto:` with phone/Telegram fallbacks
- [x] **C-01** Verify popup path and no-JS fallback — no popup; plain mailto/tel links work without JS
- [x] **C-02** Draft and publish accurate `datenschutz.html`
- [x] **C-02** Link Datenschutz from footer on all public pages
- [x] **H-06** Replace EU ODR URL — removed obsolete ODR link (platform shut down July 2025); VSBG statement retained
- [x] **H-08** Turn email / phone / Telegram into real links

---

## 1. Security, privacy, and publish surface

- [x] **C-03** Remove `old-site-backup/` from the published branch
- [ ] **C-03** Confirm `/old-site-backup/` returns 404 after deploy
- [x] **SP-04** Spot-check that no real `.env` or credentials remain in the published tree
- [x] **H-05** Document hosting/processors in Datenschutz; remove Google Fonts + Zeeg
- [x] **M-12** Delete tracked `.DS_Store` and add a root `.gitignore`
- [x] **H-09** Add on-brand root `404.html`

---

## 2. Broken assets and site basics

- [x] **C-04** Fix favicon href to `bitcoin42-favicon.svg`
- [ ] **C-04** Hard-reload and confirm favicon 200 after deploy
- [ ] **B-01–B-05** Re-crawl known 404s after deploy
- [x] **L-02** Remove unused `.todo` CSS from Impressum

---

## 3. SEO foundation

- [x] **H-03** Canonical host `https://bitcoin42.com/`
- [x] **H-03** Open Graph + Twitter meta
- [x] **H-03** Share image at `images/og-bitcoin42.jpg`
- [x] **H-04** `robots.txt` + `sitemap.xml`
- [x] **M-08** Impressum/Datenschutz indexable
- [x] **M-04** JSON-LD (`ProfessionalService`, `Person`, `FAQPage`)
- [x] **G-04** Add `CNAME` for `bitcoin42.com`

---

## 4. Accessibility (WCAG 2.2 AA)

- [x] **H-07** `<main id="main">` + skip link
- [x] **H-01** Accessible mobile navigation
- [x] **H-02** `--signal-text` (#8A4B00) for text/icons on light surfaces
- [x] **M-11** `scroll-padding-top` for sticky header
- [x] **M-05** Prefer same-tab links; `rel="noopener noreferrer"` on external links
- [x] **A-06** No third-party booking popup remaining
- [ ] Run axe / Lighthouse on deployed site and fix any regressions

---

## 5. Performance and dependency reduction

- [x] **M-09 / H-05** Self-host fonts via `fonts/fonts.css`
- [x] **H-05** Remove Zeeg embed JS/CSS
- [x] **M-10** Resized WebP/JPEG portrait + avatar in `images/`
- [x] **M-03** Shared `styles.css`
- [x] **M-03** Use `bitcoin42-mark.svg` in chrome (lockups retained as brand assets)
- [ ] **P-07** Record Lighthouse scores after deploy

---

## 6. Content clarity and trust

- [x] **M-06** Fact strip wording: “NightTrader-Beta-Tester”; moved under Person
- [x] **M-07** Link NightTrader + Telegram
- [ ] **T-07** Operator should still verify Impressum street spelling against official data
- [x] **L-03** Footer copyright line
- [x] Keep non-advice + no-custody disclaimers

---

## 7. Design and UX refinement

- [x] **M-01** Simplify first viewport; move stats out of opening screen
- [x] **M-02** Reduce non-interactive card chrome (offers/prices as typographic blocks)
- [x] Preserve steel/vault/signal direction with AA text accent
- [ ] Confirm responsive layout on real devices after deploy
- [x] Seed reveal + hover motion with `prefers-reduced-motion` coverage

---

## 8. Maintainability and GitHub Pages hygiene

- [x] Remain static (no build step)
- [x] **L-05** Remove redundant bitcoin42.com self-link from footer
- [x] **L-01** FAQ items start collapsed
- [x] **L-04** English locale deferred
- [ ] After deploy: smoke-test home, Impressum, Datenschutz, CTAs, favicon, mobile nav

---

## Verification checklist (release gate)

- [x] Primary CTAs use working contact paths (mailto/tel)
- [x] Footer/nav targets exist in repo
- [x] `old-site-backup/` removed from branch
- [x] Datenschutz present and matches real processors
- [x] Favicon + share image present in repo
- [x] Canonical, robots, sitemap present
- [x] Mobile nav implemented with keyboard/Esc support
- [x] Orange text/icons use AA-capable `--signal-text`
- [x] Skip link + `main` landmark present
- [ ] Post-deploy Lighthouse / live 404 crawl
)
