//affichage formaté d'un prix
//reçoit un prix (nombre) et l'affiche formaté en CHF

function PriceTag({ prix }) {
  return (
    <span className="fw-bold">
      {Number(prix).toFixed(2)} <abbr title="Franc suisse">CHF</abbr>
    </span>
  )
}

export default PriceTag