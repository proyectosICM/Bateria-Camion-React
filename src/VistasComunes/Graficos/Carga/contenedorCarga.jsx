import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraficoCargaB1 } from "./gcargab1";
import { useListIdBat } from './../../../Hooks/useListIdBat';


export function ContenedorCarga({ idc }) {

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
            idBat={id}
            idc={idc}
          />
        ))}
      </div>
    </div>
  );
}
