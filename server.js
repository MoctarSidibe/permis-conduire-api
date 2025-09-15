const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Sample data - in production, use a database
const licenses = {
  "1B002719840316": {
    id: "1B002719840316",
    numero: "1B002719840316",
    nom: "MANDOUKOU",
    prenom: "MOUSSAVOU",
    date_naissance: "16/03/1984",
    lieu_naissance: "Libreville",
    groupe_sanguin: "A+",
    addresse: "LIBREVILLE",
    delivre_par: "DGTT À Libreville",
    date_delivrance: "15/05/2023",
    date_expiration: "15/05/2033"
  }
};

// Middleware
app.use(express.static('public'));
app.use(express.json());

// Routes
app.get('/:id', (req, res) => {
  const license = licenses[req.params.id];
  if (!license) {
    return res.status(404).json({ error: 'License not found' });
  }
  res.json(license);
});

app.get('/display/:id', (req, res) => {
  const license = licenses[req.params.id];
  if (!license) {
    return res.status(404).send('License not found');
  }
  
  const html = `
  <!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Permis de Conduire - ${license.prenom} ${license.nom}</title>
    <link rel="stylesheet" href="/style.css">
  </head>
  <body>
    <div class="license-container">
      <div class="license-header">
        <h1>République Gabonaise</h1>
        <h2>Permis de Conduire</h2>
      </div>
      
      <div class="license-body">
        <div class="license-photo">
          <div class="photo-placeholder">Photo</div>
        </div>
        
        <div class="license-details">
          <div class="detail-row">
            <span class="label">N°:</span>
            <span class="value">${license.numero}</span>
          </div>
          <div class="detail-row">
            <span class="label">Nom:</span>
            <span class="value">${license.nom}</span>
          </div>
          <div class="detail-row">
            <span class="label">Prénom:</span>
            <span class="value">${license.prenom}</span>
          </div>
          <div class="detail-row">
            <span class="label">Date de Naissance:</span>
            <span class="value">${license.date_naissance}</span>
          </div>
          <div class="detail-row">
            <span class="label">Lieu de Naissance:</span>
            <span class="value">${license.lieu_naissance}</span>
          </div>
          <div class="detail-row">
            <span class="label">Groupe Sanguin:</span>
            <span class="value">${license.groupe_sanguin}</span>
          </div>
          <div class="detail-row">
            <span class="label">Adresse:</span>
            <span class="value">${license.addresse}</span>
          </div>
          <div class="detail-row">
            <span class="label">Délivré par:</span>
            <span class="value">${license.delivre_par}</span>
          </div>
          <div class="detail-row">
            <span class="label">Délivré le:</span>
            <span class="value">${license.date_delivrance}</span>
          </div>
          <div class="detail-row">
            <span class="label">Expire le:</span>
            <span class="value">${license.date_expiration}</span>
          </div>
        </div>
      </div>
      
      <div class="license-footer">
        <p>Document officiel - République Gabonaise</p>
      </div>
    </div>
  </body>
  </html>
  `;
  
  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});