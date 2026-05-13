# 漂哥出海之路 · Website

基于 [Docusaurus](https://docusaurus.io/) 的「资源全球运营与布局」出海攻略知识库。

## 内容结构

```text
docs/
  guide.md                    # 总目录索引
  foreign-banks/              # 国外银行
    digital-banks/            # 数字银行开户
    crypto-cards/             # 加密银行卡
  foreign-brokers/            # 国外券商
  crypto-web3/                # 加密 Web3
    platform-guides/          # 交易所与平台
  cross-border/               # 跨境出海
    playbooks/                # 落地攻略
  ai-era/                     # AI 时代
  ai-gallery/                 # AI 美女相册
    creative-guides/          # 创作 Prompt
```

新增文章时，只需把 Markdown 放到对应文件夹，**左侧目录与顶部导航会在 `npm start` / `npm run build` 时自动同步**（由 `scripts/sync-navbar.js` 处理）。

每篇文章建议保留如下 front matter：

```md
---
sidebar_label: 文章短标题
sidebar_position: 2
description: 文章一句话摘要，用于卡片列表与 SEO meta。
---

# 文章完整标题
```

## 本地开发

```bash
npm install
npm start
```

`npm start` 会先生成文章缩略图、同步导航栏，再启动 Docusaurus 开发服务器，大部分修改保存即可热更新。

## 构建与部署

```bash
npm run build
npm run serve   # 本地预览构建产物
```

构建产物输出到 `build/` 目录，可部署至任意静态托管服务。

## 自定义脚本

- `scripts/extract-doc-thumbnails.js`：扫描所有 Markdown，将首张图作为文章缩略图，复制到 `static/img/_doc-thumb/`，并写入 `src/data/docThumbnails.json`。
- `scripts/sync-navbar.js`：基于 `docs/` 目录与 `_category_.json` 重新生成 `docusaurus.config.js` 顶部导航与 `src/theme/SearchBar/index.js` 站内搜索索引。
- `scripts/compress-category-images.js`：批量压缩首页栏目卡片图片（`npm run compress:categories`）。
