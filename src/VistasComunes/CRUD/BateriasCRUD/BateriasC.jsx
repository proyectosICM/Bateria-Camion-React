import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { BateriasTabla } from "./bateriasTabla";
import { bateriaDURL, bateriaHURL, bateriaTURLH } from "../../../API/apiurls";
import { BotonesCRUD } from "../../../Common/botonesCRUD";

export function BateriasC() {

    const { id_emp } = useParams();
    const [abrir, setAbrir] = useState(false);
    const [tablaSeleccionada, setTablaSeleccionada] = useState("Todos");

    const urlT = `${bateriaTURLH}${id_emp}`;
    const urlH = `${bateriaHURL}${id_emp}`;
    const urlD = `${bateriaDURL}${id_emp}`;

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

    return (
        <div className="container-crud">
            <BotonesCRUD activador={handleMostrarTabla} btnTabla={tablaSeleccionada} abrir={handleAbrirModal} retroceder="/bateriasCRUD" />


            {tablaSeleccionada === "Habilitados" && (
                <BateriasTabla il={id_emp} url={urlH} abrir={abrir} cerrar={handleCerrarModal} />
            )}
            {tablaSeleccionada === "Deshabilitados" && (
                <BateriasTabla il={id_emp} url={urlD} abrir={abrir} cerrar={handleCerrarModal} />
            )}
            {tablaSeleccionada === "Todos" && (
                <BateriasTabla il={id_emp} url={urlT} abrir={abrir} cerrar={handleCerrarModal} />
            )}
        </div>
    );
}