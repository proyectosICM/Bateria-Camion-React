import React, { useState } from "react";
import { useParams } from "react-router-dom";

export function BateruasC(){

    const {id_emp} = useParams();
    const [abrir, setAbrir] = useState(false);
    const [tablaSeleccionada, setTablaSeleccionada] = useState("Todos");

    return(
        <div className="container-crud">

        </div>
    );
}