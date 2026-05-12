const fs = require('fs');
const path = require('path');

function scanDocs(dir, basePath = '') {
  const items = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const categoryName = entry.name;
      const categoryPath = path.join(dir, entry.name);
      const subItems = scanDocs(categoryPath, `${basePath}/${entry.name}`);

      items.push({
        type: 'category',
        label: categoryName,
        items: subItems
      });
    } else if (entry.name.endsWith('.md') && entry.name !== 'overview.md') {
      const fileName = entry.name.replace('.md', '');
      const docPath = `${basePath}/${fileName}`.replace(/^\//, '');
      items.push({
        type: 'doc',
        label: fileName,
        id: docPath
      });
    }
  }

  return items;
}

function generateNavbar() {
  const docsDir = path.join(__dirname, 'docs');
  const categories = fs.readdirSync(docsDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name);

  const navbarItems = categories.map(category => {
    const categoryPath = path.join(docsDir, category);
    const overviewExists = fs.existsSync(path.join(categoryPath, 'overview.md'));

    const subItems = [
      { label: '友情提示', to: `/docs/${category}/overview` }
    ];

    const entries = fs.readdirSync(categoryPath, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const subPath = path.join(categoryPath, entry.name);
        const subFiles = fs.readdirSync(subPath)
          .filter(f => f.endsWith('.md'))
          .map(f => ({
            label: f.replace('.md', ''),
            to: `/docs/${category}/${entry.name}/${f.replace('.md', '')}`
          }));
        subItems.push(...subFiles);
      } else if (entry.name.endsWith('.md') && entry.name !== 'overview.md') {
        subItems.push({
          label: entry.name.replace('.md', ''),
          to: `/docs/${category}/${entry.name.replace('.md', '')}`
        });
      }
    }

    return {
      label: category,
      position: 'left',
      items: subItems
    };
  });

  return navbarItems;
}

module.exports = { scanDocs, generateNavbar };
