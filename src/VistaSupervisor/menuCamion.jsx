import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { NavBarSupervisor } from "./navbarSupervisor";
import axios from "axios";
import { camionesHURL } from "../API/apiurls";
import { CamionesItem } from "./camionesItem";
import { UserContext } from "../Hooks/userProvider";
import { NavBarConductor } from "../VistaConductor/navbarConductor";
import { NavBarAdministrador } from "../VistaAdministrador/navbarAdministrador";
import { NavBarSelect } from "../VistasComunes/navbarSelect";

export function MenuCamion() {
  const navigate = useNavigate();

  const [datos, setDatos] = useState([]);

  const empresa = localStorage.getItem("empresa");
  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("rol");

  const ListDatos = async () => {
    const results = await axios.get(`${camionesHURL}${empresa}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setDatos(results.data);
  };

  useEffect(() => {
    ListDatos();
  }, []);

  return (
    <>
      <div className="camionesMenu-contenedor">
          {datos.map((dato) => (
            <CamionesItem
              key={dato.id_cam}
              id={dato.id_cam}
              placa={dato.placa_cam}
            />
          ))}
      </div>
    </>
  );
}
