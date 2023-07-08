import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IncidenciasURL } from "../../API/apiurls";
import { habilitarElemento, habilitarElementoSL, useListarElementos } from "../../API/apiCRUD";
import {
  useNotAuthorized,
  useNotAuthorizedInc,
} from "../../Hooks/useNotAuthorized";
let ruta;
export function IncidenciasDetalles() {
  const { id } = useParams();
  const [datos, setDatos] = useState(null);

  const fetchData = useListarElementos(`${IncidenciasURL}/${id}`, setDatos);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const navigate = useNavigate();
  const camion = localStorage.getItem("camion");
  const rol = localStorage.getItem("rol");
  const empresa = localStorage.getItem("empresa");
  const id_cam = datos ? datos.camionesModel.id_cam : null;
  const id_emp = datos ? datos.empresasModel.id_emp : null;

  let param;
  if (rol === "CONDUCTOR") {
    param = id_cam;
  } else if (rol === "SUPERVISOR") {
    param = id_emp;
  } else if (rol === "ADMINISTRADOR") {
    param = id_emp;
  }

  useNotAuthorizedInc(param);

  if (rol == "CONDUCTOR") {
    let ruta = "/incidencias";
  }

  const handleRedirigir = () => {
    if (rol == "CONDUCTOR") {
      navigate("/incidencias");
    } else if (
      rol == "SUPERVISOR" ||
      rol == "ADMINISTRADOR" ||
      rol == "SISTEMAS"
    ) {
      navigate(`/incidenciasG/${empresa}`);
    }
  };

  const sRevision = (id) => {
    habilitarElementoSL(
      `${IncidenciasURL}`,
      id,
      "estado"
    );
    console.log(id);
  };

  return (
    <Card className="camionesMenu-contenedor">
      <Button onClick={handleRedirigir}>Atras</Button>
      <h1>Incidencias Detalles</h1>
      {datos != null && (
        <>
          <h2>Nombre de la incidencia:</h2>
          <h3>{datos.nom_inc}</h3>
          <h3>Dia {datos.dia}</h3>
          <h3>Hora {datos.hora}</h3>
          <h2>Bateria responsable de la incidencia:</h2>
          <h3>{datos.bateriasModels.nom_bat}</h3>
          <h2>Voltaje registrado {datos.voltaje} v</h2>
          <h2>Carga registrada {datos.voltaje} %</h2>
          <h2>Corriente registrada {datos.corriente} v</h2>
          <h2>Placa del camion:</h2>
          <h3>{datos.camionesModel.placa_cam}</h3>
          <h2>Conductor</h2>
          <h3>
            {datos.conductor.nom_tra} {datos.conductor.ape_tra}
          </h3>
          {datos.estado && (
            <>
              <h2>Revisado por </h2>
              <h3>
                {datos.revisadoBy.rolesModel.name} {datos.revisadoBy.nom_tra}{" "}
                {datos.revisadoBy.ape_tra}
              </h3>
            </>
          )}

          {rol !== "CONDUCTOR" && !datos.estado && (
            <Button onClick={() => sRevision(datos.id_inc)} >Revisar</Button>
          )}
        </>
      )}
    </Card>
  );
}
