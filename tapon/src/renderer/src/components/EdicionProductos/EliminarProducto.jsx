import { useContext } from 'react'
import { IdContext } from '../../context/GeneralContext.jsx'
import { useDatosContext } from '../../context/DatosContextFile.jsx'
import { ClienteSeleccionado } from '../../utils/utilsClienteSeleccionado.jsx'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const EliminarProducto = () => {
    // --------------------------------------------------------- //
    const datosOriginal = useDatosContext()
    const idSeleccionado = useContext(IdContext)
    const clienteSeleccionado = ClienteSeleccionado(datosOriginal, idSeleccionado)
    // --------------------------------------------------------- //

  return (
    <div className="eliminar__producto">
      <h2>Eliminar Producto</h2>
    </div>
  )
}

export default EliminarProducto