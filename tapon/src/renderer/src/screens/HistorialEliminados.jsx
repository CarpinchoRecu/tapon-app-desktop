const HistorialEliminados = ({ datosEliminados }) => {
  console.log(datosEliminados); // Asegúrate de que datosEliminados sea un array o contiene los datos que esperas

  return (
    <div className="historial">
      {datosEliminados.map((eliminado, index) => (
        <div key={index}>
          <p>{eliminado.nombre}</p> {/* Accede a la propiedad que deseas mostrar */}
          <p>{eliminado.direccion}</p> {/* Accede a la propiedad que deseas mostrar */}
        </div>
      ))}
    </div>
  );
};

export default HistorialEliminados;
