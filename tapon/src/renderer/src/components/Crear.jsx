import { useEffect, useState } from 'react'
import { LuPlusCircle } from 'react-icons/lu'
import Swal from 'sweetalert2'
import BtnAtras from './botones/BtnAtras'

const Crear = () => {
  const [abrirCreador, setAbrirCreador] = useState(false)
  const [cantidadDeProductos, setCantidadDeProductos] = useState(0)
  const [mostrarBtnProductos, setMostrarBtnProductos] = useState(false)
  const [mostrarProductos, setMostrarProductos] = useState(false)
  const [mostrarCamposClientes, setMostrarCamposClientes] = useState(false)

  //manejar estado de campos de clientes
  const handleInputClientesChange = (event) => {
    const { name, value } = event.target
    setFormDataClientes({
      ...formDataClientes,
      [name]: value
    })
  }

  //manejar estado de campos de productos
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

  const handleAbrirCreador = () => {
    setAbrirCreador(true)
    setCantidadDeProductos(0)
    setMostrarCamposClientes(false)
    setMostrarProductos(false)
  }

  const handleSiguiente = () => {
    setMostrarProductos(true)
    setMostrarCamposClientes(true)

    console.log(formDataClientes)
  }

  // Función para aplicar trim a los valores del formDataClientes
const trimFormDataValues = () => {
  const trimmedData = {};
  for (const key in formDataClientes) {
    if (Object.hasOwnProperty.call(formDataClientes, key)) {
      trimmedData[key] = formDataClientes[key].trim();
    }
  }
  return trimmedData;
};


  const handleCantidadProductosChange = (event) => {
    let value = parseInt(event.target.value, 10)
    // Limitar la cantidad máxima de productos a 4
    value = Math.min(value, 15)
    // Limitar la cantidad mínima de productos a 0
    value = Math.max(value, 0)
    setCantidadDeProductos(value)
  }

  // campos y recoleccion de datos de clientes
  const camposCreador = [
    {
      name: 'nombre',
      label: 'Nombre del Cliente',
      type: 'text'
    },
    {
      name: 'localidad',
      label: 'Localidad',
      type: 'text'
    },
    {
      name: 'direccion',
      label: 'Direccion',
      type: 'text'
    },
    {
      name: 'cantidadDeProductos',
      label: 'Cantidad de Productos',
      type: 'number',
      value: cantidadDeProductos,
      onChange: handleCantidadProductosChange // Manejar el cambio en la cantidad de productos
    }
  ]

  let [formDataClientes, setFormDataClientes] = useState({
    nombre: '',
    localidad: '',
    direccion: ''
  })

  // campos y recoleccion de datos de productos de los clientes
  const [formDataProductos, setFormDataProductos] = useState(
    Array.from({ length: cantidadDeProductos }, () => ({
      nombre_producto: '',
      precio_producto: '',
      cuotas_producto: '',
      cuotas_pagadas: '',
      cada_cuanto_paga: '',
      fecha_ultimo_pago: ''
    }))
  )

  const camposProducto = Array.from({ length: cantidadDeProductos }, (_, index) => ({
    label: `Producto nº${index + 1}`,
    campos: [
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
        label: 'Cada cuanto paga',
        type: 'number'
      },
      {
        name: 'fecha_ultimo_pago',
        label: 'Fecha Ultimo Pago',
        type: 'date'
      }
    ]
  }))

  useEffect(() => {
    function habilitarProductos(cantidad) {
      if (cantidad >= 1) {
        return true
      }
      return false
    }

    const mostrar = habilitarProductos(cantidadDeProductos)
    setMostrarBtnProductos(mostrar)
  }, [cantidadDeProductos, setMostrarBtnProductos])

  const handleCrear = async () => {
    // Validar campos en formDataClientes
    const camposClientes = ['nombre', 'localidad', 'direccion']
  console.log(formDataClientes)

    const camposProductos = [
      'nombre_producto',
      'precio_producto',
      'cuotas_producto',
      'cuotas_pagadas',
      'cada_cuanto_paga',
      'fecha_ultimo_pago'
    ]

    const camposClientesIncompletos = camposClientes.filter((campo) => !formDataClientes[campo])
    const camposProductosIncompletos = formDataProductos.filter((producto) => {
      return camposProductos.some((campo) => !producto[campo])
    })

    if (camposClientesIncompletos.length > 0 || camposProductosIncompletos.length > 0) {
      // Mostrar alerta de campos incompletos
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos antes de continuar.'
      })
      return // Detener la ejecución si hay campos incompletos
    }

    // Continuar con las inserciones si todos los campos están completos
    try {
      for (let i = 0; i < cantidadDeProductos; i++) {
        const consulta = `INSERT INTO clientes (nombre, localidad, direccion, nombre_producto, precio_producto, cuotas_producto, cuotas_pagadas, cada_cuanto_paga, fecha_ultimo_pago) VALUES ('${formDataClientes.nombre}', '${formDataClientes.localidad}', '${formDataClientes.direccion}', '${formDataProductos[i].nombre_producto}', ${formDataProductos[i].precio_producto}, ${formDataProductos[i].cuotas_producto}, ${formDataProductos[i].cuotas_pagadas}, ${formDataProductos[i].cada_cuanto_paga}, '${formDataProductos[i].fecha_ultimo_pago}')`

        await window.electronAPI.insertarSQLite(consulta)
      }

      // Mostrar alerta de éxito
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'El cliente se creo correctamente'
      })
      window.location.reload()
    } catch (error) {
      console.error('Error al ejecutar los INSERT:', error)
      // Mostrar alerta de error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al ejecutar los INSERT'
      })
    }
  }

  return (
    <>
      <div onClick={handleAbrirCreador} className="btn__creador__abrir">
        <p>Crear Cliente</p>
        <LuPlusCircle />
      </div>
      {abrirCreador === true ? (
        <section className="creador">
          <h2>Crear Cliente</h2>
          <BtnAtras
            set1={setAbrirCreador}
            set2={setCantidadDeProductos}
            set3={setMostrarCamposClientes}
            set4={setMostrarProductos}
            cancelType={true}
          />
          {mostrarCamposClientes === true ? (
            <></>
          ) : (
            <article className="campos__cliente">
              {camposCreador.map((campo) => (
                <div key={campo.label} className="campo__cliente">
                  {campo.name === 'cantidadDeProductos' ? (
                    <>
                      <label htmlFor="Cantidad de Productos">Cantidad de Productos</label>
                      <input
                        name="cantidadDeProductos"
                        type="number"
                        value={cantidadDeProductos}
                        onChange={campo.onChange}
                      />
                    </>
                  ) : (
                    <>
                      <label htmlFor={campo.label}>{campo.label}</label>
                      <input
                        name={campo.name}
                        type={campo.type}
                        value={formDataClientes[campo.name]}
                        onChange={handleInputClientesChange}
                      />
                    </>
                  )}
                </div>
              ))}
            </article>
          )}
          {mostrarBtnProductos === true ? (
            <>
              {mostrarProductos === true ? (
                <BtnAtras set1={setMostrarProductos} set2={setMostrarCamposClientes} />
              ) : (
                <div onClick={handleSiguiente} className="btn__siguiente__productos">
                  <p>Crear productos del cliente</p>
                </div>
              )}
              {mostrarProductos === true ? (
                <>
                  <article className="contenedor__campos__productos">
                    {camposProducto.map((producto, productIndex) => (
                      <article className="campos__productos" key={productIndex}>
                        <h3>{producto.label}</h3>
                        {producto.campos.map((campo, campoIndex) => (
                          <input
                            key={campoIndex}
                            name={campo.name}
                            className="campo__producto"
                            placeholder={campo.label}
                            value={formDataProductos[campo.name]}
                            onChange={(event) =>
                              handleInputProductosChange(event, productIndex, campo.name)
                            }
                            type={campo.type}
                          />
                        ))}
                      </article>
                    ))}
                  </article>
                  <div onClick={handleCrear} className="btn__siguiente__productos">
                    <p>Crear</p>
                  </div>
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
        </section>
      ) : (
        <></>
      )}
    </>
  )
}

export default Crear
