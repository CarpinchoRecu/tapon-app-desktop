export function calcularUltimoPago(ultimoPago, CadaCuantoPaga) {
  const partesFecha = ultimoPago.split('-')
  const fechaEnDate = new Date(partesFecha[0], partesFecha[1] - 1, partesFecha[2])
  const fechaMasFechaPactada = new Date(
    fechaEnDate.getFullYear(),
    fechaEnDate.getMonth(),
    fechaEnDate.getDate() + CadaCuantoPaga
  )
  const nuevoAño = fechaMasFechaPactada.getFullYear()
  const nuevoMes = String(fechaMasFechaPactada.getMonth() + 1).padStart(2, '0')
  const nuevoDia = String(fechaMasFechaPactada.getDate()).padStart(2, '0')
  const fechaProximoPago = `${nuevoAño}-${nuevoMes}-${nuevoDia}`

  return fechaProximoPago
}
