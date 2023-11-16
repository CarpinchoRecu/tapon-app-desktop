import { useEffect, useState } from 'react'
import Home from './components/Home.jsx'
import Footer from "./components/Footer.jsx"
import Header from './components/Header.jsx'
import style from './style/main.scss'

function App() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const selectDB = await window.electronAPI.consultarSQLite(
          'SELECT * FROM clientes'
        );
        setDatos(selectDB); // Almacena los datos en el estado 'datos'
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };
    obtenerDatos();
  }, []);


  return (
    <>
    <Home datos={datos}/>
    <Footer/>
    </>
  )
}

export default App
