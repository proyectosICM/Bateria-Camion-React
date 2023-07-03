import { useState, useCallback } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { bateriaxcamionURL } from "../API/apiurls";

export function useListIdBat(idc, token) {
  const [idbat, setIdbat] = useState([]);
  const navigate = useNavigate();

  const ListIdBat = useCallback(async () => {
    try {
      const results = await axios.get(`${bateriaxcamionURL}/${idc}`, {
        headers: { 
          Authorization: `Bearer ${token}`,
        },
      });
      //console.log("listado");
      const idBatArray = results.data.map((item) => item.id_bat);
      setIdbat(idBatArray);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        // Token expirado, redirigir al inicio de sesión
        navigate('/login');
      } else {
        // Otro error, manejarlo adecuadamente
        console.error("Error al obtener los datos de las baterías:", error);
      }
    }
  }, [idc, token, navigate]);

  return { idbat, ListIdBat };
}
