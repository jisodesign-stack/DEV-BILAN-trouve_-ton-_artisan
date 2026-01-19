/**
 * Script de création de la base de données via Sequelize
 * @module scripts/createDatabase
 */

require('dotenv').config();
const mysql = require('mysql2/promise');

const createDatabase = async () => {
  try {
    console.log('🔄 Création de la base de données...');
    
    // Connexion sans spécifier de base de données
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    });

    // Création de la base de données
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\` 
       CHARACTER SET utf8mb4 
       COLLATE utf8mb4_unicode_ci`
    );

    console.log(`✅ Base de données "${process.env.DB_NAME}" créée avec succès`);
    
    await connection.end();
    
    // Synchronisation des modèles
    const { sequelize } = require('../models');
    await sequelize.sync({ force: true });
    
    console.log('✅ Tables créées avec succès');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors de la création:', error.message);
    process.exit(1);
  }
};

createDatabase();
