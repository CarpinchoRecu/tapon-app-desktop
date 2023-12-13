import { useEffect, useState } from 'react'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import Crear from '../components/Crear.jsx'
import { useDatosContext } from '../context/DatosContextFile.jsx'
import { IdContext } from '../context/IdContext.jsx'
import CrearProducto from '../components/EdicionProductos/CrearProducto.jsx'
import { calcularUltimoPago } from '../utils/utilsDate.js'

const Home = () => {
  // --------------------------------------------------------- //
  //estado para menejar los datos originales de la base de datos
  const datosOriginal = useDatosContext()
  //estado para menejar los datos que se van a trasformar en el home
  const [datosHome, setDatosHome] = useState([])
  //estado para menejar los datos que tengan filtro
  const [datosFiltrados, setDatosFiltrados] = useState(datosHome)
  // --------------------------------------------------------- //

  //tranformando datos
  useEffect(() => {
    const datosEnHome = () => {
      try {
        const datosAgrupados = datosOriginal.reduce((acumulador, dato) => {
          const sinCompletar = 'Sin Completar'
          const nombreMinusculas = dato.nombre.toLowerCase()
          const localidad = dato.localidad || sinCompletar
          const direccion = dato.direccion || sinCompletar
          const clave = `${nombreMinusculas}-${localidad}-${direccion}`
          // Lógica manejo de fechas
          // const fecha = dato.fecha_ultimo_pago
          // const CadaCuantoPaga = dato.cada_cuanto_paga
          const indiceExistente = acumulador.findIndex((elem) => elem.clave === clave)

          if (indiceExistente !== -1) {
            acumulador[indiceExistente].cantidadProductos++
          } else {
            acumulador.push({
              id: dato.id,
              nombre: nombreMinusculas,
              localidad: localidad,
              direccion: direccion,
              nombreProducto: dato.nombre_producto || sinCompletar,
              precioProducto: dato.precio_producto || sinCompletar,
              cuotasProducto: dato.cuotas_producto || sinCompletar,
              cuotasPagadas: dato.cuotas_pagadas || sinCompletar,
              cantidadProductos: 1,
              clave: clave
            })
          }
          return acumulador
        }, [])

        setDatosHome(datosAgrupados)
      } catch (error) {
        console.error('Error al obtener los datos:', error)
      }
    }

    datosEnHome()
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
      <CrearProducto />
      <Footer tocarCliente={tocarCliente} setTocarCliente={setTocarCliente} />
    </IdContext.Provider>
  )
}

export default Home
