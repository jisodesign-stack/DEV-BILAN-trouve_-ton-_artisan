# Trouve ton artisan - Auvergne-Rhone-Alpes

Plateforme web permettant aux particuliers de trouver et contacter des artisans qualifies en region Auvergne-Rhone-Alpes.

## Technologies

- **Frontend** : React 18.2, React Router 6, Bootstrap 5.3, Sass
- **Backend** : Node.js 18+, Express 4.18, Sequelize 6.35
- **Base de donnees** : MySQL 9.5

## Prerequis

- Node.js 18+
- MySQL 9.5
- Git

## Installation

```bash
# Cloner le repository
git clone https://github.com/jisodesign-stack/trouve-ton-artisan.git
cd trouve-ton-artisan

# Backend
cd backend
npm install
cp .env.example .env  # Configurer les variables

# Frontend
cd ../frontend
npm install
cp .env.example .env  # Configurer les variables
```

## Configuration

### Backend (.env)

```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_NAME=trouve_ton_artisan
DB_USER=root
DB_PASSWORD=votre_mot_de_passe
FRONTEND_URL=http://localhost:3001
API_KEY=votre_cle_api
```

### Frontend (.env)

```env
PORT=3001
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_API_KEY=votre_cle_api
```

### Base de donnees

```bash
cd backend
mysql -u root -p < scripts/sql/create_database.sql
mysql -u root -p < scripts/sql/seed_database.sql
```

## Lancement

```bash
# Terminal 1 - Backend
cd backend
npm run dev
# API sur http://localhost:5000

# Terminal 2 - Frontend
cd frontend
npm start
# App sur http://localhost:3001
```

## Structure du projet

```
trouve-ton-artisan/
├── backend/
│   ├── config/          # Configuration BDD
│   ├── controllers/     # Logique metier
│   ├── middleware/      # Auth, validation
│   ├── models/          # Modeles Sequelize
│   ├── routes/          # Routes API
│   ├── scripts/sql/     # Scripts SQL
│   └── server.js
├── frontend/
│   ├── public/          # Assets statiques
│   └── src/
│       ├── components/  # Composants React
│       ├── pages/       # Pages
│       ├── services/    # Client API
│       └── styles/      # SCSS
└── README.md
```

## API Endpoints

| Methode | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/categories | Liste des categories |
| GET | /api/categories/:slug/artisans | Artisans par categorie |
| GET | /api/artisans | Liste des artisans |
| GET | /api/artisans/:id | Detail artisan |
| GET | /api/artisans/top | Top 3 artisans |
| GET | /api/artisans/search?q= | Recherche |
| POST | /api/contact | Envoyer un message |

**Authentification** : Header `x-api-key` requis sur toutes les requetes.

## Securite

- Validation des entrees (express-validator)
- Protection XSS (Helmet)
- Protection SQL Injection (Sequelize ORM)
- Rate Limiting
- CORS configure
- Cle API obligatoire

## Auteur

Developpe dans le cadre du titre professionnel Developpeur Web.

---

Region Auvergne-Rhone-Alpes - 2024
