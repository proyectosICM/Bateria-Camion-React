import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { IncidenciasxCamionSR } from "../API/apiurls";
import { Button, Card } from "react-bootstrap";
import { NavBarConductor } from "./navbarConductor";
import { CamionesTabla } from "../Componentes/Camiones/Detalles/camionesTabla";
import { Link } from "react-router-dom";
import { NoAsignado } from "./noAsignado";
import { BotonesG } from "../Componentes/Camiones/Detalles/botonesG";
import { ContenedorVoltaje } from './../VistasComunes/Graficos/Voltaje/contenedorVoltaje';
import { ContenedorCarga } from "../VistasComunes/Graficos/Carga/contenedorCarga";
import { ContenedorCorriente } from './../VistasComunes/Graficos/Corriente/contenedorCorriente';



export function CamionDetalle({ camion, bateriaId, baterias }) {
    const id_tra = localStorage.getItem('trabajador');
    const token = localStorage.getItem('token');

    const [mostrarGrafico, setMostrarGrafico] = useState(true);
    const [graficoSeleccionado, setGraficoSeleccionado] = useState("voltaje");
    const [incidenciasSR, setIncidenciasSR] = useState([]);

    const placa = camion.length > 0 ? camion[0].placa_cam : "";
    const idc = camion.length > 0 ? camion[0].id_cam : "";

    localStorage.setItem('camion', idc);

    const handleMostrarGrafico = (grafico) => {
        setGraficoSeleccionado(grafico);
        setMostrarGrafico(true);
    };

    const url = `${IncidenciasxCamionSR}${idc}`;
    
    const ListarIncidenciasSR = useCallback(async () => {
        const results = await axios.get(`${url}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setIncidenciasSR(results.data);
    });

    useEffect(()=> {
        ListarIncidenciasSR();
    },[ListarIncidenciasSR]);

    return (
        <>
            <Card.Header>
                <h1>DETALLES</h1>

                <>
                    <h3>Placa {placa}</h3>
                    <div>
                        <CamionesTabla
                            idc={idc}
                        />
                    </div>
                    <h1>Incidencias sin revisar: {incidenciasSR.length}</h1>
                    <Button>
                        <Link to={'/incidencias'} className="linkes">Ver Registro Incidencias</Link>
                    </Button>

                    <BotonesG handleMostrarGrafico={handleMostrarGrafico} />
                    {mostrarGrafico && (
                        <div className="graficos">
                            {graficoSeleccionado === "voltaje" && (
                                <ContenedorVoltaje idc={idc} />
                            )}
                            {graficoSeleccionado === "carga" && (
                                <ContenedorCarga idc={idc} />
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
