import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const categories = [
  {
    num: '01',
    title: '国外银行',
    description: '海外数字银行与加密银行卡的开户实战、入金路径与长期维护笔记。',
    image:
      'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=900&h=1100&fit=crop&q=85',
    to: '/docs/category/foreign-banks',
  },
  {
    num: '02',
    title: '国外券商',
    description: '港美股开户、税表、入金通道与长期持仓的真实记录。',
    image:
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&h=1100&fit=crop&q=85',
    to: '/docs/category/foreign-brokers',
  },
  {
    num: '03',
    title: '加密 Web3',
    description: '交易所、链上钱包与稳定币支付的安全习惯与合规边界。',
    image:
      'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=900&h=1100&fit=crop&q=85',
    to: '/docs/category/crypto-web3',
  },
  {
    num: '04',
    title: '跨境出海',
    description: '资金通道、网络环境、内容与增长的落地路径与心得。',
    image:
      'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=900&h=1100&fit=crop&q=85',
    to: '/docs/category/cross-border',
  },
  {
    num: '05',
    title: 'AI 时代',
    description: 'AI 写作、调研、自动化与编程辅助的可复用工作流。',
    image:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&h=1100&fit=crop&q=85',
    to: '/docs/category/ai-era',
  },
  {
    num: '06',
    title: 'AI 美女相册',
    description: 'AI 视觉创作与提示词工程归档：参数、风格与迭代记录。',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&h=1100&fit=crop&q=85',
    to: '/docs/category/ai-gallery',
  },
];

const latestArticles = [
  {
    category: '国外银行',
    date: '2026.05.20',
    title: 'iFast Global Bank：英国 FCA 持牌的多币种数字银行',
    excerpt:
      '从内地银行电汇到 iFast 英镑账户，几乎秒到、零损耗换汇——把这条路径完整跑通的一手记录。',
    image:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&h=600&fit=crop&q=85',
    to: '/docs/foreign-banks/digital-banks/ifast-global-bank',
  },
  {
    category: '国外券商',
    date: '2026.05.18',
    title: '盈透 IBKR：全球券商之王的开户与入金',
    excerpt:
      '覆盖 150+ 全球市场，融资利率行业最低；这篇把申请表、Trading Permissions 与入金路径一次说清。',
    image:
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&h=600&fit=crop&q=85',
    to: '/docs/foreign-brokers/us-brokers/ibkr',
  },
  {
    category: '跨境出海',
    date: '2026.05.16',
    title: '境外资产通关路线图：从国内到 IBKR 的完整资金通道',
    excerpt:
      '没有港卡的我，怎么把钱搬到 IBKR：iFAST → Wise → 券商，以及加密侧通路的全图整理。',
    image:
      'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=900&h=600&fit=crop&q=85',
    to: '/docs/cross-border/playbooks/overseas-asset-roadmap',
  },
];

const heroLead =
  '关注全球资源的高效配置与创新实践，聚焦银行、资本、科技与商业的交汇点，提供可落地的思考与策略。';

function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={clsx('container', styles.heroInner)}>
        <p className={styles.heroEyebrow}>GLOBAL RESOURCE PLAYBOOK</p>
        <Heading as="h1" id="hero-title" className={styles.heroTitle}>
          资源全球运营与布局
        </Heading>
        <p className={styles.heroLead}>{heroLead}</p>
        <div className={styles.heroActions}>
          <Link to="/docs/guide" className={styles.heroCtaPrimary}>
            进入攻略库
          </Link>
          <a
            href="https://x.com/dangnightdrift"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.heroCtaGhost}>
            关注 @dangnightdrift
          </a>
        </div>
      </div>
    </section>
  );
}

function CategorySection() {
  return (
    <section className={styles.section} aria-labelledby="category-title">
      <div className={clsx('container', styles.sectionContainer)}>
        <header className={styles.sectionHead}>
          <div>
            <p className={styles.eyebrow}>EXPLORE BY CATEGORY</p>
            <Heading as="h2" id="category-title" className={styles.sectionTitle}>
              探索核心领域
            </Heading>
          </div>
          <Link to="/docs/guide" className={styles.sectionLink}>
            查看全部领域 <span aria-hidden>→</span>
          </Link>
        </header>

        <div className={styles.categoryGrid}>
          {categories.map((c) => (
            <Link key={c.num} to={c.to} className={styles.categoryCard}>
              <div className={styles.categoryMedia}>
                <img
                  src={c.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className={styles.categoryImage}
                />
              </div>
              <span className={styles.categoryNum}>{c.num}</span>
              <h3 className={styles.categoryTitle}>{c.title}</h3>
              <p className={styles.categoryDesc}>{c.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function PerspectiveSection() {
  return (
    <section className={styles.perspective} aria-labelledby="perspective-title">
      <div className={clsx('container', styles.sectionContainer, styles.perspectiveInner)}>
        <div className={styles.perspectiveText}>
          <p className={styles.eyebrow}>GLOBAL PERSPECTIVE</p>
          <Heading as="h2" id="perspective-title" className={styles.sectionTitle}>
            全球视野，深度洞察
          </Heading>
          <p className={styles.perspectiveLead}>
            我关注全球资源的高效配置与创新实践，聚焦银行、资本、科技与商业的交汇点，提供可落地的思考与策略。
          </p>
          <Link to="/about" className={styles.sectionLink}>
            了解我们的理念 <span aria-hidden>→</span>
          </Link>
        </div>
        <div className={styles.perspectiveMedia}>
          <img
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&h=1000&fit=crop&q=85"
            alt="全球视野"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}

function LatestSection() {
  return (
    <section className={styles.section} aria-labelledby="latest-title">
      <div className={clsx('container', styles.sectionContainer)}>
        <header className={styles.sectionHead}>
          <div>
            <p className={styles.eyebrow}>LATEST ARTICLES</p>
            <Heading as="h2" id="latest-title" className={styles.sectionTitle}>
              最新文章
            </Heading>
          </div>
          <Link to="/docs/guide" className={styles.sectionLink}>
            浏览全部文章 <span aria-hidden>→</span>
          </Link>
        </header>

        <div className={styles.latestGrid}>
          {latestArticles.map((a) => (
            <Link key={a.title} to={a.to} className={styles.latestCard}>
              <div className={styles.latestMedia}>
                <img
                  src={a.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className={styles.categoryImage}
                />
              </div>
              <div className={styles.latestMeta}>
                <span>{a.category}</span>
                <span aria-hidden>·</span>
                <span>{a.date}</span>
              </div>
              <h3 className={styles.latestTitle}>{a.title}</h3>
              <p className={styles.latestExcerpt}>{a.excerpt}</p>
              <span className={styles.latestRead} aria-hidden>
                阅读全文 <span>→</span>
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
    <Layout title={siteConfig.title} description={`${siteConfig.tagline}。${heroLead}`}>
      <Hero />
      <main className={styles.main}>
        <CategorySection />
        <PerspectiveSection />
        <LatestSection />
      </main>
    </Layout>
  );
}
