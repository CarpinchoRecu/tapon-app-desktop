import { useEffect, useContext, useState } from 'react'
import { IdContext } from '../context/GeneralContext.jsx'
import { useDatosContext } from '../context/DatosContextFile.jsx'
import { LuPlusCircle } from 'react-icons/lu'

const CrearProducto = () => {
  const idSeleccionado = useContext(IdContext)
  const datosOriginal = useDatosContext()
  const [mostrarMenuCrear, setMostrarMenuCrear] = useState(false)

  // Encontrar el cliente correspondiente al idSeleccionado
  const clienteSeleccionado = datosOriginal.find((cliente) => cliente.id === idSeleccionado)

  const handleAbrirMenuCrearProductos = () => {
    setMostrarMenuCrear(true)
  }

  return <></>
}

export default CrearProducto
