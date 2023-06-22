import React, { useState } from "react";
import { TrabajadorTabla } from "./trabajadorTabla";
import { useParams } from "react-router-dom";
import './trabajadorC.css';

import { trabajadorDURL, trabajadorHURL, trabajadorTURL } from "../../API/apiurls";
import { BotonesCRUD } from "../../Componentes/Common/botonesCRUD";

export function TrabajadorC() {
  const { id_emp } = useParams();
  const [abrir, setAbrir] = useState(false);
  const [tablaSeleccionada, setTablaSeleccionada] = useState("Todos");

  const urlT = `${trabajadorTURL}/${id_emp}`;
  const urlH = `${trabajadorHURL}/${id_emp}`;
  const urlD = `${trabajadorDURL}/${id_emp}`;


  const handleMostrarTabla = (tabla) => {
    setTablaSeleccionada(tabla);
  };



  const handleAbrirModal = () => {
    if (!abrir) {
      setAbrir(true);
    } else {
      setAbrir(false);
    }
  }

  const handleCerrarModal = () => {
    if (abrir) {
      setAbrir(false);
    }
  }
 
  return (
    <div className="container-crud">
      <BotonesCRUD activador={handleMostrarTabla} btnTabla={tablaSeleccionada} abrir={handleAbrirModal} retroceder="/trabajadoresCRUD" />

      {tablaSeleccionada === "Habilitados" && (
        <TrabajadorTabla il={id_emp} url={urlH} abrir={abrir} cerrar={handleCerrarModal} />
      )}
      {tablaSeleccionada === "Deshabilitados" && (
        <TrabajadorTabla il={id_emp} url={urlD} abrir={abrir} cerrar={handleCerrarModal} />
      )}
      {tablaSeleccionada === "Todos" && (
        <TrabajadorTabla il={id_emp} url={urlT} abrir={abrir} cerrar={handleCerrarModal} />
      )}
    </div>
  );
}
