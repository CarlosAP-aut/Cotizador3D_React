import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Cotizador.css'

// Presets de impresoras: consumo en watts y costo por hora, medio inventado la verdad jajajaja
const impresoras = [
  { id: 'bambu-x1c', nombre: 'Bambu Lab X1C', watts: 350, costoHora: 4 },
  { id: 'prusa-mk4', nombre: 'Prusa MK4', watts: 240, costoHora: 3 },
  { id: 'ender-3-v3', nombre: 'Creality Ender 3 V3', watts: 270, costoHora: 2.5 },
  { id: 'bambu-a1', nombre: 'Bambu Lab A1', watts: 290, costoHora: 3.2 },
]

// Los valores se guardan como texto para que el usuario pueda borrar un campo
const valoresIniciales = {
  impresora: 'bambu-a1',
  costoRollo: '400',
  peso: '75',
  tiempo: '4.5',
  ganancia: '50',
}

// Al limpiar se borran los números y la impresora vuelve a la de inicio
const valoresVacios = {
  impresora: valoresIniciales.impresora,
  costoRollo: '',
  peso: '',
  tiempo: '',
  ganancia: '',
}

// Campo vacío o negativo cuenta como 0
const aNumero = (valor) => Math.max(Number(valor) || 0, 0)

const formatoMoneda = (monto) => `$${monto.toFixed(2)} MXN`

function Cotizador() {
  const navigate = useNavigate()
  const [datos, setDatos] = useState(valoresIniciales)

  // Un solo manejador para todos los campos: el atributo name dice cuál cambió
  const handleChange = (evento) => {
    const { name, value } = evento.target
    setDatos({ ...datos, [name]: value })
  }

  const limpiar = () => setDatos(valoresVacios)

  // Fórmulas
  const impresora = impresoras.find((item) => item.id === datos.impresora)
  const porcentaje = aNumero(datos.ganancia)
  const costoFilamento = (aNumero(datos.peso) / 1000) * aNumero(datos.costoRollo)
  const costoOperativo = aNumero(datos.tiempo) * impresora.costoHora
  const costoTotal = costoFilamento + costoOperativo
  const precioVenta = costoTotal * (1 + porcentaje / 100)
  const gananciaNeta = precioVenta - costoTotal

  // El título de la pestaña muestra el precio actual; al salir vuelve al original
  useEffect(() => {
    document.title = `${formatoMoneda(precioVenta)} | 3DPrintQuote`
    return () => {
      document.title = '3DPrintQuote'
    }
  }, [precioVenta])

  return (
    <div className="cotizador">
      <nav className="cotizador-barra">
        <button
          type="button"
          className="cotizador-volver"
          onClick={() => navigate('/')}
        >
          &lt; Volver al Inicio
        </button>
      </nav>

      <main className="cotizador-contenido">
        <form className="cotizador-formulario" onSubmit={(e) => e.preventDefault()}>
          <h1>Formulario de entrada</h1>

          <label className="campo">
            Impresora
            <select name="impresora" value={datos.impresora} onChange={handleChange}>
              {impresoras.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nombre} ({item.watts} W · ${item.costoHora.toFixed(2)}/h)
                </option>
              ))}
            </select>
          </label>

          <label className="campo">
            Costo del rollo ($/kg)
            <input
              type="number"
              name="costoRollo"
              min="0"
              value={datos.costoRollo}
              onChange={handleChange}
            />
          </label>

          <label className="campo">
            Peso de la pieza (g)
            <input
              type="number"
              name="peso"
              min="0"
              value={datos.peso}
              onChange={handleChange}
            />
          </label>

          <label className="campo">
            Tiempo de impresión (horas)
            <input
              type="number"
              name="tiempo"
              min="0"
              step="0.1"
              value={datos.tiempo}
              onChange={handleChange}
            />
          </label>

          <label className="campo">
            Ganancia (%)
            <input
              type="number"
              name="ganancia"
              min="0"
              value={datos.ganancia}
              onChange={handleChange}
            />
          </label>

          <button type="button" className="cotizador-limpiar" onClick={limpiar}>
            Limpiar
          </button>
        </form>

        <aside className="cotizador-desglose">
          <h2>Desglose de cotización</h2>

          <dl>
            <div className="fila">
              <dt>Filamento</dt>
              <dd>{formatoMoneda(costoFilamento)}</dd>
            </div>

            <div className="fila">
              <dt>Energía / Uso</dt>
              <dd>{formatoMoneda(costoOperativo)}</dd>
            </div>

            <div className="fila fila-total">
              <dt>Costo total</dt>
              <dd>{formatoMoneda(costoTotal)}</dd>
            </div>

            <div className="fila">
              <dt>Ganancia ({porcentaje}%)</dt>
              <dd>{formatoMoneda(gananciaNeta)}</dd>
            </div>

            <div className="fila fila-precio">
              <dt>Precio de venta</dt>
              <dd>{formatoMoneda(precioVenta)}</dd>
            </div>
          </dl>
        </aside>
      </main>
    </div>
  )
}

export default Cotizador
