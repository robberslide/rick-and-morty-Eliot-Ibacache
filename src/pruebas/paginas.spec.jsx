import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import Inicio from '../paginas/Inicio'
import Detalle from '../paginas/Detalle'
import Admin from '../paginas/Admin'
import { reiniciarDatos } from '../datos/personajesLocales'
import { rick, morty, birdperson, respuestaFalsa } from './datosPrueba'

const paginaApi = { info: { pages: 3, count: 3 }, results: [rick, morty, birdperson] }

describe('Página Inicio (consumo de la API)', () => {
  it('llama a la API y muestra los personajes', async () => {
    spyOn(window, 'fetch').and.returnValue(respuestaFalsa(paginaApi))
    render(
      <MemoryRouter>
        <Inicio />
      </MemoryRouter>,
    )
    expect(screen.getByText('Cargando...')).toBeTruthy()
    expect(await screen.findByText('Rick Sanchez')).toBeTruthy()
    expect(screen.getAllByRole('img').length).toBe(3)
    expect(window.fetch.calls.mostRecent().args[0]).toContain('page=1')
  })

  it('al buscar, llama a la API con el nombre', async () => {
    spyOn(window, 'fetch').and.returnValue(respuestaFalsa(paginaApi))
    render(
      <MemoryRouter>
        <Inicio />
      </MemoryRouter>,
    )
    await screen.findByText('Rick Sanchez')
    await userEvent.type(screen.getByLabelText('Buscar por nombre'), 'rick')
    await userEvent.click(screen.getByRole('button', { name: 'Buscar' }))

    await waitFor(() => expect(window.fetch.calls.mostRecent().args[0]).toContain('name=rick'))
  })

  it('al filtrar, llama a la API con estado y especie', async () => {
    spyOn(window, 'fetch').and.returnValue(respuestaFalsa(paginaApi))
    render(
      <MemoryRouter>
        <Inicio />
      </MemoryRouter>,
    )
    await screen.findByText('Rick Sanchez')
    await userEvent.selectOptions(screen.getByLabelText('Estado'), 'dead')
    await userEvent.selectOptions(screen.getByLabelText('Especie'), 'Alien')

    await waitFor(() => {
      const url = window.fetch.calls.mostRecent().args[0]
      expect(url).toContain('status=dead')
      expect(url).toContain('species=Alien')
    })
  })

  it('los botones Siguiente y Anterior cambian de página', async () => {
    spyOn(window, 'fetch').and.returnValue(respuestaFalsa(paginaApi))
    render(
      <MemoryRouter>
        <Inicio />
      </MemoryRouter>,
    )
    await screen.findByText('Página 1 de 3')
    expect(screen.getByRole('button', { name: 'Anterior' }).disabled).toBeTrue()
    await userEvent.click(screen.getByRole('button', { name: 'Siguiente' }))

    expect(await screen.findByText('Página 2 de 3')).toBeTruthy()
    expect(window.fetch.calls.mostRecent().args[0]).toContain('page=2')

    await userEvent.click(screen.getByRole('button', { name: 'Anterior' }))
    expect(await screen.findByText('Página 1 de 3')).toBeTruthy()
  })

  it('si la búsqueda no encuentra nada (404) muestra el aviso, no un error', async () => {
    spyOn(window, 'fetch').and.returnValue(respuestaFalsa({ error: 'There is nothing here' }, 404))
    render(
      <MemoryRouter>
        <Inicio />
      </MemoryRouter>,
    )
    expect(await screen.findByText(/No se encontraron personajes/)).toBeTruthy()
    expect(screen.queryByRole('alert')).toBeNull()
  })

  it('si la API falla muestra el mensaje de error', async () => {
    spyOn(window, 'fetch').and.returnValue(respuestaFalsa({}, 500))
    render(
      <MemoryRouter>
        <Inicio />
      </MemoryRouter>,
    )
    const alerta = await screen.findByRole('alert')
    expect(alerta.textContent).toBe('No se pudieron cargar los personajes')
  })
})

