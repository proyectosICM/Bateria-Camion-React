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
import { ArranqueEmpresaxCamionURL, IncidenciasxCamionSR, bateriaxcamionURL } from "../API/apiurls";
import { useListarElementos } from "../API/apiCRUD";

export function CamionesItem({ id, placa }) {
  const [baterias, setBaterias] = useState([]);
  const [incidencias, setIncidencias] = useState([]);
  const [icono, setIcono] = useState([]);


  const token = localStorage.getItem("token");
  const empresa = localStorage.getItem("empresa");

  const [arranques, setArranques] = useState([]);

  const ListarArranques = useListarElementos(`${ArranqueEmpresaxCamionURL}${empresa}/${id}`);

  useEffect(() => {
    ListarArranques(setArranques);
  }, [ListarArranques, arranques]);
  
  const ListarBaterias = useCallback(async () => {
    try {
      const results = await axios.get(`${bateriaxcamionURL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBaterias(results.data);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        // Token expirado, redirigir al inicio de sesión
        // navigate("/login");
      } else {
        // Otro error, manejarlo adecuadamente
        console.error("Error al obtener los datos de las baterías:", error);
      }
    }
  }, [id, token]);

  const ListarIncidencias = useCallback(async () => {
    try {
      const results = await axios.get(`${IncidenciasxCamionSR}${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIncidencias(results.data);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        // Token expirado, redirigir al inicio de sesión
        // navigate("/login");
      } else {
        // Otro error, manejarlo adecuadamente
        console.error("Error al obtener las incidencias:", error);
      }
    }
  }, [id, token]);
  
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
        <Link to={`/arranques/${id}`}  className="linkes">
          <Button
            variant="success"
            className="botonItem"
          >
            {icono} Arranques {arranques ? arranques.length : 0 }
          </Button>
        </Link>
      </Card>
    </div>
  );
}
