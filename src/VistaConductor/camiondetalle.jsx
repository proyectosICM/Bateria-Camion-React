import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { bateriaxcamionURL, camionxtrabajador } from "../API/apiurls";
import { Button, Card } from "react-bootstrap";
import { NavBarConductor } from "./navbarConductor";
import { CamionesTabla } from "../Componentes/Camiones/Detalles/camionesTabla";
import { Link } from "react-router-dom";
import { NoAsignado } from "./noAsignado";

export function CamionDetalle() {
    const id_tra = localStorage.getItem('trabajador');
    const token = localStorage.getItem('token');

    const [camion, setCamion] = useState([]);
    const [bateriaId, setBateriaId] = useState([]);
    const [baterias, setBaterias] = useState([]);

    const ListarCamion = async () => {
        const response = await axios.get(`${camionxtrabajador}${id_tra}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setCamion(response.data);
    };

    const ListIdBat = useCallback(async () => {
        if (camion.length > 0) {
            const results = await axios.get(`${bateriaxcamionURL}/${camion[0].id_cam}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const idBatArray = results.data.map((item) => item.id_bat);
            setBateriaId(idBatArray);
            setBaterias(results.data);
        }
    }, [camion, token]);

    useEffect(() => {
        ListarCamion();

        if (camion.length > 0) {
            ListIdBat();
        }
    }, [camion]);

    const placa = camion.length > 0 ? camion[0].placa_cam : "";
    const idc = camion.length > 0 ? camion[0].id_cam : "";

    return (
        <>
            <NavBarConductor />
            <div className="contenedor-detalles">
                <Card style={{ width: "180rem" }}>
                    <div className="orden">
                        <Card.Header>
                            <h1>DETALLES</h1>
                            {camion.length > 0 ? (
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
                                </>
                            ) : (
                                <NoAsignado />
                            )}
                        </Card.Header>
                    </div>
                </Card>
            </div>
        </>
    );
}
