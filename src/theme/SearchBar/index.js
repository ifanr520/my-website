import {useEffect, useMemo, useRef, useState} from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const searchItems = [
  {
    title: '漂哥出海之路',
    description: '资源全球运营与布局，出海攻略知识库首页。',
    url: '/',
    keywords: '首页 漂哥 出海 资源 全球 运营 布局',
  },
  {
    title: '出海攻略总览',
    description: '国外银行、国外券商、加密 Web3、跨境出海、AI 时代、AI 美女相册目录。',
    url: '/docs/guide',
    keywords: '目录 攻略 总览 分类',
  },
  {
    title: '文章动态',
    description: '文章发布时间线和内容更新记录。',
    url: '/updates',
    keywords: '发布时间线 更新 动态 文章',
  },
  {
    title: '关于我',
    description: '漂哥出海之路作者介绍、推特联系方式和网站内容方向。',
    url: '/about',
    keywords: '关于我 作者 可信度 推特',
  },
  {
    title: '国外银行',
    description: '海外银行开户、入金出金、费用、账户维护和风控经验。',
    url: '/docs/category/国外银行',
    keywords: '银行 香港 新加坡 美国 ZA Bank 开户 入金',
  },
  {
    title: 'ZA Bank 申请攻略',
    description: 'ZA Bank 开户、申请流程、入金和银行卡使用说明。',
    url: '/docs/foreign-banks/application-guides/za-bank',
    keywords: 'ZA Bank 众安银行 香港 虚拟银行',
  },
  {
    title: '国外券商',
    description: '海外券商开户、资金流转、税务表格和长期配置笔记。',
    url: '/docs/category/国外券商',
    keywords: '券商 美股 港股 税务 投资',
  },
  {
    title: '加密 Web3',
    description: '交易所、钱包、稳定币、链上工具和 Web3 基础设施。',
    url: '/docs/category/加密-web3',
    keywords: '加密 web3 钱包 交易所 稳定币 链上',
  },
  {
    title: '跨境出海',
    description: '公司、支付、内容平台、海外增长和运营工具。',
    url: '/docs/category/跨境出海',
    keywords: '跨境 出海 支付 公司 内容 平台 增长',
  },
  {
    title: 'AI 时代',
    description: 'AI 写作、调研、自动化、编程辅助和效率系统。',
    url: '/docs/category/ai-时代',
    keywords: 'AI 工具 自动化 写作 编程 效率',
  },
  {
    title: 'AI 美女相册',
    description: 'AI 图片生成、提示词、视觉栏目和作品归档。',
    url: '/docs/category/ai-美女相册',
    keywords: 'AI 美女 相册 图片 生成 提示词 视觉',
  },
  {
    title: '财阀千金生日宴提示词',
    description: 'AI 美女相册主题提示词，记录豪门生日宴写真风格和生成要求。',
    url: '/docs/ai-gallery/caifa-qianjin',
    keywords: '财阀千金 生日宴 提示词 AI 美女 写真 相册',
  },
];

export default function SearchBar() {
  const inputRef = useRef(null);
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    function handleKeyDown(event) {
      const target = event.target;
      const isTyping =
        target instanceof HTMLElement &&
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);

      if (event.key === 'Escape') {
        setQuery('');
        inputRef.current?.blur();
        return;
      }

      if ((event.key === '/' && !isTyping) || ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k')) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const results = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) {
      return [];
    }

    return searchItems
      .filter((item) => {
        const haystack = `${item.title} ${item.description} ${item.keywords}`.toLowerCase();
        return haystack.includes(value);
      })
      .slice(0, 6);
  }, [query]);

  const showResults = focused && query.trim().length > 0;

  function handleSubmit(event) {
    event.preventDefault();
    const firstResult = results[0];
    if (firstResult && typeof window !== 'undefined') {
      window.location.href = firstResult.url;
    }
  }

  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit} role="search" aria-label="站内搜索">
        <input
          ref={inputRef}
          aria-label="搜索站内内容"
          type="search"
          placeholder="搜索文档..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            window.setTimeout(() => setFocused(false), 120);
          }}
        />
        <span className={styles.shortcut}>/</span>
      </form>
      {showResults && (
        <div className={styles.results}>
          {results.length > 0 ? (
            results.map((item) => (
              <Link className={styles.result} to={item.url} key={item.url}>
                <strong>{item.title}</strong>
                <span>{item.description}</span>
              </Link>
            ))
          ) : (
            <div className={styles.empty}>没有找到匹配内容</div>
          )}
        </div>
      )}
    </div>
  );
}
