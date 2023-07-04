import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { IncidenciasURL, IncidenciasxEmpresaE } from "../../API/apiurls";
import {
  agregarElemento,
  editarElemento,
  habilitarElemento,
  deshabilitarElemento,
} from "../../API/apiCRUD" // Reemplaza 'tu_archivo_de_hooks' con el nombre real de tu archivo

export function IncidenciasTG({ est, url }) {
  const [incidenciasSR, setIncidenciasSR] = useState([]);
  const token = localStorage.getItem('token');

  const ListarIncidenciasSR = useCallback(async () => {
    const results = await axios.get(`${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setIncidenciasSR(results.data);
  }, [est]);

  useEffect(() => {
    ListarIncidenciasSR();
  }, [ListarIncidenciasSR, incidenciasSR]);

  const habilitar = (id) => {
    habilitarElemento(`${IncidenciasURL}`, id, "estado", ListarIncidenciasSR, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const deshabilitar = (id) => {
    deshabilitarElemento(`${IncidenciasURL}`, id, "estado", ListarIncidenciasSR, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
            <th>Gestion</th>
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
              <td>
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
                  {incidencia.estado ? "Marcar como no revisada" : "Marcar como revisada"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
