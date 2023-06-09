import React, { useCallback, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";
import { InfoTReal } from "./infoReal";
import { bateriaxcamionURL } from "../API/apiurls";

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
  const ListarBaterias = useCallback(async () => {
    try {
      const results = await axios.get(`${bateriaxcamionURL}/${idcam}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBaterias(results.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Token expirado, redirigir al inicio de sesión
        navigate('/login');
      } else {
        // Otro error, manejarlo adecuadamente
        console.error("Error al obtener los datos de las baterías:", error);
      }
    } 
  });
  
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