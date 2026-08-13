# Translation Review Required

**Raised:** 2026-08-13 (Phase 2 content correction)
**Status:** ⚠️ **8 locales are currently showing English for 33 keys.** This is deliberate.

---

## Why these strings are in English

Phase 2 corrected wording that misstated how the recovery timelock works, how signature-hash
bounding works, and what can be verified about the system. That wording is **security-critical**:
a subtle mistranslation could tell a user in their own language that funds return to them
automatically when in fact they must construct and broadcast a recovery transaction themselves.

The engagement rule is explicit — *do not machine-invent translations* for corrected
security-sensitive wording. No professionally reviewed translations were available. Corrected
**English** was therefore written into all nine locales as a safe placeholder, in preference to
machine-translated text that would read fluently while being wrong.

**The previous non-English text for these keys was itself machine-generated and, for the timelock
keys, described behaviour Bitcoin does not have. Restoring it would be worse than the English
placeholder.** The prior wording is recoverable from git history at `52b0a62` if a translator
wants it as reference — but it should be treated as a source of *terminology*, not of meaning.

---

## Locales awaiting review

`zh` · `ru` · `es` · `pt` · `it` · `ar` · `fr` · `de` — all eight non-English locales, all 33 keys
below.

`en` is complete and is the source of truth for this review.

---

## Keys requiring human translation

### Tier 1 — safety-critical (a mistranslation here can cause loss of funds)

These describe what a user must actually **do** to recover funds. Translate meaning, not phrasing.

| Key | What it must convey |
|---|---|
| `timelock.step_locktime` | After the locktime the recovery branch *becomes spendable*; the user (or a tool) must **construct and broadcast** the transaction. Nothing happens by itself. |
| `script.note_exit` | Same as above, in the redeem-script annotation. |
| `timelock.l4` | "Locktime → **recoverable with** your key" — not "paid to". |
| `how.s4_p` | Locktime is *designed to be* refreshed while trading; if trading stops the branch *becomes spendable*, user broadcasts. |
| `custody.row3_us` | "Timelock **lets you recover**" — not "returns". |
| `privacy.p3` | A frozen account does not put coins beyond reach; the branch remains **spendable with the user's key**. |
| `tradeoffs.t4_dd` | Same, plus zkMe attribution ("according to zkMe"). |
| `timelock.small` | Refresh is design intent; consensus enforces the branch **once such an output exists**. |
| `timelock.step_trade`, `timelock.step_inactive`, `timelock.step_deposit` | Countdown/refresh semantics. |

> **Translator note.** In every language, avoid verbs implying autonomous payment
> (自动支付 / автоматически выплачивает / paga automáticamente / paie automatiquement /
> zahlt automatisch aus / يدفع تلقائياً …). Bitcoin scripts do not initiate transactions.
> The correct sense is **"becomes spendable / can then be claimed by the user."**

### Tier 2 — accuracy-critical (overclaiming risk)

| Key | What it must convey |
|---|---|
| `hero.answer` | "**By design**, the exchange cannot move funds without it" — design intent, not a proven guarantee. |
| `hero.architecture` | **New string.** "Co-custodial during trading, with a time-delayed user recovery path." Must not read as self-custody. |
| `hero.kicker`, `hero.cta_note` | "Co-custodial" — previously "Non-custodial". The distinction is the point; do not smooth it away. |
| `hero.lede` | "No exit to scam" was removed. Do not reintroduce an equivalent absolute. |
| `script.hint`, `how.s2_p`, `custody.row6_us` | Authorisation is **bounded by the transaction template and sighash mode** — not by a named opcode alone. |
| `how.s3_p`, `script.note_nodekey` | Threshold signature is *intended* to prevent single-operator reconstruction. |
| `script.note_yourkey`, `custody.viz_caption_nt`, `custody.viz_note_nt` | "**designed never** to leave/be transmitted" — not a bare "never". |
| `tradeoffs.t1_dd` | "**materially different from** / **materially weaker than**" — "strictly better" was removed. |
| `custody.h2` | "**One** of them" — was "Only one of them". |
| `custody.small` | Names the primitives with **no date claim**. Must not reintroduce "since 2009". |
| `custody.viz_note_cex` | Competitor framing softened to governance/solvency language. |
| `verify.li_source_v` | Must state plainly that **signing and key-derivation code is not in that repository**. |
| `privacy.p2` | zkMe claims must be **attributed to zkMe**, not asserted as fact. |
| `controls.c1_p` | Hardware-wallet support qualified; users told to ask which devices are supported. |
| `fees.compare_h`, `fees.compare_note` | **New strings** replacing the unsourced competitor fee table. |

