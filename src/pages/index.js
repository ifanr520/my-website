import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const categories = [
  {
    title: '国外银行',
    description:
      '海外数字银行 + 加密银行卡的实战记录：开户条件、入金路径、费率结构、风控触发点与长期维护经验。',
    to: '/docs/category/foreign-banks',
    image: '/img/category-foreign-banks.webp',
    tag: '已上线 9 篇',
  },
  {
    title: '国外券商',
    description:
      '境外券商开户与资金路径梳理：交易与融资费率、税务表格要点，账户安全与长期仓位记录。',
    to: '/docs/category/foreign-brokers',
    image: '/img/category-foreign-brokers.webp',
    tag: '陆续更新',
  },
  {
    title: '加密 Web3',
    description:
      '交易所、链上钱包与稳定币支付的操作备忘：侧重安全习惯、链上确认与合规边界，而非喊单。',
    to: '/docs/category/crypto-web3',
    image: '/img/category-crypto-web3.webp',
    tag: '陆续更新',
  },
  {
    title: '跨境出海',
    description:
      '主体设立、跨境收付、内容与增长渠道的落地笔记，面向合规扩张与全球资产配置前的信息拼图。',
    to: '/docs/category/cross-border',
    image: '/img/category-cross-border.webp',
    tag: '已上线 2 篇',
  },
  {
    title: 'AI 时代',
    description:
      '调研、写作、自动化与编程辅助的生产力栈：记录可复用的提示词、工作流与工具组合，降低试错成本。',
    to: '/docs/category/ai-era',
    image: '/img/category-ai-era.webp',
    tag: '陆续更新',
  },
  {
    title: 'AI 美女相册',
    description:
      'AI 视觉创作与提示词工程归档：参数、风格与迭代记录为主，侧重可复现流程而非猎奇展示。',
    to: '/docs/category/ai-gallery',
    image: '/img/category-ai-gallery.webp',
    tag: '已上线 2 篇',
  },
];

const highlights = [
  {
    title: '加密银行卡横向对比',
    description:
      'Bitget Wallet × Fiat24、SafePal、Bybit、Pokepay、UR、Wirex、BiyaPay 七张主流 U 卡的费率、绑定与风险点。',
    to: '/docs/category/crypto-cards',
    cta: '查看对比',
  },
  {
    title: '境外资产通关路线图',
    description:
      '无港卡用户从国内银行到 IBKR/嘉信、长桥的完整资金通道：iFast → Wise → 券商，以及加密侧通路。',
    to: '/docs/cross-border/playbooks/overseas-asset-roadmap',
    cta: '查看路线图',
  },
  {
    title: '出海网络环境部署',
    description:
      '稳定的科学上网、海外 App 下载与境外手机号三大前提，硬件级 eSIM 写卡器方案与折扣码留档。',
    to: '/docs/cross-border/playbooks/overseas-network-setup',
    cta: '查看攻略',
  },
];

const leadParagraph =
  '围绕国外银行、海外券商、Web3、跨境业务、AI 工具和视觉内容，持续沉淀可检索、可复用、可更新的出海实战攻略。';

function LandingHero() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.hero}>
      <div className={clsx('container', styles.heroInner)}>
        <p className={styles.heroBrand}>{siteConfig.title}</p>
        <p className={styles.eyebrow}>Global Resource Playbook</p>
        <Heading as="h1" className={styles.heroTitle}>
          资源全球运营与布局
        </Heading>
        <p className={styles.heroLead}>{leadParagraph}</p>
        <p className={styles.heroNote}>
          深度长文为主，部分攻略含合作注册说明；使用前请阅读各篇风险提示与条款原文。
        </p>
        <div className={styles.heroActions}>
          <Link className={styles.heroCtaPrimary} to="/docs/guide">
            进入攻略库
          </Link>
          <a
            className={styles.heroCtaGhost}
            href="https://x.com/dangnightdrift"
            target="_blank"
            rel="noopener noreferrer">
            关注 @dangnightdrift
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
          <Heading as="h2" id="home-directory-heading" className={styles.sectionTitle}>
            攻略目录
          </Heading>
          <p className={styles.sectionLead}>
            六个固定栏目，对应海外银行、券商、Web3、跨境、AI 工具与视觉创作；点进栏目即可按文检索。
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
                {category.tag ? (
                  <span className={styles.categoryTag}>{category.tag}</span>
                ) : null}
              </div>
              <div className={styles.categoryCardBody}>
                <span className={styles.categoryCardTitle}>{category.title}</span>
                <p className={styles.categoryCardDesc}>{category.description}</p>
                <span className={styles.categoryCardCta} aria-hidden>
                  进入栏目
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
          <Heading as="h2" id="home-featured-heading" className={styles.sectionTitle}>
            热门攻略
          </Heading>
          <p className={styles.sectionLead}>
            从最近更新与读者高频访问的内容中挑选，跨境资产、加密卡、网络环境三个角度的实战入口。
          </p>
        </div>
        <div className={styles.featuredGrid}>
          {highlights.map((item) => (
            <Link className={styles.featuredCard} to={item.to} key={item.title}>
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
      </main>
    </Layout>
  );
}
