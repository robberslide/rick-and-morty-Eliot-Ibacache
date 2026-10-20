// "Base de datos" simulada: personajes creados por nosotros.
// Se guardan en localStorage para que no se pierdan al recargar la página.
// Tiene las 4 operaciones del CRUD: crear, leer, actualizar y eliminar.

const CLAVE = 'personajes_locales'

// Datos iniciales (se usan la primera vez que se abre la app)
const datosIniciales = [
  { id: 1, nombre: 'Rick Duoc', especie: 'Human', estado: 'Alive', genero: 'Male', origen: 'Tierra C-137' },
  { id: 2, nombre: 'Morty Estudiante', especie: 'Human', estado: 'Alive', genero: 'Male', origen: 'Santiago' },
]

function guardar(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista))
}

// LEER: devuelve todos los personajes
export function listarPersonajes() {
  const guardados = localStorage.getItem(CLAVE)
  if (!guardados) {
    guardar(datosIniciales)
    return [...datosIniciales]
  }
  return JSON.parse(guardados)
}

// LEER: devuelve uno por id
export function buscarPersonaje(id) {
  return listarPersonajes().find((p) => p.id === id)
}

// CREAR: agrega uno nuevo con un id que no se repite
export function crearPersonaje(datos) {
  const lista = listarPersonajes()
  const nuevoId = lista.length > 0 ? Math.max(...lista.map((p) => p.id)) + 1 : 1
  const nuevo = { id: nuevoId, ...datos }
  lista.push(nuevo)
  guardar(lista)
  return nuevo
}

// ACTUALIZAR: cambia los datos del personaje con ese id
export function actualizarPersonaje(id, datos) {
  const lista = listarPersonajes().map((p) => (p.id === id ? { ...p, ...datos, id } : p))
  guardar(lista)
  return lista.find((p) => p.id === id)
}

// ELIMINAR: borra el personaje con ese id
export function eliminarPersonaje(id) {
  const lista = listarPersonajes().filter((p) => p.id !== id)
  guardar(lista)
  return lista
}

// Vuelve a los datos iniciales (lo usamos en las pruebas)
export function reiniciarDatos() {
  guardar(datosIniciales)
}
