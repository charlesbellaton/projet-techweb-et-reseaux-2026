#crud
#Routes exposées :
#GET    /api/plats         -> liste tous les plats
#GET    /api/plats/<id>    -> retourne un plat précis
#POST   /api/plats         -> crée un nouveau plat
#PUT    /api/plats/<id>    -> modifie un plat
#DELETE /api/plats/<id>    -> supprime un plat

from flask import Blueprint, jsonify, request, abort
from database import db
from models.plat import Plat, Categorie

plats_bp = Blueprint("plats", __name__)

#clique sur une categorie
@plats_bp.route("/plats", methods=["GET"])
def get_plats():
    categorie_id = request.args.get("categorie_id")
    if categorie_id:
        plats = Plat.query.filter_by(categorie_id=categorie_id).all()
    else:
        plats = Plat.query.all()
    return jsonify([p.to_dict() for p in plats])

#clique sur un plat
@plats_bp.route("/plats/<int:plat_id>", methods=["GET"])
def get_plat(plat_id):
    plat = Plat.query.filter_by(id=plat_id).first()
    if plat is None:
        abort(404)
    return jsonify(plat.to_dict())

#ajouter un plat (admin)
@plats_bp.route("/plats", methods=["POST"])
def create_plat():
    data = request.get_json()

    # champs obligatoires (description devient optionnelle)
    champs = ["nom", "prix", "categorie_id"]
    for champ in champs:
        if not data.get(champ):
            return jsonify({"erreur": f"Le champ '{champ}' est obligatoire."}), 400

    # protection conversion prix
    try:
        prix = float(data["prix"])
        if prix <= 0:
            return jsonify({"erreur": "Le prix doit être positif."}), 400
    except (ValueError, TypeError):
        return jsonify({"erreur": "Le prix doit être un nombre valide."}), 400

    # vérification que la catégorie existe
    categorie = Categorie.query.get(data["categorie_id"])
    if categorie is None:
        return jsonify({"erreur": "Catégorie introuvable."}), 400

    plat = Plat(
        nom         = data["nom"],
        description = data.get("description", ""),
        prix        = prix,
        image_url   = data.get("image_url", ""),
        categorie_id= data["categorie_id"],
    )
    db.session.add(plat)
    db.session.commit()
    return jsonify(plat.to_dict()), 201

@plats_bp.route("/plats/<int:plat_id>", methods=["PUT"])
def update_plat(plat_id):
    plat = Plat.query.filter_by(id=plat_id).first()
    if plat is None:
        abort(404)
    data = request.get_json()

    if "nom" in data: plat.nom = data["nom"]
    if "description" in data: plat.description = data["description"]
    if "prix" in data:
        try:
            prix = float(data["prix"])
            if prix <= 0:
                return jsonify({"erreur": "Le prix doit être positif."}), 400
            plat.prix = prix
        except (ValueError, TypeError):
            return jsonify({"erreur": "Le prix doit être un nombre valide."}), 400
    if "image_url" in data: plat.image_url = data["image_url"]
    if "categorie_id" in data:
        categorie = Categorie.query.get(data["categorie_id"])
        if categorie is None:
            return jsonify({"erreur": "Catégorie introuvable."}), 400
        plat.categorie_id = data["categorie_id"]

    db.session.commit()
    return jsonify(plat.to_dict())

@plats_bp.route("/plats/<int:plat_id>", methods=["DELETE"])
def delete_plat(plat_id):
    plat = Plat.query.filter_by(id=plat_id).first()
    if plat is None:
        abort(404)
    db.session.delete(plat)
    db.session.commit()
    return "", 204