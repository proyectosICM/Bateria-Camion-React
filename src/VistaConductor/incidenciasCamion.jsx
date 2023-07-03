import React, { useContext, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { IncidenciasxCamionR, IncidenciasxCamionSR } from "../API/apiurls";
import { NavBarConductor } from "./navbarConductor";
import { IncidenciasTC } from "../VistasComunes/Incidencias/incidenciasTC";
import { NavBarSupervisor } from "../VistaSupervisor/navbarSupervisor";
import { UserContext } from "../Hooks/userProvider";
import { IncidenciasTG } from "../Componentes/Incidencias/incidenciasTG";

export function IncidenciasCamion() {
  const { userRole, setUserRole } = useContext(UserContext);

  const camionId = localStorage.getItem("camion");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [nav, setNav] = useState(null); // Actualizado: inicializar con null
  const [rolu, setRolu] = useState(null);
  const { id_cam } = useParams();
  let idc;
  let t;
  if (id_cam !== undefined) {
    idc = id_cam;
  } else {
    idc = camionId;
  }

  const sr = `${IncidenciasxCamionSR}${idc}`;
  const r = `${IncidenciasxCamionR}${idc}`;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (userRole === "CONDUCTOR") {
      // Reemplazado == con === para comparación estricta
      setNav(<NavBarConductor />);
    } else if (userRole === "SUPERVISOR") {
      setNav(<NavBarSupervisor />);
    }
    setUserRole(localStorage.getItem("rol"));
  }, []);

  return (
    <>
      {nav}
      <div className="contenedor-detalles">
        <Card style={{ width: "180rem" }}>
          <Card.Title>
            PANEL DE INCIDENCIAS {rolu} {userRole}
          </Card.Title>
          <Card.Body>
            {userRole == "CONDUCTOR" ? (
              <>
                <h2>Incidencias sin revisar </h2>
                <IncidenciasTC url={sr} />

                <h2>Registro de incidencias</h2>
                <IncidenciasTC url={r} />
              </>
            ) : (
              <>
                <h2>Incidencias sin revisar </h2>
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
