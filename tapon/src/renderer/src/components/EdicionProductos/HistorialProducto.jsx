import Titulos from '../Items/Titulos'
import BtnAtras from '../Items/botones/BtnAtras'
const HistorialProducto = ({ setOpcionSeleccionada, setOpcion }) => {
  return (
    <div className="pago__producto">
      <Titulos texto="Pago de producto" tipoDeColor="verde" />
      <BtnAtras cancelType={true} set1={setOpcionSeleccionada} set2={setOpcion} />
      <h2>esto es para pagar</h2>
    </div>
  )
}

export default HistorialProducto
