import { useEffect, useState } from 'react'
import Menus from '../components/Items/Menus'
import { useDatosContext } from '../context/DatosContextFile'
import Titulos from '../components/Items/Titulos'
import Overlay from '../components/Items/Overlay/Overlay'
import BtnFuncion from '../components/Items/botones/BtnFuncion.jsx'
import { calcularUltimoPago } from '../utils/utilsDate.js'
import { toast } from 'react-toastify'

const NotificadorPagos = () => {
  const datosOriginal = useDatosContext()
  const [paganHoy, setPaganHoy] = useState([])
  const [checkboxStatePagaron, setCheckboxStatePagaron] = useState({})
  const [checkboxStateNoPagaron, setCheckboxStateNoPagaron] = useState({})
  const handleCheckboxChange = (MorosoId, isChecked, tipoPago) => {
    if (isChecked) {
      if (tipoPago === 'pagaron') {
        setCheckboxStatePagaron((prevStates) => ({
          ...prevStates,
          [MorosoId]: true
        }))
      }
      if (tipoPago === 'nopagaron') {
        setCheckboxStateNoPagaron((prevStates) => ({
          ...prevStates,
          [MorosoId]: true
        }))
      }
      if (
        tipoPago === 'pagaron' &&
        checkboxStateNoPagaron.hasOwnProperty(MorosoId) &&
        checkboxStateNoPagaron[MorosoId]
      ) {
        const { [MorosoId]: removedId, ...remainingNoPagaron } = checkboxStateNoPagaron
        setCheckboxStateNoPagaron(remainingNoPagaron)
      }
      if (
        tipoPago === 'nopagaron' &&
        checkboxStatePagaron.hasOwnProperty(MorosoId) &&
        checkboxStatePagaron[MorosoId]
      ) {
        const { [MorosoId]: removedId, ...remainingPagaron } = checkboxStatePagaron
        setCheckboxStatePagaron(remainingPagaron)
      }
    } else {
      if (
        tipoPago === 'pagaron' &&
        checkboxStatePagaron.hasOwnProperty(MorosoId) &&
        checkboxStatePagaron[MorosoId]
      ) {
        const { [MorosoId]: removedId, ...remainingPagaron } = checkboxStatePagaron
        setCheckboxStatePagaron(remainingPagaron)
      }
      if (
        tipoPago === 'nopagaron' &&
        checkboxStateNoPagaron.hasOwnProperty(MorosoId) &&
        checkboxStateNoPagaron[MorosoId]
      ) {
        const { [MorosoId]: removedId, ...remainingNoPagaron } = checkboxStateNoPagaron
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


  const handleNotificarPago = async () => {
    try {
      const morososPagaron = Object.keys(checkboxStatePagaron).filter((id) => checkboxStatePagaron[id]);
      const morososNoPagaron = Object.keys(checkboxStateNoPagaron).filter((id) => checkboxStateNoPagaron[id]);
      console.log(morososPagaron)
      console.log(morososNoPagaron)
  
      const resultadosPagaron = [];
      const resultadosNoPagaron = [];
  
      for (const idMorosoPago of morososPagaron) {
        await window.electronAPI.NotificadorPagosSQLite(idMorosoPago, true);
      }
  
      for (const idMorosoNoPago of morososNoPagaron) {
        await window.electronAPI.NotificadorPagosSQLite(idMorosoNoPago, false);
      }
      
      toast.success('Clientes pagaron correctamente', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark'
      });
      // window.location.reload()
    } catch (error) {
      console.log(error);
      toast.error('Hubo un problema al notificar el pago de los clientes', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark'
      });
    }
  };
  
  
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
                  <th>Valor de la cuota</th>
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
                    <td>${morosos.precio_producto}</td>
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
            {todosNotificados && <BtnFuncion funcion={handleNotificarPago} tipoDeColor="verde" texto="Notificar Pago" />}
          </Menus>
          <Overlay />
        </>
      )}
    </>
  )
}

export default NotificadorPagos
