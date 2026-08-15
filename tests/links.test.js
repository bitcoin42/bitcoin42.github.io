#!/usr/bin/env node
/**
 * Internal link + required asset check, plus canonical/sitemap consistency.
 * Deliberately does not hit the network: external links are checked by hand
 * (see AUDIT.md §3) so CI stays deterministic and offline-safe.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PAGES = ['index.html', 'beginners.html'];
const failures = [];
const fail = (m) => failures.push(m);

let anchorCount = 0;
let assetCount = 0;
const canonicals = [];

for (const page of PAGES) {
  const html = fs.readFileSync(path.join(ROOT, page), 'utf8');

  // 1. Every in-page anchor must resolve to an existing id on that same page.
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  const anchors = [...new Set([...html.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]))];
  for (const a of anchors) {
    if (!ids.has(a)) fail(`${page}: anchor #${a} has no matching id`);
  }
  anchorCount += anchors.length;

  // 2. Every root-relative reference must exist on disk. This covers assets and
  //    cross-page links alike, so a renamed page cannot leave a dead nav item.
  const locals = [...new Set([...html.matchAll(/(?:href|src)="(\/[^"#?]*)"/g)].map((m) => m[1]))];
  for (const a of locals) {
    const rel = a === '/' ? 'index.html' : a.replace(/^\//, '');
    if (!fs.existsSync(path.join(ROOT, rel))) fail(`${page}: missing local target: ${a}`);
  }
  assetCount += locals.length;

  // 3. Canonical must be self-referential and share the one canonical host.
  const canonical = (html.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
  if (!canonical) fail(`${page}: no canonical link`);
  else {
    canonicals.push(canonical);
    const expectedPath = page === 'index.html' ? '/' : '/' + page;
    if (new URL(canonical).pathname !== expectedPath) {
      fail(`${page}: canonical path ${new URL(canonical).pathname} != ${expectedPath}`);
    }
    const ogUrl = (html.match(/<meta property="og:url" content="([^"]+)"/) || [])[1];
    if (ogUrl && ogUrl !== canonical) fail(`${page}: og:url ${ogUrl} != canonical ${canonical}`);
  }

  // 4. hreflang must cover every shipped locale, plus x-default, on every page.
  const alts = [...html.matchAll(/hreflang="([^"]+)"/g)].map((m) => m[1]);
  const locales = fs.readdirSync(path.join(ROOT, 'locales')).map((f) => path.basename(f, '.json'));
  for (const l of locales) if (!alts.includes(l)) fail(`${page}: no hreflang alternate for "${l}"`);
  if (!alts.includes('x-default')) fail(`${page}: no hreflang="x-default"`);

  // 5. No third-party origins may be requested at load time. External links in
  //    prose are fine; script/style/img/font sources are not.
  const thirdParty = [...html.matchAll(/(?:src|href)="(https?:\/\/[^"]+)"/g)]
    .map((m) => m[1])
    .filter((u) => /\.(js|css|woff2?|ttf|png|jpg|svg|gif)(\?|$)/i.test(u));
  if (thirdParty.length) fail(`${page}: third-party resource(s): ${thirdParty.join(', ')}`);

  // 6. All external links must be https.
  const insecure = [...html.matchAll(/href="(http:\/\/[^"]+)"/g)].map((m) => m[1]);
  if (insecure.length) fail(`${page}: non-https link(s): ${insecure.join(', ')}`);
}

// 7. Files the manifest and metadata promise.
for (const required of [
  'assets/site.css',
  'assets/site.js',
  'assets/beginners.css',
  'assets/beginners.js',
  'manifest.webmanifest',
  'robots.txt',
  'sitemap.xml',
  'og-image.png',
  'favicon.svg',
  'favicon-32.png',
  'favicon-192.png',
  'favicon-512.png',
  'apple-touch-icon.png',
]) {
  if (!fs.existsSync(path.join(ROOT, required))) fail(`missing required file: ${required}`);
}

// 8. Canonical host must agree across every surface that declares it, and the
//    sitemap must list exactly the pages that exist.
if (canonicals.length) {
  const host = new URL(canonicals[0]).origin;
  for (const c of canonicals) {
    if (new URL(c).origin !== host) fail(`canonical host mismatch: ${c} != ${host}`);
  }

  const sitemap = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (!locs.length) fail('sitemap has no <loc>');
  for (const loc of locs) {
    if (new URL(loc).origin !== host) fail(`sitemap <loc> ${loc} != canonical host ${host}`);
  }
  for (const c of canonicals) {
    if (!locs.includes(c)) fail(`sitemap is missing canonical URL ${c}`);
  }

  const robots = fs.readFileSync(path.join(ROOT, 'robots.txt'), 'utf8');
  const sm = (robots.match(/Sitemap:\s*(\S+)/i) || [])[1];
  if (!sm || new URL(sm).origin !== host) fail(`robots.txt sitemap ${sm} != canonical ${host}`);

  const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'manifest.webmanifest'), 'utf8'));
  if (manifest.start_url && new URL(manifest.start_url).origin !== host) {
    fail(`manifest start_url ${manifest.start_url} != canonical ${host}`);
  }
}

if (failures.length) {
  console.error('\nLINK/ASSET TEST FAILED:');
  failures.forEach((f) => console.error('  ✗ ' + f));
  process.exit(1);
}
console.log(
  `✓ ${PAGES.length} pages: ${anchorCount} anchors resolve, ${assetCount} local targets exist, ` +
    `canonical/og/sitemap/robots/manifest agree, hreflang complete, no third-party resources`
);
