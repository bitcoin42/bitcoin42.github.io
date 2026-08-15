# NightTrader landing page

A static marketing site for **NightTrader**, published by **bitcoin42**. Two pages, one shared
design system and one shared dictionary:

| Page             | Audience                                                         | URL               |
| ---------------- | ---------------------------------------------------------------- | ----------------- |
| `index.html`     | Readers who already know Bitcoin — the technical landing page.   | `/`               |
| `beginners.html` | Readers who do not. Plain English, no jargon, risks spelled out. | `/beginners.html` |

Each links to the other from its nav, its hero and its footer.

No framework, no build step required to serve, and **no third-party requests at runtime** — no
webfonts, no analytics, no CDN. That last property is a deliberate product claim made on the page
itself, and it is enforced by a test (see [Testing](#testing)).

---

## Domains and canonical URL

| Domain                    | Role                                                                | Served by    |
| ------------------------- | ------------------------------------------------------------------- | ------------ |
| **`bitcoin42.com`**       | **Canonical.** The published address of this page.                  | Cloudflare   |
| `bitcoin42.github.io`     | Mirror of the same content, from this repository.                   | GitHub Pages |
| `nighttrader.exchange`    | **A different site** — the NightTrader product site. Not this repo. | —            |
| `my.nighttrader.exchange` | The exchange application itself. Source is not public.              | —            |

`bitcoin42.com` is canonical. Every metadata surface points at it — `<link rel="canonical">`,
`og:url`, `og:image`, `twitter:image`, JSON-LD `@id`/`url`, `manifest.webmanifest`
(`id`/`start_url`/`scope`/icons), `robots.txt` and `sitemap.xml`.

The GitHub Pages copy is left reachable but carries the same canonical tag pointing at
`bitcoin42.com`, so search engines consolidate on the canonical host rather than treating the two
as duplicates.

> **Note for maintainers.** There is intentionally **no `CNAME` file** in this repository.
> `bitcoin42.com` is served through Cloudflare, not GitHub Pages. Adding a `CNAME` would make Pages
> attempt to claim the domain and would conflict with the Cloudflare deployment.

> ⚠️ **The canonical domain went stale, cause identified and fixed.** Adding `package.json` for
> the CI quality gates made the Cloudflare Workers Build `afmhahn-bitcoin` install `node_modules`
> inside the directory it uploads as static assets. Wrangler's own 144 MiB `workerd` runtime
> binary ended up in that directory and exceeded the 25 MiB per-file asset limit, failing every
> deploy. Two repo-side fixes were needed: `.assetsignore` (excludes `node_modules`, `.git`,
> `.DS_Store` — what Cloudflare Pages does automatically and Workers does not), and
> `wrangler.jsonc` (declares `assets.directory`, without which the project's deploy command had no
> assets directory to apply `.assetsignore` to in the first place). Both fixes verified: the
> Cloudflare build for this branch now succeeds and its preview deployment serves the corrected
> content. **`bitcoin42.com` itself won't update until this branch merges to `master`** — Cloudflare
> only promotes the production branch to the production domain; PR-branch builds are previews only.
> See `AUDIT.md` finding D-7 for the full evidence trail, and re-verify `bitcoin42.com` after merge.

## Brand and entity relationships

- **NightTrader** — the exchange/product.
- **bitcoin42** — the team behind it, operating since 2014 (originally Bitcoin ATMs in Tijuana);
  publisher of this page.
- **NAOME SAPI DE CV** — the legal operator named in the site's legal notice.

Legal documents (Terms, Privacy, Cookie policy) are published on the product site at
`nighttrader.exchange` and are linked from this page's footer rather than duplicated here.

---

## Repository layout

```
index.html                 # technical landing page (English content is the no-JS baseline)
beginners.html             # plain-English guide (same, and same header/footer)
assets/site.css            # shared styles: theme tokens, header, nav, footer, landing page
assets/beginners.css       # beginner-page layout + the six explainer figures
assets/site.js             # theme, i18n, diagram interaction — loaded by both pages
assets/beginners.js        # two-key safe demo + recovery-timer and balance figures
locales/{lang}.json        # nine locales, one dictionary shared by both pages
AUDIT.md                   # technical/content audit
CLAIMS.md                  # per-claim evidence matrix
TRANSLATION_REVIEW.md      # locales/keys awaiting professional review
SECURITY.md                # static-site security posture
.assetsignore              # excludes node_modules/.git/.DS_Store from the Cloudflare asset upload
wrangler.jsonc              # tells the Cloudflare Workers deploy command where the assets are
```

`wrangler.jsonc` exists solely to point the already-configured Cloudflare deploy command at this
repo's assets — it declares no routes, bindings, or Worker script, and does not change how
`bitcoin42.com` is routed. See `AUDIT.md` finding D-7.

## Development

```bash
npm install          # dev dependencies only; nothing ships to production
npm start            # serve locally on :8080
```

### Testing

```bash
npm test             # everything below
npm run lint         # ESLint + Prettier check
npm run test:html    # HTML validation
npm run test:locales # locale key parity, empty strings, duplicates
npm run test:claims  # claim-wording regression (see below)
npm run test:a11y    # axe-core accessibility checks
npm run test:e2e     # Playwright smoke tests
npm run test:links   # internal links + required assets
```

**`test:claims` is a content guard, not a style check.** It fails the build if wording that was
corrected for technical accuracy reappears in _any_ locale or on _either_ page — specifically any phrasing implying the
timelock pays out automatically (it does not; see below), or the false claim that the construction
uses primitives Bitcoin has had "since 2009".

### Accuracy rules that the tests enforce

1. **The timelock does not pay anyone automatically.** `OP_CHECKLOCKTIMEVERIFY` makes a branch
   _spendable_ after a threshold. The user, or a recovery tool, must still construct and broadcast
   the recovery transaction. Copy must never imply otherwise.
2. **No false dating of primitives.** P2SH is BIP16 (2012); CLTV is BIP65 (activated December
   2015). Do not claim the construction predates them.
3. **No unsourced competitor fee figures.** Any competitor number needs an official source, an
   as-of date, and the tier/product/pair assumptions — otherwise keep the comparison qualitative.
4. **Security-critical strings are not machine-translated.** See `TRANSLATION_REVIEW.md`.
5. **Recovery is never described as automatic.** Beyond the wording rule above, `test:e2e` drives
   both the beginner page's safe demo _and_ its recovery-timer figure into their timelock states
   and asserts each explanation avoids payout verbs and tells the reader they must act. The timer
   figure exists specifically to make that distinction visible: its final stage empties the gauge
   but the copy states the coins have not moved.

### Adding a page

The i18n engine is page-agnostic, so a new page needs only: `data-i18n` attributes, the same
pre-paint bootstrap in `<head>`, `window.__ntMeta` naming its own title/description keys (or it
will inherit the landing page's), and its path added to `PAGES` in `tests/links.test.js` and
`tests/locales.test.js`, the context list in `tests/a11y.test.js`, and `test:html` in
`package.json`. Keys used only from JavaScript are fine — the locale test looks in the scripts
too before calling a key orphaned.

Before changing any technical claim, read `CLAIMS.md`. Claims marked _unverified_ there are not
confirmed by any public source and must stay hedged until an owner confirms them.

## Contributing

- No frontend framework, and no third-party runtime requests. Both are product commitments.
- Preserve the editorial look: serif display, mono data, Bitcoin orange accent, light/dark parity.
- Keep English complete in `index.html` so the page works with JavaScript disabled.
- Run `npm test` before opening a PR; CI runs the same suite.

## Security

See [SECURITY.md](./SECURITY.md) for the static-site security posture, including GitHub Pages'
inability to set response headers and where headers are actually applied.
