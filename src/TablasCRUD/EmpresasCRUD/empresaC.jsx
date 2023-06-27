import React, {  useState } from "react";
import { BotonesCRUD } from "../../Componentes/Common/botonesCRUD";
import { EmpresasTabla } from "./empresaTabla";
import { empresasDURL, empresasHURL, empresasURL } from "../../API/apiurls";
import { Card } from "react-bootstrap";


export function EmpresasC(){
 
    const [mostrartabla, setMostrarTabla] = useState(true)
    const [tablaSeleccionada, setTablaSeleccionada] = useState("Habilitados");
    const [abrir, setAbrir] = useState(false);

    const handleMostrarTabla = (tabla) => {
        setTablaSeleccionada(tabla);
        setMostrarTabla(true);
    }

    const handleAbrirModal = () => {
        if(!abrir){
            setAbrir(true);
        } else {
            setAbrir(false);
        }
    }
 
    const handleCerrarModal = () => {
        if(abrir){
            setAbrir(false);
        }
    }

    return (

            <div className="container-crud" >
            <div className="set-botones">
                <BotonesCRUD activador={handleMostrarTabla} btnTabla={tablaSeleccionada} abrir={handleAbrirModal}  retroceder="/menuCRUD" />
            </div>

                {mostrartabla && (
                    <>
                        {tablaSeleccionada === "Habilitados" && (
                            <EmpresasTabla url={empresasHURL} abrir={abrir} cerrar={handleCerrarModal}/>
                        )}
                        {tablaSeleccionada === "Deshabilitados" && (
                            <EmpresasTabla url={empresasDURL} abrir={abrir} cerrar={handleCerrarModal}/>
                        )}
                        {tablaSeleccionada === "Todos" && (
                            <EmpresasTabla url={empresasURL}  abrir={abrir} cerrar={handleCerrarModal}/>
                        )}
                    </>

                )}

        </div>
    );
}