import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { IncidenciasxCamionR, IncidenciasxCamionSR, IncidenciasxEmpresaR, IncidenciasxEmpresaSR } from "../../API/apiurls";
import { NavBarConductor } from "../../VistaConductor/navbarConductor";
import { NavBarSupervisor } from "../../VistaSupervisor/navbarSupervisor";
import { UserContext } from "../../Hooks/userProvider";
import { IncidenciasTG } from "./indicenciasTG";
import { useNavigate, useParams } from "react-router-dom";
import { NavBarAdministrador } from "../../VistaAdministrador/navbarAdministrador";
import { NavBarSelect } from "../navbarSelect";
import { LogoutToken } from "../../Hooks/logoutToken";

export function IncidenciasCS() {
  LogoutToken();
  
  const empresa = localStorage.getItem("empresa");
  const { id_cam } = useParams();

  const sr = `${IncidenciasxCamionSR}${id_cam}`;
  const r = `${IncidenciasxCamionR}${id_cam}`;


  const [gen, setGen] = useState(false);


  const { userRole, setUserRole } = useContext(UserContext);
  const [nav, setNav] = useState(null);

  const navigate = useNavigate();

  const  rol = localStorage.getItem("rol");
  const handleRedirigir = () => {
    if (rol == "CONDUCTOR") {
      navigate("/detalles");
    } else if (
      rol == "SUPERVISOR" ||
      rol == "ADMINISTRADOR" ||
      rol == "SISTEMAS"
    ) {
      navigate(`/detallesc/${id_cam}`);
    }
  }; 


  return (
    <>
      <Card className="contenedor-detalles">
        <Button onClick={handleRedirigir} > Atras</Button>
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
