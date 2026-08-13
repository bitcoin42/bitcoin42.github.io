# Security posture — static site

This document covers **this landing page only**. It is not a statement about the security of the
NightTrader exchange, whose implementation is not in this repository (see `AUDIT.md` §1.2).

## Reporting

Security issues with **this page**: email `ceo@nighttrader.org`.

> **TODO (owner):** no dedicated security/vulnerability disclosure policy or contact for the
> *exchange* could be located. One should exist and be linked here. Tracked as AUDIT.md LG-3.

## What this site is

A static HTML/CSS/JS page. No backend, no build step, no framework, no cookies, no analytics, no
authentication, no user input, and no user data is collected or transmitted by this page.

## Response headers

**GitHub Pages cannot set custom response headers.** No `Content-Security-Policy`,
`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` or `X-Frame-Options` can be
applied to the `bitcoin42.github.io` mirror. This is a platform limitation with no workaround.

The canonical host, **`bitcoin42.com`, is served through Cloudflare**, which *can* set headers.
Recommended baseline there:

```
Content-Security-Policy: default-src 'none'; script-src 'self' 'unsafe-inline'; style-src 'self'; img-src 'self' data:; connect-src 'self'; manifest-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'
Referrer-Policy: strict-origin-when-cross-origin
X-Content-Type-Options: nosniff
Permissions-Policy: geolocation=(), camera=(), microphone=(), payment=()
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

`script-src` needs `'unsafe-inline'` only because of the small pre-paint theme/language bootstrap
in `<head>`, which must run before first paint to avoid a flash. If that inline block is ever moved
to a hashed or nonced form, drop `'unsafe-inline'`.

> **Deployment action required (outside this repo):** these headers must be configured in
> Cloudflare. Nothing in this repository can apply them.

## Practices this repository enforces

- **No third-party runtime requests.** No CDN, webfonts, analytics or trackers. Enforced by
  `npm run test:links`, which fails if any script/style/font/image is loaded cross-origin.
- **No `eval`, `new Function`, or `javascript:` URLs.** Enforced by ESLint (`no-eval`,
  `no-implied-eval`, `no-new-func`, `no-script-url`).
- **No inline event handlers.** All listeners are attached in `assets/site.js`.
- **All external links are HTTPS.** Enforced by `npm run test:links`.
- **Translations are not parsed as arbitrary HTML.** Plain strings use `textContent`. The 12
  strings that legitimately contain markup are listed in `MARKUP_KEYS` in `assets/site.js` and
  rendered through a strict allowlist: only `<a href>`, `<br>`, `<em>`, `<span class>` and
  `<strong>` survive; `href` is restricted to `https:`, `mailto:`, `#` and root-relative; and
  `script`/`style`/`template`/`iframe`/`object`/`embed` subtrees are dropped entirely.

  Translation strings are authored in-repo, so this is defence in depth rather than a fix for an
  active vulnerability — but it means a future change that sources strings externally cannot turn
  into script execution.

## Known limitations

- `assets/site.js` and the locale files are served without Subresource Integrity. They are
  same-origin, so SRI adds little, but a compromised host would be trusted.
- The `bitcoin42.github.io` mirror cannot be hardened (see above). If header enforcement matters,
  serve only from Cloudflare and remove the Pages deployment.
- This page links to third-party sites (`nighttrader.exchange`, `zk.me`, `airgap.it`, news
  outlets). Their security is outside our control.
