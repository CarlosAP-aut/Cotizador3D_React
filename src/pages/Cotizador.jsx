import './Cotizador.css'

// Presets de impresoras: consumo en watts y costo por hora (energía + desgaste)
const impresoras = [
  { id: 'bambu-x1c', nombre: 'Bambu Lab X1C', watts: 350, costoHora: 4 },
  { id: 'prusa-mk4', nombre: 'Prusa MK4', watts: 240, costoHora: 3 },
  { id: 'ender-3-v3', nombre: 'Creality Ender 3 V3', watts: 270, costoHora: 2.5 },
]

// Valores de ejemplo para ver el desglose. En el Avance 4 se calculan con useState
const desglose = [
  { concepto: 'Filamento', monto: 30 },
  { concepto: 'Energía / Uso', monto: 18 },
]
const costoTotal = 48
const ganancia = 24
const precioVenta = 72

const formatoMoneda = (monto) => `$${monto.toFixed(2)} MXN`

function Cotizador() {
  return (
    <div className="cotizador">
      <nav className="cotizador-barra">
        {/* Igual que en Inicio, el regreso se conecta con React Router en el Avance 4 */}
        <button type="button" className="cotizador-volver">
          &lt; Volver al Inicio
        </button>
      </nav>

      <main className="cotizador-contenido">
        <form className="cotizador-formulario">
          <h1>Formulario de entrada</h1>

          <label className="campo">
            Impresora
            <select name="impresora" defaultValue="bambu-x1c">
              {impresoras.map((impresora) => (
                <option key={impresora.id} value={impresora.id}>
                  {impresora.nombre} ({impresora.watts} W · $
                  {impresora.costoHora.toFixed(2)}/h)
                </option>
              ))}
            </select>
          </label>

          <label className="campo">
            Costo del rollo ($/kg)
            <input type="number" name="costoRollo" min="0" defaultValue="400" />
          </label>

          <label className="campo">
            Peso de la pieza (g)
            <input type="number" name="peso" min="0" defaultValue="75" />
          </label>

          <label className="campo">
            Tiempo de impresión (horas)
            <input type="number" name="tiempo" min="0" step="0.1" defaultValue="4.5" />
          </label>

          <label className="campo">
            Ganancia (%)
            <input type="number" name="ganancia" min="0" defaultValue="50" />
          </label>
        </form>

        <aside className="cotizador-desglose">
          <h2>Desglose de cotización</h2>

          <dl>
            {desglose.map((fila) => (
              <div key={fila.concepto} className="fila">
                <dt>{fila.concepto}</dt>
                <dd>{formatoMoneda(fila.monto)}</dd>
              </div>
            ))}

            <div className="fila fila-total">
              <dt>Costo total</dt>
              <dd>{formatoMoneda(costoTotal)}</dd>
            </div>

            <div className="fila">
              <dt>Ganancia (50%)</dt>
              <dd>{formatoMoneda(ganancia)}</dd>
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
