// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '漂哥出海之路',
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
          '漂哥出海之路,出海攻略,国外银行,国外券商,Web3,跨境出海,AI工具,AI美女相册,资源全球运营与布局',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'author',
        content: '漂哥',
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

  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      /** @type {import('@easyops-cn/docusaurus-search-local').Options} */
      ({
        hashed: true,
        language: ['zh', 'en'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        indexDocs: true,
        indexBlog: false,
        indexPages: true,
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        defaultMode: 'light',
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: '漂哥出海之路',
        hideOnScroll: false,
        logo: {
          alt: '漂哥出海之路',
          src: 'img/logo.svg',
        },
        items: [
          {
            label: '国外银行',
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
            ],
          },
          {
            label: '国外券商',
            position: 'left',
            items: [
              { label: '栏目首页', to: '/docs/category/foreign-brokers' },
              { label: '栏目说明', to: '/docs/foreign-brokers/intro' },
            ],
          },
          {
            label: '加密 Web3',
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
            ],
          },
          {
            label: 'AI 时代',
            position: 'left',
            items: [
              { label: '栏目首页', to: '/docs/category/ai-era' },
              { label: '栏目说明', to: '/docs/ai-era/intro' },
            ],
          },
          {
            label: 'AI 美女相册',
            position: 'left',
            items: [
              { label: '栏目首页', to: '/docs/category/ai-gallery' },
              { label: '创作 Prompt', to: '/docs/category/ai-gallery-prompts', className: 'navbar-dropdown-section' },
              { label: '相册制作工作流', to: '/docs/ai-gallery/creative-guides/workflow' },
              { label: '作品图集展示', to: '/docs/ai-gallery/creative-guides/gallery' },
            ],
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: '攻略栏目',
            items: [
              { label: '国外银行', to: '/docs/category/foreign-banks' },
              { label: '国外券商', to: '/docs/category/foreign-brokers' },
              { label: '加密 Web3', to: '/docs/category/crypto-web3' },
              { label: '跨境出海', to: '/docs/category/cross-border' },
              { label: 'AI 时代', to: '/docs/category/ai-era' },
              { label: 'AI 美女相册', to: '/docs/category/ai-gallery' },
            ],
          },
          {
            title: '站内',
            items: [
              { label: '出海攻略总览', to: '/docs/guide' },
              { label: '关于我', to: '/about' },
              { label: '金融免责声明', to: '/disclaimer' },
              { label: '友情链接申请', to: '/links' },
            ],
          },
          {
            title: '资源推荐',
            items: [
              { label: 'AI 美女相册轮播', to: '/ai-gallery-carousel' },
              { label: '出海工具栈合集', to: '/docs/category/cross-border' },
              { label: '加密银行卡对比', to: '/docs/category/crypto-cards' },
            ],
          },
          {
            title: '自媒体',
            items: [
              { label: '推特 / X', href: 'https://x.com/dangnightdrift' },
              { label: 'YouTube', href: 'https://www.youtube.com/@your-channel' },
              { label: 'Facebook', href: 'https://www.facebook.com/your-page' },
            ],
          },
        ],
        copyright: `<p class="footer-legal-snip">本站内容仅供信息参考，不构成任何投资建议、开户邀请或收益承诺；涉及跨境、银行、证券及加密资产等事项，请务必以监管机构及服务商最新披露为准。</p><p class="footer-icp-line">京ICP备01088888号-1 · 京公网安备11010502088888号</p><p class="footer-copy-line">© ${new Date().getFullYear()} 漂哥出海之路 · Built with Docusaurus</p>`,
      },
    }),
};

export default config;
