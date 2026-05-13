/**
 * Scans all Markdown files under docs/ for markdown and HTML images (in file order).
 * Uses the first image in the body, or the third if the first is missing.
 * Copies relative image files into static/img/_doc-thumb and writes src/data/docThumbnails.json.
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const siteDir = path.join(__dirname, '..');
const docsDir = path.join(siteDir, 'docs');
const staticThumbDir = path.join(siteDir, 'static', 'img', '_doc-thumb');
const outFile = path.join(siteDir, 'src', 'data', 'docThumbnails.json');

function walkDocs(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walkDocs(p, acc);
    else if (/\.mdx?$/i.test(name)) acc.push(p);
  }
  return acc;
}

function stripFrontMatter(content) {
  const m = content.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n/);
  return m ? content.slice(m[0].length) : content;
}

function extractOrderedImageUrls(body) {
  const hits = [];
  const mdRe = /!\[[^\]]*\]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/g;
  let m;
  while ((m = mdRe.exec(body)) !== null) {
    hits.push({ index: m.index, url: m[1].trim() });
  }
  const htmlRe = /<img[^>]+src=["']([^"']+)["']/gi;
  while ((m = htmlRe.exec(body)) !== null) {
    hits.push({ index: m.index, url: m[1].trim() });
  }
  hits.sort((a, b) => a.index - b.index);
  return hits.map((h) => h.url).filter((u) => u && !u.startsWith('data:'));
}

function pickThumbnailUrl(urls) {
  if (urls[0]) return urls[0];
  if (urls[2]) return urls[2];
  return null;
}

function resolveToPublicUrl(docFilePath, rawUrl, docId) {
  if (/^https?:\/\//i.test(rawUrl)) return rawUrl;
  if (rawUrl.startsWith('/')) return rawUrl;
  const docDir = path.dirname(docFilePath);
  const resolvedFs = path.resolve(docDir, rawUrl);
  const docsRoot = path.resolve(docsDir);
  if (!resolvedFs.startsWith(docsRoot)) return null;
  if (!fs.existsSync(resolvedFs) || !fs.statSync(resolvedFs).isFile()) return null;

  fs.mkdirSync(staticThumbDir, { recursive: true });
  const hash = crypto.createHash('md5').update(resolvedFs).digest('hex').slice(0, 12);
  const ext = path.extname(resolvedFs) || '.png';
  const safeId = docId.replace(/[^a-zA-Z0-9-_]/g, '_').slice(0, 96);
  const destName = `${safeId}_${hash}${ext}`;
  const destPath = path.join(staticThumbDir, destName);
  fs.copyFileSync(resolvedFs, destPath);
  return `/img/_doc-thumb/${destName}`;
}

function main() {
  const files = walkDocs(docsDir);
  const map = {};

  for (const filePath of files) {
    const rel = path.relative(docsDir, filePath).replace(/\\/g, '/').replace(/\.mdx?$/i, '');
    const content = fs.readFileSync(filePath, 'utf8');
    const body = stripFrontMatter(content);
    const urls = extractOrderedImageUrls(body);
    let chosen = pickThumbnailUrl(urls);
    if (!chosen) continue;

    if (!/^https?:\/\//i.test(chosen) && !chosen.startsWith('/')) {
      chosen = resolveToPublicUrl(filePath, chosen, rel);
    }
    if (!chosen) continue;

    map[rel] = chosen;
  }

  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, `${JSON.stringify(map, null, 0)}\n`, 'utf8');
  console.log(
    `docThumbnails: ${Object.keys(map).length} docs (from ${files.length} files) -> ${path.relative(siteDir, outFile)}`,
  );
}

main();
