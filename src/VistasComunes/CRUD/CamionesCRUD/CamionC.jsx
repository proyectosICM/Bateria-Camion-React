import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


import { camionesDURL, camionesHURL, camionesTURL } from "../../../API/apiurls";
import { CamionTabla } from "./camionTabla";
import { Card } from "react-bootstrap";
import { BotonesCRUD } from "../../../Common/botonesCRUD";
import { useBackCRUD } from "../../../Hooks/useBackCRUD";
import { useNotAuthorized } from "../../../Hooks/useNotAuthorized";

export function CamionC() {
  const { id_emp } = useParams();
  const [abrir, setAbrir] = useState(false);
  const [tablaSeleccionada, setTablaSeleccionada] = useState("Todos");

  const urlT = `${camionesTURL}${id_emp}`;
  const urlH = `${camionesHURL}${id_emp}`;
  const urlD = `${camionesDURL}${id_emp}`;
  
  useNotAuthorized(id_emp);

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
 
  const ruta = useBackCRUD(`/camionesCRUD`);

  return (
    <div className="camionesMenu-contenedor">
        <BotonesCRUD
          activador={handleMostrarTabla}
          btnTabla={tablaSeleccionada}
          abrir={handleAbrirModal}
          retroceder={ruta}
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
    </div>
  );
}
