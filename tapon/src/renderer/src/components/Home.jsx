import { useEffect, useState } from 'react';

const Home = () => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const selectDB = () => {
      window.electron.ipcRenderer.send('consulta-db', 'SELECT * FROM clientes');

      window.electron.ipcRenderer.on('resultado-db', (event, data) => {
        console.log(data)
        if (data && data.error) {
          console.error(data.error);
        } else {
          setDatos(data.rows);
        }
      });
    };

    selectDB();

    return () => {
      window.electron.ipcRenderer.removeAllListeners('resultado-db');
    };
  }, []);

  return (
    <>
      {datos.map((dato) => (
        <div key={dato.id}>
          <p>{dato.nombre}</p>
        </div>
      ))}
      hola
    </>
  );
};

export default Home;
