import { useState } from 'react'
import Editar from './Editar'

const Footer = ({ tocarCliente, datosOriginal, idSeleccionado, setTocarCliente }) => {
    const [editar, setEditar] = useState(false)
    const handleAbrirEditor = () => {
        setEditar(true)
    }
    return (
        <>
            <footer className={tocarCliente === true ? 'clienteToco' : 'footer'}>
                {tocarCliente === true ? (
                    <>
                        <section>
                            <p onClick={handleAbrirEditor}>Editar</p>
                        </section>
                    </>
                ) : (
                    <>
                        <section>
                            <p>Editar</p>
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
        </>
    )
}

export default Footer
