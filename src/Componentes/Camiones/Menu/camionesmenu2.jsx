import React, { useEffect, useState } from "react";
import '../../../Estilos/camionesmenu.css';
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

export function CamionesMenu2(){

    const [datos, setDatos] = useState([]);

    
    useEffect(() => {
        ListDatos();
    },[]);

    const ListDatos = async() =>{
        const results = await axios.get('http://localhost:8080/api/camiones');
        setDatos(results.data);
    }
    

    return (
        <div className="camionesMenu-contenedor">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Placa</th>
                        <th>Detalle</th>
                    </tr>
                </thead>
                <tbody>
                    {datos.map((dato) => (
                        <tr key={dato.id_cam}>
                            <td>{dato.id_cam}</td>
                            <td>{dato.placa_cam}</td>
                            <Link to='/prueba3' className="linkes"><Button variant="success">Ver detalles</Button></Link>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}