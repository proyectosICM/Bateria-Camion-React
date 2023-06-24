import React, { useCallback, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { bateriaxcamionURL } from "../../../API/apiurls";
import axios from "axios";
import { AiFillThunderbolt } from "react-icons/ai";
import { BsBatteryHalf, BsExclamationCircleFill, BsFillCheckCircleFill, BsX, BsXCircleFill } from "react-icons/bs";
import { FaCarBattery } from "react-icons/fa";

export function CamionesItem({ id, placa }) {
    const [baterias, setBaterias] = useState([]);
    const ListarBaterias = useCallback(async () => {
        const results = await axios.get(`${bateriaxcamionURL}/${id}`)
        setBaterias(results.data);

    });

    useEffect(() => {
        ListarBaterias();
    }, [ListarBaterias]);


    return (
        <div className="camionesItem-contenedor">
            <h1>Placa: {placa}</h1>
            {/* <img src={camionImage} alt="camion" /> */}
            <Card>
                {baterias.map((bateria) => (
                    <Card style={{ fontWeight: "bold" }}>
                        <Card.Body>
                            Bateria: <AiFillThunderbolt />Voltaje {bateria.voltaje} v { " "}
                            <BsBatteryHalf />Carga {bateria.carga} % { " "}
                            <FaCarBattery />Corriente {bateria.corriente} v { " "}
                        </Card.Body>
                    </Card>
                ))}

            </Card>
            <Link to={`/detalles/${id}`} className="linkes">
                <Button variant="success">Ver detalles de registros</Button>
                <Button variant="success"><BsFillCheckCircleFill /> Incidencias 0</Button>
                <Button variant="danger"><BsXCircleFill />Incidencias 1 <BsExclamationCircleFill /></Button>
            </Link>
        </div>
    );

} 