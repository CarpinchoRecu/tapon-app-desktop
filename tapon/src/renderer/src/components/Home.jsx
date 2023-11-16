import React, { useEffect, useState } from 'react'

const Home = () => {
  const [datos, setDatos] = useState([])

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const selectDB = await window.electronAPI.consultarSQLite(
          'SELECT nombre, localidad, direccion FROM clientes'
        )
        const nombresContados = selectDB.reduce((acumulador, dato) => {
          const nombreMinusculas = dato.nombre.toLowerCase()
          const indiceExistente = acumulador.findIndex((elem) => elem.nombre === nombreMinusculas)

          if (indiceExistente !== -1) {
            acumulador[indiceExistente].cantidadProductos++
          } else {
            acumulador.push({
              nombre: nombreMinusculas,
              localidad: dato.localidad || 'Sin Completar',
              direccion: dato.direccion || 'Sin Completar',
              cantidadProductos: 1
            })
          }
          return acumulador
        }, [])

        setDatos(nombresContados)
      } catch (error) {
        console.error('Error al obtener los datos:', error)
      }
    }

    obtenerDatos()
  }, [])

  return (
    <>
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
            </tr>
          </thead>
          <tbody>
            {datos.map((dato, index) => (
              <tr key={index}>
                <td>{dato.nombre}</td>
                <td>{dato.cantidadProductos}</td>
                <td>{dato.localidad}</td>
                <td>{dato.direccion}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </section>
      </main>
      <div className="circle"></div>
    </>
  )
}

export default Home
