import React, { useEffect, useState } from "react";
import { useListarElementos } from "../../../API/apiCRUD";
import {
  ArranqueConteoxYear,
  ArranqueEmpresaxCamionURL,
  ArranquePromedioDiaxMes,
  ArranqueUltimoDia,
  ArranquexCamionURL,
} from "../../../API/apiurls";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useBack } from "../../../Hooks/useBack";
import {
  useNotAuthorized,
  useNotAuthorizedInc,
} from "../../../Hooks/useNotAuthorized";
import { ContenedorVoltaje } from "../Voltaje/contenedorVoltaje";

export function ContenedorArranque({ c }) {
  const { id_cam } = useParams();
  const token = localStorage.getItem("token");
  const empresa = localStorage.getItem("empresa");
  const rol = localStorage.getItem("rol");

  const [vdatos, setvDatos] = useState([]);
  const [arranquexY, setArranquexY] = useState([]);

  const ListarArranques = useListarElementos(`${ArranquexCamionURL}${id_cam}`);

  const [diaxMes, setDiaxMes] = useState([]);
  
  const [arranquesdia, setArranquesdia] = useState([]);

  const ListarConteoxYear = useListarElementos(
    `${ArranqueConteoxYear}${id_cam}`
  );
  const ListarArranquesMes = useListarElementos(
    `${ArranquePromedioDiaxMes}${id_cam}`
  );
  const ListarArranquesDia = useListarElementos(
    `${ArranqueUltimoDia}${id_cam}`
  );

  useEffect(() => {
    console.log("chaszzzasaasas");
    ListarArranques(setvDatos);
    ListarConteoxYear(setArranquexY);
    ListarArranquesMes(setDiaxMes);
    ListarArranquesDia(setArranquesdia);
  }, [ListarArranques, ListarConteoxYear, ListarArranquesMes, ListarArranquesDia]);


  let r;
  if (c != undefined) {
    r = `/detallesc/${id_cam}`;
  } else {
    r = `/menuCamion/${empresa}`;
  }

  const handleBack = useBack({ rutac: "/detalles", rutaop: r });
  const navigate = useNavigate();

  useEffect(() => {
    if (vdatos.length > 0) {
      if (rol === "CONDUCTOR") {
      } else if (
        rol === "SUPERVISOR" &&
        empresa != vdatos[0].empresasModel.id_emp
      ) {
        navigate("/notAuthorized");
      } else if (
        rol === "ADMINISTRADOR" &&
        empresa != vdatos[0].empresasModel.id_emp
      ) {
        navigate("/notAuthorized");
      }
    }
  }, [vdatos, empresa, navigate, rol]);

  const [d, setD] = useState([]);
  const [s, setS] = useState([]);

  const [m, setM] = useState([]);


  useEffect(() => {

      let filteredData = [];
      let labels = [];
      let atributo = [];
      let atributo2 = [];
      let color = "";

  
      setD(arranquesdia);

      let semana = diaxMes
        .slice(-7)
        .reduce((suma, dato) => suma + dato.contador, 0);
      setS(semana);

      let mes = diaxMes.reduce((suma, dato) => suma + dato.contador, 0);
      setM(mes);
    }, [arranquesdia, diaxMes]);


  return (
    <div className="camionesMenu-contenedor">
      <div className="orden">
        <Button style={{ width: "100%" }} onClick={handleBack}>
          Atras
        </Button>
        <h1>Arranques totales: </h1>
        <div>
          <h1>Arranques del dia: {arranquesdia.length} </h1>
          <div>
            <ContenedorVoltaje
              idc={id_cam}
              rango={"dias"}
              propiedad={"arranque"}
            />
          </div>
          <h1>Arranques de la semana: {s}</h1>
          <div>
            <ContenedorVoltaje
              idc={id_cam}
              rango={"semana"}
              propiedad={"arranque"}
            />
          </div>
          <h1>Arranques del mes: {m ? m : "0"}</h1>
          <div>
            <ContenedorVoltaje
              idc={id_cam}
              rango={"mes"}
              propiedad={"arranque"}
            />
          </div>
          <h1>
            Arranques del año{" "}
            {arranquexY.length > 0
              ? [arranquexY[arranquexY.length - 1].conteo]
              : "0"}
          </h1>
          <div>
            <ContenedorVoltaje
              idc={id_cam}
              rango={"year"}
              propiedad={"arranque"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
