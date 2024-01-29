import { createContext, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const DatosContext = createContext()

export const useDatosContext = () => {
  return useContext(DatosContext)
}

export const DatosProvider = ({ children }) => {
  const [datos, setDatos] = useState([])

  const obtenerDatos = async () => {
    try {
      const selectDB = await window.electronAPI.consultarSQLite('SELECT * FROM clientes')
      setDatos(selectDB) // Almacena los datos en el estado 'datos'
    } catch (error) {
      console.error('Error al obtener los datos:', error)
    }
  }

  useEffect(() => {
    // Obtener los datos inicialmente
    obtenerDatos();

    const intervalId = setInterval(obtenerDatos, 100000);

    // Limpiar el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, []);

  return <DatosContext.Provider value={datos}>{children}</DatosContext.Provider>
}

DatosProvider.propTypes = {
  children: PropTypes.node.isRequired
}
