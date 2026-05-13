/**
 * Converts homepage category hero PNGs to compressed WebP for static/img.
 * Run: node scripts/compress-category-images.js
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imgDir = path.join(__dirname, '..', 'static', 'img');

async function main() {
  const files = fs.readdirSync(imgDir).filter((name) => /^category-.*\.png$/i.test(name));

  if (files.length === 0) {
    console.log('No category-*.png files found in static/img.');
    return;
  }

  for (const name of files) {
    const inputPath = path.join(imgDir, name);
    const base = name.replace(/\.png$/i, '');
    const outputPath = path.join(imgDir, `${base}.webp`);

    const inStat = fs.statSync(inputPath);

    await sharp(inputPath)
      .resize({
        width: 960,
        withoutEnlargement: true,
      })
      .webp({quality: 82, effort: 6})
      .toFile(outputPath);

    const outStat = fs.statSync(outputPath);
    const ratio = ((1 - outStat.size / inStat.size) * 100).toFixed(1);
    console.log(`${name} -> ${base}.webp  (${(inStat.size / 1024).toFixed(0)} KB -> ${(outStat.size / 1024).toFixed(0)} KB, ${ratio}% smaller)`);

    fs.unlinkSync(inputPath);
  }

  console.log('Done. PNG sources removed; use .webp paths in code.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
