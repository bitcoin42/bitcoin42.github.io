/* NightTrader — theme, i18n and diagram interaction.
   No third-party requests: English ships inline as a guaranteed fallback and
   other locales load from /locales/<lang>.json on demand.
   See README.md for the accuracy rules the test suite enforces. */
(function () {
  'use strict';

  // English is embedded rather than fetched so the page is never left
  // untranslated if a locale request fails, and so dict() lookups always resolve.
  var EN = {
  "a11y.col_criterion": "Criterion",
  "a11y.copy_fallback": "Bitmessage address selected. Copy it with your keyboard.",
  "a11y.copy_ok": "Bitmessage address copied to clipboard.",
  "a11y.nav_menu": "Sections menu",
  "a11y.nav_menu_label": "Sections",
  "a11y.nav_primary": "Primary",
  "a11y.skip": "Skip to content",
  "a11y.table_custody": "Comparison table, scrollable",
  "a11y.theme_toggle": "Toggle colour theme",
  "controls.c1_h3": "Sign from an air-gapped device",
  "controls.c1_p": "Your key does not have to live in a browser tab. Pair an offline signer — an air-gapped phone running <a href=\"https://airgap.it/\">AirGap Vault</a> or a compatible hardware wallet — and the key need never touch an internet-connected machine. Orders and withdrawals cross the gap as QR codes: unsigned request out, signature back in. Ask us which devices are supported before you rely on this.",
  "controls.c1_qr": "Unsigned request → QR → signature back",
  "controls.c2_h3": "Your backup script, at signup",
  "controls.c2_p": "The redeem script is shown to you when your account is created — not buried in a support article, not available on request. Save it. With that script and your key you can reconstruct and spend the timelock branch yourself, from any wallet that speaks Bitcoin script, with the exchange gone and this domain dead.",
  "controls.c3_h3": "Node health, on screen",
  "controls.c3_p": "Logged in, you see the live state of the node set holding the other signature — who is up, whether the quorum is intact. If the backend is degrading you find out from the interface, not from a status page written after the fact. A venue that hides its own health is telling you something.",
  "controls.gut_b": "Controls",
  "controls.gut_d": "What you hold and watch",
  "controls.h2": "Three things the exchange hands you and cannot take back.",
  "custody.gut_b": "Custody",
  "custody.gut_d": "Who can move it",
  "custody.h2": "Four ways to trade bitcoin. One of them leaves a key with you and still gives you a book.",
  "custody.lede": "Bisq and RoboSats are honest, non-custodial venues and we say so. The tradeoff they make is cost and speed: every trade is an on-chain event, and continuous depth is hard to build on top of that. We made a different tradeoff.",
  "custody.row1_atomic": "You",
  "custody.row1_cex": "The exchange, unilaterally",
  "custody.row1_th": "Who can move your coins",
  "custody.row1_us": "You + node quorum, per trade",
  "custody.row1_wrapped": "The bridge custodian",
  "custody.row2_atomic": "A key",
  "custody.row2_cex": "A database row",
  "custody.row2_th": "What you hold",
  "custody.row2_us": "A key in a multisig UTXO",
  "custody.row2_wrapped": "A token claim on someone's reserve",
  "custody.row3_atomic": "You keep your coins",
  "custody.row3_cex": "Bankruptcy claim",
  "custody.row3_th": "If the venue disappears",
  "custody.row3_us": "Timelock lets you recover your coins",
  "custody.row3_wrapped": "Depends on the custodian",
  "custody.row4_atomic": "Thin, slow to fill",
  "custody.row4_cex": "Full bid / ask",
  "custody.row4_th": "Order book",
  "custody.row4_us": "Full bid / ask, off-chain matching",
  "custody.row4_wrapped": "AMM pool, no bids",
  "custody.row5_atomic": "Multiple on-chain txs",
  "custody.row5_cex": "None",
  "custody.row5_th": "Chain cost per trade",
  "custody.row5_us": "None — settlement is batched",
  "custody.row5_wrapped": "Gas on every swap",
  "custody.row6_atomic": "The trade amount",
  "custody.row6_cex": "Your entire balance",
  "custody.row6_th": "Exposure while trading",
  "custody.row6_us": "Bounded by the signed template",
  "custody.row6_wrapped": "Your entire wrapped balance",
  "custody.small": "Off-chain matching means the book moves at exchange speed; the chain only sees settlement. The design uses native Bitcoin transaction and script features, including multisig, signature-hash modes, and CHECKLOCKTIMEVERIFY.",
  "custody.th_atomic": "Atomic swap DEX",
  "custody.th_cex": "Custodial CEX",
  "custody.th_nighttrader": "NightTrader",
  "custody.th_wrapped": "Wrapped BTC on a DEX",
  "custody.viz_caption_cex": "Coins sit in one wallet. Custody — and control — is theirs.",
  "custody.viz_caption_nt": "Your key is designed never to leave your device. Only the signed amount goes.",
  "custody.viz_hint": "Tap a side to pause and inspect",
  "custody.viz_label_cex": "Custodial exchange",
  "custody.viz_label_nt": "NightTrader",
  "custody.viz_note_cex": "A custodial exchange pools every user's coins into wallets it alone controls. Those funds sit under the operator's control, so freezing, loss or misuse are governance and solvency questions rather than ones the protocol answers for you.",
  "custody.viz_note_nt": "Your key is generated in your browser and designed never to leave your device. Each trade authorises a signed, template-bounded amount rather than your whole balance.",
  "fees.asof": "Fees shown as of August 2026. Check the exchange for the current schedule.",
  "fees.compare_h": "How that compares",
  "fees.compare_note": "Fees at other venues vary by tier, product and pair, and change over time. Rather than publish a snapshot that quietly goes stale, we suggest comparing against each venue's current published schedule. Note that on an automated market maker you should also count gas and slippage, and on a custodial venue you are also accepting custody risk.",
  "fees.f1_l": "Per completed trade",
  "fees.f2_l": "Transfer between accounts",
  "fees.f3_l": "Withdrawal to your own wallet",
  "fees.gut_b": "Fees",
  "fees.gut_d": "All of them",
  "fees.h2": "Three numbers. There is no fourth.",
  "fees.p": "Fees pay the node operators who hold the other half of the signature. There is no NightTrader token, no pre-mine, no treasury taking a cut of your trade, and no yield being promised to anyone. The exchange was launched without issuing a coin on purpose.",
  "fees.small": "Listing a coin costs the project, not the traders. Integration and contract auditing are quoted per project. Nothing on this page is a promise of returns, liquidity, or execution quality.",
  "footer.col_exchange": "Exchange",
  "footer.col_legal": "Legal",
  "footer.entities": "NightTrader is the exchange. bitcoin42 is the team behind it, operating since 2014; this page is published at bitcoin42.com. NAOME SAPI DE CV is the legal operator named above. The exchange itself runs at nighttrader.exchange.",
  "footer.imp_email_label": "E-Mail:",
  "footer.imp_h4": "Legal notice · Operator",
  "footer.lang_label": "Language",
  "footer.legal_p1": "NightTrader.Exchange is a co-custodial trading interface: during trading, funds sit in multisig addresses you co-sign, with a time-delayed recovery path. It is not a bank, a broker or an investment service, and nothing here is investment advice or a promise of yield, liquidity or execution. Trading digital assets can result in total loss. You are responsible for your own key and your own backups. Your use is governed by the <a href=\"https://nighttrader.exchange/tandc.html\">Terms & conditions</a>.",
  "footer.legal_p2": "Served from bitcoin42.com — registered 2014 · No third-party requests on this page.",
  "footer.link_airgapped": "Air-gapped signing",
  "footer.link_cookies": "Cookie policy",
  "footer.link_list": "List a coin",
  "footer.link_privacy": "Privacy policy",
  "footer.link_risk": "Risk disclosure",
  "footer.link_terms": "Terms & conditions",
  "footer.link_trade": "Trade",
  "footer.link_tradeoffs": "Known tradeoffs",
  "footer.link_whitepaper": "Whitepaper",
  "hero.answer": "NightTrader accounts settle into 2-of-2 or 3-of-3 multisig addresses.<br>\n    One key is yours, generated in your browser. By design, the exchange cannot move funds without it.",
  "hero.architecture": "Co-custodial during trading, with a time-delayed user recovery path.",
  "hero.cta_note": "Co-custodial · No signup wall to browse the book · Withdraw whenever you want",
  "hero.cta_open": "Open the exchange",
  "hero.cta_paper": "Read the paper",
  "hero.cta_source": "Read the source",
  "hero.h1": "Not your keys,<br>not your coins.<br><span class=\"thin\">So we gave you a key.</span>",
  "hero.kicker": "Bitcoin-native · Co-custodial · Full bid / ask order book",
  "hero.lede": "A real order book — limit bids, limit asks, tight spreads — without an omnibus wallet holding your stack. No wrapped BTC. No IOU balance in someone else's database.",
  "history.citation": "Coverage from the time: <a href=\"https://www.coindesk.com/markets/2014/03/28/money-spinners-genesis1-bitcoin-and-dogecoin-atms-arrive-in-tijuana-mexico\">CoinDesk, March 2014</a> — Genesis1 bitcoin and dogecoin ATMs arrive in Tijuana. <a href=\"https://www.coindesk.com/markets/2014/08/08/bithalo-smart-contracts-without-the-block-chain-bloat\">CoinDesk, August 2014</a> — BitHalo ships smart contracts without the blockchain bloat. <a href=\"https://bitcoinist.com/bitbay-decentralized-marketplace-and-the-internet-of-things/\">Bitcoinist, November 2016</a> — BitBay's decentralized marketplace, explained. Eleven years later: <a href=\"https://www.globenewswire.com/news-release/2025/09/08/3145992/0/en/bitcoin-s-first-true-high-speed-dex-nighttrader-launches.html\">GlobeNewswire, September 2025</a> — Bitcoin's first true high-speed DEX, NightTrader, launches.",
  "history.gut_b": "History",
  "history.gut_d": "Since 2014",
  "history.h2": "It started with an ATM on a street corner in Tijuana.",
  "history.p1": "bitcoin42 didn't begin as an exchange. It began as a bitcoin ATM operator — putting Genesis1 machines on the ground in Tijuana, Mexico in 2014, among the first of their kind anywhere.",
  "history.p2": "The same team spent that year building <a href=\"https://bithalo.org/\">BitHalo</a> — one of the first working smart-contract systems on Bitcoin, enforcing two-party agreements with multisig escrow and no trusted third party, years before Ethereum made \"smart contract\" a household word. <a href=\"https://bitbay.market/\">BitBay</a> followed in 2015: a fully decentralized marketplace built around its own multisig wallet with contracts built in, still running today. Nobody else was doing multisig this seriously on Bitcoin back then.",
  "history.p3": "Running machines was never the point. The order book was the plan from day one: a real exchange that never took custody of your coins, at a time when every exchange did exactly that. It took over a decade of building non-custodial multisig systems — and watching custodian after custodian fail in the meantime — to get it right.",
  "history.tl1": "2014 · Bitcoin ATMs, Tijuana",
  "history.tl2": "<em>2025 · NightTrader launches</em>",
  "history.tl_bitbay": "2015 · BitBay",
  "history.tl_bithalo": "2014 · BitHalo",
  "how.flow_amount": "Sign only the amount",
  "how.flow_cosign": "Nodes co-sign",
  "how.flow_key": "Key stays with you",
  "how.flow_settle": "Settle",
  "how.gut_b": "Settlement",
  "how.gut_d": "In order",
  "how.h2": "What actually happens when you place an order",
  "how.s1_h3": "Your key is generated client-side",
  "how.s1_p": "Your browser derives the key locally, or you keep it on an air-gapped signer and never expose it at all. It signs your deposit address into existence together with the node threshold key. The server never receives it, so there is nothing to breach and nothing to hand over.",
  "how.s2_h3": "You sign one amount, not your balance",
  "how.s2_p": "A bid is a signature over a specific transaction template rather than a blanket authorisation over your balance. What you commit to is determined by that template and the signature-hash mode used, and the change output is designed to stay under your control.",
  "how.s3_h3": "The quorum counter-signs and the book fills",
  "how.s3_p": "Matching happens off-chain against a live bid/ask book, and settlement is designed to batch to the chain. The second signature is held as a threshold signature across the node set, so no single operator is intended to be able to produce it alone.",
  "how.s4_h3": "The timelock is always sitting behind you",
  "how.s4_p": "Applicable coins use CHECKLOCKTIMEVERIFY. The locktime is designed to be refreshed while you trade, so in normal use you should not approach it. If you stop trading, the recovery branch eventually becomes spendable with your key alone — you construct and broadcast the recovery transaction yourself.",
  "meta.description": "A Bitcoin-native exchange with a full bid/ask order book. Accounts settle into multisig addresses you hold a key to, with a time-delayed recovery path.",
  "meta.title": "NightTrader — a Bitcoin order book you co-sign",
  "nav.controls": "Controls",
  "nav.custody": "Custody",
  "nav.fees": "Fees",
  "nav.history": "History",
  "nav.how": "How it settles",
  "nav.open": "Open exchange",
  "nav.privacy": "Privacy",
  "nav.timelock": "Timelock",
  "nav.tradeoffs": "Tradeoffs",
  "node.copy": "Copy",
  "node.copy_copied": "Copied",
  "node.copy_select": "Select all",
  "node.f": "If that channel is inconvenient for you, you are probably not the operator we are looking for.",
  "node.label": "Run a node",
  "node.p": "Node operators hold the other half of every signature and take a share of the fees. There is no signup form and no email list. Reach us over Bitmessage:",
  "privacy.label": "Privacy",
  "privacy.p1": "We collect the minimum required to run an order book and encrypt what we hold. There is no advertising pixel, no session replay, no behavioural profile, and no data broker relationship. This page makes zero third-party requests — no fonts, no analytics, no CDN. Open the network tab and confirm it rather than believing us.",
  "privacy.p2": "If we are ever compelled to verify a user, that process runs through <a href=\"https://www.zk.me/\">zkMe</a>. According to zkMe, document checks happen on your own device and nothing is transmitted to us in the clear: what we receive is a zero-knowledge proof that you passed verification rather than the underlying documents. On that basis NightTrader does not see or store your identity data; zkMe's role is limited to that verification and proof generation.",
  "privacy.p3": "And note what verification cannot do here: an account under review still has a timelock branch. Freezing an account does not put your coins beyond reach — once the locktime passes, the recovery branch is spendable with your key, whatever we decide.",
  "script.head_left": "P2SH redeem script · your account",
  "script.head_right": "Tap a highlighted term",
  "script.hint": "What you authorise is bounded by the transaction template and the signature-hash mode used: you sign a specific input and output rather than handing over your balance.",
  "script.note_exit": "OP_CHECKLOCKTIMEVERIFY. If the nodes vanish, are seized, or simply stop answering, this branch becomes spendable with your key alone once the locktime passes. You (or a recovery tool) then construct and broadcast the recovery transaction yourself — no permission, no support queue, no recovery fee.",
  "script.note_nodekey": "A threshold signature held collectively by the node set. The design is intended to prevent any single operator from reconstructing it; a supermajority must agree before the second signature exists at all.",
  "script.note_yourkey": "Derived in your browser from your credentials and designed never to be transmitted. Under this design nothing moves out of the address without a signature from this key — not a trade, not a withdrawal, not a support ticket.",
  "script.tag_exit": "Force-majeure exit",
  "script.tag_nodekey": "The node key",
  "script.tag_yourkey": "Your key",
  "theme.to_dark": "Dark",
  "theme.to_light": "Light",
  "timelock.gut_b": "Force majeure",
  "timelock.gut_d": "The exit that doesn't need us",
  "timelock.h2": "Assume we get raided tonight.",
  "timelock.l1": "Deposit",
  "timelock.l2": "Trade freely",
  "timelock.l3": "Inactive",
  "timelock.l4": "<em>Locktime → recoverable with your key</em>",
  "timelock.lede": "Servers seized, domain pulled, team unreachable, node operators gone. Under a custodial exchange that is the end of the story and the beginning of a creditors' process. Here it is a waiting period.",
  "timelock.small": "The locktime is set per account and designed to be refreshed as you trade — the book will not fill an order that would leave you near expiry, and after a long dormancy you will be asked to roll to a new script and a current node set. Once an output carrying this branch exists, the branch is enforced by consensus rather than by us: we cannot switch it off, and neither can anyone who takes our servers.",
  "timelock.step_deposit": "Coins arrive in the multisig address. The clock starts here — each account is given a locktime when it is funded.",
  "timelock.step_inactive": "No trades, no refresh. This is the phase where the countdown actually moves toward the locktime.",
  "timelock.step_locktime": "After the locktime, the recovery branch becomes spendable with your key alone. You — or a recovery tool — must construct and broadcast the recovery transaction. It needs no permission from us, and we cannot block it.",
  "timelock.step_trade": "Fills are designed to refresh the locktime. While you are actively trading, you should not approach it.",
  "timelock.viz_hint": "Tap a step to pause and inspect",
  "tradeoffs.cta_back": "Back to the script",
  "tradeoffs.gut_b": "Tradeoffs",
  "tradeoffs.gut_d": "What this is not",
  "tradeoffs.h2": "The part other exchanges leave off the front page.",
  "tradeoffs.t1_dd": "It is co-custody with a timelocked recovery path. You hold one of two required keys, which is materially different from an exchange balance and materially weaker than coins in your own cold storage. Trade here; do not store here.",
  "tradeoffs.t1_dt": "This is not self-custody",
  "tradeoffs.t2_dd": "If the quorum breaks mid-trade, half-signed transactions are simply never broadcast. You do not lose principal, but you can lose a fill and the profit that went with it.",
  "tradeoffs.t2_dt": "Nodes can go offline",
  "tradeoffs.t3_dd": "Your key is derived from your credentials. A weak password, a compromised machine or a phished login is the realistic way to lose coins here — not a hack of our servers. Use a long passphrase and 2FA, and keep your backup off the machine you trade on.",
  "tradeoffs.t3_dt": "The browser is the attack surface",
  "tradeoffs.t4_dd": "We reserve the right to request verification, run through <a href=\"https://www.zk.me/\">zkMe</a>. According to zkMe, documents are checked on your device and are not transmitted to us in the clear; what we receive is a zero-knowledge proof of a pass rather than your identity data. Note what that cannot do: freezing an account does not put your funds beyond reach forever, because the recovery branch still becomes spendable with your key after the locktime.",
  "tradeoffs.t4_dt": "We can be asked for KYC",
  "tradeoffs.t5_dd": "Bitcoin is the base pair and the design target — the first integrations were chosen for CHECKLOCKTIMEVERIFY support. Other assets are listed where the same guarantees can be reproduced. If a coin cannot be secured this way, we would rather not list it.",
  "tradeoffs.t5_dt": "Not everything here is bitcoin",
  "tradeoffs.t6_dd": "Different tool. Lightning is excellent for payments and awkward as a venue for a large order book; rollups and atomic swaps are the long-run answer and are still too expensive or too slow for daily bid/ask. We will move when they are ready.",
  "tradeoffs.t6_dt": "Not Lightning, not a rollup",
  "verify.gut_b": "Verify",
  "verify.gut_d": "Don't trust",
  "verify.h2": "Every claim above is checkable. Go check it.",
  "verify.li_data_k": "Data",
  "verify.li_data_v": "We collect the minimum to operate and encrypt what we hold. This page loads no fonts, no analytics and no third-party scripts — check the network tab.",
  "verify.li_local_k": "Run it local",
  "verify.li_local_v": "Clone the repo and serve it yourself. No packages to install, no need to visit this domain to trade.",
  "verify.li_paper_k": "Paper",
  "verify.li_paper_v": "<a href=\"https://github.com/NightTrader/nighttrader.github.io/blob/master/Nighttrader_A_Decentralized_Multisignature_Electronic_Cash_Wallet.pdf\">A Decentralized Multisignature Electronic Cash Wallet</a> — the full construction, including the Monero and EVM cases.",
  "verify.li_script_k": "Your script",
  "verify.li_script_v": "Derived deterministically, and material changes are burned on-chain. You should be able to reconstruct your own redeem script without asking us for it.",
  "verify.li_source_k": "Source",
  "verify.li_source_v": "<a href=\"https://github.com/NightTrader/nighttrader.github.io\">github.com/NightTrader</a> — the public web front end. The signing and key-derivation implementation is not published in this repository; ask us for its status before you deposit.",
  "verify.p": "A landing page is marketing. Script is not. If any line here disagrees with the code, the code is right and we have a bug to fix — tell us."
};

  // Keys whose values legitimately contain markup. Everything else is written
  // with textContent. Nothing outside this list is ever parsed as HTML.
  var MARKUP_KEYS = [
  "controls.c1_p",
  "footer.legal_p1",
  "hero.answer",
  "hero.h1",
  "history.citation",
  "history.p2",
  "history.tl2",
  "privacy.p2",
  "timelock.l4",
  "tradeoffs.t4_dd",
  "verify.li_paper_v",
  "verify.li_source_v"
];

  // Strict allowlist renderer. Translation strings are authored in-repo, but
  // parsing them as HTML is an unnecessary sink, so anything not on this list
  // is dropped and only its text survives.
  var ALLOWED_TAGS = { A: ['href'], BR: [], EM: [], SPAN: ['class'], STRONG: [] };
  // Elements whose *contents* are dropped too, rather than surfaced as text.
  var DROP_SUBTREE = { SCRIPT: 1, STYLE: 1, TEMPLATE: 1, IFRAME: 1, OBJECT: 1, EMBED: 1 };

  function renderMarkup(el, html) {
    var tpl = document.createElement('template');
    tpl.innerHTML = html;
    var out = document.createDocumentFragment();
    (function walk(src, dest) {
      Array.prototype.forEach.call(src.childNodes, function (node) {
        if (node.nodeType === 3) { dest.appendChild(document.createTextNode(node.nodeValue)); return; }
        if (node.nodeType !== 1) return;
        if (DROP_SUBTREE[node.tagName]) return;       // drop element and its contents
        var allowed = ALLOWED_TAGS[node.tagName];
        if (!allowed) { walk(node, dest); return; }   // unknown tag: keep text, drop element
        var clone = document.createElement(node.tagName.toLowerCase());
        allowed.forEach(function (attr) {
          var v = node.getAttribute(attr);
          if (v === null) return;
          if (attr === 'href' && !/^(https:|mailto:|#|\/)/i.test(v)) return;  // https, mail, in-page or root-relative only
          clone.setAttribute(attr, v);
        });
        walk(node, clone);
        dest.appendChild(clone);
      });
    })(tpl.content, out);
    el.textContent = '';
    el.appendChild(out);
  }

  var T = { en: EN };

  function loadLocale(lang) {
    if (T[lang]) return Promise.resolve(T[lang]);
    return fetch('/locales/' + lang + '.json', { credentials: 'omit' })
      .then(function (r) { if (!r.ok) throw new Error('locale ' + lang + ': HTTP ' + r.status); return r.json(); })
      .then(function (d) { T[lang] = d; return d; })
      .catch(function (err) {
        // Non-fatal: the page stays in English rather than breaking.
        if (window.console) console.warn('[i18n]', err.message);
        return null;
      });
  }

  var SUPPORTED = ['en','zh','ru','es','pt','it','ar','fr','de'];
  var OG_LOCALE = {
    en:'en_US', zh:'zh_CN', ru:'ru_RU', es:'es_ES', pt:'pt_BR',
    it:'it_IT', ar:'ar_AR', fr:'fr_FR', de:'de_DE'
  };
  var RTL = ['ar'];
  var currentLang = (SUPPORTED.indexOf(window.__ntLang) !== -1) ? window.__ntLang : 'en';

  function dict() {
    return T[currentLang] || T.en;
  }

  function applyTranslations(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = 'en';
    currentLang = lang;
    var d = T[lang] || T.en;

    document.documentElement.lang = lang;
    document.documentElement.dir = RTL.indexOf(lang) !== -1 ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var val = d[key] !== undefined ? d[key] : T.en[key];
      if (val === undefined) return;
      if (MARKUP_KEYS.indexOf(key) !== -1) renderMarkup(el, val);
      else el.textContent = val;
    });

    document.querySelectorAll('[data-i18n-tag], [data-i18n-note]').forEach(function (el) {
      var tagKey = el.getAttribute('data-i18n-tag');
      var noteKey = el.getAttribute('data-i18n-note');
      if (tagKey) {
        var tagVal = d[tagKey] !== undefined ? d[tagKey] : T.en[tagKey];
        if (tagVal !== undefined) el.setAttribute('data-tag', tagVal);
      }
      if (noteKey) {
        var noteVal = d[noteKey] !== undefined ? d[noteKey] : T.en[noteKey];
        if (noteVal !== undefined) el.setAttribute('data-note', noteVal);
      }
    });

    // Translated accessible names (aria-label) for controls with no visible text.
    document.querySelectorAll('[data-i18n-aria-label]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-aria-label');
      var v = d[k] !== undefined ? d[k] : T.en[k];
      if (v !== undefined) el.setAttribute('aria-label', v);
    });

    // Localised document metadata, so each language is described correctly.
    setMeta(d);

    // Keep the redeem-script note panel in sync with whichever token is active.
    var active = document.querySelector('.tok[aria-pressed="true"]') || document.querySelector('.tok');
    var noteTag = document.getElementById('note-tag');
    var noteBody = document.getElementById('note-body');
    if (active && noteTag && noteBody) {
      noteTag.textContent = active.dataset.tag;
      noteBody.textContent = active.dataset.note;
    }

    // Keep the custody split-diagram inspect note in sync, if a side is pinned.
    var activeSide = document.querySelector('#custody-split .split-side[aria-pressed="true"]');
    updateCustodySplitNote(activeSide);

    // Keep the timelock inspect note in sync, if a step is pinned.
    var activeStep = document.querySelector('.tl-step[aria-pressed="true"]');
    updateTlStepNote(activeStep);

    var select = document.getElementById('lang-select');
    if (select) select.value = lang;
  }

  // Reflect the active language in the URL so a translated page can be linked
  // and shared. English is the canonical bare URL and carries no parameter.
  function syncLangUrl(lang) {
    if (!window.history || !window.history.replaceState) return;
    try {
      var url = new URL(window.location.href);
      if (lang === 'en') url.searchParams.delete('lang');
      else url.searchParams.set('lang', lang);
      window.history.replaceState(null, '', url.pathname + url.search + url.hash);
    } catch (e) { /* non-fatal: the page still works, the URL just will not update */ }
  }

  // Keep <title>, description and social metadata in the active language.
  function setMeta(d) {
    function put(sel, attr, key) {
      var el = document.querySelector(sel);
      var v = d[key] !== undefined ? d[key] : T.en[key];
      if (el && v !== undefined) el.setAttribute(attr, v);
    }
    var title = d['meta.title'] !== undefined ? d['meta.title'] : T.en['meta.title'];
    if (title) document.title = title;
    put('meta[name="description"]', 'content', 'meta.description');
    put('meta[property="og:title"]', 'content', 'meta.title');
    put('meta[property="og:description"]', 'content', 'meta.description');
    put('meta[name="twitter:title"]', 'content', 'meta.title');
    put('meta[name="twitter:description"]', 'content', 'meta.description');
    var ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) ogLocale.setAttribute('content', OG_LOCALE[currentLang] || 'en_US');
  }

  function updateCustodySplitNote(sideEl) {
    var note = document.getElementById('custody-viz-note');
    var body = document.getElementById('custody-viz-note-body');
    if (!note || !body) return;
    if (!sideEl) { note.hidden = true; return; }
    var key = sideEl.id === 'split-cex' ? 'custody.viz_note_cex' : 'custody.viz_note_nt';
    var d = dict();
    body.textContent = (d[key] !== undefined ? d[key] : T.en[key]) || '';
    note.hidden = false;
  }

  function updateTlStepNote(stepEl) {
    var note = document.getElementById('tl-viz-note');
    var body = document.getElementById('tl-viz-note-body');
    if (!note || !body) return;
    if (!stepEl) { note.hidden = true; return; }
    var noteKey = stepEl.getAttribute('data-i18n-note');
    var d = dict();
    body.textContent = (d[noteKey] !== undefined ? d[noteKey] : T.en[noteKey]) || '';
    note.hidden = false;
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    // Private browsing or blocked storage: preference simply does not persist.
    try { localStorage.setItem('nt-theme', theme); } catch (e) { /* non-fatal */ }
    var meta = document.getElementById('theme-color-meta');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0B0C0F' : '#F7931A');
  }

  function init() {
    var meta = document.getElementById('theme-color-meta');
    if (meta) meta.setAttribute('content', window.__ntTheme === 'dark' ? '#0B0C0F' : '#F7931A');

    applyTranslations(currentLang);

    var themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', function () {
        var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        setTheme(isDark ? 'light' : 'dark');
      });
    }

    var langSelect = document.getElementById('lang-select');
    if (langSelect) {
      langSelect.value = currentLang;
      langSelect.addEventListener('change', function () {
        var lang = langSelect.value;
        try { localStorage.setItem('nt-lang', lang); } catch (e) { /* non-fatal */ }
        // The locale file may not be here yet; apply once it resolves.
        loadLocale(lang).then(function () {
          applyTranslations(lang);
          syncLangUrl(lang);
        });
      });
    }

    // Mobile section menu: a real disclosure, not a display:none cliff.
    var navToggle = document.getElementById('nav-toggle');
    var navLinks = document.getElementById('nav-links');
    if (navToggle && navLinks) {
      var setMenu = function (open) {
        navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (open) navLinks.setAttribute('data-open', 'true');
        else navLinks.removeAttribute('data-open');
      };
      navToggle.addEventListener('click', function () {
        setMenu(navToggle.getAttribute('aria-expanded') !== 'true');
      });
      // Choosing a destination closes the menu.
      navLinks.addEventListener('click', function (e) {
        if (e.target.closest('a')) setMenu(false);
      });
      // Escape closes and returns focus to the control that opened it.
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
          setMenu(false);
          navToggle.focus();
        }
      });
      // Clicking outside closes it.
      document.addEventListener('click', function (e) {
        if (navToggle.getAttribute('aria-expanded') !== 'true') return;
        if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) setMenu(false);
      });
      // Returning to desktop width must not leave a stale open panel.
      if (window.matchMedia) {
        var mq = window.matchMedia('(min-width: 641px)');
        var onChange = function (ev) { if (ev.matches) setMenu(false); };
        if (mq.addEventListener) mq.addEventListener('change', onChange);
        else if (mq.addListener) mq.addListener(onChange);
      }
    }

    // Custody split diagram: tap a side to pause both and inspect it.
    var splitEl = document.getElementById('custody-split');
    if (splitEl) {
      var splitSides = splitEl.querySelectorAll('.split-side');
      splitSides.forEach(function (side) {
        side.addEventListener('click', function () {
          var wasActive = side.getAttribute('aria-pressed') === 'true';
          splitSides.forEach(function (s) { s.setAttribute('aria-pressed', 'false'); });
          if (wasActive) {
            splitEl.classList.remove('paused');
            updateCustodySplitNote(null);
          } else {
            side.setAttribute('aria-pressed', 'true');
            splitEl.classList.add('paused');
            updateCustodySplitNote(side);
          }
        });
      });
    }

    // Timelock dead-man's switch: tap a step to pause, jump there, and inspect it.
    var dmsEl = document.getElementById('timelock-dms');
    var tlMarker = document.getElementById('tl-marker');
    if (dmsEl) {
      var tlSteps = dmsEl.querySelectorAll('.tl-step');
      tlSteps.forEach(function (step) {
        step.addEventListener('click', function () {
          var wasActive = step.getAttribute('aria-pressed') === 'true';
          tlSteps.forEach(function (s) { s.setAttribute('aria-pressed', 'false'); s.classList.remove('active'); });
          if (wasActive) {
            dmsEl.classList.remove('paused');
            if (tlMarker) tlMarker.style.left = '';
            updateTlStepNote(null);
          } else {
            step.setAttribute('aria-pressed', 'true');
            step.classList.add('active');
            dmsEl.classList.add('paused');
            if (tlMarker) tlMarker.style.left = step.getAttribute('data-step') + '%';
            updateTlStepNote(step);
          }
        });
      });
    }

    // Annotated script: click a token, the margin note changes.
    var toks = document.querySelectorAll('.tok');
    var tag = document.getElementById('note-tag');
    var body = document.getElementById('note-body');
    toks.forEach(function (t) {
      t.addEventListener('click', function () {
        toks.forEach(function (o) { o.setAttribute('aria-pressed', 'false'); });
        t.setAttribute('aria-pressed', 'true');
        tag.textContent = t.dataset.tag;
        body.textContent = t.dataset.note;
      });
    });

    // Bitmessage address: copy, with a select-all fallback.
    // Outcome is announced via a live region, not just by mutating the label.
    var copy = document.getElementById('bm-copy');
    var copyStatus = document.getElementById('copy-status');
    if (copy) {
      var announce = function (key) {
        var d = dict();
        var msg = d[key] !== undefined ? d[key] : T.en[key];
        if (copyStatus) copyStatus.textContent = msg || '';
      };
      copy.addEventListener('click', function () {
        var addr = copy.dataset.addr;
        var done = function () {
          copy.textContent = dict()['node.copy_copied'];
          announce('a11y.copy_ok');
          setTimeout(function () { copy.textContent = dict()['node.copy']; }, 1800);
        };
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(addr).then(done, select);
        } else {
          select();
        }
        function select() {
          var r = document.createRange();
          r.selectNodeContents(document.getElementById('bm-addr'));
          var s = window.getSelection();
          s.removeAllRanges();
          s.addRange(r);
          copy.textContent = dict()['node.copy_select'];
          announce('a11y.copy_fallback');
          setTimeout(function () { copy.textContent = dict()['node.copy']; }, 1800);
        }
      });
    }
  }


  // Boot. English renders from the inline HTML immediately; a non-English
  // choice resolves as soon as its locale file arrives.
  function boot() {
    if (currentLang === 'en') { init(); return; }
    loadLocale(currentLang).then(function () { init(); });
  }
  boot();
})();
