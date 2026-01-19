/**
 * Carte de présentation d'un artisan
 * Affiche image, nom, spécialité, localisation et note
 * 
 * @module components/common/ArtisanCard
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin } from 'react-icons/fi';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import PropTypes from 'prop-types';
import './ArtisanCard.scss';

/** Génère les icônes d'étoiles selon la note (0-5) */
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

function ArtisanCard({ artisan }) {
  const { id, nom, note, localisation, image, specialite } = artisan;
  const [imageLoaded, setImageLoaded] = useState(false);

  // Image avec fallback si absente ou par défaut
  const imageUrl = image && image !== 'default-artisan.jpg'
    ? `${process.env.REACT_APP_API_URL?.replace('/api', '')}/uploads/${image}`
    : '/images/default-artisan.svg';

  const specialiteName = specialite?.nom || 'Artisan';
  const categorieName = specialite?.categorie?.nom || '';

  return (
    <Link 
      to={`/artisan/${id}`} 
      className="artisan-card"
      aria-label={`Voir la fiche de ${nom}, ${specialiteName} à ${localisation}`}
    >
      <div className="artisan-card__image-wrapper">
        <img
          src={imageUrl}
          alt=""
          className={`artisan-card__image ${imageLoaded ? '' : 'artisan-card__image-loading'}`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            if (!e.target.dataset.fallback) {
              e.target.dataset.fallback = 'true';
              e.target.src = '/images/default-artisan.svg';
            }
            setImageLoaded(true);
          }}
        />
        {categorieName && (
          <span className="artisan-card__badge">{categorieName}</span>
        )}
      </div>

      <div className="artisan-card__content">
        <h3 className="artisan-card__name">{nom}</h3>
        <p className="artisan-card__specialty">{specialiteName}</p>
        <p className="artisan-card__location">
          <FiMapPin aria-hidden="true" />
          <span>{localisation}</span>
        </p>

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
