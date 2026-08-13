# NightTrader Landing Page — Technical & Content Audit

**Audit date:** 2026-08-13
**Audited commit (this repo):** `52b0a628a64e7baf0c7697d96df0160594dd33d5`
**Referenced production repo:** `NightTrader/nighttrader.github.io` @ `7f53efc6a4a54e9743d1909e24b6ad9407a89619`
**Auditor:** automated inspection + manual review. Findings requiring human sign-off are marked **OWNER**.

> **Scope note.** This audit covers the marketing landing page in this repository. It does **not**
> constitute a security review, a cryptographic review, or legal advice. Several findings below
> exist precisely because the underlying system could not be inspected — see §1.2 and §7.

---

## 1. Deployment and canonical domain

### 1.1 What is actually deployed where

| Host                      | Server       | Content                                                                                                                                                      | Notes                                                       |
| ------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| `bitcoin42.github.io`     | GitHub Pages | This landing page                                                                                                                                            | No `CNAME` file in this repo                                |
| `bitcoin42.com`           | Cloudflare   | Was byte-identical to the above (md5 `c7742fa1…`) at audit time; went stale when the Workers build started failing — see D-7 (fix applied, pending redeploy) | Served via a Cloudflare Workers project (`afmhahn-bitcoin`) |
| `nighttrader.exchange`    | —            | **Different site** — the production NightTrader marketing site from `NightTrader/nighttrader.github.io` (which contains `CNAME` = `nighttrader.exchange`)    | Not this page                                               |
| `my.nighttrader.exchange` | —            | The actual application. Returned **HTTP 451** from this environment                                                                                          | Source not public; see §1.2                                 |

**Finding D-1 (P0).** The same document is served from two hosts with no canonical
differentiation between them. `<link rel="canonical">`, `og:url`, JSON-LD `@id`/`url`,
`manifest.start_url`, `robots.txt` sitemap reference and `sitemap.xml` **all point at
`bitcoin42.github.io`**, while `bitcoin42.com` serves the identical bytes. This is a textbook
duplicate-content configuration and splits ranking signals.

**Finding D-2 (P0) — OWNER DECISION REQUIRED.** The intended canonical domain cannot be
determined from repository configuration:

- This repo contains **no `CNAME`**, which would normally indicate GitHub Pages is the endpoint.
- Yet `bitcoin42.com` (Cloudflare) serves identical content, implying an out-of-repo deployment.
- The footer asserts _"Served from bitcoin42.com"_ — which is **true**, but inconsistent with the
  canonical metadata pointing elsewhere.

Three coherent options exist; they cannot be chosen safely without the owner:

1. `bitcoin42.com` is canonical → update all metadata to it; keep Pages as an unindexed mirror.
2. `bitcoin42.github.io` is canonical → stop serving `bitcoin42.com`, or mark it a mirror.
3. This page is a _satellite_ landing page for the product at `nighttrader.exchange` → canonical
   stays self-referential, but the relationship must be stated on-page.

**Finding D-3 (P2).** No `CNAME` file is committed, so custom-domain configuration for Pages (if
any) lives only in repository settings and is not reproducible from the repo.

**Finding D-4 (P1).** No CI/CD exists (`.github/` absent). Nothing validates HTML, links, locale
parity or accessibility before deploy.

**Finding D-5 (P2).** Neither host sets security headers (`Content-Security-Policy`,
`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`). GitHub Pages **cannot** set custom
headers at all; Cloudflare can. See §9.

**Finding D-7 (P0) — RESOLVED IN THIS REPOSITORY.** The canonical host stopped receiving
deployments once this repository gained a `package.json`/`package-lock.json` (added for the CI
quality gates, see commit `16ee21c`). This is a side effect of that addition, not a pre-existing
misconfiguration — PR #15's Cloudflare failure, which predates any `package.json` in this repo,
has a different cause than the one diagnosed here and was not separately root-caused.

