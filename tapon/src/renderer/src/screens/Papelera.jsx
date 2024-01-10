import Overlay from '../components/Items/Overlay/Overlay'
import Titulos from '../components/Items/Titulos'
import Menus from '../components/Items/Menus'
import BtnAtras from '../components/Items/botones/BtnAtras'

const HistorialEliminados = ({ datosEliminados, setPapelera }) => {
  console.log(datosEliminados)
  return (
    <Menus>
      <Titulos tipoDeColor="rojo" texto="Historial Eliminados" />
      <BtnAtras set1={setPapelera} cancelType={true} />
      <section className="pepelera">
        <div className="datos__eliminar">
          <p>Datos del Cliente</p>
          <table className="tabla__datos__cliente">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Direccion</th>
                <th>Localidad</th>
                <th>Cantidad de Productos</th>
              </tr>
            </thead>
            <tbody>
              {datosEliminados.map((eliminado, index) => (
                <tr key={index}>
                  <td>{eliminado.nombre}</td>
                  <td>{eliminado.direccion}</td>
                  <td>{eliminado.localidad}</td>
                  <td>{eliminado.cantidadProductos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Menus>
  )
}

export default HistorialEliminados
