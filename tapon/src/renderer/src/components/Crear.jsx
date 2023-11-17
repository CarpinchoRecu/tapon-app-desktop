import { useState } from 'react'
import { LuPlusCircle } from 'react-icons/lu'
import { MdCancel } from 'react-icons/md'

const Crear = () => {
    const [abrirCreador, setAbrirCreador] = useState(false)

    const handleAbrirCraedor = () => {
        setAbrirCreador(true)
    }

    const handleCerrarCraedor = () => {
        setAbrirCreador(false)
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
            type: 'number'
        },
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

    return (
        <>
            <div onClick={handleAbrirCraedor} className="btn__creador__abrir">
                <p>Crear</p>
                <LuPlusCircle />
            </div>
            {abrirCreador === true ? (
                <div className="creador">
                    <div onClick={handleCerrarCraedor} className="btn__creador__cerrar">
                        <p>Cerrar</p>
                        <MdCancel />
                    </div>
                    <div className="campos">
                        {camposCreador.map((campo) => (
                            <div className='campo'>
                                <label htmlFor={campo.label}>{campo.label}</label>
                                <input type={campo.type} />
                            </div>
                        ))}

                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    )
}

export default Crear
