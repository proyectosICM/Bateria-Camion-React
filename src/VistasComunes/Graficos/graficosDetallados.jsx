import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { NoAutorizado } from "../noAutorizado";
import { useParams } from "react-router-dom";
import { useNotAuthorized } from "../../Hooks/useNotAuthorized";
import { useListarElementos } from "../../API/apiCRUD";
import { bateriaxcamionURL } from "../../API/apiurls";
import { BotonesG } from "./../../Common/botonesG";
import { useNavigate } from "react-router-dom";
import { GraficosFiltrados } from "./graficoFiltrados";

export function GraficosDetallados() {
  const { id_cam } = useParams();
  useNotAuthorized(id_cam);

  const [datos, setDatos] = useState([]);
  const [mostrarGrafico, setMostrarGrafico] = useState(true);
  const [graficoSeleccionado, setGraficoSeleccionado] = useState("voltaje");

  const ListarBaterias = useListarElementos(
    `${bateriaxcamionURL}/${id_cam}`,
    setDatos
  );

  useEffect(() => {
    ListarBaterias();
  }, [ListarBaterias]);

  const idBaterias = datos.map((bateria) => bateria.id_bat);

  //console.log(idBaterias);

  const navigate = useNavigate();
  const rol = localStorage.getItem("rol");
  function HandleBack() {
    if (rol === "CONDUCTOR") {
      navigate("/detalles");
    } else {
      navigate(`/detallesc/${id_cam}`);
    }
  }

  const handleMostrarGrafico = (grafico) => {
    setGraficoSeleccionado(grafico);
    setMostrarGrafico(true);
  };

  return (
    <div className="camionesMenu-contenedor">
      {/*idBaterias.map((idb, index) => (
        <div key={idb}>
          <Button>Bateria {index + 1}</Button>
        </div>
      ))*/}

      <div className="orden">
        <Button onClick={HandleBack}>Atras</Button>
        <BotonesG handleMostrarGrafico={handleMostrarGrafico} />
        {mostrarGrafico && (
          <div className="graficos">
            {graficoSeleccionado === "voltaje" && (
              <>
                <h1>Voltaje</h1>
                <GraficosFiltrados idc={id_cam} g={"v"} />
              </>
            )}
            {graficoSeleccionado === "carga" && (
              <>
                <h1>Carga</h1>
                <GraficosFiltrados idc={id_cam} g={"c"} />
              </>
            )}
            {graficoSeleccionado === "corriente" && (
              <>
                <h1>Corriente</h1>
                <GraficosFiltrados idc={id_cam} g={"cv"} />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
