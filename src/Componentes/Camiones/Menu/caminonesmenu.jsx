import React, { useEffect, useState } from "react";
import '../../../Estilos/camionesmenu.css';

import axios from "axios";
import { BsListUl } from 'react-icons/bs'
import { Button, Card } from "react-bootstrap";
import { AiOutlineTable } from "react-icons/ai";
import { CamionesItem } from "./camionesitem";
import { CamionesMenu2 } from "./camionesmenu2";
import { camionesHURL } from "../../../API/apiurls";
export function CamionesMenu() {

    const [datos, setDatos] = useState([]);
    const [mostrarVista, setMostrarVista] = useState(true);
    const [vistaSeleccionada, setVistaseleccionada] = useState("menu");

    useEffect(() => {
        ListDatos();
    }, []);

    const ListDatos = async () => {
        const results = await axios.get(`${camionesHURL}1`);
        setDatos(results.data);
    }

    const handleMostrarVista = (vista) => {
        setMostrarVista(true);
        setVistaseleccionada(vista);
    }

    return (

        <div className="camionesMenu-contenedor">

                {datos.map((dato) => (
                    <CamionesItem key={dato.id_cam} id={dato.id_cam} placa={dato.placa_cam} />
                ))
                }


        </div>

    );
}