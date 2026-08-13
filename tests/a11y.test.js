#!/usr/bin/env node
/**
 * axe-core accessibility checks across viewport, theme and direction.
 * Runs against a locally served copy so CI needs no network.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { launch } = require('./browser');
const { serve } = require('./serve');

const ROOT = path.join(__dirname, '..');
const AXE = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');

const CONTEXTS = [
  { name: 'desktop light', opts: { viewport: { width: 1280, height: 900 } }, url: '/' },
  { name: 'desktop dark', opts: { viewport: { width: 1280, height: 900 }, colorScheme: 'dark' }, url: '/' },
  { name: 'mobile light', opts: { viewport: { width: 375, height: 800 } }, url: '/' },
  { name: 'mobile dark', opts: { viewport: { width: 375, height: 800 }, colorScheme: 'dark' }, url: '/' },
  { name: 'arabic rtl', opts: { viewport: { width: 375, height: 800 } }, url: '/?lang=ar' },
  { name: 'mobile menu open', opts: { viewport: { width: 375, height: 800 } }, url: '/', openMenu: true },
];

(async () => {
  const { origin, close } = await serve(ROOT);
  const browser = await launch();
  let total = 0;

  for (const ctxDef of CONTEXTS) {
    const ctx = await browser.newContext(ctxDef.opts);
    const page = await ctx.newPage();
    await page.goto(origin + ctxDef.url, { waitUntil: 'networkidle' });
    if (ctxDef.openMenu) {
      await page.click('#nav-toggle');
      await page.waitForTimeout(150);
    }
    await page.addScriptTag({ content: AXE });
    const res = await page.evaluate(async () => window.axe.run(document, { resultTypes: ['violations'] }));

    if (res.violations.length) {
      total += res.violations.length;
      console.error(`✗ ${ctxDef.name}: ${res.violations.length} violation type(s)`);
      res.violations.forEach((v) => {
        console.error(`    [${v.impact}] ${v.id} × ${v.nodes.length} — ${v.help}`);
        v.nodes.slice(0, 3).forEach((n) => console.error(`        ${n.target.join(' ')}`));
      });
    } else {
      console.log(`✓ ${ctxDef.name}: clean`);
    }
    await ctx.close();
  }

  await browser.close();
  await close();

  if (total) {
    console.error(`\nA11Y TEST FAILED: ${total} violation type(s)`);
    process.exit(1);
  }
  console.log('\n✓ axe-core clean across all contexts');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
