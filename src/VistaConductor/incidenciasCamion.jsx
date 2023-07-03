import React, { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { IncidenciasxCamionR, IncidenciasxCamionSR } from "../API/apiurls";
import { IncidenciasTC } from "../Componentes/Incidencias/incidenciasTC";
import { NavBarConductor } from "./navbarConductor";

export function IncidenciasCamion() {

    const camionId = localStorage.getItem('camion');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();


    const { id_cam } = useParams();
    let idc;
    if (id_cam !== undefined) {
        idc = id_cam;
    } else {
        idc = camionId;
    }

    const t = "SUPERVISOR"
    const sr = `${IncidenciasxCamionSR}${idc}`;
    const r = `${IncidenciasxCamionR}${idc}`;

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    return (
        <>
            <NavBarConductor />
            <div className="contenedor-detalles">
                <Card style={{ width: "180rem" }}>
                    <Card.Title>
                        PANEL DE INCIDENCIAS
                    </Card.Title>
                    <Card.Body>
                        <h2>Incidencias sin revisar</h2>
                        <IncidenciasTC url={sr} tu={t} />

                        <h2>Registro de incidencias</h2>
                        <IncidenciasTC url={r} tu={t} />
                    </Card.Body>
                </Card>

            </div>
        </>

    );
}