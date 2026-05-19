from database import db
#modèles Categorie et Plat
#une catégorie peut avoir plusieurs plats, un plat appartient à une catégorie
#relation "un à plusieurs" (1-N)

class Categorie(db.Model):
    __tablename__ = "categorie"

    id  = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(100), nullable=False)

    #permet d'accéder aux plats depuis une catégorie avec categorie.plats
    #back_populates crée le lien inverse: plat.categorie
    plats = db.relationship("Plat", back_populates="categorie")

    def to_dict(self):
        #convertit l'objet Python en dictionnaire pour pouvoir l'envoyer en JSON
        return {"id": self.id, "nom": self.nom}


class Plat(db.Model):
    __tablename__ = "plat"

    id = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=False)
    prix = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String(300), nullable=True)

    #clé étrangère: relie chaque plat à une catégorie (relation 1-N)
    categorie_id = db.Column(db.Integer, db.ForeignKey("categorie.id"), nullable=False)
    categorie = db.relationship("Categorie", back_populates="plats")

    def to_dict(self):
        return {
            "id": self.id,
            "nom": self.nom,
            "description": self.description,
            "prix": self.prix,
            "image_url": self.image_url,
            "categorie_id": self.categorie_id,
            #évite une erreur si la catégorie est absente
            "categorie": self.categorie.nom if self.categorie else None,
        }
