import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { MenuEmpresas } from "../../../Common/menuEmpresas";

export function MenuEBaterias() {
  const navigate = useNavigate();
  const rol = localStorage.getItem("rol");
  const empresa = localStorage.getItem("empresa");

  useEffect(() => {
    if (rol === "ADMINISTRADOR") {
      navigate(`/bateriasxemp/${empresa}`);
    }
  }, []); // El segundo argumento [] indica que el efecto se ejecutará solo una vez, después del montaje inicial

  return (
    <div className="camionesMenu-contenedor">
      <MenuEmpresas ruta="/bateriasxemp" />
    </div>
  );
}
