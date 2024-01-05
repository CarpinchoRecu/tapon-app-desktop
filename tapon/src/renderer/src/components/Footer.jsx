import { useState } from 'react'
import Observar from '../screens/Observar/Observar'
import Eliminar from './Eliminar'
import PropTypes from 'prop-types'
import CrearProducto from './CrearProducto'

const Footer = ({ tocarCliente, setTocarCliente }) => {
  // --------------------------------------------------------- //
  const [editar, setEditar] = useState(false)
  const [eliminar, setEliminar] = useState(false)
  const [crearP, setCrearP] = useState(false)
  // --------------------------------------------------------- //
  const handleAbrirEditor = () => {
    setEditar(true)
    setEliminar(false)
    setCrearP(false)
  }
  const handleAbrirEliminar = () => {
    setEliminar(true)
    setEditar(false)
    setCrearP(false)
  }

  const handleAbrirCrearP = () => {
    setCrearP(true)
    setEliminar(false)
    setEditar(false)
  }
  return (
    <>
      <footer className={tocarCliente === true ? 'clienteToco' : 'footer'}>
        {tocarCliente === true ? (
          <>
            <section>
              <p onClick={handleAbrirEditor}>Observar</p>
            </section>
            <section>
              <p onClick={handleAbrirCrearP}>Crear Producto</p>
            </section>
            <section>
              <p onClick={handleAbrirEliminar}>Eliminar</p>
            </section>
          </>
        ) : (
          <>
            <section>
              <p>Observar</p>
            </section>
            <section>
              <p>Crear Producto</p>
            </section>
            <section>
              <p>Eliminar</p>
            </section>
          </>
        )}
      </footer>
      {editar && <Observar setTocarCliente={setTocarCliente} setEditar={setEditar} />}
      {eliminar && <Eliminar setTocarCliente={setTocarCliente} setEliminar={setEliminar} />}
      {crearP && <CrearProducto setTocarCliente={setTocarCliente} setCrearP={setCrearP} />}
    </>
  )
}

Footer.propTypes = {
  tocarCliente: PropTypes.any.isRequired,
  setTocarCliente: PropTypes.func.isRequired
}

export default Footer
