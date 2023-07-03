import React, { useEffect, useState } from "react";
import { CamionDetalle } from './../VistaConductor/camiondetalle';
import { MenuCamion } from "../VistaSupervisor/menuCamion";
import { useNavigate } from "react-router-dom";

export function BarraNavValidacion() {
  const [nav, setNav] = useState();
  const rol = localStorage.getItem('rol');
  const navigate = useNavigate();

  useEffect(() => {
    let tempNav;
    switch (rol) {
      case "CONDUCTOR":
        tempNav = '/detalles';
        break;
      case "SUPERVISOR":
        tempNav = "/menuCamion";
        break;
      case "ADMINISTRADOR":
        tempNav = "Administrador";
        break;
      case "SISTEMAS":
        tempNav = "Sistemas";
        break;
      default:
        tempNav = '/';
        break;
    }
    setNav(tempNav);
  }, [rol]);

  useEffect(() => {
    if (nav) {
      navigate(nav);
    }
  }, [navigate, nav]);

  return (
    <>
      <h1>Redirigiendo</h1>
    </>
  );
}
