const { exec } = require('child_process');
const fs = require('fs');
const sendEmail = require('./services/send-email');

console.log("=== Lancement des tests frontend et backend ===");

exec('npm run test', (err, stdout, stderr) => {
  if (err) {
    console.error('Erreur pendant les tests :', stderr);
  }
  console.log(stdout);

  let summary = '\nRésultats des tests:\n';

  const lighthouseFiles = fs.readdirSync('./reports').filter(f => f.startsWith('lighthouse') && f.endsWith('.html'));
  summary += `\n- Lighthouse: ${lighthouseFiles.length} rapport(s) généré(s)`;

  const axeFiles = fs.readdirSync('./reports').filter(f => f.startsWith('accessibility') && f.endsWith('.json'));
  let totalViolations = 0;
  for (const file of axeFiles) {
    const data = JSON.parse(fs.readFileSync(`./reports/${file}`));
    totalViolations += data.length;
  }
  summary += `\n- Accessibilité: ${totalViolations} violation(s) détectée(s) sur ${axeFiles.length} page(s)`;

  const apiPath = './reports/api-results.json';
  if (fs.existsSync(apiPath)) {
    const apiResults = JSON.parse(fs.readFileSync(apiPath));
    const passed = apiResults.filter(r => r.passed).length;
    const failed = apiResults.length - passed;
    summary += `\n- API: ${passed} succès / ${failed} échec(s)`;
  }

  console.log(summary);

  sendEmail({
    subject: 'Web Tester - Résumé des tests',
    text: `Les tests ont été exécutés avec les résultats suivants :\n${summary}`
  });

  console.log("\n=== Lancement du dashboard sur http://localhost:3000 ===");
  exec('npm run serve');
});
