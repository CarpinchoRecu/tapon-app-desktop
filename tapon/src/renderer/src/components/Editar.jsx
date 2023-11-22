import { FaRegArrowAltCircleLeft } from 'react-icons/fa'

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

  // Encontrar todos los productos con el mismo nombre, localidad y dirección del cliente seleccionado
  const productosCliente = datosOriginal.filter(
    (cliente) =>
      cliente.nombre.toLowerCase() === clienteSeleccionado.nombre.toLowerCase() &&
      cliente.localidad === clienteSeleccionado.localidad &&
      cliente.direccion === clienteSeleccionado.direccion
  )

    return (
        <div className="editar">
            <div onClick={handleCerrarEditor} className="btn__volver">
                <FaRegArrowAltCircleLeft/>
            </div>
            <table className="tabla__datos__cliente">
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Direccion</th>
                        <th>Localidad</th>
                    </tr>
                </thead>
                <tbody>
                            <tr>
                                <td>{clienteSeleccionado.nombre}</td>
                                <td>{clienteSeleccionado.direccion}</td>
                                <td>{clienteSeleccionado.localidad}</td>
                            </tr>
                </tbody>
            </table>
            <table className="tabla__datos__productos">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Precio Total</th>
                        <th>Cuotos Total</th>
                        <th>Cuotas Pagadas</th>
                        <th>Precio por cuota</th>
                        <th>Total Pagado</th>
                        <th>Falta Pagar</th>
                        <th>Cuotas Restantes</th>
                        <th>Fecha Ultimo Pago</th>
                    </tr>
                </thead>
                <tbody>
                    {productosCliente.map((producto, index) => {
                        const precioPorCuota = producto.precio_producto / producto.cuotas_producto;
                        const totalPagado = producto.cuotas_pagadas * precioPorCuota;
                        const faltaPagar = producto.precio_producto - totalPagado;
                        const faltaCuotas = producto.cuotas_producto - producto.cuotas_pagadas;

                        return (
                            <tr key={index}>
                                <td>{producto.nombre_producto}</td>
                                <td>{producto.precio_producto}</td>
                                <td>{producto.cuotas_producto}</td>
                                <td>{producto.cuotas_pagadas}</td>
                                <td>{precioPorCuota}</td>
                                <td>{totalPagado}</td>
                                <td>{faltaPagar}</td>
                                <td>{faltaCuotas}</td>
                                <td>{producto.fecha_ultimo_pago}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Editar
