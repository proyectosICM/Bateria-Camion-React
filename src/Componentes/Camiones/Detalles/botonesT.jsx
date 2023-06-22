import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { BsEyeSlashFill } from 'react-icons/bs';

export function BotonesT({ handleMostrarTabla }) {
    return (
        <div>
            <ButtonGroup className="bt-g">
                <Button variant="warning" onClick={() => handleMostrarTabla("bateria1")}>
                    Bateria 1
                </Button>
                <Button variant="danger" onClick={() => handleMostrarTabla("bateria2")}>
                    Bateria 2
                </Button>
                <Button variant="success" onClick={() => handleMostrarTabla("bateria3")}>
                    Bateria 3
                </Button>
                <Button variant="success" onClick={() => handleMostrarTabla("bateria4")}>
                    Bateria 4
                </Button>
                <Button variant="warning" onClick={() => handleMostrarTabla("carga")}>
                    <BsEyeSlashFill /> Ocultar
                </Button>
            </ButtonGroup>
        </div>
    );
}
