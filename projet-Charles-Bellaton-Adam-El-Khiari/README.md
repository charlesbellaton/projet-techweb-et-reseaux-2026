# La Trattoria — Restaurant Italien

Projet réalisé dans le cadre du cours **Technologies web et réseaux**
**Auteurs:** Charles Bellaton & Adam El Khiari

---

## TL;DR

**Instllation et Démarrage du site (Nécessite 2 terminaux):**

### Backend (Flask)
```bash
cd backend
python3 -m venv venv          # Windows : python -m venv venv
source venv/bin/activate      # Windows : venv\Scripts\activate
pip install -r requirements.txt
python seed.py 
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
### Fonctionnalités:
   
Notre site est basé sur un restaurant italien s'appelant "La Trattoria". Ce site comporte:
- Un menu doté d'un filtre par catégorie
- Un descriptif détaillé de chaque plat
- Un formulaire de réservation en ligne
- Un dashboard admin, permettant d'ajouter/supprimer des plats et de supprimer des réservations

### Respect du cahier des charges:

- Notre site contient 5 routes, une page d'accueil, une page de menu, une page de réservation, une page pour les plats (quand on clique dessus) et une page pour les administrateurs.
- Nos deux formulaires sont le formulaire de réservation et le formulaire d'ajout de plat (Admin).
- Ces derniers vérifient plusieurs règles (côté frontend) avant l'envoi:
    - Pour le formulaire d'ajout du plat (AdminPlatForm) : 
        - Nom (texte, obligatoire)
        - Description (textarea, optionnel)
        - Prix en CHF (nombre positif, obligatoire)
        - Catégorie (select parmi les catégories existantes, obligatoire)
        - Image URL (texte, optionnel)
    - Pour le formulaire de réservation (Reservations) :
        - Nom complet (texte, obligatoire)
        - Email (email, obligatoire)
        - Date (date future, obligatoire)
        - Nombre de personnes (nombre entre 1 et 20, obligatoire)
        - Plat souhaité (select optionnel, chargé depuis l'API)
        - Message (textarea optionnel)
- Pour la vérification des données dans le backend (reservation.py/plats.py):
    - (reservation) Le "POST" valide les champs obligatoires (nb_personnes, email,...) et renvoie un 400 en cas d'erreur (avec un message d'erreur explicite).
    - (plats) Le "POST" vérifie que tous les champs obligatoires sont remplis et que le prix est positif, renvoyant également un 400 avec un message explicite en cas d'erreur.
    - (les deux) Le "DELETE" vérifie que la réservation/le plat existe avant suppression, renvoyant un 404 si introuvable.
- Nos 9 autres composants réutilisables sont:
    - Filtres (boutons) pour le menu (CategoryFilter.jsx)
    - Formateur de prix en CHF (PriceTag.jsx)
    - Message de chargement (Loader.jsx)
    - Popup de confirmation (Modal.jsx)
    - Barre de navigation (Navbar.jsx)
    - Notes /5 en étoiles (StarRating.jsx)
    - Message d'erreur (ErrorMessage.jsx)
    - Carte d'un plat (MenuCard.jsx)
    - Header/Footer (PageHeader.jsx/Footer.jsx)
- Gestion d'état frontend:
    - (AdminPlatForm.jsx) Chaque champ du formulaire est stocké dans un useState et mis à jour par setFormDate à chaque frappe.
    - (Menu.jsx/Admin.jsx) Au chargement de la page, useEffect appelle l'API qui interroge la BDD et stocke le résultat dans un useState pour l'afficher dynamiquement.
    - (Menu.jsx) La catégorie cliquée par l'utilisateur est stockée dans un useState, ce qui déclenche automatiquement le re-affichage de la liste des plats filtrée selon cette valeur.
- Base de donnée:
    - Ce projet comporte SQLite (database.db) configurée via SQLAlchemy dans Flask. 
    - LA BDD contient les tables "plats", "categories" et "reservations", et est peuplée automatiquement au premier lancement via seed.py (contient 3 catégories et 5 plats de démonstration)
- Modèle de donées:
    - Trois modèles métier sont reliés entre eux : Categorie, Plat et Reservation. 
        - Catégorie et Plat sont liés par une relation 1-N (une catégorie peut contenir plusieurs plats)
        - Plat et réservation sont liés par une seconde relation 1-N (une réservation peut contenir plusieurs plats)
- Styling (SCSS):
    - Le projet utilise SCSS organisé en trois fichiers distincts : 
        - variables.scss définit les couleurs, espacements et breakpoints du site
        - mixins.scss contient deux mixins réutilisables (screensize pour les media queries et flex-position pour le flexbox)
        - main.scss les importe via @use pour personnaliser Bootstrap (navbar, boutons) et styliser les composants maison (hero, menu-card, admin-tab), utilisant les variables et mixins définis.
- Responsivité:
    - La responsivité est gérée par le fichier mixins.scss.
    - Le mixin utilisé est "screensize" qui couvre les trois breakpoints demandés ($mobile: 480px, $tablet: 768px, $desktop: 1024px).
        - (Ces valeurs ci-dessus sont implémentés dans variables.scss, qui est ensuite importé par mixins.scss).
    - Ce mixin est utilisé dans main.scss pour le breakpoint mobile.
    - Les breakpoints tablet et desktop sont gérés par la grille Bootstrap.


