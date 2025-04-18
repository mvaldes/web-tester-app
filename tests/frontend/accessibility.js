const { AxePuppeteer } = require('@axe-core/puppeteer');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const config = JSON.parse(fs.readFileSync('config/urls.json', 'utf-8'));
fs.mkdirSync('reports', { recursive: true });

(async () => {
  const browser = await puppeteer.launch();
  for (const url of config.frontendURLs) {
    const page = await browser.newPage();
    console.log(`\n=== Running Accessibility Audit on: ${url} ===`);
    await page.goto(url);
    const results = await new AxePuppeteer(page).analyze();
    const safeName = url.replace(/https?:\/\//, '').replace(/\W+/g, '_');
    const reportPath = path.join('reports', `accessibility-${safeName}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(results.violations, null, 2));
    console.log(`Accessibility report saved: ${reportPath}`);
    await page.close();
  }
  await browser.close();
})();
