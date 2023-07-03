import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { IncidenciasURL } from "../../API/apiurls";
import {
  agregarElemento,
  editarElemento,
  habilitarElemento,
  deshabilitarElemento,
} from "../../API/apiCRUD";

const rol = localStorage.getItem("rol");

export function IncidenciasTC({ url, tu }) {
  const [incidenciasSR, setIncidenciasSR] = useState([]);

  const token = localStorage.getItem("token");

  const ListarIncidenciasSR = useCallback(async () => {
    try {
      const results = await axios.get(`${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIncidenciasSR(results.data);
    } catch (error) {
      console.error("Error al obtener las incidencias:", error);
      // Manejar el error aquí, por ejemplo, mostrar un mensaje de error al usuario
    }
  });

  useEffect(() => {
    ListarIncidenciasSR();
  }, [ListarIncidenciasSR, incidenciasSR]);

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
            <th>Voltaje</th>
            <th>Carga</th>
            <th>Corriente</th>
            <th>Estado</th>
            {rol !== "CONDUCTOR" && <th>Gestion</th>}
          </tr>
        </thead>
        <tbody>
          {incidenciasSR.map((incidencia) => (
            <tr key={incidencia.id_inc}>
              <td>22-06-2023</td>
              <td>{incidencia.hora}</td>
              <td>{incidencia.nom_inc}</td>
              <td>{incidencia.bateriasModels.nom_bat}</td>
              <td>{incidencia.camionesModel.placa_cam}</td>
              <td>{`${incidencia.trabajadoresModel.nom_tra} ${incidencia.trabajadoresModel.ape_tra}`}</td>
              <td>{incidencia.voltaje} v</td>
              <td>{incidencia.carga} %</td>
              <td>{incidencia.corriente} v</td>
              <td>{incidencia.estado ? "Revisada" : "No Revisada"}</td>
              {rol !== "CONDUCTOR" && (
                <td>
                  <Button
                    variant={incidencia.estado ? "primary" : "warning"}
                    onClick={() => {
                      try {
                        if (incidencia.estado) {
                          deshabilitar(incidencia.id_inc);
                        } else {
                          habilitar(incidencia.id_inc);
                        }
                      } catch (error) {
                        console.error("Error al cambiar el estado de la incidencia:", error);
                        // Manejar el error aquí, por ejemplo, mostrar un mensaje de error al usuario
                      }
                    }}
                  >
                    {incidencia.estado
                      ? "Marcar como no revisada"
                      : "Marcar como revisada"}
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
