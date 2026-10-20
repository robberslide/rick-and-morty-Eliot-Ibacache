import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ListaPersonajes from '../componentes/ListaPersonajes'
import TarjetaPersonaje from '../componentes/TarjetaPersonaje'
import MensajeError from '../componentes/MensajeError'
import { rick, morty, birdperson } from './datosPrueba'

describe('Pruebas de renderizado', () => {
  // Renderizado correcto
  it('la lista renderiza una tarjeta por cada personaje', () => {
    render(
      <MemoryRouter>
        <ListaPersonajes personajes={[rick, morty, birdperson]} />
      </MemoryRouter>,
    )
    expect(screen.getAllByRole('img').length).toBe(3)
    expect(screen.getByText('Rick Sanchez')).toBeTruthy()
    expect(screen.getByText('Morty Smith')).toBeTruthy()
    expect(screen.getByText('Birdperson')).toBeTruthy()
  })

  it('la tarjeta muestra imagen, nombre y atributos en español', () => {
    const { container } = render(
      <MemoryRouter>
        <TarjetaPersonaje personaje={rick} />
      </MemoryRouter>,
    )
    const texto = container.textContent
    expect(screen.getByRole('img').getAttribute('src')).toBe(rick.image)
    expect(screen.getByText('Vivo')).toBeTruthy()
    expect(texto).toContain('Especie: Humano')
    expect(texto).toContain('Género: Masculino')
    expect(texto).toContain('Origen: Earth (C-137)')
    expect(texto).toContain('Ubicación: Citadel of Ricks')
  })

  // Renderizado condicional
  it('el mensaje de error solo se muestra cuando hay un error', () => {
    const { rerender } = render(<MensajeError mensaje="" />)
    expect(screen.queryByRole('alert')).toBeNull()

    rerender(<MensajeError mensaje="Algo salió mal" />)
    expect(screen.getByRole('alert').textContent).toBe('Algo salió mal')
  })

  it('la lista muestra un aviso cuando no hay personajes', () => {
    render(
      <MemoryRouter>
        <ListaPersonajes personajes={[]} />
      </MemoryRouter>,
    )
    expect(screen.getByText(/No se encontraron personajes/)).toBeTruthy()
  })

  it('el badge es rojo si el personaje está muerto', () => {
    render(
      <MemoryRouter>
        <TarjetaPersonaje personaje={birdperson} />
      </MemoryRouter>,
    )
    expect(screen.getByText('Muerto').className).toContain('bg-danger')
  })
})
