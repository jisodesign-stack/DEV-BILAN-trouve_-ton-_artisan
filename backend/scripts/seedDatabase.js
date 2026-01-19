/**
 * Script de remplissage de la base de données avec les données de test
 * @module scripts/seedDatabase
 */

require('dotenv').config();
const { sequelize, Categorie, Specialite, Artisan } = require('../models');

// Données des catégories
const categoriesData = [
  { nom: 'Bâtiment', slug: 'batiment' },
  { nom: 'Services', slug: 'services' },
  { nom: 'Fabrication', slug: 'fabrication' },
  { nom: 'Alimentation', slug: 'alimentation' }
];

// Données des spécialités par catégorie
const specialitesData = {
  batiment: ['Maçonnerie', 'Électricité', 'Plomberie', 'Menuiserie', 'Peinture', 'Couverture', 'Carrelage', 'Chauffage'],
  services: ['Coiffure', 'Esthétique', 'Pressing', 'Cordonnerie', 'Horlogerie', 'Photographie', 'Fleuriste'],
  fabrication: ['Ébénisterie', 'Ferronnerie', 'Bijouterie', 'Poterie', 'Verrerie', 'Tapisserie', 'Lutherie'],
  alimentation: ['Boulangerie', 'Pâtisserie', 'Boucherie', 'Fromagerie', 'Chocolaterie', 'Traiteur', 'Épicerie fine']
};

