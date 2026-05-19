//fenêtre popup de confirmation

//clic sur le fond = annuler du coup stopPropagation évite de fermer en cliquant dedans
function Modal({isOpen, titre, message, onConfirm, onCancel}) {
  if (!isOpen) return null
  return (
    <div className="modal d-block" tabIndex="-1" onClick={onCancel}
      style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{titre}</h5>
            <button className="btn-close" onClick={onCancel} />
          </div>
          <div className="modal-body">
            <p className="text-muted">{message}</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-outline-secondary" onClick={onCancel}>Annuler</button>
            <button className="btn btn-danger" onClick={onConfirm}>Confirmer</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal