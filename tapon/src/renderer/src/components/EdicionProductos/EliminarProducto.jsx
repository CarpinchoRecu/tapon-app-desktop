import React, { useContext } from 'react'
import { ProductosContext, IdContext } from '../../context/GeneralContext.jsx'
import { useDatosContext } from '../../context/DatosContextFile.jsx'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ClienteSeleccionado } from '../../utils/utilsClienteSeleccionado.jsx'
import BtnAtras from '../Items/botones/BtnAtras.jsx'
import BtnFuncion from '../Items/botones/BtnFuncion.jsx'
import Titulos from '../Items/Titulos'

const EliminarProducto = ({ setOpcionSeleccionada, setOpcion }) => {
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
      <BtnAtras cancelType={true} set1={setOpcion} set2={setOpcionSeleccionada} />
      <Titulos texto="Eliminar Producto" tipoDeColor="rojo" />
      <p className="aviso__eliminar">
        Al realizar esta acción, eliminarás todos los datos asociados con el producto del cliente{' '}
        <strong>{clienteSeleccionado.nombre}</strong> . Si estás seguro de querer proceder, haz clic
        en &quot;Eliminar&quot;.
      </p>

      <div className="datos__eliminar">
        <p>Datos del Producto</p>
        <table className="tabla__datos__cliente">
          <thead>
            <tr>
              <th>Nombre Producto</th>
              <th>Precio Producto</th>
              <th>Cuotas Producto</th>
              <th>Fecha Ultimo Pago</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{productoSeleccionado.nombre_producto}</td>
              <td>{productoSeleccionado.precio_producto}</td>
              <td>{productoSeleccionado.cuotas_producto}</td>
              <td>{productoSeleccionado.fecha_ultimo_pago}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <BtnFuncion texto="Eliminar" tipoDeColor="rojo" funcion={handleEliminar} />
    </div>
  )
}

export default EliminarProducto
