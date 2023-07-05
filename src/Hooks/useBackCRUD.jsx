import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

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

export function BotonMenu() {
  return (
    <>
      <Link to={"/menuCRUD"} className="linkes">
        <Button>Atras</Button>
      </Link>
    </>
  );
}
