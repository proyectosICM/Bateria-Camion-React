import React from "react";
import { GraficoTemperaturaT } from "./graficoTemperaturaT";
import { GraficoTemperaturaB1 } from "./gtemperaturab1";
import { GraficoTemperaturaB2 } from "./gtemperaturab2";
import { GraficoTemperaturaB3 } from "./gtemperaturab3";
import { GraficoTemperaturaB4 } from "./gtemperaturab4";


export function ContenedorTemperatura() {
    return (
        <div className="cajades">
            <GraficoTemperaturaT />
            <div className="subcajades">
                <GraficoTemperaturaB1 />
                <GraficoTemperaturaB2 />
                <GraficoTemperaturaB3 />
                <GraficoTemperaturaB4 />
            </div>

        </div>
    );
}