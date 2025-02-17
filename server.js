const express = require('express');
const path = require('path');
const app = express();

// Statische Dateien aus dem dist-Ordner servieren
app.use(express.static(path.join(__dirname, 'dist', 'myspa')));

// Alle Routen auf index.html umleiten
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'myspa', 'index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
