import React from "react";
import { GraficoCorrienteT, GraficoTemperaturaT } from "./graficoCorrienteT";
import { GraficoCorrienteB1 } from "./gcorrienteb1";
import { GraficoCorrienteB2 } from "./gcorrienteb2";
import { GraficoCorrienteB3 } from "./gcorrienteb3";
import { GraficoCorrienteB4 } from "./gcorrienteb4";


export function ContenedorCorriente() {
    return (
        <div className="cajades">
            <GraficoCorrienteT />
            <div className="subcajades">
                <GraficoCorrienteB1 />
                <GraficoCorrienteB2 />
                <GraficoCorrienteB3 />
                <GraficoCorrienteB4 />
            </div>

        </div>
    );
}