import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { BotonesCRUD } from "../../../Componentes/Common/botonesCRUD";
import { camionesDURL, camionesHURL, camionesTURL } from "../../../API/apiurls";
import { CamionTabla } from "./camionTabla";
import { Card } from "react-bootstrap";

export function CamionC() {
  const { id_emp } = useParams();
  const [abrir, setAbrir] = useState(false);
  const [tablaSeleccionada, setTablaSeleccionada] = useState("Todos");

  const urlT = `${camionesTURL}${id_emp}`;
  const urlH = `${camionesHURL}${id_emp}`;
  const urlD = `${camionesDURL}${id_emp}`;

  const handleMostrarTabla = (tabla) => {
    setTablaSeleccionada(tabla);
  };

  const handleAbrirModal = () => {
    if (!abrir) {
      setAbrir(true);
    } else {
      setAbrir(false);
    }
  };

  const handleCerrarModal = () => {
    if (abrir) {
      setAbrir(false);
    }
  };

  return (
    <div className="contenedor-detalles">
      <Card style={{ width: "180rem" }}>
        <BotonesCRUD
          activador={handleMostrarTabla}
          btnTabla={tablaSeleccionada}
          abrir={handleAbrirModal}
          retroceder="/camionesCRUD"
        />

        {tablaSeleccionada === "Habilitados" && (
          <CamionTabla
            il={id_emp}
            url={urlH}
            abrir={abrir}
            cerrar={handleCerrarModal}
          />
        )}
        {tablaSeleccionada === "Deshabilitados" && (
          <CamionTabla
            il={id_emp}
            url={urlD}
            abrir={abrir}
            cerrar={handleCerrarModal}
          />
        )}
        {tablaSeleccionada === "Todos" && (
          <CamionTabla
            il={id_emp}
            url={urlT}
            abrir={abrir}
            cerrar={handleCerrarModal}
          />
        )}
      </Card>
    </div>
  );
}