**Confirmed root cause (owner supplied the build log).** The Workers project has no
`wrangler.toml` in this repository, so Cloudflare Workers Builds treats the entire repository
checkout, `/opt/buildhome/repo`, as the static-assets directory. Once a `package.json` existed,
the build step ran `npm install`/build tooling that populated `node_modules` inside that same
directory — including `node_modules/workerd/bin/workerd`, Wrangler's bundled runtime binary, at
144 MiB. Workers enforces a 25 MiB per-file limit on static assets, so the deploy failed:

```
✘ [ERROR] Asset too large.
Cloudflare Workers supports assets with sizes of up to 25 MiB. We found a file
/opt/buildhome/repo/node_modules/workerd/bin/workerd with a size of 144 MiB.
```

Per Cloudflare's own migration guidance, **Pages automatically excludes `node_modules`, `.git`,
and `.DS_Store` from static-asset uploads; Workers does not** — that exclusion must be opted into
with an `.assetsignore` file in the assets directory. Since this project's assets directory is
implicitly the repo root, and no `.assetsignore` existed, nothing filtered `node_modules` out
once it existed.

**Fix, part 1:** `.assetsignore` added at the repository root, listing `node_modules`, `.git`,
`.DS_Store` — mirroring exactly what Pages did automatically.

That cleared the oversized-asset error but exposed a second, independent failure underneath it.
The project's Cloudflare-side deploy command (dashboard configuration, not in this repository) is
`npx wrangler versions upload`. With no Wrangler configuration file in the repo, Wrangler had
nothing telling it where the assets directory even was — `.assetsignore` alone was never going to
be sufficient, because there was no `assets.directory` for it to apply to:

```
✘ [ERROR] Missing entry-point to Worker script or to assets directory

  If are uploading a directory of assets, you can either:
  - Specify the path to the directory of assets via the command line: (ex: `npx wrangler versions upload --assets=./dist`)
  - Or create a "wrangler.jsonc" file containing:
  {
    "name": "worker-name",
    "compatibility_date": "2026-08-13",
    "assets": { "directory": "./dist" }
  }
```

**Fix, part 2:** `wrangler.jsonc` added at the repository root:

```jsonc
{
  "name": "afmhahn-bitcoin",
  "compatibility_date": "2026-08-13",
  "assets": { "directory": "." },
}
```

`name` matches the existing Worker script (confirmed via the Cloudflare API before writing this,
so the upload targets the same script rather than creating a new one), and `assets.directory` is
`.` — the repo root — matching the implicit behaviour the project already had. No `main` entry
point is set: this is a static-assets-only Worker with no server-side script, which is the
intended, documented configuration for a site like this one. No `routes`, `route`, or `zone_id`
were added; those are unrelated to the failure and, if wrong, could conflict with whatever custom
domain binding already exists for `bitcoin42.com` in the dashboard. Verified locally with the same
Wrangler version the Cloudflare build used (`npx wrangler@4.123.0 versions upload --dry-run`):
before this file existed, that command reproduced the exact "Missing entry-point" error; after,
it completes cleanly and Wrangler's own diagnostics report `hasAssets: true`.

**Together, both fixes were required** — `.assetsignore` alone stopped the build from tripping on
`node_modules`, but it could not fix the underlying absence of an `assets.directory` declaration
that made the deploy command fail regardless.

Observed consequence while the build was failing, verified by fetching both hosts:

| Host                  | `<link rel="canonical">`                | Corrected timelock wording present? |
| --------------------- | --------------------------------------- | ----------------------------------- |
| `bitcoin42.github.io` | `https://bitcoin42.com/` ✅ (current)   | Yes                                 |
| `bitcoin42.com`       | `https://bitcoin42.github.io/` ❌ (old) | **No**                              |

The two hosts named each other as canonical, and `bitcoin42.com` — the domain the owner
designated canonical — was serving the **pre-correction safety wording**, including the
description of the recovery timelock as paying out on schedule, which §7 records as factually
wrong about Bitcoin.

