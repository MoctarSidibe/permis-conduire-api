const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Sample data for all license types
const licenses = {
  // 1. Permis de conduire
  "permis-1B002719840316": {
    type: "permis",
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
  },
  
  // 2. License de Transport de Marchandises
  "ltm-0534256-6789": {
    type: "ltm",
    id: "0534256-6789",
    numero: "0534256-6789",
    nom_raison_sociale: "ZOU SONGJIANG",
    profession: "GERANT",
    immatriculation: "HN830 AA",
    marque_vehicule: "MITSUBISHI",
    type_vehicule: "L200 4x4 SC GL/AC",
    ptac: "2760 KG",
    police_assurance: "401V5A0015 Expire le 20/08/2025",
    visite_technique: "210477 Expire le 20/08/2025",
    itineraire: "Libreville, Toutes les directions",
    valable_du: "20/08/2025",
    valable_au: "20/08/2026"
  },
  
  // 3. Autorisation de conduire les vehicules automobiles administratifs
  "aca-1B002719840316": {
    type: "aca",
    id: "1B002719840316",
    numero: "1B002719840316",
    nom: "MOUSSAVOU MANDOUNKOU",
    prenom: "MOUSSAVOU MANDOUNKOU",
    date_naissance: "16/03/1984",
    lieu_naissance: "LIBREVILLE",
    groupe_sanguin: "A+",
    fonction: "CONSEILLER",
    administration: ""
  },
  
  // 4. Recepisse de declaration de mise en circulation du vehicule de l'Etat
  "recepisse-XX666AA": {
    type: "recepisse",
    id: "XX666AA",
    immatriculation: "XX 666 AA",
    chassis: "JTEJU9FJ5AK0017442",
    mise_circulation: "25/08/2025",
    departement: "PETROLE ET HYDROCARBURE",
    lieu: "LIBREVILLE",
    service_utilisateur: "CABINET DU MINISTRE",
    genre: "BUS",
    marque: "TOYOTA",
    type_vehicule: "COASTER",
    energie: "DIESEL",
    places_assises: "7",
    puissance: "6",
    poids_vide: "6",
    charge_utile: "6",
    poids_total: "50000",
    couleur: "ROUGE",
    precedent_immatriculation: "123456"
  },
  
  // 5. CERTIFICAT D'IMMATRICULATION
  "certificat-XX666AA": {
    type: "certificat",
    id: "XX666AA",
    immatriculation: "XX 666 AA",
    chassis: "JTEJU9FJ5AK0017442",
    mise_circulation: "25/08/2025",
    departement: "PETROLE ET HYDROCARBURE",
    lieu: "LIBREVILLE",
    service_utilisateur: "CABINET DU MINISTRE",
    genre: "BUS",
    marque: "TOYOTA",
    type_vehicule: "COASTER",
    energie: "DIESEL",
    places_assises: "7",
    puissance: "6",
    poids_vide: "6",
    charge_utile: "6",
    poids_total: "50000",
    couleur: "ROUGE",
    precedent_immatriculation: "123456"
  },
  
  // 6. FICHE D'ENREGISTREMENT
  "fiche-004": {
    type: "fiche",
    id: "004",
    numero_fiche: "004",
    pd_origine: "LKB5768HGFHJTG",
    nom: "MOUSSAVOU MANDOUNKOU",
    prenom: "MOUSSAVOU MANDOUNKOU",
    date_naissance: "16/03/1984",
    lieu_naissance: "LIBREVILLE"
  }
};

// Middleware
app.use(express.static('public'));
app.use(express.json());

// Routes
app.get('/:type/:id', (req, res) => {
  const license = licenses[`${req.params.type}-${req.params.id}`];
  if (!license) {
    return res.status(404).json({ error: 'License not found' });
  }
  res.json(license);
});

app.get('/display/:type/:id', (req, res) => {
  const license = licenses[`${req.params.type}-${req.params.id}`];
  if (!license) {
    return res.status(404).send('License not found');
  }
  
  let html = '';
  
  switch(license.type) {
    case 'permis':
      html = generatePermisHTML(license);
      break;
    case 'ltm':
      html = generateLTMHTML(license);
      break;
    case 'aca':
      html = generateACAHTML(license);
      break;
    case 'recepisse':
      html = generateRecepisseHTML(license);
      break;
    case 'certificat':
      html = generateCertificatHTML(license);
      break;
    case 'fiche':
      html = generateFicheHTML(license);
      break;
    default:
      return res.status(404).send('License type not found');
  }
  
  res.send(html);
});

