import React from "react";
import { ContenedorVoltaje } from "./Voltaje/contenedorVoltaje";
import { ContenedorCarga } from "./Carga/contenedorCarga";
import { ContenedorCorriente } from "./Corriente/contenedorCorriente";

export function GraficosFiltrados({ idc, g }) {
  return (
    <div>
      <h1>Registros del dia</h1>
      <div>
        {g == "v" && <ContenedorVoltaje idc={idc} />}
        {g == "c" && <ContenedorCarga idc={idc} />}
        {g == "cv" && <ContenedorCorriente idc={idc} />}
      </div>
      <h1>Registros de la semana</h1>
      <div>
        {g == "v" && <ContenedorVoltaje idc={idc} />}
        {g == "c" && <ContenedorCarga idc={idc} />}
        {g == "cv" && <ContenedorCorriente idc={idc} />}
      </div>
      <h1>Registros del mes</h1>
      <div>
        {g == "v" && <ContenedorVoltaje idc={idc} />}
        {g == "c" && <ContenedorCarga idc={idc} />}
        {g == "cv" && <ContenedorCorriente idc={idc} />}
      </div>
    </div>
  );
}
