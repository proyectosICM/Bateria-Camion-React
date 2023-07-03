import React, { useEffect } from "react";
import { GraficoVoltajeB1 } from "./gvoltajeb1";
import { useListIdBat } from "../../../Hooks/useListIdBat";



export function ContenedorVoltaje({ idc }) {

  const token = localStorage.getItem('token');

  const { idbat, ListIdBat } = useListIdBat(idc, token);

  useEffect(() => {
    ListIdBat();
  }, [ListIdBat]);



  return (
    <div className="cajades">
      <div className="subcajades">
        {idbat.map((id) => (
          <GraficoVoltajeB1
            key={id}
            idBat={id}
            idc={idc}
          />
        ))}
      </div>
    </div>
  );
}
