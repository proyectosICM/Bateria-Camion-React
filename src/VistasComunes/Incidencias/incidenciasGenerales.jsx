import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { IncidenciasxEmpresaR, IncidenciasxEmpresaSR } from "../../API/apiurls";
import { IncidenciasTG } from "../../Componentes/Incidencias/incidenciasTG";
import { NavBarConductor } from "../../VistaConductor/navbarConductor";
import { NavBarSupervisor } from "../../VistaSupervisor/navbarSupervisor";
import { UserContext } from "../../Hooks/userProvider";

export function IncidenciasGenerales() {
  const empresa = localStorage.getItem("empresa");
  const { userRole, setUserRole } = useContext(UserContext);
  const sr = `${IncidenciasxEmpresaSR}${empresa}`;
  const r = `${IncidenciasxEmpresaR}${empresa}`;
  const [nav, setNav] = useState(null);

  useEffect(() => {
    if (userRole === "CONDUCTOR") {
      setNav(<NavBarConductor />);
    } else if (userRole === "SUPERVISOR") {
      setNav(<NavBarSupervisor />);
    }

    setUserRole(localStorage.getItem("rol"));
  }, []);

  return (
    <>
      {nav}
      <Card className="contenedor-detalles">
        <Card.Title>PANEL DE INCIDENCIAS</Card.Title>
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
