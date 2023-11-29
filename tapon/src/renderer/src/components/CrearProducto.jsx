import { useEffect, useContext, useState } from 'react';
import { IdContext } from '../context/IdContext.jsx';
import { useDatosContext } from '../context/DatosContextFile.jsx';
import { LuPlusCircle } from 'react-icons/lu';

const CrearProducto = () => {
    const idSeleccionado = useContext(IdContext);
    const datosOriginal = useDatosContext();
    const [mostrarCrear, setMostrarCrear] = useState(false);
    const [mostrarMenuCrear, setMostrarMenuCrear] = useState(false);

    // Encontrar el cliente correspondiente al idSeleccionado
    const clienteSeleccionado = datosOriginal.find((cliente) => cliente.id === idSeleccionado);

    useEffect(() => {
        if (clienteSeleccionado) {
            setMostrarCrear(true);
        } else{

            setMostrarCrear(false);
        }
        
    }, [clienteSeleccionado]);
    
    const handleAbrirMenuCrearProductos = () => {
        setMostrarMenuCrear(true)
    }

    return (
        <>
            {mostrarCrear && (
                <div onClick={handleAbrirMenuCrearProductos} className="btn__crear__producto">
                    <p>Crear Producto</p>
                    <LuPlusCircle />
                </div>
            )}
            {mostrarMenuCrear && (
                <>
                {clienteSeleccionado.nombre}
                </>
            )}
        </>
    );
};

export default CrearProducto;
