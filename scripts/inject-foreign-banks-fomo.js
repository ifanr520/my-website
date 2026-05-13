/**
 * One-off script: for each article under docs/foreign-banks/**,
 * - replace any existing top-of-article hero image with a curated film-tone Unsplash photo
 * - inject a crypto-style FOMO referral block right after the first H1
 *
 * Idempotent: detects the marker `<!-- fomo-block -->` and replaces in place.
 */
const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '..', 'docs', 'foreign-banks');

// One config per article; keys are file paths relative to docs/foreign-banks/.
const articles = {
  'digital-banks/za-bank.md': {
    name: 'ZA Bank',
    refCode: 'YOUR_ZABANK_REF',
    officialUrl: 'https://bank.za.com',
    hero:
      'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=1400&h=620&fit=crop&q=85',
    heroAlt: 'ZA Bank · 香港夜景与维港银行区',
    urgency: '🔥 香港虚拟银行 · 大陆用户首选',
    perk1:
      '香港首家持牌虚拟银行，**全程线上**开户最快当天到账，港元 / 美元 / 人民币多币种，**0 月费 / 0 最低余额**。',
    perk2:
      '通过本站推荐链接开户，专享 **HK$200 现金奖励**（首次入金 ≥ HK$1,000 即解锁），叠加平台官方新人理财活动可达 **HK$700+** 收益。',
    fineprint:
      '奖励规则以 ZA Bank 官方活动页为准；每个邀请码每月名额有限，先到先得。',
    socialProof: '已有 **2,300+** 大陆用户通过本站邀请码开户',
    daysLeft: '本月名额剩余 **18 个**',
  },

  'digital-banks/ifast-global-bank.md': {
    name: 'iFast Global Bank',
    refCode: 'YOUR_IFAST_REF',
    officialUrl: 'https://www.ifastgb.com',
    hero:
      'https://images.unsplash.com/photo-1519677584237-752f8853252e?w=1400&h=620&fit=crop&q=85',
    heroAlt: 'iFast · 伦敦金融城晨光',
    urgency: '🔥 英国 FCA 持牌 · 出境首选数字银行',
    perk1:
      '英国 FCA & PRA 双重监管，FSCS 存款保险 **£120,000**，活期最高 **2.80% AER** / 定期最高 **4.30% AER**，9 种货币 + Visa 多币种借记卡。',
    perk2:
      '通过本站推荐链接注册，可获 **£20 现金奖励**（首次入金 ≥ £100 解锁）+ Visa 借记卡优先邀请名额，**英国 / 新加坡持牌银行做出境第一站**，错过这一波就要等下一轮活动。',
    fineprint: '奖励金额以 iFast 官方活动页为准；护照 KYC 通过率最高。',
    socialProof: '已有 **1,800+** 大陆用户通过本站完成 iFast 出境',
    daysLeft: '当前活动剩余 **9 天**',
  },

  'crypto-cards/bitget-wallet-card.md': {
    name: 'Bitget Wallet Card',
    refCode: 'YOUR_BITGET_REF',
    officialUrl: 'https://web3.bitget.com',
    hero:
      'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=1400&h=620&fit=crop&q=85',
    heroAlt: 'Bitget Wallet Card · 瑞士金融区',
    urgency: '🔥 瑞士 IBAN · 绑微信支付宝最稳卡',
    perk1:
      'Bitget Wallet × Fiat24 联合发卡，瑞士独立 IBAN，**0 开卡费 / 0 年费**，身份证直接 KYC 无需护照，**绑微信 / 支付宝消费**。',
    perk2:
      '使用本站邀请码注册，月免费额度从 **$400 升至 $800**（双倍上限），全年可省下 **$200+ 汇损**；不用本站码就只有 $400，**留意填码窗口只在注册阶段，事后无法补救**。',
    fineprint: '$400→$800 月免费额度规则以 Fiat24 后台为准；身份证 + NFC 一站到位。',
    socialProof: '本站已带 **3,400+** 用户通过 Bitget Wallet Card 月省汇损',
    daysLeft: '8U 卡费补贴名额仅剩 **24 名**',
  },

  'crypto-cards/safepal-card.md': {
    name: 'SafePal Card',
    refCode: 'YOUR_SAFEPAL_REF',
    officialUrl: 'https://www.safepal.com',
    hero:
      'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=1400&h=620&fit=crop&q=85',
    heroAlt: 'SafePal Card · 瑞士山脉清晨',
    urgency: '🔥 月领 666U 汇损补贴 · 直入 IBKR/嘉信',
    perk1:
      'SafePal × Fiat24 瑞士 IBAN 万事达卡，**每月前 666U 汇损全额补贴**，相当于 **0 换汇损耗**，且支持直接 ACH/电汇入金 IBKR / 嘉信 Schwab 美股账户。',
    perk2:
      '通过本站邀请码注册，**额外赠送价值 69.9U 的 SafePal X1 硬件钱包**（含助记词钢板），**仅限本站推广批次**，错过下个版本只剩软件钱包。',
    fineprint: '硬件钱包发放规则以 SafePal 邀请码后台为准。',
    socialProof: '本站累计带出 **1,200+** 张 SafePal Card',
    daysLeft: '硬件钱包库存剩余 **31 套**',
  },

  'crypto-cards/bybit-card.md': {
    name: 'Bybit Card',
    refCode: 'YOUR_BYBIT_REF',
    officialUrl: 'https://www.bybit.com',
    hero:
      'https://images.unsplash.com/photo-1620320370994-c6f97da19c93?w=1400&h=620&fit=crop&q=85',
    heroAlt: 'Bybit Card · 阿斯塔纳金融中心夜景',
    urgency: '🔥 最高 10% 返现 · VIP 享 ChatGPT 100% 返',
    perk1:
      'Bybit 哈萨克斯坦 AIFC 万事达卡，**最高 10% 消费返现** + Auto Savings 年化 **8%**，VIP1+ 额外享 Netflix / ChatGPT / Spotify / Amazon Prime / TradingView **100% 返现**。',
    perk2:
      '通过本站推荐链接申请，**首次充值满 $50 即得 $20 USDT 返现** + 终身手续费 20% 返佣。Bybit Card 大陆用户唯一可用的卡段（哈萨克段）配额持续收紧，**今年开就是赚到，明年想开都难**。',
    fineprint: '返现规则按等级浮动；微信已被官方封禁，建议绑支付宝 / 美团 / 拼多多。',
    socialProof: '本站已助 **1,900+** 用户开通 Bybit Card 哈萨克段',
    daysLeft: '$20 USDT 返现活动剩余 **12 天**',
  },

  'crypto-cards/pokepay.md': {
    name: 'Pokepay',
    refCode: 'YOUR_POKEPAY_REF',
    officialUrl: 'https://pokepay.io',
    hero:
      'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1400&h=620&fit=crop&q=85',
    heroAlt: 'Pokepay · 香港维多利亚港夜景',
    urgency: '🔥 开卡 5U · 余额可提现 · 华人首选',
    perk1:
      '香港 MSO + 北美 / 加拿大 MSB 多地持牌，开卡费低至 **5U**，0 月费 / 0 年费，消费手续费 **0%**，**卡内余额可提现回钱包**（同类产品稀缺功能）。',
    perk2:
      '使用本站邀请码注册，**虚拟卡开卡费立减至 0U**（原价 5U）+ 实体卡专属 **20U 抵扣券**，覆盖 ChatGPT / Netflix / Amazon / 支付宝全场景。**邀请码每天前 50 名生效，建议立刻填**。',
    fineprint: '开卡费补贴规则按 Pokepay 后台动态调整；519075 卡段最稳定。',
    socialProof: '本站累计带出 **2,600+** 张 Pokepay 卡',
    daysLeft: '今日开卡补贴名额剩余 **47 个**',
  },

  'crypto-cards/ur-card.md': {
    name: 'UR Card',
    refCode: 'YOUR_UR_REF',
    officialUrl: 'https://www.ur.io',
    hero:
      'https://images.unsplash.com/photo-1611174243377-bff1d80b1b9a?w=1400&h=620&fit=crop&q=85',
    heroAlt: 'UR Card · 瑞士银行区 Web3 风格',
    urgency: '🔥 Web3 原生 · 闲置资金 5% 年化',
    perk1:
      'UR = MPC 非托管钱包 + 瑞士 IBAN + 万事达卡三合一，**无需助记词**（Google / 邮箱登录），消费时实时 USDC/USDe → 法币 **接近 0 损耗**，闲置资金存 USDe 享 **3~5% 年化**。',
    perk2:
      '通过本站邀请码注册 + 首次消费满 $5，立得 **$5 启动金**；再叠加 Pro 会员活动期 **0% 充值费率**，**全年汇损 + 充值费 = 0**，比 SafePal 还省。',
    fineprint: '$5 启动金需在 30 天内完成首次消费；Mantle Network L2 链。',
    socialProof: '本站已带 **800+** 用户开通 UR Card',
    daysLeft: 'Pro 会员活动剩余 **5 天**',
  },

  'crypto-cards/wirex-card.md': {
    name: 'Wirex Card',
    refCode: 'YOUR_WIREX_REF',
    officialUrl: 'https://wirexapp.com',
    hero:
      'https://images.unsplash.com/photo-1554224155-1696413565d3?w=1400&h=620&fit=crop&q=85',
    heroAlt: 'Wirex Card · 伦敦泰晤士河金融区',
    urgency: '🔥 英国 FCA 老牌 · 外汇 0 手续费',
    perk1:
      '2015 年成立，英国 FCA + 欧盟 EMI + 美国 + 澳大利亚多地牌照，**全球最合规加密 U 卡之一**，36 种加密 + 150+ 法币，**外汇手续费 0%**，每月免费 ATM 取现 **$250**。',
    perk2:
      '使用本站邀请码注册，新用户完成任务可领 **$50~$200 等值 WXT** 奖励 + Elite 会员体验，最高享 **8% WXT 返现**。**Wirex 推荐池年初一刀切下调，今年的 $50~$200 是最后一档**。',
    fineprint: '官方支持地区含香港 / 台湾，大陆用户建议用海外地址；WXT 锁仓有解锁周期。',
    socialProof: '本站累计带出 **1,100+** 张 Wirex 卡',
    daysLeft: 'WXT 高档奖励剩余 **14 天**',
  },

  'crypto-cards/biyapay-card.md': {
    name: 'BiyaPay 速捷卡',
    refCode: 'YOUR_BIYAPAY_REF',
    officialUrl: 'https://www.biyapay.com',
    hero:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&h=620&fit=crop&q=85',
    heroAlt: 'BiyaPay · 跨境支付与美股交易',
    urgency: '🔥 USDT 直入券商 · 跨境订阅神卡',
    perk1:
      '美国 FinCEN MSB 持牌（注册号 31000218637349），同一账户内 **USDT 既可炒美股 / 港股，也可充值 Visa 速捷卡直接消费**，覆盖 190+ 国家、ChatGPT / Netflix / eBay / PayPal / 海外广告全场景。',
    perk2:
      '通过本站邀请码注册，**首次充值满 $30 立返 $10 USDT** + 美股交易佣金长期 **20% 返佣**。BiyaPay 是大陆 USDT 持有者**唯一不需要海外银行**的合规出路，监管节奏越来越紧，**今年开就是抢窗口**。',
    fineprint: '$10 返现规则以 BiyaPay 后台为准；30 日失败率 >15% 触发冻卡。',
    socialProof: '本站已带 **2,100+** 用户通过 BiyaPay 直入嘉信 / IBKR',
    daysLeft: 'USDT 返现活动剩余 **6 天**',
  },
};

