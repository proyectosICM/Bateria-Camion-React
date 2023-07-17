import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { bateriaxcamionURL, camionxtrabajador } from "../API/apiurls";
import { Link, useNavigate } from "react-router-dom";
import { NoAsignado } from "./noAsignado";
import { CamionDetalle } from "./../VistasComunes/camiondetalle";
import { LogoutToken, logoutToken } from "../Hooks/logoutToken";
import { useListarElementos } from "../API/apiCRUD";

export function Validacion() {
  const id_tra = localStorage.getItem("trabajador");
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const [camion, setCamion] = useState([]);
 

  const ListarCamion = useListarElementos(`${camionxtrabajador}${id_tra}`);

  useEffect(() => {
    ListarCamion(setCamion);
  }, [ListarCamion]);


  
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
