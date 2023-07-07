import React, { useEffect, useState } from "react";

import { MenuCamion } from "../VistaSupervisor/menuCamion";
import { useNavigate } from "react-router-dom";

export function Redirect() {
  const [nav, setNav] = useState();
  const rol = localStorage.getItem('rol');
  const navigate = useNavigate();
  const empresa = localStorage.getItem('empresa');
 
  useEffect(() => {
    let tempNav;
    switch (rol) {
      case "CONDUCTOR":
        tempNav = '/detalles';
        break;
      case "SUPERVISOR":
        tempNav = `/menuCamion/${empresa}`;
        break;
      case "ADMINISTRADOR":
        tempNav = "/welcomeAdd";
        break;
      case "SISTEMAS":
        tempNav = "/welcomeasis";
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
