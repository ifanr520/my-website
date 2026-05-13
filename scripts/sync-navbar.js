/**
 * Auto-syncs the navbar dropdown items in `docusaurus.config.js` and the
 * static search index in `src/theme/SearchBar/index.js` based on the docs/
 * folder structure.
 *
 * Generation rules:
 * - Every top-level docs folder becomes a left-side dropdown item.
 * - The dropdown header uses the label from `_category_.json`.
 * - The first entry of every dropdown is "栏目首页" linking to the
 *   generated category index page (`/docs/category/<slug>`).
 * - Subcategories (folders) become emoji-prefixed group rows.
 * - Articles (.md/.mdx files) are sorted by `sidebar_position` (front
 *   matter), then by `sidebar_label` / file name. Title is read from
 *   `sidebar_label`, otherwise from the first H1, otherwise from the slug.
 */
const fs = require('fs');
const path = require('path');

const siteDir = path.join(__dirname, '..');
const docsDir = path.join(siteDir, 'docs');
const configPath = path.join(siteDir, 'docusaurus.config.js');
const searchBarPath = path.join(siteDir, 'src', 'theme', 'SearchBar', 'index.js');

const TOP_ORDER = [
  'foreign-banks',
  'foreign-brokers',
  'crypto-web3',
  'cross-border',
  'ai-era',
  'ai-gallery',
];

function readJsonSafe(p) {
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch (e) {
    return null;
  }
}

function parseFrontMatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  const out = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*:\s*(.+?)\s*$/);
    if (!kv) continue;
    let v = kv[2].trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    out[kv[1]] = v;
  }
  return out;
}

function firstH1(raw) {
  const body = raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '');
  const m = body.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : null;
}

function fileLabel(filePath, slug) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const fm = parseFrontMatter(raw);
  if (fm.sidebar_label) return fm.sidebar_label;
  if (fm.title) return fm.title;
  const h1 = firstH1(raw);
  if (h1) return h1;
  return slug;
}

function filePosition(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const fm = parseFrontMatter(raw);
  const v = parseFloat(fm.sidebar_position);
  return Number.isFinite(v) ? v : 999;
}

function categoryMeta(folder) {
  const meta = readJsonSafe(path.join(folder, '_category_.json')) || {};
  return {
    label: meta.label || path.basename(folder),
    position: typeof meta.position === 'number' ? meta.position : 999,
    slug: meta.link?.slug || null,
  };
}

function listMdFiles(folder) {
  if (!fs.existsSync(folder)) return [];
  return fs
    .readdirSync(folder, {withFileTypes: true})
    .filter((e) => e.isFile() && /\.mdx?$/i.test(e.name))
    .map((e) => path.join(folder, e.name));
}

function listSubdirs(folder) {
  if (!fs.existsSync(folder)) return [];
  return fs
    .readdirSync(folder, {withFileTypes: true})
    .filter((e) => e.isDirectory())
    .map((e) => path.join(folder, e.name));
}

function relativeDocPath(filePath) {
  // Returns the docs URL without leading slash, e.g. foreign-banks/digital-banks/za-bank
  const rel = path
    .relative(docsDir, filePath)
    .replace(/\\/g, '/')
    .replace(/\.mdx?$/i, '');
  return rel;
}

function buildArticleEntry(filePath) {
  const slug = relativeDocPath(filePath);
  const label = fileLabel(filePath, path.basename(filePath, path.extname(filePath)));
  const position = filePosition(filePath);
  return {
    label,
    to: `/docs/${slug}`,
    position,
    docId: slug,
  };
}

function buildCategoryItems(folder) {
  // Returns flat list of dropdown menu items for a top-level category.
  // Subcategories are rendered as a label header followed by their articles.
  const directArticles = listMdFiles(folder)
    .map(buildArticleEntry)
    .sort(
      (a, b) =>
        a.position - b.position || a.label.localeCompare(b.label, 'zh-Hans-CN'),
    );

  const subdirs = listSubdirs(folder)
    .map((d) => ({dir: d, meta: categoryMeta(d)}))
    .sort(
      (a, b) =>
        a.meta.position - b.meta.position ||
        a.meta.label.localeCompare(b.meta.label, 'zh-Hans-CN'),
    );

  const items = [...directArticles];
  for (const {dir, meta} of subdirs) {
    const articles = listMdFiles(dir)
      .map(buildArticleEntry)
      .sort(
        (a, b) =>
          a.position - b.position || a.label.localeCompare(b.label, 'zh-Hans-CN'),
      );
    if (articles.length === 0) continue;
    items.push({
      type: 'separator',
      label: meta.label,
      slug: meta.slug,
    });
    items.push(...articles);
  }
  return items;
}

