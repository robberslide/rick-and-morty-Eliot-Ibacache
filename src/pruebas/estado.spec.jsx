import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Buscador from '../componentes/Buscador'
import FormularioPersonaje from '../componentes/FormularioPersonaje'

describe('Pruebas de estado (state)', () => {
  it('el estado del buscador cambia cuando el usuario escribe', async () => {
    render(<Buscador onBuscar={() => {}} />)
    const input = screen.getByLabelText('Buscar por nombre')

    await userEvent.type(input, 'Morty')
    expect(input.value).toBe('Morty')
  })

  it('el estado del formulario cambia cuando el usuario escribe', async () => {
    render(<FormularioPersonaje onGuardar={() => {}} />)

    await userEvent.type(screen.getByLabelText('Nombre'), 'Squanchy')
    await userEvent.type(screen.getByLabelText('Origen'), 'Planeta Squanch')
    await userEvent.selectOptions(screen.getByLabelText('Especie'), 'Alien')

    expect(screen.getByLabelText('Nombre').value).toBe('Squanchy')
    expect(screen.getByLabelText('Origen').value).toBe('Planeta Squanch')
    expect(screen.getByLabelText('Especie').value).toBe('Alien')
  })

  it('el formulario se llena con los datos del personaje a editar', () => {
    const personaje = { id: 5, nombre: 'Summer', especie: 'Human', estado: 'Alive', genero: 'Female', origen: 'Tierra' }
    render(<FormularioPersonaje personajeEditar={personaje} onGuardar={() => {}} onCancelar={() => {}} />)

    expect(screen.getByText('Editar personaje')).toBeTruthy()
    expect(screen.getByLabelText('Nombre').value).toBe('Summer')
    expect(screen.getByLabelText('Género').value).toBe('Female')
  })

  it('el buscador guarda un error en su estado si se escribe 1 letra', async () => {
    render(<Buscador onBuscar={() => {}} />)
    await userEvent.type(screen.getByLabelText('Buscar por nombre'), 'R')
    await userEvent.click(screen.getByRole('button', { name: 'Buscar' }))

    expect(screen.getByText('Escribe al menos 2 letras')).toBeTruthy()
  })

  it('el formulario muestra los errores de validación si está vacío', async () => {
    render(<FormularioPersonaje onGuardar={() => {}} />)
    await userEvent.click(screen.getByRole('button', { name: 'Agregar' }))

    expect(screen.getByText('El nombre debe tener al menos 3 letras')).toBeTruthy()
    expect(screen.getByText('Selecciona una especie')).toBeTruthy()
    expect(screen.getByText('El origen es obligatorio')).toBeTruthy()
  })
})
