import React from "react";
import { Button } from "react-bootstrap";
import { AiFillThunderbolt } from "react-icons/ai"
import { FaTemperatureHigh } from 'react-icons/fa';
import { BsBatteryHalf, BsEyeSlashFill } from 'react-icons/bs';


export function BotonesT({ handleMostrarTabla }) {
    return (
        <div>
            <h1>Ver Tablas</h1>
            <Button variant='dark' className="bt-g">
                <Button variant='warning' className="bt-bt" onClick={() => handleMostrarTabla("bateria1")}>
                    Bateria 1
                </Button>
                <Button variant='danger' className="bt-bt" onClick={() => handleMostrarTabla("bateria2")}>
                    Bateria 2
                </Button>
                <Button variant='success' className="bt-bt" onClick={() => handleMostrarTabla("bateria3")}>
                    Bateria 3
                </Button>
                <Button variant='success' className="bt-bt" onClick={() => handleMostrarTabla("bateria4")}>
                    Bateria 4
                </Button>
                <Button variant='warning' className="bt-bto" onClick={() => handleMostrarTabla("carga")}>
                   <BsEyeSlashFill></BsEyeSlashFill> Ocultar
                </Button>
            </Button>
        </div>
    );
}