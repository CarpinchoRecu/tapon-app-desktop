import React, { useState } from "react"
import Editor from "../../components/Editor"
import BtnAtras from "../../components/Items/botones/BtnAtras"

const MenuProductos = ({productoSeleccionado, setProductoSeleccionado}) => {
    const [opcionSeleccionada, setOpcionSeleccionada] = useState(null)
    const [opcion, setOpcion] = useState(null)


    const handleAbrirOpcion = (index) => {
        setOpcion(opcion === index ? null : index)
        setOpcionSeleccionada(index)
    }


    const opcionesProd = [
        {
            name: 'editar',
            h2: 'Editar Producto',
            p: 'Esta opción es para poder editar el producto seleccionado. Se utiliza en caso de algún error o modificación en la fecha del último pago.'
        },
        {
            name: 'pagar',
            h2: 'Notificar Pago de Producto',
            p: 'Esta opción es para cuando el producto de este cliente ya fue cobrado y quieres notificarlo.'
        },
        {
            name: 'eliminar',
            h2: 'Eliminar Producto',
            p: 'Esta opción es solo para eliminar este producto en específico.'
        }
    ]
    return (
        <>
            {productoSeleccionado && (
                <div className="opciones__productos">
                    <h2 className="titulo__opciones">Opciones para el Producto</h2>
                    <BtnAtras set1={setProductoSeleccionado} cancelType={true} />
                    {opcionesProd.map((opciones, index) => (
                        <React.Fragment key={index}>
                            <section onClick={() => handleAbrirOpcion(index)} className="contenedor__opcion">
                                <h2 className="titulo__opcion">{opciones.h2}</h2>
                                <p className="descripcion__opcion">{opciones.p}</p>
                            </section>
                            {opcion === index && opcion === opcionSeleccionada && (
                                <>
                                    {opcionesProd[opcion].name === 'editar' && (
                                        <Editor
                                            productoSeleccionado={productoSeleccionado}
                                            setOpcion={setOpcion}
                                            setOpcionSeleccionada={setOpcionSeleccionada}
                                        />
                                    )}
                                    {opcionesProd[opcion].name === 'eliminar' && <>menu eliminar</>}
                                    {opcionesProd[opcion].name === 'pagar' && <>menu pagar</>}
                                </>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            )}
        </>
    )
}

export default MenuProductos
