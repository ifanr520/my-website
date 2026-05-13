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
    description: '国外银行、国外券商、加密 Web3、跨境出海、AI 时代、AI 美女相册目录索引。',
    url: '/docs/guide',
    keywords: '目录 攻略 总览 分类',
  },
  {
    title: '关于我',
    description: '漂哥出海之路作者介绍、推特联系方式和网站内容方向。',
    url: '/about',
    keywords: '关于我 作者 可信度 推特',
  },
  {
    title: '金融免责声明',
    description: '本站内容性质、投资风险提示与第三方链接说明。',
    url: '/disclaimer',
    keywords: '免责 声明 风险 合规 法律',
  },
  {
    title: '国外银行',
    description: '国外银行栏目所有攻略、对比与实操记录。',
    url: '/docs/category/foreign-banks',
    keywords: '国外银行',
  },
  {
    title: 'ZA Bank 香港虚拟银行',
    description: '国外银行 · ZA Bank 香港虚拟银行',
    url: '/docs/foreign-banks/digital-banks/za-bank',
    keywords: '国外银行 ZA Bank 香港虚拟银行',
  },
  {
    title: 'iFast Global Bank 英国',
    description: '国外银行 · iFast Global Bank 英国',
    url: '/docs/foreign-banks/digital-banks/ifast-global-bank',
    keywords: '国外银行 iFast Global Bank 英国',
  },
  {
    title: 'Bitget Wallet Card',
    description: '国外银行 · Bitget Wallet Card',
    url: '/docs/foreign-banks/crypto-cards/bitget-wallet-card',
    keywords: '国外银行 Bitget Wallet Card',
  },
  {
    title: 'SafePal Card',
    description: '国外银行 · SafePal Card',
    url: '/docs/foreign-banks/crypto-cards/safepal-card',
    keywords: '国外银行 SafePal Card',
  },
  {
    title: 'Bybit Card',
    description: '国外银行 · Bybit Card',
    url: '/docs/foreign-banks/crypto-cards/bybit-card',
    keywords: '国外银行 Bybit Card',
  },
  {
    title: 'Pokepay',
    description: '国外银行 · Pokepay',
    url: '/docs/foreign-banks/crypto-cards/pokepay',
    keywords: '国外银行 Pokepay',
  },
  {
    title: 'UR Card',
    description: '国外银行 · UR Card',
    url: '/docs/foreign-banks/crypto-cards/ur-card',
    keywords: '国外银行 UR Card',
  },
  {
    title: 'Wirex Card',
    description: '国外银行 · Wirex Card',
    url: '/docs/foreign-banks/crypto-cards/wirex-card',
    keywords: '国外银行 Wirex Card',
  },
  {
    title: 'BiyaPay 速捷卡',
    description: '国外银行 · BiyaPay 速捷卡',
    url: '/docs/foreign-banks/crypto-cards/biyapay-card',
    keywords: '国外银行 BiyaPay 速捷卡',
  },
  {
    title: '国外券商',
    description: '国外券商栏目所有攻略、对比与实操记录。',
    url: '/docs/category/foreign-brokers',
    keywords: '国外券商',
  },
  {
    title: '栏目说明',
    description: '国外券商 · 栏目说明',
    url: '/docs/foreign-brokers/intro',
    keywords: '国外券商 栏目说明',
  },
  {
    title: '加密 Web3',
    description: '加密 Web3栏目所有攻略、对比与实操记录。',
    url: '/docs/category/crypto-web3',
    keywords: '加密 Web3',
  },
  {
    title: '全球知名合约交易所',
    description: '加密 Web3 · 全球知名合约交易所',
    url: '/docs/crypto-web3/platform-guides/global-perpetual-exchanges',
    keywords: '加密 Web3 全球知名合约交易所',
  },
  {
    title: 'Binance 币安',
    description: '加密 Web3 · Binance 币安',
    url: '/docs/crypto-web3/platform-guides/binance',
    keywords: '加密 Web3 Binance 币安',
  },
  {
    title: 'Bybit',
    description: '加密 Web3 · Bybit',
    url: '/docs/crypto-web3/platform-guides/bybit',
    keywords: '加密 Web3 Bybit',
  },
  {
    title: 'OKX 欧易',
    description: '加密 Web3 · OKX 欧易',
    url: '/docs/crypto-web3/platform-guides/okx',
    keywords: '加密 Web3 OKX 欧易',
  },
  {
    title: 'Bitget',
    description: '加密 Web3 · Bitget',
    url: '/docs/crypto-web3/platform-guides/bitget',
    keywords: '加密 Web3 Bitget',
  },
  {
    title: 'Gate.io 芝麻开门',
    description: '加密 Web3 · Gate.io 芝麻开门',
    url: '/docs/crypto-web3/platform-guides/gate',
    keywords: '加密 Web3 Gate.io 芝麻开门',
  },
  {
    title: 'HTX 火币',
    description: '加密 Web3 · HTX 火币',
    url: '/docs/crypto-web3/platform-guides/htx',
    keywords: '加密 Web3 HTX 火币',
  },
  {
    title: 'Kraken',
    description: '加密 Web3 · Kraken',
    url: '/docs/crypto-web3/platform-guides/kraken',
    keywords: '加密 Web3 Kraken',
  },
  {
    title: 'Coinbase',
    description: '加密 Web3 · Coinbase',
    url: '/docs/crypto-web3/platform-guides/coinbase',
    keywords: '加密 Web3 Coinbase',
  },
  {
    title: '跨境出海',
    description: '跨境出海栏目所有攻略、对比与实操记录。',
    url: '/docs/category/cross-border',
    keywords: '跨境出海',
  },
  {
    title: '境外资产通关路线图',
    description: '跨境出海 · 境外资产通关路线图',
    url: '/docs/cross-border/playbooks/overseas-asset-roadmap',
    keywords: '跨境出海 境外资产通关路线图',
  },
  {
    title: '出海网络环境部署',
    description: '跨境出海 · 出海网络环境部署',
    url: '/docs/cross-border/playbooks/overseas-network-setup',
    keywords: '跨境出海 出海网络环境部署',
  },
  {
    title: 'AI 时代',
    description: 'AI 时代栏目所有攻略、对比与实操记录。',
    url: '/docs/category/ai-era',
    keywords: 'AI 时代',
  },
  {
    title: '栏目说明',
    description: 'AI 时代 · 栏目说明',
    url: '/docs/ai-era/intro',
    keywords: 'AI 时代 栏目说明',
  },
  {
    title: 'AI 美女相册',
    description: 'AI 美女相册栏目所有攻略、对比与实操记录。',
    url: '/docs/category/ai-gallery',
    keywords: 'AI 美女相册',
  },
  {
    title: '相册制作工作流',
    description: 'AI 美女相册 · 相册制作工作流',
    url: '/docs/ai-gallery/creative-guides/workflow',
    keywords: 'AI 美女相册 相册制作工作流',
  },
  {
    title: '作品图集展示',
    description: 'AI 美女相册 · 作品图集展示',
    url: '/docs/ai-gallery/creative-guides/gallery',
    keywords: 'AI 美女相册 作品图集展示',
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
