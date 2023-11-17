import { useState, useEffect } from 'react'
import { FaSearch } from "react-icons/fa";

const Header = ({ datosHome, setDatosFiltrados }) => {
  const [filtroChivilcoy, setFiltroChivilcoy] = useState(false)
  const [filtroSuipacha, setFiltroSuipacha] = useState(false)
  const [filtroCantidadProductos, setFiltroCantidadProductos] = useState('')
  const [filtroBusquedaNombre, setFiltroBusquedaNombre] = useState('')
  const [busquedaActiva, setBusquedaActiva] = useState(false)

  useEffect(() => {
    const filtrarDatos = () => {
      let datosFiltrados = datosHome

      if (busquedaActiva) {
        // Si la búsqueda está activa, desactivamos los otros filtros
        setFiltroChivilcoy(false)
        setFiltroSuipacha(false)
        setFiltroCantidadProductos('')
      } else {
        // Si la búsqueda no está activa, aplicamos los otros filtros
        if (filtroChivilcoy || filtroSuipacha) {
          datosFiltrados = datosFiltrados.filter((dato) => {
            const localidad = dato.localidad.toLowerCase()
            if (filtroChivilcoy && localidad === 'chivilcoy') {
              return true
            } else if (filtroSuipacha && localidad === 'suipacha') {
              return true
            }
            return false
          })
        }

        if (filtroCantidadProductos !== '') {
          datosFiltrados = datosFiltrados.filter(
            (dato) => dato.cantidadProductos === parseInt(filtroCantidadProductos)
          )
        }
      }

      if (filtroBusquedaNombre !== '') {
        datosFiltrados = datosFiltrados.filter((dato) =>
          dato.nombre.toLowerCase().includes(filtroBusquedaNombre.toLowerCase())
        )
      }

      setDatosFiltrados(datosFiltrados)
    }

    filtrarDatos()
  }, [
    filtroChivilcoy,
    filtroSuipacha,
    filtroCantidadProductos,
    filtroBusquedaNombre,
    busquedaActiva,
    datosHome,
    setDatosFiltrados
  ])

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    if (name === 'chivilcoy') {
      setFiltroChivilcoy(checked)
    } else if (name === 'suipacha') {
      setFiltroSuipacha(checked)
    }
    // Cuando se activa un filtro, desactivamos la búsqueda
    setBusquedaActiva(false)
  }

  const handleCantidadProductosChange = (e) => {
    setFiltroCantidadProductos(e.target.value)
    // Cuando se activa un filtro, desactivamos la búsqueda
    setBusquedaActiva(false)
  }

  const handleBusquedaNombreChange = (e) => {
    setFiltroBusquedaNombre(e.target.value)
    // Activamos o desactivamos la búsqueda según si hay un valor en el input de búsqueda
    setBusquedaActiva(e.target.value !== '')
  }

  const filtros = [
    {
      nombreFiltro: 'chivilcoy',
      type: 'checkbox',
      state: filtroChivilcoy
    },
    {
      nombreFiltro: 'suipacha',
      type: 'checkbox',
      state: filtroSuipacha
    },
    {
      nombreFiltro: 'cantidad de pruductos',
      type: 'number',
      state: null
    }
  ]

  const [buscando, setBuscando] = useState(false)

  const handleBuscando = () => {
    setBuscando(true)
  }

  const handleSalirDeBusqueda = () => {
    setBuscando(false)
  }
  useEffect(() => {
    const app = document.querySelector('.app')

    app.addEventListener('click', handleSalirDeBusqueda)
    return () => {
      app.removeEventListener('click', handleSalirDeBusqueda)
    }
  }, [setBuscando])

  return (
    <header>
      <section className="contenedor__buscador">
        <div className="buscador">
          {buscando === true ? <></> :
            <>
              <p>Buscar...</p>
              <div className="img__buscador">
                <FaSearch />
              </div>

            </>
          }
          <input
            onClick={handleBuscando}
            type="text"
            value={filtroBusquedaNombre}
            onChange={handleBusquedaNombreChange}
          />
          {buscando === true ? <h2>Las Busquedas son solo por nombres</h2> : <></>}
        </div>
      </section>
      <section className="contenedor__filtros">
        {filtros.map((filtro, index) => (
          <div key={index}>
            {filtro.type === 'checkbox' && (
              <>
                <label htmlFor={filtro.nombreFiltro}>{filtro.nombreFiltro}</label>
                <input
                  type={filtro.type}
                  name={filtro.nombreFiltro}
                  checked={filtro.state}
                  onChange={handleCheckboxChange}
                />
              </>
            )}
            {filtro.type === 'number' && (
              <>
                <label htmlFor={filtro.nombreFiltro}>{filtro.nombreFiltro}</label>
                <input
                  type={filtro.type}
                  name={filtro.nombreFiltro}
                  checked={filtro.state}
                  onChange={handleCantidadProductosChange}
                />
              </>
            )}
          </div>
        ))}
      </section>
    </header>
  )
}

export default Header
