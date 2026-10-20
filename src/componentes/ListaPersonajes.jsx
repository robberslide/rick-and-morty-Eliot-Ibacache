import TarjetaPersonaje from './TarjetaPersonaje'

// Recibe la lista de personajes y dibuja una tarjeta por cada uno
function ListaPersonajes({ personajes }) {
  if (personajes.length === 0) {
    return <p className="text-center text-muted my-5">No se encontraron personajes 😢</p>
  }

  return (
    // 1 columna en celular, 2 en tablet, 3 en notebook y 4 en pantallas grandes
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
      {personajes.map((p) => (
        <div className="col" key={p.id}>
          <TarjetaPersonaje personaje={p} />
        </div>
      ))}
    </div>
  )
}

export default ListaPersonajes
