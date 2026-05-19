//carte d'un plat dans la liste du menu

//reçoit un objet "plat" via les props et l'affiche
import {Link} from 'react-router-dom'

function MenuCard({plat}) {
  return (
    <div className="card h-100 menu-card">
      <img
        src={plat.image_url || 'https://placehold.co/400x160?text=Plat'}
        alt={plat.nom}
        className="card-img-top menu-card__img"
      />
      <div className="card-body">
        <span className="badge bg-secondary menu-card__badge">{plat.categorie}</span>
        <h3 className="card-title mt-2">{plat.nom}</h3>
        <p className="card-text menu-card__desc">{plat.description}</p>
        <div className="d-flex justify-content-between align-items-center">
          <span className="fw-bold">{plat.prix.toFixed(2)} CHF</span>
          <Link to={`/plats/${plat.id}`} className="btn btn-primary btn-sm">Voir</Link>
        </div>
      </div>
    </div>
  )
}

export default MenuCard