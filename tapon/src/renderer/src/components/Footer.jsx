import { useState } from 'react'
import Editar from './Editar'
import Eliminar from './Eliminar'

const Footer = ({ tocarCliente, datosOriginal, idSeleccionado, setTocarCliente }) => {
    const [editar, setEditar] = useState(false)
    const [eliminar, setEliminar] = useState(false)
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
                            <p onClick={handleAbrirEditor}>Editar</p>
                        </section>
                        <section>
                            <p onClick={handleAbrirEliminar}>Eliminar</p>
                        </section>
                    </>
                ) : (
                    <>
                        <section>
                            <p>Editar</p>
                        </section>
                        <section>
                            <p>Eliminar</p>
                        </section>
                    </>
                )}
            </footer>
            {editar === true && (
                <Editar
                    setTocarCliente={setTocarCliente}
                    idSeleccionado={idSeleccionado}
                    setEditar={setEditar}
                    datosOriginal={datosOriginal}
                />
            )}
            {eliminar === true && (
                <Eliminar setTocarCliente={setTocarCliente} setEliminar={setEliminar} datosOriginal={datosOriginal} idSeleccionado={idSeleccionado} />
            )}
        </>
    )
}

export default Footer
