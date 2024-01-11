import { useEffect, useState } from 'react'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import Crear from '../components/Crear.jsx'
import { useDatosContext } from '../context/DatosContextFile.jsx'
import { IdContext } from '../context/GeneralContext.jsx'
import { ClienteAgrupado } from '../utils/utilsClienteAgrupado.jsx'
import HistorialEliminados from './Papelera.jsx'
import { FaHistory } from 'react-icons/fa'

const Home = () => {
  // --------------------------------------------------------- //
  //estado para menejar los datos originales de la base de datos
  const datosOriginal = useDatosContext()
  //estado para menejar los datos que se van a trasformar en el home
  const [datosHome, setDatosHome] = useState([])
  const [datosEliminados, setDatosEliminados] = useState([])
  //estado para menejar los datos que tengan filtro
  const [datosFiltrados, setDatosFiltrados] = useState(datosHome)
  // --------------------------------------------------------- //

  const [papelera, setPapelera] = useState(false)

  const HandleAbrirPapelera = () => {
    setPapelera(true)
  }

  //tranformando datos
  useEffect(() => {
    const datosApp = () => {
      const datosSinEliminar = ClienteAgrupado(datosOriginal, 0)
      const datoEliminado = ClienteAgrupado(datosOriginal, 1)
      setDatosHome(datosSinEliminar)
      setDatosEliminados(datoEliminado)
      console.log(datoEliminado)
    }

    datosApp()
  }, [datosOriginal])

  const [tocarCliente, setTocarCliente] = useState(false)
  const [idSeleccionado, setIdSeleccionado] = useState(null)

  const handleAbrirOpciones = (id) => {
    setIdSeleccionado(id)
    setTocarCliente(true)
  }

  const handleCerrarOpciones = () => {
    setTocarCliente(false)
    setIdSeleccionado(null)
  }

  useEffect(() => {
    const app = document.querySelector('.app')

    app.addEventListener('click', handleCerrarOpciones)
    return () => {
      app.removeEventListener('click', handleCerrarOpciones)
    }
  }, [setTocarCliente])

  return (
    <IdContext.Provider value={idSeleccionado}>
      <section className="app">
        <Header datosHome={datosHome} setDatosFiltrados={setDatosFiltrados} />
        <section className="home">
          <div className="circle"></div>
          <main>
            <Crear />
            <section className="contenedor__titulo">
              <h2>Morosos</h2>
            </section>
            <section className="contenedor__datos">
              <table>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Cantidad de Productos</th>
                    <th>Localidad</th>
                    <th>Dirección</th>
                  </tr>
                </thead>
                <tbody>
                  {datosFiltrados.map((datoHome, index) => (
                    <tr
                      style={{
                        backgroundColor: idSeleccionado === datoHome.id ? '#2473bb' : ''
                      }}
                      onClick={() => handleAbrirOpciones(datoHome.id)}
                      key={index}
                    >
                      <td>{datoHome.nombre}</td>
                      <td>{datoHome.cantidadProductos}</td>
                      <td>{datoHome.localidad}</td>
                      <td>{datoHome.direccion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </main>
          <div className="circle"></div>
        </section>
      </section>
      <Footer tocarCliente={tocarCliente} setTocarCliente={setTocarCliente} />
      {datosEliminados.length > 0 && (
        <div onClick={HandleAbrirPapelera} className="btnPapelera">
          <p>Papelera</p>
          <FaHistory />
        </div>
      )}
      {papelera && <HistorialEliminados setPapelera={setPapelera} datosEliminados={datosEliminados} />}
    </IdContext.Provider>
  )
}

export default Home
