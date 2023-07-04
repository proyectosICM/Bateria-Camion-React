import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { IncidenciasxCamionSR } from "../API/apiurls";
import { Button, Card } from "react-bootstrap";
import { CamionesTabla } from "../Componentes/Camiones/Detalles/camionesTabla";
import { Link, useParams } from "react-router-dom";
import { BotonesG } from "../Componentes/Camiones/Detalles/botonesG";
import { ContenedorVoltaje } from './../VistasComunes/Graficos/Voltaje/contenedorVoltaje';
import { ContenedorCarga } from "../VistasComunes/Graficos/Carga/contenedorCarga";
import { ContenedorCorriente } from './../VistasComunes/Graficos/Corriente/contenedorCorriente';
import { UserContext } from "../Hooks/userProvider";



export function CamionDetalleS({ camion, bateriaId, baterias }) {
    const id_tra = localStorage.getItem('trabajador');
    const token = localStorage.getItem('token');
 
    const [mostrarGrafico, setMostrarGrafico] = useState(true);
    const [graficoSeleccionado, setGraficoSeleccionado] = useState("voltaje");
    const [incidenciasSR, setIncidenciasSR] = useState([]);

 
    const {id_cam} = useParams();




    const { userRole } = useContext(UserContext);
    

    const handleMostrarGrafico = (grafico) => {
        setGraficoSeleccionado(grafico);
        setMostrarGrafico(true);
    };


    
    const ListarIncidenciasSR = useCallback(async () => {
        try {
          const url = `${IncidenciasxCamionSR}${camion.id_cam}`;
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
      

    useEffect(()=> {
        ListarIncidenciasSR();
    },[ListarIncidenciasSR, camion]);

    const rol = localStorage.getItem('rol')

    return (
        <>
            <Card.Header>
                <Card.Title>{rol} - {userRole}</Card.Title>
                <h1>DETALLES</h1>

                <>
                    <h3>Placa {camion.placa_cam}</h3>
                    <div>
                        <CamionesTabla
                            idc={camion.id_cam}
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
                                <ContenedorVoltaje idc={camion.id_cam} />
                            )}
                            {graficoSeleccionado === "carga" && (
                                <ContenedorCarga idc={camion.id_cam} />
                            )}
                            {graficoSeleccionado === "corriente" && (
                                <ContenedorCorriente idc={camion.id_cam} />
                            )}
                            <Button>Ver Graficos detallados</Button>
                           
                        </div>
                            )}
                </>
            </Card.Header>
        </>
    );
}
