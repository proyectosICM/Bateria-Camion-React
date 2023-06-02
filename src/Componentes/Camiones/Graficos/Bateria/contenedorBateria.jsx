import React from "react";
import { GraficobBateriaT } from "./graficoBateriaT";
import { GraficoCargaB1 } from "./gcargab1";
import { GraficoCargaB2 } from "./gcargab2";
import { GraficoCargaB3 } from "./gcargab3";
import { GraficoCargaB4 } from "./gcargab4";

export function ContenedorBateria(){
    return(
        <div className="cajades">
            <GraficobBateriaT />
            <div className="subcajades">
                <GraficoCargaB1 />
                <GraficoCargaB2 />
                <GraficoCargaB3 />
                <GraficoCargaB4 />
            </div>
        </div>
    );
}