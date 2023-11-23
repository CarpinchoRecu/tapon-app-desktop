import { useState } from 'react'
import { MdCancel } from 'react-icons/md'
import Swal from 'sweetalert2'

const Eliminar = ({ datosOriginal, idSeleccionado }) => {
    const [abrirEliminar, setAbrirEliminar] = useState(false)

    const handleAbrirEliminar = () => {
        setAbrirEliminar(true)
    }

    const handleCerrarEliminar = () => {
        setAbrirEliminar(false)
    }

    // Encontrar el cliente correspondiente al idSeleccionado
    const clienteSeleccionado = datosOriginal.find((cliente) => cliente.id === idSeleccionado)

    if (!clienteSeleccionado) {
        return(
            <div className="btn__eliminar__abrir disabled">
                <p>Eliminar</p>
                <MdCancel />
            </div>
        ) 
    }

    const HandleEliminarCliente = async () => {
        try {
            const { nombre, localidad, direccion } = clienteSeleccionado

            // Llamar a la función para eliminar cliente en la base de datos
            const resultado = await electronAPI.EliminarClienteSQLite(nombre, localidad, direccion)

            // Mostrar mensaje de éxito
            Swal.fire({
                icon: 'success',
                title: 'Cliente eliminado',
                text: resultado.message
            })
            window.location.reload()
        } catch (error) {
            // Mostrar mensaje de error en caso de falla
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Error al eliminar',
                text: error.message
            })
        }
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
                        <p>Cancelar</p>
                        <MdCancel />
                    </div>
                    {clienteSeleccionado.nombre}
                    {clienteSeleccionado.direccion}
                    {clienteSeleccionado.localidad}
                    <button onClick={HandleEliminarCliente}>Eliminar</button>
                </div>
            ) : (
                <></>
            )}
        </>
    )
}

export default Eliminar
