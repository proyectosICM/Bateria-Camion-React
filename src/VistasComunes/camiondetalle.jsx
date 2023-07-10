import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";

import { Button, Card } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ContenedorVoltaje } from './../VistasComunes/Graficos/Voltaje/contenedorVoltaje';
import { ContenedorCarga } from "../VistasComunes/Graficos/Carga/contenedorCarga";
import { ContenedorCorriente } from './../VistasComunes/Graficos/Corriente/contenedorCorriente';
import { UserContext } from "../Hooks/userProvider";
import { IncidenciasxCamionSR } from "../API/apiurls";
import { BotonesG } from "../Common/botonesG";
import { CamionesTabla } from "../Common/camionesTabla";


export function CamionDetalle({ camion, idc, placa, incidencias }) {
    const id_tra = localStorage.getItem('trabajador');
    const token = localStorage.getItem('token');

    const [mostrarGrafico, setMostrarGrafico] = useState(true);
    const [graficoSeleccionado, setGraficoSeleccionado] = useState("voltaje");
    const [incidenciasSR, setIncidenciasSR] = useState([]);

    const navigate = useNavigate();

    const { id_cam } = useParams();

    const { userRole } = useContext(UserContext);

    const handleMostrarGrafico = (grafico) => {
        setGraficoSeleccionado(grafico);
        setMostrarGrafico(true);
    };

    const url = `${IncidenciasxCamionSR}${idc}`;


    const ListarIncidenciasSR = useCallback(async () => {
        try {
            const url = `${IncidenciasxCamionSR}${idc}`;
            const results = await axios.get(`${url}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setIncidenciasSR(results.data);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                // Camión no encontrado, manejarlo adecuadamente
                console.error("El camión no tiene incidencias:", error);
                setIncidenciasSR([]);
            } else {
                // Otro error, manejarlo adecuadamente
                console.error("Error al obtener las incidencias:", error);
            }
        }
    });

    useEffect(() => {
        ListarIncidenciasSR();
    }, [ListarIncidenciasSR]);

    const rol = localStorage.getItem('rol');

    const handleGraficosDetallados = (id) => {
        navigate(`/GraficosDetallados/${id}`)
    }

    const rango = "detalles";
    return (
        <>
            <Card.Header>
                <Card.Title>{rol} - {userRole}</Card.Title>
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
                        <Link to={incidencias} className="linkes">Ver Registro Incidencias</Link>
                    </Button>

                    <BotonesG handleMostrarGrafico={handleMostrarGrafico} />
                    {mostrarGrafico && (
                        <Card className="graficos">
                            {graficoSeleccionado === "voltaje" && (
                                <ContenedorVoltaje idc={idc} rango={rango} propiedad={"voltaje"} />
                            )}
                            {graficoSeleccionado === "carga" && (
                                <>
                                    <ContenedorVoltaje idc={idc} rango={rango} propiedad={"carga"} />
                                    {/* <ContenedorCarga idc={idc} rango={rango} propiedad={"voltaje"}  /> */}
                                </>

                            )}
                            {graficoSeleccionado === "corriente" && (
                                <ContenedorVoltaje idc={idc} rango={rango} propiedad={"corriente"} />
                            )}
                            <Button onClick={() => handleGraficosDetallados(idc)}>Ver Graficos detallados</Button>
                            {/* Agrega más condiciones para otros gráficos */}
                        </Card>
                    )}
                </>
            </Card.Header>
        </>
    );
}
