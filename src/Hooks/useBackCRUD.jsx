import { useEffect, useState } from "react";

export function useBackCRUD(rut) {
  const [rol, setRol] = useState(localStorage.getItem("rol"));
  const [ruta, setRuta] = useState();

  useEffect(() => {
    if (rol === "SISTEMAS") {
      setRuta(rut);
    } else {
      setRuta(`/menuCRUD`);
    }
  }, [rol]);

  return ruta;
}
