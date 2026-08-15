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
