import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'
import './Inicio.css'

const beneficios = [
  'Calcula el costo del filamento según el peso de la pieza.',
  'Incluye la energía y el desgaste de tu impresora.',
  'Define tu porcentaje de ganancia y obtén el precio de venta.',
  'Resultados en pesos mexicanos con dos decimales.',
]

function Inicio() {
  const navigate = useNavigate()

  return (
    <main className="inicio">
      <header className="inicio-encabezado">
        <img className="inicio-logo" src={logo} alt="Logo de 3DPrintQuote" />
        <h1>¡Bienvenido a 3DPrintQuote!</h1>
        <p>
          Calcula costos reales de impresión y define tu margen de ganancia
          real.
        </p>
      </header>

      <section className="inicio-tarjeta">
        <h2>¿Por qué usar el cotizador?</h2>
        <ul>
          {beneficios.map((texto) => (
            <li key={texto}>{texto}</li>
          ))}
        </ul>
      </section>

      <button
        type="button"
        className="inicio-boton"
        onClick={() => navigate('/cotizador')}
      >
        Iniciar Cotización
      </button>
    </main>
  )
}

export default Inicio
