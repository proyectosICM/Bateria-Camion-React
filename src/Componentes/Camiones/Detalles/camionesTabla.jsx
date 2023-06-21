import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";

export function CamionesTabla({url}) {
    const { id } = useParams();
    const [datos, setDatos] = useState([]);


    const ListDatos = useCallback(async () => {
        const results = await axios.get(`${url}`);
        setDatos(results.data);
    }, [id],);

    useEffect(() => {
        ListDatos();
    }, [ListDatos]);

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Hora</th>
                        <th>Voltaje</th>
                        <th>Bateria</th>
                        <th>Temperatura</th>
                    </tr>
                </thead>
                <tbody>
                    {datos.map((dato) => (
                        <tr >
                            <td>{dato.id_dc}</td>
                            <td>{dato.hora}</td>
                            <td>{dato.voltaje} v</td>
                            <td>{dato.carga} %</td>  
                            <td>{dato.temperatura} °C</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}