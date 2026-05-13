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

try {
  const navItems = buildNavbar();
  updateConfig(navItems);
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