// HTML generation functions for each license type
function generatePermisHTML(license) {
  return `
  <!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Permis de Conduire - ${license.prenom} ${license.nom}</title>
    <link rel="stylesheet" href="/style.css">
  </head>
  <body>
    <div class="license-container permis">
      <div class="license-header">
        <h1>République Gabonaise</h1>
        <h2>Permis de Conduire</h2>
      </div>
      
      <div class="license-body">
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
}

function generateLTMHTML(license) {
  return `
  <!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>License de Transport - ${license.nom_raison_sociale}</title>
    <link rel="stylesheet" href="/style.css">
  </head>
  <body>
    <div class="license-container ltm">
      <div class="license-header">
        <h1>République Gabonaise</h1>
        <h2>License de Transport de Marchandises</h2>
      </div>
      
      <div class="license-body">
        <div class="license-details">
          <div class="detail-row">
            <span class="label">LTM N°:</span>
            <span class="value">${license.numero}</span>
          </div>
          <div class="detail-row">
            <span class="label">Nom / Raison Sociale:</span>
            <span class="value">${license.nom_raison_sociale}</span>
          </div>
          <div class="detail-row">
            <span class="label">Profession:</span>
            <span class="value">${license.profession}</span>
          </div>
          <div class="detail-row">
            <span class="label">N° Immatriculation:</span>
            <span class="value">${license.immatriculation}</span>
          </div>
          <div class="detail-row">
            <span class="label">Marque Véhicule:</span>
            <span class="value">${license.marque_vehicule}</span>
          </div>
          <div class="detail-row">
            <span class="label">Type de Véhicule:</span>
            <span class="value">${license.type_vehicule}</span>
          </div>
          <div class="detail-row">
            <span class="label">PTAC:</span>
            <span class="value">${license.ptac}</span>
          </div>
          <div class="detail-row">
            <span class="label">N° Police Assurance:</span>
            <span class="value">${license.police_assurance}</span>
          </div>
          <div class="detail-row">
            <span class="label">N° Visite technique:</span>
            <span class="value">${license.visite_technique}</span>
          </div>
          <div class="detail-row">
            <span class="label">Itinéraire & Desserte:</span>
            <span class="value">${license.itineraire}</span>
          </div>
          <div class="detail-row">
            <span class="label">License Valable du:</span>
            <span class="value">${license.valable_du} Au ${license.valable_au}</span>
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
}

function generateACAHTML(license) {
  return `
  <!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Autorisation de Conduire - ${license.prenom} ${license.nom}</title>
    <link rel="stylesheet" href="/style.css">
  </head>
  <body>
    <div class="license-container aca">
      <div class="license-header">
        <h1>République Gabonaise</h1>
        <h2>Autorisation de Conduire les Véhicules Automobiles Administratifs</h2>
      </div>
      
      <div class="license-body">
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
            <span class="label">Date de naissance:</span>
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
            <span class="label">Fonction:</span>
            <span class="value">${license.fonction}</span>
          </div>
          <div class="detail-row">
            <span class="label">Administration:</span>
            <span class="value">${license.administration}</span>
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
}

function generateRecepisseHTML(license) {
  return `
  <!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Récépissé - ${license.immatriculation}</title>
    <link rel="stylesheet" href="/style.css">
  </head>
  <body>
    <div class="license-container recepisse">
      <div class="license-header">
        <h1>République Gabonaise</h1>
        <h2>Récépissé de Déclaration de Mise en Circulation du Véhicule de l'État</h2>
      </div>
      
      <div class="license-body">
        <div class="license-details">
          <div class="detail-row">
            <span class="label">Numéro d'immatriculation:</span>
            <span class="value">${license.immatriculation}</span>
          </div>
          <div class="detail-row">
            <span class="label">Numéro de Chassis:</span>
            <span class="value">${license.chassis}</span>
          </div>
          <div class="detail-row">
            <span class="label">Date de première mise en circulation:</span>
            <span class="value">${license.mise_circulation}</span>
          </div>
          <div class="detail-row">
            <span class="label">Département:</span>
            <span class="value">${license.departement}</span>
          </div>
          <div class="detail-row">
            <span class="label">Lieu:</span>
            <span class="value">${license.lieu}</span>
          </div>
          <div class="detail-row">
            <span class="label">Service Utilisateur:</span>
            <span class="value">${license.service_utilisateur}</span>
          </div>
          <div class="detail-row">
            <span class="label">Genre:</span>
            <span class="value">${license.genre}</span>
          </div>
          <div class="detail-row">
            <span class="label">Marque:</span>
            <span class="value">${license.marque}</span>
          </div>
          <div class="detail-row">
            <span class="label">Type de véhicule:</span>
            <span class="value">${license.type_vehicule}</span>
          </div>
          <div class="detail-row">
            <span class="label">Source d'énergie:</span>
            <span class="value">${license.energie}</span>
          </div>
          <div class="detail-row">
            <span class="label">Places assises:</span>
            <span class="value">${license.places_assises}</span>
          </div>
          <div class="detail-row">
            <span class="label">Puissance administrative:</span>
            <span class="value">${license.puissance}</span>
          </div>
          <div class="detail-row">
            <span class="label">Poids à vide:</span>
            <span class="value">${license.poids_vide}</span>
          </div>
          <div class="detail-row">
            <span class="label">Charge utile:</span>
            <span class="value">${license.charge_utile}</span>
          </div>
          <div class="detail-row">
            <span class="label">Poids totale autorisé en charge:</span>
            <span class="value">${license.poids_total}</span>
          </div>
          <div class="detail-row">
            <span class="label">Couleur:</span>
            <span class="value">${license.couleur}</span>
          </div>
          <div class="detail-row">
            <span class="label">Précédent numéro d'immatriculation:</span>
            <span class="value">${license.precedent_immatriculation}</span>
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
}

