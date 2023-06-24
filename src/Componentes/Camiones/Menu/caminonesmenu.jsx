import React, { useEffect, useState } from "react";
import '../../../Estilos/camionesmenu.css';

import axios from "axios";
import { BsListUl } from 'react-icons/bs'
import { Button } from "react-bootstrap";
import { AiOutlineTable } from "react-icons/ai";
import { CamionesItem } from "./camionesitem";
import { CamionesMenu2 } from "./camionesmenu2";
export function CamionesMenu(){

    const [datos, setDatos] = useState([]);
    const[mostrarVista, setMostrarVista] = useState(true);
    const [vistaSeleccionada, setVistaseleccionada] = useState("menu");
    
    useEffect(() => {
        ListDatos();
    }, []);

    const ListDatos = async () => {
        const results = await axios.get('http://localhost:8080/api/camiones');
        setDatos(results.data);
    }

    const handleMostrarVista = (vista) => {
        setMostrarVista(true);
        setVistaseleccionada(vista);
    }

    return (
        <div>
            <div className="camionesMenu-contenedor">
                {mostrarVista && (
                    <>
                        {vistaSeleccionada === "lista" && (
                            <CamionesMenu2 />
                        )}
                        {vistaSeleccionada === "menu" && (
                            datos.map((dato) => (
                                <CamionesItem key={dato.id_cam} id={dato.id_cam} placa={dato.placa_cam} />
                            ))
                        )}
                    </>

                )}

            </div>
        </div>
    );
}