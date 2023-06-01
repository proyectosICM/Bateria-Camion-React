import React, { useEffect, useState } from "react";
import '../../Estilos/camionesmenu.css';
import { CamionesItem } from "./camionesitem";
import axios from "axios";

export function CamionesMenu(){

    const [datos, setDatos] = useState([]);

    
    useEffect(() => {
        ListDatos();
    },[]);

    const ListDatos = async() =>{
        const results = await axios.get('http://localhost:8080/api/camiones');
        setDatos(results.data);
    }
    

    return(
        <div className="camionesMenu-contenedor">
            {datos.map((dato) => (
                <CamionesItem key={dato.id_cam} id={dato.id_cam} placa={dato.placa_cam} />
                ))}

        </div>
    );
}