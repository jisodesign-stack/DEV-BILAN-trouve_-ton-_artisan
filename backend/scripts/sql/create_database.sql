-- ============================================
-- Script de création de la base de données
-- Projet : Trouve ton artisan
-- Région : Auvergne-Rhône-Alpes
-- ============================================

-- Suppression de la base de données si elle existe
DROP DATABASE IF EXISTS trouve_ton_artisan;

-- Création de la base de données
CREATE DATABASE trouve_ton_artisan
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

-- Utilisation de la base de données
USE trouve_ton_artisan;

-- ============================================
-- TABLE : categories
-- Description : Catégories principales d'artisans
-- ============================================
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE : specialites
-- Description : Spécialités des artisans
-- Contrainte : Une spécialité appartient à une seule catégorie
-- ============================================
CREATE TABLE specialites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    categorie_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_categorie (categorie_id),
    CONSTRAINT fk_specialite_categorie 
        FOREIGN KEY (categorie_id) 
        REFERENCES categories(id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLE : artisans
-- Description : Informations des artisans
-- Contrainte : Un artisan possède une seule spécialité
-- ============================================
CREATE TABLE artisans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    note DECIMAL(2,1) NOT NULL DEFAULT 0 CHECK (note >= 0 AND note <= 5),
    localisation VARCHAR(100) NOT NULL,
    a_propos TEXT,
    site_web VARCHAR(255),
    image VARCHAR(255) DEFAULT 'default-artisan.jpg',
    top_artisan BOOLEAN NOT NULL DEFAULT FALSE,
    specialite_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_specialite (specialite_id),
    INDEX idx_nom (nom),
    INDEX idx_note (note DESC),
    INDEX idx_top_artisan (top_artisan),
    CONSTRAINT fk_artisan_specialite 
        FOREIGN KEY (specialite_id) 
        REFERENCES specialites(id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- VUES pour faciliter les requêtes
-- ============================================

-- Vue : artisans avec leur spécialité et catégorie
CREATE VIEW vue_artisans_complet AS
SELECT 
    a.id,
    a.nom,
    a.email,
    a.note,
    a.localisation,
    a.a_propos,
    a.site_web,
    a.image,
    a.top_artisan,
    s.nom AS specialite_nom,
    s.id AS specialite_id,
    c.nom AS categorie_nom,
    c.slug AS categorie_slug,
    c.id AS categorie_id
FROM artisans a
JOIN specialites s ON a.specialite_id = s.id
JOIN categories c ON s.categorie_id = c.id;

-- Vue : top artisans du mois
CREATE VIEW vue_top_artisans AS
SELECT * FROM vue_artisans_complet
WHERE top_artisan = TRUE
ORDER BY note DESC
LIMIT 3;
