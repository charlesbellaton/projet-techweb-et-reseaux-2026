#données de démonstration
#insère des données initiales dans la base au premier lancement
#on vérifie d'abord si des données existent déjà pour ne pas
#dupliquer les entrées à chaque redémarrage du serveur

from database import db
from models.plat import Plat, Categorie

def seed_data():
    #si des catégories existent déjà, on ne fait rien
    if Categorie.query.first():
        return

    #création des catégories
    pasta = Categorie(nom="Pasta")
    pizza = Categorie(nom="Pizza")
    desserts = Categorie(nom="Desserts")

    db.session.add_all([pasta, pizza, desserts])
    #flush() pour créer les id
    db.session.flush()

    #création des plats(5 plats de démo)
    plats = [
        Plat(nom="Spaghetti Carbonara", description="Spaghetti, guanciale, oeuf, pecorino romano.", prix=16.00, categorie_id=pasta.id, image_url="https://www.shutterstock.com/image-photo/spaghetti-alla-carbonara-sauce-classic-600nw-2570098411.jpg"),
        Plat(nom="Tagliatelle al Ragù", description="Pâtes fraîches maison avec ragù bolognaise.", prix=17.50, categorie_id=pasta.id,image_url="https://media.istockphoto.com/id/2219524393/photo/close-up-of-plates-with-tagliatelle-al-ragu-long-flat-egg-pasta-with-a-meat-sauce-or.jpg?s=612x612&w=0&k=20&c=ivRceGJs5FojR4lNNm56s199Z9qCy_aUUQaF2pE091c="),
        Plat(nom="Pizza Margherita", description="Sauce tomate, mozzarella fior di latte, basilic.", prix=13.00, categorie_id=pizza.id, image_url="https://media.istockphoto.com/id/1393150881/photo/italian-pizza-margherita-with-cheese-and-tomato-sauce-on-the-board-on-grey-table-macro-close.jpg?s=612x612&w=0&k=20&c=kL0Vhg2XKBjEl__iG8sFv31WTiahdpLc3rTDtNZuD2g="),
        Plat(nom="Pizza Diavola", description="Sauce tomate, mozzarella, salami piquant.", prix=15.00, categorie_id=pizza.id, image_url="https://www.shutterstock.com/image-photo/pizza-diavolo-600nw-2725258765.jpg"),
        Plat(nom="Tiramisù della Casa", description="Mascarpone, savoiardi, expresso et cacao.", prix=8.00, categorie_id=desserts.id, image_url="https://t4.ftcdn.net/jpg/03/46/17/09/360_F_346170975_ezUUoZgYQ7fbAPzEWYWQ44G9lf13Gcel.jpg"),
    ]

    db.session.add_all(plats)
    db.session.commit()
    print("Base de données peuplée avec les données de démo.")
