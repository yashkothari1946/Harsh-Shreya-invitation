const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

// Images that are critical for hero / above-the-fold — compress aggressively
const heroImages = [
  { input: 'udaipur_bg.jpg',   outputWebp: 'udaipur_bg.webp',   width: 1920, quality: 72 },
  { input: 'udaipur_gate.jpg', outputWebp: 'udaipur_gate.webp', width: 1920, quality: 72 },
  { input: 'procession.jpg',   outputWebp: 'procession.webp',   width: 1600, quality: 70 },
];

// All other images — compress JPG in-place to reduce size
const allImages = fs.readdirSync(publicDir).filter(f =>
  /\.(jpg|jpeg)$/i.test(f) && !heroImages.find(h => h.input === f)
);

async function run() {
  // 1. Process hero images → WebP + fallback compressed JPG
  for (const img of heroImages) {
    const inputPath  = path.join(publicDir, img.input);
    const webpPath   = path.join(publicDir, img.outputWebp);

    if (!fs.existsSync(inputPath)) {
      console.log(`SKIP (not found): ${img.input}`);
      continue;
    }

    const originalSize = (fs.statSync(inputPath).size / 1024).toFixed(1);

    // WebP version
    await sharp(inputPath)
      .resize({ width: img.width, withoutEnlargement: true })
      .webp({ quality: img.quality, effort: 6 })
      .toFile(webpPath);

    const webpSize = (fs.statSync(webpPath).size / 1024).toFixed(1);

    // Recompress original JPG in-place (fallback)
    const tempPath = inputPath + '.tmp';
    await sharp(inputPath)
      .resize({ width: img.width, withoutEnlargement: true })
      .jpeg({ quality: img.quality, mozjpeg: true, progressive: true })
      .toFile(tempPath);
    fs.renameSync(tempPath, inputPath);
    const jpgSize = (fs.statSync(inputPath).size / 1024).toFixed(1);

    console.log(`✓ ${img.input}: ${originalSize}KB → WebP ${webpSize}KB | JPG ${jpgSize}KB`);
  }

  // 2. Recompress other large JPGs
  for (const file of allImages) {
    const filePath = path.join(publicDir, file);
    const originalSize = fs.statSync(filePath).size / 1024;
    if (originalSize < 300) { console.log(`SKIP (small): ${file}`); continue; }

    const tempPath = filePath + '.tmp';
    await sharp(filePath)
      .resize({ width: 1400, withoutEnlargement: true })
      .jpeg({ quality: 70, mozjpeg: true, progressive: true })
      .toFile(tempPath);
    fs.renameSync(tempPath, filePath);
    const newSize = (fs.statSync(filePath).size / 1024).toFixed(1);
    console.log(`✓ ${file}: ${originalSize.toFixed(1)}KB → ${newSize}KB`);
  }

  console.log('\n✅ All images optimized!');
}

run().catch(console.error);
