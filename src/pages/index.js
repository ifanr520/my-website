import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const categories = [
  {
    num: '01',
    title: '全球银行',
    description: '美国、英国与全球主要离岸中心的银行账户体系；虚拟卡、理财与全球支付体系的开户指南与实战经验。',
    image: '/img/QQ20260514-150610.jpg',
    to: '/docs/category/foreign-banks',
  },
  {
    num: '02',
    title: '国际证券',
    description: '美股、港股与全球券商开户、注册、入金、交易与资产配置策略。',
    image: '/img/QQ20260514-150625.jpg',
    to: '/docs/category/foreign-brokers',
  },
  {
    num: '03',
    title: '全球身份',
    description: '签证、税号、地址与长期居留解决方案，打造你的全球化身份结构。',
    image: '/img/QQ20260514-150635.jpg',
    to: '/docs/category/cross-border',
  },
  {
    num: '04',
    title: 'AI工作流',
    description: 'AI工具、自动化与个人生产力重塑。提升跨境工作与信息获取能力。',
    image: '/img/ai.jpg',
    to: '/docs/category/ai-era',
  },
  {
    num: '05',
    title: '全球观察',
    description: '资本、科技与金融趋势的深度分析，把握时代变化与机遇。',
    image: '/img/QQ20260514-150705.jpg',
    to: '/docs/category/全球观察',
  },
  {
    num: '06',
    title: 'Web3金融',
    description: '稳定币、链上钱包与去中心化金融，探索全球流动性新范式。',
    image: '/img/11111.jpg',
    to: '/docs/category/crypto-web3',
  },
];

const latestArticles = [
  {
    category: '全球银行',
    date: '05.20',
    title: '为什么 Wise 正在成为新离岸银行？',
    excerpt:
      '从汇款工具到全球金融基础设施，Wise 的野心不止于此。本文深度拆解其商业模式、费率优势与未来布局。',
    image: '/img/global-operations-hero.png',
    to: '/docs/foreign-banks/fintech-platforms/wise',
  },
];

const sideArticles = [
  {
    num: '02',
    title: '美国 ITIN 的真实作用与申请全流程',
    to: '/docs/全球观察/us-itin-guide',
  },
  {
    num: '03',
    title: '香港券商正在失去优势？',
    to: '/docs/foreign-brokers/hk-brokers/futu',
  },
  {
    num: '04',
    title: 'AI 如何改变跨境套利与信息差',
    to: '/docs/全球观察/ai-arbitrage',
  },
];

const globalNews = [
  { time: '06.20', title: 'Wise 新增墨西哥比索与菲律宾比索支持', to: '/docs/foreign-banks/fintech-platforms/wise' },
  { time: '06.19', title: '香港 ZA Bank 虚拟银行开户全攻略', to: '/docs/foreign-banks/digital-banks/za-bank' },
  { time: '06.18', title: 'Binance 币安平台使用指南', to: '/docs/crypto-web3/platform-guides/binance' },
  { time: '06.18', title: 'Bybit 交易所全面解析', to: '/docs/crypto-web3/platform-guides/bybit' },
  { time: '06.17', title: 'OKX 欧易平台操作指南', to: '/docs/crypto-web3/platform-guides/okx' },
  { time: '06.17', title: 'N26 德国数字银行开户实战', to: '/docs/foreign-banks/fintech-platforms/n26' },
];

