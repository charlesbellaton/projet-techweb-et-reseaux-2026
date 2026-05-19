//page d'accueil (route "/")
//page statique avec présentation du restaurant

import {Link} from 'react-router-dom'

function Accueil() {
  return (
    <div>
      <section className="hero">
        <h1>La Trattoria</h1>
        <p>Restaurant italien à Morioh.</p>
        <div className="d-flex gap-3 justify-content-center mt-3">
          <Link to="/menu"         className="btn btn-primary">Voir le menu</Link>
          <Link to="/reservations" className="btn btn-secondary">Réserver</Link>
      </div>
      </section>
      <section className="section container text-center mt-auto">
        <p>Ouvert du mardi au dimanche, midi et soir.</p>
        <p>Morioh, S-City — 0120-93-5711</p>
      </section>
    </div>
  )
}

export default Accueil
