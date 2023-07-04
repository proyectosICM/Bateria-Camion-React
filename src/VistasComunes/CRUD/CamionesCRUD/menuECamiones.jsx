import React, { useEffect } from "react";
import { MenuEmpresas } from "../../../Componentes/Common/menuEmpresas";
import { useNavigate } from "react-router-dom";

export function MenuECamiones() {
  const navigate = useNavigate();
  const rol = localStorage.getItem("rol");
  const empresa = localStorage.getItem("empresa");

  useEffect(() => {
    if (rol === "ADMINISTRADOR") {
      navigate(`/camionesxemp/${empresa}`);
    }
  }, []); // El segundo argumento [] indica que el efecto se ejecutará solo una vez, después del montaje inicial

  return (
    <div>
      <MenuEmpresas ruta="/camionesxemp" />
    </div>
  );
}