**Build now succeeds; production still pending merge.** The Cloudflare Workers Build for this
branch (`claude/fix-ci-lockfile`, commit `0bcdae9`) completed successfully and produced working
preview deployments. Fetching the commit preview URL directly confirms both fixes: canonical
metadata points at `bitcoin42.com` and the corrected "becomes spendable" timelock wording is
present. **This does not yet mean `bitcoin42.com` is fixed** — Cloudflare's Git integration
promotes only the production branch (`master`) to the production domain; a PR-branch build
produces preview URLs only (`*.workers.dev`), never production traffic. `bitcoin42.com` will pick
up the fix once this PR merges to `master` and that build completes. Re-verify
`bitcoin42.com`'s canonical tag and timelock wording after merge; do not consider D-7 closed until
then.

### 1.2 The linked "source" repository does not contain the product

**Finding D-6 (P0) — MATERIAL ACCURACY ISSUE.** The page invites users to audit the code before
depositing funds:

> "Source — `github.com/NightTrader` — **front end and signing logic. Read the key derivation
> before you deposit.**"

Inspection of `NightTrader/nighttrader.github.io` @ `7f53efc` shows this repository is a
**marketing website**, not the exchange application:

- No Bitcoin signing library is present. Grep for `bitcoinjs`, `bitcore`, `secp256k1`, `BIP32`,
  `bip39`, `mnemonic`, `derivePath` matches only `web3.min.js` (a general Ethereum library) and
  `zxcvbn.js` (a password-strength estimator).
- No key derivation, transaction construction, `redeemScript`, `scriptPubKey`, `PBKDF2` or
  `scrypt` code exists in `index.html` or `login.html`.
- `login.html` is a static template whose form posts to `action="#"` — it is non-functional.
- `CHECKLOCKTIMEVERIFY` and `multisig` appear **only in prose** (marketing copy, FAQ, ToS,
  `textContent.js`, `translate.js`), never in executable logic.
- The real application is at `https://my.nighttrader.exchange` (referenced 7× from the production
  site). Its source is **not public**, and the host returned **HTTP 451** from this environment.

**Consequence:** every cryptographic claim on this landing page is currently **unverifiable from
any source the page itself offers**. The "go check it" invitation cannot presently be satisfied by
a reader. This is the single most serious trust finding in this audit.

---

## 2. Brand and entity relationships

Three names appear with no explanation of how they relate:

| Name                 | Role (as far as can be established)                        | Evidence                              |
| -------------------- | ---------------------------------------------------------- | ------------------------------------- |
| **NightTrader**      | The product / exchange                                     | `nighttrader.exchange`, press release |
| **bitcoin42**        | Historical team/operator identity; this page's host domain | History section; `bitcoin42.com`      |
| **NAOME SAPI DE CV** | Legal operator named in the footer legal notice            | Footer `imp` block                    |

**Finding B-1 (P1).** A reader cannot tell whether these are one company, a parent/subsidiary, or
unrelated entities. The footer states NAOME SAPI DE CV is the operator; the History section implies
bitcoin42 is the originating team; nothing ties either to NightTrader explicitly.

**Finding B-2 (P1) — OWNER.** The relationship between NAOME SAPI DE CV (a Mexican _sociedad por
acciones promotora de inversión_) and NightTrader must be stated accurately. The press release
describes NightTrader as **"based in Zug, Switzerland."** A Mexican legal operator and a Swiss
operating base are not contradictory, but the page currently asserts neither clearly, and the
discrepancy should be resolved by the owner rather than guessed.

**Finding B-3 (P2).** The History section attributes BitHalo and BitBay to "the same team." This
could not be independently corroborated from code or public records within scope. It is presented
as the company's own account, which is acceptable framing, but it remains owner-attested.

---

## 3. Links

All outbound links were resolved. Results:

