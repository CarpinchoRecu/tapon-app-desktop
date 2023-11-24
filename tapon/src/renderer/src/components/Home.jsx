import { useEffect, useState } from 'react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Crear from './Crear.jsx'
import Eliminar from './Eliminar.jsx'

const Home = ({ datos }) => {
  //estado para menejar los datos originales de la base de datos
  const [datosOriginal, setDatosOriginal] = useState([])
  //estado para menejar los datos que se van a trasformar en el home
  const [datosHome, setDatosHome] = useState([])
  //estado para menejar los datos que tengan filtro
  const [datosFiltrados, setDatosFiltrados] = useState(datosHome)

  //estado para menejar los datos originales de la base de datos
  useEffect(() => {
    setDatosOriginal(datos) // Almacena los datos originales
  }, [datos])

  //tranformando datos
  useEffect(() => {
    const datosEnHome = () => {
      try {
        const datosAgrupados = datos.reduce((acumulador, dato) => {
          const sinCompletar = 'Sin Completar'
          const nombreMinusculas = dato.nombre.toLowerCase()
          const localidad = dato.localidad || sinCompletar
          const direccion = dato.direccion || sinCompletar
          const clave = `${nombreMinusculas}-${localidad}-${direccion}`

          // Lógica manejo de fechas
          const fecha = dato.fecha_ultimo_pago
          const partesFecha = fecha.split('-')
          const fechaEnDate = new Date(partesFecha[0], partesFecha[1] - 1, partesFecha[2])
          const fechaMasUnMes = new Date(
            fechaEnDate.getFullYear(),
            fechaEnDate.getMonth() + 1,
            fechaEnDate.getDate()
          )
          const nuevoAño = fechaMasUnMes.getFullYear()
          const nuevoMes = String(fechaMasUnMes.getMonth() + 1).padStart(2, '0')
          const nuevoDia = String(fechaMasUnMes.getDate()).padStart(2, '0')
          const fechaProximoPago = `${nuevoAño}-${nuevoMes}-${nuevoDia}`

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
              fecha_proximo_pago: fechaProximoPago || sinCompletar,
              fecha_ultimo_pago: fecha || sinCompletar,
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
  }, [datos])

  const [tocarCliente, setTocarCliente] = useState(false)
  const [datosClienteSeleccionado, setDatosClienteSeleccionado] = useState(null)
  const [idSeleccionado, setIdSeleccionado] = useState(null)

  const handleAbrirOpciones = (id) => {
    setIdSeleccionado(id)
    const clienteSeleccionado = datosHome.find((cliente) => cliente.id === id)
    setDatosClienteSeleccionado(clienteSeleccionado)
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
    <>
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
                    <th>fecha ultimo pago</th>
                    <th>fecha proximo pago</th>
                  </tr>
                </thead>
                <tbody>
                  {datosFiltrados.map((datoHome, index) => (
                    <tr
                      style={{
                        backgroundColor: idSeleccionado === datoHome.id ? '#2473bb' : '',
                      }}
                      onClick={() => handleAbrirOpciones(datoHome.id)}
                      key={index}
                    >
                      <td>{datoHome.nombre}</td>
                      <td>{datoHome.cantidadProductos}</td>
                      <td>{datoHome.localidad}</td>
                      <td>{datoHome.direccion}</td>
                      <td>{datoHome.fecha_ultimo_pago}</td>
                      <td>{datoHome.fecha_proximo_pago}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </main>
          <div className="circle"></div>
        </section>
      </section>
      <Footer
        idSeleccionado={idSeleccionado}
        datosOriginal={datosOriginal}
        datosHome={datosHome}
        tocarCliente={tocarCliente}
        setTocarCliente={setTocarCliente}
      />
    </>
  )
}

export default Home
