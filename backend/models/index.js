/**
 * Point d'entrée pour tous les modèles Sequelize
 * Définition des associations entre les modèles
 * @module models/index
 */

const { sequelize } = require('../config/database');
const Categorie = require('./Categorie');
const Specialite = require('./Specialite');
const Artisan = require('./Artisan');

// ===== DÉFINITION DES ASSOCIATIONS =====

/**
 * Une catégorie possède plusieurs spécialités
 * Une spécialité appartient à une seule catégorie
 */
Categorie.hasMany(Specialite, {
  foreignKey: 'categorie_id',
  as: 'specialites',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

Specialite.belongsTo(Categorie, {
  foreignKey: 'categorie_id',
  as: 'categorie'
});

/**
 * Une spécialité possède plusieurs artisans
 * Un artisan appartient à une seule spécialité
 */
Specialite.hasMany(Artisan, {
  foreignKey: 'specialite_id',
  as: 'artisans',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

Artisan.belongsTo(Specialite, {
  foreignKey: 'specialite_id',
  as: 'specialite'
});

module.exports = {
  sequelize,
  Categorie,
  Specialite,
  Artisan
};
