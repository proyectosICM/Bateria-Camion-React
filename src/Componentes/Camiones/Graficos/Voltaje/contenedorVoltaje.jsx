import React from "react";
import { GraficoVoltajeT } from "./graficoVoltajeT";
import { GraficoVoltajeB1 } from "./gvoltajeb1";
import { GraficoVoltajeB2 } from "./gvoltajeb2";
import { GraficoVoltajeB3 } from "./gvoltajeb3";
import { GraficoVoltajeB4 } from "./gvoltajeb4";

export function ContenedorVoltaje(){
    return(
        <div className="cajades">
            <GraficoVoltajeT />
            <div className="subcajades">
                <GraficoVoltajeB1 />
                <GraficoVoltajeB2 />
                <GraficoVoltajeB3 />
                <GraficoVoltajeB4 />
            </div>
        </div>
    );
}