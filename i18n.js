/* NightTrader — i18n + theme engine. No third-party requests. */
(function () {
  'use strict';

  var T = {};

  T.en = {
    'nav.custody':'Custody','nav.how':'How it settles','nav.controls':'Controls','nav.timelock':'Timelock',
    'nav.fees':'Fees','nav.privacy':'Privacy','nav.tradeoffs':'Tradeoffs','nav.history':'History','nav.open':'Open exchange',
    'theme.to_dark':'Dark','theme.to_light':'Light',
    'hero.kicker':'Bitcoin-native · Non-custodial · Full bid / ask order book',
    'hero.h1':'Not your keys,<br>not your coins.<br><span class="thin">So we gave you a key.</span>',
    'hero.answer':'Every NightTrader account is a 2-of-2 or 3-of-3 multisig address.<br>\n    One key is yours, generated in your browser. The exchange cannot spend without it.',
    'hero.lede':'A real order book — limit bids, limit asks, tight spreads — without an omnibus wallet holding your stack. No wrapped BTC. No IOU balance in someone else\'s database. No exit to scam.',
    'hero.cta_open':'Open the exchange','hero.cta_paper':'Read the paper','hero.cta_source':'Read the source',
    'hero.cta_note':'Non-custodial · No signup wall to browse the book · Withdraw whenever you want',
    'script.head_left':'P2SH redeem script · your account','script.head_right':'Tap a highlighted term',
    'script.tag_yourkey':'Your key',
    'script.note_yourkey':'Derived in your browser from your credentials and never transmitted. Nothing moves out of the address without a signature from this key — not a trade, not a withdrawal, not a support ticket.',
    'script.tag_nodekey':'The node key',
    'script.note_nodekey':'A threshold signature held collectively by the node set. No single operator can reconstruct it; a supermajority must agree before the second signature exists at all.',
    'script.tag_exit':'Force-majeure exit',
    'script.note_exit':'OP_CHECKLOCKTIMEVERIFY. If the nodes vanish, are seized, or simply stop answering, this branch activates on schedule and pays the address out to your key alone. No permission, no support queue, no recovery fee.',
    'script.hint':'Trades authorise a single amount with SIGHASH_SINGLE. Bid 0.2 BTC out of a 10 BTC balance and 0.2 BTC is all you have signed away.',
    'custody.gut_b':'Custody','custody.gut_d':'Who can move it',
    'custody.h2':'Four ways to trade bitcoin. Only one of them leaves the key with you and still gives you a book.',
    'custody.lede':'Bisq and RoboSats are honest, non-custodial venues and we say so. The tradeoff they make is cost and speed: every trade is an on-chain event, and continuous depth is hard to build on top of that. We made a different tradeoff.',
    'custody.th_nighttrader':'NightTrader','custody.th_cex':'Custodial CEX','custody.th_wrapped':'Wrapped BTC on a DEX','custody.th_atomic':'Atomic swap DEX',
    'custody.row1_th':'Who can move your coins','custody.row1_us':'You + node quorum, per trade','custody.row1_cex':'The exchange, unilaterally','custody.row1_wrapped':'The bridge custodian','custody.row1_atomic':'You',
    'custody.row2_th':'What you hold','custody.row2_us':'A key in a multisig UTXO','custody.row2_cex':'A database row','custody.row2_wrapped':'A token claim on someone\'s reserve','custody.row2_atomic':'A key',
    'custody.row3_th':'If the venue disappears','custody.row3_us':'Timelock returns your coins','custody.row3_cex':'Bankruptcy claim','custody.row3_wrapped':'Depends on the custodian','custody.row3_atomic':'You keep your coins',
    'custody.row4_th':'Order book','custody.row4_us':'Full bid / ask, off-chain matching','custody.row4_cex':'Full bid / ask','custody.row4_wrapped':'AMM pool, no bids','custody.row4_atomic':'Thin, slow to fill',
    'custody.row5_th':'Chain cost per trade','custody.row5_us':'None — settlement is batched','custody.row5_cex':'None','custody.row5_wrapped':'Gas on every swap','custody.row5_atomic':'Multiple on-chain txs',
    'custody.row6_th':'Exposure while trading','custody.row6_us':'Only the amount you signed','custody.row6_cex':'Your entire balance','custody.row6_wrapped':'Your entire wrapped balance','custody.row6_atomic':'The trade amount',
    'custody.small':'Off-chain matching means the book moves at exchange speed; the chain only sees settlement. That is the whole trick, and it is built out of script primitives Bitcoin has had since 2009.',
    'custody.viz_label_cex':'Custodial exchange','custody.viz_caption_cex':'Coins sit in one wallet. Custody — and control — is theirs.',
    'custody.viz_note_cex':'A custodial exchange pools every user\'s coins into wallets it alone controls. It can freeze, lose, or drain them — nothing in the protocol stops that.',
    'custody.viz_label_nt':'NightTrader','custody.viz_caption_nt':'Your key never leaves your device. Only the signed amount goes.',
    'custody.viz_note_nt':'Your key is generated in your browser and never leaves your device. Each trade authorises one signed, size-limited amount — never your whole balance, never custody.',
    'custody.viz_hint':'Tap a side to pause and inspect',
    'how.gut_b':'Settlement','how.gut_d':'In order','how.h2':'What actually happens when you place an order',
    'how.s1_h3':'Your key is generated client-side',
    'how.s1_p':'Your browser derives the key locally, or you keep it on an air-gapped signer and never expose it at all. It signs your deposit address into existence together with the node threshold key. The server never receives it, so there is nothing to breach and nothing to hand over.',
    'how.s2_h3':'You sign one amount, not your balance',
    'how.s2_p':'A bid is a signature hash authorising a specific input for a specific size — Bitcoin\'s original allowance mechanism. Your change output stays under your control. The nodes can only route the amount you signed.',
    'how.s3_h3':'The quorum counter-signs and the book fills',
    'how.s3_p':'Matching happens off-chain against a live bid/ask book. Settlement batches to the chain. No single node can produce the second signature alone; a threshold has to agree.',
    'how.s4_h3':'The timelock is always sitting behind you',
    'how.s4_p':'Every applicable coin uses CHECKLOCKTIMEVERIFY. Refresh it while you trade and you never approach it. Stop trading and it eventually pays you out anyway.',
    'how.flow_key':'Key stays with you','how.flow_amount':'Sign only the amount','how.flow_cosign':'Nodes co-sign','how.flow_settle':'Settle',
    'controls.gut_b':'Controls','controls.gut_d':'What you hold and watch','controls.h2':'Three things the exchange hands you and cannot take back.',
    'controls.c1_h3':'Sign from an air-gapped device',
    'controls.c1_p':'Your key does not have to live in a browser tab. Pair an offline signer — an air-gapped phone running <a href="https://airgap.it/">AirGap Vault</a> or a compatible hardware wallet — and the key never touches an internet-connected machine. Orders and withdrawals cross the gap as QR codes: unsigned request out, signature back in. The exchange sees a signature and nothing else.',
    'controls.c1_qr':'Unsigned request → QR → signature back',
    'controls.c2_h3':'Your backup script, at signup',
    'controls.c2_p':'The redeem script is shown to you when your account is created — not buried in a support article, not available on request. Save it. With that script and your key you can reconstruct and spend the timelock branch yourself, from any wallet that speaks Bitcoin script, with the exchange gone and this domain dead.',
    'controls.c3_h3':'Node health, on screen',
    'controls.c3_p':'Logged in, you see the live state of the node set holding the other signature — who is up, whether the quorum is intact. If the backend is degrading you find out from the interface, not from a status page written after the fact. A venue that hides its own health is telling you something.',
    'timelock.gut_b':'Force majeure','timelock.gut_d':'The exit that doesn\'t need us','timelock.h2':'Assume we get raided tonight.',
    'timelock.lede':'Servers seized, domain pulled, team unreachable, node operators gone. Under a custodial exchange that is the end of the story and the beginning of a creditors\' process. Here it is a waiting period.',
    'timelock.l1':'Deposit','timelock.l2':'Trade freely','timelock.l3':'Inactive','timelock.l4':'<em>Locktime → paid to your key</em>',
    'timelock.small':'The locktime is set per account and refreshed as you trade — the book will not fill an order that would leave you near expiry, and after a long dormancy you will be asked to roll to a new script and a current node set. The branch is enforced by consensus, not by us. We cannot switch it off, and neither can anyone who takes our servers.',
    'timelock.step_deposit':'Coins arrive in the multisig address. The clock starts here — every account gets a fresh locktime the moment it\'s funded.',
    'timelock.step_trade':'Every fill you make refreshes the locktime. As long as you\'re actively trading, you never get close to it.',
    'timelock.step_inactive':'No trades, no refresh. This is the only phase where the countdown actually moves toward zero.',
    'timelock.step_locktime':'OP_CHECKLOCKTIMEVERIFY fires on schedule. The address pays out to your key alone — no permission needed, no one to ask, nothing we can stop.',
    'timelock.viz_hint':'Tap a step to pause and inspect',
    'fees.gut_b':'Fees','fees.gut_d':'All of them','fees.h2':'Three numbers. There is no fourth.',
    'fees.f1_l':'Per completed trade','fees.f2_l':'Transfer between accounts','fees.f3_l':'Withdrawal to your own wallet',
    'fees.p':'Fees pay the node operators who hold the other half of the signature. There is no NightTrader token, no pre-mine, no treasury taking a cut of your trade, and no yield being promised to anyone. The exchange was launched without issuing a coin on purpose.',
    'fees.th1':'Taker fee, for comparison','fees.row_nt':'0.125% — you hold a key','fees.row_uniswap':'0.30% + gas + slippage','fees.row_coinbase':'up to 0.40% — custodial','fees.row_kraken':'0.20% — custodial','fees.row_binance':'0.10% — custodial',
    'fees.small':'Listing a coin costs the project, not the traders. Integration and contract auditing are quoted per project. Nothing on this page is a promise of returns, liquidity, or execution quality.',
    'verify.gut_b':'Verify','verify.gut_d':'Don\'t trust','verify.h2':'Every claim above is checkable. Go check it.',
    'verify.p':'A landing page is marketing. Script is not. If any line here disagrees with the code, the code is right and we have a bug to fix — tell us.',
    'verify.li_source_k':'Source','verify.li_source_v':'<a href="https://github.com/NightTrader/nighttrader.github.io">github.com/NightTrader</a> — front end and signing logic. Read the key derivation before you deposit.',
    'verify.li_local_k':'Run it local','verify.li_local_v':'Clone the repo and serve it yourself. No packages to install, no need to visit this domain to trade.',
    'verify.li_paper_k':'Paper','verify.li_paper_v':'<a href="https://github.com/NightTrader/nighttrader.github.io/blob/master/Nighttrader_A_Decentralized_Multisignature_Electronic_Cash_Wallet.pdf">A Decentralized Multisignature Electronic Cash Wallet</a> — the full construction, including the Monero and EVM cases.',
    'verify.li_script_k':'Your script','verify.li_script_v':'Derived deterministically, and material changes are burned on-chain. You should be able to reconstruct your own redeem script without asking us for it.',
    'verify.li_data_k':'Data','verify.li_data_v':'We collect the minimum to operate and encrypt what we hold. This page loads no fonts, no analytics and no third-party scripts — check the network tab.',
    'privacy.label':'Privacy',
    'privacy.p1':'We collect the minimum required to run an order book and encrypt what we hold. There is no advertising pixel, no session replay, no behavioural profile, and no data broker relationship. This page makes zero third-party requests — no fonts, no analytics, no CDN. Open the network tab and confirm it rather than believing us.',
    'privacy.p2':'If we are ever compelled to verify a user, that process runs through <a href="https://www.zk.me/">zkMe</a>. Document checks happen on your own device — nothing is transmitted to us in the clear. What we receive is a zero-knowledge proof that you passed verification, not the underlying documents. NightTrader never sees or stores your identity data ourselves; zkMe\'s role is limited to that verification and proof generation.',
    'privacy.p3':'And note what verification cannot do here: an account under review still has a timelock branch. Freezing an account does not freeze your coins, because the script pays you out whatever we decide.',
    'node.label':'Run a node','node.p':'Node operators hold the other half of every signature and take a share of the fees. There is no signup form and no email list. Reach us over Bitmessage:',
    'node.copy':'Copy','node.copy_copied':'Copied','node.copy_select':'Select all',
    'node.f':'If that channel is inconvenient for you, you are probably not the operator we are looking for.',
    'tradeoffs.gut_b':'Tradeoffs','tradeoffs.gut_d':'What this is not','tradeoffs.h2':'The part other exchanges leave off the front page.',
    'tradeoffs.t1_dt':'This is not self-custody','tradeoffs.t1_dd':'It is co-custody with a timelocked exit. You hold one of two required keys, which is strictly better than an exchange balance and strictly worse than coins in your own cold storage. Trade here; do not store here.',
    'tradeoffs.t2_dt':'Nodes can go offline','tradeoffs.t2_dd':'If the quorum breaks mid-trade, half-signed transactions are simply never broadcast. You do not lose principal, but you can lose a fill and the profit that went with it.',
    'tradeoffs.t3_dt':'The browser is the attack surface','tradeoffs.t3_dd':'Your key is derived from your credentials. A weak password, a compromised machine or a phished login is the realistic way to lose coins here — not a hack of our servers. Use a long passphrase and 2FA, and keep your backup off the machine you trade on.',
    'tradeoffs.t4_dt':'We can be asked for KYC','tradeoffs.t4_dd':'We reserve the right to request verification, run through <a href="https://www.zk.me/">zkMe</a>. Documents are checked on your device and never reach us — we receive a zero-knowledge proof of a pass, not your identity data. Note what that cannot do: freezing an account does not freeze your funds forever, because the timelock branch still executes.',
    'tradeoffs.t5_dt':'Not everything here is bitcoin','tradeoffs.t5_dd':'Bitcoin is the base pair and the design target — the first integrations were chosen for CHECKLOCKTIMEVERIFY support. Other assets are listed where the same guarantees can be reproduced. If a coin cannot be secured this way, we would rather not list it.',
    'tradeoffs.t6_dt':'Not Lightning, not a rollup','tradeoffs.t6_dd':'Different tool. Lightning is excellent for payments and awkward as a venue for a large order book; rollups and atomic swaps are the long-run answer and are still too expensive or too slow for daily bid/ask. We will move when they are ready.',
    'tradeoffs.cta_back':'Back to the script',
    'history.gut_b':'History','history.gut_d':'Since 2014','history.h2':'It started with an ATM on a street corner in Tijuana.',
    'history.p1':'bitcoin42 didn\'t begin as an exchange. It began as a bitcoin ATM operator — putting Genesis1 machines on the ground in Tijuana, Mexico in 2014, among the first of their kind anywhere.',
    'history.p2':'The same team spent that year building <a href="https://bithalo.org/">BitHalo</a> — one of the first working smart-contract systems on Bitcoin, enforcing two-party agreements with multisig escrow and no trusted third party, years before Ethereum made "smart contract" a household word. <a href="https://bitbay.market/">BitBay</a> followed in 2015: a fully decentralized marketplace built around its own multisig wallet with contracts built in, still running today. Nobody else was doing multisig this seriously on Bitcoin back then.',
    'history.p3':'Running machines was never the point. The order book was the plan from day one: a real exchange that never took custody of your coins, at a time when every exchange did exactly that. It took over a decade of building non-custodial multisig systems — and watching custodian after custodian fail in the meantime — to get it right.',
    'history.tl1':'2014 · Bitcoin ATMs, Tijuana','history.tl_bithalo':'2014 · BitHalo','history.tl_bitbay':'2015 · BitBay','history.tl2':'<em>2025 · NightTrader launches</em>',
    'history.citation':'Coverage from the time: <a href="https://www.coindesk.com/markets/2014/03/28/money-spinners-genesis1-bitcoin-and-dogecoin-atms-arrive-in-tijuana-mexico">CoinDesk, March 2014</a> — Genesis1 bitcoin and dogecoin ATMs arrive in Tijuana. <a href="https://www.coindesk.com/markets/2014/08/08/bithalo-smart-contracts-without-the-block-chain-bloat">CoinDesk, August 2014</a> — BitHalo ships smart contracts without the blockchain bloat. <a href="https://bitcoinist.com/bitbay-decentralized-marketplace-and-the-internet-of-things/">Bitcoinist, November 2016</a> — BitBay\'s decentralized marketplace, explained. Eleven years later: <a href="https://www.globenewswire.com/news-release/2025/09/08/3145992/0/en/bitcoin-s-first-true-high-speed-dex-nighttrader-launches.html">GlobeNewswire, September 2025</a> — Bitcoin\'s first true high-speed DEX, NightTrader, launches.',
    'footer.col_exchange':'Exchange','footer.link_trade':'Trade','footer.link_list':'List a coin',
    'footer.col_legal':'Legal','footer.link_risk':'Risk disclosure',
    'footer.link_whitepaper':'Whitepaper','footer.link_airgapped':'Air-gapped signing','footer.link_tradeoffs':'Known tradeoffs',
    'footer.imp_h4':'Legal notice · Operator','footer.imp_email_label':'E-Mail:',
    'footer.legal_p1':'NightTrader.Exchange is a non-custodial trading interface. It is not a bank, a broker, a custodian or an investment service, and nothing here is investment advice or a promise of yield, liquidity or execution. Trading digital assets can result in total loss. You are responsible for your own key and your own backups.',
    'footer.legal_p2':'Served from bitcoin42.com — registered 2014 · No third-party requests on this page.',
    'footer.lang_label':'Language'
  };

  T.zh = {
    'nav.custody':'托管方式','nav.how':'结算流程','nav.controls':'控制权','nav.timelock':'时间锁',
    'nav.fees':'费用','nav.privacy':'隐私','nav.tradeoffs':'权衡取舍','nav.history':'发展历程','nav.open':'打开交易所',
    'theme.to_dark':'深色','theme.to_light':'浅色',
    'hero.kicker':'原生比特币 · 非托管 · 完整买卖双向订单簿',
    'hero.h1':'私钥不在你手,<br>币就不算你的。<br><span class="thin">所以我们给了你一把钥匙。</span>',
    'hero.answer':'每个 NightTrader 账户都是一个 2-of-2 或 3-of-3 多重签名地址。<br>\n    其中一把密钥属于你,在你的浏览器中生成。没有它,交易所无法动用资金。',
    'hero.lede':'真正的订单簿——限价买单、限价卖单、紧密点差——而不是由一个统一钱包托管你的全部资产。没有包装 BTC,没有存在别人数据库里的欠条余额,也没有卷款跑路的出口。',
    'hero.cta_open':'打开交易所','hero.cta_paper':'阅读白皮书','hero.cta_source':'查看源代码',
    'hero.cta_note':'非托管 · 无需注册即可浏览订单簿 · 随时提现',
    'script.head_left':'P2SH 赎回脚本 · 你的账户','script.head_right':'点击高亮词条查看说明',
    'script.tag_yourkey':'你的密钥',
    'script.note_yourkey':'在你的浏览器中根据你的凭证派生,从不上传。没有这把密钥的签名,任何资金都无法从该地址转出——无论是交易、提现,还是客服操作。',
    'script.tag_nodekey':'节点密钥',
    'script.note_nodekey':'由节点集合共同持有的门限签名。任何单一运营者都无法单独重构该密钥;必须达到多数节点同意,第二个签名才可能存在。',
    'script.tag_exit':'不可抗力退出分支',
    'script.note_exit':'OP_CHECKLOCKTIMEVERIFY。如果节点消失、被查封,或只是不再响应,该分支会按预定时间自动激活,将资金全部支付给你的密钥。无需任何许可,无需排队等待客服,也没有找回手续费。',
    'script.hint':'交易通过 SIGHASH_SINGLE 只授权单一金额。用 10 BTC 余额中的 0.2 BTC 挂单,你签署放弃的也只有这 0.2 BTC。',
    'custody.gut_b':'托管方式','custody.gut_d':'谁能动用资金',
    'custody.h2':'交易比特币的四种方式。只有一种既能把密钥留在你手中,又能提供一本订单簿。',
    'custody.lede':'Bisq 和 RoboSats 是诚实的非托管平台,这点我们承认。它们付出的代价是成本与速度:每一笔交易都是一次链上事件,在此基础上很难建立持续的深度。我们做出了不同的取舍。',
    'custody.th_nighttrader':'NightTrader','custody.th_cex':'托管型中心化交易所','custody.th_wrapped':'DEX 上的包装 BTC','custody.th_atomic':'原子交换 DEX',
    'custody.row1_th':'谁能动用你的资金','custody.row1_us':'你 + 节点法定人数,按笔交易','custody.row1_cex':'交易所单方面决定','custody.row1_wrapped':'跨链桥托管方','custody.row1_atomic':'你自己',
    'custody.row2_th':'你持有什么','custody.row2_us':'多重签名 UTXO 中的一把密钥','custody.row2_cex':'数据库里的一行记录','custody.row2_wrapped':'对他人储备的代币索取权','custody.row2_atomic':'一把密钥',
    'custody.row3_th':'如果平台消失','custody.row3_us':'时间锁把资金还给你','custody.row3_cex':'破产债权','custody.row3_wrapped':'取决于托管方','custody.row3_atomic':'资金始终在你手中',
    'custody.row4_th':'订单簿','custody.row4_us':'完整买卖双向,链下撮合','custody.row4_cex':'完整买卖双向','custody.row4_wrapped':'AMM 资金池,无挂单','custody.row4_atomic':'深度稀薄,成交缓慢',
    'custody.row5_th':'每笔交易的链上成本','custody.row5_us':'无——结算被批量打包','custody.row5_cex':'无','custody.row5_wrapped':'每次兑换都要付 Gas','custody.row5_atomic':'多笔链上交易',
    'custody.row6_th':'交易中的风险敞口','custody.row6_us':'仅限你签署的金额','custody.row6_cex':'你的全部余额','custody.row6_wrapped':'你全部的包装资产余额','custody.row6_atomic':'该笔交易金额',
    'custody.small':'链下撮合意味着订单簿以交易所速度运转;链上只看到最终结算。这就是全部的诀窍,而且它完全建立在比特币自 2009 年就已具备的脚本原语之上。',
    'custody.viz_label_cex':'托管型交易所','custody.viz_caption_cex':'资金全部放在同一个钱包里。托管权——也就是控制权——在他们手中。',
    'custody.viz_note_cex':'托管型交易所把所有用户的资金汇集到它独自控制的钱包中。它可以冻结、丢失或卷走这些资金——协议本身没有任何机制能阻止这一点。',
    'custody.viz_label_nt':'NightTrader','custody.viz_caption_nt':'你的密钥从不离开你的设备。离开的只有已签署的那笔金额。',
    'custody.viz_note_nt':'你的密钥在浏览器中生成,从不离开你的设备。每笔交易只授权一个已签署、限定金额的操作——从不涉及你的全部余额,也从不构成托管。',
    'custody.viz_hint':'点击任意一侧可暂停并查看详情',
    'how.gut_b':'结算流程','how.gut_d':'按顺序','how.h2':'下单之后究竟发生了什么',
    'how.s1_h3':'密钥在客户端生成',
    'how.s1_p':'你的浏览器在本地派生密钥,或者你把它保存在离线签名设备上,完全不对外暴露。它与节点门限密钥共同签署,生成你的存款地址。服务器从未收到过这把密钥,因此没有什么可被入侵,也没有什么可被交出。',
    'how.s2_h3':'你签署的是单笔金额,而非全部余额',
    'how.s2_p':'一笔挂单就是一个签名哈希,为特定输入授权特定金额——这是比特币最初就具备的额度授权机制。找零输出始终在你的控制之下。节点只能划转你已签署的那笔金额。',
    'how.s3_h3':'节点法定人数完成第二签名,订单成交',
    'how.s3_p':'撮合在链下针对实时买卖订单簿完成。结算被批量打包上链。任何单一节点都无法独自完成第二个签名;必须达到门限数量的节点一致同意。',
    'how.s4_h3':'时间锁始终在你身后守候',
    'how.s4_p':'每种适用币种都使用 CHECKLOCKTIMEVERIFY。只要你在交易,它就会被刷新,你永远不会真正逼近到期时间。一旦你停止交易,它最终仍会把资金支付给你。',
    'how.flow_key':'密钥留在你手中','how.flow_amount':'只签署这笔金额','how.flow_cosign':'节点共同签名','how.flow_settle':'完成结算',
    'controls.gut_b':'控制权','controls.gut_d':'你持有什么、监控什么','controls.h2':'交易所交给你、且无法收回的三样东西。',
    'controls.c1_h3':'用离线设备签名',
    'controls.c1_p':'你的密钥不必留在浏览器标签页里。搭配一台离线签名设备——比如运行 <a href="https://airgap.it/">AirGap Vault</a> 的离线手机,或兼容的硬件钱包——密钥就永远不会接触联网设备。订单和提现请求以二维码形式跨越这道隔离:未签名请求发出,签名结果传回。交易所看到的只有一个签名,别无其他。',
    'controls.c1_qr':'未签名请求 → 二维码 → 签名传回',
    'controls.c2_h3':'注册时即拿到你的备份脚本',
    'controls.c2_p':'赎回脚本在账户创建时就展示给你——不是藏在客服文章里,也不是要申请才能拿到。保存好它。凭这份脚本和你的密钥,即便交易所消失、这个域名失效,你也能在任何支持比特币脚本的钱包中自行重构并花费时间锁分支。',
    'controls.c3_h3':'节点健康状况,实时可见',
    'controls.c3_p':'登录后,你能看到持有另一半签名的节点集合的实时状态——哪些在线、法定人数是否完整。如果后端出现问题,你会从界面上第一时间发现,而不是事后才看到一份状态公告。一个隐藏自身健康状况的平台,本身就说明了问题。',
    'timelock.gut_b':'不可抗力','timelock.gut_d':'不需要我们批准的退出方式','timelock.h2':'假设我们今晚就被查封了。',
    'timelock.lede':'服务器被查封、域名被撤下、团队联系不上、节点运营者全部消失。在托管型交易所之下,这就是故事的终点,也是破产清算程序的起点。而在这里,这只是一段等待期。',
    'timelock.l1':'存入','timelock.l2':'自由交易','timelock.l3':'不活跃','timelock.l4':'<em>到期 → 资金支付给你的密钥</em>',
    'timelock.small':'到期时间按账户单独设置,并随着你的交易不断刷新——订单簿不会撮合任何会让你逼近到期的挂单;长期不活跃后,系统会要求你迁移到新脚本和当前节点集合。这个分支由共识强制执行,而非由我们决定。我们无法关闭它,任何拿下我们服务器的人也同样做不到。',
    'timelock.step_deposit':'资金存入多重签名地址,倒计时从这一刻开始——每个账户在完成入金的瞬间就会获得一个全新的到期时间。',
    'timelock.step_trade':'你的每一笔成交都会刷新到期时间。只要你在持续交易,就永远不会真正逼近它。',
    'timelock.step_inactive':'没有交易,也就没有刷新。这是唯一一个倒计时会真正向零推进的阶段。',
    'timelock.step_locktime':'OP_CHECKLOCKTIMEVERIFY 按计划触发。地址中的资金将只支付给你的密钥——无需任何许可,无需向任何人申请,我们也无法阻止。',
    'timelock.viz_hint':'点击任意步骤可暂停并查看详情',
    'fees.gut_b':'费用','fees.gut_d':'全部费用,一览无余','fees.h2':'三个数字。没有第四个。',
    'fees.f1_l':'每笔成交交易','fees.f2_l':'账户间转账','fees.f3_l':'提现到你自己的钱包',
    'fees.p':'费用支付给持有另一半签名的节点运营者。没有 NightTrader 代币,没有预挖,没有金库从你的交易中抽成,也没有向任何人承诺过收益。这个交易所在启动时就刻意没有发行任何代币。',
    'fees.th1':'吃单费率对比','fees.row_nt':'0.125% ——你持有密钥','fees.row_uniswap':'0.30% + Gas + 滑点','fees.row_coinbase':'最高 0.40% ——托管型','fees.row_kraken':'0.20% ——托管型','fees.row_binance':'0.10% ——托管型',
    'fees.small':'上币成本由项目方承担,而非交易者。集成与合约审计按项目单独报价。本页面的任何内容都不构成对收益、流动性或成交质量的承诺。',
    'verify.gut_b':'验证','verify.gut_d':'不要相信,去验证','verify.h2':'上面的每一句话都可以核实。去核实它。',
    'verify.p':'落地页是营销手段,代码不是。如果这里的任何一句话与代码不符,那么代码才是对的,说明我们有一个 bug 需要修复——请告诉我们。',
    'verify.li_source_k':'源代码','verify.li_source_v':'<a href="https://github.com/NightTrader/nighttrader.github.io">github.com/NightTrader</a> ——前端与签名逻辑。存款前请先阅读密钥派生部分。',
    'verify.li_local_k':'本地运行','verify.li_local_v':'克隆仓库,自己部署运行。无需安装任何依赖包,交易也无需访问这个域名。',
    'verify.li_paper_k':'白皮书','verify.li_paper_v':'<a href="https://github.com/NightTrader/nighttrader.github.io/blob/master/Nighttrader_A_Decentralized_Multisignature_Electronic_Cash_Wallet.pdf">A Decentralized Multisignature Electronic Cash Wallet</a> ——完整的构造方案,包括 Monero 与 EVM 场景。',
    'verify.li_script_k':'你的脚本','verify.li_script_v':'确定性派生,任何实质性变更都会被永久记录上链。你应当无需向我们索取,就能自行重构出自己的赎回脚本。',
    'verify.li_data_k':'数据','verify.li_data_v':'我们只收集运营所需的最少数据,并对所持有的数据加密。本页面不加载任何字体、分析工具或第三方脚本——你可以打开网络面板自行核实。',
    'privacy.label':'隐私',
    'privacy.p1':'我们只收集运行订单簿所必需的最少数据,并对所持有的数据加密。没有广告像素,没有会话回放,没有行为画像,也没有与数据经纪商的任何关系。本页面零第三方请求——没有字体、没有分析工具、没有 CDN。打开网络面板自行核实,而不是听信我们的一面之词。',
    'privacy.p2':'如果我们被迫对某位用户进行身份核验,该流程通过 <a href="https://www.zk.me/">zkMe</a> 完成。证件核验在你自己的设备上完成——没有任何明文数据传输给我们。我们收到的只是一个证明你通过核验的零知识证明,而不是底层证件本身。NightTrader 自身从未看到过也未存储过你的身份数据;zkMe 的角色仅限于核验和生成证明。',
    'privacy.p3':'另外请注意身份核验做不到什么:处于审核中的账户依然拥有时间锁分支。冻结账户并不能冻结你的资金,因为该脚本无论我们如何决定,最终都会把资金支付给你。',
    'node.label':'运行一个节点','node.p':'节点运营者持有每一笔签名的另一半,并分得一部分手续费。没有报名表单,也没有邮件列表。请通过 Bitmessage 联系我们:',
    'node.copy':'复制','node.copy_copied':'已复制','node.copy_select':'已全选',
    'node.f':'如果这个渠道对你不方便,那你大概率不是我们在寻找的那种节点运营者。',
    'tradeoffs.gut_b':'权衡取舍','tradeoffs.gut_d':'这不是什么','tradeoffs.h2':'其他交易所不会写在首页上的部分。',
    'tradeoffs.t1_dt':'这不是自我托管','tradeoffs.t1_dd':'这是带时间锁退出机制的共同托管。你持有两把必需密钥中的一把——这严格优于交易所账户余额,也严格劣于放在你自己冷钱包里的资金。可以在这里交易;但不要把它当作储存地。',
    'tradeoffs.t2_dt':'节点可能离线','tradeoffs.t2_dd':'如果法定人数在交易过程中被打破,半签名的交易根本不会被广播出去。你不会损失本金,但可能错失一次成交以及随之而来的利润。',
    'tradeoffs.t3_dt':'浏览器才是真正的攻击面','tradeoffs.t3_dd':'你的密钥源自你的登录凭证。弱密码、被入侵的设备或被钓鱼的登录信息,才是这里丢币的现实途径——而不是我们服务器被攻破。请使用足够长的口令并开启双重验证,并把备份保存在你交易所用设备之外。',
    'tradeoffs.t4_dt':'我们可能要求进行 KYC','tradeoffs.t4_dd':'我们保留要求身份核验的权利,该流程通过 <a href="https://www.zk.me/">zkMe</a> 完成。证件在你的设备上核验,从不传给我们——我们收到的只是一个通过核验的零知识证明,而非你的身份数据。请注意这做不到什么:冻结账户并不会永久冻结你的资金,因为时间锁分支依然会执行。',
    'tradeoffs.t5_dt':'这里并非所有资产都是比特币','tradeoffs.t5_dd':'比特币是基础交易对,也是设计目标——最初的集成资产都是因为支持 CHECKLOCKTIMEVERIFY 才被选中的。其他资产只有在能复现同样保障的情况下才会被上线。如果一种币无法以这种方式得到保障,我们宁可不上线它。',
    'tradeoffs.t6_dt':'这不是闪电网络,也不是 Rollup','tradeoffs.t6_dd':'工具不同,用途也不同。闪电网络非常适合支付,却很难承载一本大型订单簿;Rollup 和原子交换才是长远答案,但目前仍然太贵或太慢,无法支撑每日的买卖挂单需求。等它们准备好了,我们会跟进。',
    'tradeoffs.cta_back':'返回查看脚本',
    'history.gut_b':'发展历程','history.gut_d':'始于 2014 年','history.h2':'一切始于蒂华纳街角的一台比特币 ATM。',
    'history.p1':'bitcoin42 最初并不是一家交易所,而是一家比特币 ATM 运营商——2014 年,我们把 Genesis1 机器投放在墨西哥蒂华纳的街头,是全球最早的一批同类设备之一。',
    'history.p2':'同一年,同一支团队还打造了 <a href="https://bithalo.org/">BitHalo</a>——比特币上最早真正可用的智能合约系统之一,靠多重签名托管在没有可信第三方的情况下强制执行双方协议,比"智能合约"因以太坊而成为流行词还要早上好几年。紧接着在 2015 年推出了 <a href="https://bitbay.market/">BitBay</a>:一个完全去中心化的市场,围绕自有的多重签名钱包与内置合约构建,至今仍在运行。在当年,没有第二支团队把比特币上的多重签名做到这个认真程度。',
    'history.p3':'运营 ATM 从来都不是最终目标。从第一天起,我们的计划就是打造一本真正的订单簿:一个从不托管你资金的真正交易所——而在当时,几乎每一家交易所都在做恰恰相反的事。我们花了十多年时间打磨非托管的多重签名系统,眼看着一个又一个托管方倒下,才把它真正做对。',
    'history.tl1':'2014 年 · 蒂华纳的比特币 ATM','history.tl_bithalo':'2014 年 · BitHalo','history.tl_bitbay':'2015 年 · BitBay','history.tl2':'<em>2025 年 · NightTrader 上线</em>',
    'history.citation':'当时的报道:<a href="https://www.coindesk.com/markets/2014/03/28/money-spinners-genesis1-bitcoin-and-dogecoin-atms-arrive-in-tijuana-mexico">CoinDesk,2014 年 3 月</a> ——Genesis1 比特币与狗狗币 ATM 登陆蒂华纳。<a href="https://www.coindesk.com/markets/2014/08/08/bithalo-smart-contracts-without-the-block-chain-bloat">CoinDesk,2014 年 8 月</a> ——BitHalo 推出无需臃肿区块链开销的智能合约。<a href="https://bitcoinist.com/bitbay-decentralized-marketplace-and-the-internet-of-things/">Bitcoinist,2016 年 11 月</a> ——解读 BitBay 的去中心化市场。十一年后:<a href="https://www.globenewswire.com/news-release/2025/09/08/3145992/0/en/bitcoin-s-first-true-high-speed-dex-nighttrader-launches.html">GlobeNewswire,2025 年 9 月</a> ——比特币首个真正的高速去中心化交易所 NightTrader 正式上线。',
    'footer.col_exchange':'交易所','footer.link_trade':'交易','footer.link_list':'申请上币',
    'footer.col_legal':'法律信息','footer.link_risk':'风险提示',
    'footer.link_whitepaper':'白皮书','footer.link_airgapped':'离线签名','footer.link_tradeoffs':'已知的取舍',
    'footer.imp_h4':'法律声明 · 运营主体','footer.imp_email_label':'邮箱:',
    'footer.legal_p1':'NightTrader.Exchange 是一个非托管交易界面。它不是银行、经纪商、托管机构,也不是投资服务机构,本页面的任何内容都不构成投资建议,也不承诺任何收益、流动性或成交质量。交易数字资产可能导致本金全部损失。你的密钥与备份由你自己负责。',
    'footer.legal_p2':'由 bitcoin42.com 提供服务 ——2014 年注册 · 本页面不发起任何第三方请求。',
    'footer.lang_label':'语言'
  };

  T.ru = {
    'nav.custody':'Хранение','nav.how':'Как проходит расчёт','nav.controls':'Контроль','nav.timelock':'Таймлок',
    'nav.fees':'Комиссии','nav.privacy':'Приватность','nav.tradeoffs':'Компромиссы','nav.history':'История','nav.open':'Открыть биржу',
    'theme.to_dark':'Тёмная','theme.to_light':'Светлая',
    'hero.kicker':'На основе биткоина · Некастодиальная · Полный стакан заявок на покупку/продажу',
    'hero.h1':'Не твои ключи —<br>не твои монеты.<br><span class="thin">Поэтому мы дали тебе ключ.</span>',
    'hero.answer':'Каждый аккаунт NightTrader — это мультиподпись 2-из-2 или 3-из-3.<br>\n    Один ключ принадлежит тебе и создаётся в твоём браузере. Без него биржа не может потратить средства.',
    'hero.lede':'Настоящий стакан заявок — лимитные покупки, лимитные продажи, узкие спреды — без общего кошелька, в котором лежит весь твой запас. Никакого wrapped BTC. Никакого долгового баланса в чужой базе данных. Никакого «выхода со скамом».',
    'hero.cta_open':'Открыть биржу','hero.cta_paper':'Читать whitepaper','hero.cta_source':'Смотреть исходный код',
    'hero.cta_note':'Некастодиальная · Стакан можно смотреть без регистрации · Вывод в любой момент',
    'script.head_left':'Redeem-скрипт P2SH · твой аккаунт','script.head_right':'Нажми на выделенный термин',
    'script.tag_yourkey':'Твой ключ',
    'script.note_yourkey':'Создаётся в твоём браузере на основе твоих учётных данных и никогда не передаётся. Без подписи этим ключом со счёта не уйдёт ничего — ни сделка, ни вывод, ни операция поддержки.',
    'script.tag_nodekey':'Ключ узлов',
    'script.note_nodekey':'Пороговая подпись, которой совместно владеет набор узлов. Ни один оператор не может восстановить её в одиночку; для существования второй подписи требуется согласие супербольшинства.',
    'script.tag_exit':'Выход на случай форс-мажора',
    'script.note_exit':'OP_CHECKLOCKTIMEVERIFY. Если узлы исчезнут, будут изъяты или просто перестанут отвечать, эта ветка активируется по расписанию и переводит средства на твой ключ единолично. Без разрешений, без очереди поддержки, без комиссии за восстановление.',
    'script.hint':'Сделки авторизуют одну конкретную сумму с помощью SIGHASH_SINGLE. Выставь заявку на 0.2 BTC из баланса в 10 BTC — и подписан отказ только от этих 0.2 BTC.',
    'custody.gut_b':'Хранение','custody.gut_d':'Кто может двигать средства',
    'custody.h2':'Четыре способа торговать биткоином. Только один оставляет ключ у тебя и всё равно даёт стакан заявок.',
    'custody.lede':'Bisq и RoboSats — честные некастодиальные площадки, и мы это признаём. Их компромисс — стоимость и скорость: каждая сделка это ончейн-событие, и на этой основе трудно построить постоянную глубину рынка. Мы выбрали другой компромисс.',
    'custody.th_nighttrader':'NightTrader','custody.th_cex':'Кастодиальная CEX','custody.th_wrapped':'Wrapped BTC на DEX','custody.th_atomic':'DEX с атомарными свопами',
    'custody.row1_th':'Кто может двигать твои монеты','custody.row1_us':'Ты + кворум узлов, на каждую сделку','custody.row1_cex':'Биржа, в одностороннем порядке','custody.row1_wrapped':'Кастодиан моста','custody.row1_atomic':'Ты сам',
    'custody.row2_th':'Что у тебя на руках','custody.row2_us':'Ключ в мультиподписном UTXO','custody.row2_cex':'Строка в базе данных','custody.row2_wrapped':'Токен-требование к чужому резерву','custody.row2_atomic':'Ключ',
    'custody.row3_th':'Если площадка исчезнет','custody.row3_us':'Таймлок вернёт твои монеты','custody.row3_cex':'Требование в деле о банкротстве','custody.row3_wrapped':'Зависит от кастодиана','custody.row3_atomic':'Монеты остаются у тебя',
    'custody.row4_th':'Стакан заявок','custody.row4_us':'Полный, покупка/продажа, офчейн-мэтчинг','custody.row4_cex':'Полный, покупка/продажа','custody.row4_wrapped':'Пул AMM, заявок нет','custody.row4_atomic':'Тонкий, заполняется медленно',
    'custody.row5_th':'Комиссия сети за сделку','custody.row5_us':'Нет — расчёты идут пакетами','custody.row5_cex':'Нет','custody.row5_wrapped':'Газ на каждый своп','custody.row5_atomic':'Несколько ончейн-транзакций',
    'custody.row6_th':'Риск во время торговли','custody.row6_us':'Только сумма, которую ты подписал','custody.row6_cex':'Весь твой баланс','custody.row6_wrapped':'Весь твой wrapped-баланс','custody.row6_atomic':'Сумма сделки',
    'custody.small':'Офчейн-мэтчинг означает, что стакан работает со скоростью биржи, а сеть видит только расчёты. В этом весь трюк, и он полностью построен на скриптовых примитивах, которые есть в биткоине с 2009 года.',
    'custody.viz_label_cex':'Кастодиальная биржа','custody.viz_caption_cex':'Монеты лежат в одном кошельке. Хранение — а значит и контроль — в чужих руках.',
    'custody.viz_note_cex':'Кастодиальная биржа собирает монеты всех пользователей в кошельки, которые контролирует только она сама. Она может заморозить их, потерять или слить — ничто в протоколе этому не мешает.',
    'custody.viz_label_nt':'NightTrader','custody.viz_caption_nt':'Твой ключ никогда не покидает твоё устройство. Уходит только подписанная сумма.',
    'custody.viz_note_nt':'Твой ключ создаётся в браузере и никогда не покидает устройство. Каждая сделка авторизует одну подписанную сумму с ограниченным размером — никогда весь баланс, никогда не кастодия.',
    'custody.viz_hint':'Нажми на сторону, чтобы поставить на паузу и рассмотреть',
    'how.gut_b':'Расчёт','how.gut_d':'По порядку','how.h2':'Что на самом деле происходит при размещении заявки',
    'how.s1_h3':'Ключ создаётся на стороне клиента',
    'how.s1_p':'Твой браузер создаёт ключ локально, либо ты хранишь его на офлайн-подписывающем устройстве и вообще не раскрываешь его. Он подписывает твой депозитный адрес вместе с пороговым ключом узлов. Сервер никогда его не получает, поэтому его нечем взломать и нечего передавать.',
    'how.s2_h3':'Ты подписываешь одну сумму, а не весь баланс',
    'how.s2_p':'Заявка — это хэш подписи, авторизующий конкретный вход на конкретную сумму — исходный механизм лимита у биткоина. Выход со сдачей остаётся под твоим контролем. Узлы могут провести только ту сумму, которую ты подписал.',
    'how.s3_h3':'Кворум ставит вторую подпись, и заявка исполняется',
    'how.s3_p':'Мэтчинг происходит офчейн по актуальному стакану заявок. Расчёты пакетами уходят в сеть. Ни один узел не может поставить вторую подпись в одиночку; требуется согласие порогового числа узлов.',
    'how.s4_h3':'Таймлок всегда стоит у тебя за спиной',
    'how.s4_p':'Каждая применимая монета использует CHECKLOCKTIMEVERIFY. Пока ты торгуешь, он обновляется, и ты никогда к нему не приближаешься. Если ты перестанешь торговать, он всё равно рано или поздно выплатит средства тебе.',
    'how.flow_key':'Ключ остаётся у тебя','how.flow_amount':'Подписывается только сумма','how.flow_cosign':'Узлы ставят вторую подпись','how.flow_settle':'Расчёт',
    'controls.gut_b':'Контроль','controls.gut_d':'Что ты держишь и за чем следишь','controls.h2':'Три вещи, которые биржа отдаёт тебе и не может забрать обратно.',
    'controls.c1_h3':'Подписывай с офлайн-устройства',
    'controls.c1_p':'Твоему ключу не обязательно жить во вкладке браузера. Подключи офлайн-подписывающее устройство — например, изолированный от сети телефон с <a href="https://airgap.it/">AirGap Vault</a> или совместимый аппаратный кошелёк — и ключ никогда не коснётся устройства, подключённого к интернету. Заявки и выводы пересекают этот разрыв в виде QR-кодов: неподписанный запрос уходит, подпись возвращается. Биржа видит только подпись и ничего больше.',
    'controls.c1_qr':'Неподписанный запрос → QR → подпись обратно',
    'controls.c2_h3':'Твой резервный скрипт — сразу при регистрации',
    'controls.c2_p':'Redeem-скрипт показывается тебе в момент создания аккаунта — не спрятан в статье поддержки, не выдаётся по запросу. Сохрани его. С этим скриптом и твоим ключом ты сможешь самостоятельно восстановить и потратить ветку таймлока из любого кошелька, понимающего биткоин-скрипт, даже если биржи не станет и этот домен умрёт.',
    'controls.c3_h3':'Состояние узлов — прямо на экране',
    'controls.c3_p':'После входа ты видишь состояние набора узлов, держащих вторую подпись, в реальном времени — кто в сети, цел ли кворум. Если бэкенд деградирует, ты узнаёшь об этом из интерфейса, а не из статус-страницы, написанной постфактум. Площадка, скрывающая собственное состояние, тем самым уже кое-что о себе говорит.',
    'timelock.gut_b':'Форс-мажор','timelock.gut_d':'Выход, для которого мы не нужны','timelock.h2':'Представь, что сегодня ночью нас накрыли.',
    'timelock.lede':'Серверы изъяты, домен снят, команда недоступна, операторы узлов исчезли. На кастодиальной бирже это конец истории и начало процедуры банкротства. Здесь это просто период ожидания.',
    'timelock.l1':'Депозит','timelock.l2':'Свободная торговля','timelock.l3':'Неактивность','timelock.l4':'<em>Таймлок → выплата на твой ключ</em>',
    'timelock.small':'Таймлок задаётся индивидуально для каждого аккаунта и обновляется по мере торговли — стакан не исполнит заявку, которая приблизит тебя к истечению срока, а после долгого бездействия тебе предложат перейти на новый скрипт и актуальный набор узлов. Эта ветка обеспечивается консенсусом, а не нами. Мы не можем её отключить, и тот, кто заберёт наши серверы, тоже не сможет.',
    'timelock.step_deposit':'Монеты поступают на мультиподписной адрес. Отсчёт начинается здесь — каждый аккаунт получает новый таймлок в момент пополнения.',
    'timelock.step_trade':'Каждая твоя сделка обновляет таймлок. Пока ты активно торгуешь, ты никогда к нему не приближаешься.',
    'timelock.step_inactive':'Нет сделок — нет обновления. Это единственная фаза, где обратный отсчёт действительно движется к нулю.',
    'timelock.step_locktime':'OP_CHECKLOCKTIMEVERIFY срабатывает по расписанию. Адрес выплачивает средства единолично на твой ключ — без разрешений, без запросов к кому-либо, и мы не можем это остановить.',
    'timelock.viz_hint':'Нажми на шаг, чтобы поставить на паузу и рассмотреть',
    'fees.gut_b':'Комиссии','fees.gut_d':'Все, без исключений','fees.h2':'Три числа. Четвёртого нет.',
    'fees.f1_l':'За каждую исполненную сделку','fees.f2_l':'Перевод между аккаунтами','fees.f3_l':'Вывод на собственный кошелёк',
    'fees.p':'Комиссии оплачивают операторов узлов, держащих вторую половину подписи. Токена NightTrader не существует, премайна нет, казна не забирает долю с твоей сделки, и никому не обещана доходность. Биржа была запущена намеренно без выпуска собственной монеты.',
    'fees.th1':'Комиссия тейкера, для сравнения','fees.row_nt':'0.125% — ты держишь ключ','fees.row_uniswap':'0.30% + газ + проскальзывание','fees.row_coinbase':'до 0.40% — кастодиальная','fees.row_kraken':'0.20% — кастодиальная','fees.row_binance':'0.10% — кастодиальная',
    'fees.small':'Листинг монеты оплачивает проект, а не трейдеры. Интеграция и аудит контракта оцениваются индивидуально по каждому проекту. Ничто на этой странице не является обещанием доходности, ликвидности или качества исполнения.',
    'verify.gut_b':'Проверяй','verify.gut_d':'Не верь на слово','verify.h2':'Каждое утверждение выше можно проверить. Проверь его.',
    'verify.p':'Лендинг — это маркетинг. Код — нет. Если что-то здесь расходится с кодом, прав код, а у нас есть баг, который нужно исправить — скажи нам об этом.',
    'verify.li_source_k':'Исходный код','verify.li_source_v':'<a href="https://github.com/NightTrader/nighttrader.github.io">github.com/NightTrader</a> — фронтенд и логика подписания. Перед депозитом прочитай, как выводится ключ.',
    'verify.li_local_k':'Запусти локально','verify.li_local_v':'Склонируй репозиторий и разверни его сам. Не нужно ничего устанавливать, не нужно заходить на этот домен, чтобы торговать.',
    'verify.li_paper_k':'Whitepaper','verify.li_paper_v':'<a href="https://github.com/NightTrader/nighttrader.github.io/blob/master/Nighttrader_A_Decentralized_Multisignature_Electronic_Cash_Wallet.pdf">A Decentralized Multisignature Electronic Cash Wallet</a> — полное описание конструкции, включая кейсы Monero и EVM.',
    'verify.li_script_k':'Твой скрипт','verify.li_script_v':'Выводится детерминированно, а существенные изменения фиксируются ончейн. Ты должен быть в состоянии восстановить свой redeem-скрипт самостоятельно, не спрашивая нас.',
    'verify.li_data_k':'Данные','verify.li_data_v':'Мы собираем минимум, необходимый для работы, и шифруем то, что храним. Эта страница не загружает ни шрифтов, ни аналитики, ни стороннего кода — проверь вкладку сети.',
    'privacy.label':'Приватность',
    'privacy.p1':'Мы собираем минимум, необходимый для работы стакана заявок, и шифруем то, что храним. Нет рекламных пикселей, нет записи сессий, нет поведенческого профиля и нет отношений с брокерами данных. Эта страница делает ноль сторонних запросов — ни шрифтов, ни аналитики, ни CDN. Открой вкладку сети и убедись в этом сам, а не верь нам на слово.',
    'privacy.p2':'Если нас когда-либо обяжут проверить пользователя, этот процесс пройдёт через <a href="https://www.zk.me/">zkMe</a>. Проверка документов происходит на твоём собственном устройстве — нам ничего не передаётся в открытом виде. Мы получаем лишь доказательство с нулевым разглашением того, что проверка пройдена, а не сами документы. NightTrader никогда не видит и не хранит твои идентификационные данные сам; роль zkMe ограничена этой проверкой и генерацией доказательства.',
    'privacy.p3':'И учти, чего проверка здесь не может: у аккаунта на рассмотрении по-прежнему остаётся ветка таймлока. Заморозка аккаунта не замораживает твои монеты, потому что скрипт в любом случае выплатит их тебе, что бы мы ни решили.',
    'node.label':'Запустить узел','node.p':'Операторы узлов держат вторую половину каждой подписи и получают долю комиссий. Формы регистрации нет, списка рассылки нет. Свяжись с нами через Bitmessage:',
    'node.copy':'Скопировать','node.copy_copied':'Скопировано','node.copy_select':'Выделено',
    'node.f':'Если этот канал тебе неудобен, ты, вероятно, не тот оператор, которого мы ищем.',
    'tradeoffs.gut_b':'Компромиссы','tradeoffs.gut_d':'Чем это не является','tradeoffs.h2':'То, что другие биржи не выносят на главную страницу.',
    'tradeoffs.t1_dt':'Это не самостоятельное хранение','tradeoffs.t1_dd':'Это совместное хранение с выходом по таймлоку. Ты держишь один из двух необходимых ключей — это строго лучше, чем баланс на бирже, и строго хуже, чем монеты в твоём собственном холодном хранилище. Торгуй здесь; не храни здесь.',
    'tradeoffs.t2_dt':'Узлы могут уйти в офлайн','tradeoffs.t2_dd':'Если кворум нарушается посреди сделки, наполовину подписанные транзакции просто никогда не транслируются в сеть. Ты не теряешь основную сумму, но можешь упустить исполнение и связанную с ним прибыль.',
    'tradeoffs.t3_dt':'Настоящая поверхность атаки — это браузер','tradeoffs.t3_dd':'Твой ключ выводится из твоих учётных данных. Слабый пароль, скомпрометированное устройство или фишинговый вход — вот реалистичный способ потерять монеты здесь, а не взлом наших серверов. Используй длинную парольную фразу и двухфакторную аутентификацию, храни резервную копию отдельно от устройства, с которого торгуешь.',
    'tradeoffs.t4_dt':'У нас может быть запрошен KYC','tradeoffs.t4_dd':'Мы оставляем за собой право запросить верификацию через <a href="https://www.zk.me/">zkMe</a>. Документы проверяются на твоём устройстве и никогда не доходят до нас — мы получаем лишь доказательство с нулевым разглашением факта прохождения проверки, а не твои личные данные. Учти, чего это не может сделать: заморозка аккаунта не замораживает твои средства навсегда, потому что ветка таймлока всё равно исполняется.',
    'tradeoffs.t5_dt':'Здесь не всё — биткоин','tradeoffs.t5_dd':'Биткоин — базовая пара и цель конструкции: первые интеграции выбирались именно за поддержку CHECKLOCKTIMEVERIFY. Другие активы листятся только там, где можно воспроизвести те же гарантии. Если монету нельзя защитить таким способом, мы предпочтём её не листить.',
    'tradeoffs.t6_dt':'Это не Lightning и не роллап','tradeoffs.t6_dd':'Это другой инструмент. Lightning отлично подходит для платежей и плохо — для крупного стакана заявок; роллапы и атомарные свопы — правильный ответ в долгосрочной перспективе, но пока слишком дороги или медленны для ежедневной торговли. Мы перейдём на них, когда они будут готовы.',
    'tradeoffs.cta_back':'Вернуться к скрипту',
    'history.gut_b':'История','history.gut_d':'С 2014 года','history.h2':'Всё началось с банкомата на углу улицы в Тихуане.',
    'history.p1':'bitcoin42 начинался не как биржа. Он начинался как оператор биткоин-банкоматов — в 2014 году мы устанавливали аппараты Genesis1 на улицах Тихуаны, Мексика, одними из первых в мире.',
    'history.p2':'В том же году та же команда создала <a href="https://bithalo.org/">BitHalo</a> — одну из первых реально работающих систем смарт-контрактов на биткоине, обеспечивающую исполнение двусторонних соглашений через мультиподписное эскроу без доверенной третьей стороны, за годы до того, как «смарт-контракт» стал расхожим словом благодаря Ethereum. В 2015 году последовал <a href="https://bitbay.market/">BitBay</a>: полностью децентрализованный маркетплейс, построенный вокруг собственного мультиподписного кошелька со встроенными контрактами, работающий до сих пор. Тогда никто больше не занимался мультиподписью на биткоине так серьёзно.',
    'history.p3':'Обслуживание банкоматов никогда не было самоцелью. С самого первого дня целью был стакан заявок: настоящая биржа, которая никогда не забирает твои монеты в кастодию — в то время, когда именно так поступала каждая биржа. Понадобилось больше десяти лет выстраивания некастодиальных мультиподписных систем — и череда провалившихся один за другим кастодианов — чтобы сделать это правильно.',
    'history.tl1':'2014 · Биткоин-банкоматы в Тихуане','history.tl_bithalo':'2014 · BitHalo','history.tl_bitbay':'2015 · BitBay','history.tl2':'<em>2025 · запуск NightTrader</em>',
    'history.citation':'Освещение того времени: <a href="https://www.coindesk.com/markets/2014/03/28/money-spinners-genesis1-bitcoin-and-dogecoin-atms-arrive-in-tijuana-mexico">CoinDesk, март 2014</a> — биткоин- и догикоин-банкоматы Genesis1 появляются в Тихуане. <a href="https://www.coindesk.com/markets/2014/08/08/bithalo-smart-contracts-without-the-block-chain-bloat">CoinDesk, август 2014</a> — BitHalo представляет смарт-контракты без раздувания блокчейна. <a href="https://bitcoinist.com/bitbay-decentralized-marketplace-and-the-internet-of-things/">Bitcoinist, ноябрь 2016</a> — о децентрализованном маркетплейсе BitBay. Одиннадцать лет спустя: <a href="https://www.globenewswire.com/news-release/2025/09/08/3145992/0/en/bitcoin-s-first-true-high-speed-dex-nighttrader-launches.html">GlobeNewswire, сентябрь 2025</a> — запускается NightTrader, первая по-настоящему высокоскоростная DEX для биткоина.',
    'footer.col_exchange':'Биржа','footer.link_trade':'Торговать','footer.link_list':'Листинг монеты',
    'footer.col_legal':'Правовая информация','footer.link_risk':'Раскрытие рисков',
    'footer.link_whitepaper':'Whitepaper','footer.link_airgapped':'Офлайн-подписание','footer.link_tradeoffs':'Известные компромиссы',
    'footer.imp_h4':'Юридическая информация · Оператор','footer.imp_email_label':'E-Mail:',
    'footer.legal_p1':'NightTrader.Exchange — это некастодиальный торговый интерфейс. Это не банк, не брокер, не кастодиан и не инвестиционная услуга, и ничто здесь не является инвестиционной рекомендацией или обещанием доходности, ликвидности или исполнения. Торговля цифровыми активами может привести к полной потере средств. За свой ключ и свои резервные копии отвечаешь ты сам.',
    'footer.legal_p2':'Обслуживается с bitcoin42.com — зарегистрирован в 2014 году · Эта страница не делает сторонних запросов.',
    'footer.lang_label':'Язык'
  };

  T.es = {
    'nav.custody':'Custodia','nav.how':'Cómo liquida','nav.controls':'Control','nav.timelock':'Timelock',
    'nav.fees':'Comisiones','nav.privacy':'Privacidad','nav.tradeoffs':'Compromisos','nav.history':'Historia','nav.open':'Abrir exchange',
    'theme.to_dark':'Oscuro','theme.to_light':'Claro',
    'hero.kicker':'Nativo de Bitcoin · No custodial · Libro de órdenes completo de compra/venta',
    'hero.h1':'No son tus claves,<br>no son tus monedas.<br><span class="thin">Por eso te dimos una clave.</span>',
    'hero.answer':'Cada cuenta de NightTrader es una dirección multifirma 2-de-2 o 3-de-3.<br>\n    Una clave es tuya, generada en tu navegador. El exchange no puede gastar sin ella.',
    'hero.lede':'Un libro de órdenes real — órdenes límite de compra, órdenes límite de venta, spreads ajustados — sin una billetera ómnibus que retenga todos tus fondos. Sin BTC envuelto (wrapped). Sin saldo tipo pagaré en la base de datos de otro. Sin salida hacia una estafa.',
    'hero.cta_open':'Abrir el exchange','hero.cta_paper':'Leer el whitepaper','hero.cta_source':'Ver el código fuente',
    'hero.cta_note':'No custodial · Sin muro de registro para ver el libro · Retira cuando quieras',
    'script.head_left':'Script de rescate P2SH · tu cuenta','script.head_right':'Toca un término resaltado',
    'script.tag_yourkey':'Tu clave',
    'script.note_yourkey':'Derivada en tu navegador a partir de tus credenciales y nunca transmitida. Nada sale de la dirección sin una firma de esta clave — ni una operación, ni un retiro, ni un ticket de soporte.',
    'script.tag_nodekey':'La clave de los nodos',
    'script.note_nodekey':'Una firma de umbral (threshold) mantenida colectivamente por el conjunto de nodos. Ningún operador individual puede reconstruirla; se necesita el acuerdo de una supermayoría para que exista la segunda firma.',
    'script.tag_exit':'Salida por fuerza mayor',
    'script.note_exit':'OP_CHECKLOCKTIMEVERIFY. Si los nodos desaparecen, son incautados o simplemente dejan de responder, esta rama se activa según lo programado y paga la dirección únicamente a tu clave. Sin permisos, sin cola de soporte, sin comisión de recuperación.',
    'script.hint':'Las operaciones autorizan un único monto mediante SIGHASH_SINGLE. Si ofertas 0.2 BTC de un saldo de 10 BTC, 0.2 BTC es todo lo que has firmado.',
    'custody.gut_b':'Custodia','custody.gut_d':'Quién puede moverlo',
    'custody.h2':'Cuatro formas de operar con bitcoin. Solo una deja la clave en tus manos y aun así te da un libro de órdenes.',
    'custody.lede':'Bisq y RoboSats son plataformas honestas y no custodiales, y lo decimos abiertamente. El compromiso que asumen es costo y velocidad: cada operación es un evento on-chain, y es difícil construir profundidad continua sobre esa base. Nosotros asumimos un compromiso distinto.',
    'custody.th_nighttrader':'NightTrader','custody.th_cex':'CEX custodial','custody.th_wrapped':'BTC envuelto en un DEX','custody.th_atomic':'DEX de intercambio atómico',
    'custody.row1_th':'Quién puede mover tus monedas','custody.row1_us':'Tú + quórum de nodos, por operación','custody.row1_cex':'El exchange, unilateralmente','custody.row1_wrapped':'El custodio del puente','custody.row1_atomic':'Tú',
    'custody.row2_th':'Qué posees','custody.row2_us':'Una clave en un UTXO multifirma','custody.row2_cex':'Una fila en una base de datos','custody.row2_wrapped':'Un derecho tipo token sobre la reserva de otro','custody.row2_atomic':'Una clave',
    'custody.row3_th':'Si la plataforma desaparece','custody.row3_us':'El timelock te devuelve tus monedas','custody.row3_cex':'Un reclamo por quiebra','custody.row3_wrapped':'Depende del custodio','custody.row3_atomic':'Conservas tus monedas',
    'custody.row4_th':'Libro de órdenes','custody.row4_us':'Completo, compra/venta, casado fuera de la cadena','custody.row4_cex':'Completo, compra/venta','custody.row4_wrapped':'Pool AMM, sin órdenes','custody.row4_atomic':'Delgado, se llena lento',
    'custody.row5_th':'Costo en cadena por operación','custody.row5_us':'Ninguno — la liquidación se agrupa','custody.row5_cex':'Ninguno','custody.row5_wrapped':'Gas en cada intercambio','custody.row5_atomic':'Múltiples transacciones on-chain',
    'custody.row6_th':'Exposición mientras operas','custody.row6_us':'Solo el monto que firmaste','custody.row6_cex':'Todo tu saldo','custody.row6_wrapped':'Todo tu saldo envuelto','custody.row6_atomic':'El monto de la operación',
    'custody.small':'El casado fuera de la cadena significa que el libro se mueve a la velocidad de un exchange; la cadena solo ve la liquidación. Ese es todo el truco, y está construido con primitivas de script que Bitcoin tiene desde 2009.',
    'custody.viz_label_cex':'Exchange custodial','custody.viz_caption_cex':'Las monedas están en una sola billetera. La custodia — y el control — es suya.',
    'custody.viz_note_cex':'Un exchange custodial reúne las monedas de todos los usuarios en billeteras que solo él controla. Puede congelarlas, perderlas o drenarlas — nada en el protocolo lo impide.',
    'custody.viz_label_nt':'NightTrader','custody.viz_caption_nt':'Tu clave nunca sale de tu dispositivo. Solo sale el monto firmado.',
    'custody.viz_note_nt':'Tu clave se genera en tu navegador y nunca sale de tu dispositivo. Cada operación autoriza un único monto firmado y limitado — nunca tu saldo completo, nunca custodia.',
    'custody.viz_hint':'Toca un lado para pausar e inspeccionar',
    'how.gut_b':'Liquidación','how.gut_d':'En orden','how.h2':'Qué sucede realmente cuando colocas una orden',
    'how.s1_h3':'Tu clave se genera del lado del cliente',
    'how.s1_p':'Tu navegador deriva la clave localmente, o la mantienes en un firmante air-gapped y nunca la expones. Firma tu dirección de depósito junto con la clave de umbral de los nodos. El servidor nunca la recibe, así que no hay nada que vulnerar ni nada que entregar.',
    'how.s2_h3':'Firmas un monto, no tu saldo',
    'how.s2_p':'Una oferta es un hash de firma que autoriza una entrada específica por un tamaño específico — el mecanismo de asignación original de Bitcoin. Tu salida de cambio permanece bajo tu control. Los nodos solo pueden encaminar el monto que firmaste.',
    'how.s3_h3':'El quórum firma en segundo lugar y la orden se ejecuta',
    'how.s3_p':'El casado ocurre fuera de la cadena contra un libro de órdenes en vivo. La liquidación se agrupa hacia la cadena. Ningún nodo por sí solo puede producir la segunda firma; se requiere el acuerdo de un umbral.',
    'how.s4_h3':'El timelock siempre está detrás de ti',
    'how.s4_p':'Cada moneda aplicable usa CHECKLOCKTIMEVERIFY. Se renueva mientras operas y nunca te acercas a él. Si dejas de operar, eventualmente te paga de todos modos.',
    'how.flow_key':'La clave se queda contigo','how.flow_amount':'Firma solo el monto','how.flow_cosign':'Los nodos co-firman','how.flow_settle':'Liquidación',
    'controls.gut_b':'Control','controls.gut_d':'Qué posees y qué vigilas','controls.h2':'Tres cosas que el exchange te entrega y no puede quitarte.',
    'controls.c1_h3':'Firma desde un dispositivo air-gapped',
    'controls.c1_p':'Tu clave no tiene que vivir en una pestaña del navegador. Combínala con un firmante offline — un teléfono air-gapped con <a href="https://airgap.it/">AirGap Vault</a> o una billetera de hardware compatible — y la clave nunca toca una máquina conectada a internet. Las órdenes y retiros cruzan ese espacio como códigos QR: sale una solicitud sin firmar, vuelve una firma. El exchange solo ve una firma y nada más.',
    'controls.c1_qr':'Solicitud sin firmar → QR → firma de vuelta',
    'controls.c2_h3':'Tu script de respaldo, desde el registro',
    'controls.c2_p':'El script de rescate se te muestra al crear tu cuenta — no está escondido en un artículo de soporte, ni disponible solo a pedido. Guárdalo. Con ese script y tu clave puedes reconstruir y gastar tú mismo la rama del timelock, desde cualquier billetera que hable el lenguaje de script de Bitcoin, incluso si el exchange desaparece y este dominio deja de existir.',
    'controls.c3_h3':'Salud de los nodos, en pantalla',
    'controls.c3_p':'Una vez conectado, ves el estado en vivo del conjunto de nodos que sostiene la otra firma — quién está activo, si el quórum está intacto. Si el backend se está degradando, te enteras por la interfaz, no por una página de estado escrita después de los hechos. Una plataforma que oculta su propia salud ya te está diciendo algo.',
    'timelock.gut_b':'Fuerza mayor','timelock.gut_d':'La salida que no nos necesita','timelock.h2':'Supongamos que nos allanan esta noche.',
    'timelock.lede':'Servidores incautados, dominio retirado, equipo inalcanzable, operadores de nodos desaparecidos. Bajo un exchange custodial, ese es el final de la historia y el comienzo de un proceso de quiebra. Aquí es solo un período de espera.',
    'timelock.l1':'Depósito','timelock.l2':'Operar libremente','timelock.l3':'Inactivo','timelock.l4':'<em>Timelock → pagado a tu clave</em>',
    'timelock.small':'El timelock se fija por cuenta y se renueva mientras operas — el libro no ejecutará una orden que te deje cerca del vencimiento, y tras una larga inactividad se te pedirá migrar a un nuevo script y un conjunto de nodos vigente. La rama se hace cumplir por consenso, no por nosotros. No podemos desactivarla, y tampoco puede quien tome nuestros servidores.',
    'timelock.step_deposit':'Las monedas llegan a la dirección multifirma. El reloj empieza aquí — cada cuenta recibe un timelock nuevo en el momento en que se financia.',
    'timelock.step_trade':'Cada operación que completas renueva el timelock. Mientras operes activamente, nunca te acercas a él.',
    'timelock.step_inactive':'Sin operaciones, sin renovación. Esta es la única fase en la que la cuenta regresiva realmente avanza hacia cero.',
    'timelock.step_locktime':'OP_CHECKLOCKTIMEVERIFY se activa según lo programado. La dirección paga únicamente a tu clave — sin necesidad de permiso, sin nadie a quien pedírselo, nada que podamos detener.',
    'timelock.viz_hint':'Toca un paso para pausar e inspeccionar',
    'fees.gut_b':'Comisiones','fees.gut_d':'Todas ellas','fees.h2':'Tres números. No hay un cuarto.',
    'fees.f1_l':'Por operación completada','fees.f2_l':'Transferencia entre cuentas','fees.f3_l':'Retiro a tu propia billetera',
    'fees.p':'Las comisiones pagan a los operadores de nodos que sostienen la otra mitad de la firma. No existe un token NightTrader, ni pre-minado, ni una tesorería que se quede con parte de tu operación, ni se promete rendimiento a nadie. El exchange se lanzó a propósito sin emitir una moneda propia.',
    'fees.th1':'Comisión de taker, para comparar','fees.row_nt':'0.125% — tú tienes una clave','fees.row_uniswap':'0.30% + gas + slippage','fees.row_coinbase':'hasta 0.40% — custodial','fees.row_kraken':'0.20% — custodial','fees.row_binance':'0.10% — custodial',
    'fees.small':'Listar una moneda tiene costo para el proyecto, no para los traders. La integración y la auditoría del contrato se cotizan por proyecto. Nada en esta página es una promesa de retornos, liquidez o calidad de ejecución.',
    'verify.gut_b':'Verifica','verify.gut_d':'No confíes','verify.h2':'Cada afirmación de arriba se puede verificar. Ve y verifícala.',
    'verify.p':'Una landing page es marketing. El código no. Si alguna línea aquí no coincide con el código, el código tiene razón y tenemos un bug que corregir — dínoslo.',
    'verify.li_source_k':'Código fuente','verify.li_source_v':'<a href="https://github.com/NightTrader/nighttrader.github.io">github.com/NightTrader</a> — frontend y lógica de firma. Lee la derivación de claves antes de depositar.',
    'verify.li_local_k':'Ejecútalo localmente','verify.li_local_v':'Clona el repositorio y sírvelo tú mismo. No hay paquetes que instalar, ni necesidad de visitar este dominio para operar.',
    'verify.li_paper_k':'Whitepaper','verify.li_paper_v':'<a href="https://github.com/NightTrader/nighttrader.github.io/blob/master/Nighttrader_A_Decentralized_Multisignature_Electronic_Cash_Wallet.pdf">A Decentralized Multisignature Electronic Cash Wallet</a> — la construcción completa, incluyendo los casos de Monero y EVM.',
    'verify.li_script_k':'Tu script','verify.li_script_v':'Derivado de forma determinista, y los cambios materiales quedan grabados en la cadena. Deberías poder reconstruir tu propio script de rescate sin pedírnoslo.',
    'verify.li_data_k':'Datos','verify.li_data_v':'Recopilamos el mínimo necesario para operar y ciframos lo que guardamos. Esta página no carga fuentes, ni analítica, ni scripts de terceros — revisa la pestaña de red.',
    'privacy.label':'Privacidad',
    'privacy.p1':'Recopilamos el mínimo necesario para operar un libro de órdenes y ciframos lo que guardamos. No hay píxel publicitario, ni repetición de sesión, ni perfil de comportamiento, ni relación con corredores de datos. Esta página hace cero solicitudes a terceros — sin fuentes, sin analítica, sin CDN. Abre la pestaña de red y compruébalo en vez de creernos.',
    'privacy.p2':'Si alguna vez nos vemos obligados a verificar a un usuario, ese proceso pasa por <a href="https://www.zk.me/">zkMe</a>. La verificación de documentos ocurre en tu propio dispositivo — nada se nos transmite en claro. Lo que recibimos es una prueba de conocimiento cero de que pasaste la verificación, no los documentos subyacentes. NightTrader nunca ve ni almacena tus datos de identidad; el rol de zkMe se limita a esa verificación y a generar la prueba.',
    'privacy.p3':'Y ten en cuenta lo que la verificación no puede hacer aquí: una cuenta bajo revisión sigue teniendo una rama de timelock. Congelar una cuenta no congela tus monedas, porque el script te las paga sin importar lo que decidamos.',
    'node.label':'Opera un nodo','node.p':'Los operadores de nodos sostienen la otra mitad de cada firma y reciben una parte de las comisiones. No hay formulario de registro ni lista de correo. Contáctanos por Bitmessage:',
    'node.copy':'Copiar','node.copy_copied':'Copiado','node.copy_select':'Seleccionado',
    'node.f':'Si ese canal no te resulta conveniente, probablemente no seas el operador que buscamos.',
    'tradeoffs.gut_b':'Compromisos','tradeoffs.gut_d':'Lo que esto no es','tradeoffs.h2':'La parte que otros exchanges dejan fuera de la portada.',
    'tradeoffs.t1_dt':'Esto no es autocustodia','tradeoffs.t1_dd':'Es co-custodia con una salida por timelock. Tienes una de las dos claves requeridas, lo cual es estrictamente mejor que un saldo en un exchange y estrictamente peor que monedas en tu propio almacenamiento frío. Opera aquí; no almacenes aquí.',
    'tradeoffs.t2_dt':'Los nodos pueden desconectarse','tradeoffs.t2_dd':'Si el quórum se rompe a mitad de una operación, las transacciones semi-firmadas simplemente nunca se transmiten. No pierdes el principal, pero puedes perder una ejecución y la ganancia asociada.',
    'tradeoffs.t3_dt':'El navegador es la superficie de ataque','tradeoffs.t3_dd':'Tu clave se deriva de tus credenciales. Una contraseña débil, una máquina comprometida o un inicio de sesión phishing es la forma realista de perder monedas aquí — no un hackeo de nuestros servidores. Usa una passphrase larga y 2FA, y mantén tu respaldo fuera de la máquina en la que operas.',
    'tradeoffs.t4_dt':'Podemos pedirte KYC','tradeoffs.t4_dd':'Nos reservamos el derecho de solicitar verificación, a través de <a href="https://www.zk.me/">zkMe</a>. Los documentos se verifican en tu dispositivo y nunca nos llegan — recibimos una prueba de conocimiento cero de que aprobaste, no tus datos de identidad. Ten en cuenta lo que eso no puede hacer: congelar una cuenta no congela tus fondos para siempre, porque la rama del timelock igual se ejecuta.',
    'tradeoffs.t5_dt':'No todo aquí es bitcoin','tradeoffs.t5_dd':'Bitcoin es el par base y el objetivo de diseño — las primeras integraciones se eligieron por su soporte de CHECKLOCKTIMEVERIFY. Otros activos se listan solo donde se pueden reproducir las mismas garantías. Si una moneda no puede protegerse de esta manera, preferimos no listarla.',
    'tradeoffs.t6_dt':'No es Lightning, no es un rollup','tradeoffs.t6_dd':'Es una herramienta distinta. Lightning es excelente para pagos e incómodo como sede de un libro de órdenes grande; los rollups y los intercambios atómicos son la respuesta a largo plazo y aún son demasiado caros o lentos para operar a diario. Migraremos cuando estén listos.',
    'tradeoffs.cta_back':'Volver al script',
    'history.gut_b':'Historia','history.gut_d':'Desde 2014','history.h2':'Empezó con un cajero en una esquina de Tijuana.',
    'history.p1':'bitcoin42 no comenzó como un exchange. Comenzó como operador de cajeros automáticos de bitcoin — instalando máquinas Genesis1 en las calles de Tijuana, México, en 2014, entre las primeras de su tipo en cualquier parte.',
    'history.p2':'Ese mismo año, el mismo equipo construyó <a href="https://bithalo.org/">BitHalo</a> — uno de los primeros sistemas de contratos inteligentes que realmente funcionaban sobre Bitcoin, capaz de hacer cumplir acuerdos entre dos partes mediante custodia multifirma y sin un tercero de confianza, años antes de que Ethereum convirtiera "contrato inteligente" en una palabra de uso común. <a href="https://bitbay.market/">BitBay</a> llegó después, en 2015: un mercado totalmente descentralizado construido alrededor de su propia billetera multifirma con contratos incorporados, que sigue funcionando hoy. En aquel entonces, nadie más se tomaba tan en serio la multifirma en Bitcoin.',
    'history.p3':'Operar cajeros nunca fue el objetivo. El libro de órdenes fue el plan desde el primer día: un exchange real que nunca tomara custodia de tus monedas, en una época en que todos los exchanges hacían exactamente eso. Costó más de una década construyendo sistemas multifirma no custodiales — viendo caer a un custodio tras otro mientras tanto — construirlo bien.',
    'history.tl1':'2014 · Cajeros de bitcoin, Tijuana','history.tl_bithalo':'2014 · BitHalo','history.tl_bitbay':'2015 · BitBay','history.tl2':'<em>2025 · Lanzamiento de NightTrader</em>',
    'history.citation':'Cobertura de la época: <a href="https://www.coindesk.com/markets/2014/03/28/money-spinners-genesis1-bitcoin-and-dogecoin-atms-arrive-in-tijuana-mexico">CoinDesk, marzo de 2014</a> — llegan a Tijuana los cajeros Genesis1 de bitcoin y dogecoin. <a href="https://www.coindesk.com/markets/2014/08/08/bithalo-smart-contracts-without-the-block-chain-bloat">CoinDesk, agosto de 2014</a> — BitHalo lanza contratos inteligentes sin sobrecargar la cadena de bloques. <a href="https://bitcoinist.com/bitbay-decentralized-marketplace-and-the-internet-of-things/">Bitcoinist, noviembre de 2016</a> — se explica el mercado descentralizado de BitBay. Once años después: <a href="https://www.globenewswire.com/news-release/2025/09/08/3145992/0/en/bitcoin-s-first-true-high-speed-dex-nighttrader-launches.html">GlobeNewswire, septiembre de 2025</a> — se lanza NightTrader, el primer DEX de alta velocidad verdadero para bitcoin.',
    'footer.col_exchange':'Exchange','footer.link_trade':'Operar','footer.link_list':'Listar una moneda',
    'footer.col_legal':'Legal','footer.link_risk':'Divulgación de riesgos',
    'footer.link_whitepaper':'Whitepaper','footer.link_airgapped':'Firma air-gapped','footer.link_tradeoffs':'Compromisos conocidos',
    'footer.imp_h4':'Aviso legal · Operador','footer.imp_email_label':'Correo:',
    'footer.legal_p1':'NightTrader.Exchange es una interfaz de trading no custodial. No es un banco, ni un bróker, ni un custodio, ni un servicio de inversión, y nada aquí constituye asesoría de inversión ni una promesa de rendimiento, liquidez o ejecución. Operar activos digitales puede resultar en la pérdida total. Tú eres responsable de tu propia clave y de tus propios respaldos.',
    'footer.legal_p2':'Servido desde bitcoin42.com — registrado en 2014 · Esta página no hace solicitudes a terceros.',
    'footer.lang_label':'Idioma'
  };

  T.it = {
    'nav.custody':'Custodia','nav.how':'Come si liquida','nav.controls':'Controllo','nav.timelock':'Timelock',
    'nav.fees':'Commissioni','nav.privacy':'Privacy','nav.tradeoffs':'Compromessi','nav.history':'Storia','nav.open':'Apri l\'exchange',
    'theme.to_dark':'Scuro','theme.to_light':'Chiaro',
    'hero.kicker':'Nativo Bitcoin · Non custodial · Libro degli ordini completo in acquisto/vendita',
    'hero.h1':'Non le tue chiavi,<br>non le tue monete.<br><span class="thin">Per questo ti abbiamo dato una chiave.</span>',
    'hero.answer':'Ogni account NightTrader è un indirizzo multifirma 2-di-2 o 3-di-3.<br>\n    Una chiave è tua, generata nel tuo browser. L\'exchange non può spendere senza di essa.',
    'hero.lede':'Un vero libro degli ordini — ordini limite in acquisto, ordini limite in vendita, spread ridotti — senza un wallet omnibus che trattiene tutto il tuo capitale. Nessun BTC wrapped. Nessun saldo tipo IOU nel database di qualcun altro. Nessuna via d\'uscita verso una truffa.',
    'hero.cta_open':'Apri l\'exchange','hero.cta_paper':'Leggi il whitepaper','hero.cta_source':'Guarda il codice sorgente',
    'hero.cta_note':'Non custodial · Nessuna barriera di registrazione per consultare il libro · Prelievi quando vuoi',
    'script.head_left':'Script di riscatto P2SH · il tuo account','script.head_right':'Tocca un termine evidenziato',
    'script.tag_yourkey':'La tua chiave',
    'script.note_yourkey':'Derivata nel tuo browser dalle tue credenziali e mai trasmessa. Nulla esce dall\'indirizzo senza una firma di questa chiave — né un trade, né un prelievo, né una richiesta di assistenza.',
    'script.tag_nodekey':'La chiave dei nodi',
    'script.note_nodekey':'Una firma a soglia (threshold) detenuta collettivamente dall\'insieme dei nodi. Nessun singolo operatore può ricostruirla da solo; serve l\'accordo di una supermaggioranza perché la seconda firma esista.',
    'script.tag_exit':'Uscita per forza maggiore',
    'script.note_exit':'OP_CHECKLOCKTIMEVERIFY. Se i nodi spariscono, vengono sequestrati o semplicemente smettono di rispondere, questo ramo si attiva secondo programma e paga l\'indirizzo solo alla tua chiave. Nessun permesso, nessuna coda di assistenza, nessuna commissione di recupero.',
    'script.hint':'I trade autorizzano un unico importo tramite SIGHASH_SINGLE. Fai un\'offerta di 0,2 BTC su un saldo di 10 BTC e 0,2 BTC è tutto ciò che hai firmato.',
    'custody.gut_b':'Custodia','custody.gut_d':'Chi può muoverlo',
    'custody.h2':'Quattro modi per fare trading di bitcoin. Solo uno lascia la chiave a te e offre comunque un libro degli ordini.',
    'custody.lede':'Bisq e RoboSats sono piattaforme oneste e non custodial, e lo diciamo apertamente. Il compromesso che fanno è costo e velocità: ogni trade è un evento on-chain, ed è difficile costruire profondità continua su questa base. Noi abbiamo fatto un compromesso diverso.',
    'custody.th_nighttrader':'NightTrader','custody.th_cex':'CEX custodial','custody.th_wrapped':'BTC wrapped su una DEX','custody.th_atomic':'DEX a scambio atomico',
    'custody.row1_th':'Chi può muovere le tue monete','custody.row1_us':'Tu + quorum dei nodi, per ogni trade','custody.row1_cex':'L\'exchange, unilateralmente','custody.row1_wrapped':'Il custode del bridge','custody.row1_atomic':'Tu',
    'custody.row2_th':'Cosa possiedi','custody.row2_us':'Una chiave in un UTXO multifirma','custody.row2_cex':'Una riga in un database','custody.row2_wrapped':'Un diritto tipo token sulla riserva di qualcun altro','custody.row2_atomic':'Una chiave',
    'custody.row3_th':'Se la piattaforma sparisce','custody.row3_us':'Il timelock ti restituisce le monete','custody.row3_cex':'Un credito da fallimento','custody.row3_wrapped':'Dipende dal custode','custody.row3_atomic':'Mantieni le tue monete',
    'custody.row4_th':'Libro degli ordini','custody.row4_us':'Completo, acquisto/vendita, matching off-chain','custody.row4_cex':'Completo, acquisto/vendita','custody.row4_wrapped':'Pool AMM, nessun ordine','custody.row4_atomic':'Sottile, si riempie lentamente',
    'custody.row5_th':'Costo on-chain per trade','custody.row5_us':'Nessuno — la liquidazione è raggruppata','custody.row5_cex':'Nessuno','custody.row5_wrapped':'Gas ad ogni scambio','custody.row5_atomic':'Più transazioni on-chain',
    'custody.row6_th':'Esposizione durante il trading','custody.row6_us':'Solo l\'importo che hai firmato','custody.row6_cex':'Tutto il tuo saldo','custody.row6_wrapped':'Tutto il tuo saldo wrapped','custody.row6_atomic':'L\'importo del trade',
    'custody.small':'Il matching off-chain significa che il libro si muove alla velocità di un exchange; la chain vede solo la liquidazione. Questo è tutto il trucco, ed è costruito con primitive di script che Bitcoin possiede dal 2009.',
    'custody.viz_label_cex':'Exchange custodial','custody.viz_caption_cex':'Le monete stanno in un unico wallet. La custodia — e il controllo — sono suoi.',
    'custody.viz_note_cex':'Un exchange custodial raccoglie le monete di tutti gli utenti in wallet che controlla soltanto lui. Può congelarle, perderle o prosciugarle — nulla nel protocollo lo impedisce.',
    'custody.viz_label_nt':'NightTrader','custody.viz_caption_nt':'La tua chiave non lascia mai il tuo dispositivo. A muoversi è solo l\'importo firmato.',
    'custody.viz_note_nt':'La tua chiave viene generata nel browser e non lascia mai il tuo dispositivo. Ogni trade autorizza un unico importo firmato e limitato — mai il saldo intero, mai una custodia.',
    'custody.viz_hint':'Tocca un lato per mettere in pausa e ispezionare',
    'how.gut_b':'Liquidazione','how.gut_d':'In ordine','how.h2':'Cosa succede davvero quando piazzi un ordine',
    'how.s1_h3':'La tua chiave è generata lato client',
    'how.s1_p':'Il tuo browser deriva la chiave localmente, oppure la mantieni su un firmatario air-gapped e non la esponi mai. Firma il tuo indirizzo di deposito insieme alla chiave a soglia dei nodi. Il server non la riceve mai, quindi non c\'è nulla da violare né nulla da consegnare.',
    'how.s2_h3':'Firmi un importo, non il tuo saldo',
    'how.s2_p':'Un\'offerta è un hash di firma che autorizza un input specifico per un importo specifico — il meccanismo di autorizzazione originale di Bitcoin. Il tuo output di resto rimane sotto il tuo controllo. I nodi possono instradare solo l\'importo che hai firmato.',
    'how.s3_h3':'Il quorum controfirma e l\'ordine viene eseguito',
    'how.s3_p':'Il matching avviene off-chain su un libro degli ordini in tempo reale. La liquidazione va in chain a lotti. Nessun singolo nodo può produrre da solo la seconda firma; serve l\'accordo di una soglia di nodi.',
    'how.s4_h3':'Il timelock è sempre alle tue spalle',
    'how.s4_p':'Ogni moneta applicabile usa CHECKLOCKTIMEVERIFY. Si rinnova mentre fai trading e non te ne avvicini mai. Se smetti di fare trading, alla fine ti paga comunque.',
    'how.flow_key':'La chiave resta a te','how.flow_amount':'Firmi solo l\'importo','how.flow_cosign':'I nodi controfirmano','how.flow_settle':'Liquidazione',
    'controls.gut_b':'Controllo','controls.gut_d':'Cosa possiedi e cosa monitori','controls.h2':'Tre cose che l\'exchange ti consegna e non può riprendersi.',
    'controls.c1_h3':'Firma da un dispositivo air-gapped',
    'controls.c1_p':'La tua chiave non deve vivere in una scheda del browser. Abbinala a un firmatario offline — un telefono air-gapped con <a href="https://airgap.it/">AirGap Vault</a> o un hardware wallet compatibile — e la chiave non tocca mai una macchina connessa a internet. Ordini e prelievi attraversano questo divario come codici QR: esce una richiesta non firmata, torna una firma. L\'exchange vede solo una firma, nient\'altro.',
    'controls.c1_qr':'Richiesta non firmata → QR → firma di ritorno',
    'controls.c2_h3':'Il tuo script di backup, fin dalla registrazione',
    'controls.c2_p':'Lo script di riscatto ti viene mostrato quando il tuo account viene creato — non sepolto in un articolo di supporto, non disponibile solo su richiesta. Salvalo. Con quello script e la tua chiave puoi ricostruire e spendere tu stesso il ramo del timelock, da qualsiasi wallet che parli il linguaggio di script di Bitcoin, anche con l\'exchange sparito e questo dominio morto.',
    'controls.c3_h3':'Salute dei nodi, a schermo',
    'controls.c3_p':'Una volta loggato, vedi lo stato in tempo reale dell\'insieme di nodi che detiene l\'altra firma — chi è attivo, se il quorum è intatto. Se il backend sta degradando lo scopri dall\'interfaccia, non da una pagina di stato scritta a cose fatte. Una piattaforma che nasconde la propria salute ti sta già dicendo qualcosa.',
    'timelock.gut_b':'Forza maggiore','timelock.gut_d':'L\'uscita che non ha bisogno di noi','timelock.h2':'Supponi che stanotte veniamo perquisiti.',
    'timelock.lede':'Server sequestrati, dominio ritirato, team irraggiungibile, operatori dei nodi spariti. Su un exchange custodial questa è la fine della storia e l\'inizio di una procedura fallimentare. Qui è solo un periodo di attesa.',
    'timelock.l1':'Deposito','timelock.l2':'Trading libero','timelock.l3':'Inattivo','timelock.l4':'<em>Timelock → pagato alla tua chiave</em>',
    'timelock.small':'Il timelock è impostato per singolo account e si rinnova mentre fai trading — il libro non eseguirà un ordine che ti lascerebbe vicino alla scadenza, e dopo una lunga inattività ti verrà chiesto di passare a un nuovo script e a un insieme di nodi aggiornato. Il ramo è imposto dal consenso, non da noi. Non possiamo disattivarlo, e non può farlo nemmeno chi si impossessa dei nostri server.',
    'timelock.step_deposit':'Le monete arrivano all\'indirizzo multifirma. Il conto alla rovescia parte da qui — ogni account riceve un timelock nuovo nel momento in cui viene finanziato.',
    'timelock.step_trade':'Ogni trade che completi rinnova il timelock. Finché fai trading attivamente, non te ne avvicini mai.',
    'timelock.step_inactive':'Nessun trade, nessun rinnovo. Questa è l\'unica fase in cui il conto alla rovescia si muove davvero verso lo zero.',
    'timelock.step_locktime':'OP_CHECKLOCKTIMEVERIFY scatta secondo programma. L\'indirizzo paga solo la tua chiave — senza permessi, senza dover chiedere a nessuno, nulla che possiamo fermare.',
    'timelock.viz_hint':'Tocca un passaggio per mettere in pausa e ispezionare',
    'fees.gut_b':'Commissioni','fees.gut_d':'Tutte quante','fees.h2':'Tre numeri. Non ce n\'è un quarto.',
    'fees.f1_l':'Per ogni trade completato','fees.f2_l':'Trasferimento tra account','fees.f3_l':'Prelievo verso il tuo wallet',
    'fees.p':'Le commissioni pagano gli operatori dei nodi che detengono l\'altra metà della firma. Non esiste un token NightTrader, nessun pre-mine, nessuna tesoreria che trattiene una quota del tuo trade, e nessun rendimento promesso a nessuno. L\'exchange è stato lanciato apposta senza emettere una propria moneta.',
    'fees.th1':'Commissione taker, per confronto','fees.row_nt':'0,125% — tu detieni una chiave','fees.row_uniswap':'0,30% + gas + slippage','fees.row_coinbase':'fino a 0,40% — custodial','fees.row_kraken':'0,20% — custodial','fees.row_binance':'0,10% — custodial',
    'fees.small':'Quotare una moneta ha un costo per il progetto, non per i trader. Integrazione e audit del contratto vengono quotati per progetto. Nulla in questa pagina è una promessa di rendimento, liquidità o qualità di esecuzione.',
    'verify.gut_b':'Verifica','verify.gut_d':'Non fidarti','verify.h2':'Ogni affermazione qui sopra è verificabile. Vai a verificarla.',
    'verify.p':'Una landing page è marketing. Il codice no. Se una riga qui non concorda con il codice, il codice ha ragione e abbiamo un bug da sistemare — dillo a noi.',
    'verify.li_source_k':'Codice sorgente','verify.li_source_v':'<a href="https://github.com/NightTrader/nighttrader.github.io">github.com/NightTrader</a> — frontend e logica di firma. Leggi la derivazione delle chiavi prima di depositare.',
    'verify.li_local_k':'Eseguilo in locale','verify.li_local_v':'Clona il repository e servilo tu stesso. Nessun pacchetto da installare, nessun bisogno di visitare questo dominio per fare trading.',
    'verify.li_paper_k':'Whitepaper','verify.li_paper_v':'<a href="https://github.com/NightTrader/nighttrader.github.io/blob/master/Nighttrader_A_Decentralized_Multisignature_Electronic_Cash_Wallet.pdf">A Decentralized Multisignature Electronic Cash Wallet</a> — la costruzione completa, inclusi i casi Monero ed EVM.',
    'verify.li_script_k':'Il tuo script','verify.li_script_v':'Derivato in modo deterministico, e le modifiche sostanziali vengono incise on-chain. Dovresti poter ricostruire il tuo script di riscatto senza doircelo chiedere.',
    'verify.li_data_k':'Dati','verify.li_data_v':'Raccogliamo il minimo necessario per operare e cifriamo ciò che conserviamo. Questa pagina non carica font, analytics né script di terze parti — controlla la scheda di rete.',
    'privacy.label':'Privacy',
    'privacy.p1':'Raccogliamo il minimo necessario per gestire un libro degli ordini e cifriamo ciò che conserviamo. Nessun pixel pubblicitario, nessun session replay, nessun profilo comportamentale, nessuna relazione con data broker. Questa pagina fa zero richieste a terze parti — nessun font, nessun analytics, nessuna CDN. Apri la scheda di rete e verificalo, invece di crederci sulla parola.',
    'privacy.p2':'Se mai fossimo obbligati a verificare un utente, quel processo passa attraverso <a href="https://www.zk.me/">zkMe</a>. I controlli sui documenti avvengono sul tuo dispositivo — nulla ci viene trasmesso in chiaro. Ciò che riceviamo è una prova a conoscenza zero che hai superato la verifica, non i documenti sottostanti. NightTrader non vede né conserva mai i tuoi dati d\'identità; il ruolo di zkMe si limita a quella verifica e alla generazione della prova.',
    'privacy.p3':'E nota cosa la verifica non può fare qui: un account sotto revisione ha comunque un ramo di timelock. Congelare un account non congela le tue monete, perché lo script te le paga comunque, qualunque cosa decidiamo.',
    'node.label':'Gestisci un nodo','node.p':'Gli operatori dei nodi detengono l\'altra metà di ogni firma e ricevono una quota delle commissioni. Non c\'è modulo di iscrizione né mailing list. Contattaci via Bitmessage:',
    'node.copy':'Copia','node.copy_copied':'Copiato','node.copy_select':'Selezionato',
    'node.f':'Se questo canale non ti è comodo, probabilmente non sei l\'operatore che stiamo cercando.',
    'tradeoffs.gut_b':'Compromessi','tradeoffs.gut_d':'Cosa non è questo','tradeoffs.h2':'La parte che gli altri exchange lasciano fuori dalla home page.',
    'tradeoffs.t1_dt':'Questa non è auto-custodia','tradeoffs.t1_dd':'È co-custodia con un\'uscita a timelock. Detieni una delle due chiavi richieste, il che è strettamente meglio di un saldo su un exchange e strettamente peggio di monete nel tuo cold storage. Fai trading qui; non conservare qui.',
    'tradeoffs.t2_dt':'I nodi possono andare offline','tradeoffs.t2_dd':'Se il quorum si rompe a metà di un trade, le transazioni semi-firmate semplicemente non vengono mai trasmesse. Non perdi il capitale, ma puoi perdere un\'esecuzione e il profitto che ci sarebbe stato.',
    'tradeoffs.t3_dt':'Il browser è la superficie d\'attacco','tradeoffs.t3_dd':'La tua chiave è derivata dalle tue credenziali. Una password debole, una macchina compromessa o un login rubato con phishing sono il modo realistico di perdere monete qui — non un attacco ai nostri server. Usa una passphrase lunga e la 2FA, e tieni il tuo backup lontano dalla macchina con cui fai trading.',
    'tradeoffs.t4_dt':'Possiamo chiederti il KYC','tradeoffs.t4_dd':'Ci riserviamo il diritto di richiedere una verifica, effettuata tramite <a href="https://www.zk.me/">zkMe</a>. I documenti vengono controllati sul tuo dispositivo e non ci raggiungono mai — riceviamo una prova a conoscenza zero dell\'esito positivo, non i tuoi dati d\'identità. Nota cosa questo non può fare: congelare un account non congela i tuoi fondi per sempre, perché il ramo del timelock viene comunque eseguito.',
    'tradeoffs.t5_dt':'Non tutto qui è bitcoin','tradeoffs.t5_dd':'Bitcoin è la coppia base e l\'obiettivo di design — le prime integrazioni sono state scelte per il supporto a CHECKLOCKTIMEVERIFY. Altri asset vengono quotati solo dove le stesse garanzie possono essere riprodotte. Se una moneta non può essere protetta in questo modo, preferiamo non quotarla.',
    'tradeoffs.t6_dt':'Non è Lightning, non è un rollup','tradeoffs.t6_dd':'È uno strumento diverso. Lightning è eccellente per i pagamenti e scomodo come sede di un grande libro degli ordini; rollup e scambi atomici sono la risposta a lungo termine e sono ancora troppo costosi o lenti per il trading quotidiano. Ci sposteremo quando saranno pronti.',
    'tradeoffs.cta_back':'Torna allo script',
    'history.gut_b':'Storia','history.gut_d':'Dal 2014','history.h2':'È iniziato con un ATM all\'angolo di una strada a Tijuana.',
    'history.p1':'bitcoin42 non è nato come exchange. È nato come operatore di ATM per bitcoin — installando macchine Genesis1 per le strade di Tijuana, in Messico, nel 2014, tra i primi del suo genere ovunque.',
    'history.p2':'Quello stesso anno, lo stesso team costruì <a href="https://bithalo.org/">BitHalo</a> — uno dei primi sistemi di smart contract realmente funzionanti su Bitcoin, capace di far rispettare accordi tra due parti tramite un deposito multifirma e senza una terza parte fidata, anni prima che Ethereum rendesse "smart contract" un termine di uso comune. <a href="https://bitbay.market/">BitBay</a> arrivò nel 2015: un marketplace completamente decentralizzato costruito attorno a un proprio wallet multifirma con contratti integrati, ancora attivo oggi. All\'epoca nessun altro faceva sul serio con la multifirma su Bitcoin quanto loro.',
    'history.p3':'Gestire ATM non è mai stato l\'obiettivo. Il libro degli ordini era il piano fin dal primo giorno: un exchange vero che non prendesse mai in custodia le tue monete, in un\'epoca in cui ogni exchange faceva esattamente quello. Ci sono voluti più di dieci anni costruendo sistemi multifirma non custodial — vedendo un custode dopo l\'altro fallire nel frattempo — per costruirlo bene.',
    'history.tl1':'2014 · ATM per bitcoin, Tijuana','history.tl_bithalo':'2014 · BitHalo','history.tl_bitbay':'2015 · BitBay','history.tl2':'<em>2025 · lancio di NightTrader</em>',
    'history.citation':'La copertura dell\'epoca: <a href="https://www.coindesk.com/markets/2014/03/28/money-spinners-genesis1-bitcoin-and-dogecoin-atms-arrive-in-tijuana-mexico">CoinDesk, marzo 2014</a> — gli ATM Genesis1 per bitcoin e dogecoin arrivano a Tijuana. <a href="https://www.coindesk.com/markets/2014/08/08/bithalo-smart-contracts-without-the-block-chain-bloat">CoinDesk, agosto 2014</a> — BitHalo lancia smart contract senza appesantire la blockchain. <a href="https://bitcoinist.com/bitbay-decentralized-marketplace-and-the-internet-of-things/">Bitcoinist, novembre 2016</a> — il marketplace decentralizzato di BitBay, spiegato. Undici anni dopo: <a href="https://www.globenewswire.com/news-release/2025/09/08/3145992/0/en/bitcoin-s-first-true-high-speed-dex-nighttrader-launches.html">GlobeNewswire, settembre 2025</a> — nasce NightTrader, il primo vero DEX ad alta velocità per bitcoin.',
    'footer.col_exchange':'Exchange','footer.link_trade':'Fai trading','footer.link_list':'Quota una moneta',
    'footer.col_legal':'Legale','footer.link_risk':'Informativa sui rischi',
    'footer.link_whitepaper':'Whitepaper','footer.link_airgapped':'Firma air-gapped','footer.link_tradeoffs':'Compromessi noti',
    'footer.imp_h4':'Note legali · Operatore','footer.imp_email_label':'E-Mail:',
    'footer.legal_p1':'NightTrader.Exchange è un\'interfaccia di trading non custodial. Non è una banca, un broker, un custode o un servizio di investimento, e nulla qui è consulenza di investimento o promessa di rendimento, liquidità o esecuzione. Fare trading di asset digitali può comportare la perdita totale. Sei responsabile della tua chiave e dei tuoi backup.',
    'footer.legal_p2':'Servito da bitcoin42.com — registrato nel 2014 · Questa pagina non effettua richieste a terze parti.',
    'footer.lang_label':'Lingua'
  };

  T.pt = {
    'nav.custody':'Custódia','nav.how':'Como liquida','nav.controls':'Controle','nav.timelock':'Timelock',
    'nav.fees':'Taxas','nav.privacy':'Privacidade','nav.tradeoffs':'Compromissos','nav.history':'História','nav.open':'Abrir exchange',
    'theme.to_dark':'Escuro','theme.to_light':'Claro',
    'hero.kicker':'Nativo em Bitcoin · Não custodial · Livro de ofertas completo de compra/venda',
    'hero.h1':'Sem suas chaves,<br>sem suas moedas.<br><span class="thin">Por isso te demos uma chave.</span>',
    'hero.answer':'Toda conta NightTrader é um endereço multiassinatura 2-de-2 ou 3-de-3.<br>\n    Uma chave é sua, gerada no seu navegador. A exchange não pode gastar sem ela.',
    'hero.lede':'Um livro de ofertas de verdade — ordens limitadas de compra, ordens limitadas de venda, spreads apertados — sem uma carteira coletiva segurando todo o seu saldo. Sem BTC empacotado (wrapped). Sem saldo tipo IOU no banco de dados de outra pessoa. Sem saída para um golpe.',
    'hero.cta_open':'Abrir a exchange','hero.cta_paper':'Ler o whitepaper','hero.cta_source':'Ver o código-fonte',
    'hero.cta_note':'Não custodial · Sem barreira de cadastro para ver o livro · Saque quando quiser',
    'script.head_left':'Script de resgate P2SH · sua conta','script.head_right':'Toque em um termo destacado',
    'script.tag_yourkey':'Sua chave',
    'script.note_yourkey':'Derivada no seu navegador a partir das suas credenciais e nunca transmitida. Nada sai do endereço sem uma assinatura desta chave — nem uma negociação, nem um saque, nem um chamado de suporte.',
    'script.tag_nodekey':'A chave dos nós',
    'script.note_nodekey':'Uma assinatura de limiar (threshold) mantida coletivamente pelo conjunto de nós. Nenhum operador sozinho consegue reconstruí-la; é preciso o acordo de uma supermaioria para que a segunda assinatura exista.',
    'script.tag_exit':'Saída de força maior',
    'script.note_exit':'OP_CHECKLOCKTIMEVERIFY. Se os nós desaparecerem, forem apreendidos ou simplesmente pararem de responder, esse ramo é ativado no prazo programado e paga o endereço somente para a sua chave. Sem permissão, sem fila de suporte, sem taxa de recuperação.',
    'script.hint':'As negociações autorizam um único valor com SIGHASH_SINGLE. Oferte 0,2 BTC de um saldo de 10 BTC e 0,2 BTC é tudo o que você assinou.',
    'custody.gut_b':'Custódia','custody.gut_d':'Quem pode movimentar',
    'custody.h2':'Quatro formas de negociar bitcoin. Só uma deixa a chave com você e ainda assim oferece um livro de ofertas.',
    'custody.lede':'Bisq e RoboSats são plataformas honestas e não custodiais, e nós reconhecemos isso. O compromisso que elas fazem é custo e velocidade: cada negociação é um evento on-chain, e é difícil construir profundidade contínua sobre essa base. Nós fizemos um compromisso diferente.',
    'custody.th_nighttrader':'NightTrader','custody.th_cex':'CEX custodial','custody.th_wrapped':'BTC empacotado em uma DEX','custody.th_atomic':'DEX de troca atômica',
    'custody.row1_th':'Quem pode movimentar suas moedas','custody.row1_us':'Você + quórum de nós, por negociação','custody.row1_cex':'A exchange, unilateralmente','custody.row1_wrapped':'O custodiante da ponte','custody.row1_atomic':'Você',
    'custody.row2_th':'O que você possui','custody.row2_us':'Uma chave em um UTXO multiassinatura','custody.row2_cex':'Uma linha em um banco de dados','custody.row2_wrapped':'Um direito tipo token sobre a reserva de outra pessoa','custody.row2_atomic':'Uma chave',
    'custody.row3_th':'Se a plataforma desaparecer','custody.row3_us':'O timelock devolve suas moedas','custody.row3_cex':'Um crédito em falência','custody.row3_wrapped':'Depende do custodiante','custody.row3_atomic':'Você mantém suas moedas',
    'custody.row4_th':'Livro de ofertas','custody.row4_us':'Completo, compra/venda, casamento fora da cadeia','custody.row4_cex':'Completo, compra/venda','custody.row4_wrapped':'Pool AMM, sem ofertas','custody.row4_atomic':'Raso, preenche devagar',
    'custody.row5_th':'Custo em cadeia por negociação','custody.row5_us':'Nenhum — a liquidação é feita em lote','custody.row5_cex':'Nenhum','custody.row5_wrapped':'Gas a cada troca','custody.row5_atomic':'Múltiplas transações on-chain',
    'custody.row6_th':'Exposição durante a negociação','custody.row6_us':'Somente o valor que você assinou','custody.row6_cex':'Todo o seu saldo','custody.row6_wrapped':'Todo o seu saldo empacotado','custody.row6_atomic':'O valor da negociação',
    'custody.small':'Casamento fora da cadeia significa que o livro se move na velocidade de uma exchange; a cadeia só vê a liquidação. Esse é todo o truque, e ele é construído com primitivas de script que o Bitcoin tem desde 2009.',
    'custody.viz_label_cex':'Exchange custodial','custody.viz_caption_cex':'As moedas ficam em uma única carteira. A custódia — e o controle — é dela.',
    'custody.viz_note_cex':'Uma exchange custodial reúne as moedas de todos os usuários em carteiras que só ela controla. Ela pode congelá-las, perdê-las ou drená-las — nada no protocolo impede isso.',
    'custody.viz_label_nt':'NightTrader','custody.viz_caption_nt':'Sua chave nunca sai do seu dispositivo. Só sai o valor assinado.',
    'custody.viz_note_nt':'Sua chave é gerada no seu navegador e nunca sai do seu dispositivo. Cada negociação autoriza um único valor assinado e limitado — nunca o seu saldo inteiro, nunca custódia.',
    'custody.viz_hint':'Toque em um lado para pausar e inspecionar',
    'how.gut_b':'Liquidação','how.gut_d':'Em ordem','how.h2':'O que realmente acontece quando você faz um pedido',
    'how.s1_h3':'Sua chave é gerada no lado do cliente',
    'how.s1_p':'Seu navegador deriva a chave localmente, ou você a mantém em um assinador air-gapped e nunca a expõe. Ela assina seu endereço de depósito junto com a chave de limiar dos nós. O servidor nunca a recebe, então não há nada para violar nem nada para entregar.',
    'how.s2_h3':'Você assina um valor, não o seu saldo',
    'how.s2_p':'Uma oferta é um hash de assinatura que autoriza uma entrada específica para um valor específico — o mecanismo original de permissão do Bitcoin. Sua saída de troco permanece sob seu controle. Os nós só podem movimentar o valor que você assinou.',
    'how.s3_h3':'O quórum assina em segundo e o pedido é preenchido',
    'how.s3_p':'O casamento acontece fora da cadeia contra um livro de ofertas ao vivo. A liquidação vai em lote para a cadeia. Nenhum nó sozinho consegue produzir a segunda assinatura; é necessário o acordo de um limiar.',
    'how.s4_h3':'O timelock está sempre atrás de você',
    'how.s4_p':'Toda moeda aplicável usa CHECKLOCKTIMEVERIFY. Ele é renovado enquanto você negocia, e você nunca chega perto dele. Se você parar de negociar, ele acaba te pagando de qualquer forma.',
    'how.flow_key':'A chave fica com você','how.flow_amount':'Assina apenas o valor','how.flow_cosign':'Os nós co-assinam','how.flow_settle':'Liquidação',
    'controls.gut_b':'Controle','controls.gut_d':'O que você possui e observa','controls.h2':'Três coisas que a exchange te entrega e não pode tirar de volta.',
    'controls.c1_h3':'Assine a partir de um dispositivo air-gapped',
    'controls.c1_p':'Sua chave não precisa viver em uma aba do navegador. Combine com um assinador offline — um celular air-gapped rodando <a href="https://airgap.it/">AirGap Vault</a> ou uma carteira de hardware compatível — e a chave nunca toca uma máquina conectada à internet. Pedidos e saques cruzam essa lacuna como códigos QR: sai uma solicitação não assinada, volta uma assinatura. A exchange só vê uma assinatura, e nada mais.',
    'controls.c1_qr':'Solicitação não assinada → QR → assinatura de volta',
    'controls.c2_h3':'Seu script de backup, já no cadastro',
    'controls.c2_p':'O script de resgate é mostrado a você quando a conta é criada — não escondido em um artigo de suporte, nem disponível só sob pedido. Guarde-o. Com esse script e sua chave, você pode reconstruir e gastar o ramo do timelock sozinho, a partir de qualquer carteira que fale a linguagem de script do Bitcoin, mesmo com a exchange fora do ar e este domínio morto.',
    'controls.c3_h3':'Saúde dos nós, na tela',
    'controls.c3_p':'Depois de logado, você vê o estado ao vivo do conjunto de nós que segura a outra assinatura — quem está no ar, se o quórum está intacto. Se o backend estiver degradando, você descobre pela interface, não por uma página de status escrita depois do fato. Uma plataforma que esconde sua própria saúde já está te dizendo algo.',
    'timelock.gut_b':'Força maior','timelock.gut_d':'A saída que não depende de nós','timelock.h2':'Suponha que sejamos invadidos hoje à noite.',
    'timelock.lede':'Servidores apreendidos, domínio retirado, equipe inacessível, operadores de nós somem. Em uma exchange custodial, esse é o fim da história e o início de um processo de falência. Aqui, é apenas um período de espera.',
    'timelock.l1':'Depósito','timelock.l2':'Negociar livremente','timelock.l3':'Inativo','timelock.l4':'<em>Timelock → pago para sua chave</em>',
    'timelock.small':'O timelock é definido por conta e renovado conforme você negocia — o livro não vai preencher um pedido que te deixaria perto do vencimento, e após uma longa inatividade você será convidado a migrar para um novo script e um conjunto de nós atual. O ramo é garantido por consenso, não por nós. Não podemos desligá-lo, e quem tomar nossos servidores também não conseguiria.',
    'timelock.step_deposit':'As moedas chegam ao endereço multiassinatura. O relógio começa aqui — cada conta recebe um timelock novo no momento em que é financiada.',
    'timelock.step_trade':'Cada negociação que você completa renova o timelock. Enquanto estiver negociando ativamente, você nunca chega perto dele.',
    'timelock.step_inactive':'Sem negociações, sem renovação. Esta é a única fase em que a contagem regressiva realmente avança em direção a zero.',
    'timelock.step_locktime':'O OP_CHECKLOCKTIMEVERIFY dispara conforme programado. O endereço paga somente para a sua chave — sem necessidade de permissão, sem ninguém a quem pedir, nada que possamos impedir.',
    'timelock.viz_hint':'Toque em uma etapa para pausar e inspecionar',
    'fees.gut_b':'Taxas','fees.gut_d':'Todas elas','fees.h2':'Três números. Não existe um quarto.',
    'fees.f1_l':'Por negociação concluída','fees.f2_l':'Transferência entre contas','fees.f3_l':'Saque para sua própria carteira',
    'fees.p':'As taxas pagam os operadores de nós que seguram a outra metade da assinatura. Não existe token NightTrader, nem pré-mineração, nem tesouraria tirando uma parte da sua negociação, e nenhum rendimento é prometido a ninguém. A exchange foi lançada de propósito sem emitir uma moeda própria.',
    'fees.th1':'Taxa de taker, para comparação','fees.row_nt':'0,125% — você tem uma chave','fees.row_uniswap':'0,30% + gas + slippage','fees.row_coinbase':'até 0,40% — custodial','fees.row_kraken':'0,20% — custodial','fees.row_binance':'0,10% — custodial',
    'fees.small':'Listar uma moeda tem custo para o projeto, não para os traders. Integração e auditoria de contrato são cotadas por projeto. Nada nesta página é uma promessa de retorno, liquidez ou qualidade de execução.',
    'verify.gut_b':'Verifique','verify.gut_d':'Não confie','verify.h2':'Toda afirmação acima pode ser verificada. Vá verificar.',
    'verify.p':'Uma landing page é marketing. Código não é. Se alguma linha aqui discordar do código, o código está certo e temos um bug para corrigir — nos avise.',
    'verify.li_source_k':'Código-fonte','verify.li_source_v':'<a href="https://github.com/NightTrader/nighttrader.github.io">github.com/NightTrader</a> — frontend e lógica de assinatura. Leia a derivação de chaves antes de depositar.',
    'verify.li_local_k':'Rode localmente','verify.li_local_v':'Clone o repositório e sirva você mesmo. Nenhum pacote para instalar, nenhuma necessidade de visitar este domínio para negociar.',
    'verify.li_paper_k':'Whitepaper','verify.li_paper_v':'<a href="https://github.com/NightTrader/nighttrader.github.io/blob/master/Nighttrader_A_Decentralized_Multisignature_Electronic_Cash_Wallet.pdf">A Decentralized Multisignature Electronic Cash Wallet</a> — a construção completa, incluindo os casos de Monero e EVM.',
    'verify.li_script_k':'Seu script','verify.li_script_v':'Derivado de forma determinística, e mudanças materiais são gravadas on-chain. Você deveria conseguir reconstruir seu próprio script de resgate sem precisar nos pedir.',
    'verify.li_data_k':'Dados','verify.li_data_v':'Coletamos o mínimo necessário para operar e criptografamos o que guardamos. Esta página não carrega fontes, análises nem scripts de terceiros — confira a aba de rede.',
    'privacy.label':'Privacidade',
    'privacy.p1':'Coletamos o mínimo necessário para operar um livro de ofertas e criptografamos o que guardamos. Não há pixel de publicidade, replay de sessão, perfil comportamental, nem relação com corretores de dados. Esta página faz zero solicitações a terceiros — sem fontes, sem análises, sem CDN. Abra a aba de rede e confirme, em vez de simplesmente acreditar em nós.',
    'privacy.p2':'Se algum dia formos obrigados a verificar um usuário, esse processo passa pela <a href="https://www.zk.me/">zkMe</a>. As verificações de documentos acontecem no seu próprio dispositivo — nada é transmitido a nós em texto claro. O que recebemos é uma prova de conhecimento zero de que você passou na verificação, não os documentos em si. A NightTrader nunca vê nem armazena seus dados de identidade; o papel da zkMe se limita a essa verificação e geração de prova.',
    'privacy.p3':'E note o que a verificação não pode fazer aqui: uma conta sob revisão ainda tem um ramo de timelock. Congelar uma conta não congela suas moedas, porque o script paga a você de qualquer forma, independentemente do que decidirmos.',
    'node.label':'Rode um nó','node.p':'Operadores de nós seguram a outra metade de cada assinatura e recebem uma parte das taxas. Não há formulário de cadastro nem lista de e-mail. Fale conosco pelo Bitmessage:',
    'node.copy':'Copiar','node.copy_copied':'Copiado','node.copy_select':'Selecionado',
    'node.f':'Se esse canal não for conveniente para você, provavelmente você não é o operador que estamos procurando.',
    'tradeoffs.gut_b':'Compromissos','tradeoffs.gut_d':'O que isto não é','tradeoffs.h2':'A parte que outras exchanges deixam fora da página inicial.',
    'tradeoffs.t1_dt':'Isto não é autocustódia','tradeoffs.t1_dd':'É co-custódia com uma saída por timelock. Você mantém uma das duas chaves necessárias, o que é estritamente melhor que um saldo em exchange e estritamente pior que moedas na sua própria custódia fria. Negocie aqui; não guarde aqui.',
    'tradeoffs.t2_dt':'Os nós podem ficar offline','tradeoffs.t2_dd':'Se o quórum quebrar no meio de uma negociação, transações semi-assinadas simplesmente nunca são transmitidas. Você não perde o principal, mas pode perder um preenchimento e o lucro que vinha junto.',
    'tradeoffs.t3_dt':'O navegador é a superfície de ataque','tradeoffs.t3_dd':'Sua chave é derivada das suas credenciais. Uma senha fraca, uma máquina comprometida ou um login via phishing é a forma realista de perder moedas aqui — não um ataque aos nossos servidores. Use uma frase-senha longa e 2FA, e mantenha seu backup fora da máquina em que você negocia.',
    'tradeoffs.t4_dt':'Podemos pedir KYC','tradeoffs.t4_dd':'Nos reservamos o direito de solicitar verificação, feita pela <a href="https://www.zk.me/">zkMe</a>. Os documentos são verificados no seu dispositivo e nunca chegam até nós — recebemos uma prova de conhecimento zero de aprovação, não seus dados de identidade. Note o que isso não pode fazer: congelar uma conta não congela seus fundos para sempre, porque o ramo do timelock continua sendo executado.',
    'tradeoffs.t5_dt':'Nem tudo aqui é bitcoin','tradeoffs.t5_dd':'Bitcoin é o par-base e o alvo de design — as primeiras integrações foram escolhidas pelo suporte a CHECKLOCKTIMEVERIFY. Outros ativos só são listados onde as mesmas garantias podem ser reproduzidas. Se uma moeda não pode ser protegida dessa forma, preferimos não listá-la.',
    'tradeoffs.t6_dt':'Não é Lightning, não é um rollup','tradeoffs.t6_dd':'É uma ferramenta diferente. Lightning é excelente para pagamentos e desajeitada como sede de um livro de ofertas grande; rollups e trocas atômicas são a resposta de longo prazo e ainda são caros ou lentos demais para negociação diária. Vamos migrar quando estiverem prontos.',
    'tradeoffs.cta_back':'Voltar ao script',
    'history.gut_b':'História','history.gut_d':'Desde 2014','history.h2':'Começou com um caixa eletrônico numa esquina de Tijuana.',
    'history.p1':'A bitcoin42 não começou como uma exchange. Começou como operadora de caixas eletrônicos de bitcoin — colocando máquinas Genesis1 nas ruas de Tijuana, no México, em 2014, entre as primeiras do tipo em qualquer lugar.',
    'history.p2':'Naquele mesmo ano, a mesma equipe construiu a <a href="https://bithalo.org/">BitHalo</a> — um dos primeiros sistemas de contratos inteligentes realmente funcionais sobre Bitcoin, capaz de fazer cumprir acordos entre duas partes por meio de custódia multiassinatura e sem terceiros de confiança, anos antes de a Ethereum transformar "smart contract" em um termo popular. A <a href="https://bitbay.market/">BitBay</a> veio em seguida, em 2015: um marketplace totalmente descentralizado construído em torno da própria carteira multiassinatura com contratos embutidos, ainda em funcionamento hoje. Naquela época, ninguém mais levava a multiassinatura em Bitcoin tão a sério.',
    'history.p3':'Operar caixas eletrônicos nunca foi o objetivo. O livro de ofertas era o plano desde o primeiro dia: uma exchange de verdade que nunca tomasse custódia das suas moedas, numa época em que toda exchange fazia exatamente isso. Levou mais de uma década construindo sistemas multiassinatura não custodiais — vendo um custodiante após o outro falhar nesse meio-tempo — para construir isso direito.',
    'history.tl1':'2014 · Caixas eletrônicos de bitcoin, Tijuana','history.tl_bithalo':'2014 · BitHalo','history.tl_bitbay':'2015 · BitBay','history.tl2':'<em>2025 · lançamento da NightTrader</em>',
    'history.citation':'Cobertura da época: <a href="https://www.coindesk.com/markets/2014/03/28/money-spinners-genesis1-bitcoin-and-dogecoin-atms-arrive-in-tijuana-mexico">CoinDesk, março de 2014</a> — chegam a Tijuana os caixas eletrônicos Genesis1 de bitcoin e dogecoin. <a href="https://www.coindesk.com/markets/2014/08/08/bithalo-smart-contracts-without-the-block-chain-bloat">CoinDesk, agosto de 2014</a> — a BitHalo lança contratos inteligentes sem sobrecarregar a blockchain. <a href="https://bitcoinist.com/bitbay-decentralized-marketplace-and-the-internet-of-things/">Bitcoinist, novembro de 2016</a> — o marketplace descentralizado da BitBay, explicado. Onze anos depois: <a href="https://www.globenewswire.com/news-release/2025/09/08/3145992/0/en/bitcoin-s-first-true-high-speed-dex-nighttrader-launches.html">GlobeNewswire, setembro de 2025</a> — é lançada a NightTrader, a primeira DEX de alta velocidade de verdade para bitcoin.',
    'footer.col_exchange':'Exchange','footer.link_trade':'Negociar','footer.link_list':'Listar uma moeda',
    'footer.col_legal':'Legal','footer.link_risk':'Divulgação de riscos',
    'footer.link_whitepaper':'Whitepaper','footer.link_airgapped':'Assinatura air-gapped','footer.link_tradeoffs':'Compromissos conhecidos',
    'footer.imp_h4':'Aviso legal · Operador','footer.imp_email_label':'E-mail:',
    'footer.legal_p1':'A NightTrader.Exchange é uma interface de negociação não custodial. Não é um banco, uma corretora, uma custodiante nem um serviço de investimento, e nada aqui é conselho de investimento ou promessa de rendimento, liquidez ou execução. Negociar ativos digitais pode resultar em perda total. Você é responsável pela sua própria chave e pelos seus próprios backups.',
    'footer.legal_p2':'Servido a partir de bitcoin42.com — registrado em 2014 · Esta página não faz solicitações a terceiros.',
    'footer.lang_label':'Idioma'
  };

  T.ar = {
    'nav.custody':'الحضانة','nav.how':'آلية التسوية','nav.controls':'الصلاحيات','nav.timelock':'القفل الزمني',
    'nav.fees':'الرسوم','nav.privacy':'الخصوصية','nav.tradeoffs':'المقايضات','nav.history':'قصتنا','nav.open':'افتح المنصة',
    'theme.to_dark':'داكن','theme.to_light':'فاتح',
    'hero.kicker':'قائم على بيتكوين · غير وصائي · دفتر أوامر كامل للبيع والشراء',
    'hero.h1':'لا مفاتيحك،<br>لا عملاتك.<br><span class="thin">لذلك أعطيناك مفتاحاً.</span>',
    'hero.answer':'كل حساب في NightTrader هو عنوان متعدد التوقيع 2-من-2 أو 3-من-3.<br>\n    أحد المفاتيح ملكك، يُولَّد داخل متصفحك. لا يمكن للمنصة الإنفاق بدونه.',
    'hero.lede':'دفتر أوامر حقيقي — أوامر شراء محددة، أوامر بيع محددة، فروقات سعر ضيقة — من دون محفظة جامعة تحتفظ برصيدك بالكامل. لا BTC مغلّف. لا رصيد دَيْني في قاعدة بيانات شخص آخر. لا مخرج نحو عملية احتيال.',
    'hero.cta_open':'افتح المنصة','hero.cta_paper':'اقرأ الورقة البيضاء','hero.cta_source':'اطّلع على الكود المصدري',
    'hero.cta_note':'غير وصائي · لا حاجز تسجيل لتصفح الدفتر · اسحب أموالك متى شئت',
    'script.head_left':'سكربت الاسترداد P2SH · حسابك','script.head_right':'اضغط على مصطلح مظلَّل',
    'script.tag_yourkey':'مفتاحك',
    'script.note_yourkey':'يُشتق داخل متصفحك من بيانات اعتمادك ولا يُرسَل أبداً. لا يخرج شيء من العنوان دون توقيع بهذا المفتاح — لا صفقة، ولا سحب، ولا حتى تذكرة دعم.',
    'script.tag_nodekey':'مفتاح العقد',
    'script.note_nodekey':'توقيع بحد أدنى (threshold) تحتفظ به مجموعة العقد بشكل جماعي. لا يستطيع أي مشغّل بمفرده إعادة بنائه؛ يجب أن توافق أغلبية كبيرة قبل أن يصبح التوقيع الثاني موجوداً أصلاً.',
    'script.tag_exit':'مخرج القوة القاهرة',
    'script.note_exit':'OP_CHECKLOCKTIMEVERIFY. إذا اختفت العقد أو صودرت أو ببساطة توقفت عن الاستجابة، يُفعَّل هذا الفرع في موعده المحدد ويدفع العنوان بالكامل لمفتاحك وحده. من دون إذن، من دون طابور دعم، من دون رسوم استرجاع.',
    'script.hint':'الصفقات تُخوِّل مبلغاً واحداً فقط عبر SIGHASH_SINGLE. اعرض 0.2 BTC من رصيد قدره 10 BTC، ولن يكون قد وُقِّع سوى على هذا الـ 0.2 BTC.',
    'custody.gut_b':'الحضانة','custody.gut_d':'من يملك تحريك أموالك',
    'custody.h2':'أربع طرق لتداول البيتكوين. طريقة واحدة فقط منها تُبقي المفتاح بيدك وتمنحك مع ذلك دفتر أوامر.',
    'custody.lede':'منصتا Bisq وRoboSats صادقتان وغير وصائيتين، ونحن نقول ذلك بصراحة. المقايضة التي تقدمانها هي التكلفة والسرعة: كل صفقة هي حدث على السلسلة، ومن الصعب بناء عمق مستمر فوق ذلك. نحن اخترنا مقايضة مختلفة.',
    'custody.th_nighttrader':'NightTrader','custody.th_cex':'منصة مركزية وصائية','custody.th_wrapped':'BTC مغلّف على منصة DEX','custody.th_atomic':'منصة تبادل ذري DEX',
    'custody.row1_th':'من يملك تحريك عملاتك','custody.row1_us':'أنت + نصاب العقد، لكل صفقة','custody.row1_cex':'المنصة، من طرف واحد','custody.row1_wrapped':'أمين الجسر','custody.row1_atomic':'أنت',
    'custody.row2_th':'ما الذي تملكه','custody.row2_us':'مفتاح ضمن UTXO متعدد التوقيع','custody.row2_cex':'سطر في قاعدة بيانات','custody.row2_wrapped':'مطالبة رمزية على احتياطي شخص آخر','custody.row2_atomic':'مفتاح',
    'custody.row3_th':'إذا اختفت المنصة','custody.row3_us':'القفل الزمني يعيد عملاتك','custody.row3_cex':'مطالبة إفلاس','custody.row3_wrapped':'يعتمد على الأمين','custody.row3_atomic':'تحتفظ بعملاتك',
    'custody.row4_th':'دفتر الأوامر','custody.row4_us':'كامل للبيع والشراء، مطابقة خارج السلسلة','custody.row4_cex':'كامل للبيع والشراء','custody.row4_wrapped':'تجمع AMM، بلا أوامر','custody.row4_atomic':'ضحل وبطيء التنفيذ',
    'custody.row5_th':'تكلفة السلسلة لكل صفقة','custody.row5_us':'لا شيء — التسوية مجمّعة','custody.row5_cex':'لا شيء','custody.row5_wrapped':'رسوم غاز مع كل تبادل','custody.row5_atomic':'عدة معاملات على السلسلة',
    'custody.row6_th':'التعرض أثناء التداول','custody.row6_us':'فقط المبلغ الذي وقّعته','custody.row6_cex':'رصيدك بالكامل','custody.row6_wrapped':'كامل رصيدك المغلّف','custody.row6_atomic':'مبلغ الصفقة',
    'custody.small':'المطابقة خارج السلسلة تعني أن الدفتر يعمل بسرعة منصة تداول؛ والسلسلة لا ترى سوى التسوية. هذه هي الحيلة بأكملها، وهي مبنية على عناصر سكربت يمتلكها البيتكوين منذ عام 2009.',
    'custody.viz_label_cex':'منصة وصائية','custody.viz_caption_cex':'الأموال كلها في محفظة واحدة. الحضانة — أي السيطرة — بيدها.',
    'custody.viz_note_cex':'تجمع المنصة الوصائية أموال جميع المستخدمين في محافظ لا تسيطر عليها سوى هي. يمكنها تجميدها أو فقدانها أو تفريغها — لا شيء في البروتوكول يمنع ذلك.',
    'custody.viz_label_nt':'NightTrader','custody.viz_caption_nt':'مفتاحك لا يغادر جهازك أبداً. ما يغادر فقط هو المبلغ الموقَّع.',
    'custody.viz_note_nt':'يُولَّد مفتاحك داخل متصفحك ولا يغادر جهازك أبداً. كل صفقة تُخوِّل مبلغاً واحداً موقَّعاً ومحدوداً — لا رصيدك بالكامل أبداً، ولا حضانة أبداً.',
    'custody.viz_hint':'اضغط على أحد الجانبين للإيقاف المؤقت والمعاينة',
    'how.gut_b':'التسوية','how.gut_d':'بالترتيب','how.h2':'ما الذي يحدث فعلياً عند وضع أمر',
    'how.s1_h3':'يُولَّد مفتاحك من جهتك أنت',
    'how.s1_p':'يشتق متصفحك المفتاح محلياً، أو تحتفظ به على جهاز توقيع معزول عن الشبكة ولا تكشفه إطلاقاً. يوقّع عنوان إيداعك مع مفتاح عتبة العقد معاً. لا يستلمه الخادم أبداً، فلا يوجد ما يُخترَق ولا ما يُسلَّم.',
    'how.s2_h3':'توقّع مبلغاً واحداً، لا رصيدك بالكامل',
    'how.s2_p':'أمر الشراء هو تجزئة توقيع تُخوِّل مُدخلاً محدداً بحجم محدد — آلية التخويل الأصلية في البيتكوين. مُخرج الباقي يبقى تحت سيطرتك. لا يمكن للعقد توجيه سوى المبلغ الذي وقّعته.',
    'how.s3_h3':'نصاب العقد يوقّع ثانياً ويُنفَّذ الأمر',
    'how.s3_p':'تحدث المطابقة خارج السلسلة مقابل دفتر أوامر حي. تُجمَّع التسوية دفعة واحدة نحو السلسلة. لا يمكن لعقدة واحدة إنتاج التوقيع الثاني بمفردها؛ يجب موافقة عدد يبلغ حد العتبة.',
    'how.s4_h3':'القفل الزمني يقف دائماً خلفك',
    'how.s4_p':'كل عملة قابلة للتطبيق تستخدم CHECKLOCKTIMEVERIFY. يتجدد أثناء تداولك فلا تقترب منه أبداً. إذا توقفت عن التداول، سيدفع لك في النهاية على أي حال.',
    'how.flow_key':'المفتاح يبقى معك','how.flow_amount':'وقّع على المبلغ فقط','how.flow_cosign':'العقد توقّع معاً','how.flow_settle':'التسوية',
    'controls.gut_b':'الصلاحيات','controls.gut_d':'ما تملكه وما تراقبه','controls.h2':'ثلاثة أمور تسلّمك المنصة إياها ولا يمكنها استعادتها.',
    'controls.c1_h3':'وقّع من جهاز معزول عن الشبكة',
    'controls.c1_p':'لا يجب أن يعيش مفتاحك داخل تبويب متصفح. اقرنه بجهاز توقيع غير متصل — هاتف معزول عن الشبكة يشغّل <a href="https://airgap.it/">AirGap Vault</a> أو محفظة عتاد متوافقة — ولن يلمس المفتاح أبداً جهازاً متصلاً بالإنترنت. تعبر الأوامر والسحوبات هذه الفجوة على شكل رموز QR: طلب غير موقَّع يخرج، وتوقيع يعود. لا ترى المنصة سوى توقيع، ولا شيء آخر.',
    'controls.c1_qr':'طلب غير موقَّع ← QR ← توقيع عائد',
    'controls.c2_h3':'سكربت النسخ الاحتياطي، منذ التسجيل',
    'controls.c2_p':'يُعرَض عليك سكربت الاسترداد لحظة إنشاء حسابك — لا مدفون في مقالة دعم، ولا متاحاً فقط عند الطلب. احفظه. بهذا السكربت ومفتاحك يمكنك إعادة بناء فرع القفل الزمني وإنفاقه بنفسك، من أي محفظة تفهم سكربت البيتكوين، حتى لو اختفت المنصة ومات هذا النطاق.',
    'controls.c3_h3':'صحة العقد، على الشاشة',
    'controls.c3_p':'بعد تسجيل الدخول، ترى الحالة الحية لمجموعة العقد التي تحمل التوقيع الآخر — من يعمل منها، وهل النصاب سليم. إذا كانت البنية الخلفية تتدهور، ستعرف ذلك من الواجهة، لا من صفحة حالة كُتبت بعد وقوع الحدث. أي منصة تُخفي صحتها الخاصة تخبرك بشيء ما بالفعل.',
    'timelock.gut_b':'القوة القاهرة','timelock.gut_d':'المخرج الذي لا يحتاج إلينا','timelock.h2':'لنفترض أننا داهمنا الليلة.',
    'timelock.lede':'خوادم مصادَرة، نطاق مسحوب، فريق يتعذر الوصول إليه، مشغّلو عقد اختفوا. تحت منصة وصائية، هذه نهاية القصة وبداية إجراءات الإفلاس. هنا، إنها مجرد فترة انتظار.',
    'timelock.l1':'إيداع','timelock.l2':'تداول حر','timelock.l3':'غير نشط','timelock.l4':'<em>القفل الزمني ← يُدفع لمفتاحك</em>',
    'timelock.small':'يُحدَّد القفل الزمني لكل حساب على حدة ويتجدد أثناء تداولك — لن ينفّذ الدفتر أمراً قد يقربك من الانتهاء، وبعد فترة خمول طويلة سيُطلب منك الانتقال إلى سكربت جديد ومجموعة عقد حالية. هذا الفرع تفرضه توافقية الشبكة، لا نحن. لا نستطيع إيقافه، ولا يستطيع ذلك أيضاً من يستولي على خوادمنا.',
    'timelock.step_deposit':'تصل الأموال إلى عنوان التوقيع المتعدد. تبدأ العدّادة من هنا — يحصل كل حساب على قفل زمني جديد لحظة تمويله.',
    'timelock.step_trade':'كل صفقة تُنفّذها تجدّد القفل الزمني. طالما أنك تتداول بنشاط، لن تقترب منه أبداً.',
    'timelock.step_inactive':'لا تداول، لا تجديد. هذه هي المرحلة الوحيدة التي يتحرك فيها العد التنازلي فعلياً نحو الصفر.',
    'timelock.step_locktime':'يُفعَّل OP_CHECKLOCKTIMEVERIFY في موعده المحدد. يدفع العنوان لمفتاحك وحده — من دون الحاجة لإذن، من دون أن تطلب من أحد، ولا شيء يمكننا إيقافه.',
    'timelock.viz_hint':'اضغط على خطوة للإيقاف المؤقت والمعاينة',
    'fees.gut_b':'الرسوم','fees.gut_d':'كل الرسوم، من دون استثناء','fees.h2':'ثلاثة أرقام. لا يوجد رقم رابع.',
    'fees.f1_l':'لكل صفقة مكتملة','fees.f2_l':'التحويل بين الحسابات','fees.f3_l':'السحب إلى محفظتك الخاصة',
    'fees.p':'تدفع الرسوم لمشغّلي العقد الذين يحملون النصف الآخر من التوقيع. لا يوجد عملة NightTrader، ولا تعدين مسبق، ولا خزينة تقتطع حصة من صفقتك، ولا عائد موعود لأي أحد. أُطلقت المنصة عمداً من دون إصدار عملتها الخاصة.',
    'fees.th1':'رسوم الآخذ (taker)، للمقارنة','fees.row_nt':'0.125% — أنت تملك مفتاحاً','fees.row_uniswap':'0.30% + غاز + انزلاق سعري','fees.row_coinbase':'حتى 0.40% — وصائية','fees.row_kraken':'0.20% — وصائية','fees.row_binance':'0.10% — وصائية',
    'fees.small':'إدراج عملة يتحمّل تكلفته المشروع، لا المتداولون. يُسعَّر التكامل وتدقيق العقد الذكي لكل مشروع على حدة. لا شيء في هذه الصفحة وعدٌ بعائد أو سيولة أو جودة تنفيذ.',
    'verify.gut_b':'تحقّق','verify.gut_d':'لا تثق، تحقّق','verify.h2':'كل ما ورد أعلاه قابل للتحقق. اذهب وتحقّق منه.',
    'verify.p':'صفحة الهبوط تسويق. السكربت ليس كذلك. إن تعارض أي سطر هنا مع الكود، فالكود هو الصحيح ولدينا خلل يجب إصلاحه — أخبرنا به.',
    'verify.li_source_k':'الكود المصدري','verify.li_source_v':'<a href="https://github.com/NightTrader/nighttrader.github.io">github.com/NightTrader</a> — الواجهة الأمامية ومنطق التوقيع. اقرأ آلية اشتقاق المفتاح قبل أن تودع.',
    'verify.li_local_k':'شغّله محلياً','verify.li_local_v':'استنسخ المستودع وشغّله بنفسك. لا حزم يجب تثبيتها، ولا حاجة لزيارة هذا النطاق للتداول.',
    'verify.li_paper_k':'الورقة البيضاء','verify.li_paper_v':'<a href="https://github.com/NightTrader/nighttrader.github.io/blob/master/Nighttrader_A_Decentralized_Multisignature_Electronic_Cash_Wallet.pdf">A Decentralized Multisignature Electronic Cash Wallet</a> — البنية الكاملة، بما فيها حالتا Monero وEVM.',
    'verify.li_script_k':'سكربتك','verify.li_script_v':'يُشتق بشكل حتمي، وتُحرَق أي تغييرات جوهرية على السلسلة. يجب أن تكون قادراً على إعادة بناء سكربت الاسترداد الخاص بك من دون أن تطلبه منا.',
    'verify.li_data_k':'البيانات','verify.li_data_v':'نجمع الحد الأدنى اللازم للتشغيل ونشفّر ما نحتفظ به. هذه الصفحة لا تحمّل أي خطوط، ولا أدوات تحليل، ولا سكربتات من جهات خارجية — تحقّق من تبويب الشبكة بنفسك.',
    'privacy.label':'الخصوصية',
    'privacy.p1':'نجمع الحد الأدنى اللازم لتشغيل دفتر أوامر ونشفّر ما نحتفظ به. لا بكسل إعلاني، ولا إعادة تشغيل جلسات، ولا ملف تعريف سلوكي، ولا علاقة مع أي سمسار بيانات. هذه الصفحة لا تُجري أي طلب لجهة خارجية — لا خطوط، لا أدوات تحليل، لا CDN. افتح تبويب الشبكة وتحقّق بنفسك بدلاً من تصديقنا.',
    'privacy.p2':'إذا اضطُررنا يوماً للتحقق من هوية مستخدم، تمر تلك العملية عبر <a href="https://www.zk.me/">zkMe</a>. تجري مراجعة المستندات على جهازك الخاص — لا يُرسَل إلينا شيء بصيغة واضحة. ما نستلمه هو إثبات معرفة صفرية بأنك اجتزت التحقق، لا المستندات نفسها. لا ترى NightTrader أو تخزّن بيانات هويتك أبداً؛ يقتصر دور zkMe على ذلك التحقق وتوليد الإثبات.',
    'privacy.p3':'ولاحظ ما لا يستطيع التحقق فعله هنا: الحساب الخاضع للمراجعة لا يزال يملك فرع القفل الزمني. تجميد حساب لا يجمّد عملاتك، لأن السكربت سيدفعها لك مهما قررنا.',
    'node.label':'شغّل عقدة','node.p':'يحمل مشغّلو العقد النصف الآخر من كل توقيع ويحصلون على حصة من الرسوم. لا يوجد نموذج تسجيل ولا قائمة بريدية. تواصل معنا عبر Bitmessage:',
    'node.copy':'نسخ','node.copy_copied':'تم النسخ','node.copy_select':'تم التحديد',
    'node.f':'إذا كانت هذه القناة غير مريحة بالنسبة لك، فأنت على الأرجح لست المشغّل الذي نبحث عنه.',
    'tradeoffs.gut_b':'المقايضات','tradeoffs.gut_d':'ما هذا ليس عليه','tradeoffs.h2':'الجزء الذي تُخفيه المنصات الأخرى عن صفحتها الرئيسية.',
    'tradeoffs.t1_dt':'هذه ليست حضانة ذاتية','tradeoffs.t1_dd':'إنها حضانة مشتركة بمخرج مقفل زمنياً. تملك أحد المفتاحين المطلوبين، وهذا أفضل بشكل قاطع من رصيد على منصة تداول، وأسوأ بشكل قاطع من عملات في تخزينك البارد الخاص. تداول هنا؛ لا تُخزّن هنا.',
    'tradeoffs.t2_dt':'قد تُصبح العقد غير متصلة','tradeoffs.t2_dd':'إذا انكسر النصاب في منتصف صفقة، فإن المعاملات نصف الموقَّعة ببساطة لا تُبَث أبداً. لن تخسر أصل المبلغ، لكنك قد تخسر تنفيذاً والربح المصاحب له.',
    'tradeoffs.t3_dt':'المتصفح هو سطح الهجوم الحقيقي','tradeoffs.t3_dd':'يُشتق مفتاحك من بيانات اعتمادك. كلمة مرور ضعيفة، أو جهاز مخترَق، أو تسجيل دخول مخادَع (تصيّد) هي الطريقة الواقعية لخسارة عملاتك هنا — لا اختراق خوادمنا. استخدم عبارة مرور طويلة وتحققاً بخطوتين، واحتفظ بنسختك الاحتياطية بعيداً عن الجهاز الذي تتداول منه.',
    'tradeoffs.t4_dt':'قد نطلب منك التحقق من الهوية (KYC)','tradeoffs.t4_dd':'نحتفظ بحق طلب التحقق، ويتم عبر <a href="https://www.zk.me/">zkMe</a>. تُفحَص المستندات على جهازك ولا تصل إلينا أبداً — نستلم إثبات معرفة صفرية باجتيازك، لا بيانات هويتك. لاحظ ما لا يمكن لهذا فعله: تجميد حساب لا يجمّد أموالك إلى الأبد، لأن فرع القفل الزمني لا يزال يُنفَّذ.',
    'tradeoffs.t5_dt':'ليس كل ما هنا بيتكوين','tradeoffs.t5_dd':'البيتكوين هو الزوج الأساسي وهدف التصميم — اختيرت أول عمليات الدمج لأنها تدعم CHECKLOCKTIMEVERIFY. تُدرَج أصول أخرى فقط حيثما يمكن إعادة إنتاج الضمانات ذاتها. إذا تعذّر تأمين عملة بهذه الطريقة، نُفضّل عدم إدراجها.',
    'tradeoffs.t6_dt':'ليست Lightning، وليست rollup','tradeoffs.t6_dd':'إنها أداة مختلفة. شبكة Lightning ممتازة للمدفوعات وغير مناسبة كموطن لدفتر أوامر كبير؛ الـ rollups وعمليات التبادل الذري هي الحل على المدى الطويل، لكنها لا تزال باهظة الثمن أو بطيئة جداً للتداول اليومي. سننتقل إليها عندما تصبح جاهزة.',
    'tradeoffs.cta_back':'العودة إلى السكربت',
    'history.gut_b':'قصتنا','history.gut_d':'منذ عام 2014','history.h2':'بدأت القصة بجهاز صراف آلي على ناصية شارع في تيخوانا.',
    'history.p1':'لم تبدأ bitcoin42 كمنصة تداول. بدأت كمشغّل أجهزة صراف آلي للبيتكوين — إذ وضعنا أجهزة Genesis1 في شوارع تيخوانا بالمكسيك عام 2014، من بين أوائل أجهزة هذا النوع في أي مكان في العالم.',
    'history.p2':'في العام نفسه، بنى الفريق ذاته <a href="https://bithalo.org/">BitHalo</a> — أحد أوائل أنظمة العقود الذكية العاملة فعلياً على البيتكوين، حيث كان يفرض تنفيذ الاتفاقيات بين طرفين عبر ضمان متعدد التوقيع من دون طرف ثالث موثوق، قبل سنوات من أن يجعل Ethereum مصطلح "العقد الذكي" شائعاً. ثم جاء <a href="https://bitbay.market/">BitBay</a> في عام 2015: سوق لامركزي بالكامل مبني حول محفظته الخاصة متعددة التوقيع مع عقود مدمجة، وما زال يعمل حتى اليوم. لم يكن هناك من يأخذ التوقيع المتعدد على البيتكوين بهذه الجدية في ذلك الوقت.',
    'history.p3':'تشغيل الأجهزة لم يكن الهدف قط. كان دفتر الأوامر هو الخطة منذ اليوم الأول: منصة تداول حقيقية لا تحتجز عملاتك أبداً، في وقت كانت فيه كل منصة تفعل ذلك بالضبط. استغرق الأمر أكثر من عقد من بناء أنظمة متعددة التوقيع غير وصائية — ومشاهدة أمين حضانة تلو آخر يفشل خلال تلك الفترة — لبنائها بالشكل الصحيح.',
    'history.tl1':'2014 · أجهزة صراف آلي للبيتكوين، تيخوانا','history.tl_bithalo':'2014 · BitHalo','history.tl_bitbay':'2015 · BitBay','history.tl2':'<em>2025 · انطلاق NightTrader</em>',
    'history.citation':'تغطية من ذلك الوقت: <a href="https://www.coindesk.com/markets/2014/03/28/money-spinners-genesis1-bitcoin-and-dogecoin-atms-arrive-in-tijuana-mexico">CoinDesk، مارس 2014</a> — وصول أجهزة صراف آلي من طراز Genesis1 للبيتكوين والدوجكوين إلى تيخوانا. <a href="https://www.coindesk.com/markets/2014/08/08/bithalo-smart-contracts-without-the-block-chain-bloat">CoinDesk، أغسطس 2014</a> — إطلاق BitHalo لعقود ذكية من دون تضخيم البلوكتشين. <a href="https://bitcoinist.com/bitbay-decentralized-marketplace-and-the-internet-of-things/">Bitcoinist، نوفمبر 2016</a> — شرح سوق BitBay اللامركزي. وبعد أحد عشر عاماً: <a href="https://www.globenewswire.com/news-release/2025/09/08/3145992/0/en/bitcoin-s-first-true-high-speed-dex-nighttrader-launches.html">GlobeNewswire، سبتمبر 2025</a> — انطلاق NightTrader، أول منصة تداول لامركزية عالية السرعة حقاً للبيتكوين.',
    'footer.col_exchange':'المنصة','footer.link_trade':'تداول','footer.link_list':'أدرج عملة',
    'footer.col_legal':'قانوني','footer.link_risk':'الإفصاح عن المخاطر',
    'footer.link_whitepaper':'الورقة البيضاء','footer.link_airgapped':'التوقيع المعزول عن الشبكة','footer.link_tradeoffs':'المقايضات المعروفة',
    'footer.imp_h4':'إشعار قانوني · المشغّل','footer.imp_email_label':'البريد الإلكتروني:',
    'footer.legal_p1':'NightTrader.Exchange هي واجهة تداول غير وصائية. ليست بنكاً، ولا وسيطاً، ولا أمين حفظ، ولا خدمة استثمارية، ولا شيء هنا يُعد نصيحة استثمارية أو وعداً بعائد أو سيولة أو تنفيذ. قد يؤدي تداول الأصول الرقمية إلى خسارة كاملة. أنت المسؤول عن مفتاحك ونسخك الاحتياطية.',
    'footer.legal_p2':'تُقدَّم الخدمة من bitcoin42.com — مسجَّلة منذ 2014 · هذه الصفحة لا تُجري أي طلبات لجهات خارجية.',
    'footer.lang_label':'اللغة'
  };

  T.fr = {
    'nav.custody':'Garde','nav.how':'Comment ça règle','nav.controls':'Contrôle','nav.timelock':'Timelock',
    'nav.fees':'Frais','nav.privacy':'Confidentialité','nav.tradeoffs':'Compromis','nav.history':'Histoire','nav.open':'Ouvrir l\'exchange',
    'theme.to_dark':'Sombre','theme.to_light':'Clair',
    'hero.kicker':'Natif Bitcoin · Non custodial · Carnet d\'ordres complet achat/vente',
    'hero.h1':'Pas tes clés,<br>pas tes pièces.<br><span class="thin">Alors on t\'a donné une clé.</span>',
    'hero.answer':'Chaque compte NightTrader est une adresse multisignature 2-de-2 ou 3-de-3.<br>\n    Une clé est la tienne, générée dans ton navigateur. L\'exchange ne peut rien dépenser sans elle.',
    'hero.lede':'Un vrai carnet d\'ordres — ordres d\'achat limités, ordres de vente limités, spreads serrés — sans portefeuille omnibus qui retient tout ton capital. Pas de BTC wrapped. Pas de solde façon reconnaissance de dette dans la base de données de quelqu\'un d\'autre. Pas de sortie vers une arnaque.',
    'hero.cta_open':'Ouvrir l\'exchange','hero.cta_paper':'Lire le whitepaper','hero.cta_source':'Voir le code source',
    'hero.cta_note':'Non custodial · Pas de mur d\'inscription pour consulter le carnet · Retire quand tu veux',
    'script.head_left':'Script de rachat P2SH · ton compte','script.head_right':'Touche un terme surligné',
    'script.tag_yourkey':'Ta clé',
    'script.note_yourkey':'Dérivée dans ton navigateur à partir de tes identifiants et jamais transmise. Rien ne sort de l\'adresse sans une signature de cette clé — ni une transaction, ni un retrait, ni un ticket de support.',
    'script.tag_nodekey':'La clé des nœuds',
    'script.note_nodekey':'Une signature à seuil (threshold) détenue collectivement par l\'ensemble des nœuds. Aucun opérateur seul ne peut la reconstruire ; une supermajorité doit être d\'accord pour que la seconde signature existe.',
    'script.tag_exit':'Sortie de force majeure',
    'script.note_exit':'OP_CHECKLOCKTIMEVERIFY. Si les nœuds disparaissent, sont saisis, ou cessent simplement de répondre, cette branche s\'active selon le calendrier prévu et verse l\'adresse à ta seule clé. Sans permission, sans file d\'attente support, sans frais de récupération.',
    'script.hint':'Les transactions n\'autorisent qu\'un seul montant via SIGHASH_SINGLE. Place une offre de 0,2 BTC sur un solde de 10 BTC, et 0,2 BTC est tout ce que tu as signé.',
    'custody.gut_b':'Garde','custody.gut_d':'Qui peut le déplacer',
    'custody.h2':'Quatre façons de trader du bitcoin. Une seule laisse la clé entre tes mains tout en te donnant un carnet d\'ordres.',
    'custody.lede':'Bisq et RoboSats sont des plateformes honnêtes et non custodiales, et nous le disons ouvertement. Le compromis qu\'elles font porte sur le coût et la vitesse : chaque transaction est un événement on-chain, et il est difficile de construire une profondeur continue sur cette base. Nous avons fait un compromis différent.',
    'custody.th_nighttrader':'NightTrader','custody.th_cex':'CEX custodiale','custody.th_wrapped':'BTC wrapped sur un DEX','custody.th_atomic':'DEX à échange atomique',
    'custody.row1_th':'Qui peut déplacer tes pièces','custody.row1_us':'Toi + quorum de nœuds, par transaction','custody.row1_cex':'L\'exchange, unilatéralement','custody.row1_wrapped':'Le dépositaire du pont','custody.row1_atomic':'Toi',
    'custody.row2_th':'Ce que tu détiens','custody.row2_us':'Une clé dans un UTXO multisignature','custody.row2_cex':'Une ligne dans une base de données','custody.row2_wrapped':'Une créance-jeton sur la réserve de quelqu\'un d\'autre','custody.row2_atomic':'Une clé',
    'custody.row3_th':'Si la plateforme disparaît','custody.row3_us':'Le timelock te rend tes pièces','custody.row3_cex':'Une créance en faillite','custody.row3_wrapped':'Ça dépend du dépositaire','custody.row3_atomic':'Tu gardes tes pièces',
    'custody.row4_th':'Carnet d\'ordres','custody.row4_us':'Complet, achat/vente, appariement hors chaîne','custody.row4_cex':'Complet, achat/vente','custody.row4_wrapped':'Pool AMM, pas d\'ordres','custody.row4_atomic':'Peu profond, lent à remplir',
    'custody.row5_th':'Coût on-chain par transaction','custody.row5_us':'Aucun — le règlement est groupé','custody.row5_cex':'Aucun','custody.row5_wrapped':'Du gas à chaque échange','custody.row5_atomic':'Plusieurs transactions on-chain',
    'custody.row6_th':'Exposition pendant le trading','custody.row6_us':'Seulement le montant que tu as signé','custody.row6_cex':'Tout ton solde','custody.row6_wrapped':'Tout ton solde wrapped','custody.row6_atomic':'Le montant de la transaction',
    'custody.small':'L\'appariement hors chaîne signifie que le carnet évolue à la vitesse d\'un exchange ; la chaîne ne voit que le règlement. C\'est là toute l\'astuce, et elle repose entièrement sur des primitives de script que Bitcoin possède depuis 2009.',
    'custody.viz_label_cex':'Exchange custodial','custody.viz_caption_cex':'Les pièces sont dans un seul portefeuille. La garde — et le contrôle — leur appartient.',
    'custody.viz_note_cex':'Un exchange custodial regroupe les pièces de tous les utilisateurs dans des portefeuilles qu\'il contrôle seul. Il peut les geler, les perdre ou les vider — rien dans le protocole ne l\'en empêche.',
    'custody.viz_label_nt':'NightTrader','custody.viz_caption_nt':'Ta clé ne quitte jamais ton appareil. Seul le montant signé part.',
    'custody.viz_note_nt':'Ta clé est générée dans ton navigateur et ne quitte jamais ton appareil. Chaque transaction autorise un seul montant signé et plafonné — jamais tout ton solde, jamais de garde.',
    'custody.viz_hint':'Touche un côté pour mettre en pause et inspecter',
    'how.gut_b':'Règlement','how.gut_d':'Dans l\'ordre','how.h2':'Ce qui se passe réellement quand tu passes un ordre',
    'how.s1_h3':'Ta clé est générée côté client',
    'how.s1_p':'Ton navigateur dérive la clé localement, ou tu la gardes sur un signataire air-gapped sans jamais l\'exposer. Elle signe ton adresse de dépôt conjointement avec la clé à seuil des nœuds. Le serveur ne la reçoit jamais, donc il n\'y a rien à violer ni rien à livrer.',
    'how.s2_h3':'Tu signes un montant, pas ton solde',
    'how.s2_p':'Une offre est un hash de signature qui autorise une entrée spécifique pour un montant spécifique — le mécanisme d\'autorisation d\'origine de Bitcoin. Ta sortie de monnaie rendue reste sous ton contrôle. Les nœuds ne peuvent acheminer que le montant que tu as signé.',
    'how.s3_h3':'Le quorum contresigne et l\'ordre s\'exécute',
    'how.s3_p':'L\'appariement se fait hors chaîne contre un carnet d\'ordres en direct. Le règlement part par lots vers la chaîne. Aucun nœud seul ne peut produire la seconde signature ; un seuil de nœuds doit être d\'accord.',
    'how.s4_h3':'Le timelock est toujours derrière toi',
    'how.s4_p':'Chaque monnaie applicable utilise CHECKLOCKTIMEVERIFY. Il se renouvelle tant que tu trades, et tu ne t\'en approches jamais. Si tu arrêtes de trader, il finit par te payer de toute façon.',
    'how.flow_key':'La clé reste chez toi','how.flow_amount':'Tu ne signes que le montant','how.flow_cosign':'Les nœuds contresignent','how.flow_settle':'Règlement',
    'controls.gut_b':'Contrôle','controls.gut_d':'Ce que tu détiens et surveilles','controls.h2':'Trois choses que l\'exchange te remet et ne peut pas reprendre.',
    'controls.c1_h3':'Signe depuis un appareil air-gapped',
    'controls.c1_p':'Ta clé n\'a pas besoin de vivre dans un onglet de navigateur. Associe-la à un signataire hors ligne — un téléphone air-gapped avec <a href="https://airgap.it/">AirGap Vault</a> ou un portefeuille matériel compatible — et la clé ne touche jamais une machine connectée à internet. Les ordres et les retraits traversent cet écart sous forme de QR codes : une requête non signée sort, une signature revient. L\'exchange ne voit qu\'une signature, rien d\'autre.',
    'controls.c1_qr':'Requête non signée → QR → signature de retour',
    'controls.c2_h3':'Ton script de secours, dès l\'inscription',
    'controls.c2_p':'Le script de rachat t\'est montré à la création de ton compte — pas enterré dans un article de support, pas disponible seulement sur demande. Sauvegarde-le. Avec ce script et ta clé, tu peux reconstruire et dépenser toi-même la branche du timelock, depuis n\'importe quel portefeuille qui parle le script Bitcoin, même si l\'exchange a disparu et que ce domaine est mort.',
    'controls.c3_h3':'Santé des nœuds, à l\'écran',
    'controls.c3_p':'Une fois connecté, tu vois l\'état en temps réel de l\'ensemble des nœuds qui détient l\'autre signature — qui est actif, si le quorum est intact. Si le backend se dégrade, tu le découvres via l\'interface, pas via une page de statut écrite après coup. Une plateforme qui cache sa propre santé te dit déjà quelque chose.',
    'timelock.gut_b':'Force majeure','timelock.gut_d':'La sortie qui n\'a pas besoin de nous','timelock.h2':'Suppose qu\'on se fasse perquisitionner ce soir.',
    'timelock.lede':'Serveurs saisis, domaine retiré, équipe injoignable, opérateurs de nœuds disparus. Sous un exchange custodial, c\'est la fin de l\'histoire et le début d\'une procédure de faillite. Ici, ce n\'est qu\'une période d\'attente.',
    'timelock.l1':'Dépôt','timelock.l2':'Trading libre','timelock.l3':'Inactif','timelock.l4':'<em>Timelock → versé à ta clé</em>',
    'timelock.small':'Le timelock est fixé par compte et renouvelé au fil de tes transactions — le carnet n\'exécutera pas un ordre qui te rapprocherait de l\'échéance, et après une longue inactivité on te demandera de migrer vers un nouveau script et un ensemble de nœuds à jour. La branche est appliquée par le consensus, pas par nous. Nous ne pouvons pas la désactiver, et quiconque prendrait nos serveurs non plus.',
    'timelock.step_deposit':'Les pièces arrivent sur l\'adresse multisignature. Le compte à rebours démarre ici — chaque compte reçoit un timelock neuf dès qu\'il est approvisionné.',
    'timelock.step_trade':'Chaque transaction que tu effectues renouvelle le timelock. Tant que tu trades activement, tu ne t\'en approches jamais.',
    'timelock.step_inactive':'Pas de transactions, pas de renouvellement. C\'est la seule phase où le compte à rebours avance réellement vers zéro.',
    'timelock.step_locktime':'OP_CHECKLOCKTIMEVERIFY se déclenche comme prévu. L\'adresse paie uniquement ta clé — sans permission nécessaire, sans personne à qui demander, rien que nous puissions arrêter.',
    'timelock.viz_hint':'Touche une étape pour mettre en pause et inspecter',
    'fees.gut_b':'Frais','fees.gut_d':'Tous, sans exception','fees.h2':'Trois chiffres. Il n\'y en a pas de quatrième.',
    'fees.f1_l':'Par transaction complétée','fees.f2_l':'Transfert entre comptes','fees.f3_l':'Retrait vers ton propre portefeuille',
    'fees.p':'Les frais rémunèrent les opérateurs de nœuds qui détiennent l\'autre moitié de la signature. Il n\'existe pas de jeton NightTrader, pas de pré-minage, pas de trésorerie qui prélève une part de ta transaction, et aucun rendement n\'est promis à qui que ce soit. L\'exchange a été lancé volontairement sans émettre sa propre monnaie.',
    'fees.th1':'Frais taker, à titre de comparaison','fees.row_nt':'0,125 % — tu détiens une clé','fees.row_uniswap':'0,30 % + gas + slippage','fees.row_coinbase':'jusqu\'à 0,40 % — custodial','fees.row_kraken':'0,20 % — custodial','fees.row_binance':'0,10 % — custodial',
    'fees.small':'Lister une monnaie a un coût pour le projet, pas pour les traders. L\'intégration et l\'audit de contrat sont chiffrés par projet. Rien sur cette page n\'est une promesse de rendement, de liquidité ou de qualité d\'exécution.',
    'verify.gut_b':'Vérifie','verify.gut_d':'Ne fais pas confiance','verify.h2':'Chaque affirmation ci-dessus est vérifiable. Va la vérifier.',
    'verify.p':'Une landing page, c\'est du marketing. Le code, non. Si une ligne ici contredit le code, c\'est le code qui a raison et nous avons un bug à corriger — dis-le nous.',
    'verify.li_source_k':'Code source','verify.li_source_v':'<a href="https://github.com/NightTrader/nighttrader.github.io">github.com/NightTrader</a> — frontend et logique de signature. Lis la dérivation des clés avant de déposer.',
    'verify.li_local_k':'Fais-le tourner en local','verify.li_local_v':'Clone le dépôt et héberge-le toi-même. Aucun paquet à installer, aucun besoin de visiter ce domaine pour trader.',
    'verify.li_paper_k':'Whitepaper','verify.li_paper_v':'<a href="https://github.com/NightTrader/nighttrader.github.io/blob/master/Nighttrader_A_Decentralized_Multisignature_Electronic_Cash_Wallet.pdf">A Decentralized Multisignature Electronic Cash Wallet</a> — la construction complète, y compris les cas Monero et EVM.',
    'verify.li_script_k':'Ton script','verify.li_script_v':'Dérivé de façon déterministe, et les changements substantiels sont gravés on-chain. Tu devrais pouvoir reconstruire ton propre script de rachat sans avoir à nous le demander.',
    'verify.li_data_k':'Données','verify.li_data_v':'Nous collectons le minimum nécessaire pour fonctionner et chiffrons ce que nous conservons. Cette page ne charge ni polices, ni analytics, ni scripts tiers — vérifie l\'onglet réseau.',
    'privacy.label':'Confidentialité',
    'privacy.p1':'Nous collectons le minimum nécessaire pour faire tourner un carnet d\'ordres et chiffrons ce que nous conservons. Aucun pixel publicitaire, aucun replay de session, aucun profil comportemental, aucune relation avec un courtier en données. Cette page ne fait aucune requête tierce — ni polices, ni analytics, ni CDN. Ouvre l\'onglet réseau et vérifie-le, plutôt que de nous croire sur parole.',
    'privacy.p2':'Si nous sommes un jour contraints de vérifier un utilisateur, ce processus passe par <a href="https://www.zk.me/">zkMe</a>. Les vérifications de documents se font sur ton propre appareil — rien ne nous est transmis en clair. Ce que nous recevons est une preuve à divulgation nulle de connaissance attestant que tu as réussi la vérification, pas les documents eux-mêmes. NightTrader ne voit ni ne stocke jamais tes données d\'identité ; le rôle de zkMe se limite à cette vérification et à la génération de la preuve.',
    'privacy.p3':'Et note ce que la vérification ne peut pas faire ici : un compte en cours de revue conserve quand même une branche timelock. Geler un compte ne gèle pas tes pièces, car le script te les verse de toute façon, quelle que soit notre décision.',
    'node.label':'Fais tourner un nœud','node.p':'Les opérateurs de nœuds détiennent l\'autre moitié de chaque signature et touchent une part des frais. Il n\'y a ni formulaire d\'inscription ni liste de diffusion. Contacte-nous via Bitmessage :',
    'node.copy':'Copier','node.copy_copied':'Copié','node.copy_select':'Sélectionné',
    'node.f':'Si ce canal ne te convient pas, tu n\'es probablement pas l\'opérateur que nous recherchons.',
    'tradeoffs.gut_b':'Compromis','tradeoffs.gut_d':'Ce que ce n\'est pas','tradeoffs.h2':'La partie que les autres exchanges laissent hors de leur page d\'accueil.',
    'tradeoffs.t1_dt':'Ce n\'est pas de l\'auto-garde','tradeoffs.t1_dd':'C\'est de la co-garde avec une sortie par timelock. Tu détiens l\'une des deux clés requises, ce qui est strictement mieux qu\'un solde sur un exchange et strictement moins bien que des pièces dans ton propre stockage à froid. Trade ici ; ne stocke pas ici.',
    'tradeoffs.t2_dt':'Les nœuds peuvent tomber hors ligne','tradeoffs.t2_dd':'Si le quorum se brise en cours de transaction, les transactions à moitié signées ne sont tout simplement jamais diffusées. Tu ne perds pas le capital, mais tu peux perdre une exécution et le profit qui allait avec.',
    'tradeoffs.t3_dt':'Le navigateur est la surface d\'attaque','tradeoffs.t3_dd':'Ta clé est dérivée de tes identifiants. Un mot de passe faible, une machine compromise ou une connexion piégée par phishing, voilà la façon réaliste de perdre des pièces ici — pas un piratage de nos serveurs. Utilise une phrase secrète longue et la 2FA, et garde ta sauvegarde loin de la machine sur laquelle tu trades.',
    'tradeoffs.t4_dt':'On peut te demander un KYC','tradeoffs.t4_dd':'Nous nous réservons le droit de demander une vérification, effectuée via <a href="https://www.zk.me/">zkMe</a>. Les documents sont vérifiés sur ton appareil et ne nous parviennent jamais — nous recevons une preuve à divulgation nulle de connaissance de la réussite, pas tes données d\'identité. Note ce que cela ne peut pas faire : geler un compte ne gèle pas tes fonds pour toujours, car la branche timelock s\'exécute quand même.',
    'tradeoffs.t5_dt':'Tout ici n\'est pas du bitcoin','tradeoffs.t5_dd':'Bitcoin est la paire de base et l\'objectif de conception — les premières intégrations ont été choisies pour leur support de CHECKLOCKTIMEVERIFY. D\'autres actifs ne sont listés que là où les mêmes garanties peuvent être reproduites. Si une monnaie ne peut pas être sécurisée de cette façon, nous préférons ne pas la lister.',
    'tradeoffs.t6_dt':'Ni Lightning, ni un rollup','tradeoffs.t6_dd':'C\'est un outil différent. Lightning est excellent pour les paiements et malcommode comme hôte d\'un grand carnet d\'ordres ; les rollups et les échanges atomiques sont la réponse à long terme et restent encore trop coûteux ou trop lents pour du trading quotidien. Nous migrerons quand ils seront prêts.',
    'tradeoffs.cta_back':'Retour au script',
    'history.gut_b':'Histoire','history.gut_d':'Depuis 2014','history.h2':'Tout a commencé avec un distributeur au coin d\'une rue à Tijuana.',
    'history.p1':'bitcoin42 n\'a pas commencé comme un exchange. Ça a commencé comme opérateur de distributeurs automatiques de bitcoin — en installant des machines Genesis1 dans les rues de Tijuana, au Mexique, en 2014, parmi les premières de leur genre au monde.',
    'history.p2':'Cette même année, la même équipe a construit <a href="https://bithalo.org/">BitHalo</a> — l\'un des premiers systèmes de contrats intelligents réellement fonctionnels sur Bitcoin, faisant respecter des accords entre deux parties via un séquestre multisignature sans tiers de confiance, des années avant qu\'Ethereum ne fasse du « smart contract » une expression courante. <a href="https://bitbay.market/">BitBay</a> a suivi en 2015 : une place de marché entièrement décentralisée construite autour de son propre portefeuille multisignature avec des contrats intégrés, toujours en service aujourd\'hui. À l\'époque, personne d\'autre ne prenait la multisignature sur Bitcoin aussi au sérieux.',
    'history.p3':'Faire tourner des distributeurs n\'a jamais été le but. Le carnet d\'ordres était le projet dès le premier jour : un vrai exchange qui ne prendrait jamais tes pièces en garde, à une époque où tous les exchanges faisaient exactement ça. Il a fallu plus de dix ans de systèmes multisignature non custodiaux — en regardant dépositaire après dépositaire s\'effondrer entre-temps — pour enfin y arriver.',
    'history.tl1':'2014 · Distributeurs bitcoin, Tijuana','history.tl_bithalo':'2014 · BitHalo','history.tl_bitbay':'2015 · BitBay','history.tl2':'<em>2025 · lancement de NightTrader</em>',
    'history.citation':'Couverture de l\'époque : <a href="https://www.coindesk.com/markets/2014/03/28/money-spinners-genesis1-bitcoin-and-dogecoin-atms-arrive-in-tijuana-mexico">CoinDesk, mars 2014</a> — les distributeurs Genesis1 pour bitcoin et dogecoin arrivent à Tijuana. <a href="https://www.coindesk.com/markets/2014/08/08/bithalo-smart-contracts-without-the-block-chain-bloat">CoinDesk, août 2014</a> — BitHalo lance des smart contracts sans alourdir la blockchain. <a href="https://bitcoinist.com/bitbay-decentralized-marketplace-and-the-internet-of-things/">Bitcoinist, novembre 2016</a> — la place de marché décentralisée de BitBay, expliquée. Onze ans plus tard : <a href="https://www.globenewswire.com/news-release/2025/09/08/3145992/0/en/bitcoin-s-first-true-high-speed-dex-nighttrader-launches.html">GlobeNewswire, septembre 2025</a> — lancement de NightTrader, le premier vrai DEX bitcoin à haute vitesse.',
    'footer.col_exchange':'Exchange','footer.link_trade':'Trader','footer.link_list':'Lister une monnaie',
    'footer.col_legal':'Mentions légales','footer.link_risk':'Avertissement sur les risques',
    'footer.link_whitepaper':'Whitepaper','footer.link_airgapped':'Signature air-gapped','footer.link_tradeoffs':'Compromis connus',
    'footer.imp_h4':'Mentions légales · Exploitant','footer.imp_email_label':'E-Mail :',
    'footer.legal_p1':'NightTrader.Exchange est une interface de trading non custodiale. Ce n\'est ni une banque, ni un courtier, ni un dépositaire, ni un service d\'investissement, et rien ici ne constitue un conseil en investissement ni une promesse de rendement, de liquidité ou d\'exécution. Trader des actifs numériques peut entraîner une perte totale. Tu es responsable de ta propre clé et de tes propres sauvegardes.',
    'footer.legal_p2':'Servi depuis bitcoin42.com — enregistré en 2014 · Cette page ne fait aucune requête tierce.',
    'footer.lang_label':'Langue'
  };

  T.de = {
    'nav.custody':'Verwahrung','nav.how':'Wie abgerechnet wird','nav.controls':'Kontrolle','nav.timelock':'Timelock',
    'nav.fees':'Gebühren','nav.privacy':'Datenschutz','nav.tradeoffs':'Kompromisse','nav.history':'Geschichte','nav.open':'Exchange öffnen',
    'theme.to_dark':'Dunkel','theme.to_light':'Hell',
    'hero.kicker':'Bitcoin-nativ · Nicht-custodial · Vollständiges Orderbuch für Kauf/Verkauf',
    'hero.h1':'Nicht deine Keys,<br>nicht deine Coins.<br><span class="thin">Deshalb geben wir dir einen Key.</span>',
    'hero.answer':'Jedes NightTrader-Konto ist eine 2-von-2- oder 3-von-3-Multisig-Adresse.<br>\n    Ein Key gehört dir und wird in deinem Browser erzeugt. Ohne ihn kann die Exchange nichts ausgeben.',
    'hero.lede':'Ein echtes Orderbuch — Limit-Kauf, Limit-Verkauf, enge Spreads — ohne ein Sammel-Wallet, das dein gesamtes Guthaben hält. Kein Wrapped BTC. Kein IOU-Guthaben in der Datenbank eines Fremden. Kein Exit-Scam.',
    'hero.cta_open':'Exchange öffnen','hero.cta_paper':'Whitepaper lesen','hero.cta_source':'Quellcode ansehen',
    'hero.cta_note':'Nicht-custodial · Keine Registrierungsschranke, um das Orderbuch zu sehen · Auszahlung jederzeit',
    'script.head_left':'P2SH-Redeem-Skript · dein Konto','script.head_right':'Tippe auf einen markierten Begriff',
    'script.tag_yourkey':'Dein Key',
    'script.note_yourkey':'Wird in deinem Browser aus deinen Zugangsdaten abgeleitet und nie übertragen. Ohne eine Signatur mit diesem Key bewegt sich nichts aus der Adresse — kein Trade, keine Auszahlung, kein Support-Ticket.',
    'script.tag_nodekey':'Der Node-Key',
    'script.note_nodekey':'Eine Threshold-Signatur, die gemeinsam vom Node-Set gehalten wird. Kein einzelner Betreiber kann sie allein rekonstruieren; eine Supermehrheit muss zustimmen, bevor die zweite Signatur überhaupt existiert.',
    'script.tag_exit':'Force-Majeure-Ausgang',
    'script.note_exit':'OP_CHECKLOCKTIMEVERIFY. Verschwinden die Nodes, werden sie beschlagnahmt oder antworten sie einfach nicht mehr, aktiviert sich dieser Zweig planmäßig und zahlt die Adresse allein an deinen Key aus. Ohne Erlaubnis, ohne Support-Warteschlange, ohne Wiederherstellungsgebühr.',
    'script.hint':'Trades autorisieren per SIGHASH_SINGLE nur einen einzigen Betrag. Bietest du 0,2 BTC aus einem Guthaben von 10 BTC, hast du auch nur diese 0,2 BTC signiert und aufgegeben.',
    'custody.gut_b':'Verwahrung','custody.gut_d':'Wer es bewegen kann',
    'custody.h2':'Vier Wege, mit Bitcoin zu handeln. Nur einer lässt den Key bei dir und liefert trotzdem ein Orderbuch.',
    'custody.lede':'Bisq und RoboSats sind ehrliche, nicht-custodiale Plattformen, und das sagen wir auch so. Ihr Kompromiss sind Kosten und Geschwindigkeit: Jeder Trade ist ein On-Chain-Ereignis, und darauf lässt sich nur schwer durchgehende Tiefe aufbauen. Wir haben einen anderen Kompromiss gewählt.',
    'custody.th_nighttrader':'NightTrader','custody.th_cex':'Custodial-CEX','custody.th_wrapped':'Wrapped BTC auf einer DEX','custody.th_atomic':'Atomic-Swap-DEX',
    'custody.row1_th':'Wer deine Coins bewegen kann','custody.row1_us':'Du + Node-Quorum, pro Trade','custody.row1_cex':'Die Exchange, einseitig','custody.row1_wrapped':'Der Bridge-Verwahrer','custody.row1_atomic':'Du',
    'custody.row2_th':'Was du besitzt','custody.row2_us':'Einen Key in einem Multisig-UTXO','custody.row2_cex':'Eine Zeile in einer Datenbank','custody.row2_wrapped':'Einen Token-Anspruch auf die Reserve eines anderen','custody.row2_atomic':'Einen Key',
    'custody.row3_th':'Wenn die Plattform verschwindet','custody.row3_us':'Der Timelock gibt dir deine Coins zurück','custody.row3_cex':'Eine Forderung im Insolvenzverfahren','custody.row3_wrapped':'Hängt vom Verwahrer ab','custody.row3_atomic':'Du behältst deine Coins',
    'custody.row4_th':'Orderbuch','custody.row4_us':'Vollständig, Kauf/Verkauf, Matching off-chain','custody.row4_cex':'Vollständig, Kauf/Verkauf','custody.row4_wrapped':'AMM-Pool, keine Orders','custody.row4_atomic':'Dünn, füllt sich langsam',
    'custody.row5_th':'On-Chain-Kosten pro Trade','custody.row5_us':'Keine — Abrechnung erfolgt gebündelt','custody.row5_cex':'Keine','custody.row5_wrapped':'Gas bei jedem Swap','custody.row5_atomic':'Mehrere On-Chain-Transaktionen',
    'custody.row6_th':'Risiko während des Handels','custody.row6_us':'Nur der Betrag, den du signiert hast','custody.row6_cex':'Dein gesamtes Guthaben','custody.row6_wrapped':'Dein gesamtes Wrapped-Guthaben','custody.row6_atomic':'Der Trade-Betrag',
    'custody.small':'Off-Chain-Matching bedeutet, dass das Orderbuch mit Exchange-Geschwindigkeit läuft; die Chain sieht nur die Abrechnung. Das ist der ganze Trick, und er basiert vollständig auf Skript-Primitiven, die Bitcoin seit 2009 besitzt.',
    'custody.viz_label_cex':'Custodial Exchange','custody.viz_caption_cex':'Coins liegen in einer einzigen Wallet. Die Verwahrung — und die Kontrolle — liegt bei ihr.',
    'custody.viz_note_cex':'Eine Custodial Exchange sammelt die Coins aller Nutzer in Wallets, die nur sie selbst kontrolliert. Sie kann sie einfrieren, verlieren oder abziehen — nichts im Protokoll verhindert das.',
    'custody.viz_label_nt':'NightTrader','custody.viz_caption_nt':'Dein Key verlässt nie dein Gerät. Es geht nur der signierte Betrag hinaus.',
    'custody.viz_note_nt':'Dein Key wird in deinem Browser erzeugt und verlässt dein Gerät nie. Jeder Trade autorisiert einen einzigen signierten, betragsbegrenzten Vorgang — nie dein gesamtes Guthaben, nie eine Verwahrung.',
    'custody.viz_hint':'Tippe auf eine Seite, um zu pausieren und genauer hinzuschauen',
    'how.gut_b':'Abrechnung','how.gut_d':'Der Reihe nach','how.h2':'Was tatsächlich passiert, wenn du eine Order aufgibst',
    'how.s1_h3':'Dein Key wird clientseitig erzeugt',
    'how.s1_p':'Dein Browser leitet den Key lokal ab, oder du bewahrst ihn auf einem air-gapped Signiergerät auf und legst ihn nie offen. Er signiert deine Einzahlungsadresse gemeinsam mit dem Threshold-Key der Nodes. Der Server erhält ihn nie, also gibt es nichts zu kompromittieren und nichts herauszugeben.',
    'how.s2_h3':'Du signierst einen Betrag, nicht dein Guthaben',
    'how.s2_p':'Ein Gebot ist ein Signatur-Hash, der einen bestimmten Input für eine bestimmte Größe autorisiert — der ursprüngliche Allowance-Mechanismus von Bitcoin. Dein Wechselgeld-Output bleibt unter deiner Kontrolle. Die Nodes können nur den Betrag weiterleiten, den du signiert hast.',
    'how.s3_h3':'Das Quorum gegensigniert, und die Order wird ausgeführt',
    'how.s3_p':'Das Matching läuft off-chain gegen ein Live-Orderbuch. Die Abrechnung geht gebündelt auf die Chain. Keine einzelne Node kann die zweite Signatur allein erzeugen; ein Schwellenwert an Nodes muss zustimmen.',
    'how.s4_h3':'Der Timelock steht immer hinter dir',
    'how.s4_p':'Jede anwendbare Münze nutzt CHECKLOCKTIMEVERIFY. Er wird erneuert, solange du handelst, sodass du ihm nie nahekommst. Hörst du auf zu handeln, zahlt er dich am Ende trotzdem aus.',
    'how.flow_key':'Der Key bleibt bei dir','how.flow_amount':'Nur der Betrag wird signiert','how.flow_cosign':'Nodes signieren mit','how.flow_settle':'Abrechnung',
    'controls.gut_b':'Kontrolle','controls.gut_d':'Was du besitzt und beobachtest','controls.h2':'Drei Dinge, die dir die Exchange übergibt und nicht zurücknehmen kann.',
    'controls.c1_h3':'Signiere von einem air-gapped Gerät',
    'controls.c1_p':'Dein Key muss nicht in einem Browser-Tab leben. Kombiniere ihn mit einem Offline-Signiergerät — einem air-gapped Telefon mit <a href="https://airgap.it/">AirGap Vault</a> oder einer kompatiblen Hardware-Wallet — und der Key berührt nie ein internetverbundenes Gerät. Orders und Auszahlungen überqueren diese Lücke als QR-Codes: eine unsignierte Anfrage geht raus, eine Signatur kommt zurück. Die Exchange sieht nur eine Signatur, sonst nichts.',
    'controls.c1_qr':'Unsignierte Anfrage → QR → Signatur zurück',
    'controls.c2_h3':'Dein Backup-Skript, direkt bei der Registrierung',
    'controls.c2_p':'Das Redeem-Skript wird dir bei der Kontoerstellung gezeigt — nicht in einem Support-Artikel vergraben, nicht nur auf Anfrage verfügbar. Speichere es. Mit diesem Skript und deinem Key kannst du den Timelock-Zweig selbst rekonstruieren und ausgeben, aus jeder Wallet, die Bitcoin-Skript spricht — selbst wenn die Exchange verschwunden und diese Domain tot ist.',
    'controls.c3_h3':'Node-Gesundheit, auf dem Bildschirm',
    'controls.c3_p':'Eingeloggt siehst du den Live-Zustand des Node-Sets, das die andere Signatur hält — wer online ist, ob das Quorum intakt ist. Verschlechtert sich das Backend, erfährst du es über die Oberfläche, nicht über eine nachträglich verfasste Statusseite. Eine Plattform, die ihre eigene Gesundheit versteckt, sagt dir damit bereits etwas.',
    'timelock.gut_b':'Höhere Gewalt','timelock.gut_d':'Der Ausgang, für den wir nicht gebraucht werden','timelock.h2':'Angenommen, wir werden heute Nacht durchsucht.',
    'timelock.lede':'Server beschlagnahmt, Domain abgeschaltet, Team nicht erreichbar, Node-Betreiber verschwunden. Bei einer custodial Exchange ist das das Ende der Geschichte und der Anfang eines Insolvenzverfahrens. Hier ist es nur eine Wartezeit.',
    'timelock.l1':'Einzahlung','timelock.l2':'Frei handeln','timelock.l3':'Inaktiv','timelock.l4':'<em>Timelock → Auszahlung an deinen Key</em>',
    'timelock.small':'Der Timelock wird pro Konto festgelegt und mit jedem Trade erneuert — das Orderbuch führt keine Order aus, die dich nahe an den Ablauf bringen würde, und nach langer Inaktivität wirst du gebeten, auf ein neues Skript und ein aktuelles Node-Set umzusteigen. Der Zweig wird durch Konsens erzwungen, nicht durch uns. Wir können ihn nicht abschalten, und wer sich unserer Server bemächtigt, kann das ebenfalls nicht.',
    'timelock.step_deposit':'Die Coins treffen an der Multisig-Adresse ein. Die Uhr beginnt hier zu laufen — jedes Konto erhält in dem Moment, in dem es finanziert wird, einen frischen Timelock.',
    'timelock.step_trade':'Jeder Trade, den du abschließt, erneuert den Timelock. Solange du aktiv handelst, kommst du ihm nie nahe.',
    'timelock.step_inactive':'Keine Trades, keine Erneuerung. Das ist die einzige Phase, in der der Countdown tatsächlich Richtung null läuft.',
    'timelock.step_locktime':'OP_CHECKLOCKTIMEVERIFY löst planmäßig aus. Die Adresse zahlt ausschließlich an deinen Key aus — ohne dass jemand das erlauben muss, ohne dass du jemanden fragen musst, und ohne dass wir es aufhalten könnten.',
    'timelock.viz_hint':'Tippe auf einen Schritt, um zu pausieren und genauer hinzuschauen',
    'fees.gut_b':'Gebühren','fees.gut_d':'Alle, ausnahmslos','fees.h2':'Drei Zahlen. Eine vierte gibt es nicht.',
    'fees.f1_l':'Pro abgeschlossenem Trade','fees.f2_l':'Übertragung zwischen Konten','fees.f3_l':'Auszahlung an deine eigene Wallet',
    'fees.p':'Die Gebühren bezahlen die Node-Betreiber, die die andere Hälfte der Signatur halten. Es gibt keinen NightTrader-Token, kein Pre-Mine, keine Treasury, die einen Anteil an deinem Trade einbehält, und niemandem wird eine Rendite versprochen. Die Exchange wurde absichtlich ohne eigenen Coin gestartet.',
    'fees.th1':'Taker-Gebühr, zum Vergleich','fees.row_nt':'0,125 % — du hältst einen Key','fees.row_uniswap':'0,30 % + Gas + Slippage','fees.row_coinbase':'bis zu 0,40 % — custodial','fees.row_kraken':'0,20 % — custodial','fees.row_binance':'0,10 % — custodial',
    'fees.small':'Ein Coin-Listing kostet das Projekt, nicht die Trader. Integration und Contract-Audit werden pro Projekt angeboten. Nichts auf dieser Seite ist ein Versprechen auf Rendite, Liquidität oder Ausführungsqualität.',
    'verify.gut_b':'Verifizieren','verify.gut_d':'Vertrau nicht darauf','verify.h2':'Jede Behauptung oben ist überprüfbar. Geh sie überprüfen.',
    'verify.p':'Eine Landingpage ist Marketing. Code ist es nicht. Widerspricht eine Zeile hier dem Code, hat der Code recht, und wir haben einen Bug zu beheben — sag es uns.',
    'verify.li_source_k':'Quellcode','verify.li_source_v':'<a href="https://github.com/NightTrader/nighttrader.github.io">github.com/NightTrader</a> — Frontend und Signierlogik. Lies die Key-Ableitung, bevor du einzahlst.',
    'verify.li_local_k':'Lokal ausführen','verify.li_local_v':'Klone das Repository und betreibe es selbst. Keine Pakete zu installieren, kein Besuch dieser Domain nötig, um zu handeln.',
    'verify.li_paper_k':'Whitepaper','verify.li_paper_v':'<a href="https://github.com/NightTrader/nighttrader.github.io/blob/master/Nighttrader_A_Decentralized_Multisignature_Electronic_Cash_Wallet.pdf">A Decentralized Multisignature Electronic Cash Wallet</a> — die vollständige Konstruktion, einschließlich der Monero- und EVM-Fälle.',
    'verify.li_script_k':'Dein Skript','verify.li_script_v':'Deterministisch abgeleitet, wesentliche Änderungen werden on-chain verewigt. Du solltest dein eigenes Redeem-Skript rekonstruieren können, ohne uns danach zu fragen.',
    'verify.li_data_k':'Daten','verify.li_data_v':'Wir sammeln das Minimum, das für den Betrieb nötig ist, und verschlüsseln, was wir speichern. Diese Seite lädt keine Schriftarten, keine Analytics und keine Skripte von Drittanbietern — prüfe den Netzwerk-Tab.',
    'privacy.label':'Datenschutz',
    'privacy.p1':'Wir sammeln das Minimum, das für den Betrieb eines Orderbuchs nötig ist, und verschlüsseln, was wir speichern. Es gibt kein Werbe-Pixel, kein Session-Replay, kein Verhaltensprofil und keine Beziehung zu Datenhändlern. Diese Seite stellt null Anfragen an Dritte — keine Schriftarten, keine Analytics, kein CDN. Öffne den Netzwerk-Tab und prüfe es selbst, statt uns zu glauben.',
    'privacy.p2':'Sollten wir jemals gezwungen sein, einen Nutzer zu verifizieren, läuft dieser Prozess über <a href="https://www.zk.me/">zkMe</a>. Dokumentenprüfungen finden auf deinem eigenen Gerät statt — nichts wird uns im Klartext übermittelt. Was wir erhalten, ist ein Zero-Knowledge-Beweis, dass du die Verifizierung bestanden hast, nicht die zugrunde liegenden Dokumente. NightTrader sieht oder speichert deine Identitätsdaten selbst nie; die Rolle von zkMe beschränkt sich auf diese Verifizierung und die Erstellung des Beweises.',
    'privacy.p3':'Und beachte, was Verifizierung hier nicht kann: Ein Konto in Prüfung hat weiterhin einen Timelock-Zweig. Ein Konto einzufrieren friert nicht deine Coins ein, denn das Skript zahlt sie dir so oder so aus, egal was wir entscheiden.',
    'node.label':'Betreibe eine Node','node.p':'Node-Betreiber halten die andere Hälfte jeder Signatur und erhalten einen Anteil der Gebühren. Es gibt kein Anmeldeformular und keine E-Mail-Liste. Erreiche uns über Bitmessage:',
    'node.copy':'Kopieren','node.copy_copied':'Kopiert','node.copy_select':'Ausgewählt',
    'node.f':'Wenn dir dieser Kanal nicht passt, bist du vermutlich nicht der Betreiber, den wir suchen.',
    'tradeoffs.gut_b':'Kompromisse','tradeoffs.gut_d':'Was das hier nicht ist','tradeoffs.h2':'Der Teil, den andere Exchanges von ihrer Startseite fernhalten.',
    'tradeoffs.t1_dt':'Das ist keine Selbstverwahrung','tradeoffs.t1_dd':'Es ist Co-Custody mit einem Timelock-Ausgang. Du hältst einen von zwei benötigten Keys — das ist strikt besser als ein Exchange-Guthaben und strikt schlechter als Coins im eigenen Cold Storage. Handle hier; lagere nicht hier.',
    'tradeoffs.t2_dt':'Nodes können offline gehen','tradeoffs.t2_dd':'Bricht das Quorum mitten im Trade zusammen, werden halb signierte Transaktionen einfach nie gesendet. Du verlierst nicht das Kapital, kannst aber eine Ausführung und den damit verbundenen Gewinn verpassen.',
    'tradeoffs.t3_dt':'Der Browser ist die Angriffsfläche','tradeoffs.t3_dd':'Dein Key wird aus deinen Zugangsdaten abgeleitet. Ein schwaches Passwort, ein kompromittiertes Gerät oder ein Phishing-Login ist der realistische Weg, hier Coins zu verlieren — kein Hack unserer Server. Nutze eine lange Passphrase und 2FA, und bewahre dein Backup getrennt von dem Gerät auf, mit dem du handelst.',
    'tradeoffs.t4_dt':'Wir können KYC verlangen','tradeoffs.t4_dd':'Wir behalten uns das Recht vor, eine Verifizierung über <a href="https://www.zk.me/">zkMe</a> zu verlangen. Dokumente werden auf deinem Gerät geprüft und erreichen uns nie — wir erhalten einen Zero-Knowledge-Beweis des Bestehens, nicht deine Identitätsdaten. Beachte, was das nicht kann: Ein Konto einzufrieren friert deine Gelder nicht für immer ein, denn der Timelock-Zweig wird trotzdem ausgeführt.',
    'tradeoffs.t5_dt':'Hier ist nicht alles Bitcoin','tradeoffs.t5_dd':'Bitcoin ist das Basispaar und das Designziel — die ersten Integrationen wurden wegen ihrer CHECKLOCKTIMEVERIFY-Unterstützung ausgewählt. Andere Assets werden nur gelistet, wo dieselben Garantien reproduziert werden können. Lässt sich ein Coin so nicht absichern, listen wir ihn lieber nicht.',
    'tradeoffs.t6_dt':'Kein Lightning, kein Rollup','tradeoffs.t6_dd':'Ein anderes Werkzeug. Lightning ist hervorragend für Zahlungen und unpraktisch als Heimat für ein großes Orderbuch; Rollups und Atomic Swaps sind die langfristige Antwort und derzeit noch zu teuer oder zu langsam für tägliches Bid/Ask. Wir wechseln, sobald sie bereit sind.',
    'tradeoffs.cta_back':'Zurück zum Skript',
    'history.gut_b':'Geschichte','history.gut_d':'Seit 2014','history.h2':'Es begann mit einem Geldautomaten an einer Straßenecke in Tijuana.',
    'history.p1':'bitcoin42 begann nicht als Exchange. Es begann als Betreiber von Bitcoin-Geldautomaten — 2014 stellten wir Genesis1-Automaten auf die Straßen von Tijuana, Mexiko, als eine der ersten Anlagen dieser Art weltweit.',
    'history.p2':'Im selben Jahr baute dasselbe Team <a href="https://bithalo.org/">BitHalo</a> — eines der ersten tatsächlich funktionierenden Smart-Contract-Systeme auf Bitcoin, das Vereinbarungen zwischen zwei Parteien per Multisig-Treuhand durchsetzte, ganz ohne vertrauenswürdige dritte Partei, Jahre bevor Ethereum den Begriff „Smart Contract" zum geläufigen Wort machte. 2015 folgte <a href="https://bitbay.market/">BitBay</a>: ein vollständig dezentraler Marktplatz rund um eine eigene Multisig-Wallet mit eingebauten Contracts, der bis heute läuft. Damals nahm niemand sonst Multisig auf Bitcoin so ernst.',
    'history.p3':'Automaten zu betreiben war nie das eigentliche Ziel. Das Orderbuch war der Plan von Tag eins an: eine echte Exchange, die nie die Verwahrung deiner Coins übernimmt — zu einer Zeit, in der genau das jede Exchange tat. Es brauchte mehr als ein Jahrzehnt an nicht-custodialen Multisig-Systemen — und den Anblick, wie ein Verwahrer nach dem anderen scheiterte —, um es richtig zu bauen.',
    'history.tl1':'2014 · Bitcoin-Geldautomaten, Tijuana','history.tl_bithalo':'2014 · BitHalo','history.tl_bitbay':'2015 · BitBay','history.tl2':'<em>2025 · NightTrader startet</em>',
    'history.citation':'Berichterstattung von damals: <a href="https://www.coindesk.com/markets/2014/03/28/money-spinners-genesis1-bitcoin-and-dogecoin-atms-arrive-in-tijuana-mexico">CoinDesk, März 2014</a> — Genesis1-Geldautomaten für Bitcoin und Dogecoin kommen nach Tijuana. <a href="https://www.coindesk.com/markets/2014/08/08/bithalo-smart-contracts-without-the-block-chain-bloat">CoinDesk, August 2014</a> — BitHalo bringt Smart Contracts ohne Blockchain-Blähung. <a href="https://bitcoinist.com/bitbay-decentralized-marketplace-and-the-internet-of-things/">Bitcoinist, November 2016</a> — der dezentrale Marktplatz von BitBay, erklärt. Elf Jahre später: <a href="https://www.globenewswire.com/news-release/2025/09/08/3145992/0/en/bitcoin-s-first-true-high-speed-dex-nighttrader-launches.html">GlobeNewswire, September 2025</a> — NightTrader startet als erste echte Hochgeschwindigkeits-DEX für Bitcoin.',
    'footer.col_exchange':'Exchange','footer.link_trade':'Handeln','footer.link_list':'Coin listen',
    'footer.col_legal':'Rechtliches','footer.link_risk':'Risikohinweis',
    'footer.link_whitepaper':'Whitepaper','footer.link_airgapped':'Air-Gapped-Signierung','footer.link_tradeoffs':'Bekannte Kompromisse',
    'footer.imp_h4':'Impressum · Betreiber','footer.imp_email_label':'E-Mail:',
    'footer.legal_p1':'NightTrader.Exchange ist eine nicht-custodiale Handelsoberfläche. Es ist keine Bank, kein Broker, kein Verwahrer und kein Investmentdienst, und nichts hier ist Anlageberatung oder ein Versprechen auf Rendite, Liquidität oder Ausführung. Der Handel mit digitalen Assets kann zum Totalverlust führen. Du bist selbst für deinen Key und deine Backups verantwortlich.',
    'footer.legal_p2':'Bereitgestellt von bitcoin42.com — registriert 2014 · Diese Seite stellt keine Anfragen an Dritte.',
    'footer.lang_label':'Sprache'
  };

  var SUPPORTED = ['en','zh','ru','es','pt','it','ar','fr','de'];
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
      if (val !== undefined) el.innerHTML = val;
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
    try { localStorage.setItem('nt-theme', theme); } catch (e) {}
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
        try { localStorage.setItem('nt-lang', lang); } catch (e) {}
        applyTranslations(lang);
      });
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
    var copy = document.getElementById('bm-copy');
    if (copy) {
      copy.addEventListener('click', function () {
        var addr = copy.dataset.addr;
        var done = function () {
          copy.textContent = dict()['node.copy_copied'];
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
          setTimeout(function () { copy.textContent = dict()['node.copy']; }, 1800);
        }
      });
    }
  }

  init();
})();
