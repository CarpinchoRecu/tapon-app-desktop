import React, { useContext, useState } from 'react'
import { IdContext } from '../context/IdContext.jsx'
import { useDatosContext } from '../context/DatosContextFile.jsx'
import Editor from './componentesObservar/Editor.jsx'
import BtnAtras from './botones/BtnAtras.jsx'
import PropTypes from 'prop-types'

const Observar = ({ setEditar, setTocarCliente }) => {
  const datosOriginal = useDatosContext()
  const idSeleccionado = useContext(IdContext)
  const [productoSeleccionado, setProductoSeleccionado] = useState(null)
  const [opcion, setOpcion] = useState(null)
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null)

  const handleAbrirOpcion = (index) => {
    setOpcion(opcion === index ? null : index)
    setOpcionSeleccionada(index)
  }

  const handleMostrarProductoSeleccionado = (producto) => {
    setProductoSeleccionado(producto)
  }

  // Encontrar el cliente correspondiente al idSeleccionado
  const clienteSeleccionado = datosOriginal.find((cliente) => cliente.id === idSeleccionado)

  if (!clienteSeleccionado) {
    return <p>Cliente no encontrado</p>
  }

  // Encontrar todos los productos con el mismo nombre, localidad y dirección del cliente seleccionado
  const productosCliente = datosOriginal.filter(
    (cliente) =>
      cliente.nombre.toLowerCase() === clienteSeleccionado.nombre.toLowerCase() &&
      cliente.localidad === clienteSeleccionado.localidad &&
      cliente.direccion === clienteSeleccionado.direccion
  )

  const opcionesProd = [
    {
      name: 'editar',
      h2: 'Editar Producto',
      p: 'Esta opción es para poder editar el producto seleccionado. Se utiliza en caso de algún error o modificación en la fecha del último pago.'
    },
    {
      name: 'pagar',
      h2: 'Notificar Pago de Producto',
      p: 'Esta opción es para cuando el producto de este cliente ya fue cobrado y quieres notificarlo.'
    },
    {
      name: 'eliminar',
      h2: 'Eliminar Producto',
      p: 'Esta opción es solo para eliminar este producto en específico.'
    }
  ]

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
              <th>Fecha Ultimo Pago</th>
            </tr>
          </thead>
          <tbody>
            {productosCliente.map((producto, index) => {
              const precioPorCuota = Math.floor(producto.precio_producto / producto.cuotas_producto)
              const totalPagado = Math.floor(producto.cuotas_pagadas * precioPorCuota)
              const faltaPagar = Math.floor(producto.precio_producto - totalPagado)
              const faltaCuotas = Math.floor(producto.cuotas_producto - producto.cuotas_pagadas)

              return (
                <tr key={index} onClick={() => handleMostrarProductoSeleccionado(producto)}>
                  <td>{producto.nombre_producto}</td>
                  <td>{producto.precio_producto}</td>
                  <td>{producto.cuotas_producto}</td>
                  <td>{producto.cuotas_pagadas}</td>
                  <td>{precioPorCuota}</td>
                  <td>{totalPagado}</td>
                  <td>{faltaPagar}</td>
                  <td>{faltaCuotas}</td>
                  <td>{producto.fecha_ultimo_pago}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {productoSeleccionado && (
        <div className="opciones__productos">
          <h2 className="titulo__opciones">Opciones para el Producto</h2>
          <BtnAtras set1={setProductoSeleccionado} cancelType={true} />
          {opcionesProd.map((opciones, index) => (
            <React.Fragment key={index}>
              <section
                onClick={() => handleAbrirOpcion(index)}
                className="contenedor__opcion"
              >
                <h2 className="titulo__opcion">{opciones.h2}</h2>
                <p className="descripcion__opcion">{opciones.p}</p>
              </section>
              {opcion === index && opcion === opcionSeleccionada && (
                <>
                  {opcionesProd[opcion].name === 'editar' && (
                    <Editor
                      productoSeleccionado={productoSeleccionado}
                      setOpcion={setOpcion}
                      setOpcionSeleccionada={setOpcionSeleccionada}
                    />
                  )}
                  {opcionesProd[opcion].name === 'eliminar' && <>menu eliminar</>}
                  {opcionesProd[opcion].name === 'pagar' && <>menu pagar</>}
                </>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  )
}

Observar.propTypes = {
  setEditar: PropTypes.func.isRequired,
  setTocarCliente: PropTypes.func.isRequired
}

export default Observar
