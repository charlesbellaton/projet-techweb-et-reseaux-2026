//Affichage d'étoiles(sur 5)
//pas de changement bootstrap car composant visuel

import {useState} from 'react'

function StarRating({note = 0, interactive = false, onNote}) {
  const [hover, setHover] = useState(0)
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((etoile) => (
        <span
          key={etoile}
          className={`star ${etoile <= (hover || note) ? 'star--active' : ''}`}
          style={{cursor: interactive ? 'pointer' : 'default'}}
          onClick={() => interactive && onNote && onNote(etoile)}
          onMouseEnter={() => interactive && setHover(etoile)}
          onMouseLeave={() => interactive && setHover(0)}>
          ★
        </span>
      ))}
      <span className="star-rating__label">{note}/5</span>
    </div>
  )
}

export default StarRating
