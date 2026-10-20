import { Link } from 'react-router-dom'

function NoEncontrada() {
  return (
    <div className="text-center my-5">
      <h1>404</h1>
      <p>Esta página no existe en ninguna dimensión.</p>
      <Link to="/" className="btn btn-primary">Volver al inicio</Link>
    </div>
  )
}

export default NoEncontrada
