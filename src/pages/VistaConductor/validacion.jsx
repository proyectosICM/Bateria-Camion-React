import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { bateriaxcamionURL, camionxtrabajador } from "../API/apiurls";
import { Link, useNavigate } from "react-router-dom";
import { NoAsignado } from "./noAsignado";
import { CamionDetalle } from "./../VistasComunes/camiondetalle";
import { LogoutToken, logoutToken } from "../Hooks/logoutToken";
import { useListarElementos } from "../Hooks/CRUDHooks";


export function Validacion() {
  const id_tra = localStorage.getItem("trabajador");
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const [camion, setCamion] = useState([]);
 
 
useListarElementos(`${camionxtrabajador}${id_tra}`, camion, setCamion);

useEffect(() => {
  if(camion){
    localStorage.setItem("camionid", camion.id_cam)
  }
})


  
  return (
    <>
      <div className="camionesMenu-contenedor">
          <div className="orden">
            {camion.trabajadoresModel ? (
              <CamionDetalle
                camion={camion}
                placa={camion.placa_cam ? camion.placa_cam : "NO"}
                idc={camion.id_cam}
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