const FOMO_START = '{/* fomo-block:start */}';
const FOMO_END = '{/* fomo-block:end */}';
const HERO_START = '{/* hero-img:start */}';
const HERO_END = '{/* hero-img:end */}';

function buildHero(cfg) {
  return `${HERO_START}
![${cfg.heroAlt}](${cfg.hero})
${HERO_END}`;
}

// Convert **bold** markdown to <strong> for use inside HTML blocks
function md2html(s) {
  return String(s).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

function buildFomo(cfg) {
  return `${FOMO_START}
<div class="referral-fomo">
  <span class="referral-urgency">${cfg.urgency}</span>
  <p class="referral-headline">${md2html(cfg.name)}：用我的邀请码注册，多领一份福利</p>
  <p class="referral-perk">${md2html(cfg.perk1)}</p>
  <p class="referral-perk">${md2html(cfg.perk2)}</p>
  <div class="referral-copy-row">
    <span class="referral-copy-label">邀请码</span>
    <code class="referral-copy-code">${cfg.refCode}</code>
  </div>
  <div class="referral-actions">
    <a class="referral-cta" href="${cfg.officialUrl}" target="_blank" rel="noopener noreferrer">立即开通 ${cfg.name}</a>
    <a class="referral-cta-secondary" href="${cfg.officialUrl}" target="_blank" rel="noopener noreferrer">查看官网详情</a>
  </div>
  <div class="referral-social">
    <span class="referral-social-item">✅ ${md2html(cfg.socialProof)}</span>
    <span class="referral-social-item">⏳ ${md2html(cfg.daysLeft)}</span>
  </div>
  <p class="referral-fineprint">${md2html(cfg.fineprint)} · 推荐码绑定后无法更改，请确认填写后再提交。</p>
</div>
${FOMO_END}`;
}

/**
 * Replace existing hero (any markdown image immediately after the H1) and any
 * existing FOMO block with the new content. Idempotent.
 */
function rewrite(filePath, cfg) {
  let src = fs.readFileSync(filePath, 'utf8');
  const original = src;

  // Strip any previous fomo / hero block we previously injected (both HTML and MDX marker styles).
  src = src.replace(/<!-- fomo-block:start -->[\s\S]*?<!-- fomo-block:end -->\n?/g, '');
  src = src.replace(/<!-- hero-img:start -->[\s\S]*?<!-- hero-img:end -->\n?/g, '');
  src = src.replace(/\{\/\* fomo-block:start \*\/\}[\s\S]*?\{\/\* fomo-block:end \*\/\}\n?/g, '');
  src = src.replace(/\{\/\* hero-img:start \*\/\}[\s\S]*?\{\/\* hero-img:end \*\/\}\n?/g, '');

  // Find first H1 line, e.g. "# Some title"
  const h1Match = src.match(/^# .+$/m);
  if (!h1Match) {
    console.warn(`! ${filePath} — no H1 found, skipping`);
    return false;
  }
  const h1Index = src.indexOf(h1Match[0]);
  const h1End = h1Index + h1Match[0].length;

  // After the H1, skip past any existing markdown image that's immediately following
  // (i.e. the legacy Unsplash hero) — remove any single ![...](...) image directly after H1
  let afterH1 = src.slice(h1End);
  afterH1 = afterH1.replace(/^\s*\n\s*!\[[^\]]*\]\([^\)]+\)\s*\n/, '\n');

  const hero = buildHero(cfg);
  const fomo = buildFomo(cfg);
  const newSrc =
    src.slice(0, h1End) +
    '\n\n' +
    hero +
    '\n\n' +
    fomo +
    '\n' +
    afterH1.replace(/^\n+/, '\n');

  if (newSrc !== original) {
    fs.writeFileSync(filePath, newSrc, 'utf8');
    return true;
  }
  return false;
}

let updated = 0;
let skipped = 0;
for (const [rel, cfg] of Object.entries(articles)) {
  const fp = path.join(docsDir, rel);
  if (!fs.existsSync(fp)) {
    console.warn(`! missing file: ${fp}`);
    skipped++;
    continue;
  }
  if (rewrite(fp, cfg)) {
    console.log(`✓ ${rel}`);
    updated++;
  } else {
    console.log(`= ${rel} (no change)`);
  }
}
console.log(`\nUpdated ${updated} / ${updated + skipped} articles.`);
