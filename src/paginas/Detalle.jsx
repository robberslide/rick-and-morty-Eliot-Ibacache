import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Cargando from '../componentes/Cargando'
import MensajeError from '../componentes/MensajeError'
import { obtenerPersonaje } from '../servicios/api'
import { estados, especies, generos, traducir } from '../datos/traducciones'

function Detalle() {
  const { id } = useParams() // el id viene en la URL: /personaje/1
  const [personaje, setPersonaje] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    obtenerPersonaje(id)
      .then((datos) => setPersonaje(datos))
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false))
  }, [id])

  if (cargando) return <Cargando />

  if (error) {
    return (
      <>
        <MensajeError mensaje={error} />
        <Link to="/" className="btn btn-primary">Volver</Link>
      </>
    )
  }

  return (
    <>
      <Link to="/" className="btn btn-outline-primary mb-3">← Volver</Link>
      <div className="card">
        <div className="row g-0">
          <div className="col-md-4">
            <img src={personaje.image} alt={personaje.name} className="img-fluid w-100 foto-detalle" />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h2 className="card-title">{personaje.name}</h2>
              <ul className="list-group list-group-flush">
                <li className="list-group-item"><strong>Estado:</strong> {traducir(estados, personaje.status)}</li>
                <li className="list-group-item"><strong>Especie:</strong> {traducir(especies, personaje.species)}</li>
                <li className="list-group-item"><strong>Tipo:</strong> {personaje.type || 'No tiene'}</li>
                <li className="list-group-item"><strong>Género:</strong> {traducir(generos, personaje.gender)}</li>
                <li className="list-group-item"><strong>Origen:</strong> {personaje.origin.name}</li>
                <li className="list-group-item"><strong>Ubicación:</strong> {personaje.location.name}</li>
                <li className="list-group-item"><strong>Aparece en:</strong> {personaje.episode.length} episodios</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Detalle
