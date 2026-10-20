import { Link } from 'react-router-dom'
import { estados, especies, generos, traducir } from '../datos/traducciones'

// Muestra un personaje en una tarjeta de Bootstrap. Recibe el personaje por props.
function TarjetaPersonaje({ personaje }) {
  // color del badge según el estado
  let colorEstado = 'secondary'
  if (personaje.status === 'Alive') colorEstado = 'success'
  if (personaje.status === 'Dead') colorEstado = 'danger'

  return (
    <div className="card h-100 tarjeta-personaje">
      <img src={personaje.image} className="card-img-top" alt={personaje.name} />
      <div className="card-body">
        <h5 className="card-title">{personaje.name}</h5>
        <span className={`badge bg-${colorEstado} mb-2`}>{traducir(estados, personaje.status)}</span>
        <p className="card-text small mb-0">
          <strong>Especie:</strong> {traducir(especies, personaje.species)}
          <br />
          <strong>Género:</strong> {traducir(generos, personaje.gender)}
          <br />
          <strong>Origen:</strong> {personaje.origin.name}
          <br />
          <strong>Ubicación:</strong> {personaje.location.name}
        </p>
      </div>
      <div className="card-footer bg-white border-0">
        <Link to={`/personaje/${personaje.id}`} className="btn btn-outline-success btn-sm w-100">
          Ver detalle
        </Link>
      </div>
    </div>
  )
}

export default TarjetaPersonaje
