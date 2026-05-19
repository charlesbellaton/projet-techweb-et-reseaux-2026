# La Trattoria — Restaurant Italien

Projet réalisé dans le cadre du cours **Technologies web et réseaux [SP26]**
**Auteurs :** Charles Bellaton & Adam El Khiari

---

## TL;DR — Lancer le site

### Backend (Flask)
```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows : venv\Scripts\activate
pip install -r requirements.txt
python app.py
```
→ API disponible sur **http://localhost:5000**

### Frontend (React)
```bash
cd frontend
npm install
npm run dev
```
→ Site disponible sur **http://localhost:5173**

---

## Description

Site de restaurant italien avec :
- Consultation du menu par catégorie
- Détail d'un plat
- Formulaire de réservation
- Dashboard admin (gestion réservations + ajout de plats)

## Stack

| Côté | Technologie |
|------|-------------|
| Frontend | React 18 + Vite + React Router |
| Styles | SCSS/SASS |
| Backend | Flask + SQLAlchemy |
| Base de données | SQLite |

## Endpoints API

| Méthode | URL | Description |
|---------|-----|-------------|
| GET | `/api/plats` | Liste les plats |
| GET | `/api/plats/:id` | Détail d'un plat |
| POST | `/api/plats` | Créer un plat |
| PUT | `/api/plats/:id` | Modifier un plat |
| DELETE | `/api/plats/:id` | Supprimer un plat |
| GET | `/api/reservations` | Liste les réservations |
| POST | `/api/reservations` | Créer une réservation |
| DELETE | `/api/reservations/:id` | Supprimer une réservation |
| GET | `/api/categories` | Liste les catégories |
