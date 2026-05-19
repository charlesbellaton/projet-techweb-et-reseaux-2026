//liste des plats (route "/menu")
// Concepts démontrés :
//   1. useEffect  : exécute du code au chargement du composant
//   2. useState   : stocke plats, catégories, filtre actif, loading, erreur
//   3. localStorage : persiste le filtre entre les visites
//   4. Filtrage frontend : filtre les plats sans nouvelle requête API

import {useState, useEffect} from 'react'
import MenuCard       from '../components/MenuCard'
import CategoryFilter from '../components/CategoryFilter'
import Loader         from '../components/Loader'
import ErrorMessage   from '../components/ErrorMessage'

function Menu() {
  const [plats,      setPlats]      = useState([])
  const [categories, setCategories] = useState([])

  // Restaure le dernier filtre depuis localStorage
  const [categorieActive, setCategorieActive] = useState(() => {
    const saved = localStorage.getItem('categorieActive')
    return saved ? Number(saved) : null
  })

  const [loading, setLoading] = useState(true)
  const [erreur,  setErreur]  = useState('')

  // Chargement des données au montage — fetch séquentiel
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resPlats = await fetch('/api/plats')
        if (!resPlats.ok) throw new Error('Erreur chargement plats')
        setPlats(await resPlats.json())

        const resCats = await fetch('/api/categories')
        if (!resCats.ok) throw new Error('Erreur chargement catégories')
        setCategories(await resCats.json())

      } catch (err) {
        setErreur('Impossible de charger le menu.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Sauvegarde du filtre dans localStorage à chaque changement
  useEffect(() => {
    if (categorieActive === null) {
      localStorage.removeItem('categorieActive')
    } else {
      localStorage.setItem('categorieActive', categorieActive)
    }
  }, [categorieActive])

  // Filtrage côté frontend — pas de nouvelle requête
  const platsFiltres = categorieActive
    ? plats.filter(p => p.categorie_id === categorieActive)
    : plats

  if (loading) return <Loader />
  if (erreur)  return <ErrorMessage message={erreur} />

  return (
    <div className="menu-page">
      <div className="container py-4">
        <h1 className="mb-3">Notre Menu</h1>
        <CategoryFilter
          categories={categories}
          selected={categorieActive}
          onSelect={setCategorieActive}
        />
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {platsFiltres.map((plat) => (
            <div className="col" key={plat.id}>
              <MenuCard plat={plat} />
            </div>
          ))}
        </div>
        {platsFiltres.length === 0 && <p className="mt-3 text-muted">Aucun plat dans cette catégorie.</p>}
      </div>
    </div>
  )
}

export default Menu