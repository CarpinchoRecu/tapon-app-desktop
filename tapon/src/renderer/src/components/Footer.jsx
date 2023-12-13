import { useState } from 'react'
import Observar from '../screens/Observar/Observar'
import Eliminar from './Eliminar/Eliminar'
import PropTypes from 'prop-types'
import CrearProducto from './EdicionProductos/CrearProducto'

const Footer = ({ tocarCliente, setTocarCliente }) => {
  // --------------------------------------------------------- //
  const [editar, setEditar] = useState(false)
  const [eliminar, setEliminar] = useState(false)
  // --------------------------------------------------------- //
  const handleAbrirEditor = () => {
    setEditar(true)
    setEliminar(false)
  }
  const handleAbrirEliminar = () => {
    setEliminar(true)
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
              <p onClick={handleAbrirEditor}>Crear Producto</p>
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
      {editar === true && <Observar setTocarCliente={setTocarCliente} setEditar={setEditar} />}
      {eliminar === true && (
        <Eliminar setTocarCliente={setTocarCliente} setEliminar={setEliminar} />
      )}
    </>
  )
}

Footer.propTypes = {
  tocarCliente: PropTypes.any.isRequired,
  setTocarCliente: PropTypes.func.isRequired
}

export default Footer
