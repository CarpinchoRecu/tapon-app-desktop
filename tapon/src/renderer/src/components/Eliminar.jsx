import { useState } from 'react'
import { MdCancel } from 'react-icons/md'
import Swal from 'sweetalert2'

const Eliminar = ({ datosOriginal, idSeleccionado, setEliminar, setTocarCliente }) => {
    const handleCerrarEliminar = () => {
        setEliminar(false)
        setTocarCliente(false)
    }

    // Encontrar el cliente correspondiente al idSeleccionado
    const clienteSeleccionado = datosOriginal.find((cliente) => cliente.id === idSeleccionado)

    if (!clienteSeleccionado) {
        return (
            <div className="btn__eliminar__abrir disabled">
                <p>Eliminar</p>
                <MdCancel />
            </div>
        )
    }

    const handleEliminarCliente = async () => {
        try {
            const { nombre, localidad, direccion } = clienteSeleccionado
    
            // Mostrar diálogo de confirmación
            const confirmacion = await Swal.fire({
                title: '¿Estás seguro?',
                text: `Con esta acción borrarás todos los datos del cliente ${nombre}. Esta acción no se puede deshacer.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Eliminar',
                cancelButtonText: 'Cancelar'
            })
    
            // Verificar si se confirma la eliminación
            if (confirmacion.isConfirmed) {
                // Llamar a la función para eliminar cliente en la base de datos
                const resultado = await electronAPI.EliminarClienteSQLite(nombre, localidad, direccion)
    
                // Mostrar mensaje de éxito
                Swal.fire({
                    icon: 'success',
                    title: 'Cliente eliminado',
                    text: resultado.message
                })
                window.location.reload()
            }
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
        <div className="eliminar">
            <h2>Eliminar Cliente</h2>
            <div onClick={handleCerrarEliminar} className="btn__eliminar__cerrar">
                <p>Cancelar</p>
                <MdCancel />
            </div>
            <p className="aviso__eliminar">
                Con esta acción vas a borrar todos los datos del cliente {clienteSeleccionado.nombre}. Si
                estás seguro de proceder con la acción, toca "Eliminar". Ten en cuenta que se van a borrar
                TODOS los datos de la base y NO SON RECUPERABLES.
            </p>
            <div className="datos__eliminar">
                <p>Datos del Cliente</p>
                <div>
                    <h5>Nombre</h5>
                    <h5>Direccion</h5>
                    <h5>Localidad</h5>
                </div>                
                <div>
                    <h5>{clienteSeleccionado.nombre}</h5>
                    <h5>{clienteSeleccionado.localidad}</h5>
                    <h5>{clienteSeleccionado.direccion}</h5>
                </div>

            </div>
            <div className='btn__eliminar' onClick={handleEliminarCliente}>
                <p>Eliminar</p>
            </div>
        </div>
    )
}

export default Eliminar