const globalAssets = [
  { region: '全球银行', items: [{ name: 'Wise', to: '/docs/foreign-banks/fintech-platforms/wise' }, { name: 'N26', to: '/docs/foreign-banks/fintech-platforms/n26' }, { name: 'ZA Bank', to: '/docs/foreign-banks/digital-banks/za-bank' }, { name: 'iFast', to: '/docs/foreign-banks/digital-banks/ifast-global-bank' }] },
  { region: 'Web3金融', items: [{ name: 'Binance', to: '/docs/crypto-web3/platform-guides/binance' }, { name: 'Bybit', to: '/docs/crypto-web3/platform-guides/bybit' }, { name: 'OKX', to: '/docs/crypto-web3/platform-guides/okx' }, { name: 'Bitget', to: '/docs/crypto-web3/platform-guides/bitget' }] },
  { region: '加密银行卡', items: [{ name: 'Wirex', to: '/docs/foreign-banks/crypto-cards/wirex-card' }, { name: 'Bitget Card', to: '/docs/foreign-banks/crypto-cards/bitget-wallet-card' }, { name: 'BiyaPay', to: '/docs/foreign-banks/crypto-cards/biyapay-card' }, { name: 'Safepal', to: '/docs/foreign-banks/crypto-cards/safepal-card' }] },
  { region: '交易所', items: [{ name: 'Kraken', to: '/docs/crypto-web3/platform-guides/kraken' }, { name: 'Coinbase', to: '/docs/crypto-web3/platform-guides/coinbase' }, { name: 'HTX', to: '/docs/crypto-web3/platform-guides/htx' }, { name: 'Gate.io', to: '/docs/crypto-web3/platform-guides/gate' }] },
];

function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div 
        className={styles.heroBg} 
        style={{ backgroundImage: 'url("/img/QQ20260514-154125.jpg")' }}
      >
        <div className={styles.heroOverlay}></div>
      </div>
      <div className={clsx('container', styles.heroInner)}>
        <div className={styles.heroContent}>
          <Heading as="h1" id="hero-title" className={styles.heroTitle}>
            Ken的海
          </Heading>
          <p className={styles.heroSubtitle}>数字移民时代的全球资产领航站</p>
          <p className={styles.heroLead}>
            记录全球银行、国际券商、AI工作流与跨境支付系统，帮助中文世界建立真正的全球化行动能力。
          </p>
          <div className={styles.heroCtaGroup}>
            <Link to="/docs/guide" className={styles.heroCta}>
              全球银行卡办理 →
            </Link>
            <Link to="/docs/cross-border/playbooks/overseas-network-setup" className={styles.heroCtaSecondary}>
              出海网络搭建
            </Link>
            <Link to="/docs/category/ai-era" className={styles.heroCtaSecondary}>
              AI工作流
            </Link>
          </div>
          <p className={styles.heroTag}>GLOBAL CITIZEN PLAYBOOK</p>
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
              全球核心领域
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
                  alt={c.title}
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

