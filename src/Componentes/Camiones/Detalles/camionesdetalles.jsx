import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BotonesG } from "./botonesG";
import { CamionesTabla } from "./camionesTabla";
import { IncidenciasxCamionSR, bateriaxcamionURL, regisbat } from "../../../API/apiurls";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";

 
export function CamionesDetalles() {
  const [mostrarGrafico, setMostrarGrafico] = useState(true);
  const [graficoSeleccionado, setGraficoSeleccionado] = useState("voltaje");
  const [mostrarTabla, setMostrartabla] = useState(true);
  const [tablaSeleccionada, setTablaSeleccionada] = useState("bateria1");
  //const { id } = useParams();
  const id = localStorage.getItem('empresa');
  const token = localStorage.getItem('token');

  const [datos, setDatos] = useState([]);
  const [baterias, setBaterias] = useState([]);
  const [idbat, setIdbat] = useState([]);

  const [incidenciasSR, setIncidenciasSR] = useState([]);
 
  const url = `${IncidenciasxCamionSR}${id}`;

  const ListarIncidenciasSR = useCallback(async () => {
      const results = await axios.get(`${url}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setIncidenciasSR(results.data);
  });

  const ListDatos = useCallback(async () => {
    const results = await axios.get(`${regisbat}${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setDatos(results.data);
  }, [id]);

  const ListarBaterias = useCallback(async () => {
    const results = await axios.get(`${bateriaxcamionURL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setBaterias(results.data);
  });

  const ListIdBat = useCallback(async () => {
    const results = await axios.get(`${bateriaxcamionURL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    const idBatArray = results.data.map((item) => item.id_bat);
    setIdbat(idBatArray);
  }, [id]);


  useEffect(() => {
    ListDatos();
    ListarBaterias();
    ListIdBat();
    ListarIncidenciasSR();
  }, [ListDatos, ListarBaterias, ListIdBat, ListarIncidenciasSR]);

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
                    <></>
                  )}
                </div>
              ))}
            </div> 
          )}  
                 <CamionesTabla
                      idc={id}
                    />
          <h1>Incidencias sin revisar: {incidenciasSR.length}</h1>
          <Button><Link className="linkes" to={`/incidenciasxctrabajador/${"t"}/${id}`}>Ver Registro Incidencias</Link></Button>

          <Card>
            <BotonesG handleMostrarGrafico={handleMostrarGrafico} />

            {/*mostrarGrafico && (
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
     
              </div>
            )*/}
          </Card>
        </div>
      </Card>
    </div>
  );
}
