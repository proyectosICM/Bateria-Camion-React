import React, { useCallback, useEffect, useState } from "react";
import { bateriaTURL } from "../../../../API/apiurls";
import { useNavigate } from "react-router-dom";
import { GraficoCargaB1 } from "./gcargab1";
import { useListIdBat } from "../../../../Hooks/useListIdBat";
import axios from "axios";


export function ContenedorBateria({ idc }) {
  const [datos, setDatos] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const { idbat, ListIdBat } = useListIdBat(idc, token);
 
  useEffect(() => {
    ListIdBat();
  }, [ListIdBat]);

  return (
    <div className="cajades">
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