function generateCertificatHTML(license) {
  return `
  <!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Certificat d'Immatriculation - ${license.immatriculation}</title>
    <link rel="stylesheet" href="/style.css">
  </head>
  <body>
    <div class="license-container certificat">
      <div class="license-header">
        <h1>République Gabonaise</h1>
        <h2>Certificat d'Immatriculation</h2>
      </div>
      
      <div class="license-body">
        <div class="license-details">
          <div class="detail-row">
            <span class="label">Numéro d'immatriculation:</span>
            <span class="value">${license.immatriculation}</span>
          </div>
          <div class="detail-row">
            <span class="label">Numéro de Chassis:</span>
            <span class="value">${license.chassis}</span>
          </div>
          <div class="detail-row">
            <span class="label">Date de première mise en circulation:</span>
            <span class="value">${license.mise_circulation}</span>
          </div>
          <div class="detail-row">
            <span class="label">Département:</span>
            <span class="value">${license.departement}</span>
          </div>
          <div class="detail-row">
            <span class="label">Lieu:</span>
            <span class="value">${license.lieu}</span>
          </div>
          <div class="detail-row">
            <span class="label">Service Utilisateur:</span>
            <span class="value">${license.service_utilisateur}</span>
          </div>
          <div class="detail-row">
            <span class="label">Genre:</span>
            <span class="value">${license.genre}</span>
          </div>
          <div class="detail-row">
            <span class="label">Marque:</span>
            <span class="value">${license.marque}</span>
          </div>
          <div class="detail-row">
            <span class="label">Type de véhicule:</span>
            <span class="value">${license.type_vehicule}</span>
          </div>
          <div class="detail-row">
            <span class="label">Source d'énergie:</span>
            <span class="value">${license.energie}</span>
          </div>
          <div class="detail-row">
            <span class="label">Places assises:</span>
            <span class="value">${license.places_assises}</span>
          </div>
          <div class="detail-row">
            <span class="label">Puissance administrative:</span>
            <span class="value">${license.puissance}</span>
          </div>
          <div class="detail-row">
            <span class="label">Poids à vide:</span>
            <span class="value">${license.poids_vide}</span>
          </div>
          <div class="detail-row">
            <span class="label">Charge utile:</span>
            <span class="value">${license.charge_utile}</span>
          </div>
          <div class="detail-row">
            <span class="label">Poids totale autorisé en charge:</span>
            <span class="value">${license.poids_total}</span>
          </div>
          <div class="detail-row">
            <span class="label">Couleur:</span>
            <span class="value">${license.couleur}</span>
          </div>
          <div class="detail-row">
            <span class="label">Précédent numéro d'immatriculation:</span>
            <span class="value">${license.precedent_immatriculation}</span>
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
}

function generateFicheHTML(license) {
  return `
  <!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fiche d'Enregistrement - ${license.nom} ${license.prenom}</title>
    <link rel="stylesheet" href="/style.css">
  </head>
  <body>
    <div class="license-container fiche">
      <div class="license-header">
        <h1>République Gabonaise</h1>
        <h2>Fiche d'Enregistrement</h2>
      </div>
      
      <div class="license-body">
        <div class="license-details">
          <div class="detail-row">
            <span class="label">N° Fiche:</span>
            <span class="value">${license.numero_fiche}</span>
          </div>
          <div class="detail-row">
            <span class="label">N° P D'origine:</span>
            <span class="value">${license.pd_origine}</span>
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
            <span class="label">Date de naissance:</span>
            <span class="value">${license.date_naissance}</span>
          </div>
          <div class="detail-row">
            <span class="label">Lieu de Naissance:</span>
            <span class="value">${license.lieu_naissance}</span>
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
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});