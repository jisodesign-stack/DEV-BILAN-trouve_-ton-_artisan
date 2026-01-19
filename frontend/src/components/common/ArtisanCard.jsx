/**
 * Composant ArtisanCard
 * Carte de présentation d'un artisan
 * @module components/common/ArtisanCard
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin } from 'react-icons/fi';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import PropTypes from 'prop-types';
import './ArtisanCard.scss';

/**
 * Génère les étoiles de notation
 * @param {number} rating - Note sur 5
 * @returns {JSX.Element[]} Tableau d'icônes d'étoiles
 */
const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <FaStar 
          key={i} 
          className="artisan-card__star artisan-card__star--filled" 
          aria-hidden="true"
        />
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <FaStarHalfAlt 
          key={i} 
          className="artisan-card__star artisan-card__star--half" 
          aria-hidden="true"
        />
      );
    } else {
      stars.push(
        <FaRegStar 
          key={i} 
          className="artisan-card__star" 
          aria-hidden="true"
        />
      );
    }
  }

  return stars;
};

/**
 * Composant carte d'artisan
 * @param {Object} props - Propriétés du composant
 * @param {Object} props.artisan - Données de l'artisan
 * @returns {JSX.Element} Carte de l'artisan
 */
function ArtisanCard({ artisan }) {
  const {
    id,
    nom,
    note,
    localisation,
    image,
    specialite
  } = artisan;

  // URL de l'image avec fallback
  const imageUrl = image && image !== 'default-artisan.jpg'
    ? `${process.env.REACT_APP_API_URL?.replace('/api', '')}/uploads/${image}`
    : '/images/default-artisan.jpg';

  // Nom de la spécialité
  const specialiteName = specialite?.nom || 'Artisan';

  // Nom de la catégorie
  const categorieName = specialite?.categorie?.nom || '';

  return (
    <Link 
      to={`/artisan/${id}`} 
      className="artisan-card"
      aria-label={`Voir la fiche de ${nom}, ${specialiteName} à ${localisation}`}
    >
      {/* Image */}
      <div className="artisan-card__image-wrapper">
        <img
          src={imageUrl}
          alt=""
          className="artisan-card__image"
          loading="lazy"
          onError={(e) => {
            e.target.src = '/images/default-artisan.jpg';
          }}
        />
        {categorieName && (
          <span className="artisan-card__badge">{categorieName}</span>
        )}
      </div>

      {/* Contenu */}
      <div className="artisan-card__content">
        <h3 className="artisan-card__name">{nom}</h3>
        <p className="artisan-card__specialty">{specialiteName}</p>
        <p className="artisan-card__location">
          <FiMapPin aria-hidden="true" />
          <span>{localisation}</span>
        </p>

        {/* Rating */}
        <div className="artisan-card__rating">
          <div 
            className="artisan-card__stars" 
            role="img" 
            aria-label={`Note : ${note} sur 5`}
          >
            {renderStars(parseFloat(note))}
          </div>
          <span className="artisan-card__score">{parseFloat(note).toFixed(1)}/5</span>
        </div>
      </div>
    </Link>
  );
}

ArtisanCard.propTypes = {
  artisan: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nom: PropTypes.string.isRequired,
    note: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    localisation: PropTypes.string.isRequired,
    image: PropTypes.string,
    specialite: PropTypes.shape({
      id: PropTypes.number,
      nom: PropTypes.string,
      categorie: PropTypes.shape({
        id: PropTypes.number,
        nom: PropTypes.string,
        slug: PropTypes.string
      })
    })
  }).isRequired
};

export default ArtisanCard;
