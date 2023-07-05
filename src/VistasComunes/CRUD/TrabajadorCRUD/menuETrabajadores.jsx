import React, { useEffect } from "react";
import { MenuEmpresas } from "../../../Common/menuEmpresas";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { BotonMenu } from "../../../Hooks/useBackCRUD";

export function MenuETrabajadoresE() {
  const navigate = useNavigate();
  const rol = localStorage.getItem("rol");
  const empresa = localStorage.getItem("empresa");

  useEffect(() => {
    if (rol === "ADMINISTRADOR") {
      navigate(`/trabajadoresxemp/${empresa}`);
    }
  }, []); // El segundo argumento [] indica que el efecto se ejecutará solo una vez, después del montaje inicial

  return (
    <div className="camionesMenu-contenedor">
      <BotonMenu />
      <MenuEmpresas ruta="/trabajadoresxemp" />
    </div>
  );
}
