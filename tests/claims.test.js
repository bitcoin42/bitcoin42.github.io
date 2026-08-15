#!/usr/bin/env node
/**
 * Claim-wording regression guard.
 *
 * This is a correctness test, not a style test. It fails the build if wording
 * that was corrected for technical accuracy reappears — in ANY locale, or in
 * the HTML fallback.
 *
 * Background (see CLAIMS.md):
 *   - OP_CHECKLOCKTIMEVERIFY makes a branch *spendable* after a threshold.
 *     Bitcoin never spends an output by itself. Copy claiming the timelock
 *     "pays out", "returns coins" or "fires" misstates what a user must do to
 *     recover funds, which is the page's central safety promise.
 *   - P2SH is BIP16 (2012); CLTV is BIP65 (activated Dec 2015). The
 *     construction cannot predate them, so "since 2009" is false.
 *   - Absolute guarantees the page cannot evidence were deliberately softened.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

/** @type {{id:string, pattern:RegExp, why:string, severity:'error'|'warn'}[]} */
const RULES = [
  {
    id: 'timelock-autopay',
    severity: 'error',
    pattern:
      /\b(pays?\s+(?:the\s+address\s+)?out|paid\s+to\s+your\s+key|pays\s+you\s+out|automatically\s+(?:paid|pays|returns?|refunds?)|fires\s+on\s+schedule|activates\s+on\s+schedule|returns\s+your\s+coins)\b/i,
    why: 'Implies the timelock pays out by itself. It does not — the recovery branch merely becomes spendable and the user must broadcast a transaction.',
  },
  {
    id: 'since-2009',
    severity: 'error',
    pattern: /since\s+2009/i,
    why: 'P2SH is BIP16 (2012) and CLTV is BIP65 (2015). The construction cannot date from 2009.',
  },
  {
    id: 'exit-to-scam',
    severity: 'error',
    pattern: /exit\s+to\s+scam/i,
    why: 'Unfalsifiable absolute; removed in Phase 2.',
  },
  {
    id: 'strictly-better',
    severity: 'error',
    pattern: /strictly\s+better/i,
    why: 'Comparative guarantee the page cannot evidence; use "materially different".',
  },
  {
    id: 'non-custodial-self-description',
    severity: 'error',
    pattern: /\bnon-?custodial\s+trading\s+interface\b/i,
    why: 'The architecture is co-custodial during trading; this contradicted the page\'s own Tradeoffs section.',
  },
  {
    id: 'sighash-absolute',
    severity: 'warn',
    pattern: /SIGHASH_SINGLE/,
    why: 'Naming the opcode implied a bound it does not provide on its own. Exposure depends on the whole transaction template. Only reintroduce alongside a published template (CLAIMS.md B1).',
  },
];

const targets = [
  'index.html',
  'beginners.html',
  ...fs.readdirSync(path.join(ROOT, 'locales')).map((f) => path.join('locales', f)),
];

const errors = [];
const warnings = [];

for (const rel of targets) {
  const text = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  const lines = text.split('\n');
  for (const rule of RULES) {
    lines.forEach((line, i) => {
      const m = line.match(rule.pattern);
      if (!m) return;
      const ctx = line.trim().slice(Math.max(0, line.indexOf(m[0]) - 50), line.indexOf(m[0]) + 90);
      const entry = `${rel}:${i + 1} [${rule.id}] "${m[0]}"\n      ${rule.why}\n      …${ctx}…`;
      (rule.severity === 'error' ? errors : warnings).push(entry);
    });
  }
}

if (warnings.length) {
  console.warn('\nclaim-wording WARNINGS:');
  warnings.forEach((w) => console.warn('  ! ' + w));
}

if (errors.length) {
  console.error('\nCLAIM WORDING TEST FAILED — corrected wording has regressed:\n');
  errors.forEach((e) => console.error('  ✗ ' + e + '\n'));
  console.error('If a claim has since been evidenced, update CLAIMS.md first, then relax the rule here.');
  process.exit(1);
}

console.log(`✓ claim wording clean across ${targets.length} files (${RULES.length} rules)`);
