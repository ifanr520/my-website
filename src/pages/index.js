import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const categories = [
  {
    title: '我开过的那些海外账户',
    badge: '国外银行',
    description:
      '从在咖啡馆敲下第一张 ZA Bank 申请书，到瑞士 Fiat24 帮我把一杯拿铁刷成欧元。这里是我每开一张账户、每踩一次坑后写下的笔记。',
    to: '/docs/category/foreign-banks',
    image: '/img/covers/foreign-banks.svg',
    tag: '9 篇 · 持续更新',
  },
  {
    title: '在咖啡馆敲完的港美股开户日记',
    badge: '国外券商',
    description:
      '长桥、富途、IBKR、嘉信⋯ 我把这些券商当数字游民的"工资卡"用了几年，把每次开户、入金、跨境出金的弯路都摊开来写。',
    to: '/docs/category/foreign-brokers',
    image: '/img/covers/foreign-brokers.svg',
    tag: '17 篇 · 实战记录',
  },
  {
    title: '小心翼翼摸索的链上世界',
    badge: '加密 Web3',
    description:
      '我不是来喊单的，只是把自己第一次冷钱包备份手抖、第一次链上转账选错链、第一次 USDT 出金的全部记忆，整理给同样在摸索的你。',
    to: '/docs/category/crypto-web3',
    image: '/img/covers/crypto-web3.svg',
    tag: '9 篇 · 安全优先',
  },
  {
    title: '我的数字游民漂流笔记',
    badge: '跨境出海',
    description:
      '从一张 eSIM 到一家境外公司，从清迈合租房到东京便利店付账。这不是攻略大全，是我把行李箱里的小本子摊开给你看。',
    to: '/docs/category/cross-border',
    image: '/img/covers/cross-border.svg',
    tag: '2 篇 · 慢慢长大',
  },
  {
    title: '和 AI 一起搬砖的日常',
    badge: 'AI 时代',
    description:
      'ChatGPT 帮我看财报、Claude 帮我改邮件、Cursor 帮我修代码。这一栏是我和这些"24 小时不睡觉的同事"一起搬砖的真实片段。',
    to: '/docs/category/ai-era',
    image: '/img/covers/ai-era.svg',
    tag: '1 篇 · 起步中',
  },
  {
    title: '写给镜头那一面的 prompt',
    badge: 'AI 美女相册',
    description:
      '一边喝咖啡一边调 prompt，把灯光、胶片质感、皮肤纹理一行行写进提示词。这里是我和模型一起练手感的随身画册。',
    to: '/docs/category/ai-gallery',
    image: '/img/covers/ai-gallery.svg',
    tag: '2 篇 · 兴趣使然',
  },
];

const highlights = [
  {
    title: '7 张加密银行卡放一起对比，是什么感觉',
    description:
      'Bitget、SafePal、Bybit、Pokepay、UR、Wirex、BiyaPay — 我真的把它们都申请了一遍，把汇损、风控、绑微信的小毛病老老实实写下来。',
    to: '/docs/category/crypto-cards',
    cta: '看看哪张更适合你',
    emoji: '💳',
  },
  {
    title: '没有港卡的我，怎么把钱搬到 IBKR',
    description:
      '从内地银行的 100 元手续费汇款单，到 iFAST 英国账户、Wise 换汇、最后落到 IBKR 的全过程。配图是我手画的资金路线图。',
    to: '/docs/cross-border/playbooks/overseas-asset-roadmap',
    cta: '跟着路线走一遍',
    emoji: '🗺️',
  },
  {
    title: '在国内连不上 OpenAI 的那个夜晚',
    description:
      '后来我买了一张 eSIM 写卡器，配了个境外手机号，又备了俩节点。把整套"翻越通信围墙"的硬件软件方案都掏出来了。',
    to: '/docs/cross-border/playbooks/overseas-network-setup',
    cta: '把网络环境理顺',
    emoji: '📡',
  },
];

const leadParagraph =
  '不是攻略大全，也不是新闻播报。这里只是我作为一个数字游民，把开过的账户、走过的弯路、踩过的坑一篇一篇写下来，希望也能省你一杯咖啡的时间。';

