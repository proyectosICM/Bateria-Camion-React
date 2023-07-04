import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { IncidenciasxCamionR, IncidenciasxCamionSR, IncidenciasxEmpresaR, IncidenciasxEmpresaSR } from "../../API/apiurls";
import { NavBarConductor } from "../../VistaConductor/navbarConductor";
import { NavBarSupervisor } from "../../VistaSupervisor/navbarSupervisor";
import { UserContext } from "../../Hooks/userProvider";
import { IncidenciasTG } from "./indicenciasTG";
import { useParams } from "react-router-dom";
import { NavBarAdministrador } from "../../VistaAdministrador/navbarAdministrador";
import { NavBarSelect } from "../navbarSelect";

export function IncidenciasGenerales() {
  const empresa = localStorage.getItem("empresa");
  const { userRole, setUserRole } = useContext(UserContext);

  
  const { id_cam } = useParams();

  const gsr = `${IncidenciasxEmpresaSR}${empresa}`;
  const gr = `${IncidenciasxEmpresaR}${empresa}`;

  const [nav, setNav] = useState(null);
  const [gen, setGen] = useState(false);


  return (
    <>
      <Card className="contenedor-detalles">
        <Card.Title>
          PANEL DE INCIDENCIAS {gen ? "Generales" : "Camion"}
        </Card.Title>
        <Card.Body>
              <h2>Incidencias sin revisar</h2>
              <IncidenciasTG est={0} url={gsr} />

              <h2>Registro de incidencias</h2>
              <IncidenciasTG est={1} url={gr} />
        </Card.Body>
      </Card>
    </>
  );
}
