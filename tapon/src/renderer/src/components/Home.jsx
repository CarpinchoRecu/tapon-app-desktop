import { useEffect, useState } from 'react'
import Header from './Header.jsx'

const Home = ({ datos }) => {
  const [datosHome, setDatosHome] = useState([])
  const [datosFiltrados, setDatosFiltrados] = useState(datosHome);

  useEffect(() => {
    const datosEnHome = () => {
      try {
        const nombresContados = datos.reduce((acumulador, dato) => {
          const sinCompletar = 'Sin Completar'
          const nombreMinusculas = dato.nombre.toLowerCase()

          // Lógica manejo de fechas
          const fecha = dato.fecha_ultimo_pago
          const partesFecha = fecha.split('-')
          const fechaEnDate = new Date(partesFecha[0], partesFecha[1] - 1, partesFecha[2])
          // Crear una nueva fecha sumando un mes
          const fechaMasUnMes = new Date(
            fechaEnDate.getFullYear(),
            fechaEnDate.getMonth() + 1,
            fechaEnDate.getDate()
          )
          // Obtener el año, mes y día de la nueva fecha
          const nuevoAño = fechaMasUnMes.getFullYear()
          const nuevoMes = String(fechaMasUnMes.getMonth() + 1).padStart(2, '0')
          const nuevoDia = String(fechaMasUnMes.getDate()).padStart(2, '0')

          // Construir la nueva fecha
          const fechaProximoPago = `${nuevoAño}-${nuevoMes}-${nuevoDia}`
          const indiceExistente = acumulador.findIndex((elem) => elem.nombre === nombreMinusculas)

          if (indiceExistente !== -1) {
            acumulador[indiceExistente].cantidadProductos++
          } else {
            acumulador.push({
              nombre: nombreMinusculas,
              localidad: dato.localidad || sinCompletar,
              direccion: dato.direccion || sinCompletar,
              fecha_proximo_pago: fechaProximoPago || sinCompletar,
              fecha_ultimo_pago: fecha || sinCompletar,
              cantidadProductos: 1
            })
          }
          return acumulador
        }, [])

        setDatosHome(nombresContados)
      } catch (error) {
        console.error('Error al obtener los datos:', error)
      }
    }

    datosEnHome()
  }, [datos])

  return (
    <>
    <Header datosHome={datosHome} setDatosFiltrados={setDatosFiltrados}/>
      <section className="home">
        <div className="circle"></div>
        <main>
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
                  <tr key={index}>
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
    </>
  )
}

export default Home
