import './Inicio.css'

const beneficios = [
  'Calcula el costo del filamento según el peso de la pieza.',
  'Incluye la energía y el desgaste de tu impresora.',
  'Define tu porcentaje de ganancia y obtén el precio de venta.',
  'Resultados en pesos mexicanos con dos decimales.',
]

function Inicio() {
  return (
    <main className="inicio">
      <header className="inicio-encabezado">
        <span className="inicio-logo" aria-hidden="true">🖨️</span>
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

      {/* La navegación al cotizador se conecta en el Avance 4 con React Router */}
      <button type="button" className="inicio-boton">
        Iniciar Cotización
      </button>
    </main>
  )
}

export default Inicio
