import React, { useCallback, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { AiFillThunderbolt } from "react-icons/ai";
import {
  BsBatteryHalf,
  BsExclamationCircleFill,
  BsFillCheckCircleFill,
  BsX,
  BsXCircleFill,
} from "react-icons/bs";
import { FaCarBattery } from "react-icons/fa";
import { IncidenciasxCamionSR, bateriaxcamionURL } from "../API/apiurls";

export function CamionesItem({ id, placa }) {
  const [baterias, setBaterias] = useState([]);
  const [incidencias, setIncidencias] = useState([]);
  const [icono, setIcono] = useState([]);

  const token = localStorage.getItem("token");

  const ListarBaterias = useCallback(async () => {
    const results = await axios.get(`${bateriaxcamionURL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setBaterias(results.data);
  });

  const ListarIncidencias = useCallback(async () => {
    const results = await axios.get(`${IncidenciasxCamionSR}${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setIncidencias(results.data);
  });

  useEffect(() => {
    ListarBaterias();
    ListarIncidencias();
  }, [ListarBaterias, ListarIncidencias]);

  useEffect(() => {
    // Actualiza el estado del icono basado en la longitud de incidencias
    if (incidencias.length > 0) {
      setIcono(<BsXCircleFill />);
    } else {
      setIcono(<BsFillCheckCircleFill />);
    }
  }, [incidencias]);

  return (
    <div className="camionesItem-contenedor">
      <Card style={{ height: "25rem" }}>
        <h1>Placa: {placa}</h1>
        {/* <img src={camionImage} alt="camion" /> */}
        <Card>
          {baterias.map((bateria, index) => (
            <Card style={{ fontWeight: "bold" }} key={index}>
              <Card.Body>
                Bateria: <AiFillThunderbolt />
                Voltaje {bateria.voltaje} v <BsBatteryHalf />
                Carga {bateria.carga} % <FaCarBattery />
                Corriente {bateria.corriente} v{" "}
              </Card.Body>
            </Card>
          ))}
        </Card>
        <Link to={`/detallesc/${id}`} className="linkes">
          <Button variant="success" className="botonItem">
            Ver detalles de registros
          </Button>
        </Link>
        <Link to={`/incidenciasxc/${id}`} className="linkes">
          <Button
            variant={incidencias.length > 0 ? "danger" : "success"}
            className="botonItem"
          >
            {icono} Incidencias {incidencias.length > 0 ? incidencias.length : 0}
          </Button>
        </Link>
      </Card>
    </div>
  );
}
