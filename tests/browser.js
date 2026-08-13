'use strict';
/**
 * Shared Chromium launcher.
 *
 * Uses whatever Chromium the environment already provides (CI images and this
 * project's dev container ship one) before falling back to Playwright's own
 * download, so `npm test` works without a separate `playwright install` step.
 */

const fs = require('fs');
const { chromium } = require('playwright');

const CANDIDATES = [
  process.env.PLAYWRIGHT_CHROMIUM_PATH,
  process.env.CHROME_PATH,
  '/opt/pw-browsers/chromium',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/usr/bin/google-chrome',
].filter(Boolean);

function launch(opts = {}) {
  const executablePath = CANDIDATES.find((p) => {
    try {
      return fs.existsSync(p);
    } catch {
      return false;
    }
  });
  return chromium.launch(executablePath ? { executablePath, ...opts } : opts);
}

module.exports = { launch };
