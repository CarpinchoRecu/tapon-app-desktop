import { useState } from 'react'
import { LuPlusCircle } from 'react-icons/lu'
import { MdCancel } from 'react-icons/md'

const Eliminar = () => {
    const [abrirEliminar, setAbrirEliminar] = useState(false)

    const handleAbrirEliminar = () => {
        setAbrirEliminar(true)
    }

    const handleCerrarEliminar = () => {
        setAbrirEliminar(false)
    }

    return (
        <>
            <div onClick={handleAbrirEliminar} className="btn__eliminar__abrir">
                <p>Eliminar</p>
                <MdCancel />
            </div>
            {abrirEliminar === true ? (
                <div className="eliminar">
                    <div onClick={handleCerrarEliminar} className="btn__eliminar__cerrar">
                        <p>Cerrar</p>
                        <MdCancel />
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    )
}

export default Eliminar