function LandingHero() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.hero}>
      <div className={clsx('container', styles.heroInner)}>
        <p className={styles.heroBrand}>👋 hi，我是漂哥</p>
        <p className={styles.eyebrow}>一个还在路上的数字游民</p>
        <Heading as="h1" className={styles.heroTitle}>
          一边漂，一边把账户、工具、踩过的坑都写下来
        </Heading>
        <p className={styles.heroLead}>{leadParagraph}</p>
        <p className={styles.heroNote}>
          站里部分文章带我自己用过的注册推荐码，链接是不是用、用哪个版本，全凭你判断。我只负责把过程写清楚。
        </p>
        <div className={styles.heroActions}>
          <Link className={styles.heroCtaPrimary} to="/docs/guide">
            随便翻翻 →
          </Link>
          <a
            className={styles.heroCtaGhost}
            href="https://x.com/dangnightdrift"
            target="_blank"
            rel="noopener noreferrer">
            在 X 上唠几句
          </a>
        </div>
      </div>
    </header>
  );
}

function CategoryGrid() {
  return (
    <section className={styles.section} aria-labelledby="home-directory-heading">
      <div className="container">
        <div className={styles.sectionHeader}>
          <p className={styles.sectionEyebrow}>抽屉里的几本笔记</p>
          <Heading as="h2" id="home-directory-heading" className={styles.sectionTitle}>
            按内容随便挑一本翻
          </Heading>
          <p className={styles.sectionLead}>
            六个抽屉，对应银行卡、券商、链上、跨境、AI、视觉创作。每本笔记都是我亲自跑过一遍才落笔的，不是搬运。
          </p>
        </div>
        <div className={styles.categoryGrid}>
          {categories.map((category) => (
            <Link
              className={styles.categoryCard}
              to={category.to}
              key={category.title}
              aria-label={`${category.title}：${category.description}`}>
              <div className={styles.categoryMedia}>
                <img
                  className={styles.categoryImage}
                  src={category.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                {category.badge ? (
                  <span className={styles.categoryBadge}>{category.badge}</span>
                ) : null}
              </div>
              <div className={styles.categoryCardBody}>
                <span className={styles.categoryCardTitle}>{category.title}</span>
                <p className={styles.categoryCardDesc}>{category.description}</p>
                <div className={styles.categoryCardFooter}>
                  {category.tag ? (
                    <span className={styles.categoryCardMeta}>{category.tag}</span>
                  ) : null}
                  <span className={styles.categoryCardCta} aria-hidden>
                    翻进去
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12h14m0 0-6-6m6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedHighlights() {
  return (
    <section className={styles.featuredSection} aria-labelledby="home-featured-heading">
      <div className="container">
        <div className={styles.sectionHeader}>
          <p className={styles.sectionEyebrow}>最近常被翻到的几篇</p>
          <Heading as="h2" id="home-featured-heading" className={styles.sectionTitle}>
            如果你只想先看一篇
          </Heading>
          <p className={styles.sectionLead}>
            从最近读者点开最多的几篇里挑出来。如果不知道从哪看起，从这三篇任意一篇开始都行。
          </p>
        </div>
        <div className={styles.featuredGrid}>
          {highlights.map((item) => (
            <Link className={styles.featuredCard} to={item.to} key={item.title}>
              {item.emoji ? (
                <span className={styles.featuredEmoji} aria-hidden>
                  {item.emoji}
                </span>
              ) : null}
              <h3 className={styles.featuredCardTitle}>{item.title}</h3>
              <p className={styles.featuredCardDesc}>{item.description}</p>
              <span className={styles.featuredCta} aria-hidden>
                {item.cta}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14m0 0-6-6m6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClosingNote() {
  return (
    <section className={styles.closingSection}>
      <div className={clsx('container', styles.closingInner)}>
        <p className={styles.closingEyebrow}>📮 写在最后</p>
        <Heading as="h2" className={styles.closingTitle}>
          慢慢写，慢慢看，咱们都不急。
        </Heading>
        <p className={styles.closingLead}>
          所有内容我都会回头补、回头改。你看到的版本，可能是我下次去清迈或胡志明的飞机上又顺手 update 了一遍的。
          有什么觉得过时、踩坑或想看的，<a href="https://x.com/dangnightdrift" target="_blank" rel="noopener noreferrer">在 X 上戳我</a> 就好。
        </p>
        <p className={styles.closingSign}>—— 漂哥，写于某个不知道在哪个时区的咖啡馆 ☕</p>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description={`${siteConfig.tagline}。${leadParagraph}`}>
      <LandingHero />
      <main className={styles.main}>
        <CategoryGrid />
        <FeaturedHighlights />
        <ClosingNote />
      </main>
    </Layout>
  );
}
