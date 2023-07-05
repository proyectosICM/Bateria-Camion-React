import React, { useEffect } from "react";
import { MenuEmpresas } from "../../../Common/menuEmpresas";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

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
      <Button>Atras</Button>
      <MenuEmpresas ruta="/trabajadoresxemp" />
    </div>
  );
}
