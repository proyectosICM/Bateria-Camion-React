import React from "react";
import { Button } from "react-bootstrap";
import { BsFillCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import { GrEdit } from 'react-icons/gr';

export function BotonesDeGestion({ ide, estado, dato, edit, deshabilitar, habilitar }) {

    return (
        <>
            <Button variant="success" className="gestion" onClick={() => edit(dato)}><GrEdit /> Editar</Button>
            <Button
                variant={dato[estado] ? "warning" : "primary"}
                className="gestion" 
                onClick={() => {
                    if (dato[estado]) {
                        deshabilitar(dato[ide]);
                    } else {
                        habilitar(dato[ide]);
                    }
                }}
            >
                {dato[estado] ? <BsXCircleFill />  : <BsFillCheckCircleFill />}
                {dato[estado] ? " Deshabilitar" : " Habilitar"}
            </Button>
        </>
    );
}