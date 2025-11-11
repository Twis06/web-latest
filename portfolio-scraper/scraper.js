import puppeteer from 'puppeteer';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const PORTFOLIO_URL = 'https://peiyangli104.cargo.site/'; // Replace with your portfolio URL
const DOWNLOAD_DIR = path.join(__dirname, 'downloaded-images');

// Ensure download directory exists
if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
}

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

// Main scraper function
async function scrapePortfolio() {
  console.log('🚀 Starting portfolio scraper...\n');
  
  const browser = await puppeteer.launch({
    headless: false, // Set to true for background execution
    defaultViewport: null
  });

  try {
    const page = await browser.newPage();
    
    // Navigate to portfolio
    console.log(`📂 Opening portfolio: ${PORTFOLIO_URL}`);
    await page.goto(PORTFOLIO_URL, { 
      waitUntil: 'networkidle2',
      timeout: 60000 
    });

    // Wait for images to load
    console.log('⏳ Waiting for images to load...\n');
    await page.waitForSelector('img', { timeout: 30000 });
    
    // Scroll to load lazy images
    await autoScroll(page);

    // Extract all image URLs
    const imageUrls = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      return images
        .map(img => img.src)
        .filter(src => src && (
          src.includes('freight.cargo.site') || 
          src.includes('cargo.site')
        ))
        .filter(src => !src.includes('favicon') && !src.includes('logo'));
    });

    console.log(`\n📊 Found ${imageUrls.length} images to download\n`);

    // Download each image
    let successCount = 0;
    for (let i = 0; i < imageUrls.length; i++) {
      const url = imageUrls[i];
      const filename = extractFilename(url) || `image-${i + 1}.jpg`;
      
      console.log(`[${i + 1}/${imageUrls.length}] Downloading: ${filename}`);
      await downloadImage(url, filename);
      successCount++;
      
      // Small delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log(`\n✅ Download complete! ${successCount}/${imageUrls.length} images saved to ${DOWNLOAD_DIR}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
}

// Helper function to extract filename from URL
function extractFilename(url) {
  try {
    const urlParts = url.split('/');
    const filename = urlParts[urlParts.length - 1];
    
    // If it's a Cargo URL with unique ID, extract the actual filename
    if (filename.includes('.')) {
      return filename.split('?')[0]; // Remove query parameters
    }
    
    return null;
  } catch (error) {
    return null;
  }
}

// Auto-scroll function to trigger lazy loading
async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 300;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 200);
    });
  });
  
  // Wait a bit after scrolling
  await new Promise(resolve => setTimeout(resolve, 2000));
}

// Run the scraper
scrapePortfolio();
