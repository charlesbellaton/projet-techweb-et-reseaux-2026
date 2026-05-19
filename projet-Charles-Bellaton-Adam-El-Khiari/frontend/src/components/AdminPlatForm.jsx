//formulaire dans le dashboard admin pour ajouter un plat au menu
import {useState} from 'react'

function AdminPlatForm({categories, onPlatAjoute}) {
  const [formData, setFormData] = useState({ nom: '', description: '', prix: '', categorie_id: '', image_url: '' })
  const [erreur,  setErreur]  = useState('')
  const [succes,  setSucces]  = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErreur('')
    setSucces('')

    if (!formData.nom.trim())   { setErreur('Le nom est obligatoire.'); return }
    if (!formData.prix || Number(formData.prix) <= 0) { setErreur('Prix invalide.'); return }
    if (!formData.categorie_id) { setErreur('Choisir une catégorie.'); return }

    setLoading(true)
    try {
      const response = await fetch('/api/plats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, prix: Number(formData.prix), categorie_id: Number(formData.categorie_id) }),
      })
      const data = await response.json()
      if (!response.ok) { setErreur(data.erreur || 'Erreur.'); return }
      setSucces(`"${data.nom}" ajouté.`)
      setFormData({ nom: '', description: '', prix: '', categorie_id: '', image_url: '' })
      if (onPlatAjoute) onPlatAjoute(data)
    } catch {
      setErreur('Impossible de contacter le serveur.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-form">
      <h3 className="mb-4">Ajouter un plat</h3>

      {erreur && <div className="alert alert-danger">{erreur}</div>}
      {succes && <div className="alert alert-success">{succes}</div>}

      <form onSubmit={handleSubmit} noValidate>
        
        <div className="mb-3">
          <label className="form-label">Nom *</label>
          <input type="text" name="nom" className="form-control"
            value={formData.nom} onChange={handleChange} />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea name="description" className="form-control"
            value={formData.description} onChange={handleChange} rows={2} />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Prix (CHF) *</label>
          <input type="number" name="prix" className="form-control"
            value={formData.prix} onChange={handleChange} min="0" step="0.50" />
        </div>

        <div className="mb-3">
          <label className="form-label">Catégorie *</label>
          <select name="categorie_id" className="form-select"
            value={formData.categorie_id} onChange={handleChange}>
            <option value="">-- Choisir --</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.nom}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">URL de l'image (optionnel)</label>
          <input type="text" name="image_url" className="form-control"
            value={formData.image_url} onChange={handleChange}
            placeholder="https://..." />
        </div>
        
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Ajout...' : 'Ajouter'}
        </button>
      </form>
    </div>
  )
}

export default AdminPlatForm