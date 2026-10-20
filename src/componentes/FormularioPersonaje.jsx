import { useState } from 'react'
import Boton from './Boton'

const formularioVacio = { nombre: '', especie: '', estado: '', genero: '', origen: '' }

// Formulario para crear o editar personajes en el panel de administrador.
// Si recibe "personajeEditar" se llena con esos datos.
function FormularioPersonaje({ personajeEditar, onGuardar, onCancelar }) {
  const [form, setForm] = useState(personajeEditar || formularioVacio)
  const [errores, setErrores] = useState({})

  function manejarCambio(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function validar() {
    const nuevosErrores = {}
    if (form.nombre.trim().length < 3) nuevosErrores.nombre = 'El nombre debe tener al menos 3 letras'
    if (!form.especie) nuevosErrores.especie = 'Selecciona una especie'
    if (!form.estado) nuevosErrores.estado = 'Selecciona un estado'
    if (!form.genero) nuevosErrores.genero = 'Selecciona un género'
    if (!form.origen.trim()) nuevosErrores.origen = 'El origen es obligatorio'
    return nuevosErrores
  }

  function manejarSubmit(e) {
    e.preventDefault()
    const nuevosErrores = validar()
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length === 0) {
      onGuardar(form)
      setForm(formularioVacio)
    }
  }

  return (
    <form onSubmit={manejarSubmit} className="card card-body">
      <h5>{personajeEditar ? 'Editar personaje' : 'Nuevo personaje'}</h5>

      <div className="mb-2">
        <label htmlFor="nombre" className="form-label">Nombre</label>
        <input id="nombre" name="nombre" className="form-control" value={form.nombre} onChange={manejarCambio} />
        {errores.nombre && <div className="text-danger small">{errores.nombre}</div>}
      </div>

      <div className="row">
        <div className="col-sm-4 mb-2">
          <label htmlFor="especie" className="form-label">Especie</label>
          <select id="especie" name="especie" className="form-select" value={form.especie} onChange={manejarCambio}>
            <option value="">Elegir...</option>
            <option value="Human">Humano</option>
            <option value="Alien">Alienígena</option>
            <option value="Robot">Robot</option>
            <option value="Animal">Animal</option>
          </select>
          {errores.especie && <div className="text-danger small">{errores.especie}</div>}
        </div>
        <div className="col-sm-4 mb-2">
          <label htmlFor="estado" className="form-label">Estado</label>
          <select id="estado" name="estado" className="form-select" value={form.estado} onChange={manejarCambio}>
            <option value="">Elegir...</option>
            <option value="Alive">Vivo</option>
            <option value="Dead">Muerto</option>
            <option value="unknown">Desconocido</option>
          </select>
          {errores.estado && <div className="text-danger small">{errores.estado}</div>}
        </div>
        <div className="col-sm-4 mb-2">
          <label htmlFor="genero" className="form-label">Género</label>
          <select id="genero" name="genero" className="form-select" value={form.genero} onChange={manejarCambio}>
            <option value="">Elegir...</option>
            <option value="Male">Masculino</option>
            <option value="Female">Femenino</option>
            <option value="unknown">Desconocido</option>
          </select>
          {errores.genero && <div className="text-danger small">{errores.genero}</div>}
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="origen" className="form-label">Origen</label>
        <input id="origen" name="origen" className="form-control" value={form.origen} onChange={manejarCambio} />
        {errores.origen && <div className="text-danger small">{errores.origen}</div>}
      </div>

      <div className="d-flex gap-2">
        <Boton texto={personajeEditar ? 'Guardar cambios' : 'Agregar'} tipo="submit" />
        {personajeEditar && <Boton texto="Cancelar" color="secondary" onClick={onCancelar} />}
      </div>
    </form>
  )
}

export default FormularioPersonaje
