import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";

import { IncidenciasURL } from "../../API/apiurls";
import {
  deshabilitarElemento,
  habilitarElemento,
  useListarElementos,
} from "../../API/apiCRUD";
import { Link } from "react-router-dom";
import { LogoutToken } from "../../Hooks/logoutToken";

const rol = localStorage.getItem("rol");

export function IncidenciasTC({ url, tu }) {
  const [incidenciasSR, setIncidenciasSR] = useState([]);

  const token = localStorage.getItem("token");
  const ListarIncidenciasSR = useListarElementos(`${url}`);
  LogoutToken();

  useEffect(() => {
    const interval = setInterval(() => {
      ListarIncidenciasSR(setIncidenciasSR);
    }, 5000); 

    return () => {
      clearInterval(interval);
    };
  }, [ListarIncidenciasSR]); 
 


  const habilitar = (id) => {
    try {
      habilitarElemento(`${IncidenciasURL}`, id, "estado", ListarIncidenciasSR);
    } catch (error) {
      console.error("Error al habilitar la incidencia:", error);
      // Manejar el error aquí, por ejemplo, mostrar un mensaje de error al usuario
    }
  };

  const deshabilitar = (id) => {
    try {
      deshabilitarElemento(
        `${IncidenciasURL}`,
        id,
        "estado",
        ListarIncidenciasSR
      );
    } catch (error) {
      console.error("Error al deshabilitar la incidencia:", error);
      // Manejar el error aquí, por ejemplo, mostrar un mensaje de error al usuario
    }
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Dia</th>
            <th>Hora</th>
            <th>Incidencia</th>
            <th>Bateria</th>
            <th>Placa</th>
            <th>Conductor</th>
            <th>Estado</th>
            <th>Detalles</th>
          </tr>
        </thead>
        <tbody>
          {incidenciasSR.map((incidencia) => (
            <tr
              key={incidencia.id_inc}
              style={{
                color: "black",
                background: incidencia.prioridad ? "green" : "",
              }}
            >
              <td>{new Date(incidencia.dia).toLocaleDateString()}</td>
              <td>{incidencia.hora}</td>
              <td>{incidencia.nom_inc}</td>
              <td>{incidencia.bateriasModels.nom_bat}</td>
              <td>{incidencia.camionesModel.placa_cam}</td>
              <td>{`${incidencia.conductor.nom_tra} ${incidencia.conductor.ape_tra}`}</td>
              <td>{incidencia.estado ? "Revisada" : "No Revisada"}</td>
              <td>
                <Button>
                  <Link
                    to={`/incidenciasdetalles/${incidencia.id_inc}`}
                    className="linkes"
                  >
                    Ver detalles
                  </Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
