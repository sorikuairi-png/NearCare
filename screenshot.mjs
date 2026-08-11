// Screenshot a localhost URL with Puppeteer for design/reference comparison.
// Usage: node screenshot.mjs <url> [label]
//   node screenshot.mjs http://localhost:3000
//   node screenshot.mjs http://localhost:3000 hero-section
//
// Saves to ./temporary screenshots/screenshot-N.png (auto-incremented, never overwritten),
// or screenshot-N-label.png if a label is given.

import puppeteer from 'puppeteer';
import fs from 'node:fs';
import path from 'node:path';

const url = process.argv[2];
const label = process.argv[3];

if (!url) {
  console.error('Usage: node screenshot.mjs <url> [label]');
  process.exit(1);
}
if (!/^https?:\/\/localhost(:\d+)?\//.test(url) && !/^https?:\/\/localhost(:\d+)?$/.test(url)) {
  console.error('Refusing to screenshot a non-localhost URL. Serve the project via serve.mjs first.');
  process.exit(1);
}

const OUT_DIR = path.join(process.cwd(), 'temporary screenshots');
fs.mkdirSync(OUT_DIR, { recursive: true });

function nextScreenshotPath() {
  const existing = fs.readdirSync(OUT_DIR).filter((f) => /^screenshot-\d+/.test(f));
  const nums = existing.map((f) => Number(f.match(/^screenshot-(\d+)/)[1]));
  const n = (nums.length ? Math.max(...nums) : 0) + 1;
  const suffix = label ? `-${label}` : '';
  return path.join(OUT_DIR, `screenshot-${n}${suffix}.png`);
}

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(url, { waitUntil: 'networkidle0' });

  const outPath = nextScreenshotPath();
  await page.screenshot({ path: outPath, fullPage: true });
  console.log(`Saved ${outPath}`);
} finally {
  await browser.close();
}
