// pages/Reservations.jsx — Formulaire de réservation (route "/reservations")
// Démontre :
//   1. useState pour tous les champs du formulaire en un seul objet
//   2. Validation frontend : nom, email, date future, nb personnes
//   3. fetch POST vers l'API Flask
//   4. Message d'erreur visible si validation échoue

import {useState, useEffect} from 'react'

function Reservations() {
  const [formData, setFormData] = useState({
    nom_client: '', email: '', date: '', nb_personnes: 1, message: '', plat_id: ''
  })
  const [plats,   setPlats]   = useState([])
  const [erreur,  setErreur]  = useState('')
  const [succes,  setSucces]  = useState(false)
  const [loading, setLoading] = useState(false)

  // Charge les plats pour le select optionnel
  useEffect(() => {
    const fetchPlats = async () => {
      try {
        const res = await fetch('/api/plats')
        if (!res.ok) throw new Error('Erreur')
        setPlats(await res.json())
      } catch {
        // erreur silencieuse — ce champ est optionnel
      }
    }
    fetchPlats()
  }, [])

  // Gestionnaire générique pour tous les champs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErreur('')

    // Validation frontend
    if (!formData.nom_client.trim())        { setErreur('Veuillez entrer votre nom.'); return }
    if (!formData.email.match(/^[\w\.-]+@[\w\.-]+\.\w{2,}$/)) { setErreur('Email invalide.'); return }
    if (!formData.date)                      { setErreur('Veuillez choisir une date.'); return }
    if (new Date(formData.date) < new Date()) { setErreur('La date doit être dans le futur.'); return }
    if (formData.nb_personnes < 1 || formData.nb_personnes > 20) {
      setErreur('Entre 1 et 20 personnes.'); return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/reservations', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          ...formData,
          nb_personnes: Number(formData.nb_personnes),
          plat_id: formData.plat_id ? Number(formData.plat_id) : null,
        }),
      })
      const data = await response.json()
      if (!response.ok) { setErreur(data.erreur || 'Erreur.'); return }
      setSucces(true)
      setFormData({ nom_client: '', email: '', date: '', nb_personnes: 1, message: '', plat_id: '' })
    } catch {
      setErreur('Impossible de contacter le serveur.')
    } finally {
      setLoading(false)
    }
  }

  if (succes) {
    return (
      <div className="container py-5 text-center">
        <h2>Réservation confirmée !</h2>
        <p className="text-muted">Nous vous contacterons par email.</p>
        <button className="btn btn-primary mt-3" onClick={() => setSucces(false)}>
          Nouvelle réservation
        </button>
      </div>
    )
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">Réserver une table</h1>
      {erreur && <div className="alert alert-danger" role="alert">{erreur}</div>}

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="nom_client" className="form-label">Nom complet *</label>
          <input type="text" id="nom_client" name="nom_client" className="form-control"
            value={formData.nom_client} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email *</label>
          <input type="email" id="email" name="email" className="form-control"
            value={formData.email} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date *</label>
          <input type="date" id="date" name="date" className="form-control"
            value={formData.date} onChange={handleChange}
            min={new Date().toISOString().split('T')[0]} />
        </div>

        <div className="mb-3">
          <label htmlFor="nb_personnes" className="form-label">Nombre de personnes *</label>
          <input type="number" id="nb_personnes" name="nb_personnes" className="form-control"
            value={formData.nb_personnes} onChange={handleChange} min="1" max="20" />
        </div>

        <div className="mb-3">
          <label htmlFor="plat_id" className="form-label">Plat souhaité (optionnel)</label>
          <select id="plat_id" name="plat_id" className="form-select"
            value={formData.plat_id} onChange={handleChange}>
            <option value="">-- Pas de préférence --</option>
            {plats.map(p => <option key={p.id} value={p.id}>{p.nom}</option>)}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="message" className="form-label">Message (optionnel)</label>
          <textarea id="message" name="message" className="form-control"
            value={formData.message} onChange={handleChange} rows={3} />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Envoi...' : 'Confirmer la réservation'}
        </button>
      </form>
    </div>
  )
}

export default Reservations