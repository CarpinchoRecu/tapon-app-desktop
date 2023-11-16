import { useState, useEffect } from "react";

const Header = ({ datosHome, setDatosFiltrados }) => {
  const [filtroChivilcoy, setFiltroChivilcoy] = useState(false);
  const [filtroSuipacha, setFiltroSuipacha] = useState(false);

  useEffect(() => {
    const filtrarDatos = () => {
      if (!filtroChivilcoy && !filtroSuipacha) {
        // Si ambos filtros están desactivados, mostramos todos los datos
        setDatosFiltrados(datosHome);
      } else {
        // Aplicamos los filtros
        const datosFiltrados = datosHome.filter((dato) => {
          const localidad = dato.localidad.toLowerCase();
          if (filtroChivilcoy && localidad === 'chivilcoy') {
            return true;
          } else if (filtroSuipacha && localidad === 'suipacha') {
            return true;
          }
          return false;
        });
        setDatosFiltrados(datosFiltrados);
      }
    };

    filtrarDatos();
  }, [filtroChivilcoy, filtroSuipacha, datosHome, setDatosFiltrados]);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (name === 'chivilcoy') {
      setFiltroChivilcoy(checked);
    } else if (name === 'suipacha') {
      setFiltroSuipacha(checked);
    }
  };

  const filtros = [
    {
      nombreFiltro: 'chivilcoy',
      type: "checkbox",
      state: filtroChivilcoy
    },
    {
      nombreFiltro: 'suipacha',
      type: "checkbox",
      state: filtroSuipacha
    },
    {
      nombreFiltro: 'cantidad de pruductos',
      type: "number",
      state: null
    },
    {
      nombreFiltro: 'tiempo de pago',
      type: "date",
      state: null
    }
  ]

  return (
    <header>
      <section className="contenedor__buscador">
        <div className="buscador">
          <h2>Solo por nombre</h2>
          <input type="search" name="" id="" />
        </div>
      </section>
      <section className="contenedor__filtros">
        {filtros.map((filtro, index) => (
          <div key={index}>
            {filtro.type === 'checkbox' && (
              <label>
                <input
                  type="checkbox"
                  name={filtro.nombreFiltro}
                  checked={filtro.state}
                  onChange={handleCheckboxChange}
                />
                {filtro.nombreFiltro}
              </label>
            )}
            
          </div>
        ))}
      </section>
    </header>
  )
}

export default Header
