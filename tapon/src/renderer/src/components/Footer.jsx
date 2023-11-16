const Footer = ({tocarCliente}) => {

    return (
        <footer className={tocarCliente === true ? "clienteToco" : "footer"}>
            <section>
                <p>Editar</p>
            </section>
        </footer>
    )
}

export default Footer