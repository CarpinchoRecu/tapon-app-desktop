const BtnFuncion = ({ funcion, texto, tipoDeColor }) => {
  return (
    <div tipoDeColor={tipoDeColor} className="btn__funcion" onClick={funcion}>
      <p>{texto}</p>
    </div>
  )
}

export default BtnFuncion
