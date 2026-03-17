import axios from 'axios';
import fs from 'fs-extra';
import https from 'https';
import path from 'path';
import sharp from 'sharp';

async function downloadImage(url, filePath) {
  const agent = new https.Agent({
    rejectUnauthorized: false, // Bypasses SSL certificate verification
  });

  const response = await axios({
    httpsAgent: agent,
    url,
    method: 'GET',
    responseType: 'stream',
  });

  await new Promise((resolve, reject) => {
    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);
    writer.on('finish', resolve);
    writer.on('error', reject);
  });

  return filePath;
}

async function convertToWebP(inputPath, outputPath) {
  await sharp(inputPath).webp().toFile(outputPath);
}

async function processImage(url) {
  const fileName = path.basename(url);
  const ext = path.extname(fileName).toLowerCase();
  const baseName = path.basename(fileName, ext);
  const tempPath = path.join(process.cwd(), 'temp', fileName);

  // Download the image
  await downloadImage(url, tempPath);

  const outputPath = path.join(process.cwd(), 'temp', `${baseName}.webp`);

  // Convert to WebP if not already WebP
  if (ext !== '.webp') {
    await convertToWebP(tempPath, outputPath);
    fs.removeSync(tempPath); // Remove the original image
  } else {
    fs.renameSync(tempPath, outputPath); // Rename WebP file
  }

  return outputPath;
}

export default processImage;
