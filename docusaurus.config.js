// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Ken的海',
  tagline: '资源全球运营与布局',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://example.com',
  baseUrl: '/',
  organizationName: 'piao',
  projectName: 'piao-overseas-road',
  onBrokenLinks: 'warn',
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'keywords',
        content:
          'Ken的海,出海攻略,国外银行,国外券商,Web3,跨境出海,AI工具,AI美女相册,资源全球运营与布局',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'author',
        content: 'Ken',
      },
    },
  ],
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: 'docs',
          breadcrumbs: true,
          showLastUpdateTime: false,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  plugins: [],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: 'Ken的海',
        hideOnScroll: true,
        logo: {
          alt: 'Ken的海',
          src: 'img/logo.svg',
        },
        items: [
          {
            label: '全球银行',
            position: 'left',
            items: [
              { label: '栏目首页', to: '/docs/category/foreign-banks' },
              { label: '数字银行开户', to: '/docs/category/digital-banks', className: 'navbar-dropdown-section' },
              { label: 'ZA Bank 香港虚拟银行', to: '/docs/foreign-banks/digital-banks/za-bank' },
              { label: 'iFast Global Bank 英国', to: '/docs/foreign-banks/digital-banks/ifast-global-bank' },
              { label: '加密银行卡', to: '/docs/category/crypto-cards', className: 'navbar-dropdown-section' },
              { label: 'Bitget Wallet Card', to: '/docs/foreign-banks/crypto-cards/bitget-wallet-card' },
              { label: 'SafePal Card', to: '/docs/foreign-banks/crypto-cards/safepal-card' },
              { label: 'Bybit Card', to: '/docs/foreign-banks/crypto-cards/bybit-card' },
              { label: 'Pokepay', to: '/docs/foreign-banks/crypto-cards/pokepay' },
              { label: 'UR Card', to: '/docs/foreign-banks/crypto-cards/ur-card' },
              { label: 'Wirex Card', to: '/docs/foreign-banks/crypto-cards/wirex-card' },
              { label: 'BiyaPay 速捷卡', to: '/docs/foreign-banks/crypto-cards/biyapay-card' },
              { label: '金融科技平台', to: '/docs/category/fintech-platforms', className: 'navbar-dropdown-section' },
              { label: 'N26 德国数字银行', to: '/docs/foreign-banks/fintech-platforms/n26' },
              { label: 'Wise 多币种账户', to: '/docs/foreign-banks/fintech-platforms/wise' },
              { label: 'MyFin 英国账户', to: '/docs/foreign-banks/fintech-platforms/myfin-uk' },
              { label: 'PayPal 跨境收款', to: '/docs/foreign-banks/fintech-platforms/paypal' },
              { label: 'FSMone 新加坡', to: '/docs/foreign-banks/fintech-platforms/fsmone' },
            ],
          },
          {
            label: '国际证券',
            position: 'left',
            items: [
              { label: '栏目首页', to: '/docs/category/foreign-brokers' },
              { label: '港股券商', to: '/docs/category/hk-brokers', className: 'navbar-dropdown-section' },
              { label: '长桥证券 Longbridge', to: '/docs/foreign-brokers/hk-brokers/longbridge' },
              { label: '盈立证券 uSMART', to: '/docs/foreign-brokers/hk-brokers/uismart' },
              { label: '华盛通 Valuable', to: '/docs/foreign-brokers/hk-brokers/valuable' },
              { label: '富途证券 Futu', to: '/docs/foreign-brokers/hk-brokers/futu' },
              { label: '老虎证券 Tiger', to: '/docs/foreign-brokers/hk-brokers/tiger' },
              { label: '复星证券 Fosun', to: '/docs/foreign-brokers/hk-brokers/fosun' },
              { label: '熊猫证券 Panda', to: '/docs/foreign-brokers/hk-brokers/panda' },
              { label: '美股券商', to: '/docs/category/us-brokers', className: 'navbar-dropdown-section' },
              { label: '富途 moomoo', to: '/docs/foreign-brokers/us-brokers/moomoo' },
              { label: '盈透证券 IBKR', to: '/docs/foreign-brokers/us-brokers/ibkr' },
              { label: '嘉信证券 Schwab', to: '/docs/foreign-brokers/us-brokers/schwab' },
              { label: '必贝证券 BBAE', to: '/docs/foreign-brokers/us-brokers/bbae' },
              { label: '链上美股交易', to: '/docs/category/tokenized-stocks', className: 'navbar-dropdown-section' },
              { label: 'OKX 链上美股', to: '/docs/foreign-brokers/tokenized-stocks/okx-stocks' },
              { label: 'Binance 链上美股', to: '/docs/foreign-brokers/tokenized-stocks/binance-stocks' },
              { label: 'BiyaPay 港美股', to: '/docs/foreign-brokers/tokenized-stocks/biyapay' },
              { label: 'Kraken 链上美股', to: '/docs/foreign-brokers/tokenized-stocks/kraken-stocks' },
              { label: 'Bybit 链上美股', to: '/docs/foreign-brokers/tokenized-stocks/bybit-stocks' },
              { label: 'Coinbase 链上美股', to: '/docs/foreign-brokers/tokenized-stocks/coinbase-stocks' },
            ],
          },
          {
            label: 'Web3金融',
            position: 'left',
            items: [
              { label: '栏目首页', to: '/docs/category/crypto-web3' },
              { label: '交易所与平台', to: '/docs/category/crypto-platforms', className: 'navbar-dropdown-section' },
              { label: '全球知名合约交易所', to: '/docs/crypto-web3/platform-guides/global-perpetual-exchanges' },
              { label: 'Binance 币安', to: '/docs/crypto-web3/platform-guides/binance' },
              { label: 'Bybit', to: '/docs/crypto-web3/platform-guides/bybit' },
              { label: 'OKX 欧易', to: '/docs/crypto-web3/platform-guides/okx' },
              { label: 'Bitget', to: '/docs/crypto-web3/platform-guides/bitget' },
              { label: 'Gate.io 芝麻开门', to: '/docs/crypto-web3/platform-guides/gate' },
              { label: 'HTX 火币', to: '/docs/crypto-web3/platform-guides/htx' },
              { label: 'Kraken', to: '/docs/crypto-web3/platform-guides/kraken' },
              { label: 'Coinbase', to: '/docs/crypto-web3/platform-guides/coinbase' },
              { label: '钱包安全', to: '/docs/category/crypto-wallets', className: 'navbar-dropdown-section' },
              { label: '6 大冷钱包横评', to: '/docs/crypto-web3/wallets/cold-wallets' },
            ],
          },
          {
            label: '跨境出海',
            position: 'left',
            items: [
              { label: '栏目首页', to: '/docs/category/cross-border' },
              { label: '落地攻略', to: '/docs/category/cross-border-playbooks', className: 'navbar-dropdown-section' },
              { label: '境外资产通关路线图', to: '/docs/cross-border/playbooks/overseas-asset-roadmap' },
              { label: '出海网络环境部署', to: '/docs/cross-border/playbooks/overseas-network-setup' },
              { label: 'eSIM 长期号码', to: '/docs/category/esim-numbers', className: 'navbar-dropdown-section' },
              { label: '英国 giffgaff', to: '/docs/cross-border/esim-numbers/giffgaff' },
              { label: '德国 Vodafone', to: '/docs/cross-border/esim-numbers/vodafone-de' },
              { label: '香港 3HK', to: '/docs/cross-border/esim-numbers/3hk' },
              { label: '香港 Club Sim', to: '/docs/cross-border/esim-numbers/clubsim' },
              { label: 'eSIM 流量平台', to: '/docs/category/esim-data', className: 'navbar-dropdown-section' },
              { label: 'Redteago 全球流量', to: '/docs/cross-border/esim-data/redteago' },
              { label: 'Eskimo 全球流量', to: '/docs/cross-border/esim-data/eskimo' },
              { label: 'KiteSim 数字游民流量', to: '/docs/cross-border/esim-data/kitesim' },
              { label: '海外账号注册', to: '/docs/category/overseas-accounts', className: 'navbar-dropdown-section' },
              { label: '美区 / 土耳其 Apple ID', to: '/docs/cross-border/overseas-accounts/apple-id' },
              { label: '美国 Gmail 注册', to: '/docs/cross-border/overseas-accounts/gmail-us' },
              { label: 'Instagram 注册', to: '/docs/cross-border/overseas-accounts/instagram' },
              { label: 'Facebook 注册', to: '/docs/cross-border/overseas-accounts/facebook' },
              { label: 'YouTube 频道注册', to: '/docs/cross-border/overseas-accounts/youtube' },
              { label: 'Telegram 注册', to: '/docs/cross-border/overseas-accounts/telegram' },
            ],
          },
          {
            label: 'AI工作流',
            position: 'left',
            items: [
              { label: '栏目首页', to: '/docs/category/ai-era' },
              { label: '栏目说明', to: '/docs/ai-era/intro' },
              { label: 'OpenAI vs Claude：推理原理与价值观的深度对比', to: '/docs/ai-era/openai-claude-comparison' },
              { label: 'AI 账号注册', to: '/docs/category/ai-account-guides', className: 'navbar-dropdown-section' },
              { label: 'OpenAI / ChatGPT 注册', to: '/docs/ai-era/account-guides/openai-chatgpt' },
              { label: 'Anthropic Claude 注册', to: '/docs/ai-era/account-guides/anthropic-claude' },
              { label: 'AI 网络环境', to: '/docs/category/ai-network', className: 'navbar-dropdown-section' },
              { label: 'VPS + 3X-UI 搭建', to: '/docs/ai-era/ai-network/vps-3xui-setup' },
            ],
          },
          {
            label: '全球观察',
            position: 'left',
            items: [
              { label: '栏目首页', to: '/docs/category/全球观察' },
              { label: '美国ITIN的作用', to: '/docs/全球观察/us-itin-guide' },
              { label: 'AI改写跨境套利', to: '/docs/全球观察/ai-arbitrage' },
              { label: '链上数据分析', to: '/docs/全球观察/链上数据分析（On-Chain Analysis）' },
              { label: '币安1011事件分析', to: '/docs/全球观察/加密货币币安1011分析' },
            ],
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [],
        copyright: ' ',
      },
    }),
};

export default config;