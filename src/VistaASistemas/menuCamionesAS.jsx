import React, { useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { BotonMenu } from "../Hooks/useBackCRUD";
import { MenuEmpresas } from "../Common/menuEmpresas";
import { Button } from "react-bootstrap";

export function MenuCamionesAS() {
  const navigate = useNavigate();
  const rol = localStorage.getItem("rol");
  const empresa = localStorage.getItem("empresa");

  useEffect(() => {
    if (rol === "SUPERVISOR" || rol === "ADMINISTRADOR") {
      navigate(`/menuCamion/${empresa}`);
    } else if (rol === "CONDUCTOR"){
        const camionid = localStorage.getItem("camionid");
        navigate(`/`);
    }
  }, []); // El segundo argumento [] indica que el efecto se ejecutará solo una vez, después del montaje inicial

  return (
    <div className="camionesMenu-contenedor">
      <MenuEmpresas ruta="/menuCamion" />
    </div>
  );
}
