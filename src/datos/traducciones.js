// La API viene en inglés, con esto lo mostramos en español
export const estados = { Alive: 'Vivo', Dead: 'Muerto', unknown: 'Desconocido' }
export const generos = { Male: 'Masculino', Female: 'Femenino', Genderless: 'Sin género', unknown: 'Desconocido' }
export const especies = { Human: 'Humano', Alien: 'Alienígena', Humanoid: 'Humanoide', Robot: 'Robot', Animal: 'Animal', unknown: 'Desconocida' }

export function traducir(tabla, valor) {
  return tabla[valor] || valor
}
