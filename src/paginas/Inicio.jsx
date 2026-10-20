import { useEffect, useState } from 'react'
import Buscador from '../componentes/Buscador'
import Filtros from '../componentes/Filtros'
import ListaPersonajes from '../componentes/ListaPersonajes'
import MensajeError from '../componentes/MensajeError'
import Cargando from '../componentes/Cargando'
import Boton from '../componentes/Boton'
import { obtenerPersonajes } from '../servicios/api'

function Inicio() {
  const [personajes, setPersonajes] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [pagina, setPagina] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(1)
  const [nombre, setNombre] = useState('')
  const [estado, setEstado] = useState('')
  const [especie, setEspecie] = useState('')

  // Cada vez que cambia la página, el nombre o un filtro, se vuelve a llamar a la API
  useEffect(() => {
    setCargando(true)
    setError('')
    obtenerPersonajes(pagina, nombre, estado, especie)
      .then((datos) => {
        setPersonajes(datos.results)
        setTotalPaginas(datos.info.pages)
      })
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false))
  }, [pagina, nombre, estado, especie])

  // al buscar o filtrar se vuelve a la página 1
  function buscar(texto) {
    setNombre(texto)
    setPagina(1)
  }

  function cambiarEstado(valor) {
    setEstado(valor)
    setPagina(1)
  }

  function cambiarEspecie(valor) {
    setEspecie(valor)
    setPagina(1)
  }

  return (
    <>
      <h1 className="titulo-app mb-1">Personajes de Rick and Morty</h1>
      <p className="text-muted">Datos obtenidos de la API pública rickandmortyapi.com</p>

      <div className="card card-body mb-4">
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <Buscador onBuscar={buscar} />
          </div>
          <div className="col-12 col-md-6">
            <Filtros estado={estado} especie={especie} onCambiarEstado={cambiarEstado} onCambiarEspecie={cambiarEspecie} />
          </div>
        </div>
      </div>

      <MensajeError mensaje={error} />

      {cargando ? <Cargando /> : !error && <ListaPersonajes personajes={personajes} />}

      {!cargando && totalPaginas > 1 && (
        <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
          <Boton texto="Anterior" onClick={() => setPagina(pagina - 1)} deshabilitado={pagina === 1} />
          <span>Página {pagina} de {totalPaginas}</span>
          <Boton texto="Siguiente" onClick={() => setPagina(pagina + 1)} deshabilitado={pagina === totalPaginas} />
        </div>
      )}
    </>
  )
}

export default Inicio
