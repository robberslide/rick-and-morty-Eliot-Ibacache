// Filtros por estado y especie. El estado de los filtros lo maneja la página Inicio.
function Filtros({ estado, especie, onCambiarEstado, onCambiarEspecie }) {
  return (
    <div className="row g-2">
      <div className="col-6">
        <label htmlFor="filtro-estado" className="form-label">Estado</label>
        <select id="filtro-estado" className="form-select" value={estado} onChange={(e) => onCambiarEstado(e.target.value)}>
          <option value="">Todos</option>
          <option value="alive">Vivo</option>
          <option value="dead">Muerto</option>
          <option value="unknown">Desconocido</option>
        </select>
      </div>
      <div className="col-6">
        <label htmlFor="filtro-especie" className="form-label">Especie</label>
        <select id="filtro-especie" className="form-select" value={especie} onChange={(e) => onCambiarEspecie(e.target.value)}>
          <option value="">Todas</option>
          <option value="Human">Humano</option>
          <option value="Alien">Alienígena</option>
          <option value="Humanoid">Humanoide</option>
          <option value="Robot">Robot</option>
          <option value="Animal">Animal</option>
        </select>
      </div>
    </div>
  )
}

export default Filtros
