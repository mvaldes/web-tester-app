const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;

app.use('/reports', express.static(path.join(__dirname, 'reports')));
app.use('/', express.static(path.join(__dirname, 'dashboard')));

app.listen(PORT, () => {
  console.log(`Dashboard disponible sur http://localhost:${PORT}`);
});
