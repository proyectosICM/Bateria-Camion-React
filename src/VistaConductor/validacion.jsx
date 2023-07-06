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
  const [bateriaId, setBateriaId] = useState([]);
  const [baterias, setBaterias] = useState([]);

  const ListarCamion = useCallback(async () => {
    try {
      const response = await axios.get(`${camionxtrabajador}${id_tra}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCamion(response.data);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        // Token expirado, redirigir al inicio de sesión
        navigate("/login");
      } else {
        // Otro error, manejarlo adecuadamente
        console.error("Error al obtener los datos del camión:", error);
      }
    }
  }, [id_tra, token, navigate]);

  const ListIdBat = useCallback(async () => {
    try {
      if (camion.length > 0) {
        const results = await axios.get(
          `${bateriaxcamionURL}/${camion[0].id_cam}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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
        console.error("Error al obtener los datos de la batería:", error);
      }
    }
  }, [camion, token, navigate]);

  useEffect(() => {
    ListarCamion();

    if (camion.length > 0) {
      ListIdBat();
    }
  }, [camion, ListarCamion, ListIdBat]);
/*
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);
  */
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
