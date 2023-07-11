import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { bateriaxcamionURL, camionxtrabajador } from "../API/apiurls";
import { Link, useNavigate } from "react-router-dom";
import { NoAsignado } from "./noAsignado";
import { CamionDetalle } from "./../VistasComunes/camiondetalle";
import { LogoutToken, logoutToken } from "../Hooks/logoutToken";

export function Validacion() {
  const id_tra = localStorage.getItem("trabajador");
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const [camion, setCamion] = useState([]);


  const ListarCamion = useCallback(async () => {
    try {
      const response = await axios.get(`${camionxtrabajador}${id_tra}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCamion(response.data);
      //console.log(response.data[0].id_cam);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        // Token expirado, redirigir al inicio de sesión
        navigate("/login");
      } else {
        // Otro error, manejarlo adecuadamente
        console.error("Error al obtener los datos del camión p:", error);
      }
    }
    //console.log("No cargo");
  }, [id_tra, token, navigate]);

  useEffect(() => {
    ListarCamion();

  }, [camion, ListarCamion]);

LogoutToken();
  
  return (
    <>
      <div className="camionesMenu-contenedor">
          <div className="orden">
            {camion.length > 0 ? (
              <CamionDetalle
                camion={camion}
                placa={camion[0].placa_cam}
                idc={camion[0].id_cam}
                incidencias={"/incidencias"}
              />
            ) : (
              <NoAsignado />
            )}
          </div>
      </div>
    </>
  );
}
