import { useState } from 'react'
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'
import { MdCancel } from 'react-icons/md'
import Swal from 'sweetalert2'

const Editar = ({ datosOriginal, idSeleccionado, setEditar, setTocarCliente }) => {
    const [mostrarMenuProductoSeleccionado, setMostrarMenuProductoSeleccionado] = useState(false)
    const [productoSeleccionado, setProductoSeleccionado] = useState(null)
    const [opcionesProducto, setOpcionesProducto] = useState(null)
    const [opcion, setOpcion] = useState(null);
    const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);

    const handleAbrirOpcion = (index) => {
        setOpcion(opcion === index ? null : index);
        setOpcionSeleccionada(index);
    };





    const [formDataEdicion, setFormDataEdicion] = useState({
        nombre_producto: '',
        precio_producto: 0,
        cuotas_producto: 0,
        cuotas_pagadas: 0,
        fecha_ultimo_pago: ''
    })

    const handleInputEdicionChange = (event, campo) => {
        setFormDataEdicion({
            ...formDataEdicion,
            [campo]: event.target.value
        })
    }

    const handleEditar = async () => {
        const { nombre_producto, precio_producto, cuotas_producto, cuotas_pagadas, fecha_ultimo_pago } =
            formDataEdicion

        // Validación de campos vacíos
        if (
            !nombre_producto ||
            !precio_producto ||
            !cuotas_producto ||
            !cuotas_pagadas ||
            !fecha_ultimo_pago
        ) {
            // Mostrar alerta con SweetAlert para campos vacíos
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, completa todos los campos'
            })
            return // Detener la ejecución si hay campos vacíos
        }

        const query = `UPDATE clientes SET nombre_producto=?, precio_producto=?, cuotas_producto=?, cuotas_pagadas=?, fecha_ultimo_pago=? WHERE id=?`
        const values = [
            nombre_producto,
            precio_producto,
            cuotas_producto,
            cuotas_pagadas,
            fecha_ultimo_pago,
            productoSeleccionado.id
        ]

        try {
            await window.electronAPI.actualizarSQLite(query, values)
            // Mostrar alerta con SweetAlert para éxito
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'El producto se actualizó correctamente'
            })
            window.location.reload()
        } catch (error) {
            console.error('Error al actualizar:', error)
            // Mostrar alerta con SweetAlert para errores
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al actualizar el producto'
            })
            // Manejar el error de alguna manera (mostrar mensaje, etc.)
        }
    }

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

    const opcionesProd = [
        {
            h2: "Editar Producto",
            p: "Esta opción es para poder editar el producto seleccionado. Se utiliza en caso de algún error o modificación en la fecha del último pago."
        },
        {
            h2: "Eliminar Producto",
            p: "Esta opción es solo para eliminar este producto en específico."
        },
        {
            h2: "Notificar Pago de Producto",
            p: "Esta opción es para cuando el producto de este cliente ya fue cobrado y quieres notificarlo."
        }
    ];

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
                    {opcionesProd.map((opciones, index) => (
                        <>
                            <section key={index} onClick={() => handleAbrirOpcion(index)} className="contenedor__opcion">
                                <h2 className="titulo__opcion">{opciones.h2}</h2>
                                <p className='descripcion__opcion'>{opciones.p}</p>
                            </section>
                            {opcion === index && opcion === opcionSeleccionada && (
                                <>
                                    {mostrarMenuProductoSeleccionado && productoSeleccionado && (
                                        <div className="editor">
                                            <h2>Editar Producto</h2>
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
                                                            value={formDataEdicion[campoSeleccionado.name]}
                                                            onChange={(event) => handleInputEdicionChange(event, campoSeleccionado.name)}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <div onClick={handleEditar} className="btn__editar">
                                                <p>Editar</p>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </>
                    ))}
                </div>
            )}





        </div>
    )
}

export default Editar