| URL                                                                                      | Status                    | Note                                                                                                                      |
| ---------------------------------------------------------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `airgap.it`, `bitbay.market`, `bithalo.org`, `zk.me`, both CoinDesk articles, Bitcoinist | 200                       | OK                                                                                                                        |
| `nighttrader.exchange`                                                                   | 200                       | OK                                                                                                                        |
| `bitcoin42.github.io`                                                                    | 200                       | OK                                                                                                                        |
| `github.com/NightTrader/...` (repo + PDF)                                                | 403 from this environment | Almost certainly egress filtering, **not** a broken link — the repo cloned successfully. Re-verify from a normal network. |
| `globenewswire.com/...`                                                                  | curl blocked              | Bot protection; the article **was** successfully retrieved via a browser-style fetch. Not broken.                         |

**Finding L-1 (P1).** The whitepaper is linked via a `github.com/.../blob/...` URL, which renders
GitHub's HTML viewer for a 260 KB PDF rather than the document. A `raw.githubusercontent.com` or
site-local copy would be more robust.

**Finding L-2 (P2).** The whitepaper PDF is **image-based** — no extractable text layer. It is
therefore not machine-readable, not searchable, and not accessible to screen readers.

**Finding L-3 (P1).** No link exists to the Terms, Privacy Policy or Cookie Policy that **already
exist** in production (see §8).

---

## 4. Accessibility

Scanned with **axe-core 4** at 1280×900 and 375×800, in light and dark themes.

**Finding A-1 (P0) — mobile navigation is entirely removed.** At 375 px, **all 8 section links are
hidden** (`nav a:not(.btn){display:none}` at ≤640 px) with **no replacement menu**. Mobile users
have no in-page navigation whatsoever. This is both a UX failure and a WCAG 2.4.5 (Multiple Ways)
concern.

**Finding A-2 (P0) — colour contrast, 10 elements.** Reproduces in every theme:

- `.kicker`, `#note-tag`, timeline `<em>` labels: Bitcoin-orange `#F7931A` on near-white
  `#FCFCFB` → **2.23:1** (needs 4.5:1). Orange-on-white at small sizes is the systemic cause.
- `.verify .k` labels and `.night .gut` detail: `#727B90` on `#0C1220` → **4.4:1** (needs 4.5:1) —
  marginal, fixable with a small lightness bump.

**Finding A-3 (P1) — no skip link.** Keyboard users must traverse the entire header on every load.

**Finding A-4 (P1) — no accessible name on `<nav>`.** No `aria-label`; screen-reader users get an
unlabelled navigation landmark.

**Finding A-5 (P1) — theme toggle label is untranslated.** `aria-label="Toggle color theme"` is
hard-coded English and is not updated when the language changes.

**Finding A-6 (P1) — copy button gives no accessible feedback.** `#bm-copy` mutates its own label
between "Copy"/"Copied"/"Select all" with no `aria-live` region, so the outcome is not announced.

**Finding A-7 (P1) — `scrollable-region-focusable` at mobile.** The horizontally scrollable
comparison table (`.wide`) is not keyboard-reachable.

**Finding A-8 (P2) — two empty `<th>` cells** (spacer headers in the custody and fees tables).

**Finding A-9 (P2) — heading order jumps.** Footer `<h4>` elements follow `<h2>` with no `<h3>`.

**Finding A-10 (P2) — no `scroll-margin-top`.** With a sticky header, anchor targets land beneath
it.

**Finding A-11 (P2) — no visible focus styling beyond the UA default** in some interactive
diagram controls; `:focus-visible` is defined globally but should be verified per control.

**Positive findings.** Diagrams correctly honour `prefers-reduced-motion`. RTL Arabic mirrors
properly. Interactive diagram controls are real `<button>` elements with `aria-pressed`. The
annotated-script note panel uses `aria-live="polite"`.

---

## 5. Mobile

- **Finding M-1 (P0).** See A-1 — navigation removed entirely below 640 px.
- **Finding M-2 (P2).** At 320 px the timeline labels wrap to 3–4 lines each; legible but cramped.
- **Positive.** No horizontal overflow at 320/375/414/480/640/768/900/1024/1440 px across all
  nine locales (verified in a prior pass, re-confirmed here).

---

## 6. SEO and internationalisation

**Finding S-1 (P0).** Duplicate content across two hosts with a canonical pointing at only one —
see D-1.

