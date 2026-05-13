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
              { label: '友情提示', to: '/docs/foreign-banks/overview' },
              { label: 'ZA Bank 开户流程', to: '/docs/foreign-banks/application-guides/za-bank' },
              { label: 'Bitget Wallet × Fiat24', to: '/docs/foreign-banks/application-guides/bitget-wallet-card' },
              { label: 'SafePal Card', to: '/docs/foreign-banks/application-guides/safepal-card' },
              { label: 'Bybit Card', to: '/docs/foreign-banks/application-guides/bybit-card' },
              { label: 'Pokepay', to: '/docs/foreign-banks/application-guides/pokepay' },
              { label: 'UR Card', to: '/docs/foreign-banks/application-guides/ur-card' },
              { label: 'Wirex Card', to: '/docs/foreign-banks/application-guides/wirex-card' },
              { label: 'iFast Global Bank', to: '/docs/foreign-banks/application-guides/ifast-global-bank' },
            ],
          },
          {
            label: '国外券商',
            position: 'left',
            items: [
              { label: '友情提示', to: '/docs/foreign-brokers/overview' },
            ],
          },
          {
            label: '加密Web3',
            position: 'left',
            items: [
              { label: '友情提示', to: '/docs/crypto-web3/overview' },
            ],
          },
          {
            label: '跨境出海',
            position: 'left',
            items: [
              { label: '友情提示', to: '/docs/cross-border/overview' },
              { label: '境外资产通关路线图', to: '/docs/cross-border/playbooks/overseas-asset-roadmap' },
              { label: '出海网络环境部署', to: '/docs/cross-border/playbooks/overseas-network-setup' },
              { label: '全球知名合约', to: '/docs/cross-border/playbooks/全球知名合约' },
            ],
          },
          {
            label: 'AI时代',
            position: 'left',
            items: [
              { label: '友情提示', to: '/docs/ai-era/overview' },
              { label: 'AI美女相册轮播', to: '/ai-gallery-carousel' },
              { label: 'AI美女相册', to: '/docs/ai-gallery/overview' },
            ],
          },

          { href: 'https://x.com/dangnightdrift', label: '推特', position: 'right' },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: '攻略栏目',
            items: [
              { label: '国外银行', to: '/docs/category/国外银行' },
              { label: '国外券商', to: '/docs/category/国外券商' },
              { label: '加密 Web3', to: '/docs/category/加密-web3' },
              { label: '跨境出海', to: '/docs/category/跨境出海' },
              { label: 'AI 时代', to: '/docs/category/ai-时代' },
              { label: 'AI 美女相册', to: '/docs/category/ai-美女相册' },
            ],
          },
          {
            title: '站内',
            items: [
              { label: '出海攻略总览', to: '/docs/guide' },
              { label: '关于我', to: '/about' },
              { label: '金融免责声明', to: '/disclaimer' },
            ],
          },
          {
            title: '友情链接',
            items: [
              { label: '友链占位 · 合作方甲', href: 'https://example.com' },
              { label: '友链占位 · 合作方乙', href: 'https://example.org' },
            ],
          },
          {
            title: '自媒体',
            items: [
              { label: '油管', href: 'https://www.youtube.com/@your-channel' },
              { label: 'Facebook', href: 'https://www.facebook.com/your-page' },
              { label: '推特', href: 'https://x.com/dangnightdrift' },
            ],
          },
        ],
        copyright: `<p class="footer-legal-snip">本站内容仅供信息参考，不构成任何投资建议、开户邀请或收益承诺；涉及跨境、银行、证券及加密资产等事项，请务必以监管机构及服务商最新披露为准。</p><p class="footer-icp-line">京ICP备01088888号-1 · 京公网安备11010502088888号</p><p class="footer-copy-line">© ${new Date().getFullYear()} 漂哥出海之路 · Built with Docusaurus</p>`,
      },
    }),
};

export default config;
