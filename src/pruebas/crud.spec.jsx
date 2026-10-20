import {
  listarPersonajes,
  buscarPersonaje,
  crearPersonaje,
  actualizarPersonaje,
  eliminarPersonaje,
  reiniciarDatos,
} from '../datos/personajesLocales'

describe('Archivo de datos (CRUD con localStorage)', () => {
  beforeEach(() => reiniciarDatos())

  it('LEER: lista los personajes iniciales', () => {
    expect(listarPersonajes().length).toBe(2)
  })

  it('si localStorage está vacío carga los datos iniciales', () => {
    localStorage.removeItem('personajes_locales')
    expect(listarPersonajes().length).toBe(2)
  })

  it('LEER: busca un personaje por id', () => {
    expect(buscarPersonaje(1).nombre).toBe('Rick Duoc')
  })

  it('CREAR: agrega un personaje con un id nuevo', () => {
    const nuevo = crearPersonaje({ nombre: 'Jessica', especie: 'Human', estado: 'Alive', genero: 'Female', origen: 'Tierra' })
    expect(nuevo.id).toBe(3)
    expect(listarPersonajes().length).toBe(3)
  })

  it('CREAR: los datos quedan guardados en localStorage', () => {
    crearPersonaje({ nombre: 'Jessica', especie: 'Human', estado: 'Alive', genero: 'Female', origen: 'Tierra' })
    const guardados = JSON.parse(localStorage.getItem('personajes_locales'))
    expect(guardados[2].nombre).toBe('Jessica')
  })

  it('ACTUALIZAR: cambia los datos de un personaje', () => {
    actualizarPersonaje(2, { estado: 'Dead' })
    expect(buscarPersonaje(2).estado).toBe('Dead')
    expect(buscarPersonaje(2).nombre).toBe('Morty Estudiante')
  })

  it('ELIMINAR: borra un personaje', () => {
    eliminarPersonaje(1)
    expect(listarPersonajes().length).toBe(1)
    expect(buscarPersonaje(1)).toBeUndefined()
  })

  it('si se borran todos, el siguiente id empieza en 1', () => {
    eliminarPersonaje(1)
    eliminarPersonaje(2)
    expect(crearPersonaje({ nombre: 'Nuevo' }).id).toBe(1)
  })
})
