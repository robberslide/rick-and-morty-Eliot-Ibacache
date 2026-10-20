// Personajes de ejemplo con la misma forma que los entrega la API
export const rick = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth (C-137)' },
  location: { name: 'Citadel of Ricks' },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: ['1', '2', '3'],
}

export const morty = { ...rick, id: 2, name: 'Morty Smith' }

export const birdperson = { ...rick, id: 47, name: 'Birdperson', status: 'Dead', species: 'Alien' }

// Simula la respuesta de fetch
export function respuestaFalsa(cuerpo, status = 200) {
  return Promise.resolve({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(cuerpo),
  })
}
