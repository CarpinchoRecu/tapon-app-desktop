const Editar = ({ datosClienteSeleccionado }) => {
    return (
        <div className="editar">
            <h2>Editar Cliente</h2>
            {datosClienteSeleccionado && (
                <div>
                    <p>Nombre: {datosClienteSeleccionado.nombre}</p>
                    <p>Localidad: {datosClienteSeleccionado.localidad}</p>
                    {datosClienteSeleccionado.productos.map((producto, index) => (
                        <div key={index}>
                            <h3>Producto {index + 1}</h3>
                            <p>Nombre: {producto.nombreProducto}</p>
                            <p>Precio: {producto.precioProducto}</p>
                            <p>Cuotas: {producto.cuotasProducto}</p>
                            <p>Cuotas pagadas: {producto.cuotasPagadas}</p>
                            {/* Agregar campos adicionales para editar */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Editar;
