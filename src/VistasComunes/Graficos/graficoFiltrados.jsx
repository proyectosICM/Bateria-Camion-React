import React from "react";
import { ContenedorVoltaje } from "./Voltaje/contenedorVoltaje";
import { ContenedorCarga } from "./Carga/contenedorCarga";
import { ContenedorCorriente } from "./Corriente/contenedorCorriente";
 
export function GraficosFiltrados({ idc, g }) {
  const dia = "dias";
  const semana = "semana";
  const mes = "mes";
  return (
    <div>
      <h1>Registros del dia</h1>
      <div>
        {g == "v" && <ContenedorVoltaje idc={idc} rango={dia} propiedad={"voltaje"} />}
        {g == "c" && <ContenedorVoltaje idc={idc} rango={dia} propiedad={"carga"} />}
        {g == "cv" && <ContenedorVoltaje idc={idc} rango={dia} propiedad={"corriente"} />}
      </div>
      <h1>Registros de la semana</h1>
      <div>
        {g == "v" && <ContenedorVoltaje idc={idc} rango={semana} propiedad={"voltaje"} />}
        {g == "c" && <ContenedorVoltaje idc={idc} rango={semana} propiedad={"carga"} />}
        {g == "cv" && <ContenedorVoltaje idc={idc} rango={semana} propiedad={"corriente"} />}
      </div>
      <h1>Registros del mes</h1>
      <div>
        {g == "v" && <ContenedorVoltaje idc={idc} rango={mes} propiedad={"voltaje"} />}
        {g == "c" && <ContenedorVoltaje idc={idc} rango={mes} propiedad={"carga"} />}
        {g == "cv" && <ContenedorVoltaje idc={idc} rango={mes} propiedad={"corriente"} />}
      </div>
    </div>
  );
}
