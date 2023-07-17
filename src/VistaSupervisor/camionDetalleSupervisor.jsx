import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { IncidenciasxCamionSR, bateriaxcamionURL, camionURL } from "../API/apiurls";
import { Button, Card } from "react-bootstrap";

import { Link, useNavigate, useParams } from "react-router-dom";

import { NavBarSupervisor } from "../VistaSupervisor/navbarSupervisor";
import { CamionDetalle } from "../VistasComunes/camiondetalle";
import { UserContext } from "../Hooks/userProvider";
import { NavBarConductor } from "../VistaConductor/navbarConductor";
import { NavBarAdministrador } from "../VistaAdministrador/navbarAdministrador";
import { NavBarSelect } from "../VistasComunes/navbarSelect";


export function CamionDetalleSupervisor() {
  const id_tra = localStorage.getItem("trabajador");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [camion, setCamion] = useState([]);
  const [bateriaId, setBateriaId] = useState([]);
  const [baterias, setBaterias] = useState([]);

  const { id } = useParams();

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`${camionURL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCamion(response.data);

      if (response.data.length > 0) {
        const results = await axios.get(`${bateriaxcamionURL}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const idBatArray = results.data.map((item) => item.id_bat);
        setBateriaId(idBatArray);
        setBaterias(results.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        // Token expirado, redirigir al inicio de sesión
        navigate("/login");
      } else {
        // Otro error, manejarlo adecuadamente
        console.error("Error al obtener los datos del camión:", error);
      }
    }
  }, [id, token, navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <> 
      <div className="camionesMenu-contenedor">

          <div className="orden">
            <CamionDetalle camion={camion} idc={id} placa={camion.placa_cam} incidencias={`/incidenciasxc/${camion.id_cam}`}/>
          </div>

      </div>
    </>
  );
}

