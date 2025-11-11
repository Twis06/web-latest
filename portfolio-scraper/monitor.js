import puppeteer from 'puppeteer';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOWNLOAD_DIR = path.join(__dirname, 'downloaded-images');

// Ensure download directory exists
if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
}

// Keep track of downloaded images with their sizes
const imageTracker = new Map(); // filename -> { url, size, downloaded }

// Function to download an image
async function downloadImage(url, filename) {
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
      timeout: 30000
    });

    const filepath = path.join(DOWNLOAD_DIR, filename);
    const writer = fs.createWriteStream(filepath);

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        console.log(`✓ Downloaded: ${filename}`);
        resolve();
      });
      writer.on('error', reject);
    });
  } catch (error) {
    console.error(`✗ Failed to download ${filename}:`, error.message);
  }
}

// Extract base filename (without size indicators)
function getBaseFilename(url) {
  try {
    const urlParts = url.split('/');
    let filename = urlParts[urlParts.length - 1].split('?')[0];
    
    // Remove size indicators like 't_', 'w_', etc from Cargo URLs
    // Keep the actual image name (like CAM08439.jpg)
    const match = filename.match(/([A-Z0-9]+\.(jpg|jpeg|png|gif|webp))/i);
    if (match) {
      return match[1];
    }
    
    return filename;
  } catch (error) {
    return `image-${Date.now()}.jpg`;
  }
}

// Determine if URL is high quality (contains 'original' or has larger dimensions)
function getImageQuality(url) {
  if (url.includes('/original/') || url.includes('t/original')) {
    return { quality: 'original', priority: 3 };
  }
  if (url.includes('/large/') || url.includes('w_1920') || url.includes('w_2560')) {
    return { quality: 'large', priority: 2 };
  }
  if (url.includes('/medium/') || url.includes('w_1280') || url.includes('w_800')) {
    return { quality: 'medium', priority: 1 };
  }
  // Thumbnails, previews, small versions
  if (url.includes('/thumb/') || url.includes('w_400') || url.includes('w_200') || url.includes('t_thumb')) {
    return { quality: 'thumbnail', priority: 0 };
  }
  
  return { quality: 'unknown', priority: 1 };
}

// Main monitor function
async function monitorImages() {
  console.log('🚀 Starting image monitor...\n');
  console.log('📋 Instructions:');
  console.log('   1. A browser window will open');
  console.log('   2. Log in to your Cargo site');
  console.log('   3. Navigate through your portfolio');
  console.log('   4. Images will be automatically downloaded as they load\n');
  console.log('⚠️  Keep this terminal window open. Press Ctrl+C to stop.\n');
  
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized']
  });

  try {
    const page = await browser.newPage();
    
    // Set up request interception to monitor images
    await page.setRequestInterception(true);
    
    page.on('request', (request) => {
      request.continue();
    });

    page.on('response', async (response) => {
      const url = response.url();
      const contentType = response.headers()['content-type'] || '';
      
      // Check if it's an image from Cargo CDN
      if (
        (contentType.includes('image') || 
         url.match(/\.(jpg|jpeg|png|gif|webp)$/i)) &&
        (url.includes('freight.cargo.site') || url.includes('cargo.site')) &&
        !url.includes('favicon') &&
        !url.includes('logo')
      ) {
        const baseFilename = getBaseFilename(url);
        const quality = getImageQuality(url);
        
        // Skip thumbnails and low quality previews
        if (quality.priority === 0) {
          console.log(`⏭️  Skipping thumbnail: ${baseFilename}`);
          return;
        }
        
        const existing = imageTracker.get(baseFilename);
        
        if (!existing) {
          // New image - track it
          console.log(`📥 New image detected: ${baseFilename} (${quality.quality})`);
          imageTracker.set(baseFilename, {
            url: url,
            quality: quality,
            downloaded: false
          });
          
          // Download if it's original quality, otherwise wait for better version
          if (quality.priority >= 2) {
            imageTracker.get(baseFilename).downloaded = true;
            await downloadImage(url, baseFilename);
          } else {
            console.log(`⏳ Waiting for higher quality version of ${baseFilename}...`);
          }
        } else if (quality.priority > existing.quality.priority) {
          // Found higher quality version
          console.log(`⬆️  Found higher quality: ${baseFilename} (${quality.quality} > ${existing.quality.quality})`);
          
          // Update tracker
          imageTracker.set(baseFilename, {
            url: url,
            quality: quality,
            downloaded: false
          });
          
          // Delete old file if exists
          const filepath = path.join(DOWNLOAD_DIR, baseFilename);
          if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
            console.log(`�️  Replaced old version of ${baseFilename}`);
          }
          
          // Download new version
          imageTracker.get(baseFilename).downloaded = true;
          await downloadImage(url, baseFilename);
        }
      }
    });

    // Navigate to the edit page
    console.log('🌐 Opening Cargo site...\n');
    await page.goto('https://peiyangli104.cargo.site/edit/Q2222252041', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });

    console.log('✅ Ready! Navigate through your portfolio to download images.\n');
    console.log(`📁 Images will be saved to: ${DOWNLOAD_DIR}\n`);
    console.log('💡 Tip: Scroll through all your pages to load all images.\n');

    // Keep the browser open indefinitely
    await new Promise(() => {});

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n\n🛑 Stopping image monitor...');
  
  // Download any remaining high-quality images that weren't downloaded yet
  console.log('\n📊 Final check for undownloaded images...');
  for (const [filename, data] of imageTracker.entries()) {
    if (!data.downloaded && data.quality.priority >= 1) {
      console.log(`📥 Downloading final version: ${filename}`);
      await downloadImage(data.url, filename);
    }
  }
  
  console.log(`\n✅ Downloaded ${imageTracker.size} unique images to ${DOWNLOAD_DIR}`);
  process.exit(0);
});

// Run the monitor
monitorImages();
