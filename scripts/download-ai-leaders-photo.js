const fs = require('fs');
const path = require('path');
const https = require('https');

// 使用我们之前用于生成长桥证券图片的同样API
const imagePrompt = encodeURIComponent("Sam Altman and Dario Amodei in a professional side-by-side comparison photo, realistic portrait, high quality, 35mm film photography, warm lighting, professional headshot, both looking at camera, sharp focus, natural expression, 16:9 landscape");

const imageUrl = `https://trae-api-cn.mchost.guru/api/ide/v1/text-to-image?prompt=${imagePrompt}&image_size=landscape_16_9`;

const outputPath = path.join(__dirname, '..', 'static', 'img', 'sam-altman-dario-amodei-comparison-photo.jpg');

console.log('正在生成图片...');

https.get(imageUrl, (response) => {
  if (response.statusCode !== 200) {
    console.error(`请求失败，状态码: ${response.statusCode}`);
    return;
  }

  const chunks = [];
  response.on('data', (chunk) => chunks.push(chunk));
  response.on('end', () => {
    const buffer = Buffer.concat(chunks);
    
    // 确保目录存在
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    
    // 保存图片
    fs.writeFileSync(outputPath, buffer);
    
    const fileSizeKB = (buffer.length / 1024).toFixed(1);
    console.log(`✅ 图片已保存: ${outputPath}`);
    console.log(`   文件大小: ${fileSizeKB} KB`);
    console.log(`   现在请重新运行缩略图提取脚本: node scripts/extract-doc-thumbnails.js`);
  });
}).on('error', (err) => {
  console.error('下载图片失败:', err);
});