**Finding S-2 (P0) — no `hreflang`, no per-language URLs.** All nine languages are rendered
client-side into a single URL. Crawlers see **only English**; the eight translations are
effectively invisible to search engines. There is no `?lang=` in the URL after switching, so a
translated page cannot be linked or shared.

**Finding S-3 (P1).** On language change, only body text is swapped. `document.title`,
`meta description`, `og:title`, `og:description`, `twitter:*` and JSON-LD remain **English in every
locale**.

**Finding S-4 (P1).** `sitemap.xml` lists a single URL with a hard-coded `<lastmod>2026-08-13</lastmod>`
that will silently rot.

**Finding S-5 (P2).** `og:locale` is fixed to `en_US` regardless of the active language.

**Positive.** English renders fully with JavaScript disabled — a genuine no-JS baseline exists.
`lang`/`dir` are set pre-paint, avoiding a flash.

---

## 7. Security and cryptographic claims

Detailed claim-by-claim evidence is in **[CLAIMS.md](./CLAIMS.md)**. Summary:

**Finding C-1 (P0).** **Zero** of the cryptographic/custody claims can be verified from any source
the page links to, because the linked repository contains no signing implementation (see D-6).
Categorical wording — _never_, _cannot_, _only_, _nothing_, _every_, _strictly better_, _no exit to
scam_ — is therefore unsupported.

**Finding C-2 (P0) — technically incorrect timelock description.** The page says CLTV "fires on
schedule" and "the address pays out to your key alone" / "automatically pays." **Bitcoin has no
mechanism that spends an output automatically.** `OP_CHECKLOCKTIMEVERIFY` only makes a branch
_spendable after_ a time threshold; someone must still construct, sign and broadcast the recovery
transaction. This is not a nuance — it materially misstates what a user must do to recover funds,
and it is the page's central safety promise.

**Finding C-3 (P0) — "since 2009" is factually wrong.** The page says the construction is built
from "script primitives Bitcoin has had since 2009." `OP_CHECKMULTISIG` and the sighash flags date
from 2009, but **P2SH is BIP16 (2012)** and **`OP_CHECKLOCKTIMEVERIFY` is BIP65, activated December
2015**. The described construction could not have existed in 2009.

**Finding C-4 (P1) — SIGHASH_SINGLE is overstated.** "Bid 0.2 BTC out of a 10 BTC balance and
0.2 BTC is all you have signed away" describes an outcome that depends on the **entire transaction
template** (which inputs are committed, change handling, and the exact sighash flags, including
whether `ANYONECANPAY` is set). `SIGHASH_SINGLE` alone does not bound exposure to the order amount;
it commits to one corresponding output while **still committing to all inputs**. Without the
production transaction builder this cannot be assessed at all.

**Finding C-5 (P1) — third-party dependency claims.** AirGap Vault compatibility, "compatible
hardware wallet" support, and zkMe performing document checks **entirely on-device** are assertions
about third parties. None can be confirmed from this repository.

**Finding C-6 (P0) — fee figures contradict the company's own press release.** The page states
**0.125 %** per completed trade. The GlobeNewswire launch release (2025-09-08) that this page cites
states **"low fees starting at 0.25 %."** One of the two is wrong.

**Finding C-7 (P1) — competitor fee table is unsourced.** Uniswap / Coinbase / Kraken / Bitfinex /
Binance / KuCoin figures carry no source, no as-of date, and no tier/product/pair assumptions.
Exchange fee schedules are tiered and change frequently; presenting single numbers as current is
not defensible.

**Finding C-8 (P2) — "no third-party requests" is VERIFIED.** Instrumented page load contacts
exactly one host (the origin). No fonts, analytics, or CDN. This claim is accurate and should be
retained.

**Finding C-9 (P1) — architecture is co-custodial, not self-custody.** The page's own Tradeoffs
section says so honestly ("This is not self-custody… co-custody with a timelocked exit"), but the
hero's "Not your keys, not your coins / so we gave you a key" reads as self-custody. The honest
framing should be promoted to the hero, not buried.

---

## 8. Legal and privacy documents

