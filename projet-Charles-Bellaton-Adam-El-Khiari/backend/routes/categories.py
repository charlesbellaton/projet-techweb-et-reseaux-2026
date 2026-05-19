#route : GET /api/categories → retourne la liste des catégories
#utilisé par le frontend pour afficher les boutons de filtre sur le menu

from flask import Blueprint, jsonify
from models.plat import Categorie

categories_bp = Blueprint("categories", __name__)

@categories_bp.route("/categories", methods=["GET"])
def get_categories():
    categories = Categorie.query.all()
    return jsonify([c.to_dict() for c in categories])
