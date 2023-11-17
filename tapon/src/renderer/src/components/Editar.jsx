const Editar = ({ datosOriginal, idSeleccionado, setEditar, setTocarCliente }) => {
    const handleCerrarEditor = () => {
        setEditar(false)
        setTocarCliente(false) // Cambia el estado de editar a false en Footer
    }
    // Encontrar el cliente correspondiente al idSeleccionado
    const clienteSeleccionado = datosOriginal.find((cliente) => cliente.id === idSeleccionado)

    if (!clienteSeleccionado) {
        return <p>Cliente no encontrado</p>
    }

    // Encontrar todos los productos con el mismo nombre del cliente seleccionado
    const productosCliente = datosOriginal.filter(
        (cliente) => cliente.nombre.toLowerCase() === clienteSeleccionado.nombre.toLowerCase()
    )

    return (
        <div className="editar">
            <h2>Productos de {clienteSeleccionado.nombre}</h2>
            <button onClick={handleCerrarEditor}>volver</button>
            {productosCliente.map((producto, index) => (
                <div key={index}>
                    <p>{producto.nombre_producto}</p>
                    <p>{producto.precio_producto}</p>
                    <p>{producto.cuotas_producto}</p>
                    <p>{producto.cuotas_pagadas}</p>
                </div>
            ))}
        </div>
    )
}

export default Editar
