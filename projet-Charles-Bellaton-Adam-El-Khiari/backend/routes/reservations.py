# routes/reservations.py — Endpoints pour les réservations
#
# Routes :
#GET    /api/reservations        -> liste toutes les réservations (admin)
#POST   /api/reservations        -> crée une réservation (formulaire client)
#DELETE /api/reservations/<id>   -> supprime une réservation (admin)

import re
from datetime import date, datetime
from flask import Blueprint, jsonify, request, abort
from database import db
from models.reservation import Reservation
from models.plat import Plat

reservations_bp = Blueprint("reservations", __name__)

@reservations_bp.route("/reservations", methods=["GET"])
def get_reservations():
    reservations = Reservation.query.all()
    return jsonify([r.to_dict() for r in reservations])


@reservations_bp.route("/reservations", methods=["POST"])
def create_reservation():
    data = request.get_json()

    # champs obligatoires
    champs = ["nom_client", "email", "date", "nb_personnes"]
    for champ in champs:
        if data.get(champ) is None or data.get(champ) == "":
            return jsonify({"erreur": f"Le champ '{champ}' est obligatoire."}), 400

    # validation nombre de personnes
    try:
        nb = int(data["nb_personnes"])
        if nb < 1 or nb > 20:
            return jsonify({"erreur": "Le nombre de personnes doit être entre 1 et 20."}), 400
    except (ValueError, TypeError):
        return jsonify({"erreur": "Le nombre de personnes doit être un entier."}), 400

    # validation email
    if not re.match(r"^[\w\.-]+@[\w\.-]+\.\w{2,}$", data["email"]):
        return jsonify({"erreur": "L'adresse email est invalide."}), 400

    # validation date — doit être dans le futur
    try:
        date_reservation = datetime.strptime(data["date"], "%Y-%m-%d").date()
        if date_reservation < date.today():
            return jsonify({"erreur": "La date doit être dans le futur."}), 400
    except ValueError:
        return jsonify({"erreur": "Format de date invalide (YYYY-MM-DD)."}), 400

    # vérification que le plat existe si fourni
    plat_id = data.get("plat_id")
    if plat_id is not None:
        plat = Plat.query.get(plat_id)
        if plat is None:
            return jsonify({"erreur": "Plat introuvable."}), 400

    reservation = Reservation(
        nom_client   = data["nom_client"],
        email        = data["email"],
        date         = data["date"],
        nb_personnes = nb,
        message      = data.get("message", ""),
        plat_id      = plat_id,
    )

    db.session.add(reservation)
    db.session.commit()
    return jsonify(reservation.to_dict()), 201


@reservations_bp.route("/reservations/<int:res_id>", methods=["DELETE"])
def delete_reservation(res_id):
    reservation = Reservation.query.filter_by(id=res_id).first()
    if reservation is None:
        abort(404)
    db.session.delete(reservation)
    db.session.commit()
    return "", 204