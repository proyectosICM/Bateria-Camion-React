import { Button, Card } from "react-bootstrap";
import React from "react";
import { BsBatteryCharging, BsBuildingsFill } from 'react-icons/bs';
import { BsFillBusFrontFill } from 'react-icons/bs';
import { BsPersonVcard } from 'react-icons/bs';
import { FaMapSigns, FaTruckMoving } from 'react-icons/fa';
import { TbBusStop } from 'react-icons/tb';
import { SiGooglemaps } from 'react-icons/si';
import { AiOutlineUserSwitch } from 'react-icons/ai';
import { Link } from "react-router-dom";
import './menuCRUD.css';

export function MenuCRUD() {

    const tablas = ["Empresas", "Camiones", "Trabajadores", "Baterias"];
    const iconos = [BsBuildingsFill, FaTruckMoving, BsPersonVcard, BsBatteryCharging];
    const rutas = ['/empresasCRUD', '/camionesCRUD', '/trabajadoresCRUD', '/rutasCRUD'];

    return (
        <div className="container-crud">
                {tablas.map((tabla, index) => (
                    <Card className="crud-card" key={index}>
                        <Card.Body>
                            <div className="icon-container">
                                {React.createElement(iconos[index], { className: "icon-class" })}
                            </div>
                            <Card.Title>{tabla}</Card.Title>
                            <Card.Text>Crear, editar y eliminar {tabla}</Card.Text>
                            <Link to={rutas[index]}>
                                <Button variant="primary" className="btn-l">IR</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                ))};
        </div>
    );
}
