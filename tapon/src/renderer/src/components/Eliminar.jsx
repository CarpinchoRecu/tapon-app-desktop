import Swal from 'sweetalert2'
import { IdContext } from '../context/IdContext.jsx'
import { useDatosContext } from '../context/DatosContextFile.jsx'
import { useContext } from 'react'
import BtnAtras from './botones/BtnAtras.jsx'

import PropTypes from 'prop-types'

const Eliminar = ({ setEliminar, setTocarCliente }) => {
  // --------------------------------------------------------- //
  const datosOriginal = useDatosContext()
  const idSeleccionado = useContext(IdContext)
  // --------------------------------------------------------- //

  // Encontrar el cliente correspondiente al idSeleccionado
  const clienteSeleccionado = datosOriginal.find((cliente) => cliente.id === idSeleccionado)

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
        const resultado = await window.electronAPI.EliminarClienteSQLite(
          nombre,
          localidad,
          direccion
        )

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
      <BtnAtras set1={setEliminar} set2={setTocarCliente} cancelType={true} />
      <p className="aviso__eliminar">
        Con esta acción vas a borrar todos los datos del cliente {clienteSeleccionado.nombre}. Si
        estás seguro de proceder con la acción, toca &quot;Eliminar&quot;. Ten en cuenta que se van
        a borrar TODOS los datos de la base y NO SON RECUPERABLES.
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
      <div className="btn__eliminar" onClick={handleEliminarCliente}>
        <p>Eliminar</p>
      </div>
    </div>
  )
}

Eliminar.propTypes = {
  setEliminar: PropTypes.func.isRequired, // Para validar una función de setState
  setTocarCliente: PropTypes.func.isRequired
}

export default Eliminar
