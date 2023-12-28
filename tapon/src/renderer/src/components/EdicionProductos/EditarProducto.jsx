import React, { useContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import BtnAtras from '../Items/botones/BtnAtras'
import PropTypes from 'prop-types'
import { ProductosContext } from '../../context/GeneralContext'

const EditarProducto = ({ setOpcionSeleccionada, setOpcion }) => {
  const productoSeleccionado = useContext(ProductosContext)
  const [formDataEdicion, setFormDataEdicion] = useState({
    nombre_producto: '',
    precio_producto: 0,
    cuotas_producto: 0,
    cuotas_pagadas: 0,
    fecha_ultimo_pago: ''
  })

  const handleInputEdicionChange = (event, campo) => {
    setFormDataEdicion({
      ...formDataEdicion,
      [campo]: event.target.value
    })
  }

  const handleEditar = async () => {
    const { nombre_producto, precio_producto, cuotas_producto, cuotas_pagadas, fecha_ultimo_pago } =
      formDataEdicion

    // Validación de campos vacíos
    if (
      !nombre_producto ||
      !precio_producto ||
      !cuotas_producto ||
      !cuotas_pagadas ||
      !fecha_ultimo_pago
    ) {
      // Mostrar alerta con SweetAlert para campos vacíos
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
      return // Detener la ejecución si hay campos vacíos
    }

    const query = `UPDATE clientes SET nombre_producto=?, precio_producto=?, cuotas_producto=?, cuotas_pagadas=?, fecha_ultimo_pago=? WHERE id=?`
    const values = [
      nombre_producto,
      precio_producto,
      cuotas_producto,
      cuotas_pagadas,
      fecha_ultimo_pago,
      productoSeleccionado.id
    ]

    try {
      await window.electronAPI.actualizarSQLite(query, values)
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
      console.error('Error al actualizar:', error)
      // Mostrar alerta con SweetAlert para errores
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

  const camposProductosSeleccionados = [
    {
      name: 'nombre_producto',
      label: 'Nombre Producto',
      type: 'text'
    },
    {
      name: 'precio_producto',
      label: 'Precio Producto',
      placeholder: 'productoSeleccionado.precio_producto',
      type: 'number'
    },
    {
      name: 'cuotas_producto',
      label: 'Cuotas',
      placeholder: 'productoSeleccionado.cuotas_producto',
      type: 'number'
    },
    {
      name: 'cuotas_pagadas',
      label: 'Cuotas Pagadas',
      placeholder: 'productoSeleccionado.cuotas_pagadas',
      type: 'number'
    },
    {
      name: 'fecha_ultimo_pago',
      label: 'Fecha Ultimo Pago',
      placeholder: 'productoSeleccionado.fecha_ultimo_pago',
      type: 'date'
    }
  ]

  return (
    <>
      <div className="editor">
        <h2 className="title_editor">Editar Producto</h2>
        <BtnAtras set1={setOpcion} set2={setOpcionSeleccionada} />
        <div className="contenedor__campo__editor">
          <div className="campos__editor">
            {camposProductosSeleccionados.map((campoSeleccionado, indexCampoSeleccionado) => (
              <React.Fragment key={indexCampoSeleccionado}>
                <label htmlFor={campoSeleccionado.label}>{campoSeleccionado.label}</label>
                <input
                  className="campo__editor"
                  placeholder={productoSeleccionado[campoSeleccionado.name]}
                  type={campoSeleccionado.type}
                  value={formDataEdicion[campoSeleccionado.name]}
                  onChange={(event) => handleInputEdicionChange(event, campoSeleccionado.name)}
                />
              </React.Fragment>
            ))}
          </div>
        </div>
        <div onClick={handleEditar} className="btn__editar">
          <p>Editar</p>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}

EditarProducto.propTypes = {
  setOpcionSeleccionada: PropTypes.func.isRequired, // Para validar una función de setState
  setOpcion: PropTypes.func.isRequired,
  productoSeleccionado: PropTypes.object.isRequired // Para validar un objeto
}

export default EditarProducto
