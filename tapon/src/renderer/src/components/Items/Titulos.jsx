const Titulos = ({ tipoDeColor, texto }) => {
    return (
        <h2 className="title" tipoDeColor={tipoDeColor}>
            {texto}
        </h2>
    )
}

export default Titulos
