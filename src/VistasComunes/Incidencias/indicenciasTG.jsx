import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { IncidenciasURL, IncidenciasxEmpresaE } from "../../API/apiurls";
import {
  agregarElemento,
  editarElemento,
  habilitarElemento,
  deshabilitarElemento,
  editarElementoSM,
  habilitarElemento2,
} from "../../API/apiCRUD"; // Reemplaza 'tu_archivo_de_hooks' con el nombre real de tu archivo
import { LogoutToken } from "../../Hooks/logoutToken";
import { Link } from "react-router-dom";

export function IncidenciasTG({ est, url }) {
  LogoutToken();
  const [incidenciasSR, setIncidenciasSR] = useState([]);
  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("rol");

  const ListarIncidenciasSR = useCallback(async () => {
    try {
      const results = await axios.get(`${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIncidenciasSR(results.data);
      //console.log(results.data);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        // Token expirado, redirigir al inicio de sesión
        //navigate("/login");
      } else {
        // Otro error, manejarlo adecuadamente
        console.error("Error al obtener los datos del camión:", error);
      }
    }
  }, [est]);

  useEffect(() => {
    ListarIncidenciasSR();
  }, [ListarIncidenciasSR, incidenciasSR]);

  const trabajador = localStorage.getItem("trabajador");

  const habilitar = (id) => {
    //habilitarElemento(`${IncidenciasURL}`, id, "estado", ListarIncidenciasSR);
    const requestData = {
      revisadoBy: {
        id_tra: trabajador,
      },
      estado: true,
      prioridad: false,
    };
    editarElementoSM(
      `${IncidenciasURL}/${id}`,
      requestData,
      ListarIncidenciasSR
    );
  };

  const deshabilitar = (id) => {
    deshabilitarElemento(
      `${IncidenciasURL}`,
      id,
      "estado",
      ListarIncidenciasSR
    );
  };

  const sRevision = (id) => {
    habilitarElemento(
      `${IncidenciasURL}`,
      id,
      "prioridad",
      ListarIncidenciasSR
    );
  };

  const qsRevision = (id) => {
    deshabilitarElemento(
      `${IncidenciasURL}`,
      id,
      "prioridad",
      ListarIncidenciasSR
    );
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
            <th>Gestion</th>
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
              <td>22-06-2023</td>
              <td>{incidencia.hora}</td>
              <td>{incidencia.nom_inc}</td>
              <td>{incidencia.bateriasModels.nom_bat}</td>
              <td>{incidencia.camionesModel.placa_cam}</td>
              <td>{`${incidencia.conductor.nom_tra} ${incidencia.conductor.ape_tra}`}</td>
              <td>
                {incidencia.estado
                  ? "Revisada"
                  : "No Revisada"}
              </td>
              <td>
                {rol != "SUPERVISOR" && (
                  <Button
                    variant={incidencia.prioridad ? "primary" : "warning"}
                    onClick={() => {
                      if (incidencia.prioridad) {
                        qsRevision(incidencia.id_inc);
                      } else {
                        sRevision(incidencia.id_inc);
                      }
                    }}
                  >
                    {incidencia.prioridad ? "No Priorizar " : "Priorizar "}
                  </Button>
                )}
                <Button
                  variant={incidencia.estado ? "primary" : "warning"}
                  onClick={() => {
                    if (incidencia.estado) {
                      deshabilitar(incidencia.id_inc);
                    } else {
                      habilitar(incidencia.id_inc);
                    }
                  }}
                >
                  {incidencia.estado
                    ? "Marcar como no revisada"
                    : "Marcar como revisada"}
                </Button>
              </td>
              <td>
                <Button>
                  <Link to={`/incidenciasdetalles/${incidencia.id_inc}`} className="linkes">Ver detalles</Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
