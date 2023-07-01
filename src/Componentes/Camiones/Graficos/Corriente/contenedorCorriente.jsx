import React, { useCallback, useEffect, useState } from "react";
import { GraficoCorrienteT, GraficoTemperaturaT } from "./graficoCorrienteT";
import { GraficoCorrienteB1 } from "./gcorrienteb1";
import { GraficoCorrienteB2 } from "./gcorrienteb2";
import { GraficoCorrienteB3 } from "./gcorrienteb3";
import { GraficoCorrienteB4 } from "./gcorrienteb4";
import axios from "axios";
import { bateriaTURL, bateriaxcamionURL } from "../../../../API/apiurls";
import { useListIdBat } from "../../../../Hooks/useListIdBat";


export function ContenedorCorriente({idc}) {
    const [datos, setDatos] = useState([]);

    const token = localStorage.getItem('token');

    const { idbat, ListIdBat } = useListIdBat(idc, token);

    return (
        <div className="cajades">
            {/* <GraficoCorrienteT /> */}
            <div className="subcajades">
                {idbat.map((id) => (
                    <GraficoCorrienteB1
                        key={id}
                        datos={datos.filter((dato) => dato.id_bat === id)}
                        idBat={id}
                        idc={idc}
                    />
                ))}
            </div>

        </div>
    );
}