import React from "react";
import { ContenedorVoltaje } from "./Voltaje/contenedorVoltaje";
import { ContenedorCarga } from "./Carga/contenedorCarga";
import { ContenedorCorriente } from "./Corriente/contenedorCorriente";

export function GraficosFiltrados({ idc, g }) {
  const dia = "dia";
  const semana = "semana";
  const mes = "mes";
  return (
    <div>
      <h1>Registros del dia</h1>
      <div>
        {g == "v" && <ContenedorVoltaje idc={idc} rango={dia} />}
        {g == "c" && <ContenedorCarga idc={idc} rango={dia} />}
        {g == "cv" && <ContenedorCorriente idc={idc} rango={dia} />}
      </div>
      <h1>Registros de la semana</h1>
      <div>
        {g == "v" && <ContenedorVoltaje idc={idc} rango={semana} />}
        {g == "c" && <ContenedorCarga idc={idc} rango={semana} />}
        {g == "cv" && <ContenedorCorriente idc={idc} rango={semana} />}
      </div>
      <h1>Registros del mes</h1>
      <div>
        {g == "v" && <ContenedorVoltaje idc={idc} rango={mes} />}
        {g == "c" && <ContenedorCarga idc={idc} rango={mes} />}
        {g == "cv" && <ContenedorCorriente idc={idc} rango={mes} />}
      </div>
    </div>
  );
}
