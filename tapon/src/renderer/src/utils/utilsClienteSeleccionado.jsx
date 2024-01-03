export function ClienteSeleccionado(datos, idCliente) {
  // Encontrar el cliente correspondiente al idSeleccionado
  const cliente = datos.find((cliente) => cliente.id === idCliente)

  if (!cliente) {
    return <p>Cliente no encontrado</p>
  }

  return cliente
}
