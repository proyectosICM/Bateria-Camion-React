import { Button, Card } from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";
import "./menuCRUD.css";
import { NavBarSelect } from "../navbarSelect";
import { menuCRUDDataAS, menuCRUDDataAdmin } from "./arregloMenu";

export function MenuCRUD() {
  const rol = localStorage.getItem('rol');

  let tablas, iconos, rutas;

  if (rol === "SISTEMAS") {
    tablas = menuCRUDDataAS.tablas;
    iconos = menuCRUDDataAS.iconos;
    rutas = menuCRUDDataAS.rutas;
  } else if (rol === "ADMINISTRADOR") {
    tablas = menuCRUDDataAdmin.tablas;
    iconos = menuCRUDDataAdmin.iconos;
    rutas = menuCRUDDataAdmin.rutas;
  }

  return (
    <>
      <div className="camionesMenu-contenedor">
        {tablas.map((tabla, index) => (
          <Card className="crud-card" key={index}>
            <Card.Body>
              <div className="icon-container">
                {React.createElement(iconos[index], {
                  className: "icon-class",
                })}
              </div>
              <Card.Title>{tabla}</Card.Title>
              <Card.Text>Crear, editar y eliminar {tabla}</Card.Text>
              <Link to={rutas[index]}>
                <Button variant="primary" className="btn-l">
                  IR
                </Button>
              </Link>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
}
