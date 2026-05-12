const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '..', 'docs');

const categoryNameMap = {
  'foreign-banks': '国外银行',
  'foreign-brokers': '国外券商',
  'crypto-web3': '加密Web3',
  'cross-border': '跨境出海',
  'ai-era': 'AI时代',
  'ai-gallery': 'AI美女相册',
  'templates': '写作模板'
};

function getFilesRecursively(dir, basePath = '') {
  const items = [];
  if (!fs.existsSync(dir)) return items;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const subPath = path.join(dir, entry.name);
      const subItems = getFilesRecursively(subPath, `${basePath}/${entry.name}`);
      items.push(...subItems);
    } else if (entry.name.endsWith('.md') && entry.name !== 'overview.md') {
      items.push(`${basePath}/${entry.name.replace('.md', '')}`);
    }
  }
  return items;
}

function generateNavbarItems() {
  const categories = fs.readdirSync(docsDir, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .map(e => e.name);

  return categories.map(category => {
    const displayName = categoryNameMap[category] || category;
    const items = [{ label: '友情提示', to: `/docs/${category}/overview` }];

    const files = getFilesRecursively(path.join(docsDir, category), `/${category}`);

    for (const file of files) {
      const parts = file.split('/');
      const label = parts[parts.length - 1];
      items.push({ label, to: `/docs${file}` });
    }

    return {
      label: displayName,
      position: 'left',
      items
    };
  });
}

function updateConfig() {
  const navbarItems = generateNavbarItems();
  const twitterItem = { href: 'https://x.com/dangnightdrift', label: '推特', position: 'right' };

  const configPath = path.join(__dirname, '..', 'docusaurus.config.js');
  let config = fs.readFileSync(configPath, 'utf8');

  const itemsStr = navbarItems.map(item => {
    const inner = item.items.map(i => {
      if (i.to) {
        return `              { label: '${i.label}', to: '${i.to}' }`;
      }
      return '';
    }).filter(Boolean).join(',\n');
    return `          {
            label: '${item.label}',
            position: '${item.position}',
            items: [
${inner}
            ]
          }`;
  }).join(',\n');

  const newNavbarSection = `        items: [
${itemsStr},
          {
            href: '${twitterItem.href}',
            label: '${twitterItem.label}',
            position: '${twitterItem.position}'
          }
        ],`;

  const pattern = /items:\s*\[([\s\S]*?)\],\s*\n\s*\{ href:/;
  config = config.replace(pattern, newNavbarSection + '\n        {');

  fs.writeFileSync(configPath, config, 'utf8');
  console.log('Navbar synced successfully!');
  console.log('Categories found:', navbarItems.map(i => i.label).join(', '));
}

try {
  updateConfig();
} catch (err) {
  console.error('Error syncing navbar:', err.message);
  console.error(err.stack);
  process.exit(1);
}
