import React, { useCallback, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { BotonesDeGestion } from "../../../Common/botonesDeGestion";
import axios from "axios";
import { agregarElemento, deshabilitarElemento, editarElemento, habilitarElemento } from "../../../API/apiCRUD";
import { bateriaURL } from "../../../API/apiurls";
import { BateriasModal } from "./bateriasModal";

export function BateriasTabla({ url, abrir, cerrar, il }) {

    const [datos, setDatos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [datosEdit, setDatosEdit] = useState(null);

    const token = localStorage.getItem("token");

    const ListarDatos = useCallback(async () => {
        const results = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`, // Agregar el token en el encabezado de la solicitud
            },
          });
        setDatos(results.data);
    }, [url]);

    useEffect(() => {
        ListarDatos();
    }, [ListarDatos]);

    const empresa = localStorage.getItem('empresa');

    const agregarBateria = (camion) => {
        const requestData = {
            nom_bat: camion.nom_bat,
            estado: true,
            camionesModel: {
                id_cam: camion.camionesModel
            },
            empresasModel: {
                id_emp: empresa
            },
        };
        agregarElemento(bateriaURL, requestData, closeModal, ListarDatos);
    };

    const editarBateria = (bateria) => {
        const requestData = {
            nom_bat: bateria.nom_bat,
            estado: true,
            camionesModel: {
                id_cam: bateria.camionesModel
            },
            empresasModel: {
                id_emp: empresa
            },
        };
        const apiurledit = `${bateriaURL}/${bateria.id_bat}`;
        editarElemento(apiurledit, requestData, closeModal, ListarDatos);
    };


    const habilitarBateria = (id) => {
        habilitarElemento(bateriaURL, id, `estado`, ListarDatos);
    };


    const deshabilitarBateria = (id) => {
        deshabilitarElemento(bateriaURL, id, `estado`, ListarDatos);
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
                        <th>NOMBRE</th>
                        <th>CAMION ASIGNADO</th>
                        <th>ESTADO</th>
                        <th>GESTION</th>
                    </tr>
                </thead>
                <tbody>
                    {datos.map((dato) => (
                        <tr key={dato.id_bat}>
                            <td>{dato.id_bat}</td>
                            <td>{dato.nom_bat}</td>
                            <td>{dato.camionesModel ? dato.camionesModel.placa_cam : "No hay un camion asignado aun"}</td>
                            <td>{dato.estado ? "Habilitado" : "Deshabilitado"}</td>
                            <td>
                                <BotonesDeGestion
                                    ide={`id_bat`} estado={`estado`} dato={dato} edit={edit}
                                    deshabilitar={deshabilitarBateria} habilitar={habilitarBateria}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <BateriasModal
                show={showModal || abrir}
                close={closeModal}
                agregar={agregarBateria}
                datosaeditar={datosEdit}
                editar={editarBateria}
                il={il}
            />
        </>
    );
}