### Tier 3 — added during Phases 3–5 (English placeholders)

New strings introduced after the original corrections. Same rule: English placeholder until
reviewed.

| Key | Notes for translator |
|---|---|
| `meta.title`, `meta.description` | **Page `<title>` and meta description**, now swapped per language. These are what search engines and social cards show — worth translating well rather than literally. Keep the title under ~60 characters. |
| `footer.entities` | Explains that NightTrader is the exchange, bitcoin42 the team, NAOME SAPI DE CV the legal operator. Keep entity names untranslated. |
| `footer.link_terms`, `footer.link_privacy`, `footer.link_cookies` | Footer link labels. The linked documents themselves are English-only — consider noting that in-language if your locale expects it. |
| `fees.asof` | "Fees shown as of August 2026…" — the date must stay accurate; update it when fees are re-confirmed. |
| `footer.legal_p1` | **Legal disclaimer.** Now says *co-custodial*, not *non-custodial*. Do not soften that back. Pending counsel review (CLAIMS.md G1) — translate only after the English is signed off. |
| `a11y.skip`, `a11y.nav_primary`, `a11y.nav_menu`, `a11y.nav_menu_label`, `a11y.theme_toggle`, `a11y.col_criterion`, `a11y.table_region` | **Screen-reader labels.** Never displayed visually. Use the conventional phrasing your locale's screen-reader users expect, not a literal translation. |
| `a11y.copy_ok`, `a11y.copy_fallback` | Announced after the copy button is pressed. Keep short. |

---

## Instructions for the translator

1. Translate from the **English in `i18n.js` (`T.en`)** as it stands after this change — not from
   the previous non-English text and not from the whitepaper.
2. Preserve inline markup exactly: `<a href="…">…</a>`, `<br>`, `<em>…</em>`. Do not add markup.
3. Preserve technical identifiers untranslated: `OP_CHECKLOCKTIMEVERIFY`, `CHECKLOCKTIMEVERIFY`,
   `2-of-2`, `3-of-3`, `BTC`, `zkMe`, `AirGap Vault`, `NightTrader`.
4. Keep the register of the page: plain, declarative, non-promotional.
5. For Arabic, the layout mirrors automatically; write natural RTL prose and do not attempt visual
   ordering tricks.
6. Do **not** restore any construction implying automatic payment (see the translator note above).

## Verification once translations land

```bash
npm run test:locales   # key parity + empty-string + duplicate detection
npm run test:claims    # fails if auto-payment wording reappears in ANY locale
```

The claim-wording regression test is the guard rail here: it scans every locale for
auto-payment phrasing and for "since 2009", and fails the build if either returns.

---

## Sign-off

| Locale | Reviewer | Date | Tier 1 ✔ | Tier 2 ✔ |
|---|---|---|---|---|
| zh | | | ☐ | ☐ |
| ru | | | ☐ | ☐ |
| es | | | ☐ | ☐ |
| pt | | | ☐ | ☐ |
| it | | | ☐ | ☐ |
| ar | | | ☐ | ☐ |
| fr | | | ☐ | ☐ |
| de | | | ☐ | ☐ |
