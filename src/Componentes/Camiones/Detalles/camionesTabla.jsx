import React, { useCallback, useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { InfoTReal } from "../Modulos/InfoTReal";
import { camionURL } from "../../../API/apiurls";
import axios from "axios";

export function CamionesTabla({ url, datbat }) {
  const { id } = useParams();
  const [datos, setDatos] = useState([]);

  const ListDatos = useCallback(async () => {
    const results = await axios.get(`${url}`);
    setDatos(results.data);
    //console.log(datos);
  });

  useEffect(() => {
    ListDatos();
  }, [ListDatos]);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <Card style={{ width: '180rem' }}>
          <Card.Title>Registro en tiempo real</Card.Title>
          {datbat?.voltaje && datbat?.carga && datbat?.corriente && (
            <div style={{ display: "flex" }}>
              <InfoTReal titulo={"Voltaje"} valor={`${datbat.voltaje} v `} />
              <InfoTReal titulo={"Carga"} valor={`${datbat.carga} %`} />
              <InfoTReal titulo={"Corriente"} valor={`${datbat.corriente} v`} />
            </div>
          )}
        </Card>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Dia</th>
            <th>Hora</th>
            <th>Voltaje</th>
            <th>Carga</th>
            <th>Corriente</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((dato) => {
            const timestamp = dato.dia;
            const date = new Date(timestamp);
            const fechaLegible = date.toLocaleDateString();
            return (
              <tr key={dato.id_dc}>
                <td>{fechaLegible}</td>
                <td>{dato.hora}</td>
                <td>{dato.voltaje} v</td>
                <td>{dato.carga} %</td>
                <td>{dato.temperatura} v</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
