import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { BotonesCRUD } from "../../Componentes/Common/botonesCRUD";

export function BateruasC(){

    const {id_emp} = useParams();
    const [abrir, setAbrir] = useState(false);
    const [tablaSeleccionada, setTablaSeleccionada] = useState("Todos");

    const handleMostrarTabla = (tabla) => {
        setTablaSeleccionada(tabla);
    }

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

    return(
        <div className="container-crud">
              <BotonesCRUD activador={handleMostrarTabla} btnTabla={tablaSeleccionada} abrir={handleAbrirModal} retroceder="/bateriasCRUD" />
        </div>
    );
}