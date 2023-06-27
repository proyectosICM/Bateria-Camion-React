import React, { useCallback, useEffect, useState } from "react";
import { GraficoCorrienteT, GraficoTemperaturaT } from "./graficoCorrienteT";
import { GraficoCorrienteB1 } from "./gcorrienteb1";
import { GraficoCorrienteB2 } from "./gcorrienteb2";
import { GraficoCorrienteB3 } from "./gcorrienteb3";
import { GraficoCorrienteB4 } from "./gcorrienteb4";
import axios from "axios";
import { bateriaTURL, bateriaxcamionURL } from "../../../../API/apiurls";


export function ContenedorCorriente({idc}) {
    const [datos, setDatos] = useState([]);
    const [idbat, setIdbat] = useState([]);
  
    const ListIdBat = useCallback(async () => {
      const results = await axios.get(`${bateriaxcamionURL}/${idc}`);
      const idBatArray = results.data.map((item) => item.id_bat);
      setIdbat(idBatArray);
    }, [idc]);
  
    const ListDatos = useCallback(async () => {
      const datosPromises = idbat.map(async (id) => {
        const results = await axios.get(`${bateriaTURL}/${idc}/${id}`);
        return results.data;
      });
  
      const datosArray = await Promise.all(datosPromises);
      const datosConcatenados = datosArray.flat();
  
      setDatos(datosConcatenados);
    }, [idbat, idc]);
  
    useEffect(() => {
      ListIdBat();
    }, [ListIdBat]);
  /*
    useEffect(() => {
      ListDatos();
    }, [ListDatos]);
  */
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