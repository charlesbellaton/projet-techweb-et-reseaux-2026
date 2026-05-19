//Affiché pendant le chargement d'une requête API

function Loader() {
  return (
    <div className="text-center p-5">
      <div className="spinner-border text-secondary" role="status">
        <span className="visually-hidden">Chargement...</span>
      </div>
    </div>
  )
}

export default Loader