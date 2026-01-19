-- ============================================
-- Script d'alimentation de la base de données
-- Projet : Trouve ton artisan
-- Région : Auvergne-Rhône-Alpes
-- Données officielles du projet
-- ============================================

USE trouve_ton_artisan;

-- ============================================
-- INSERTION DES CATÉGORIES
-- ============================================
INSERT INTO categories (nom, slug) VALUES
('Bâtiment', 'batiment'),
('Services', 'services'),
('Fabrication', 'fabrication'),
('Alimentation', 'alimentation');

-- ============================================
-- INSERTION DES SPÉCIALITÉS
-- ============================================

-- Spécialités Bâtiment (categorie_id = 1)
INSERT INTO specialites (nom, categorie_id) VALUES
('Chauffagiste', 1),
('Electricien', 1),
('Menuisier', 1),
('Plombier', 1);

-- Spécialités Services (categorie_id = 2)
INSERT INTO specialites (nom, categorie_id) VALUES
('Coiffeur', 2),
('Fleuriste', 2),
('Toiletteur', 2),
('Webdesign', 2);

-- Spécialités Fabrication (categorie_id = 3)
INSERT INTO specialites (nom, categorie_id) VALUES
('Bijoutier', 3),
('Couturier', 3),
('Ferronier', 3);

-- Spécialités Alimentation (categorie_id = 4)
INSERT INTO specialites (nom, categorie_id) VALUES
('Boucher', 4),
('Boulanger', 4),
('Chocolatier', 4),
('Traiteur', 4);

-- ============================================
-- INSERTION DES ARTISANS
-- ============================================

-- Artisans Alimentation
INSERT INTO artisans (nom, email, note, localisation, a_propos, site_web, image, top_artisan, specialite_id) VALUES
('Boucherie Dumont', 'boucherie.dumond@gmail.com', 4.5, 'Lyon', 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
 NULL, 'default-artisan.jpg', FALSE, 
 (SELECT id FROM specialites WHERE nom = 'Boucher')),

('Au pain chaud', 'aupainchaud@hotmail.com', 4.8, 'Montélimar', 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
 NULL, 'default-artisan.jpg', TRUE, 
 (SELECT id FROM specialites WHERE nom = 'Boulanger')),

('Chocolaterie Labbé', 'chocolaterie-labbe@gmail.com', 4.9, 'Lyon', 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
 'https://chocolaterie-labbe.fr', 'default-artisan.jpg', TRUE, 
 (SELECT id FROM specialites WHERE nom = 'Chocolatier')),

('Traiteur Truchon', 'contact@truchon-traiteur.fr', 4.1, 'Lyon', 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
 'https://truchon-traiteur.fr', 'default-artisan.jpg', FALSE, 
 (SELECT id FROM specialites WHERE nom = 'Traiteur'));

-- Artisans Bâtiment
INSERT INTO artisans (nom, email, note, localisation, a_propos, site_web, image, top_artisan, specialite_id) VALUES
('Orville Salmons', 'o-salmons@live.com', 5.0, 'Evian', 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
 NULL, 'default-artisan.jpg', TRUE, 
 (SELECT id FROM specialites WHERE nom = 'Chauffagiste')),

('Mont Blanc Eléctricité', 'contact@mont-blanc-electricite.com', 4.5, 'Chamonix', 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
 'https://mont-blanc-electricite.com', 'default-artisan.jpg', FALSE, 
 (SELECT id FROM specialites WHERE nom = 'Electricien')),

('Boutot & fils', 'boutot-menuiserie@gmail.com', 4.7, 'Bourg-en-bresse', 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
 'https://boutot-menuiserie.com', 'default-artisan.jpg', FALSE, 
 (SELECT id FROM specialites WHERE nom = 'Menuisier')),

('Vallis Bellemare', 'v.bellemare@gmail.com', 4.0, 'Vienne', 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
 'https://plomberie-bellemare.com', 'default-artisan.jpg', FALSE, 
 (SELECT id FROM specialites WHERE nom = 'Plombier'));

-- Artisans Fabrication
INSERT INTO artisans (nom, email, note, localisation, a_propos, site_web, image, top_artisan, specialite_id) VALUES
('Claude Quinn', 'claude.quinn@gmail.com', 4.2, 'Aix-les-bains', 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
 NULL, 'default-artisan.jpg', FALSE, 
 (SELECT id FROM specialites WHERE nom = 'Bijoutier')),

('Amitee Lécuyer', 'a.amitee@hotmail.com', 4.5, 'Annecy', 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
 'https://lecuyer-couture.com', 'default-artisan.jpg', FALSE, 
 (SELECT id FROM specialites WHERE nom = 'Couturier')),

('Ernest Carignan', 'e-carigan@hotmail.com', 5.0, 'Le Puy-en-Velay', 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
 NULL, 'default-artisan.jpg', FALSE, 
 (SELECT id FROM specialites WHERE nom = 'Ferronier'));

-- Artisans Services
INSERT INTO artisans (nom, email, note, localisation, a_propos, site_web, image, top_artisan, specialite_id) VALUES
('Royden Charbonneau', 'r.charbonneau@gmail.com', 3.8, 'Saint-Priest', 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
 NULL, 'default-artisan.jpg', FALSE, 
 (SELECT id FROM specialites WHERE nom = 'Coiffeur')),

('Leala Dennis', 'l.dennos@hotmail.fr', 3.8, 'Chambéry', 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
 'https://coiffure-leala-chambery.fr', 'default-artisan.jpg', FALSE, 
 (SELECT id FROM specialites WHERE nom = 'Coiffeur')),

('C''est sup''hair', 'sup-hair@gmail.com', 4.1, 'Romans-sur-Isère', 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
 'https://sup-hair.fr', 'default-artisan.jpg', FALSE, 
 (SELECT id FROM specialites WHERE nom = 'Coiffeur')),

('Le monde des fleurs', 'contact@le-monde-des-fleurs-annonay.fr', 4.6, 'Annonay', 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
 'https://le-monde-des-fleurs-annonay.fr', 'default-artisan.jpg', FALSE, 
 (SELECT id FROM specialites WHERE nom = 'Fleuriste')),

('Valérie Laderoute', 'v-laredoute@gmail.com', 4.5, 'Valence', 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
 NULL, 'default-artisan.jpg', FALSE, 
 (SELECT id FROM specialites WHERE nom = 'Toiletteur')),

('CM Graphisme', 'contact@cm-graphisme.com', 4.4, 'Valence', 
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 
 'https://cm-graphisme.com', 'default-artisan.jpg', FALSE, 
 (SELECT id FROM specialites WHERE nom = 'Webdesign'));

-- ============================================
-- VÉRIFICATION DES DONNÉES INSÉRÉES
-- ============================================
SELECT 'Catégories insérées:' AS Info, COUNT(*) AS Total FROM categories;
SELECT 'Spécialités insérées:' AS Info, COUNT(*) AS Total FROM specialites;
SELECT 'Artisans insérés:' AS Info, COUNT(*) AS Total FROM artisans;
SELECT 'Top artisans:' AS Info, COUNT(*) AS Total FROM artisans WHERE top_artisan = TRUE;
