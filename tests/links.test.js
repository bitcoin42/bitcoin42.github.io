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
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const failures = [];
const fail = (m) => failures.push(m);

// 1. Every in-page anchor must resolve to an existing id.
const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const anchors = [...html.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]);
for (const a of new Set(anchors)) {
  if (!ids.has(a)) fail(`anchor #${a} has no matching id`);
}

// 2. Every root-relative asset reference must exist on disk.
const assets = [...html.matchAll(/(?:href|src)="(\/[^"]+)"/g)].map((m) => m[1]);
for (const a of new Set(assets)) {
  if (!fs.existsSync(path.join(ROOT, a.replace(/^\//, '')))) fail(`missing asset: ${a}`);
}

// 3. Files the manifest and metadata promise.
for (const required of [
  'assets/site.css',
  'assets/site.js',
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

// 4. Canonical host must agree across every surface that declares it.
const canonical = (html.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
if (!canonical) fail('no canonical link');
else {
  const host = new URL(canonical).origin;

  const ogUrl = (html.match(/<meta property="og:url" content="([^"]+)"/) || [])[1];
  if (ogUrl && new URL(ogUrl).origin !== host) fail(`og:url host ${ogUrl} != canonical ${host}`);

  const sitemap = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
  const loc = (sitemap.match(/<loc>([^<]+)<\/loc>/) || [])[1];
  if (!loc || new URL(loc).origin !== host) fail(`sitemap <loc> ${loc} != canonical ${host}`);

  const robots = fs.readFileSync(path.join(ROOT, 'robots.txt'), 'utf8');
  const sm = (robots.match(/Sitemap:\s*(\S+)/i) || [])[1];
  if (!sm || new URL(sm).origin !== host) fail(`robots.txt sitemap ${sm} != canonical ${host}`);

  const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'manifest.webmanifest'), 'utf8'));
  if (manifest.start_url && new URL(manifest.start_url).origin !== host) {
    fail(`manifest start_url ${manifest.start_url} != canonical ${host}`);
  }

  // hreflang must cover every shipped locale, plus x-default.
  const alts = [...html.matchAll(/hreflang="([^"]+)"/g)].map((m) => m[1]);
  const locales = fs.readdirSync(path.join(ROOT, 'locales')).map((f) => path.basename(f, '.json'));
  for (const l of locales) if (!alts.includes(l)) fail(`no hreflang alternate for locale "${l}"`);
  if (!alts.includes('x-default')) fail('no hreflang="x-default"');
}

// 5. No third-party origins may be requested at load time. External links in
//    prose are fine; script/style/img/font sources are not.
const thirdParty = [...html.matchAll(/(?:src|href)="(https?:\/\/[^"]+)"/g)]
  .map((m) => m[1])
  .filter((u) => /\.(js|css|woff2?|ttf|png|jpg|svg|gif)(\?|$)/i.test(u));
if (thirdParty.length) fail(`third-party resource(s) referenced: ${thirdParty.join(', ')}`);

// 6. All external links must be https.
const insecure = [...html.matchAll(/href="(http:\/\/[^"]+)"/g)].map((m) => m[1]);
if (insecure.length) fail(`non-https link(s): ${insecure.join(', ')}`);

if (failures.length) {
  console.error('\nLINK/ASSET TEST FAILED:');
  failures.forEach((f) => console.error('  ✗ ' + f));
  process.exit(1);
}
console.log(
  `✓ ${new Set(anchors).size} anchors resolve, ${new Set(assets).size} local assets exist, ` +
    `canonical/og/sitemap/robots/manifest agree, hreflang complete, no third-party resources`
);
