/**
 * Composant Loader
 * Indicateur de chargement
 * @module components/common/Loader
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Composant de chargement
 * @param {Object} props - Propriétés du composant
 * @param {string} props.message - Message de chargement
 * @returns {JSX.Element} Loader
 */
function Loader({ message = 'Chargement en cours...' }) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <div className="loader__spinner" aria-hidden="true"></div>
      <span className="visually-hidden">{message}</span>
    </div>
  );
}

Loader.propTypes = {
  message: PropTypes.string
};

export default Loader;
