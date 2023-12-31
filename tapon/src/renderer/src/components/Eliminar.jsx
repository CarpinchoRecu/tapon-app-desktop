import { useContext } from 'react'
import { IdContext } from '../context/GeneralContext.jsx'
import { useDatosContext } from '../context/DatosContextFile.jsx'
import BtnAtras from './Items/botones/BtnAtras.jsx'
import PropTypes from 'prop-types'
import { ClienteSeleccionado } from '../utils/utilsClienteSeleccionado.jsx'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Overlay from './Items/Overlay/Overlay.jsx'
import BtnFuncion from './Items/botones/BtnFuncion.jsx'

const Eliminar = ({ setEliminar, setTocarCliente }) => {
  // --------------------------------------------------------- //
  const datosOriginal = useDatosContext()
  const idSeleccionado = useContext(IdContext)
  // --------------------------------------------------------- //

  // Encontrar el cliente correspondiente al idSeleccionado
  const clienteSeleccionado = ClienteSeleccionado(datosOriginal, idSeleccionado)

  const handleEliminarCliente = async () => {
    try {
      const { nombre, localidad, direccion } = clienteSeleccionado

      // Llamar a la función para eliminar cliente en la base de datos
      const resultado = await window.electronAPI.EliminarClienteSQLite(nombre, localidad, direccion)

      // Mostrar mensaje de éxito
      toast.success('Cliente eliminado correctamente', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark'
      })
      window.location.reload()
    } catch (error) {
      // Mostrar mensaje de error en caso de falla
      console.log(error)
      toast.error('Hubo un problema al eliminar al cliente', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark'
      })
    }
  }

  return (
    <>
      <div className="eliminar">
        <h2>Eliminar Cliente</h2>
        <BtnAtras set1={setEliminar} set2={setTocarCliente} cancelType={true} />
        <p className="aviso__eliminar">
          Con esta acción vas a borrar todos los datos del cliente {clienteSeleccionado.nombre}. Si
          estás seguro de proceder con la acción, toca &quot;Eliminar&quot;.
        </p>
        <div className="datos__eliminar">
          <p>Datos del Cliente</p>
          <table className="tabla__datos__cliente">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Direccion</th>
                <th>Localidad</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{clienteSeleccionado.nombre}</td>
                <td>{clienteSeleccionado.localidad}</td>
                <td>{clienteSeleccionado.direccion}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <BtnFuncion texto="Eliminar" tipoDeColor="rojo" funcion={handleEliminarCliente} />
      </div>
      <Overlay />
    </>
  )
}

Eliminar.propTypes = {
  setEliminar: PropTypes.func.isRequired, // Para validar una función de setState
  setTocarCliente: PropTypes.func.isRequired
}

export default Eliminar
