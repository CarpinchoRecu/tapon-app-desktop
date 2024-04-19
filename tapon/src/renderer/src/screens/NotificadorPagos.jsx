import { useEffect, useState } from 'react'
import Menus from '../components/Items/Menus'
import { useDatosContext } from '../context/DatosContextFile'
import Titulos from '../components/Items/Titulos'
import Overlay from '../components/Items/Overlay/Overlay'
import BtnFuncion from '../components/Items/botones/BtnFuncion.jsx'
import { calcularUltimoPago } from '../utils/utilsDate.js'

const NotificadorPagos = () => {
  const datosOriginal = useDatosContext()
  const [paganHoy, setPaganHoy] = useState([])
  const [checkboxStatePagaron, setCheckboxStatePagaron] = useState({})
  const [checkboxStateNoPagaron, setCheckboxStateNoPagaron] = useState({})
  console.log(checkboxStatePagaron)

  const handleCheckboxChange = (checkboxId, isChecked, tipoPago) => {
    if (isChecked) {
      if (tipoPago === 'pagaron') {
        setCheckboxStatePagaron((prevStates) => ({
          ...prevStates,
          [checkboxId]: true
        }))
      }
      if (tipoPago === 'nopagaron') {
        setCheckboxStateNoPagaron((prevStates) => ({
          ...prevStates,
          [checkboxId]: true
        }))
      }
      if (
        tipoPago === 'pagaron' &&
        checkboxStateNoPagaron.hasOwnProperty(checkboxId) &&
        checkboxStateNoPagaron[checkboxId]
      ) {
        const { [checkboxId]: removedId, ...remainingNoPagaron } = checkboxStateNoPagaron
        setCheckboxStateNoPagaron(remainingNoPagaron)
      }
      if (
        tipoPago === 'nopagaron' &&
        checkboxStatePagaron.hasOwnProperty(checkboxId) &&
        checkboxStatePagaron[checkboxId]
      ) {
        const { [checkboxId]: removedId, ...remainingPagaron } = checkboxStatePagaron
        setCheckboxStatePagaron(remainingPagaron)
      }
    } else {
      if (
        tipoPago === 'pagaron' &&
        checkboxStatePagaron.hasOwnProperty(checkboxId) &&
        checkboxStatePagaron[checkboxId]
      ) {
        const { [checkboxId]: removedId, ...remainingPagaron } = checkboxStatePagaron
        setCheckboxStatePagaron(remainingPagaron)
      }
      if (
        tipoPago === 'nopagaron' &&
        checkboxStateNoPagaron.hasOwnProperty(checkboxId) &&
        checkboxStateNoPagaron[checkboxId]
      ) {
        const { [checkboxId]: removedId, ...remainingNoPagaron } = checkboxStateNoPagaron
        setCheckboxStateNoPagaron(remainingNoPagaron)
      }
    }
  }

  useEffect(() => {
    const hoy = new Date()
    const fechaHoy = hoy.toISOString().split('T')[0]

    const personasConPagoHoy = datosOriginal.filter((moroso) => {
      const fechaProximo = calcularUltimoPago(moroso.fecha_ultimo_pago, moroso.cada_cuanto_paga)
      return fechaProximo === fechaHoy
    })
    setPaganHoy(personasConPagoHoy)
  }, [datosOriginal])

  const todosNotificados = paganHoy.every((moroso) => {
    const idMoroso = moroso.id
    return (
      checkboxStatePagaron.hasOwnProperty(idMoroso) ||
      checkboxStateNoPagaron.hasOwnProperty(idMoroso)
    )
  })

  return (
    <>
      {paganHoy.length >= 1 && (
        <>
          <Menus>
            <Titulos texto="Hoy Pagan:" tipoDeColor="verde" />
            <table className="tabla__datos__cliente__notificado">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Producto</th>
                  <th>Fecha Ultimo Pago</th>
                  <th>Cada Cuanto Paga (Dias)</th>
                  <th>Va por la cuota</th>
                  <th>pago?(marcar solo si pago)</th>
                  <th>no pago?(marcar solo si no pago)</th>
                </tr>
              </thead>
              {paganHoy.map((morosos, index) => (
                <tbody key={index}>
                  <tr>
                    <td>{morosos.nombre}</td>
                    <td>{morosos.nombre_producto}</td>
                    <td>{morosos.fecha_ultimo_pago}</td>
                    <td>{morosos.cada_cuanto_paga}</td>
                    <td>{morosos.cuotas_pagadas}</td>
                    <td>
                      <input
                        type="checkbox"
                        name="pago"
                        id="pago"
                        checked={checkboxStatePagaron[morosos.id] || false}
                        onChange={(event) =>
                          handleCheckboxChange(morosos.id, event.target.checked, 'pagaron')
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="nopago"
                        id="nopago"
                        checked={checkboxStateNoPagaron[morosos.id] || false}
                        onChange={(event) =>
                          handleCheckboxChange(morosos.id, event.target.checked, 'nopagaron')
                        }
                      />
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
            {todosNotificados && <BtnFuncion tipoDeColor="verde" texto="Notificar Pago" />}
          </Menus>
          <Overlay />
        </>
      )}
    </>
  )
}

export default NotificadorPagos
