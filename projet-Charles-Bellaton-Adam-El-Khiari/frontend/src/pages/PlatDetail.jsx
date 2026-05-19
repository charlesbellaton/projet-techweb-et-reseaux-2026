//détail d'un plat (route "/plats/:id")

//useParams lit le paramètre :id dans l'URL.
// x : URL = "/plats/3" → useParams() retourne { id: "3" }
import {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import Loader       from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'

function PlatDetail() {
  const { id } = useParams()
  const [plat,    setPlat]    = useState(null)
  const [loading, setLoading] = useState(true)
  const [erreur,  setErreur]  = useState('')

  // Se re-exécute si l'id dans l'URL change
  useEffect(() => {
    const fetchPlat = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/plats/${id}`)
        if (!response.ok) throw new Error('Plat introuvable.')
        setPlat(await response.json())
      } catch (err) {
        setErreur(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchPlat()
  }, [id])

  if (loading) return <Loader />
  if (erreur)  return <ErrorMessage message={erreur} />
  if (!plat)   return null

  return (
    <div className="container py-4">
      <Link to="/menu" className="btn btn-outline-secondary btn-sm mb-3">← Retour</Link>
      <div className="row g-4">
        <div className="col-md-6">
          <img
            src={plat.image_url || 'https://placehold.co/600x300?text=Plat'}
            alt={plat.nom}
            className="img-fluid rounded plat-detail__img"
          />
        </div>
        <div className="col-md-6">
          <span className="badge bg-secondary mb-2">{plat.categorie}</span>
          <h1>{plat.nom}</h1>
          <p className="fw-bold fs-5">{plat.prix.toFixed(2)} CHF</p>
          <p className="text-muted">{plat.description}</p>
          <Link to="/reservations" className="btn btn-primary">Réserver une table</Link>
        </div>
      </div>
    </div>
  )
}

export default PlatDetail