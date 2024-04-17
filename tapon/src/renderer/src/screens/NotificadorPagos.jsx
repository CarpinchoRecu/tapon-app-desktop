import { useEffect, useState } from 'react'
import Menus from '../components/Items/Menus'
import { useDatosContext } from '../context/DatosContextFile'
import Titulos from '../components/Items/Titulos'
import Overlay from '../components/Items/Overlay/Overlay'
import BtnFuncion from '../components/Items/botones/BtnFuncion.jsx'
import { calcularUltimoPago } from '../utils/utilsDate.js'

const NotificadorPagos = () => {
  const datosOriginal = useDatosContext();
  const [paganHoy, setPaganHoy] = useState([]);
  const [checkboxStatePagaron, setCheckboxStatePagaron] = useState({});
  const [verBtnPago, setVerBtnPago] = useState(false);

  const handleCheckboxChange = (checkboxId) => {
    setCheckboxStatePagaron((prevStates) => ({
      ...prevStates,
      [checkboxId]: !prevStates[checkboxId],
    }))
  }
  // Obtener la fecha actual
  
  useEffect(() => {
    const hoy = new Date();
    const fechaHoy = hoy.toISOString().split('T')[0];
    console.log(hoy)
    

    const personasConPagoHoy = datosOriginal.filter((moroso) => {

      const fechaProximo = calcularUltimoPago(moroso.fecha_ultimo_pago, moroso.cada_cuanto_paga)
      return fechaProximo === fechaHoy;
    });
    setPaganHoy(personasConPagoHoy);
  }, [datosOriginal]);

  return (
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
            <>
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
                      name="pago"// Usar un identificador único como el ID del moroso
                      id="pago"
                      checked={checkboxStatePagaron[morosos.id] || false}
                      onChange={() => handleCheckboxChange(morosos.id)}
                    />
                  </td>
                  <td>
                    <input type="checkbox" name="nopago" id="nopago" />
                  </td>
                </tr>
              </tbody>
            </>
          ))}
        </table>

        {checkboxStatePagaron.lenght > 0 && (
          <BtnFuncion texto="Notificar Pago"/>
        )}
      </Menus>
      <Overlay />
    </>
  )
}

export default NotificadorPagos
