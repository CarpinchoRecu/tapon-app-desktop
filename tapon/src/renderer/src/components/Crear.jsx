import { useEffect, useState } from 'react'
import { LuPlusCircle } from 'react-icons/lu'
import { MdCancel } from 'react-icons/md'
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'

const Crear = () => {
    const [abrirCreador, setAbrirCreador] = useState(false)
    const [cantidadDeProductos, setCantidadDeProductos] = useState(0)
    const [mostrarBtnProductos, setMostrarBtnProductos] = useState(false)
    const [mostrarProductos, setMostrarProductos] = useState(false)
    const [mostrarCamposClientes, setMostrarCamposClientes] = useState(false)

    const [formDataClientes, setFormDataClientes] = useState({
        nombre: '',
        localidad: '',
        direccion: ''
    })

    const [formDataProductos, setFormDataProductos] = useState({
        nombre_producto: '',
        precio_producto: '',
        cuotas_producto: '',
        cuotas_pagadas: '',
        fecha_ultimo_pago: ''
    })

    const handleInputClientesChange = (event) => {
        const { name, value } = event.target
        setFormDataClientes({
            ...formDataClientes,
            [name]: value
        })
    }

    const handleInputProductosChange = (event) => {
        const { name, value } = event.target
        setFormDataProductos({
            ...formDataProductos,
            [name]: value
        })
    }

    const handleAbrirCreador = () => {
        setAbrirCreador(true)
        setCantidadDeProductos(0)
        setMostrarCamposClientes(false)
        setMostrarProductos(false)
    }

    const handleCerrarCreador = () => {
        setAbrirCreador(false)
        setCantidadDeProductos(0)
        setMostrarCamposClientes(false)
        setMostrarProductos(false)
    }

    const handleSiguiente = () => {
        console.log('Datos del formulario:', formDataClientes)
        setMostrarProductos(true)
        setMostrarCamposClientes(true)
    }

    const handleCrear = () => {
        console.log(formDataProductos)
    }

    const handleAtras = () => {
        setMostrarProductos(false)
        setMostrarCamposClientes(false)
    }

    const handleCantidadProductosChange = (event) => {
        let value = parseInt(event.target.value, 10)
        // Limitar la cantidad máxima de productos a 4
        value = Math.min(value, 4)
        // Limitar la cantidad mínima de productos a 0
        value = Math.max(value, 0)
        setCantidadDeProductos(value)
    }

    const camposCreador = [
        {
            name: 'nombre',
            label: 'Nombre del Cliente',
            type: 'text'
        },
        {
            name: 'localidad',
            label: 'Localidad',
            type: 'text'
        },
        {
            name: 'direccion',
            label: 'Direccion',
            type: 'text'
        },
        {
            name: 'cantidadDeProductos',
            label: 'Cantidad de Productos',
            type: 'number',
            value: cantidadDeProductos,
            onChange: handleCantidadProductosChange // Manejar el cambio en la cantidad de productos
        }
    ]

    const camposProducto = Array.from({ length: cantidadDeProductos }, (_, index) => ({
        label: `Producto nº${index + 1}`,
        campos: [
            {
                name: 'nombre_producto',
                label: 'Nombre Producto',
                type: 'text'
            },
            {
                name: 'precio_producto',
                label: 'Precio Producto',
                type: 'number'
            },
            {
                name: 'cuotas_producto',
                label: 'Cuotas',
                type: 'number'
            },
            {
                name: 'cuotas_pagadas',
                label: 'Cuotas Pagadas',
                type: 'number'
            },
            {
                name: 'fecha_ultimo_pago',
                label: 'Fecha Ultimo Pago',
                type: 'date'
            }
        ]
    }))

    useEffect(() => {
        function habilitarProductos(cantidad) {
            if (cantidad >= 1) {
                return true
            }
            return false
        }

        const mostrar = habilitarProductos(cantidadDeProductos)
        setMostrarBtnProductos(mostrar)
    }, [cantidadDeProductos, setMostrarBtnProductos])

    return (
        <>
            <div onClick={handleAbrirCreador} className="btn__creador__abrir">
                <p>Crear</p>
                <LuPlusCircle />
            </div>
            {abrirCreador === true ? (
                <div className="creador">
                    <h2>Crear Clientes</h2>
                    <section onClick={handleCerrarCreador} className="btn__creador__cerrar">
                        <MdCancel />
                    </section>
                    {mostrarCamposClientes === true ? (
                        <></>
                    ) : (
                        <article className="campos__cliente">
                            {camposCreador.map((campo) => (
                                <div key={campo.label} className="campo__cliente">
                                    {campo.name === 'cantidadDeProductos' ? (
                                        <>
                                            <label htmlFor="Cantidad de Productos">Cantidad de Productos</label>
                                            <input
                                                name="cantidadDeProductos"
                                                type="number"
                                                value={cantidadDeProductos}
                                                onChange={campo.onChange}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <label htmlFor={campo.label}>{campo.label}</label>
                                            <input
                                                name={campo.name}
                                                type={campo.type}
                                                value={formDataClientes[campo.name]}
                                                onChange={handleInputClientesChange}
                                            />
                                        </>
                                    )}
                                </div>
                            ))}
                        </article>
                    )}
                    {mostrarBtnProductos === true ? (
                        <>
                            {mostrarProductos === true ? (
                                <div onClick={handleAtras} className="btn__volver__productos">
                                    <FaRegArrowAltCircleLeft />
                                </div>
                            ) : (
                                <div onClick={handleSiguiente} className="btn__siguiente__productos">
                                    <p>Crear productos del cliente</p>
                                </div>
                            )}
                            {mostrarProductos === true ? (
                                <article className="contenedor__campos__productos">
                                    {camposProducto.map((producto, index) => (
                                        <article className="campos__productos" key={index}>
                                            <h3>{producto.label}</h3>
                                            {producto.campos.map((campo, index) => (
                                                <input
                                                    key={index}
                                                    name={campo.name}
                                                    className="campo__producto"
                                                    placeholder={campo.label}
                                                    value={formDataProductos[campo.name]}
                                                    onChange={handleInputProductosChange}
                                                    type={campo.type}
                                                />
                                            ))}
                                        </article>
                                    ))}

                                    <button onClick={handleCrear}>CREAR</button>
                                </article>
                            ) : (
                                <></>
                            )}
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            ) : (
                <></>
            )}
        </>
    )
}

export default Crear
