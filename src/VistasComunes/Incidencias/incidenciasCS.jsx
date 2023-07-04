import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { IncidenciasxCamionR, IncidenciasxCamionSR, IncidenciasxEmpresaR, IncidenciasxEmpresaSR } from "../../API/apiurls";
import { NavBarConductor } from "../../VistaConductor/navbarConductor";
import { NavBarSupervisor } from "../../VistaSupervisor/navbarSupervisor";
import { UserContext } from "../../Hooks/userProvider";
import { IncidenciasTG } from "./indicenciasTG";
import { useParams } from "react-router-dom";

export function IncidenciasCS() {
  const empresa = localStorage.getItem("empresa");
  const { userRole, setUserRole } = useContext(UserContext);

  
  const { id_cam } = useParams();

  const sr = `${IncidenciasxCamionSR}${id_cam}`;
  const r = `${IncidenciasxCamionR}${id_cam}`;

  const [nav, setNav] = useState(null);
  const [gen, setGen] = useState(false);

  

  useEffect(() => {
  
    if (userRole === "CONDUCTOR") {
      setNav(<NavBarConductor />);
    } else if (userRole === "SUPERVISOR") {
      setNav(<NavBarSupervisor />);
    }
  
    setUserRole(localStorage.getItem("rol"));
  }, [id_cam]);
  




  return (
    <>
      {nav}
      <Card className="contenedor-detalles">
        <Card.Title>
          PANEL DE INCIDENCIAS {gen ? "Generales" : "Camion"}
        </Card.Title>
        <Card.Body>
 
              <h2>Incidencias sin revisar</h2>
              <IncidenciasTG est={0} url={sr} />

              <h2>Registro de incidencias</h2>
              <IncidenciasTG est={1} url={r} />
        </Card.Body>
      </Card>
    </>
  );
}
