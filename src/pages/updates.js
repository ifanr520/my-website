import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './updates.module.css';

const updates = [
  {
    date: '2026-05-12',
    title: '新增公告、模板、免责声明与友链申请',
    description:
      '首页新增最近 3 条更新；文档区新增标准文章模板；站点新增免责声明和友情链接申请页面。',
    href: '/docs/foreign-banks/overview',
  },
  {
    date: '2026-05-12',
    title: '新版首页与站点结构上线',
    description:
      '完成“漂哥出海之路”的新版信息架构，新增国外银行、国外券商、加密 Web3、跨境出海、AI 时代、AI 美女相册六个栏目。',
    href: '/docs/guide',
  },
  {
    date: '2026-05-12',
    title: 'ZA Bank 申请攻略归档',
    description:
      '将 ZA Bank 内容放入国外银行栏目，后续可继续补充开户条件、申请流程、入金方式和使用注意事项。',
    href: '/docs/foreign-banks/application-guides/za-bank',
  },
  {
    date: '2026-05-12',
    title: '关于我与自媒体入口上线',
    description:
      '新增关于我页面，并统一展示推特 @dangnightdrift 作为公开联系方式。',
    href: '/about',
  },
];

export default function Updates() {
  return (
    <Layout title="文章动态" description="漂哥出海之路的文章发布时间线与内容更新记录。">
      <main className={styles.page}>
        <div className="container">
          <header className={styles.header}>
            <p className={styles.eyebrow}>Publish Timeline</p>
            <Heading as="h1">文章动态</Heading>
            <p>
              这里记录每次新增文章、目录调整和重要内容更新。它是发布时间线，不再使用 Docusaurus
              默认 blog。
            </p>
          </header>

          <section className={styles.timeline} aria-label="文章发布时间线">
            {updates.map((item) => (
              <article className={styles.item} key={`${item.date}-${item.title}`}>
                <time>{item.date}</time>
                <div>
                  <Heading as="h2">{item.title}</Heading>
                  <p>{item.description}</p>
                  <Link to={item.href}>查看相关内容</Link>
                </div>
              </article>
            ))}
          </section>
        </div>
      </main>
    </Layout>
  );
}
