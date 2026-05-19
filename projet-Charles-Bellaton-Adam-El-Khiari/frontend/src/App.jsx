//composant racine : structure et routes de l'application
//navbar et footer s'affichent sur toutes les pages
//routes: chaque URL affiche un composant de page différent.

//gèrent la navigation et on importe les composants et pages qui changent
import {Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Accueil from './pages/Accueil'
import Menu from './pages/Menu'
import PlatDetail from './pages/PlatDetail'
import Reservations from './pages/Reservations'
import Admin from './pages/Admin'

//les routes du backend retourne des données json
//les routes du frontend changent ce qui est affiché sans retourner de données
//on attribue l'url à chaque page qui change selon lui
function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/plats/:id" element={<PlatDetail />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

//rend le composant app disponible à importer
export default App