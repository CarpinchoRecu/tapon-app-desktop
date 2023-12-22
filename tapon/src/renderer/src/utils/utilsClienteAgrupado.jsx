export function ClienteAgrupado(datosOriginal) {
    const clienteAgrupado = datosOriginal.reduce((acumulador, dato) => {
        const sinCompletar = 'Sin Completar'
        const nombreMinusculas = dato.nombre.toLowerCase()
        const localidad = dato.localidad || sinCompletar
        const direccion = dato.direccion || sinCompletar
        const clave = `${nombreMinusculas}-${localidad}-${direccion}`
        const indiceExistente = acumulador.findIndex((elem) => elem.clave === clave)

        if (indiceExistente !== -1) {
            acumulador[indiceExistente].cantidadProductos++
            if (dato.eliminado === 1) {
                acumulador[indiceExistente].eliminado = 1
            }
        } else {
            acumulador.push({
                id: dato.id,
                nombre: nombreMinusculas,
                localidad: localidad,
                direccion: direccion,
                nombreProducto: dato.nombre_producto || sinCompletar,
                precioProducto: dato.precio_producto || sinCompletar,
                cuotasProducto: dato.cuotas_producto || sinCompletar,
                cuotasPagadas: dato.cuotas_pagadas || sinCompletar,
                cantidadProductos: 1,
                clave: clave,
                eliminado: dato.eliminado
            })
        }
        return acumulador
    }, [])

    return clienteAgrupado
}
