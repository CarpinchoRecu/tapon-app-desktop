import { useContext, useState } from 'react'
import { IdContext } from '../../context/IdContext.jsx'
import { useDatosContext } from '../../context/DatosContextFile.jsx'
import BtnAtras from '../../components/Items/botones/BtnAtras.jsx'
import PropTypes from 'prop-types'
import MenuProductos from './MenuProductos.jsx'
import { ClienteSeleccionado } from '../../utils/utilsClienteSeleccionado.jsx'
import { calcularUltimoPago } from '../../utils/utilsDate.js'

const Observar = ({ setEditar, setTocarCliente }) => {
  const datosOriginal = useDatosContext()
  const idSeleccionado = useContext(IdContext)
  const [productoSeleccionado, setProductoSeleccionado] = useState(null)

  const handleMostrarMenuProductos = (producto) => {
    setProductoSeleccionado(producto)
  }

  const clienteSeleccionado = ClienteSeleccionado(datosOriginal, idSeleccionado)


  // Encontrar todos los productos con el mismo nombre, localidad y dirección del cliente seleccionado
  const productosCliente = datosOriginal.filter(
    (cliente) =>
      cliente.nombre.toLowerCase() === clienteSeleccionado.nombre.toLowerCase() &&
      cliente.localidad === clienteSeleccionado.localidad &&
      cliente.direccion === clienteSeleccionado.direccion
  )

  return (
    <div className="editar">
      <BtnAtras set1={setEditar} set2={setTocarCliente} />
      <table className="tabla__datos__cliente">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Direccion</th>
            <th>Localidad</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{clienteSeleccionado.nombre}</td>
            <td>{clienteSeleccionado.direccion}</td>
            <td>{clienteSeleccionado.localidad}</td>
          </tr>
        </tbody>
      </table>
      <div className="contenedor__datos__productos">
        <table className="tabla__datos__productos">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio Total</th>
              <th>Cuotos Total</th>
              <th>Cuotas Pagadas</th>
              <th>Precio por cuota</th>
              <th>Total Pagado</th>
              <th>Falta Pagar</th>
              <th>Cuotas Restantes</th>
              <th>Cada Cuanto Paga (Dias)</th>
              <th>Fecha Ultimo Pago</th>
              <th>Fecha Ultimo Proximo</th>
            </tr>
          </thead>
          <tbody>
            {productosCliente.map((producto, index) => {
              const precioPorCuota = Math.floor(producto.precio_producto / producto.cuotas_producto)
              const totalPagado = Math.floor(producto.cuotas_pagadas * precioPorCuota)
              const faltaPagar = Math.floor(producto.precio_producto - totalPagado)
              const faltaCuotas = Math.floor(producto.cuotas_producto - producto.cuotas_pagadas)
              const proximoPago = calcularUltimoPago(producto.fecha_ultimo_pago, producto.cada_cuanto_paga)

              return (
                <tr key={index} onClick={() => handleMostrarMenuProductos(producto)}>
                  <td>{producto.nombre_producto}</td>
                  <td>{producto.precio_producto}</td>
                  <td>{producto.cuotas_producto}</td>
                  <td>{producto.cuotas_pagadas}</td>
                  <td>{precioPorCuota}</td>
                  <td>{totalPagado}</td>
                  <td>{faltaPagar}</td>
                  <td>{faltaCuotas}</td>
                  <td>{producto.cada_cuanto_paga}</td>
                  <td>{producto.fecha_ultimo_pago}</td>
                  <td>{proximoPago}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <MenuProductos
        productoSeleccionado={productoSeleccionado}
        setProductoSeleccionado={setProductoSeleccionado}
      />
    </div>
  )
}

Observar.propTypes = {
  setEditar: PropTypes.func.isRequired,
  setTocarCliente: PropTypes.func.isRequired
}

export default Observar
