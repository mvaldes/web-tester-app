const request = require('supertest');
const fs = require('fs');
const path = require('path');

const config = JSON.parse(fs.readFileSync('config/urls.json', 'utf-8'));
const results = [];

describe('Dynamic API Tests', () => {
  config.backendAPIs.forEach(api => {
    it(`${api.method} ${api.url} should return 200`, async () => {
      const res = await request(api.url).get('');
      const passed = res.statusCode === 200;
      results.push({ url: api.url, status: res.statusCode, passed });
      expect(passed).toBe(true);
    });
  });

  afterAll(() => {
    fs.mkdirSync('reports', { recursive: true });
    fs.writeFileSync('reports/api-results.json', JSON.stringify(results, null, 2));
    console.log('API test results saved to reports/api-results.json');
  });
});
