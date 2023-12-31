import { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import { MdCancel } from 'react-icons/md'

import PropTypes from 'prop-types'

const Header = ({ datosHome, setDatosFiltrados }) => {
  // --------------------------------------------------------- //
  const [filtroChivilcoy, setFiltroChivilcoy] = useState(false)
  const [filtroSuipacha, setFiltroSuipacha] = useState(false)
  const [filtroCantidadProductos, setFiltroCantidadProductos] = useState('')
  const [filtroBusquedaNombre, setFiltroBusquedaNombre] = useState('')
  const [busquedaActiva, setBusquedaActiva] = useState(false)
  // --------------------------------------------------------- //

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
      name: 'Chivilcoy',
      nombreFiltro: 'chivilcoy',
      type: 'checkbox',
      state: filtroChivilcoy
    },
    {
      name: 'Suipacha',
      nombreFiltro: 'suipacha',
      type: 'checkbox',
      state: filtroSuipacha
    },
    {
      name: 'Cantidad de Productos',
      nombreFiltro: 'cantidad de productos',
      type: 'number',
      state: undefined
    }
  ]

  const [buscando, setBuscando] = useState(false)

  const handleSacarNombre = () => {
    setFiltroBusquedaNombre('')
  }

  useEffect(() => {
    if (filtroBusquedaNombre === '') {
      setBuscando(false)
    } else {
      setBuscando(true)
    }
  }, [filtroBusquedaNombre, setBuscando])

  return (
    <header>
      <section className="contenedor__buscador">
        <div className="buscador">
          {buscando === true ? (
            <>
              <div onClick={handleSacarNombre} className="img__sacar__buscador">
                <MdCancel />
              </div>
            </>
          ) : (
            <>
              <div className="img__buscador">
                <FaSearch />
              </div>
            </>
          )}
          <input
            type="text"
            placeholder="Buscar..."
            value={filtroBusquedaNombre}
            onChange={handleBusquedaNombreChange}
          />
          <h2>Las busquedas son solo por nombres</h2>
        </div>
      </section>
      <section className="contenedor__filtros">
        <h2>Filtros</h2>

        <div className="checkboxContainer">
          {filtros.map(
            (filtro, index) =>
              filtro.type === 'checkbox' && (
                <div className="checkBox" key={index}>
                  <label htmlFor={filtro.name}>{filtro.name}</label>
                  <input
                    type={filtro.type}
                    name={filtro.nombreFiltro}
                    checked={filtro.state}
                    onChange={handleCheckboxChange}
                  />
                </div>
              )
          )}
        </div>
        <div className="numberContainer">
          {filtros.map(
            (filtro, index) =>
              filtro.type === 'number' && (
                <div className="number" key={index}>
                  <label htmlFor={filtro.name}>{filtro.name}</label>
                  <input
                    type={filtro.type}
                    name={filtro.nombreFiltro}
                    value={filtro.state}
                    onChange={handleCantidadProductosChange}
                  />
                </div>
              )
          )}
        </div>
      </section>
    </header>
  )
}

Header.propTypes = {
  datosHome: PropTypes.array.isRequired,
  setDatosFiltrados: PropTypes.func.isRequired
}

export default Header
