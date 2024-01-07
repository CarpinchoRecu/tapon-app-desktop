import { useContext, useState } from 'react'
import { IdContext } from '../context/GeneralContext.jsx'
import { useDatosContext } from '../context/DatosContextFile.jsx'
import Menus from './Items/Menus.jsx'
import Titulos from './Items/Titulos.jsx'
import BtnAtras from './Items/botones/BtnAtras.jsx'
import Overlay from './Items/Overlay/Overlay.jsx'
import { ClienteSeleccionado } from '../utils/utilsClienteSeleccionado.jsx'
import BtnFuncion from './Items/botones/BtnFuncion.jsx'
import { toast } from 'react-toastify'

const CrearProducto = ({ setCrearP, setTocarCliente }) => {
  // --------------------------------------------------------- //
  const datosOriginal = useDatosContext()
  const idSeleccionado = useContext(IdContext)
  // --------------------------------------------------------- //

  // Encontrar el cliente correspondiente al idSeleccionado
  const clienteSeleccionado = ClienteSeleccionado(datosOriginal, idSeleccionado)

  const camposCrearP = [
    {
      name: 'nombre_producto',
      label: 'Nombre Producto',
      type: 'text'
    },
    {
      name: 'precio_producto',
      label: 'Precio Producto',
      type: 'number'
    },
    {
      name: 'cuotas_producto',
      label: 'Cuotas',
      type: 'number'
    },
    {
      name: 'cuotas_pagadas',
      label: 'Cuotas Pagadas',
      type: 'number'
    },
    {
      name: 'cada_cuanto_paga',
      label: 'Cada Cuanto Paga',
      type: 'number'
    },
    {
      name: 'fecha_ultimo_pago',
      label: 'Fecha Ultimo Pago',
      type: 'date'
    }
  ]

  const [formDataProductos, setFormDataProductos] = useState({
    nombre_producto: '',
    precio_producto: "",
    cuotas_producto: "",
    cuotas_pagadas: "",
    cada_cuanto_paga: "",
    fecha_ultimo_pago: ''
  })

  const handleInputProductosChange = (event, campo) => {
    setFormDataProductos({
      ...formDataProductos,
      [campo]: event.target.value
    })
  }

  const handleCrearProducto = async () => {
    const camposProductos = [
      'nombre_producto',
      'precio_producto',
      'cuotas_producto',
      'cuotas_pagadas',
      'cada_cuanto_paga',
      'fecha_ultimo_pago'
    ]

    const camposProductosIncompletos = camposProductos.filter((campo) => !formDataProductos[campo])
    console.log(formDataProductos)

    if (camposProductosIncompletos.length > 0) {
      // Mostrar alerta de campos incompletos
      toast.error('Por favor completa todos los campos', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark'
      })
      return // Detener la ejecución si hay campos incompletos
    }

    try {
      const consulta = `INSERT INTO clientes (nombre, localidad, direccion, nombre_producto, precio_producto, cuotas_producto, cuotas_pagadas, cada_cuanto_paga, fecha_ultimo_pago) VALUES ('${clienteSeleccionado.nombre}', '${clienteSeleccionado.localidad}', '${clienteSeleccionado.direccion}', '${formDataProductos.nombre_producto}', ${formDataProductos.precio_producto}, ${formDataProductos.cuotas_producto}, ${formDataProductos.cuotas_pagadas}, ${formDataProductos.cada_cuanto_paga}, '${formDataProductos.fecha_ultimo_pago}')`

      await window.electronAPI.insertarSQLite(consulta)
      // Mostrar alerta de éxito
      toast.success('Los datos se han guardado correctamente', {
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
      console.error('Error al ejecutar los INSERT:', error)
      // Mostrar alerta de error
      toast.error('Hubo un error al guardar los datos', {
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
      <Menus>
        <Titulos texto="Crear Producto" tipoDeColor="verde" />
        <BtnAtras cancelType={true} set1={setCrearP} set2={setTocarCliente} />
        <section className="campos_producto">
          {camposCrearP.map((campo, index) => (
            <div key={index} className="campo_producto">
              <label htmlFor={campo.label}>{campo.label}</label>
              <input
                name={campo.name}
                type={campo.type}
                value={formDataProductos[campo.name]}
                onChange={(event) => handleInputProductosChange(event, campo.name)}
              />
            </div>
          ))}
        </section>
        <BtnFuncion tipoDeColor="verde" texto="Crear" funcion={handleCrearProducto} />
      </Menus>
      <Overlay />
    </>
  )
}

export default CrearProducto
