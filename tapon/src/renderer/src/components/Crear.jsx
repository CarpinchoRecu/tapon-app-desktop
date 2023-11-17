import { useState } from 'react'
import { LuPlusCircle } from 'react-icons/lu'
import { MdCancel } from 'react-icons/md'

const Crear = () => {
    const [abrirCreador, setAbrirCreador] = useState(false)
    const [cantidadDeProductos, setCantidadDeProductos] = useState(0)

    const handleAbrirCreador = () => {
        setAbrirCreador(true)
        setCantidadDeProductos(0)
    }

    const handleCerrarCreador = () => {
        setAbrirCreador(false)
        setCantidadDeProductos(0)
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
            label: 'Nombre del Cliente',
            type: 'text'
        },
        {
            label: 'Localidad',
            type: 'text'
        },
        {
            label: 'Direccion',
            type: 'text'
        },
        {
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
                label: 'Nombre Producto',
                type: 'text'
            },
            {
                label: 'Precio Producto',
                type: 'number'
            },
            {
                label: 'Cuotas',
                type: 'number'
            },
            {
                label: 'Cuotas Pagadas',
                type: 'number'
            },
            {
                label: 'Fecha Ultimo Pago',
                type: 'date'
            }
        ]
    }))

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
                    <section className="campos__cliente">
                        {camposCreador.map((campo) => (
                            <div key={campo.label} className="campo">
                                <label htmlFor={campo.label}>{campo.label}</label>
                                <input type={campo.type} value={campo.value} onChange={campo.onChange} />
                            </div>
                        ))}
                    </section>
                    <section className="campos__productos">
                        {camposProducto.map((producto, index) => (
                            <div key={index}>
                                <h3>{producto.label}</h3>
                                {producto.campos.map((campo) => (
                                    <div key={campo.label} className="campo">
                                        <label htmlFor={campo.label}>{campo.label}</label>
                                        <input type={campo.type} />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </section>
                </div>
            ) : (
                <></>
            )}
        </>
    )
}

export default Crear
