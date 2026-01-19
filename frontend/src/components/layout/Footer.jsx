/**
 * Composant Footer
 * Pied de page du site avec liens légaux et contact
 * @module components/layout/Footer
 */

import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

/**
 * Composant Footer présent sur toutes les pages
 * @returns {JSX.Element} Le footer du site
 */
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__container">
        <div className="footer__content">
          {/* Section Logo et Contact */}
          <div className="footer__brand">
            <h2 className="footer__brand-title">Trouve ton artisan !</h2>
            <p className="footer__brand-subtitle">Avec la région Auvergne-Rhône-Alpes</p>
            
            <div className="footer__contact">
              <h3 className="footer__contact-title">Antenne de Lyon</h3>
              <address className="footer__contact-address">
                101 cours Charlemagne<br />
                CS 20033<br />
                69269 LYON CEDEX 02<br />
                France
              </address>
              <a 
                href="tel:+33426734000" 
                className="footer__contact-phone"
                aria-label="Appeler le +33 4 26 73 40 00"
              >
                +33 (0)4 26 73 40 00
              </a>
            </div>
          </div>

          {/* Section Liens légaux */}
          <nav className="footer__legal" aria-label="Liens légaux">
            <h3 className="footer__legal-title">Informations légales</h3>
            <ul className="footer__legal-list">
              <li className="footer__legal-item">
                <Link to="/mentions-legales" className="footer__legal-link">
                  Mentions légales
                </Link>
              </li>
              <li className="footer__legal-item">
                <Link to="/donnees-personnelles" className="footer__legal-link">
                  Données personnelles
                </Link>
              </li>
              <li className="footer__legal-item">
                <Link to="/accessibilite" className="footer__legal-link">
                  Accessibilité
                </Link>
              </li>
              <li className="footer__legal-item">
                <Link to="/cookies" className="footer__legal-link">
                  Gestion des cookies
                </Link>
              </li>
            </ul>
          </nav>

          {/* Section Région */}
          <div className="footer__region">
            <h3 className="footer__region-title">La région</h3>
            <a 
              href="https://www.auvergnerhonealpes.fr/contenus/ladministration-regionale"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__region-link"
              aria-label="Visiter le site de la région Auvergne-Rhône-Alpes (nouvelle fenêtre)"
            >
              Site officiel de la région
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear} Région Auvergne-Rhône-Alpes - Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
