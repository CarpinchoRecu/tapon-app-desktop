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
  const [camposSeleccionados, setCamposSeleccionados] = useState([])

  const handleCampoSeleccionado = ([campo, tipo]) => {
    const existeCampo = camposSeleccionados.some(([c, t]) => c === campo && t === tipo)

    if (existeCampo) {
      // Si el campo ya está en la lista, quitarlo
      setCamposSeleccionados(camposSeleccionados.filter(([c, t]) => !(c === campo && t === tipo)))
    } else {
      // Si el campo no está en la lista, añadirlo
      setCamposSeleccionados([...camposSeleccionados, [campo, tipo]])
      console.log(camposSeleccionados)
    }
  }

  const handleInputEdicionChange = (event, campo) => {
    console.log(formDataEdicion)
    setFormDataEdicion({
      ...formDataEdicion,
      [campo]: event.target.value
    })
  }

  const handleEditar = async () => {
    const fieldsToValidate = camposSeleccionados.map((campo) => campo.name)

    const camposVacios = fieldsToValidate.filter(
      (campo) => !formDataEdicion[campo] || formDataEdicion[campo].trim() === ''
    )

    if (camposVacios.length > 0) {
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
      return
    }

  // Obtener los nombres de los campos seleccionados
  const camposAActualizar = camposSeleccionados.map(campo => campo[0]);

  // Construir la parte de la query para SET
  const setQueryPart = camposAActualizar.map(campo => `${campo}=?`).join(', ');

  // Construir la query completa
  const query = `UPDATE clientes SET ${setQueryPart} WHERE id=?`;

  // Construir los valores para la query
  const values = [
    ...camposAActualizar.map(campo => formDataEdicion[campo]),
    productoSeleccionado.id
  ];

    try {
      await console.log(query, values)
      // window.electronAPI.actualizarSQLite(query, values)
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

  const checkboxSeleccionados = [
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
      name: 'fecha_ultimo_pago',
      label: 'Fecha Ultimo Pago',
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
            <>
              {checkboxSeleccionados.map((check, indexCheck) => {
                const isChecked = camposSeleccionados.some(
                  ([campo, tipo]) => campo === check.name && tipo === check.type
                )

                return (
                  <div key={indexCheck}>
                    <label htmlFor={check.label}>{check.label}</label>
                    <input
                      type="checkbox"
                      onChange={() => handleCampoSeleccionado([check.name, check.type])}
                      checked={isChecked}
                    />
                  </div>
                )
              })}
            </>
            <div>
              {camposSeleccionados.map((campo, index) => (
                <div key={index}>
                  <label htmlFor="">{campo[0]}</label>
                  <input
                    placeholder={campo[0]}
                    type={campo[1]}
                    value={formDataEdicion[campo[0]]}
                    onChange={(event) => handleInputEdicionChange(event, campo[0])}
                  />
                </div>
              ))}
            </div>

            {/* {camposProductosSeleccionados.map((campoSeleccionado, indexCampoSeleccionado) => (
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
            ))} */}
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
  setOpcion: PropTypes.func.isRequired
}

export default EditarProducto
