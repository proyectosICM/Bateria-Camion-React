import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { bateriaxcamionURL, camionxtrabajador } from "../API/apiurls";
import { Button, Card } from "react-bootstrap";
import { NavBarConductor } from "./navbarConductor";
import { CamionesTabla } from "../Componentes/Camiones/Detalles/camionesTabla";
import { Link } from "react-router-dom";
import { NoAsignado } from "./noAsignado";
import { BotonesG } from "../Componentes/Camiones/Detalles/botonesG";
import { ContenedorVoltaje } from "../Componentes/Camiones/Graficos/Voltaje/contenedorVoltaje";
import { ContenedorBateria } from "../Componentes/Camiones/Graficos/Bateria/contenedorBateria";
import { ContenedorCorriente } from "../Componentes/Camiones/Graficos/Corriente/contenedorCorriente";

export function CamionDetalle({ camion, bateriaId, baterias }) {
    const id_tra = localStorage.getItem('trabajador');
    const token = localStorage.getItem('token');

    const [mostrarGrafico, setMostrarGrafico] = useState(true);
    const [graficoSeleccionado, setGraficoSeleccionado] = useState("voltaje");

    const placa = camion.length > 0 ? camion[0].placa_cam : "";
    const idc = camion.length > 0 ? camion[0].id_cam : "";

    const handleMostrarGrafico = (grafico) => {
        setGraficoSeleccionado(grafico);
        setMostrarGrafico(true);
    };

    return (
        <>
            <Card.Header>
                <h1>DETALLES</h1>

                <>
                    <h3>Placa {placa}</h3>
                    <div>
                        {bateriaId.map((bateriaId, index) => (
                            <div key={bateriaId}>
                                <CamionesTabla
                                    idb={bateriaId}
                                    datbat={baterias[index]}
                                    idc={idc}
                                />
                            </div>
                        ))}
                    </div>
                    <Button>
                        <Link className="linkes">Ver Registro Incidencias</Link>
                    </Button>

                    <BotonesG handleMostrarGrafico={handleMostrarGrafico} />
                    {mostrarGrafico && (
                        <div className="graficos">
                            {graficoSeleccionado === "voltaje" && (
                                <ContenedorVoltaje idc={idc} />
                            )}
                            {graficoSeleccionado === "carga" && (
                                <ContenedorBateria idc={idc} />
                            )}
                            {graficoSeleccionado === "corriente" && (
                                <ContenedorCorriente idc={idc} />
                            )}
                            <Button>Ver Graficos detallados</Button>
                            {/* Agrega más condiciones para otros gráficos */}
                        </div>
                    )}
                </>
            </Card.Header>
        </>
    );
}
