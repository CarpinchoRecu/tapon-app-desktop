import React, { useContext } from 'react'
import { ProductosContext, IdContext } from '../../context/GeneralContext.jsx'
import { useDatosContext } from '../../context/DatosContextFile.jsx'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ClienteSeleccionado } from '../../utils/utilsClienteSeleccionado.jsx'
import BtnAtras from '../Items/botones/BtnAtras.jsx'

const EliminarProducto = () => {
  // --------------------------------------------------------- //
  const productoSeleccionado = useContext(ProductosContext)
  const datosOriginal = useDatosContext()
  const idSeleccionado = useContext(IdContext)
  // --------------------------------------------------------- //

  // Encontrar el cliente correspondiente al idSeleccionado
  const clienteSeleccionado = ClienteSeleccionado(datosOriginal, idSeleccionado)

  const handleEliminar = async () => {
    try {
      const idNumber = productoSeleccionado.id
      const { nombre, localidad, direccion } = clienteSeleccionado
      const resultado = await window.electronAPI.EliminarProductoSQLite(
        idNumber,
        nombre,
        localidad,
        direccion
      )

      // Mostrar mensaje de éxito
      toast.success('Producto eliminado correctamente', {
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
      toast.error('Hubo un problema al eliminar al producto', {
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
    <div className="eliminar__producto">
      <BtnAtras cancelType={true} />
      <h2>Eliminar Producto</h2>
      <table className="tabla__datos__cliente">
        <thead>
          <tr>
            <th>Nombre Producto</th>
            <th>Precio Producto</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{productoSeleccionado.nombre_producto}</td>
            <td>{productoSeleccionado.precio_producto}</td>
          </tr>
        </tbody>
      </table>
      <br />
      <div className="btn__eliminar" onClick={handleEliminar}>
        <p>Eliminar</p>
      </div>
    </div>
  )
}

export default EliminarProducto
