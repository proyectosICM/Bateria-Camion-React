import React, { useContext, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { IncidenciasxCamionR, IncidenciasxCamionSR, IncidenciasxEmpresaR, IncidenciasxEmpresaSR } from "../API/apiurls";
import { NavBarConductor } from "./navbarConductor";
import { IncidenciasTC } from "../VistasComunes/Incidencias/incidenciasTC";
import { NavBarSupervisor } from "../VistaSupervisor/navbarSupervisor";
import { UserContext } from "../Hooks/userProvider";
import { IncidenciasTG } from "../Componentes/Incidencias/incidenciasTG";

export function IncidenciasCamion() {
  const { userRole, setUserRole } = useContext(UserContext);
  const [mostarGenerales, setMostarGenerales] = useState(false);

  const camionId = localStorage.getItem("camion");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [nav, setNav] = useState(null);
  const [rolu, setRolu] = useState(null);
  const { id_cam, g } = useParams();
  let idc;
  let t;
  if (id_cam !== undefined) {
    idc = id_cam;
  } else {
    idc = camionId;
  }

  const empresa = localStorage.getItem('empresa');

  const sr = `${IncidenciasxCamionSR}${idc}`;
  const r = `${IncidenciasxCamionR}${idc}`;

  const gsr= `${IncidenciasxEmpresaSR}${empresa}`;
  const gr= `${IncidenciasxEmpresaR}${empresa}`;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (userRole === "CONDUCTOR") {
      setNav(<NavBarConductor />);
    } else if (userRole === "SUPERVISOR") {
      setNav(<NavBarSupervisor />);
    }

    setUserRole(localStorage.getItem("rol"));
  }, []);


  useEffect(() => {
    if (g === "g" && userRole !== "CONDUCTOR") {
      setMostarGenerales(true);
    }
    setMostarGenerales(false)
  }, [id_cam, userRole]);

  return (
    <>
      {nav}
      <div className="contenedor-detalles">
        <Card style={{ width: "180rem" }}>
          <Card.Title>
            PANEL DE INCIDENCIAS {id_cam} {g} {userRole}
          </Card.Title>
          <Card.Body>
            {userRole === "CONDUCTOR" ? (
              <>
                <h2>Incidencias sin revisar</h2>
                <IncidenciasTC url={sr} />

                <h2>Registro de incidencias</h2>
                <IncidenciasTC url={r} />
              </>
            ) : mostarGenerales === true ? (
              <>
                <h2>Incidencias sin revisar</h2>
                <IncidenciasTG url={gsr} />

                <h2>Registro de incidencias</h2>
                <IncidenciasTG url={gr} />
              </>
            ) : (
              <>
                <h2>Incidencias sin revisar</h2>
                <IncidenciasTG url={sr} />

                <h2>Registro de incidencias</h2>
                <IncidenciasTG url={r} />
              </>
            )}
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
