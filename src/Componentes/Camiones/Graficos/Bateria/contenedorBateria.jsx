import React, { useCallback, useEffect, useState } from "react";
import { GraficobBateriaT } from "./graficoBateriaT";
import { GraficoCargaB1 } from "./gcargab1";
import { GraficoCargaB2 } from "./gcargab2";

import axios from "axios";
import { bateriaTURL, bateriaxcamionURL } from "../../../../API/apiurls";

export function ContenedorBateria({ idc }) {
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
            {/*<GraficobBateriaT /> */}
            <div className="subcajades">
                {idbat.map((id) => (
                    <GraficoCargaB1
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