import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export function useBack({rutac, rutaop}){
    const [ruta, setRuta] = useState();

    const  navigate = useNavigate();


    useEffect(() => {
        const rol = localStorage.getItem('rol');
        if (rol === "CONDUCTOR") {
            //setRuta(rutac);
            navigate(rutac);
          } else {
            //setRuta(rutaop);
            navigate(rutaop);
          }
    },[navigate])
}

/*
export function useBack(rutac, rutaop) {
  const navigate = useNavigate();

  useEffect(() => {
    const rol = localStorage.getItem('rol');
    if (rol === 'CONDUCTOR') {
      navigate(rutac);
    } else {
      navigate(rutaop);
    }
  }, [rutac, rutaop, navigate]);
}
*/