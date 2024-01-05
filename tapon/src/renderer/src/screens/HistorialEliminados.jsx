const HistorialEliminados = ({ datosEliminados }) => {
  console.log(datosEliminados)
  return (
    <div className="historial">
      {datosEliminados.map((eliminado, index) => (
        <div key={index}>
          <p>{eliminado.nombre}</p>
          <p>{eliminado.direccion}</p> {/* Accede a la propiedad que deseas mostrar */}
        </div>
      ))}
    </div>
  )
}

export default HistorialEliminados
