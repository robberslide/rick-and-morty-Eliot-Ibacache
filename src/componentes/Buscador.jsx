import { useState } from 'react'
import Boton from './Boton'

// Buscador por nombre. Guarda lo que escribe el usuario en su propio estado.
function Buscador({ onBuscar }) {
  const [texto, setTexto] = useState('')
  const [error, setError] = useState('')

  function manejarSubmit(e) {
    e.preventDefault()
    // validación: si escribe algo, que tenga al menos 2 letras
    if (texto.trim().length === 1) {
      setError('Escribe al menos 2 letras')
      return
    }
    setError('')
    onBuscar(texto.trim())
  }

  return (
    <form onSubmit={manejarSubmit}>
      <label htmlFor="buscar" className="form-label">Buscar por nombre</label>
      <div className="input-group">
        <input
          id="buscar"
          type="text"
          className={`form-control ${error ? 'is-invalid' : ''}`}
          placeholder="Ej: Rick"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <Boton texto="Buscar" tipo="submit" />
      </div>
      {error && <div className="text-danger small mt-1">{error}</div>}
    </form>
  )
}

export default Buscador
