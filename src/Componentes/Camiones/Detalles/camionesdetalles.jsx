import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ContenedorTemperatura } from "../Graficos/Temperatura/contenedorTemperatura";
import { ContenedorBateria } from "../Graficos/Bateria/contenedorBateria";
import { BotonesG } from "./botonesG";
import { CamionesTabla } from "./camionesTabla";
import { ContenedorVoltaje } from "../Graficos/Voltaje/contenedorVoltaje";
import { BotonesT } from "./botonesT";
import { bateriaxcamionURL } from "../../../API/apiurls";
import { Card } from "react-bootstrap";
import { ContenedorCorriente } from "../Graficos/Corriente/contenedorCorriente";
import { Button, ButtonGroup } from "react-bootstrap";
import { BsEyeSlashFill } from 'react-icons/bs';

export function CamionesDetalles() {
  const [mostrarGrafico, setMostrarGrafico] = useState(true);
  const [graficoSeleccionado, setGraficoSeleccionado] = useState("voltaje");
  const [mostrarTabla, setMostrartabla] = useState(true);
  const [tablaSeleccionada, setTablaSeleccionada] = useState("bateria1");
  const { id } = useParams();
  const [datos, setDatos] = useState([]);
  const [baterias, setBaterias] = useState([]);
  const [idbat, setIdbat] = useState([]);

  const ListDatos = useCallback(async () => {
    const results = await axios.get(`http://localhost:8080/api/detalles/d/${id}`);
    setDatos(results.data);
  }, [id]);

  const ListarBaterias = useCallback(async () => {
    const results = await axios.get(`${bateriaxcamionURL}/${id}`);
    setBaterias(results.data);
  });

  const ListIdBat = useCallback(async () => {
    const results = await axios.get(`${bateriaxcamionURL}/${id}`);
    const idBatArray = results.data.map((item) => item.id_bat);
    setIdbat(idBatArray);
  }, [id]);


  useEffect(() => {
    ListDatos();
    ListarBaterias();
    ListIdBat();
  }, [ListDatos, ListarBaterias, ListIdBat]);

  console.log(idbat);
  const placa = datos.length > 0 ? datos[0][0] : "";

  const handleMostrarGrafico = (grafico) => {
    setGraficoSeleccionado(grafico);
    setMostrarGrafico(true);
  };

  const handleMostrarTabla = (tabla) => {
    setTablaSeleccionada(tabla);
    setMostrartabla(true);
  };

  return (
    <div className="contenedor-detalles">
      <Card style={{ width: "180rem" }}>
        <div className="orden">
          <Card.Header>
            <h1>DETALLES</h1>
            <h3>Placa {placa}</h3>
          </Card.Header>

          {mostrarTabla && (
            <div>
              {idbat.map((idBat, index) => (
                <div key={idBat}>
                  {tablaSeleccionada === `bateria${index + 1}` && (
                    <CamionesTabla
                      idb={idBat}
                      datbat={baterias[index]}
                      idc={id}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          <Card>
            <BotonesG handleMostrarGrafico={handleMostrarGrafico} />

            {mostrarGrafico && (
              <div className="graficos">
                {graficoSeleccionado === "voltaje" && (
                  <ContenedorVoltaje idc={id} />
                )}
                {graficoSeleccionado === "carga" && (
                  <ContenedorBateria idc={id} />
                )}
                {graficoSeleccionado === "corriente" && (
                  <ContenedorCorriente idc={id} />
                )}
                <Button>Ver Graficos detallados</Button>
                {/* Agrega más condiciones para otros gráficos */}
              </div>
            )}
          </Card>
        </div>
      </Card>
    </div>
  );
}
