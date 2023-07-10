import React, { useEffect } from "react";
import { GraficoVoltajeB1 } from "./gvoltajeb1";
import { useListIdBat } from "../../../Hooks/useListIdBat";
import { Card } from "react-bootstrap";



export function ContenedorVoltaje({ idc, rango }) {

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
            rango={rango}
          />
        ))}
      </div>
    </div>
  );
}
