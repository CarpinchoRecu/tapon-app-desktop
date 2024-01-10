export function ClienteAgrupado(datosOriginal, eliminados ) {
  const clienteAgrupado = datosOriginal.reduce((acumulador, dato) => {
    const sinCompletar = 'Sin Completar'
    const nombreMinusculas = dato.nombre.toLowerCase()
    const localidad = dato.localidad || sinCompletar
    const direccion = dato.direccion || sinCompletar
    const clave = `${nombreMinusculas}-${localidad}-${direccion}`
    const indiceExistente = acumulador.findIndex((elem) => elem.clave === clave)

    if (indiceExistente !== -1 && dato.eliminado === eliminados) {
      acumulador[indiceExistente].cantidadProductos++
    } else if (indiceExistente === -1 && dato.eliminado === eliminados) {
      acumulador.push({
        id: dato.id,
        eliminado: dato.eliminado,
        clave: clave,
        cantidadProductos: 1,
        nombre: nombreMinusculas,
        localidad: localidad,
        direccion: direccion,
        nombreProducto: dato.nombre_producto || sinCompletar,
        precioProducto: dato.precio_producto || sinCompletar,
        cuotasProducto: dato.cuotas_producto || sinCompletar,
        cuotasPagadas: dato.cuotas_pagadas || sinCompletar
      })
    }
    return acumulador
  }, [])

  return clienteAgrupado
}
