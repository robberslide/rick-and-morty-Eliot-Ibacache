// Botón reutilizable. Recibe el texto, la función del clic y el color por props.
function Boton({ texto, onClick, color = 'primary', tipo = 'button', deshabilitado = false }) {
  return (
    <button type={tipo} className={`btn btn-${color}`} onClick={onClick} disabled={deshabilitado}>
      {texto}
    </button>
  )
}

export default Boton
