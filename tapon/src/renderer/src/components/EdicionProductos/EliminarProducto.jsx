import React, { useContext } from 'react'
import { ProductosContext, IdContext } from '../../context/GeneralContext.jsx'
import { useDatosContext } from '../../context/DatosContextFile.jsx'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ClienteSeleccionado } from '../../utils/utilsClienteSeleccionado.jsx'

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
      const { nombre, localidad, direccion } = clienteSeleccionado
      const resultado = await window.electronAPI.EliminarClienteSQLite(nombre, localidad, direccion)

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
      <h2>Eliminar Producto</h2>
      <p>{productoSeleccionado.nombre_producto}</p>
      <p>{productoSeleccionado.precio_producto}</p>
      <div className="btn__eliminar" onClick={handleEliminar}>
          <p>Eliminar</p>
        </div>
    </div>
  )
}

export default EliminarProducto