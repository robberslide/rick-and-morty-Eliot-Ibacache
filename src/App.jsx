import { Routes, Route } from 'react-router-dom'
import BarraNavegacion from './componentes/BarraNavegacion'
import Inicio from './paginas/Inicio'
import Detalle from './paginas/Detalle'
import Admin from './paginas/Admin'
import NoEncontrada from './paginas/NoEncontrada'

function App() {
  return (
    <>
      <BarraNavegacion />
      <div className="container my-4">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/personaje/:id" element={<Detalle />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </div>
    </>
  )
}

export default App
