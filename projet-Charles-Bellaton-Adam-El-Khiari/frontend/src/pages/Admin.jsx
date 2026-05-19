// Dashboard admin (route "/admin")
//
// Affiche les réservations et permet d'ajouter des plats.
// Utilise Modal pour confirmer les suppressions.
// Après suppression, met à jour le state sans recharger la page.

import {useState, useEffect} from 'react'
import AdminPlatForm from '../components/AdminPlatForm'
import Loader        from '../components/Loader'
import ErrorMessage  from '../components/ErrorMessage'
import Modal         from '../components/Modal'

function Admin() {
  const [reservations, setReservations] = useState([])
  const [categories,   setCategories]   = useState([])
  const [plats,        setPlats]        = useState([])
  const [loading,      setLoading]      = useState(true)
  const [erreur,       setErreur]       = useState('')
  const [onglet,       setOnglet]       = useState('reservations')

  // État de la modal de confirmation
  const [modalOuverte,    setModalOuverte]    = useState(false)
  const [idASupprimer,    setIdASupprimer]    = useState(null)
  const [typeASupprimer,  setTypeASupprimer]  = useState(null) // 'reservation' ou 'plat'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resRes = await fetch('/api/reservations')
        if (!resRes.ok) throw new Error('Erreur réservations')
        setReservations(await resRes.json())

        const resCats = await fetch('/api/categories')
        if (!resCats.ok) throw new Error('Erreur catégories')
        setCategories(await resCats.json())

        const resPlats = await fetch('/api/plats')
        if (!resPlats.ok) throw new Error('Erreur plats')
        setPlats(await resPlats.json())

      } catch {
        setErreur('Impossible de charger les données.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const demanderSuppression = (id, type) => {
    setIdASupprimer(id)
    setTypeASupprimer(type)
    setModalOuverte(true)
  }

  const confirmerSuppression = async () => {
    setModalOuverte(false)
    const url = typeASupprimer === 'plat'
      ? `/api/plats/${idASupprimer}`
      : `/api/reservations/${idASupprimer}`
    try {
      const response = await fetch(url, { method: 'DELETE' })
      if (response.ok) {
        if (typeASupprimer === 'plat') {
          setPlats(prev => prev.filter(p => p.id !== idASupprimer))
        } else {
          setReservations(prev => prev.filter(r => r.id !== idASupprimer))
        }
      }
    } catch {
      alert('Erreur lors de la suppression.')
    }
    setIdASupprimer(null)
    setTypeASupprimer(null)
  }

  if (loading) return <Loader />
  if (erreur)  return <ErrorMessage message={erreur} />

  return (
    <div className="container py-4">
      <h1 className="mb-4">Dashboard Admin</h1>

      {/* Onglets Bootstrap */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${onglet === 'reservations' ? 'active' : ''}`}
            onClick={() => setOnglet('reservations')}>
            Réservations ({reservations.length})
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${onglet === 'plats' ? 'active' : ''}`}
            onClick={() => setOnglet('plats')}>
            Gérer les plats ({plats.length})
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${onglet === 'ajout' ? 'active' : ''}`}
            onClick={() => setOnglet('ajout')}>
            Ajouter un plat
          </button>
        </li>
      </ul>

      {/* Onglet réservations */}
      {onglet === 'reservations' && (
        <div>
          {reservations.length === 0 ? (
            <p className="text-muted">Aucune réservation.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Nom</th><th>Email</th><th>Date</th>
                    <th>Personnes</th><th>Plat</th><th>Message</th><th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((r) => (
                    <tr key={r.id}>
                      <td>{r.nom_client}</td>
                      <td>{r.email}</td>
                      <td>{r.date}</td>
                      <td>{r.nb_personnes}</td>
                      <td>{r.plat || '—'}</td>
                      <td>{r.message || '—'}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => demanderSuppression(r.id, 'reservation')}>
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Onglet gérer les plats */}
      {onglet === 'plats' && (
        <div>
          {plats.length === 0 ? (
            <p className="text-muted">Aucun plat.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Nom</th><th>Catégorie</th><th>Prix</th><th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {plats.map((p) => (
                    <tr key={p.id}>
                      <td>{p.nom}</td>
                      <td>{p.categorie}</td>
                      <td>{p.prix.toFixed(2)} CHF</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => demanderSuppression(p.id, 'plat')}>
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Onglet ajouter un plat */}
      {onglet === 'ajout' && (
        <AdminPlatForm
          categories={categories}
          onPlatAjoute={(p) => {
            setPlats(prev => [...prev, p])
            setOnglet('plats')
          }}
        />
      )}

      <Modal
        isOpen={modalOuverte}
        titre={typeASupprimer === 'plat' ? 'Supprimer ce plat ?' : 'Supprimer cette réservation ?'}
        message="Cette action est irréversible."
        onConfirm={confirmerSuppression}
        onCancel={() => setModalOuverte(false)}
      />
    </div>
  )
}

export default Admin