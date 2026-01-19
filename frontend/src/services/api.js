/**
 * Service API pour les requêtes HTTP
 * Gère la communication avec le backend
 * @module services/api
 */

import axios from 'axios';

// Configuration de base d'axios
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.REACT_APP_API_KEY || ''
  }
});

// Intercepteur pour les réponses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Gestion centralisée des erreurs (logging uniquement en développement)
    if (process.env.NODE_ENV === 'development') {
      if (error.response) {
        console.error('Erreur API:', error.response.data.message || error.response.statusText);
      } else if (error.request) {
        console.error('Erreur réseau: Le serveur ne répond pas');
      } else {
        console.error('Erreur:', error.message);
      }
    }
    return Promise.reject(error);
  }
);

// ===== SERVICES CATÉGORIES =====

/**
 * Récupère toutes les catégories
 * @returns {Promise} Liste des catégories
 */
export const getCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

/**
 * Récupère une catégorie par son slug
 * @param {string} slug - Slug de la catégorie
 * @returns {Promise} Détails de la catégorie
 */
export const getCategorieBySlug = async (slug) => {
  const response = await api.get(`/categories/${slug}`);
  return response.data;
};

/**
 * Récupère les artisans d'une catégorie
 * @param {string} slug - Slug de la catégorie
 * @returns {Promise} Liste des artisans de la catégorie
 */
export const getArtisansByCategorie = async (slug) => {
  const response = await api.get(`/categories/${slug}/artisans`);
  return response.data;
};

// ===== SERVICES ARTISANS =====

/**
 * Récupère tous les artisans avec pagination et filtres
 * @param {Object} params - Paramètres de requête
 * @param {number} params.page - Numéro de page
 * @param {number} params.limit - Nombre d'éléments par page
 * @param {string} params.categorie - Slug de la catégorie
 * @param {string} params.search - Recherche par nom
 * @returns {Promise} Liste paginée des artisans
 */
export const getArtisans = async (params = {}) => {
  const response = await api.get('/artisans', { params });
  return response.data;
};

/**
 * Récupère un artisan par son ID
 * @param {number} id - ID de l'artisan
 * @returns {Promise} Détails de l'artisan
 */
export const getArtisanById = async (id) => {
  const response = await api.get(`/artisans/${id}`);
  return response.data;
};

/**
 * Récupère les 3 artisans du mois
 * @returns {Promise} Liste des top artisans
 */
export const getTopArtisans = async () => {
  const response = await api.get('/artisans/top');
  return response.data;
};

/**
 * Recherche des artisans par nom
 * @param {string} query - Terme de recherche
 * @returns {Promise} Liste des artisans correspondants
 */
export const searchArtisans = async (query) => {
  const response = await api.get('/artisans/search', { params: { q: query } });
  return response.data;
};

// ===== SERVICE CONTACT =====

/**
 * Envoie un email de contact à un artisan
 * @param {Object} data - Données du formulaire
 * @param {number} data.artisan_id - ID de l'artisan
 * @param {string} data.nom - Nom de l'expéditeur
 * @param {string} data.email - Email de l'expéditeur
 * @param {string} data.objet - Objet du message
 * @param {string} data.message - Contenu du message
 * @returns {Promise} Résultat de l'envoi
 */
export const sendContactEmail = async (data) => {
  const response = await api.post('/contact', data);
  return response.data;
};

export default api;
