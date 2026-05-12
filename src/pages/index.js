import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const categories = [
  {
    title: '国外银行',
    description: '开户、入金、费用、账户维护与风控经验。',
    to: '/docs/category/国外银行',
  },
  {
    title: '国外券商',
    description: '券商开户、资金路径、税务表格与长期配置笔记。',
    to: '/docs/category/国外券商',
  },
  {
    title: '加密 Web3',
    description: '交易所、钱包、稳定币和链上工具实操整理。',
    to: '/docs/category/加密-web3',
  },
  {
    title: '跨境出海',
    description: '公司、支付、内容平台和海外增长路径。',
    to: '/docs/category/跨境出海',
  },
  {
    title: 'AI 时代',
    description: 'AI 工具、自动化工作流与效率系统。',
    to: '/docs/category/ai-时代',
  },
  {
    title: 'AI 美女相册',
    description: 'AI 视觉内容、提示词和作品归档。',
    to: '/docs/category/ai-美女相册',
  },
];

const highlights = [
  '左侧目录默认展开，进入任意攻略页都能看到完整知识地图。',
  '文章动态是发布时间线，用来记录新增、迁移和更新的内容。',
  '公开联系方式统一为推特 @dangnightdrift，保持入口清晰。',
];

const recentUpdates = [
  {
    date: '2026-05-12',
    title: '新版首页与站点结构上线',
    description: '完成首页背景、目录结构、文章动态、关于我和页脚信息优化。',
    to: '/updates',
  },
  {
    date: '2026-05-12',
    title: '新增免责声明与文章模板',
    description: '补充金融、券商、Web3 内容的风险声明，并整理标准文章结构。',
    to: '/docs/foreign-banks/overview',
  },
  {
    date: '2026-05-12',
    title: 'AI 美女相册目录归档',
    description: '新增 AI 视觉内容栏目，用于归档提示词、流程和作品说明。',
    to: '/docs/category/ai-美女相册',
  },
];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.hero}>
      <div className={clsx('container', styles.heroInner)}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Global Resource Playbook</p>
          <Heading as="h1" className={styles.heroTitle}>
            {siteConfig.title}
          </Heading>
          <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
          <p className={styles.heroText}>
            围绕国外银行、海外券商、Web3、跨境业务、AI 工具和视觉内容，持续沉淀可检索、可复用、可更新的出海实战攻略。
          </p>
          <div className={styles.heroActions}>
            <Link className="button button--primary button--lg" to="/docs/guide">
              查看目录
            </Link>
            <Link className="button button--secondary button--lg" to="/updates">
              文章动态
            </Link>
          </div>
          <div className={styles.socialLinks} aria-label="自媒体联系方式">
            <a href="https://x.com/dangnightdrift">推特 @dangnightdrift</a>
          </div>
        </div>
        <aside className={styles.heroPanel} aria-label="内容方向">
          <span className={styles.panelLabel}>内容主线</span>
          <ul>
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </div>
    </header>
  );
}

function RecentUpdates() {
  return (
    <section className={styles.updatesSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2">站点公告 / 更新日志</Heading>
          <p>最近 3 条更新，方便读者判断站点是否持续维护。</p>
        </div>
        <div className={styles.updateGrid}>
          {recentUpdates.map((item) => (
            <Link className={styles.updateCard} to={item.to} key={item.title}>
              <time>{item.date}</time>
              <strong>{item.title}</strong>
              <span>{item.description}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryGrid() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2">攻略目录</Heading>
          <p>把信息架构搭稳，后续新增文章只需要放进对应目录。</p>
        </div>
        <div className={styles.categoryGrid}>
          {categories.map((category) => (
            <Link className={styles.categoryCard} to={category.to} key={category.title}>
              <span>{category.title}</span>
              <p>{category.description}</p>
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
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <RecentUpdates />
        <CategoryGrid />
      </main>
    </Layout>
  );
}
