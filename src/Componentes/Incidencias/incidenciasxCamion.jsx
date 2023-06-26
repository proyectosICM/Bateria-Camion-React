import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { IncidenciasxCamionR, IncidenciasxCamionSR, IncidenciasxEmpresaR, IncidenciasxEmpresaSR } from "../../API/apiurls";
import { IncidenciasTG } from "./incidenciasTG";
import { useParams } from "react-router-dom";
import { IncidenciasTC } from "./incidenciasTC";

export function IncidenciasCamion() {

    const {id_cam} = useParams();
    const {t} = useParams();
    const sr= `${IncidenciasxCamionSR}${id_cam}`;
    const r= `${IncidenciasxCamionR}${id_cam}`;

    return (
        <div className="contenedor-detalles">
            <Card style={{ width: "180rem" }}>
                <Card.Title>
                    PANEL DE INCIDENCIAS
                </Card.Title>
                <Card.Body>
                    <h2>Incidencias sin revisar</h2>
                    <IncidenciasTC  url={sr} tu={t}/>

                    <h2>Registro de incidencias</h2>
                    <IncidenciasTC  url={r} tu={t}/>
                </Card.Body>
            </Card>
        </div>
    );
}