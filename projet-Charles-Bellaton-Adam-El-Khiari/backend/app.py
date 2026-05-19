#point d'entrée du serveur Flask
#démarre l'application Flask, Il:
# 1. Crée l'application Flask
# 2. Configure la base de données SQLite via SQLAlchemy
# 3. Active CORS pour autoriser les requêtes du frontend React (port 5173)
# 4. Enregistre les blueprints (groupes de routes) de l'API
# 5. Crée les tables et insère les données de démo au premier lancement

from flask import Flask
from flask_cors import CORS #pour autoriser les requêtes du frontend(l'appeler)
from database import db
from routes.plats import plats_bp
from routes.reservations import reservations_bp
from routes.categories import categories_bp

app = Flask(__name__)
CORS(app)

#dit où est la base de données (chemin relatif dans backend, crée un dossier)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db" 
#SQLAlchemy surveille chaque modification par défaut, ce qui consomme de la mémoire
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False 

#lie l'objet db avec l'application flask 
db.init_app(app)

#enregistrement des blueprints 
#chaque blueprint a un groupe de routes
#les préfixes api servent à différencier les routes de l'api
#des autres routes du sites
app.register_blueprint(plats_bp, url_prefix="/api")
app.register_blueprint(reservations_bp, url_prefix="/api")
app.register_blueprint(categories_bp, url_prefix="/api")

#création des tables et insertion des données du début (seed) au premier lancement
with app.app_context():
    db.create_all()
    from seed import seed_data
    seed_data()

#lance le serveur
if __name__ == "__main__":
    app.run(debug=True, port=5000)
