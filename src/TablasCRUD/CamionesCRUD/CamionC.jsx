import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { BotonesCRUD } from "../../Componentes/Common/botonesCRUD";
import { camionesDURL, camionesHURL, camionesTURL } from "../../API/apiurls";


export function CamionC() {

    const { id_emp } = useParams();
    const [abrir, setAbrir] = useState(false);
    const [tablaSeleccionada, setTablaSeleccionada] = useState("Todos");


    const urlT = `${camionesTURL}/${id_emp}`;
    const urlH = `${camionesHURL}/${id_emp}`;
    const urlD = `${camionesDURL}/${id_emp}`;



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
            <BotonesCRUD activador={handleMostrarTabla} btnTabla={tablaSeleccionada} abrir={handleAbrirModal} retroceder="/menuCamiones" />

            {/*tablaSeleccionada === "Habilitados" && (
                <BusesTabla il={id_emp} url={urlH} abrir={abrir} cerrar={handleCerrarModal} />
            )}
            {tablaSeleccionada === "Deshabilitados" && (
                <BusesTabla il={id_emp} url={urlD} abrir={abrir} cerrar={handleCerrarModal} />
            )}
            {tablaSeleccionada === "Todos" && (
                <BusesTabla il={id_emp} url={urlT} abrir={abrir} cerrar={handleCerrarModal} />
            )*/}

        </div>
    );
}
