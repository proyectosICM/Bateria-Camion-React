import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import './menuEmpresas.css';
import { empresasHURL } from "../../API/apiurls";


const token = localStorage.getItem("token");

export function MenuEmpresas({ ruta }) { 
    const [datos, setDatos] = useState([]);

    const ListarDatos = useCallback(async () => {
        try {
            const response = await axios.get(`${empresasHURL}`, {
                headers: {
                  Authorization: `Bearer ${token}`, // Agregar el token en el encabezado de la solicitud
                },
              })
            setDatos(response.data);
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        ListarDatos();
    }, [ListarDatos]);

    return (
        <div className="container-crud">
            {datos.map((dato, index) => (
                <Card className="crud-card" key={index}>
                    <Card.Body>
                        <Card.Title>{dato.nom_emp}</Card.Title>
                        <Card.Text>Ver todos los trabajadores</Card.Text>
                        <Link to={`${ruta}/${dato.id_emp}`}>
                            <Button variant="primary" className="btn-l">IR</Button>
                        </Link>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}
