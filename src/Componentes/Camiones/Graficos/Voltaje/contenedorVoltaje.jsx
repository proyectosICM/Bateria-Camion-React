import React, { useEffect, useState } from "react";
import { GraficoVoltajeT } from "./graficoVoltajeT";
import { GraficoVoltajeB1 } from "./gvoltajeb1";
import { GraficoVoltajeB2 } from "./gvoltajeb2";
import { GraficoVoltajeB3 } from "./gvoltajeb3";
import { GraficoVoltajeB4 } from "./gvoltajeb4";
import { useCallback } from "react";
import axios from "axios";
import { bateria1URL, bateriaTURL, bateriaxcamionURL, camionURL, regisbat } from "../../../../API/apiurls";

export function ContenedorVoltaje({idc}){
    const [datos, setDatos] = useState([]);
    const [idbat, setIdbat] = useState([]);
  
    const ListIdBat = useCallback(async () => {
      const results = await axios.get(`${bateriaxcamionURL}/${idc}`);
      const idBatArray = results.data.map((item) => item.id_bat);
      setIdbat(idBatArray);
    },[]);
  
    const ListDatos = useCallback(async () => {
      const results = await axios.get(`${bateriaTURL}/${idc}/1`);
      setDatos(results.data);
    }, []);
  
    useEffect(() => {
      ListDatos();
      ListIdBat();
    },[ListDatos, ListIdBat]);
  
    console.log(idbat);
  
    return(
      <div className="cajades">
        <GraficoVoltajeT />
        <div className="subcajades">
          <GraficoVoltajeB1 datos={datos} />
          <GraficoVoltajeB2 />
          <GraficoVoltajeB3 />
          <GraficoVoltajeB4 />
        </div>
      </div>
    );
  }
  