**Finding LG-1 (P0).** The page links to **no** Terms, Privacy Policy, Cookie Policy or risk
disclosure. Its only "Legal" footer entry is an in-page anchor to the Tradeoffs section.

**Finding LG-2 (P1).** Real documents **already exist** in production and are simply not linked:

- `https://nighttrader.exchange/tandc.html`
- `https://nighttrader.exchange/privacy.html`
- `https://nighttrader.exchange/cookiepolicy.html`

These should be linked rather than recreated. **OWNER** must confirm each is current and applies to
this landing page.

**Finding LG-3 (P1) — MISSING, no source found.** No AML/KYC policy and no security/vulnerability
disclosure policy could be located. The page discusses KYC (via zkMe) without linking a policy.
→ **TODO (owner):** publish or link an AML/KYC policy and a security disclosure contact.

**Finding LG-4 (P1) — legal self-characterisation.** The footer asserts the service "is not a bank,
a broker, a custodian or an investment service." Whether that holds is a **regulatory conclusion**
that depends on jurisdiction and on the actual custody arrangement — which, per §7, is co-custodial.
This must be confirmed by counsel; it is not a claim this audit can validate.
→ **Human legal review required.**

**Finding LG-5 (P2).** `my.nighttrader.exchange` returned **HTTP 451 (Unavailable For Legal
Reasons)** from this environment, suggesting jurisdictional access restrictions. The landing page
says nothing about geographic availability.
→ **OWNER:** confirm whether restrictions exist and whether they must be disclosed.

---

## 9. Performance and hygiene

- **Finding P-1 (P1).** `i18n.js` is **207 KB unminified** and render-affecting; all nine locales
  ship to every visitor. Splitting to `locales/{lang}.json` loads ~1/9 of the payload.
- **Finding P-2 (P1).** `index.html` is **60 KB** with ~450 lines of inline CSS — uncacheable
  separately from content.
- **Finding P-3 (P2).** `.DS_Store` is committed.
- **Finding P-4 (P1).** Translations are injected with `innerHTML`. Today the strings are authored
  in-repo, so this is not an active vulnerability, but it is an unnecessary sink — an XSS foothold
  the moment any string becomes externally sourced.
- **Finding P-5 (P2).** `og-image.png` is 76 KB (fine); favicons are appropriately sized.

---

## 10. Remediation list

### P0 — correctness, trust, and access

