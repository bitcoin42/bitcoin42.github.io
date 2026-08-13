#!/usr/bin/env node
/**
 * Locale integrity.
 *
 * Fails if any locale is missing a key English has, carries a key English does
 * not, contains an empty string, or contains a duplicate key. Also checks that
 * every data-i18n key referenced by index.html actually exists.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const LOCALES_DIR = path.join(ROOT, 'locales');
const REFERENCE = 'en';

const failures = [];
const fail = (msg) => failures.push(msg);

const files = fs.readdirSync(LOCALES_DIR).filter((f) => f.endsWith('.json'));
if (files.length === 0) fail('no locale files found');

const data = {};
for (const file of files) {
  const lang = path.basename(file, '.json');
  const raw = fs.readFileSync(path.join(LOCALES_DIR, file), 'utf8');

  // Duplicate keys survive JSON.parse silently, so scan the raw text too.
  const seen = new Set();
  const dupes = new Set();
  for (const m of raw.matchAll(/^\s*"([^"]+)"\s*:/gm)) {
    if (seen.has(m[1])) dupes.add(m[1]);
    seen.add(m[1]);
  }
  if (dupes.size) fail(`${lang}: duplicate key(s): ${[...dupes].join(', ')}`);

  try {
    data[lang] = JSON.parse(raw);
  } catch (err) {
    fail(`${lang}: invalid JSON — ${err.message}`);
  }
}

if (!data[REFERENCE]) fail(`missing reference locale ${REFERENCE}.json`);

if (data[REFERENCE]) {
  const refKeys = Object.keys(data[REFERENCE]).sort();

  for (const [lang, dict] of Object.entries(data)) {
    const keys = Object.keys(dict).sort();

    const missing = refKeys.filter((k) => !(k in dict));
    if (missing.length) fail(`${lang}: missing ${missing.length} key(s): ${missing.slice(0, 8).join(', ')}${missing.length > 8 ? '…' : ''}`);

    const extra = keys.filter((k) => !(k in data[REFERENCE]));
    if (extra.length) fail(`${lang}: ${extra.length} key(s) not in ${REFERENCE}: ${extra.slice(0, 8).join(', ')}`);

    const empty = keys.filter((k) => typeof dict[k] !== 'string' || dict[k].trim() === '');
    if (empty.length) fail(`${lang}: empty or non-string value(s): ${empty.slice(0, 8).join(', ')}`);
  }

  // Every key the page asks for must exist.
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const referenced = new Set();
  for (const m of html.matchAll(/data-i18n(?:-aria-label|-tag|-note)?="([^"]+)"/g)) referenced.add(m[1]);
  const unknown = [...referenced].filter((k) => !(k in data[REFERENCE]));
  if (unknown.length) fail(`index.html references unknown key(s): ${unknown.join(', ')}`);

  console.log(
    `locales: ${Object.keys(data).length} files, ${refKeys.length} keys each, ` +
      `${referenced.size} referenced by index.html`
  );
}

// The English dictionary embedded in assets/site.js (the guaranteed fallback)
// must not drift from locales/en.json.
{
  const src = fs.readFileSync(path.join(ROOT, 'assets', 'site.js'), 'utf8');
  const m = src.match(/var EN = (\{[\s\S]*?\n\});/);
  if (!m) fail('assets/site.js: could not locate the embedded EN dictionary');
  else {
    let embedded;
    try {
      embedded = JSON.parse(m[1]);
    } catch (err) {
      fail('assets/site.js: embedded EN is not valid JSON — ' + err.message);
    }
    if (embedded && data[REFERENCE]) {
      const ref = data[REFERENCE];
      const drift = Object.keys(ref).filter((k) => embedded[k] !== ref[k]);
      const extra = Object.keys(embedded).filter((k) => !(k in ref));
      if (drift.length) fail(`assets/site.js embedded EN differs from locales/en.json for: ${drift.slice(0, 6).join(', ')}${drift.length > 6 ? '…' : ''}`);
      if (extra.length) fail(`assets/site.js embedded EN has keys not in locales/en.json: ${extra.slice(0, 6).join(', ')}`);
    }
  }
}

if (failures.length) {
  console.error('\nLOCALE TEST FAILED:');
  failures.forEach((f) => console.error('  ✗ ' + f));
  process.exit(1);
}
console.log('✓ locale parity, no empties, no duplicates, all referenced keys exist');
