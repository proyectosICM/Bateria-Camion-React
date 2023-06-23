import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";


import { ContenedorTemperatura } from "../Graficos/Temperatura/contenedorTemperatura";
import { ContenedorBateria } from "../Graficos/Bateria/contenedorBateria";
import { BotonesG } from "./botonesG";
import { CamionesTabla } from "./camionesTabla";
import { ContenedorVoltaje } from "../Graficos/Voltaje/contenedorVoltaje";
import { BotonesT } from "./botonesT";
import { bateria1URL, bateria2URL, bateria3URL, bateria4URL, bateriaxcamionURL } from "../../../API/apiurls";
import { Card } from "react-bootstrap";
import { ContenedorCorriente } from "../Graficos/Corriente/contenedorCorriente";


 

export function CamionesDetalles() {

    const [mostrarGrafico, setMostrarGrafico] = useState(false);
    const [graficoSeleccionado, setGraficoSeleccionado] = useState("");
    const [mostrarTabla, setMostrartabla] = useState(true);
    const [tablaSeleccionada, setTablaSeleccionada] = useState("bateria1");


    const { id } = useParams();
    const [datos, setDatos] = useState([]);
    const [baterias, setBaterias] = useState([]);

    const ListDatos = useCallback(async () => {
        const results = await axios.get(`http://localhost:8080/api/detalles/d/${id}`);
        setDatos(results.data);
    }, [id],);

    const ListarBaterias = useCallback(async () => {
        const results = await axios.get(`${bateriaxcamionURL}/${id}`)
        setBaterias(results.data);

    })
    
    const bat1 = `${bateria1URL}/${id}/1`;
    const bat2 = `${bateria2URL}/${id}/2`;
    const bat3 = `${bateria3URL}/${id}/3`;
    const bat4 = `${bateria4URL}/${id}/4`;

    useEffect(() => {
        ListDatos();
        ListarBaterias();
    }, [ListDatos,ListarBaterias]);


    const placa = datos.length > 0 ? datos[0][0] : '';

    const handleMostrarGrafico = (grafico) => {
        setGraficoSeleccionado(grafico);
        setMostrarGrafico(true);
    };

    const handleMostrarTabla = (tabla) => {
        setTablaSeleccionada(tabla);
        setMostrartabla(true);
    };

    return (
        <div className="contenedor-detalles">
            <Card style={{ width: '180rem' }}>
                <div className="orden">
                    <Card.Header><h1>DETALLES</h1>
                        <h3>Placa {placa}</h3>
                    </Card.Header>
                    <Card>
                        <BotonesT handleMostrarTabla={handleMostrarTabla} />
                    </Card>

                    {mostrarTabla && (
                        <div>
                            {tablaSeleccionada === "bateria1" && (
                                <CamionesTabla url={bat1} datbat = {baterias[0]}/>
                            )}
                            {tablaSeleccionada === "bateria2" && (
                                <CamionesTabla url={bat2} datbat = {baterias[1]}/>
                            )}
                            {tablaSeleccionada === "bateria3" && (
                                <CamionesTabla url={bat3} datbat = {baterias[2]}/>
                            )}
                            {tablaSeleccionada === "bateria4" && (
                                <CamionesTabla url={bat4} datbat = {baterias[3]}/>
                            )}
                        </div>
                    )}

                    <Card>
                        <BotonesG handleMostrarGrafico={handleMostrarGrafico} />

                        {mostrarGrafico && (
                            <div className="graficos">
                                {graficoSeleccionado === "voltaje" && (
                                    <ContenedorVoltaje idc={id} />
                                )}
                                {graficoSeleccionado === "corriente" && (
                                    <ContenedorCorriente idc={id} />
                                )}
                                {graficoSeleccionado === "carga" && (
                                    <ContenedorBateria idc={id} />
                                )}
                                {/* Agrega más condiciones para otros gráficos */}
                            </div>
                        )}
                    </Card>
                </div>
            </Card>
        </div>


    );
}