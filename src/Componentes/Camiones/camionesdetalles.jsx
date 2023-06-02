import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { CamionesTabla } from "./camionesTabla";
import { BotonesG } from "./botonesG";
import { ContenedorTemperatura } from "./Graficos/Temperatura/contenedorTemperatura";
import { ContenedorBateria } from "./Graficos/Bateria/contenedorBateria";




export function CamionesDetalles() {

    const [mostrarGrafico, setMostrarGrafico] = useState(false);
    const [graficoSeleccionado, setGraficoSeleccionado] = useState("");
    
    const { id } = useParams();
    const [datos, setDatos] = useState([]);

    const navigate = useNavigate();
    const ListDatos = useCallback(async () => {
        const results = await axios.get(`http://localhost:8080/api/detalles/d/${id}`);
        setDatos(results.data);
    }, [id],);

    useEffect(() => {
        ListDatos();
    }, [ListDatos]);

    console.log(datos);
    const placa = datos.length > 0 ? datos[0][0] : '';

    const handleMostrarGrafico = (grafico) => {
        setGraficoSeleccionado(grafico);
        setMostrarGrafico(true);
    };

    return (
        <div className="contenedor-detalles">
            <div className="orden">
                <h1>DETALLES</h1>
                <h1>Placa {placa}</h1>
                <CamionesTabla />
                <BotonesG handleMostrarGrafico={handleMostrarGrafico} />
                {mostrarGrafico && (
                    <div className="graficos">
                        {graficoSeleccionado === "temperatura" && (
                            <ContenedorTemperatura />
                        )}
                        {graficoSeleccionado === "carga" && (
                            <ContenedorBateria />
                        )}
                        {/* Agrega más condiciones para otros gráficos */}
                    </div>
                )}
            </div>
        </div>


    );
}