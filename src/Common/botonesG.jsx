import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { AiFillThunderbolt } from "react-icons/ai"
import { FaCarBattery } from 'react-icons/fa';
import { BsBatteryHalf, BsEyeSlashFill } from 'react-icons/bs';


export function BotonesG({ handleMostrarGrafico }) {
    return (
        <div>
            <h1>Gráficos</h1>
            <ButtonGroup className="bt-g">
                <Button variant='warning' className="bt-i" onClick={() => handleMostrarGrafico("voltaje")}>
                    <AiFillThunderbolt></AiFillThunderbolt>
                </Button>
                <Button variant='success' className="bt-i" onClick={() => handleMostrarGrafico("carga")}>
                    <BsBatteryHalf></BsBatteryHalf>
                </Button>
                <Button variant='danger' className="bt-i" onClick={() => handleMostrarGrafico("corriente")}>
                    <FaCarBattery></FaCarBattery>
                </Button>

                <Button variant='warning' className="bt-bto" onClick={() => handleMostrarGrafico("ocultar")}>
                   <BsEyeSlashFill></BsEyeSlashFill> Ocultar
                </Button>
            </ButtonGroup>
        </div>
    );
}