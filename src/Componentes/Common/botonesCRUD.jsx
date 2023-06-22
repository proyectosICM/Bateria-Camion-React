import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { BsArrowLeftCircle, BsCheck, BsPlusCircleFill, BsX } from 'react-icons/bs';
import './botonesCRUD.css';
import { Link } from "react-router-dom";
import { FaClipboardList } from "react-icons/fa";

export function BotonesCRUD({ activador, retroceder, btnTabla, abrir }) {

    return (
        <>
            <ButtonGroup className="tabla-buttons">
                <Link to={retroceder}>
                    <Button variant="warning" >
                        <BsArrowLeftCircle /> Atras
                    </Button>
                </Link>
                <Button variant="primary" onClick={() => activador("Habilitados")} className={btnTabla === "Habilitados" ? "active" : ""}>
                    <BsCheck className="button-icon" /> Mostrar Habilitados
                </Button>
                <Button variant="primary" onClick={() => activador("Deshabilitados")} className={btnTabla === "Deshabilitados" ? "active" : ""}>
                    <BsX className="button-icon" /> Mostrar Deshabilitados
                </Button>
                <Button variant="primary" onClick={() => activador("Todos")} className={btnTabla === "Todos" ? "active" : ""}>
                    <FaClipboardList /> Mostrar Todos
                </Button>
                <Button variant="success" onClick={() => abrir()}>
                    <BsPlusCircleFill />
                </Button>
            </ButtonGroup>
        </>

    );
}