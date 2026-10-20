// Aquí están las llamadas a la API de Rick and Morty usando fetch()
const URL_API = 'https://rickandmortyapi.com/api/character'

// Trae personajes. Se le puede pasar pagina, nombre, estado y especie
export async function obtenerPersonajes(pagina = 1, nombre = '', estado = '', especie = '') {
  let url = `${URL_API}?page=${pagina}`
  if (nombre) url += `&name=${nombre}`
  if (estado) url += `&status=${estado}`
  if (especie) url += `&species=${especie}`

  const respuesta = await fetch(url)

  // la API devuelve 404 cuando no encuentra nada, eso no es un error para nosotros
  if (respuesta.status === 404) {
    return { info: { pages: 0, count: 0 }, results: [] }
  }
  if (!respuesta.ok) {
    throw new Error('No se pudieron cargar los personajes')
  }
  return respuesta.json()
}

// Trae un solo personaje por su id
export async function obtenerPersonaje(id) {
  const respuesta = await fetch(`${URL_API}/${id}`)
  if (!respuesta.ok) {
    throw new Error('No se encontró el personaje')
  }
  return respuesta.json()
}
