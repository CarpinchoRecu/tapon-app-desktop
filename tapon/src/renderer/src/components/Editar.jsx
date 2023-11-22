import { useState } from 'react'
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'
import { MdCancel } from 'react-icons/md'

const Editar = ({ datosOriginal, idSeleccionado, setEditar, setTocarCliente }) => {
    const [mostrarMenuProductoSeleccionado, setMostrarMenuProductoSeleccionado] = useState(false)
    const [productoSeleccionado, setProductoSeleccionado] = useState(null)

    const handleMostrarProductoSeleccionado = (producto) => {
        setProductoSeleccionado(producto)
        setMostrarMenuProductoSeleccionado(true)
    }

    const handleCerrarProductoSeleccionado = () => {
        setProductoSeleccionado(null)
        setMostrarMenuProductoSeleccionado(false)
    }

    const handleCerrarEditor = () => {
        setEditar(false)
        setTocarCliente(false) // Cambia el estado de editar a false en Footer
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

    const camposProductosSeleccionados = [
        {
            name: 'nombre_producto',
            label: 'Nombre Producto',
            type: 'text'
        },
        {
            name: 'precio_producto',
            label: 'Precio Producto',
            placeholder: 'productoSeleccionado.precio_producto',
            type: 'number'
        },
        {
            name: 'cuotas_producto',
            label: 'Cuotas',
            placeholder: 'productoSeleccionado.cuotas_producto',
            type: 'number'
        },
        {
            name: 'cuotas_pagadas',
            label: 'Cuotas Pagadas',
            placeholder: 'productoSeleccionado.cuotas_pagadas',
            type: 'number'
        },
        {
            name: 'fecha_ultimo_pago',
            label: 'Fecha Ultimo Pago',
            placeholder: 'productoSeleccionado.fecha_ultimo_pago',
            type: 'date'
        }
    ]

    return (
        <div className="editar">
            <div onClick={handleCerrarEditor} className="btn__volver">
                <FaRegArrowAltCircleLeft />
            </div>
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
                        const precioPorCuota = producto.precio_producto / producto.cuotas_producto
                        const totalPagado = producto.cuotas_pagadas * precioPorCuota
                        const faltaPagar = producto.precio_producto - totalPagado
                        const faltaCuotas = producto.cuotas_producto - producto.cuotas_pagadas

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

            {mostrarMenuProductoSeleccionado && productoSeleccionado && (
                <div className="editor">
                    <div onClick={handleCerrarProductoSeleccionado} className="cerrar__editor">
                        <MdCancel />
                    </div>
                    <div className="contenedor__campo__editor">
                        <div className="campos__editor">
                            {camposProductosSeleccionados.map((campoSeleccionado, indexCampoSeleccionado) => (
                                <input
                                    key={indexCampoSeleccionado}
                                    className="campo__editor"
                                    placeholder={productoSeleccionado[campoSeleccionado.name]}
                                    type={campoSeleccionado.type}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Editar
