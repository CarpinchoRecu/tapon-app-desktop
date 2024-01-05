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
    precio_producto: '',
    cuotas_producto: '',
    cuotas_pagadas: '',
    cada_cuanto_paga: '',
    fecha_ultimo_pago: ''
  })

  const handleInputProductosChange = (event, productIndex, fieldName) => {
    const { value } = event.target
    setFormDataProductos((prevFormData) => {
      const updatedFormData = [...prevFormData]
      updatedFormData[productIndex] = {
        ...updatedFormData[productIndex],
        [fieldName]: value
      }
      return updatedFormData
    })
  }

  const handleCrearProducto = () => {
    console.log(formDataProductos)
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
  }

  return (
    <>
      <Menus>
        <Titulos texto="Crear Producto" tipoDeColor="verde" />
        <BtnAtras cancelType={true} set1={setCrearP} set2={setTocarCliente} />
        <section className="campos_producto">
          {camposCrearP.map((campo, productIndex) => (
            <div className="campo_producto">
              <label htmlFor={campo.label}>{campo.label}</label>
              <input
                key={productIndex}
                type={campo.type}
                value={formDataProductos[campo.name]}
                onChange={(event) => handleInputProductosChange(event, productIndex, campo.name)}
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
