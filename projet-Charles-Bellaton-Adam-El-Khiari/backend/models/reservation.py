from database import db
#modèle Reservation
#relation "un à plusieurs" (plat 1-N réservations)

class Reservation(db.Model):
    __tablename__ = "reservation"

    id = db.Column(db.Integer, primary_key=True)
    nom_client = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(200), nullable=False)
    date = db.Column(db.String(20),  nullable=False)
    #format yyyy-mm-dd
    nb_personnes = db.Column(db.Integer, nullable=False)
    message = db.Column(db.Text, nullable=True)#champ optionnel

    #clé étrangère vers plat 
    plat_id = db.Column(db.Integer, db.ForeignKey("plat.id"), nullable=True)
    plat = db.relationship("Plat")

    def to_dict(self):
        return {
            "id": self.id,
            "nom_client": self.nom_client,
            "email": self.email,
            "date": self.date,
            "nb_personnes": self.nb_personnes,
            "message": self.message,
            "plat_id": self.plat_id,
            #évite une erreur si le plat est absent
            "plat": self.plat.nom if self.plat else None,
        }