function escapeJs(str) {
  return String(str).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function buildNavbar() {
  const topDirs = listSubdirs(docsDir)
    .map((d) => ({dir: d, meta: categoryMeta(d)}))
    .sort((a, b) => {
      const ai = TOP_ORDER.indexOf(path.basename(a.dir));
      const bi = TOP_ORDER.indexOf(path.basename(b.dir));
      const aw = ai === -1 ? 999 : ai;
      const bw = bi === -1 ? 999 : bi;
      return aw - bw || a.meta.position - b.meta.position;
    });

  const navItems = topDirs.map(({dir, meta}) => {
    const items = buildCategoryItems(dir);
    const indexLink =
      meta.slug ? `/docs${meta.slug}` : `/docs/category/${path.basename(dir)}`;
    return {
      label: meta.label,
      indexLink,
      items,
    };
  });

  return navItems;
}

function renderNavbarItems(navItems) {
  // Returns a JS source snippet of the items array (without surrounding `items: [ ... ],`).
  const indent = '          ';
  const innerIndent = '              ';

  const dropdowns = navItems.map((cat) => {
    const lines = [];
    lines.push(`${innerIndent}{ label: '栏目首页', to: '${escapeJs(cat.indexLink)}' }`);
    for (const it of cat.items) {
      if (it.type === 'separator') {
        const txt = it.slug
          ? `{ label: '${escapeJs(it.label)}', to: '/docs${escapeJs(it.slug)}', className: 'navbar-dropdown-section' }`
          : `{ label: '${escapeJs(it.label)}', to: '${escapeJs(cat.indexLink)}', className: 'navbar-dropdown-section' }`;
        lines.push(`${innerIndent}${txt}`);
      } else {
        lines.push(
          `${innerIndent}{ label: '${escapeJs(it.label)}', to: '${escapeJs(it.to)}' }`,
        );
      }
    }
    return `${indent}{
${indent}  label: '${escapeJs(cat.label)}',
${indent}  position: 'left',
${indent}  items: [
${lines.join(',\n')},
${indent}  ],
${indent}}`;
  });

  return dropdowns.join(',\n');
}

function updateConfig(navItems) {
  let config = fs.readFileSync(configPath, 'utf8');
  const itemsBlock = renderNavbarItems(navItems);

  // Replace the navbar.items: [...] block.
  // Match from the FIRST `items: [` after `navbar:` up to the matching closing `]`.
  const navbarIdx = config.indexOf('navbar:');
  if (navbarIdx === -1) {
    throw new Error('navbar block not found');
  }

  const itemsStart = config.indexOf('items: [', navbarIdx);
  if (itemsStart === -1) {
    throw new Error('items: [ not found inside navbar');
  }

  // Find matching closing bracket for items: [
  let depth = 0;
  let i = config.indexOf('[', itemsStart);
  let end = -1;
  for (; i < config.length; i++) {
    const c = config[i];
    if (c === '[') depth++;
    else if (c === ']') {
      depth--;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  if (end === -1) throw new Error('Could not find matching ] for items array');

  const before = config.slice(0, itemsStart);
  const after = config.slice(end + 1);

  const replacement = `items: [\n${itemsBlock},\n        ]`;
  config = before + replacement + after;
  fs.writeFileSync(configPath, config, 'utf8');
}

function buildSearchItems(navItems) {
  const items = [
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
  ];

  for (const cat of navItems) {
    items.push({
      title: cat.label,
      description: `${cat.label}栏目所有攻略、对比与实操记录。`,
      url: cat.indexLink,
      keywords: cat.label,
    });
    for (const it of cat.items) {
      if (it.type === 'separator') continue;
      items.push({
        title: it.label,
        description: `${cat.label} · ${it.label}`,
        url: it.to,
        keywords: `${cat.label} ${it.label}`,
      });
    }
  }

  return items;
}

function updateSearchBar(navItems) {
  let src = fs.readFileSync(searchBarPath, 'utf8');
  const start = src.indexOf('const searchItems = [');
  if (start === -1) {
    console.warn('searchItems block not found in SearchBar/index.js, skipping');
    return;
  }
  const arrayStart = src.indexOf('[', start);
  let depth = 0;
  let end = -1;
  for (let i = arrayStart; i < src.length; i++) {
    const c = src[i];
    if (c === '[') depth++;
    else if (c === ']') {
      depth--;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  if (end === -1) {
    console.warn('searchItems array end not found, skipping');
    return;
  }

  const items = buildSearchItems(navItems);
  const itemsSrc = items
    .map(
      (it) =>
        `  {
    title: '${escapeJs(it.title)}',
    description: '${escapeJs(it.description)}',
    url: '${escapeJs(it.url)}',
    keywords: '${escapeJs(it.keywords)}',
  }`,
    )
    .join(',\n');

  src =
    src.slice(0, arrayStart) +
    `[\n${itemsSrc},\n]` +
    src.slice(end + 1);
  fs.writeFileSync(searchBarPath, src, 'utf8');
}

try {
  const navItems = buildNavbar();
  updateConfig(navItems);
  updateSearchBar(navItems);
  console.log('Navbar synced:');
  for (const c of navItems) {
    const articleCount = c.items.filter((it) => it.type !== 'separator').length;
    console.log(`  ${c.label}  (${articleCount} 篇)`);
  }
} catch (err) {
  console.error('sync-navbar error:', err.message);
  console.error(err.stack);
  process.exit(1);
}
