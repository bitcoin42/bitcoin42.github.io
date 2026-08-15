# Translation Review

**Raised:** 2026-08-13 (Phase 2 content correction)
**Updated:** 2026-08-15 — beginner's guide added, then the remaining 89 English-placeholder keys
translated into all eight locales at the owner's explicit request. Six explainer figures were then
added to the beginner's guide, contributing **59 further keys**, translated the same way.
**Status:** ✅ **No locale shows English placeholders for corrected content anymore.** The 89 keys
listed below were machine-translated on 2026-08-15 by Claude Code, on direct owner instruction,
following the same wording rules Phase 2 established. This is **not** the professionally reviewed,
native-speaker sign-off the original policy called for — see [Why this changed](#why-this-changed)
below. Native review remains recommended and is tracked in the [sign-off table](#sign-off).

---

## Why these strings were originally held in English

Phase 2 corrected wording that misstated how the recovery timelock works, how signature-hash
bounding works, and what can be verified about the system. That wording is **security-critical**:
a subtle mistranslation could tell a user in their own language that funds return to them
automatically when in fact they must construct and broadcast a recovery transaction themselves.

The engagement rule was explicit — _do not machine-invent translations_ for corrected
security-sensitive wording without professional review. Since none was available, corrected
**English** was written into all eight locales as a safe placeholder, in preference to
machine-translated text that would read fluently while being wrong.

**The previous non-English text for these keys was itself machine-generated and, for the timelock
keys, described behaviour Bitcoin does not have.** It is recoverable from git history at `52b0a62`
if a translator wants it as reference — but should be treated as a source of _terminology_, not of
meaning.

## Why this changed

On 2026-08-15 the site owner asked directly, in these words: _"there is still some english on the
other language pages correct that please."_ That is an explicit instruction from the person the
original caution was protecting, overriding the default of leaving safety-critical wording in
English pending professional review. The translation was done by Claude Code — the same author as
the corrected English — applying the identical rules used throughout the rest of the site (see
[Rules that were followed](#rules-that-were-followed)), rather than inventing new phrasing. It is
still **machine translation**, not native-speaker review, so the sign-off table below is not
closed out — it now tracks a proofreading pass rather than a from-scratch translation.

---

## Rules that were followed

Every one of the 89 keys below was translated under these constraints, matching Phase 2 exactly:

1. **No verb implying autonomous payment**, in any language (自动支付 / автоматически выплачивает /
   paga automáticamente / paie automatiquement / zahlt automatisch aus / يدفع تلقائياً …). Bitcoin
   scripts do not initiate transactions. The timelock changes **permission**; the user (or a tool
   acting for them) still constructs and broadcasts the recovery transaction. Enforced by
   `npm run test:claims`, which scans every locale file for this pattern.
2. **"By design" / "designed to", not a bare guarantee.** "By design, we cannot move a coin
   without your key" — design intent, not a claim this repository can prove.
3. **"Materially different from" / "materially weaker than"** — never "strictly better".
4. **Third-party claims attributed**, not asserted as fact — zkMe statements read "according to
   zkMe" / "zkMe 稱" / "بحسب zkMe" etc. in every locale.
5. **No date claims for cryptographic primitives** — never reintroduces "since 2009" (P2SH is
   BIP16/2012, CLTV is BIP65/2015).
6. **Technical identifiers preserved untranslated**: `OP_CHECKLOCKTIMEVERIFY`,
   `CHECKLOCKTIMEVERIFY`, `2-of-2`/`3-of-3` (translated to the locale's own number-pattern
   convention where that's how the locale already renders it, e.g. 2-من-2), `BTC`, `zkMe`,
   `AirGap`/`AirGap Vault`, `NightTrader`.
7. **Inline markup preserved exactly** — `<a href="…">`, `<br>`, `<em>`, `<strong>` — no markup
   added or removed.

---

## Keys translated 2026-08-15 (89 total)

Grouped by where they were already documented. Each key's **English source** is in
`locales/en.json` — that remains the source of truth for what the translation should mean.

### Landing page — safety-critical (timelock/recovery mechanics)

`timelock.step_locktime`, `script.note_exit`, `timelock.l4`, `how.s4_p`, `custody.row3_us`,
`privacy.p3`, `tradeoffs.t4_dd`, `timelock.small`, `timelock.step_trade`,
`timelock.step_inactive`, `timelock.step_deposit`

### Landing page — accuracy-critical (overclaiming risk)

`hero.answer`, `hero.architecture`, `hero.kicker`, `hero.cta_note`, `hero.lede`, `script.hint`,
`how.s2_p`, `custody.row6_us`, `how.s3_p`, `script.note_nodekey`, `script.note_yourkey`,
`custody.viz_caption_nt`, `custody.viz_note_nt`, `tradeoffs.t1_dd`, `custody.h2`, `custody.small`,
`custody.viz_note_cex`, `verify.li_source_v`, `privacy.p2`, `controls.c1_p`, `fees.compare_h`,
`fees.compare_note`

### Landing page — metadata, footer, accessibility labels

`meta.title`, `meta.description`, `footer.entities`, `footer.link_terms`, `footer.link_privacy`,
`footer.link_cookies`, `fees.asof`, `footer.legal_p1`, `a11y.skip`, `a11y.nav_primary`,
`a11y.nav_menu`, `a11y.nav_menu_label`, `a11y.theme_toggle`, `a11y.col_criterion`,
`a11y.table_custody`, `a11y.copy_ok`, `a11y.copy_fallback`

### Beginner's guide (`beginners.html`) — safety-critical

`bg.net_p2`, `bg.net_p3`, `bg.net_p4`, `bg.net_card`, `bg.safe_w_timer_you`, `bg.safe_w_both`,
`bg.safe_w_us_alone`, `bg.safe_w_you_alone`, `bg.safe_w_ourkey_dead`, `bg.safe_w_timer_only`,
`bg.safe_v_open_you`, `bg.warn_1_p`–`bg.warn_7_p` (7 keys), `bg.how_s1_p`, `bg.how_s2_p`,
`bg.how_s3_p`, `bg.how_s4_p`, `bg.hero_p1`, `bg.vs_nt_3`, `bg.vs_nt_4`, `bg.vs_nt_5`,
`bg.priv_p2`, `bg.priv_card`, `bg.extra_1_p`, `bg.extra_2_p`, `bg.gloss_3_d`, `bg.gloss_5_d`,
`bg.gloss_8_d`, `bg.fees_asof`, `bg.meta.title`, `bg.meta.description`, `bg.vs_nt_h` (brand name,
correctly identical across locales)

Full machine-checkable list: the diff at commit adding this update touches exactly these keys
across `locales/{de,fr,es,it,pt,ru,zh,ar}.json`.

**Not part of this pass — already had real translations, left untouched:** the other 104 `bg.*`
keys (navigation, glossary, comparison table, fee labels) added with the beginner's guide on
2026-08-14, and the ~150 landing-page keys that were translated in the original Phase 3–6 work.

### Explainer figures on the beginner's guide (added 2026-08-15)

Six diagrams were added to `beginners.html`, contributing 59 keys under `bg.viz_*`. All are
translated in all eight locales under the same rules. Two groups deserve a careful read:

| Keys                                                             | Why they matter                                                                                                                                                                                                                                                         |
| ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `bg.viz_timer_*` (18 keys)                                       | The recovery-timer figure. `bg.viz_timer_note_4` and `bg.viz_timer_cap` are the safety-critical ones: stage 4 grants **permission**, and the user still builds and broadcasts. Never a payout verb. An e2e assertion checks the English; translations need a human eye. |
| `bg.viz_proof_*` (9 keys)                                        | The zkMe figure. `bg.viz_proof_cap` must keep the attribution — it is their described design, not something we verify.                                                                                                                                                  |
| `bg.viz_appr_*`, `bg.viz_pool_*`, `bg.viz_gap_*`, `bg.viz_fee_*` | Balance, pooled-custody, air-gap and fee figures. Mostly short labels; keep them short so they fit the diagram boxes at 320px.                                                                                                                                          |

`bg.viz_timer_scale_lock` is deliberately **"Locktime" in every locale** — a preserved technical
identifier, matching how `timelock.l4` already keeps it untranslated site-wide.

---

## Instructions for a human reviewer

1. Compare each translation against the **English in `locales/en.json`** — that is the source of
   truth, not the pre-Phase-2 wording and not the whitepaper.
2. Check specifically for the seven rules above; `npm run test:claims` catches only the
   auto-payment pattern and "since 2009" automatically, in Latin-script text — it cannot verify
   correct meaning in translation, only the presence of specific banned English phrases.
3. Confirm inline markup survived: `<a href="…">…</a>`, `<br>`, `<em>…</em>`, `<strong>…</strong>`.
4. For Arabic, confirm the RTL layout still reads naturally — the layout mirrors automatically via
   `dir="rtl"`, but word order and idiom need a native check.
5. Sign off per-locale in the table below once reviewed.

## Verification

```bash
npm run test:locales   # key parity + empty-string + duplicate detection
npm run test:claims    # fails if auto-payment wording (or "since 2009") reappears in ANY locale
```

---

## Sign-off

| Locale | Machine translation | Native review | Reviewer | Date |
| ------ | ------------------- | ------------- | -------- | ---- |
| zh     | ✅ 2026-08-15       | ☐             |          |      |
| ru     | ✅ 2026-08-15       | ☐             |          |      |
| es     | ✅ 2026-08-15       | ☐             |          |      |
| pt     | ✅ 2026-08-15       | ☐             |          |      |
| it     | ✅ 2026-08-15       | ☐             |          |      |
| ar     | ✅ 2026-08-15       | ☐             |          |      |
| fr     | ✅ 2026-08-15       | ☐             |          |      |
| de     | ✅ 2026-08-15       | ☐             |          |      |
