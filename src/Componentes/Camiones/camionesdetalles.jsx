import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";

export function CamionesDetalles(){

    const {id} = useParams();
    const [datos, setDatos] = useState([]);


    const ListDatos = useCallback(async() =>{
            const results = await axios.get(`http://localhost:8080/api/detalles/d/${id}`);
            setDatos(results.data);
        },[id],);

    useEffect(()=>{
        ListDatos();
    },[ListDatos]);

    console.log(datos);
    const placa = datos.length > 0 ? datos[0][0] : '';

    return(
        <div className="contenedor-detalles">
            <div>
                <h1>DETALLES</h1>
                <h1>Placa {placa}</h1>
                <div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Hora</th>
                                <th>Voltaje</th>
                                <th>Bateria</th>
                                <th>Temperatura</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datos.map((dato) => (
                                <tr >
                                    <td>{dato[2]}</td>
                                    <td>{dato[3]}</td>
                                    <td>{dato[4]} %</td>
                                    <td>{dato[5]} °C</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>

            </div>

        </div>
    );
}