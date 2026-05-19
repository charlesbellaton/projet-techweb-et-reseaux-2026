//Barre de navigation

//link de React Router change l'URL sans recharger la page
//useLocation retourne l'URL courante pour marquer le lien actif
import {Link, useLocation} from 'react-router-dom'

//navbar-expand-md : burger menu à partir de 768px
//requiert le js bootstrap pour le burger menu (voir main.jsx)
function Navbar() {
  const location = useLocation()
  const isActive = (path) => location.pathname === path ? 'active' : ''
  return (
    <nav className="navbar navbar-expand-md">
      <div className="container">
        <Link to="/" className="navbar-brand text-white fw-bold">
          La Trattoria
        </Link>
        {/* Burger menu mobile */}
        <button className="navbar-toggler" type="button"
          data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* Liens — cachés sur mobile, visibles via burger */}
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto gap-2">
            <li className="nav-item"><Link to="/" className={`nav-link ${isActive('/')}`}>Accueil</Link></li>
            <li className="nav-item"><Link to="/menu" className={`nav-link ${isActive('/menu')}`}>Menu</Link></li>
            <li className="nav-item"><Link to="/reservations" className={`nav-link ${isActive('/reservations')}`}>Réserver</Link></li>
            <li className="nav-item"><Link to="/admin" className={`nav-link ${isActive('/admin')}`}>Admin</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar