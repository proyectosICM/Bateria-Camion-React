import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { IncidenciasxEmpresa, IncidenciasxEmpresaE } from "../../API/apiurls";
import { IncidenciasTG } from "./incidenciasTG";

export function IncidenciasGenerales() {

    const urlIncEmp = `${IncidenciasxEmpresaE}1/`;


    return (
        <div className="contenedor-detalles">
            <Card style={{ width: "180rem" }}>
                <Card.Title>
                    PANEL DE INCIDENCIAS
                </Card.Title>
                <Card.Body>
                    <h2>Incidencias sin revisar</h2>
                    <IncidenciasTG est={0} url={urlIncEmp} />

                    <h2>Registro de incidencias</h2>
                    <IncidenciasTG est={1} url={urlIncEmp} />
                </Card.Body>
            </Card>
        </div>
    );
}