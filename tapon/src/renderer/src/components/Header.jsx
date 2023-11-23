import { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import { MdCancel } from 'react-icons/md'

const Header = ({ datosHome, setDatosFiltrados }) => {
  const [filtroChivilcoy, setFiltroChivilcoy] = useState(false)
  const [filtroSuipacha, setFiltroSuipacha] = useState(false)
  const [filtroCantidadProductos, setFiltroCantidadProductos] = useState('')
  const [filtroBusquedaNombre, setFiltroBusquedaNombre] = useState('')
  const [busquedaActiva, setBusquedaActiva] = useState(false)
  const [filtroProximoPago, setFiltroProximoPago] = useState(false);

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

      if (filtroProximoPago) {
        // Filtrar solo si se activa el checkbox
        const fechaActual = new Date().getTime();

        datosFiltrados = datosFiltrados.filter((cliente) => {
          const fechaProximoPago = new Date(cliente.fecha_proximo_pago).getTime();
          const diffTiempo = fechaProximoPago - fechaActual;
          const diffDias = Math.ceil(diffTiempo / (1000 * 60 * 60 * 24));
          return diffDias <= 7 && diffDias >= 0;
        });
      }

      setDatosFiltrados(datosFiltrados)
    }

    filtrarDatos()
  }, [
    filtroChivilcoy,
    filtroSuipacha,
    filtroCantidadProductos,
    filtroBusquedaNombre,
    filtroProximoPago,
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
    }else if (name === 'proximoCobrar') {
      setFiltroProximoPago(checked)
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
      name: "Chivilcoy",
      nombreFiltro: 'chivilcoy',
      type: 'checkbox',
      state: filtroChivilcoy
    },
    {
      name: "Suipacha",
      nombreFiltro: 'suipacha',
      type: 'checkbox',
      state: filtroSuipacha
    },
    {
      name: "Proximo a Cobrar",
      nombreFiltro: 'proximoCobrar',
      type: 'checkbox',
      state: filtroProximoPago
    },
    {
      name: "Cantidad de Pruductos",
      nombreFiltro: 'cantidad de pruductos',
      type: 'number',
      state: ""
    }
  ]

  const [buscando, setBuscando] = useState(false)
  const handleBuscando = () => {
    setBuscando(true)
  }
  const handleSalirDeBusqueda = () => {
    setBuscando(false)
  }

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
            onClick={handleBuscando}
            type="text"
            placeholder="Buscar..."
            value={filtroBusquedaNombre}
            onChange={handleBusquedaNombreChange}
          />
          {buscando === true ? <h2>Las Busquedas son solo por nombres</h2> : <></>}
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

export default Header
