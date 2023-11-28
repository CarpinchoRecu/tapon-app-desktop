import { createContext, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const DatosContext = createContext()

export const useDatosContext = () => {
  return useContext(DatosContext)
}

export const DatosProvider = ({ children }) => {
  const [datos, setDatos] = useState([])

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const selectDB = await window.electronAPI.consultarSQLite('SELECT * FROM clientes')
        setDatos(selectDB) // Almacena los datos en el estado 'datos'
      } catch (error) {
        console.error('Error al obtener los datos:', error)
      }
    }
    obtenerDatos()
  }, [])

  return <DatosContext.Provider value={datos}>{children}</DatosContext.Provider>
}

// Agrega PropTypes para validar 'children'
DatosProvider.propTypes = {
  children: PropTypes.node.isRequired
}