describe('Página Detalle', () => {
  function renderDetalle(id) {
    return render(
      <MemoryRouter initialEntries={[`/personaje/${id}`]}>
        <Routes>
          <Route path="/personaje/:id" element={<Detalle />} />
        </Routes>
      </MemoryRouter>,
    )
  }

  it('lee el id de la URL y muestra el personaje', async () => {
    spyOn(window, 'fetch').and.returnValue(respuestaFalsa(rick))
    renderDetalle(1)
    expect(await screen.findByRole('heading', { name: 'Rick Sanchez' })).toBeTruthy()
    expect(window.fetch.calls.mostRecent().args[0]).toMatch(/character\/1$/)
    expect(screen.getByText('3 episodios', { exact: false })).toBeTruthy()
  })

  it('muestra error si el personaje no existe', async () => {
    spyOn(window, 'fetch').and.returnValue(respuestaFalsa({}, 404))
    renderDetalle(9999)
    expect((await screen.findByRole('alert')).textContent).toBe('No se encontró el personaje')
  })
})

describe('Página Admin (CRUD conectado a la interfaz)', () => {
  beforeEach(() => reiniciarDatos())

  it('muestra los personajes guardados en la tabla', () => {
    render(<Admin />)
    expect(screen.getByText('Rick Duoc')).toBeTruthy()
    expect(screen.getByText('Mis personajes (2)')).toBeTruthy()
  })

  it('agrega un personaje y la tabla se actualiza', async () => {
    render(<Admin />)
    await userEvent.type(screen.getByLabelText('Nombre'), 'Squanchy')
    await userEvent.selectOptions(screen.getByLabelText('Especie'), 'Alien')
    await userEvent.selectOptions(screen.getByLabelText('Estado'), 'Alive')
    await userEvent.selectOptions(screen.getByLabelText('Género'), 'Male')
    await userEvent.type(screen.getByLabelText('Origen'), 'Planeta Squanch')
    await userEvent.click(screen.getByRole('button', { name: 'Agregar' }))

    expect(screen.getByText('Squanchy')).toBeTruthy()
    expect(screen.getByText('Mis personajes (3)')).toBeTruthy()
    expect(screen.getByText('Personaje agregado')).toBeTruthy()
  })

  it('edita un personaje', async () => {
    render(<Admin />)
    await userEvent.click(screen.getAllByRole('button', { name: 'Editar' })[0])
    const nombre = screen.getByLabelText('Nombre')
    await userEvent.clear(nombre)
    await userEvent.type(nombre, 'Rick Editado')
    await userEvent.click(screen.getByRole('button', { name: 'Guardar cambios' }))

    expect(screen.getByText('Rick Editado')).toBeTruthy()
    expect(screen.getByText('Personaje actualizado')).toBeTruthy()
  })

  it('cancelar la edición vuelve al formulario de nuevo personaje', async () => {
    render(<Admin />)
    await userEvent.click(screen.getAllByRole('button', { name: 'Editar' })[0])
    await userEvent.click(screen.getByRole('button', { name: 'Cancelar' }))
    expect(screen.getByText('Nuevo personaje')).toBeTruthy()
  })

  it('elimina un personaje si se confirma', async () => {
    spyOn(window, 'confirm').and.returnValue(true)
    render(<Admin />)
    await userEvent.click(screen.getAllByRole('button', { name: 'Eliminar' })[0])

    expect(screen.queryByText('Rick Duoc')).toBeNull()
    expect(screen.getByText('Mis personajes (1)')).toBeTruthy()
  })

  it('no elimina si se cancela la confirmación', async () => {
    spyOn(window, 'confirm').and.returnValue(false)
    render(<Admin />)
    await userEvent.click(screen.getAllByRole('button', { name: 'Eliminar' })[0])
    expect(screen.getByText('Rick Duoc')).toBeTruthy()
  })
})
