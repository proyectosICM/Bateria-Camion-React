import React, { useCallback, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";


import { InfoTReal } from "./infoReal";
import { bateriaxcamionURL } from "../API/apiurls";
import { useListarElementosEdit } from "../API/apiCRUD";

export function CamionesTabla({ idb, datbat, idc }) {
  const { id } = useParams();
  const [datos, setDatos] = useState([]);
  const [baterias, setBaterias] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const rol = localStorage.getItem('rol');

  let idcam;

  if (rol != "CONDUCTOR") {
    idcam = id;
  } else {
    idcam = idc;
  }

  const ListarBaterias = useListarElementosEdit(`${bateriaxcamionURL}/${idcam}`, setBaterias )
  
  useEffect(() => {
    ListarBaterias();
  }, [ListarBaterias]);
  


  return (
    <div>
      <Card>
        <div style={{ display: "flex" }}>
          <Card style={{ width: '180rem' }}>
            <Card.Title>Registro en tiempo real bateria</Card.Title>
            {baterias.map((bateria, index) => (
              <div style={{ display: "flex" }} key={bateria.id_bat}>
                <InfoTReal titulo={`Bateria ${index + 1}`} valor={`${bateria.nom_bat}`} />
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