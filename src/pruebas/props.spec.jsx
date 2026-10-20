import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Boton from '../componentes/Boton'
import TarjetaPersonaje from '../componentes/TarjetaPersonaje'
import Filtros from '../componentes/Filtros'
import { rick } from './datosPrueba'

describe('Pruebas de propiedades (props)', () => {
  it('el botón recibe correctamente la etiqueta y la función onClick', async () => {
    const funcionClick = jasmine.createSpy('funcionClick')
    render(<Boton texto="Guardar" onClick={funcionClick} />)

    const boton = screen.getByRole('button', { name: 'Guardar' })
    expect(boton).toBeTruthy()

    await userEvent.click(boton)
    expect(funcionClick).toHaveBeenCalledTimes(1)
  })

  it('el botón usa el color que recibe por props', () => {
    render(<Boton texto="Eliminar" color="danger" />)
    expect(screen.getByRole('button').className).toContain('btn-danger')
  })

  it('el botón se deshabilita con la prop deshabilitado', () => {
    render(<Boton texto="Anterior" deshabilitado={true} />)
    expect(screen.getByRole('button').disabled).toBeTrue()
  })

  it('la tarjeta usa el id del personaje para el enlace al detalle', () => {
    render(
      <MemoryRouter>
        <TarjetaPersonaje personaje={rick} />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: 'Ver detalle' }).getAttribute('href')).toBe('/personaje/1')
  })

  it('los filtros muestran el valor recibido por props', () => {
    render(<Filtros estado="dead" especie="Alien" onCambiarEstado={() => {}} onCambiarEspecie={() => {}} />)
    expect(screen.getByLabelText('Estado').value).toBe('dead')
    expect(screen.getByLabelText('Especie').value).toBe('Alien')
  })
})
