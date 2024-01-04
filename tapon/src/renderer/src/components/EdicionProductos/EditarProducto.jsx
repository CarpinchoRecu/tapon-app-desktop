import React, { useContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import BtnAtras from '../Items/botones/BtnAtras'
import PropTypes from 'prop-types'
import { ProductosContext } from '../../context/GeneralContext'
import BtnFuncion from '../Items/botones/BtnFuncion'

const EditarProducto = ({ setOpcionSeleccionada, setOpcion }) => {
  const [btnMenuEditar, setBtnMenuEditar] = useState(false)
  const [menuEditar, setMenuEditar] = useState(false)
  const productoSeleccionado = useContext(ProductosContext)

  const handleSiguienteMenuEditar = () => {
    setMenuEditar(true)
    setBtnMenuEditar(true)
  }

  const [formDataEdicion, setFormDataEdicion] = useState({
    nombre_producto: '',
    precio_producto: 0,
    cuotas_producto: 0,
    cuotas_pagadas: 0,
    cada_cuanto_paga: 0,
    fecha_ultimo_pago: ''
  })
  const [camposSeleccionados, setCamposSeleccionados] = useState([])

  const handleCampoSeleccionado = ([campo, tipo, label]) => {
    const existeCampo = camposSeleccionados.some(
      ([c, t, l]) => c === campo && t === tipo && l === label
    );
  
    if (existeCampo) {
      // Si el campo ya está en la lista, quitarlo
      setCamposSeleccionados(
        camposSeleccionados.filter(([c, t, l]) => !(c === campo && t === tipo && l === label))
      );
    } else {
      // Si el campo no está en la lista, añadirlo
      setCamposSeleccionados([...camposSeleccionados, [campo, tipo, label]]);
    }
  };
  

  const handleInputEdicionChange = (event, campo) => {
    setFormDataEdicion({
      ...formDataEdicion,
      [campo]: event.target.value
    })
  }

  const handleEditar = async () => {
    const fieldsToValidate = camposSeleccionados.map((campo) => campo[0])

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
    const camposAActualizar = camposSeleccionados.map((campo) => campo[0])

    // Construir la parte de la query para SET
    const setQueryPart = camposAActualizar.map((campo) => `${campo}=?`).join(', ')

    // Construir la query completa
    const query = `UPDATE clientes SET ${setQueryPart} WHERE id=?`

    // Construir los valores para la query
    const values = [
      ...camposAActualizar.map((campo) => formDataEdicion[campo]),
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

  return (
    <>
      <div className="editor">
        <h2 className="title_editor">Editar Producto</h2>
        <div className="contenedor__campo__editor">
          <div className="campos__editor">
            {menuEditar ? (
              <>
                <BtnAtras set1={setBtnMenuEditar} set2={setMenuEditar} />

                {camposSeleccionados.map((campo, index) => (
                  <div className="contenedor_campos" key={index}>
                    <label htmlFor={campo[2]}>{campo[2]}</label>
                    <input
                      className="campo__editor"
                      placeholder={campo[2]}
                      type={campo[1]}
                      value={formDataEdicion[campo[0]]}
                      onChange={(event) => handleInputEdicionChange(event, campo[0])}
                    />
                  </div>
                ))}
              </>
            ) : (
              <>
                <BtnAtras cancelType={true} set1={setOpcion} set2={setOpcionSeleccionada} />
                {checkboxSeleccionados.map((check, indexCheck) => {
                  const isChecked = camposSeleccionados.some(
                    ([campo, tipo]) => campo === check.name && tipo === check.type
                  )
                  return (
                    <div className="check__editor" key={indexCheck}>
                      <label htmlFor={check.label}>{check.label}</label>
                      <input
                        type="checkbox"
                        className="mycheck"
                        onChange={() =>
                          handleCampoSeleccionado([check.name, check.type, check.label])
                        }
                        checked={isChecked}
                      />
                    </div>
                  )
                })}
              </>
            )}
            {btnMenuEditar ? (
              <BtnFuncion texto="Editar" tipoDeColor="azul" funcion={handleEditar} />
            ) : (
              <>
                {camposSeleccionados.length > 0 ? (
                  <BtnFuncion
                    texto="Siguiente"
                    tipoDeColor="azul"
                    funcion={handleSiguienteMenuEditar}
                  />
                ) : (
                  <></>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

EditarProducto.propTypes = {
  setOpcionSeleccionada: PropTypes.func.isRequired, // Para validar una función de setState
  setOpcion: PropTypes.func.isRequired
}

export default EditarProducto
