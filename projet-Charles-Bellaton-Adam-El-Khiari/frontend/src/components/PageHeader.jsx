//En-tête de page réutilisable
//utilisé sur toutes les pages pour garder une mise en page cohérente

function PageHeader({ titre, sousTitre }) {
  return (
    <div className="py-4 mb-3">
      <h1>{titre}</h1>
      {sousTitre && <p className="text-muted">{sousTitre}</p>}
    </div>
  )
}

export default PageHeader