function LatestSection() {
  return (
    <section className={styles.section} aria-labelledby="latest-title">
      <div className={clsx('container', styles.sectionContainer)}>
        <header className={styles.sectionHead}>
          <div>
            <p className={styles.eyebrow}>FEATURED ARTICLES</p>
            <Heading as="h2" id="latest-title" className={styles.sectionTitle}>
              本周深度文章
            </Heading>
          </div>
          <Link to="/docs/guide" className={styles.sectionLink}>
            查看全部文章 <span aria-hidden>→</span>
          </Link>
        </header>

        <div className={styles.latestContainer}>
          <div className={styles.latestMain}>
            {latestArticles.map((a) => (
              <Link key={a.title} to={a.to} className={styles.latestMainCard}>
                <div className={styles.latestMainMedia}>
                  <img
                    src={a.image}
                    alt={a.title}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className={styles.latestMainContent}>
                  <span className={styles.latestMainCategory}>{a.category}</span>
                  <h3 className={styles.latestMainTitle}>{a.title}</h3>
                  <p className={styles.latestMainExcerpt}>{a.excerpt}</p>
                  <span className={styles.latestMainRead}>阅读全文 →</span>
                </div>
              </Link>
            ))}
          </div>

          <aside className={styles.latestSide}>
            {sideArticles.map((a) => (
              <Link key={a.num} to={a.to} className={styles.latestSideCard}>
                <span className={styles.latestSideNum}>{a.num}</span>
                <span className={styles.latestSideTitle}>{a.title}</span>
              </Link>
            ))}
            <Link to="/docs/guide" className={styles.latestSideMore}>
              查看全部文章 →
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}

function NewsSection() {
  return (
    <section className={styles.section} aria-labelledby="news-title">
      <div className={clsx('container', styles.sectionContainer)}>
        <div className={styles.newsGrid}>
          <div className={styles.newsLeft}>
            <header className={styles.sectionHead}>
              <div>
                <p className={styles.eyebrow}>FEATURED ARTICLES</p>
                <Heading as="h2" id="news-title" className={styles.sectionTitle}>
                  精彩文章
                </Heading>
              </div>
              <Link to="/docs/guide" className={styles.sectionLink}>
                查看全部文章 <span aria-hidden>→</span>
              </Link>
            </header>
            <div className={styles.newsList}>
              {globalNews.map((item, index) => (
                <Link key={index} to={item.to} className={styles.newsItem}>
                  <span className={styles.newsTime}>{item.time}</span>
                  <span className={styles.newsTitle}>{item.title}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.newsRight}>
            <header className={styles.sectionHead}>
              <div>
                <p className={styles.eyebrow}>ASSET MAP</p>
                <Heading as="h2" className={styles.sectionTitle}>
                  全球资产地图
                </Heading>
              </div>
            </header>
            <div className={styles.assetMap}>
              <div className={styles.mapGrid}>
                {globalAssets.map((asset, index) => (
                  <div key={index} className={styles.assetItem}>
                    <span className={styles.assetRegion}>{asset.region}</span>
                    <div className={styles.assetTags}>
                      {asset.items.map((tag, tagIndex) => (
                        <Link key={tagIndex} to={tag.to} className={styles.assetTag}>
                          {tag.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className={styles.footerSection}>
      <div className={clsx('container', styles.sectionContainer)}>
        <div className={styles.footerGrid}>
          <div className={styles.footerAbout}>
            <div className={styles.footerAvatar}>
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&q=85"
                alt="Ken"
              />
            </div>
            <div className={styles.footerAboutContent}>
              <h3>关于 Ken</h3>
              <p>长期关注全球资产配置、数字移民与 AI 自动化。相信真实实践，而非信息差。</p>
              <Link to="/about" className={styles.footerAboutLink}>了解更多 →</Link>
            </div>
          </div>

          <div className={styles.footerCategories}>
            <h3>攻略栏目</h3>
            <ul className={styles.footerCategoryList}>
              <li><Link to="/docs/category/foreign-banks">全球银行</Link></li>
              <li><Link to="/docs/category/foreign-brokers">国际证券</Link></li>
              <li><Link to="/docs/category/crypto-web3">Web3金融</Link></li>
              <li><Link to="/docs/category/cross-border">跨境出海</Link></li>
              <li><Link to="/docs/category/ai-era">AI工作流</Link></li>
              <li><Link to="/docs/category/全球观察">全球观察</Link></li>
            </ul>
          </div>

          <div className={styles.footerCommunity}>
            <h3>加入社区</h3>
            <p>与全球化实践者一起交流、学习与成长。</p>
            <div className={styles.socialLinks}>
              <a href="https://t.me/ifanr520" className={styles.socialLink} target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
              </a>
            </div>
            <p className={styles.footerTelegramLink}><a href="https://t.me/ifanr520" target="_blank" rel="noopener noreferrer">Telegram @ifanr520</a></p>
          </div>

          <div className={styles.footerLegal}>
            <div className={styles.footerLegalLinks}>
              <Link to="/disclaimer">金融免责声明</Link>
            </div>
            <div className={styles.footerICP}>
              <p>京ICP备01088888号-1 · 京公网安备11010502088888号</p>
              <p>© {new Date().getFullYear()} Ken的海</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <Hero />
      <main className={styles.main}>
        <CategorySection />
        <LatestSection />
        <NewsSection />
        <FooterSection />
      </main>
    </Layout>
  );
}