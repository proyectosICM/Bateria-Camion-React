import React, { useCallback, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IncidenciasxCamionSR, IncidenciasxEmpresaSR, bateriaxcamionURL } from "../../../API/apiurls";
import axios from "axios";
import { AiFillThunderbolt } from "react-icons/ai";
import { BsBatteryHalf, BsExclamationCircleFill, BsFillCheckCircleFill, BsX, BsXCircleFill } from "react-icons/bs";
import { FaCarBattery } from "react-icons/fa";

export function CamionesItem({ id, placa }) {
    const [baterias, setBaterias] = useState([]);
    const [incidencias, setIncidencias] = useState([]);
    const [icono, setIcono] = useState([]);

    const ListarBaterias = useCallback(async () => {
        const results = await axios.get(`${bateriaxcamionURL}/${id}`)
        setBaterias(results.data);

    });


    const ListarIncidencias = useCallback(async () => {
        const results = await axios.get(`${IncidenciasxCamionSR}${id}`);
        setIncidencias(results.data);
    });

    useEffect(() => {
        ListarBaterias();
        ListarIncidencias();
    }, [ListarBaterias, ListarIncidencias]);

    useEffect(() => {
        // Actualiza el estado del icono basado en la longitud de incidencias
        if (incidencias.length > 0) {
            setIcono(<BsXCircleFill />);
        } else {
            setIcono(<BsFillCheckCircleFill />);
        }
    }, [incidencias]);


    return (
        <div className="camionesItem-contenedor">
            <Card>
                <h1>Placa: {placa}</h1>
                {/* <img src={camionImage} alt="camion" /> */}
                <Card>
                    {baterias.map((bateria, index) => (
                        <Card style={{ fontWeight: "bold" }}>
                            <Card.Body>
                                Bateria: <AiFillThunderbolt />Voltaje {bateria.voltaje} v {" "}
                                <BsBatteryHalf />Carga {bateria.carga} % {" "}
                                <FaCarBattery />Corriente {bateria.corriente} v {" "}
                            </Card.Body>
                        </Card>
                    ))}

                </Card>
                <Link to={`/detalles/${id}`} className="linkes">
                    <Button variant="success">Ver detalles de registros</Button>
                </Link>
                <Link to={`/incidenciasxc/${"sup"}/${id}`} className="linkes">
                    <Button variant={incidencias.length > 0 ? "danger" : "success"}>
                        {icono}
                        Incidencias {incidencias.length > 0 ? incidencias.length : 0}
                    </Button>
                </Link>
            </Card>
        </div>
    );

} 