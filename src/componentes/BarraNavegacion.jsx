import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

function BarraNavegacion() {
  // para abrir y cerrar el menú en celular
  const [abierto, setAbierto] = useState(false)

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-success">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          🛸 Rick and Morty App
        </Link>
        <button className="navbar-toggler" type="button" onClick={() => setAbierto(!abierto)} aria-label="Menú">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${abierto ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end onClick={() => setAbierto(false)}>Personajes</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin" onClick={() => setAbierto(false)}>Administrador</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default BarraNavegacion
