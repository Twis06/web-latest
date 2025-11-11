# Portfolio Image Scraper

This tool automatically downloads all images from your Cargo portfolio website.

## Setup

1. Install dependencies:
```bash
cd portfolio-scraper
npm install
```

## Usage

### Method 1: Automatic Scraping (Recommended)

Run the scraper to automatically find and download all images:

```bash
npm run scrape
```

The script will:
- Open your portfolio in a browser
- Scroll through the page to load all images
- Extract all image URLs
- Download them to `downloaded-images/` folder

### Method 2: Manual URL List

If you already have a list of image URLs, create a file called `urls.txt` with one URL per line, then run:

```bash
node download-from-list.js
```

## Configuration

Edit `scraper.js` to customize:
- `PORTFOLIO_URL`: Your portfolio website URL (currently: https://peiyangli104.cargo.site/)
- `headless`: Set to `true` to run browser in background
- Download delays and timeouts

## Output

All images will be saved to: `downloaded-images/`

## Notes

- The scraper runs with a visible browser window by default so you can see the progress
- Images are downloaded with their original filenames from the Cargo CDN
- A small delay between downloads prevents server overload
- The script automatically scrolls to trigger lazy-loaded images
