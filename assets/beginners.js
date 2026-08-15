/* NightTrader — beginner's guide: the two-key safe.
   Loaded only by beginners.html, after assets/site.js. Reads its strings
   through window.ntI18n so the demo re-renders when the language changes. */
(function () {
  'use strict';

  var you = document.getElementById('k-you');
  var us = document.getElementById('k-us');
  var time = document.getElementById('k-time');
  var verdict = document.getElementById('verdict');
  var why = document.getElementById('why');
  if (!you || !us || !time || !verdict || !why) return;

  // site.js exposes ntI18n; fall back to the inline English if it is absent
  // (for example if that script failed to load) so the demo still works.
  function t(key, fallback) {
    var api = window.ntI18n;
    var v = api && typeof api.t === 'function' ? api.t(key) : undefined;
    return v === undefined || v === null ? fallback : v;
  }

  function on(el) {
    return el.getAttribute('aria-pressed') === 'true';
  }

  // Each state maps to a verdict key, a why key, and whether the safe opens.
  // Keeping the mapping declarative makes the six outcomes auditable at a glance.
  function state() {
    var y = on(you),
      u = on(us),
      x = on(time);
    if (y && u && !x) return { open: true, v: 'bg.safe_v_open', w: 'bg.safe_w_both' };
    if (y && x) return { open: true, v: 'bg.safe_v_open_you', w: 'bg.safe_w_timer_you' };
    if (!y && u && x) return { open: false, v: 'bg.safe_v_still', w: 'bg.safe_w_ourkey_dead' };
    if (!y && u) return { open: false, v: 'bg.safe_v_still', w: 'bg.safe_w_us_alone' };
    if (y && !u) return { open: false, v: 'bg.safe_v_still', w: 'bg.safe_w_you_alone' };
    if (x) return { open: false, v: 'bg.safe_v_locked', w: 'bg.safe_w_timer_only' };
    return { open: false, v: 'bg.safe_v_locked', w: 'bg.safe_w_start' };
  }

  function render() {
    var s = state();
    verdict.className = 'safe-verdict' + (s.open ? ' is-open' : '');
    verdict.textContent = t(s.v, verdict.textContent);
    why.textContent = t(s.w, why.textContent);
    time.textContent = on(time) ? t('bg.safe_rewind', 'Rewind') : t('bg.safe_ff', 'Fast-forward');
  }

  [you, us, time].forEach(function (el) {
    el.addEventListener('click', function () {
      el.setAttribute('aria-pressed', on(el) ? 'false' : 'true');
      render();
    });
  });

  // Re-render on every language change. site.js invokes the callback once on
  // registration too, so this also performs the initial paint.
  if (window.ntI18n && typeof window.ntI18n.onChange === 'function') {
    window.ntI18n.onChange(render);
  } else {
    render();
  }
})();

/* ---- figure: the recovery timer, stage by stage ------------------------- */
(function () {
  'use strict';

  var fig = document.getElementById('viz-timer');
  if (!fig) return;
  var fill = document.getElementById('gauge-fill');
  var state = document.getElementById('gauge-state');
  var who = document.getElementById('gauge-who');
  var note = document.getElementById('gauge-note');
  var steps = fig.querySelectorAll('.bgv-step');
  if (!fill || !state || !who || !note || !steps.length) return;

  function t(key, fallback) {
    var api = window.ntI18n;
    var v = api && typeof api.t === 'function' ? api.t(key) : undefined;
    return v === undefined || v === null ? fallback : v;
  }

  // level is how much time is left before the recovery branch opens.
  // Stage 4 is the only one where the user's key alone suffices — and even
  // there the copy must say they still have to move the coins themselves.
  var STAGES = {
    1: { level: 100, state: 'bg.viz_timer_state_1', who: 'bg.viz_timer_who_both', note: 'bg.viz_timer_note_1' },
    2: { level: 100, state: 'bg.viz_timer_state_2', who: 'bg.viz_timer_who_both', note: 'bg.viz_timer_note_2' },
    3: { level: 38, state: 'bg.viz_timer_state_3', who: 'bg.viz_timer_who_both', note: 'bg.viz_timer_note_3' },
    4: { level: 0, state: 'bg.viz_timer_state_4', who: 'bg.viz_timer_who_you', note: 'bg.viz_timer_note_4' }
  };

  function current() {
    for (var i = 0; i < steps.length; i++) {
      if (steps[i].getAttribute('aria-pressed') === 'true') return steps[i].getAttribute('data-stage');
    }
    return '1';
  }

  function render() {
    var s = STAGES[current()] || STAGES['1'];
    fill.style.setProperty('--level', s.level + '%');
    fill.classList.toggle('is-empty', s.level === 0);
    state.textContent = t(s.state, state.textContent);
    who.textContent = t(s.who, who.textContent);
    note.textContent = t(s.note, note.textContent);
  }

  steps.forEach(function (btn) {
    btn.addEventListener('click', function () {
      steps.forEach(function (o) { o.setAttribute('aria-pressed', 'false'); });
      btn.setAttribute('aria-pressed', 'true');
      render();
    });
  });

  if (window.ntI18n && typeof window.ntI18n.onChange === 'function') window.ntI18n.onChange(render);
  else render();
})();

/* ---- figure: how much of your balance one order touches ----------------- */
(function () {
  'use strict';

  var track = document.getElementById('abar-track');
  if (!track) return;
  var signed = document.getElementById('abar-signed');
  var rest = document.getElementById('abar-rest');
  var note = document.getElementById('abar-note');
  var btnNt = document.getElementById('abar-nt');
  var btnCex = document.getElementById('abar-cex');
  if (!signed || !rest || !note || !btnNt || !btnCex) return;

  function t(key, fallback) {
    var api = window.ntI18n;
    var v = api && typeof api.t === 'function' ? api.t(key) : undefined;
    return v === undefined || v === null ? fallback : v;
  }

  function render() {
    var custodial = btnCex.getAttribute('aria-pressed') === 'true';
    track.classList.toggle('is-custodial', custodial);
    signed.textContent = t(custodial ? 'bg.viz_appr_seg_cex_a' : 'bg.viz_appr_seg_signed', signed.textContent);
    rest.textContent = t(custodial ? 'bg.viz_appr_seg_cex_b' : 'bg.viz_appr_seg_rest', rest.textContent);
    note.textContent = t(custodial ? 'bg.viz_appr_note_cex' : 'bg.viz_appr_note_nt', note.textContent);
  }

  [btnNt, btnCex].forEach(function (btn) {
    btn.addEventListener('click', function () {
      btnNt.setAttribute('aria-pressed', btn === btnNt ? 'true' : 'false');
      btnCex.setAttribute('aria-pressed', btn === btnCex ? 'true' : 'false');
      render();
    });
  });

  if (window.ntI18n && typeof window.ntI18n.onChange === 'function') window.ntI18n.onChange(render);
  else render();
})();
