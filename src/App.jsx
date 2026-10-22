import { Routes, Route } from 'react-router-dom'
import Inicio from './pages/Inicio.jsx'
import Cotizador from './pages/Cotizador.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/cotizador" element={<Cotizador />} />
    </Routes>
  )
}

export default App
