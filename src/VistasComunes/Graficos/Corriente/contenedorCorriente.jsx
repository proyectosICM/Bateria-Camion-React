import React, { useEffect } from "react";
import { GraficoCorrienteB1 } from "./gcorrienteb1";
import { useListIdBat } from "../../../Hooks/useListIdBat";


export function ContenedorCorriente({idc}) { 

    const token = localStorage.getItem('token');

    const { idbat, ListIdBat } = useListIdBat(idc, token);

    useEffect(() => {
        ListIdBat();
      }, [ListIdBat]);


    return (
        <div className="cajades">
            {/* <GraficoCorrienteT /> */}
            <div className="subcajades">
                {idbat.map((id) => (
                    <GraficoCorrienteB1
                        key={id}
                        idBat={id}
                        idc={idc}
                    />
                ))}
            </div>

        </div>
    );
}