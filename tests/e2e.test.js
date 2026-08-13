#!/usr/bin/env node
/**
 * Behavioural smoke tests for the things a static-analysis pass cannot see:
 * theme and language persistence, the mobile menu contract, the diagram
 * controls, layout overflow, and the no-JavaScript baseline.
 */
'use strict';

const path = require('path');
const { launch } = require('./browser');
const { serve } = require('./serve');

const ROOT = path.join(__dirname, '..');
const LOCALES = ['en', 'zh', 'ru', 'es', 'it', 'pt', 'ar', 'fr', 'de'];
const WIDTHS = [320, 375, 414, 640, 768, 1024, 1440];

let failed = 0;
const check = (ok, label, detail = '') => {
  if (ok) console.log(`  ✓ ${label}`);
  else {
    failed++;
    console.error(`  ✗ ${label}${detail ? ' — ' + detail : ''}`);
  }
};

(async () => {
  const { origin, close } = await serve(ROOT);
  const browser = await launch();

  // ---- no-JS baseline -----------------------------------------------------
  console.log('\nno-JavaScript baseline');
  {
    const ctx = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 900 } });
    const p = await ctx.newPage();
    await p.goto(origin + '/', { waitUntil: 'domcontentloaded' });
    check((await p.locator('h1').innerText()).includes('Not your keys'), 'headline renders');
    check((await p.locator('section[id]').count()) >= 8, 'all sections render');
    const bg = await p.evaluate(() => getComputedStyle(document.body).backgroundColor);
    check(bg !== 'rgba(0, 0, 0, 0)', 'stylesheet applied', bg);
    await ctx.close();
  }

  // ---- mobile menu contract ----------------------------------------------
  console.log('\nmobile menu');
  {
    const ctx = await browser.newContext({ viewport: { width: 375, height: 800 } });
    const p = await ctx.newPage();
    await p.goto(origin + '/', { waitUntil: 'networkidle' });
    const visible = () => p.evaluate(() => [...document.querySelectorAll('#nav-links a')].filter((a) => a.offsetParent !== null).length);
    check((await visible()) === 0, 'links hidden when closed');
    check((await p.getAttribute('#nav-toggle', 'aria-expanded')) === 'false', 'aria-expanded=false initially');
    check((await p.getAttribute('#nav-toggle', 'aria-controls')) === 'nav-links', 'aria-controls points at the panel');
    await p.click('#nav-toggle');
    check((await visible()) === 8, 'all 8 links exposed when open');
    check((await p.getAttribute('#nav-toggle', 'aria-expanded')) === 'true', 'aria-expanded=true when open');
    await p.keyboard.press('Escape');
    await p.waitForTimeout(120);
    check((await p.getAttribute('#nav-toggle', 'aria-expanded')) === 'false', 'Escape closes');
    check((await p.evaluate(() => document.activeElement && document.activeElement.id)) === 'nav-toggle', 'focus returns to toggle');
    await ctx.close();
  }

  // ---- skip link ----------------------------------------------------------
  console.log('\nkeyboard');
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const p = await ctx.newPage();
    await p.goto(origin + '/', { waitUntil: 'networkidle' });
    await p.keyboard.press('Tab');
    check(await p.evaluate(() => document.activeElement.classList.contains('skip-link')), 'first Tab reaches skip link');
    await p.keyboard.press('Enter');
    await p.waitForTimeout(150);
    check((await p.evaluate(() => document.activeElement.id)) === 'main', 'skip link moves focus to main');
    await ctx.close();
  }

  // ---- theme + language persistence --------------------------------------
  console.log('\npersistence');
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const p = await ctx.newPage();
    await p.goto(origin + '/', { waitUntil: 'networkidle' });
    const before = await p.evaluate(() => document.documentElement.getAttribute('data-theme'));
    await p.click('#theme-toggle');
    await p.waitForTimeout(100);
    const after = await p.evaluate(() => document.documentElement.getAttribute('data-theme'));
    check(before !== after, 'theme toggles');
    await p.reload({ waitUntil: 'networkidle' });
    check((await p.evaluate(() => document.documentElement.getAttribute('data-theme'))) === after, 'theme persists across reload');

    await p.selectOption('#lang-select', 'de');
    await p.waitForTimeout(500);
    check((await p.evaluate(() => document.documentElement.lang)) === 'de', 'language applies');
    check((await p.evaluate(() => location.search)) === '?lang=de', 'language reflected in URL');
    await p.goto(origin + '/', { waitUntil: 'networkidle' });
    await p.waitForTimeout(400);
    check((await p.evaluate(() => document.documentElement.lang)) === 'de', 'language persists');
    await ctx.close();
  }

  // ---- RTL ----------------------------------------------------------------
  console.log('\nRTL');
  {
    const ctx = await browser.newContext({ viewport: { width: 1024, height: 900 } });
    const p = await ctx.newPage();
    await p.goto(origin + '/?lang=ar', { waitUntil: 'networkidle' });
    await p.waitForTimeout(400);
    check((await p.evaluate(() => document.documentElement.dir)) === 'rtl', 'dir=rtl for Arabic');
    check((await p.evaluate(() => getComputedStyle(document.querySelector('pre.code')).direction)) === 'ltr', 'code block stays LTR');
    await ctx.close();
  }

  // ---- diagram controls ---------------------------------------------------
  console.log('\ndiagram controls');
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 1000 } });
    const p = await ctx.newPage();
    await p.goto(origin + '/', { waitUntil: 'networkidle' });

    await p.click('.tok[data-i18n-tag="script.tag_nodekey"]');
    check((await p.locator('#note-body').innerText()).length > 20, 'redeem-script annotation updates');

    await p.click('#split-cex');
    check(await p.evaluate(() => document.getElementById('custody-split').classList.contains('paused')), 'custody diagram pauses');
    check(!(await p.evaluate(() => document.getElementById('custody-viz-note').hidden)), 'custody inspect note shows');

    await p.click('.tl-step[data-step="100"]');
    check(await p.evaluate(() => document.getElementById('timelock-dms').classList.contains('paused')), 'timelock diagram pauses');
    check((await p.evaluate(() => document.getElementById('tl-marker').style.left)) === '100%', 'timeline marker jumps to step');
    await ctx.close();
  }

  // ---- reduced motion -----------------------------------------------------
  console.log('\nreduced motion');
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
    const p = await ctx.newPage();
    await p.goto(origin + '/', { waitUntil: 'networkidle' });
    for (const sel of ['.flow-icon', '.vault-icon', '.hourglass-icon', '.tl-marker']) {
      const anim = await p.evaluate((s) => getComputedStyle(document.querySelector(s)).animationName, sel);
      check(anim === 'none', `${sel} animation disabled`, anim);
    }
    await ctx.close();
  }

  // ---- layout integrity ---------------------------------------------------
  console.log('\nlayout (no horizontal overflow)');
  {
    let bad = [];
    for (const lang of LOCALES) {
      for (const w of WIDTHS) {
        const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
        const p = await ctx.newPage();
        const errs = [];
        p.on('pageerror', (e) => errs.push(e.message));
        await p.goto(`${origin}/?lang=${lang}`, { waitUntil: 'networkidle' });
        await p.waitForTimeout(150);
        const of = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        if (of !== 0 || errs.length) bad.push(`${lang}@${w}px overflow=${of} errors=${errs.length}`);
        await ctx.close();
      }
    }
    check(bad.length === 0, `${LOCALES.length} locales × ${WIDTHS.length} widths clean`, bad.slice(0, 5).join('; '));
  }

  await browser.close();
  await close();

  if (failed) {
    console.error(`\nE2E FAILED: ${failed} check(s)`);
    process.exit(1);
  }
  console.log('\n✓ all end-to-end checks passed');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
