const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

function downloadFromUrl(url, outputPath) {
  const protocol = url.startsWith('https') ? https : http;
  
  return new Promise((resolve, reject) => {
    protocol.get(url, (response) => {
      console.log('Status:', response.statusCode);
      
      if (response.statusCode === 302 || response.statusCode === 301) {
        console.log('Following redirect to:', response.headers.location);
        return downloadFromUrl(response.headers.location, outputPath)
          .then(resolve)
          .catch(reject);
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed with status: ${response.statusCode}`));
        return;
      }
      
      const chunks = [];
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', () => {
        const buffer = Buffer.concat(chunks);
        fs.writeFileSync(outputPath, buffer);
        console.log(`✅ Saved image to: ${outputPath}`);
        console.log(`File size: ${(buffer.length / 1024).toFixed(1)} KB`);
        resolve();
      });
    }).on('error', reject);
  });
}

const prompt = encodeURIComponent("Sam Altman and Dario Amodei, professional business portrait, side-by-side comparison, realistic high-quality photograph, 35mm film style, natural lighting, office background, shot with DSLR camera, ultra-detailed, colorful, sharp focus");
const imageUrl = `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${prompt}&image_size=landscape_16_9`;
const outputPath = path.join(__dirname, '..', 'docs', 'ai-era', 'sam-altman-dario-amodei.jpg');

console.log('Downloading image...');
downloadFromUrl(imageUrl, outputPath)
  .then(() => console.log('Done!'))
  .catch((err) => console.error('Error:', err));
