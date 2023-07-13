import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";

import { Button, ButtonGroup, Card } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ContenedorVoltaje } from './../VistasComunes/Graficos/Voltaje/contenedorVoltaje';
import { ContenedorCarga } from "../VistasComunes/Graficos/Carga/contenedorCarga";
import { ContenedorCorriente } from './../VistasComunes/Graficos/Corriente/contenedorCorriente';
import { UserContext } from "../Hooks/userProvider";
import { CorrienteArranqueURL, IncidenciasxCamionSR, camionURL } from "../API/apiurls";
import { BotonesG } from "../Common/botonesG";
import { CamionesTabla } from "../Common/camionesTabla";
import { FaEdit } from "react-icons/fa";
import { CamionDetalleModal } from "./camiondetalleModal";
import { editarElemento, useListarElementos } from "../API/apiCRUD";
import { useBack } from "../Hooks/useBack";

export function CamionDetalle({ idc, placa, incidencias }) {
    const id_tra = localStorage.getItem('trabajador');
    const token = localStorage.getItem('token');

    const [mostrarGrafico, setMostrarGrafico] = useState(true);
    const [graficoSeleccionado, setGraficoSeleccionado] = useState("voltaje");
    const [incidenciasSR, setIncidenciasSR] = useState([]);
    const [datos, setDatos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [datosEdit, setDatosEdit] = useState(null);

    const navigate = useNavigate();

    const { id_cam } = useParams();

    const { userRole } = useContext(UserContext);

    const handleMostrarGrafico = (grafico) => {
        setGraficoSeleccionado(grafico);
        setMostrarGrafico(true);
    };

    const empresa = localStorage.getItem('empresa');
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

    const [camion, setCamion] = useState([]);
    const ListarCamion = useListarElementos(`${camionURL}/${idc}`)
    useEffect(() => {
        ListarIncidenciasSR();
        ListarCamion(setCamion);
    }, [ListarIncidenciasSR]);

    const rol = localStorage.getItem('rol');

    const handleGraficosDetallados = (id) => {
        navigate(`/GraficosDetallados/${id}`)
    }

    const handleGraficosArranques= (id) => {
        navigate(`/arranquesc/${id}`)
    }
    const rango = "detalles";

    const handleEditButtonClick = () => {
        setShowModal(true);
    };


    const agregarArranque = (trabajador) => {
        console.log(trabajador);
        const requestData = {
            corrienteArranque: trabajador.nom_tra,
        };
        console.log(requestData);
        agregarElemento(CorrienteArranqueURL, requestData, closeModal, ListarDatos);
    };

    const editarArranque = (camion) => {
        const requestData = {
            corrienteArranque: camion
        };
        const apiurledit = `${CorrienteArranqueURL}${idc}`;
        editarElemento(apiurledit, requestData, closeModal, ListarDatos);
    };

    const ListarDatos = () => {
      
    }
    const edit = (camion) => {
        setDatosEdit(camion);
        setShowModal(true);

    };

    const closeModal = () => {
        setShowModal(false);
        setDatosEdit(null);
    };
    const handleBack = useBack({rutac: '/detalles', rutaop:`/menuCamion/${empresa}`});
    return (
        <>
            <Card.Header>
                <Card.Title>
                    {rol != "CONDUCTOR" && (
                                          <Button onClick={handleBack   } style={{width:"100%"}}>Atras</Button>
                    )}
  
                    </Card.Title>


   
                <h1>DETALLES</h1>
                {rol != 'CONDUCTOR' && (
                    <>
                        Corriente de arranque {camion.corrienteArranque}
                        <Button onClick={() => edit(camion)}><FaEdit /></Button>
                    </>
                )

                }

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
                            <ButtonGroup>
                                <Button onClick={() => handleGraficosDetallados(idc)}>Ver Graficos detallados</Button>
                                <Button onClick={() => handleGraficosArranques(idc)} variant="success">Ver Arranques</Button>
                            </ButtonGroup>
                            {/* Agrega más condiciones para otros gráficos */}
                        </Card>
                    )}
                </>
            </Card.Header>
            <CamionDetalleModal
                show={showModal}
                close={closeModal}
                agregar={agregarArranque}
                datosaeditar={datosEdit}
                editar={editarArranque} />
        </>
    );
}
