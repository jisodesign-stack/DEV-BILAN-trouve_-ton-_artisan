/**
 * Composant StarRating
 * Affiche une note sous forme d'étoiles
 * @module components/common/StarRating
 */

import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import PropTypes from 'prop-types';
import './StarRating.scss';

/**
 * Composant d'affichage de notation par étoiles
 * @param {Object} props - Propriétés du composant
 * @param {number} props.rating - Note sur 5
 * @param {string} props.size - Taille des étoiles (sm, md, lg)
 * @param {boolean} props.showScore - Afficher le score numérique
 * @returns {JSX.Element} Étoiles de notation
 */
function StarRating({ rating, size, showScore }) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <FaStar 
          key={i} 
          className="star-rating__star star-rating__star--filled" 
          aria-hidden="true"
        />
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <FaStarHalfAlt 
          key={i} 
          className="star-rating__star star-rating__star--half" 
          aria-hidden="true"
        />
      );
    } else {
      stars.push(
        <FaRegStar 
          key={i} 
          className="star-rating__star" 
          aria-hidden="true"
        />
      );
    }
  }

  return (
    <div 
      className={`star-rating star-rating--${size}`}
      role="img"
      aria-label={`Note : ${rating.toFixed(1)} sur 5`}
    >
      {stars}
      {showScore && (
        <span className="star-rating__score" aria-hidden="true">
          {rating.toFixed(1)}/5
        </span>
      )}
    </div>
  );
}

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  showScore: PropTypes.bool
};

StarRating.defaultProps = {
  size: 'md',
  showScore: false
};

export default StarRating;
