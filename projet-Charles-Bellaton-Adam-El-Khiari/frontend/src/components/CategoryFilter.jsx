//Boutons de filtre par catégorie

//l'état du filtre vit dans le parent (Menu.jsx)
//ce composant reçoit la valeur actuelle et une fonction pour la changer
function CategoryFilter({categories, selected, onSelect}) {
  return (
    <div className="d-flex flex-wrap gap-2 mb-3">
      <button
        className={`btn btn-sm ${selected === null ? 'btn-primary' : 'btn-outline-primary'}`}
        onClick={() => onSelect(null)}>
        Tous
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          className={`btn btn-sm ${selected === cat.id ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => onSelect(cat.id)}>
          {cat.nom}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter