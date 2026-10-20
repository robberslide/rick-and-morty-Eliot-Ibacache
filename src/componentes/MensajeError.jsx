// Solo se muestra si hay un mensaje de error
function MensajeError({ mensaje }) {
  if (!mensaje) return null

  return (
    <div className="alert alert-danger" role="alert">
      {mensaje}
    </div>
  )
}

export default MensajeError
