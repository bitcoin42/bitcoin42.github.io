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
    check((await visible()) === 9, 'all 9 links exposed when open');
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

  // ---- beginner's guide ---------------------------------------------------
  console.log("\nbeginner's guide");
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 1000 } });
    const p = await ctx.newPage();
    const errs = [];
    p.on('pageerror', (e) => errs.push(e.message));
    await p.goto(origin + '/beginners.html', { waitUntil: 'networkidle' });
    check(errs.length === 0, 'no page errors', errs.join('; '));

    // Cross-links between the two pages resolve in both directions.
    check((await p.locator('a[href="/"]').count()) > 0, 'links back to the technical page');

    // The safe demo: six distinct outcomes driven by three toggles.
    const verdict = () => p.locator('#verdict').innerText();
    const why = () => p.locator('#why').innerText();
    const locked = await verdict();
    await p.click('#k-us');
    check((await why()) !== '', 'our key alone explains itself');
    check(await p.evaluate(() => !document.getElementById('verdict').classList.contains('is-open')),
      'our key alone does NOT open the safe');
    await p.click('#k-you');
    check(await p.evaluate(() => document.getElementById('verdict').classList.contains('is-open')),
      'both keys open the safe');
    check((await verdict()) !== locked, 'verdict text changed');

    // Timelock path: our key off, timer on, user key on.
    await p.click('#k-us');
    await p.click('#k-time');
    check(await p.evaluate(() => document.getElementById('verdict').classList.contains('is-open')),
      'user key + elapsed timer opens the safe');
    // The recovery copy must not imply an automatic payout.
    const recovery = (await why()).toLowerCase();
    check(!/(pays out|paid to you|automatically (paid|returns|refunds))/.test(recovery),
      'recovery copy does not promise an automatic payout');
    check(/yourself|you can go|still have to|move the coins/.test(recovery),
      'recovery copy says the user must act', recovery.slice(0, 90));

    // Fast-forward button relabels itself.
    check((await p.locator('#k-time').innerText()).trim() !== '', 'timer button keeps a label');
    await ctx.close();
  }

  // ---- beginner's guide: explainer figures --------------------------------
  console.log("\nbeginner's guide figures");
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 1000 } });
    const p = await ctx.newPage();
    const errs = [];
    p.on('pageerror', (e) => errs.push(e.message));
    await p.goto(origin + '/beginners.html', { waitUntil: 'networkidle' });

    // All six figures are present and each has a caption or heading.
    const figs = await p.locator('figure.bgv').count();
    check(figs === 6, 'six explainer figures render', 'found ' + figs);

    // Recovery timer: stepping through changes the gauge, the state and the note.
    const level = () => p.evaluate(() => document.getElementById('gauge-fill').style.getPropertyValue('--level').trim());
    const note = () => p.locator('#gauge-note').innerText();
    check((await level()) === '100%', 'timer starts full', await level());
    await p.click('#viz-timer .bgv-step[data-stage="3"]');
    await p.waitForTimeout(120);
    const draining = await level();
    check(draining !== '100%' && draining !== '0%', 'stage 3 drains the timer partway', draining);
    await p.click('#viz-timer .bgv-step[data-stage="4"]');
    await p.waitForTimeout(120);
    check((await level()) === '0%', 'stage 4 reaches the locktime', await level());
    check(
      (await p.locator('#gauge-state').innerText()) !== (await p.locator('#viz-timer .bgv-step[data-stage="1"]').innerText()),
      'stage label updates'
    );

    // The whole point of the figure: stage 4 must not read as an automatic payout.
    const t4 = (await note()).toLowerCase();
    check(!/(pays out|paid to you|sent to you|automatically (paid|returns|refunds|sends))/.test(t4),
      'timer stage 4 does not promise an automatic payout', t4.slice(0, 100));
    check(/build and broadcast|you \(or a recovery tool\)|still sitting/.test(t4),
      'timer stage 4 says the user constructs the transaction', t4.slice(0, 100));

    // Only one stage is pressed at a time.
    const pressed = await p.locator('#viz-timer .bgv-step[aria-pressed="true"]').count();
    check(pressed === 1, 'exactly one timer stage is selected', String(pressed));

    // Approve bar: the custodial toggle changes the note and the bar styling.
    const abarNote = () => p.locator('#abar-note').innerText();
    const before = await abarNote();
    await p.click('#abar-cex');
    await p.waitForTimeout(120);
    check((await abarNote()) !== before, 'custodial toggle changes the explanation');
    check(await p.evaluate(() => document.getElementById('abar-track').classList.contains('is-custodial')),
      'custodial state applies to the bar');
    await p.click('#abar-nt');
    await p.waitForTimeout(120);
    check(!(await p.evaluate(() => document.getElementById('abar-track').classList.contains('is-custodial'))),
      'toggling back clears the custodial state');

    check(errs.length === 0, 'no page errors from the figures', errs.join('; '));
    await ctx.close();
  }

  // ---- beginner's guide: language + title ---------------------------------
  console.log("\nbeginner's guide i18n");
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 1000 } });
    const p = await ctx.newPage();
    await p.goto(origin + '/beginners.html', { waitUntil: 'networkidle' });
    const enTitle = await p.title();
    check(/plain English/i.test(enTitle), 'beginner page keeps its own <title>', enTitle);

    await p.selectOption('#lang-select', 'de');
    await p.waitForTimeout(500);
    check((await p.evaluate(() => document.documentElement.lang)) === 'de', 'language applies');
    check((await p.locator('h1').innerText()).includes('Safe'), 'headline translated');
    // The safe demo re-renders through the shared i18n hook.
    check((await p.locator('#verdict').innerText()).includes('Safe'), 'safe demo re-renders on language change');
    check((await p.evaluate(() => location.search)) === '?lang=de', 'language reflected in URL');

    await p.goto(origin + '/beginners.html?lang=ar', { waitUntil: 'networkidle' });
    await p.waitForTimeout(400);
    check((await p.evaluate(() => document.documentElement.dir)) === 'rtl', 'dir=rtl for Arabic');
    await ctx.close();
  }

  // ---- beginner's guide: no-JS baseline -----------------------------------
  console.log("\nbeginner's guide without JavaScript");
  {
    const ctx = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 900 } });
    const p = await ctx.newPage();
    await p.goto(origin + '/beginners.html', { waitUntil: 'domcontentloaded' });
    check((await p.locator('h1').innerText()).includes('two keys'), 'headline renders');
    check((await p.locator('section[id]').count()) >= 8, 'all sections render');
    const bg = await p.evaluate(() => getComputedStyle(document.body).backgroundColor);
    check(bg !== 'rgba(0, 0, 0, 0)', 'stylesheet applied', bg);
    await ctx.close();
  }

  // ---- layout integrity ---------------------------------------------------
  console.log('\nlayout (no horizontal overflow)');
  {
    let bad = [];
    for (const page of ['/', '/beginners.html']) {
    for (const lang of LOCALES) {
      for (const w of WIDTHS) {
        const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
        const p = await ctx.newPage();
        const errs = [];
        p.on('pageerror', (e) => errs.push(e.message));
        await p.goto(`${origin}${page}?lang=${lang}`, { waitUntil: 'networkidle' });
        await p.waitForTimeout(150);
        const of = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        if (of !== 0 || errs.length) bad.push(`${page} ${lang}@${w}px overflow=${of} errors=${errs.length}`);
        await ctx.close();
      }
    }
    }
    check(bad.length === 0, `2 pages × ${LOCALES.length} locales × ${WIDTHS.length} widths clean`, bad.slice(0, 5).join('; '));
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
