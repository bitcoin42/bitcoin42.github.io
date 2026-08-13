# NightTrader landing page

A static, single-page marketing site for **NightTrader**, published by **bitcoin42**.

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

> ⚠️ **The canonical domain is currently stale.** The Cloudflare Workers Build `afmhahn-bitcoin`
> is failing, so `bitcoin42.com` still serves a pre-August-2026 copy of this page — including
> wording about the recovery timelock that was corrected as factually wrong. This repository
> contains no Cloudflare configuration (no `wrangler.toml`, `_headers` or `_redirects`); the build
> is configured in the Cloudflare dashboard and must be fixed there. See `AUDIT.md` finding D-7.
> **There is no build step here** — the site is served straight from the committed files, so the
> Workers project should have an empty build command.

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
index.html                 # the page (English content is the no-JS baseline)
assets/site.css            # all styles
assets/site.js             # theme, i18n, diagram interaction
locales/{lang}.json        # nine locales
AUDIT.md                   # technical/content audit
CLAIMS.md                  # per-claim evidence matrix
TRANSLATION_REVIEW.md      # locales/keys awaiting professional review
SECURITY.md                # static-site security posture
```

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
corrected for technical accuracy reappears in _any_ locale — specifically any phrasing implying the
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
