import { useState } from 'react'
import FormularioPersonaje from '../componentes/FormularioPersonaje'
import Boton from '../componentes/Boton'
import { listarPersonajes, crearPersonaje, actualizarPersonaje, eliminarPersonaje } from '../datos/personajesLocales'
import { estados, especies, generos, traducir } from '../datos/traducciones'

// Panel de administrador: CRUD de personajes propios guardados en localStorage
function Admin() {
  const [personajes, setPersonajes] = useState(listarPersonajes())
  const [editando, setEditando] = useState(null)
  const [mensaje, setMensaje] = useState('')

  function guardar(datos) {
    if (editando) {
      actualizarPersonaje(editando.id, datos)
      setMensaje('Personaje actualizado')
      setEditando(null)
    } else {
      crearPersonaje(datos)
      setMensaje('Personaje agregado')
    }
    setPersonajes(listarPersonajes()) // se actualiza la tabla
  }

  function eliminar(id) {
    if (window.confirm('¿Seguro que quieres eliminar este personaje?')) {
      setPersonajes(eliminarPersonaje(id))
      setMensaje('Personaje eliminado')
    }
  }

  return (
    <>
      <h1 className="titulo-app">Panel de administrador</h1>
      <p className="text-muted">Aquí puedes crear, editar y eliminar tus propios personajes. Se guardan en el navegador.</p>

      {mensaje && <div className="alert alert-success">{mensaje}</div>}

      <div className="row g-4">
        <div className="col-12 col-lg-5">
          {/* la key hace que el formulario se reinicie al cambiar de personaje */}
          <FormularioPersonaje
            key={editando ? editando.id : 'nuevo'}
            personajeEditar={editando}
            onGuardar={guardar}
            onCancelar={() => setEditando(null)}
          />
        </div>

        <div className="col-12 col-lg-7">
          <h5>Mis personajes ({personajes.length})</h5>
          <div className="table-responsive">
            <table className="table table-striped table-hover bg-white align-middle">
              <thead className="table-primary">
                <tr>
                  <th>Nombre</th>
                  <th>Especie</th>
                  <th>Estado</th>
                  <th className="d-none d-md-table-cell">Género</th>
                  <th className="d-none d-md-table-cell">Origen</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {personajes.map((p) => (
                  <tr key={p.id}>
                    <td>{p.nombre}</td>
                    <td>{traducir(especies, p.especie)}</td>
                    <td>{traducir(estados, p.estado)}</td>
                    <td className="d-none d-md-table-cell">{traducir(generos, p.genero)}</td>
                    <td className="d-none d-md-table-cell">{p.origen}</td>
                    <td>
                      <div className="d-flex gap-1">
                        <Boton texto="Editar" color="warning btn-sm" onClick={() => setEditando(p)} />
                        <Boton texto="Eliminar" color="danger btn-sm" onClick={() => eliminar(p.id)} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {personajes.length === 0 && <p className="text-muted">No hay personajes todavía.</p>}
        </div>
      </div>
    </>
  )
}

export default Admin
