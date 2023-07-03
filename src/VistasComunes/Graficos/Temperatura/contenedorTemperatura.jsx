import React from "react";
import { GraficoTemperaturaT } from "./graficoTemperaturaT";
import { GraficoTemperaturaB1 } from "./gtemperaturab1";



export function ContenedorTemperatura() {
    return (
        <div className="cajades">
            <GraficoTemperaturaT />
            <div className="subcajades">
                <GraficoTemperaturaB1 />
            </div>

        </div>
    );
}