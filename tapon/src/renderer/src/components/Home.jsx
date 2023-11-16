import React, { useEffect, useState } from 'react';

const Home = () => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const selectDB = await window.electronAPI.consultarSQLite('SELECT * FROM clientes');
        const sin = "Sin Completar";
        const selectValidacion = selectDB.map((dato) => {
          const datoValidado = {};
          for (const campo in dato) {
            datoValidado[campo] = dato[campo] || sin;
          }
          return datoValidado;
        });
        setDatos(selectValidacion);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    obtenerDatos();
  }, []);

  return (
    <>
      {datos.map((dato, index) => (
        <div key={index}>
          <p>Nombre: {dato.nombre}</p>
          <p>Dirección: {dato.direccion}</p>
        </div>
      ))}
    </>
  );
};

export default Home;
