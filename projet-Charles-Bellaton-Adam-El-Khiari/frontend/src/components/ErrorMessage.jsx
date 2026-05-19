//Affiché quand une requête API échoue

function ErrorMessage({ message }) {
  return (
    <div className="text-center p-5 text-danger">
      <p>{message || 'Une erreur est survenue.'}</p>
    </div>
  )
}

export default ErrorMessage