const { launch } = require('chrome-launcher');
const lighthouse = require('lighthouse');
const fs = require('fs');
const path = require('path');

const config = JSON.parse(fs.readFileSync('config/urls.json', 'utf-8'));

(async () => {
  for (const url of config.frontendURLs) {
    const chrome = await launch({ chromeFlags: ['--headless'] });
    const options = { port: chrome.port, output: 'html' };
    const result = await lighthouse(url, options);
    const reportHtml = result.report;
    const safeName = url.replace(/https?:\/\//, '').replace(/\W+/g, '_');
    const reportPath = path.join('reports', `lighthouse-${safeName}.html`);
    fs.mkdirSync('reports', { recursive: true });
    fs.writeFileSync(reportPath, reportHtml);
    console.log(`Lighthouse report saved: ${reportPath}`);
    await chrome.kill();
  }
})();
