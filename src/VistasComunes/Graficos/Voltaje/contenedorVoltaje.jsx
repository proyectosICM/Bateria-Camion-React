import React, { useEffect } from "react";
import { GraficoVoltajeB1 } from "./gvoltajeb1";
import { useListIdBat } from "../../../Hooks/useListIdBat";
import { Card } from "react-bootstrap";

export function ContenedorVoltaje({ idc, rango, propiedad }) {
  const token = localStorage.getItem("token");
  const { idbat, ListIdBat } = useListIdBat(idc, token);

  useEffect(() => {
    ListIdBat();
  }, [ListIdBat]);

  console.log("sd",idbat )

  return (
    <div className="contenedor-voltaje">
      {propiedad === "arranque" ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <GraficoVoltajeB1 idc={idc} rango={rango} propiedad={propiedad} />
        </div>
      ) : (
        <div className="subcajades">
          {idbat.map((id) => (
            <GraficoVoltajeB1
              key={id}
              idBat={id}
              idc={idc}
              rango={rango}
              propiedad={propiedad}
            />
          ))}
        </div>
      )}
    </div>
  );
}