| #     | Item                                                                                                                                                                              | Ref        |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| P0-1  | Correct all timelock wording: CLTV makes a branch _spendable_; it does not auto-pay                                                                                               | C-2        |
| P0-2  | Remove "since 2009"; name the actual primitives without a false date                                                                                                              | C-3        |
| P0-3  | Fix or remove the "read the signing logic / key derivation" invitation — the linked repo has none                                                                                 | D-6        |
| P0-4  | Resolve the fee contradiction (0.125 % vs 0.25 %) — **OWNER**                                                                                                                     | C-6        |
| P0-5  | Remove or source the competitor fee table                                                                                                                                         | C-7        |
| P0-6  | Soften unsupported absolutes (never/cannot/only/nothing/every/strictly better/no exit to scam)                                                                                    | C-1        |
| P0-7  | Decide canonical domain and align every metadata surface — **OWNER**                                                                                                              | D-1, D-2   |
| P0-8  | Restore mobile navigation                                                                                                                                                         | A-1, M-1   |
| P0-9  | Fix colour contrast (10 elements)                                                                                                                                                 | A-2        |
| P0-10 | Label the architecture co-custodial near the hero                                                                                                                                 | C-9        |
| P0-11 | Link the existing Terms / Privacy / Cookie policies                                                                                                                               | LG-1, LG-2 |
| P0-12 | Merge this PR to `master` and confirm `bitcoin42.com` serves current content — **OWNER** (build verified green on this branch's preview deploy; production only updates on merge) | D-7        |

### P1 — integrity, SEO, accessibility

| #     | Item                                                                                                         | Ref           |
| ----- | ------------------------------------------------------------------------------------------------------------ | ------------- |
| P1-1  | Represent language in the URL; add `hreflang`; localise `title`/meta/OG per locale                           | S-2, S-3      |
| P1-2  | Skip link, `<nav>` accessible name, translated theme label, `aria-live` copy status, focusable scroll region | A-3…A-7       |
| P1-3  | Bound the SIGHASH claim to the actual transaction template                                                   | C-4           |
| P1-4  | Attribute third-party claims (AirGap, hardware wallets, zkMe) as vendor statements                           | C-5           |
| P1-5  | Explain NightTrader / bitcoin42 / NAOME SAPI DE CV relationship — **OWNER**                                  | B-1, B-2      |
| P1-6  | Add CI: HTML validation, link check, locale parity, axe, claim-wording regression                            | D-4           |
| P1-7  | Split CSS/JS/locales; stop using `innerHTML` for plain text                                                  | P-1, P-2, P-4 |
| P1-8  | Publish/link AML-KYC and security disclosure policies — **OWNER**                                            | LG-3          |
| P1-9  | Confirm legal self-characterisation with counsel — **OWNER**                                                 | LG-4          |
| P1-10 | Link whitepaper to a raw/hosted PDF, not the GitHub blob viewer                                              | L-1           |

### P2 — polish

| #    | Item                                                                                   | Ref      |
| ---- | -------------------------------------------------------------------------------------- | -------- |
| P2-1 | Remove `.DS_Store`; add `.gitignore`                                                   | P-3      |
| P2-2 | Fix empty `<th>`, heading order, `scroll-margin-top`                                   | A-8…A-10 |
| P2-3 | Per-locale `og:locale`; generate `sitemap.xml` `lastmod`                               | S-4, S-5 |
| P2-4 | Commit a `CNAME` if Pages uses a custom domain                                         | D-3      |
| P2-5 | Document GitHub Pages header limitations; add headers at Cloudflare if it is canonical | D-5      |
| P2-6 | Provide a text-layer whitepaper PDF                                                    | L-2      |
| P2-7 | Disclose geographic availability if restrictions exist — **OWNER**                     | LG-5     |

---

## 11. Open questions for the owner

These block work and must not be answered by guessing:

1. **Canonical domain** — is it `bitcoin42.com`, `bitcoin42.github.io`, or is this a satellite page
   for `nighttrader.exchange`? (D-2)
2. **Fees** — which is correct: 0.125 % or the press release's 0.25 %? What are the current
   transfer and withdrawal fees, and as of what date? (C-6)
3. **Signing source** — is any part of the signing/key-derivation implementation public? If not,
   the "read the source before you deposit" invitation must be reworded. (D-6)
4. **Recovery flow** — after locktime, what exactly must a user do? Is a recovery tool provided, or
   must they hand-build the transaction? (C-2)
5. **Entity relationships** — how do NightTrader, bitcoin42 and NAOME SAPI DE CV relate, and where
   is the operating entity domiciled (Zug vs Mexico)? (B-1, B-2)
6. **Legal documents** — are the production Terms/Privacy/Cookie policies current and applicable to
   this page? Do AML/KYC and security-disclosure policies exist? (LG-2, LG-3)
7. **Availability restrictions** — does the 451 on `my.nighttrader.exchange` reflect deliberate
   geo-blocking that should be disclosed? (LG-5)
8. **Translations** — is there budget/route for professional review of security-critical strings in
   eight languages? Corrected English will otherwise be used as a placeholder. (see
   `TRANSLATION_REVIEW.md` once Phase 2 lands.)

---

## 12. Required human review

| Area              | Why                                                                                                  |
| ----------------- | ---------------------------------------------------------------------------------------------------- |
| **Legal**         | LG-4 (broker/custodian/investment-service characterisation), LG-2 applicability, LG-5 geo-disclosure |
| **Cryptographic** | Every claim in CLAIMS.md marked _unverified_; the recovery flow in particular                        |
| **Translation**   | All security-critical wording changed in Phase 2, across 8 non-English locales                       |
