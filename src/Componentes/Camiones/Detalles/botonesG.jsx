import React from "react";
import { Button } from "react-bootstrap";
import { AiFillThunderbolt } from "react-icons/ai"
import { FaTemperatureHigh } from 'react-icons/fa';
import { BsBatteryHalf } from 'react-icons/bs';


export function BotonesG({ handleMostrarGrafico }) {
    return (
        <div>
            <h1>Ver gráficos</h1>
            <Button variant='dark' className="bt-g">
                <Button variant='warning' className="bt-i" onClick={() => handleMostrarGrafico("voltaje")}>
                    <AiFillThunderbolt></AiFillThunderbolt>
                </Button>
                <Button variant='danger' className="bt-i" onClick={() => handleMostrarGrafico("temperatura")}>
                    <FaTemperatureHigh></FaTemperatureHigh>
                </Button>
                <Button variant='success' className="bt-i" onClick={() => handleMostrarGrafico("carga")}>
                    <BsBatteryHalf></BsBatteryHalf>
                </Button>
            </Button>
        </div>
    );
}