// Données des artisans
const artisansData = [
  // Bâtiment
  { nom: 'Maçonnerie Dupont', email: 'contact@maconnerie-dupont.fr', note: 4.8, localisation: 'Lyon 3ème', a_propos: 'Entreprise familiale depuis 1985, spécialisée dans la rénovation et la construction neuve.', site_web: 'https://www.maconnerie-dupont.fr', image: 'maconnerie-dupont.jpg', top_artisan: true, specialite: 'Maçonnerie' },
  { nom: 'Électricité Martin', email: 'info@electricite-martin.fr', note: 4.5, localisation: 'Villeurbanne', a_propos: 'Électricien certifié RGE. Installation, rénovation et dépannage électrique.', site_web: 'https://www.electricite-martin.fr', image: 'electricite-martin.jpg', top_artisan: false, specialite: 'Électricité' },
  { nom: 'Plomberie Rhône', email: 'contact@plomberie-rhone.fr', note: 4.2, localisation: 'Lyon 7ème', a_propos: 'Plombier chauffagiste intervenant sur Lyon et sa périphérie. Dépannage urgent 7j/7.', site_web: null, image: 'plomberie-rhone.jpg', top_artisan: false, specialite: 'Plomberie' },
  { nom: 'Menuiserie Bois & Art', email: 'contact@bois-art.fr', note: 4.9, localisation: 'Annecy', a_propos: 'Menuisier ébéniste passionné, créateur de meubles sur mesure.', site_web: 'https://www.bois-art.fr', image: 'bois-art.jpg', top_artisan: true, specialite: 'Menuiserie' },
  { nom: 'Peinture Couleurs Alpes', email: 'devis@couleurs-alpes.fr', note: 4.3, localisation: 'Grenoble', a_propos: 'Entreprise de peinture intérieure et extérieure.', site_web: 'https://www.couleurs-alpes.fr', image: 'couleurs-alpes.jpg', top_artisan: false, specialite: 'Peinture' },
  { nom: 'Toitures Savoie', email: 'contact@toitures-savoie.fr', note: 4.7, localisation: 'Chambéry', a_propos: 'Couvreur zingueur depuis 30 ans.', site_web: null, image: 'toitures-savoie.jpg', top_artisan: false, specialite: 'Couverture' },
  { nom: 'Carrelage Pro', email: 'info@carrelage-pro.fr', note: 4.4, localisation: 'Saint-Étienne', a_propos: 'Pose de carrelage, faïence et mosaïque.', site_web: 'https://www.carrelage-pro.fr', image: 'carrelage-pro.jpg', top_artisan: false, specialite: 'Carrelage' },
  { nom: 'Chauffage Confort', email: 'contact@chauffage-confort.fr', note: 4.6, localisation: 'Clermont-Ferrand', a_propos: 'Installation et entretien de chaudières et pompes à chaleur.', site_web: 'https://www.chauffage-confort.fr', image: 'chauffage-confort.jpg', top_artisan: false, specialite: 'Chauffage' },
  
  // Services
  { nom: 'Salon Élégance', email: 'rdv@salon-elegance.fr', note: 4.8, localisation: 'Lyon 2ème', a_propos: 'Salon de coiffure mixte au cœur de Lyon.', site_web: 'https://www.salon-elegance.fr', image: 'salon-elegance.jpg', top_artisan: false, specialite: 'Coiffure' },
  { nom: 'Institut Beauté Pure', email: 'contact@beaute-pure.fr', note: 4.9, localisation: 'Lyon 6ème', a_propos: 'Institut de beauté proposant soins du visage et massages.', site_web: 'https://www.beaute-pure.fr', image: 'beaute-pure.jpg', top_artisan: true, specialite: 'Esthétique' },
  { nom: 'Pressing Express', email: 'contact@pressing-express.fr', note: 4.1, localisation: 'Villeurbanne', a_propos: 'Nettoyage à sec, blanchisserie et retouches.', site_web: null, image: 'pressing-express.jpg', top_artisan: false, specialite: 'Pressing' },
  { nom: 'Cordonnerie du Centre', email: 'contact@cordonnerie-centre.fr', note: 4.5, localisation: 'Grenoble', a_propos: 'Réparation de chaussures et maroquinerie.', site_web: null, image: 'cordonnerie-centre.jpg', top_artisan: false, specialite: 'Cordonnerie' },
  { nom: 'Horlogerie Précision', email: 'contact@horlogerie-precision.fr', note: 4.7, localisation: 'Annecy', a_propos: 'Réparation et entretien de montres.', site_web: 'https://www.horlogerie-precision.fr', image: 'horlogerie-precision.jpg', top_artisan: false, specialite: 'Horlogerie' },
  { nom: 'Studio Photo Lumière', email: 'booking@studio-lumiere.fr', note: 4.6, localisation: 'Lyon 1er', a_propos: 'Photographe professionnel événementiel.', site_web: 'https://www.studio-lumiere.fr', image: 'studio-lumiere.jpg', top_artisan: false, specialite: 'Photographie' },
  { nom: 'Fleurs du Rhône', email: 'commande@fleurs-rhone.fr', note: 4.8, localisation: 'Lyon 5ème', a_propos: 'Artisan fleuriste créateur de bouquets.', site_web: 'https://www.fleurs-rhone.fr', image: 'fleurs-rhone.jpg', top_artisan: false, specialite: 'Fleuriste' },
  
  // Fabrication
  { nom: 'Ébénisterie Tradition', email: 'contact@ebenisterie-tradition.fr', note: 4.9, localisation: 'Saint-Étienne', a_propos: 'Ébéniste d\'art, restauration de meubles anciens.', site_web: 'https://www.ebenisterie-tradition.fr', image: 'ebenisterie-tradition.jpg', top_artisan: false, specialite: 'Ébénisterie' },
  { nom: 'Forge des Alpes', email: 'contact@forge-alpes.fr', note: 4.7, localisation: 'Chambéry', a_propos: 'Ferronnier d\'art, création de portails.', site_web: 'https://www.forge-alpes.fr', image: 'forge-alpes.jpg', top_artisan: false, specialite: 'Ferronnerie' },
  { nom: 'Bijouterie Éclat', email: 'contact@bijouterie-eclat.fr', note: 4.8, localisation: 'Lyon 2ème', a_propos: 'Bijoutier joaillier, créations uniques.', site_web: 'https://www.bijouterie-eclat.fr', image: 'bijouterie-eclat.jpg', top_artisan: false, specialite: 'Bijouterie' },
  { nom: 'Atelier Terre', email: 'contact@atelier-terre.fr', note: 4.5, localisation: 'Valence', a_propos: 'Potier céramiste, vaisselle artisanale.', site_web: 'https://www.atelier-terre.fr', image: 'atelier-terre.jpg', top_artisan: false, specialite: 'Poterie' },
  { nom: 'Verre & Lumière', email: 'contact@verre-lumiere.fr', note: 4.6, localisation: 'Annecy', a_propos: 'Maître verrier, création de vitraux.', site_web: 'https://www.verre-lumiere.fr', image: 'verre-lumiere.jpg', top_artisan: false, specialite: 'Verrerie' },
  { nom: 'Tapissier Décorateur', email: 'contact@tapissier-deco.fr', note: 4.4, localisation: 'Grenoble', a_propos: 'Tapissier garnisseur, restauration de sièges.', site_web: null, image: 'tapissier-deco.jpg', top_artisan: false, specialite: 'Tapisserie' },
  { nom: 'Lutherie Montagne', email: 'contact@lutherie-montagne.fr', note: 4.9, localisation: 'Annecy', a_propos: 'Luthier spécialisé instruments à cordes.', site_web: 'https://www.lutherie-montagne.fr', image: 'lutherie-montagne.jpg', top_artisan: false, specialite: 'Lutherie' },
  
  // Alimentation
  { nom: 'Boulangerie Au Pain Doré', email: 'contact@pain-dore.fr', note: 4.9, localisation: 'Lyon 4ème', a_propos: 'Boulanger artisan, pains au levain naturel.', site_web: null, image: 'pain-dore.jpg', top_artisan: false, specialite: 'Boulangerie' },
  { nom: 'Pâtisserie Délices', email: 'commande@patisserie-delices.fr', note: 4.8, localisation: 'Lyon 3ème', a_propos: 'Pâtissier chocolatier, gâteaux sur mesure.', site_web: 'https://www.patisserie-delices.fr', image: 'patisserie-delices.jpg', top_artisan: false, specialite: 'Pâtisserie' },
  { nom: 'Boucherie Terroir', email: 'contact@boucherie-terroir.fr', note: 4.7, localisation: 'Grenoble', a_propos: 'Boucher charcutier, viandes locales.', site_web: null, image: 'boucherie-terroir.jpg', top_artisan: false, specialite: 'Boucherie' },
  { nom: 'Fromagerie des Alpes', email: 'contact@fromagerie-alpes.fr', note: 4.9, localisation: 'Chambéry', a_propos: 'Fromager affineur, spécialités savoyardes.', site_web: 'https://www.fromagerie-alpes.fr', image: 'fromagerie-alpes.jpg', top_artisan: false, specialite: 'Fromagerie' },
  { nom: 'Chocolaterie Cacao & Co', email: 'contact@cacao-co.fr', note: 4.8, localisation: 'Lyon 1er', a_propos: 'Maître chocolatier, chocolats fins.', site_web: 'https://www.cacao-co.fr', image: 'cacao-co.jpg', top_artisan: false, specialite: 'Chocolaterie' },
  { nom: 'Traiteur Saveurs', email: 'devis@traiteur-saveurs.fr', note: 4.6, localisation: 'Lyon 8ème', a_propos: 'Traiteur événementiel, réceptions.', site_web: 'https://www.traiteur-saveurs.fr', image: 'traiteur-saveurs.jpg', top_artisan: false, specialite: 'Traiteur' },
  { nom: 'Épicerie Fine Gourmet', email: 'contact@epicerie-gourmet.fr', note: 4.5, localisation: 'Valence', a_propos: 'Épicerie fine, produits régionaux.', site_web: 'https://www.epicerie-gourmet.fr', image: 'epicerie-gourmet.jpg', top_artisan: false, specialite: 'Épicerie fine' }
];

const seedDatabase = async () => {
  try {
    console.log('🔄 Début du remplissage de la base de données...');
    
    // Synchronisation forcée (supprime et recrée les tables)
    await sequelize.sync({ force: true });
    console.log('📦 Tables recréées');

    // Création des catégories
    const categories = await Categorie.bulkCreate(categoriesData);
    console.log(`✅ ${categories.length} catégories créées`);

    // Création des spécialités
    const specialitesMap = {};
    for (const categorie of categories) {
      const specs = specialitesData[categorie.slug];
      for (const specNom of specs) {
        const spec = await Specialite.create({
          nom: specNom,
          categorie_id: categorie.id
        });
        specialitesMap[specNom] = spec.id;
      }
    }
    console.log(`✅ ${Object.keys(specialitesMap).length} spécialités créées`);

    // Création des artisans
    for (const artisanData of artisansData) {
      const { specialite, ...data } = artisanData;
      await Artisan.create({
        ...data,
        specialite_id: specialitesMap[specialite]
      });
    }
    console.log(`✅ ${artisansData.length} artisans créés`);

    console.log('🎉 Base de données remplie avec succès !');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors du remplissage:', error.message);
    process.exit(1);
  }
};

seedDatabase();
