import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Buscador from '../componentes/Buscador'
import Filtros from '../componentes/Filtros'
import FormularioPersonaje from '../componentes/FormularioPersonaje'
import BarraNavegacion from '../componentes/BarraNavegacion'

describe('Pruebas de eventos', () => {
  it('al enviar el buscador se ejecuta onBuscar con el texto', async () => {
    const onBuscar = jasmine.createSpy('onBuscar')
    render(<Buscador onBuscar={onBuscar} />)

    await userEvent.type(screen.getByLabelText('Buscar por nombre'), '  Rick ')
    await userEvent.click(screen.getByRole('button', { name: 'Buscar' }))

    expect(onBuscar).toHaveBeenCalledWith('Rick')
  })

  it('si el texto no es válido NO se ejecuta onBuscar', async () => {
    const onBuscar = jasmine.createSpy('onBuscar')
    render(<Buscador onBuscar={onBuscar} />)

    await userEvent.type(screen.getByLabelText('Buscar por nombre'), 'R')
    await userEvent.click(screen.getByRole('button', { name: 'Buscar' }))

    expect(onBuscar).not.toHaveBeenCalled()
  })

  it('al cambiar un filtro se ejecuta la función correcta', async () => {
    const onCambiarEstado = jasmine.createSpy('onCambiarEstado')
    const onCambiarEspecie = jasmine.createSpy('onCambiarEspecie')
    render(<Filtros estado="" especie="" onCambiarEstado={onCambiarEstado} onCambiarEspecie={onCambiarEspecie} />)

    await userEvent.selectOptions(screen.getByLabelText('Estado'), 'alive')
    await userEvent.selectOptions(screen.getByLabelText('Especie'), 'Robot')

    expect(onCambiarEstado).toHaveBeenCalledWith('alive')
    expect(onCambiarEspecie).toHaveBeenCalledWith('Robot')
  })

  it('al enviar el formulario completo se ejecuta onGuardar y se limpia', async () => {
    const onGuardar = jasmine.createSpy('onGuardar')
    render(<FormularioPersonaje onGuardar={onGuardar} />)

    await userEvent.type(screen.getByLabelText('Nombre'), 'Mr. Meeseeks')
    await userEvent.selectOptions(screen.getByLabelText('Especie'), 'Human')
    await userEvent.selectOptions(screen.getByLabelText('Estado'), 'Alive')
    await userEvent.selectOptions(screen.getByLabelText('Género'), 'Male')
    await userEvent.type(screen.getByLabelText('Origen'), 'Caja Meeseeks')
    await userEvent.click(screen.getByRole('button', { name: 'Agregar' }))

    expect(onGuardar).toHaveBeenCalledWith({
      nombre: 'Mr. Meeseeks',
      especie: 'Human',
      estado: 'Alive',
      genero: 'Male',
      origen: 'Caja Meeseeks',
    })
    expect(screen.getByLabelText('Nombre').value).toBe('')
  })

  it('el botón Cancelar ejecuta onCancelar', async () => {
    const onCancelar = jasmine.createSpy('onCancelar')
    const personaje = { id: 1, nombre: 'Rick', especie: 'Human', estado: 'Alive', genero: 'Male', origen: 'Tierra' }
    render(<FormularioPersonaje personajeEditar={personaje} onGuardar={() => {}} onCancelar={onCancelar} />)

    await userEvent.click(screen.getByRole('button', { name: 'Cancelar' }))
    expect(onCancelar).toHaveBeenCalled()
  })

  it('al hacer clic en el botón del menú cambia su estado (se abre)', async () => {
    const { container } = render(
      <MemoryRouter>
        <BarraNavegacion />
      </MemoryRouter>,
    )
    const menu = container.querySelector('.navbar-collapse')
    expect(menu.classList.contains('show')).toBeFalse()

    await userEvent.click(screen.getByRole('button', { name: 'Menú' }))
    expect(menu.classList.contains('show')).toBeTrue()
  })

  it('al elegir una opción del menú este se vuelve a cerrar', async () => {
    const { container } = render(
      <MemoryRouter>
        <BarraNavegacion />
      </MemoryRouter>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Menú' }))
    await userEvent.click(screen.getByRole('link', { name: 'Administrador' }))
    expect(container.querySelector('.navbar-collapse').classList.contains('show')).toBeFalse()
  })
})
