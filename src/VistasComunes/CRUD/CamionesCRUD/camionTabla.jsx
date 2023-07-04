import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
//import { EmpresaModal } from "./empresaModal";

import { camionURL } from "../../../API/apiurls";
import { agregarElemento, deshabilitarElemento, editarElemento, habilitarElemento } from "../../../API/apiCRUD";
import { BotonesDeGestion } from "../../../Componentes/Common/botonesDeGestion";
import { CamionModal } from "./camionModal";


export function CamionTabla({ url, abrir, cerrar, il }) {
    const [datos, setDatos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [datosEdit, setDatosEdit] = useState(null);

    const ListarDatos = useCallback(async () => {
        const results = await axios.get(url);
        setDatos(results.data);
    }, [url]);

    useEffect(() => {
        ListarDatos();
    }, [ListarDatos]);

    const agregarCamion = (camion) => {
        const requestData = {
            placa_cam: camion.placa_cam,
            estado: camion.estado,
            trabajadoresModel: {
                id_tra: camion.trabajadoresModel
            },
            empresasModel: {
                id_emp: il
            },
        };
        console.log(requestData);
        agregarElemento(camionURL, requestData, closeModal, ListarDatos);
    };

    const editarCamion = (camion) => {
        const requestData = {
            placa_cam: camion.placa_cam,
            estado: camion.estado,
            trabajadoresModel: {
                id_tra: camion.trabajadoresModel
            },
            empresasModel: {
                id_emp: il
            },
        };
        const apiurledit = `${camionURL}/${camion.id_cam}`;
        editarElemento(apiurledit, requestData, closeModal, ListarDatos);
    };


    const habilitarCamion= (id) => {
        habilitarElemento(camionURL, id, `estado`, ListarDatos);
    };


    const deshabilitarCamion = (id) => {
        deshabilitarElemento(camionURL, id, `estado`, ListarDatos);
    };

    const edit = (camion) => {
        setDatosEdit(camion);
        setShowModal(true);
    };


    const closeModal = () => {
        cerrar();
        setShowModal(false);
        setDatosEdit(null);
    };

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>PLACA</th>
                        <th>CONDUCTOR</th>
                        <th>ESTADO</th>
                        <th>GESTION</th>
                    </tr>
                </thead>
                <tbody>
                    {datos.map((dato) => (
                        <tr key={dato.id_cam}>
                            <td>{dato.id_cam}</td>
                            <td>{dato.placa_cam}</td>
                            <td>{dato.trabajadoresModel.nom_tra} {dato.trabajadoresModel.ape_tra}</td>
                            <td>{dato.estado ? "Habilitado" : "Deshabilitado"}</td>
                            <td>
                                <BotonesDeGestion
                                    ide={`id_cam`} estado={`estado`} dato={dato} edit={edit}
                                    deshabilitar={deshabilitarCamion} habilitar={habilitarCamion}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <CamionModal
                show={showModal || abrir}
                close={closeModal}
                agregar={agregarCamion}
                datosaeditar={datosEdit}
                editar={editarCamion}
                il={il}
            />
        </>
    )
}