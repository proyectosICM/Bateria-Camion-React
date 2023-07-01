import React, { useCallback, useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { InfoTReal } from "../Modulos/InfoTReal";
import { bateria1URL, bateriaxcamionURL, camionURL } from "../../../API/apiurls";
import axios from "axios";

export function CamionesTabla({ idb, datbat, idc }) {
  const { id } = useParams();
  const [datos, setDatos] = useState([]);

  const token = localStorage.getItem('token');

  const [baterias, setBaterias] = useState([]);

  const url = `${bateria1URL}/${idc}/${idb}`;

  /*const ListDatos = useCallback(async () => {
    const results = await axios.get(`${url}`, {
      headers: {
          Authorization: `Bearer ${token}`
      }
  });
    setDatos(results.data);
    //console.log(datos);
  }); */

  const ListarBaterias = useCallback(async () => {
    const results = await axios.get(`${bateriaxcamionURL}/${idc}`, {
      headers: {
          Authorization: `Bearer ${token}`
      }
  });
    setBaterias(results.data);
  });

  useEffect(() => {
    //ListDatos();
    ListarBaterias();
  }, [ ListarBaterias]);
  console.log(baterias);
  return (
    <div> 
      <Card>
          <div style={{ display: "flex" }}>
            <Card style={{ width: '180rem' }}>
              <Card.Title>Registro en tiempo real bateria</Card.Title>
              {baterias.map((bateria, index) => (
              <div style={{ display: "flex" }} key={bateria.id_bat}>
                <InfoTReal titulo={`Bateria ${index + 1}`} valor={`Nombre ${bateria.nom_bat}`} />
                <InfoTReal titulo={"Voltaje"} valor={`${bateria.voltaje} v `} />
                <InfoTReal titulo={"Carga"} valor={`${bateria.carga} %`} />
                <InfoTReal titulo={"Corriente"} valor={`${bateria.corriente} v`} />
              </div>
                      ))}
            </Card>
          </div>

      </Card>
    </div>
  );
}