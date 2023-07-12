import React, { useEffect, useState } from 'react';
import { useListarElementos } from '../../../API/apiCRUD';
import { ArranqueEmpresaxCamionURL, ArranquexCamionURL } from '../../../API/apiurls';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useBack } from '../../../Hooks/useBack';
import { useNotAuthorized, useNotAuthorizedInc } from '../../../Hooks/useNotAuthorized';
import { ContenedorVoltaje } from '../Voltaje/contenedorVoltaje';

export function ContenedorArranque() {
  const { id_cam } = useParams();
  const token = localStorage.getItem('token');
  const empresa = localStorage.getItem('empresa');
  const rol = localStorage.getItem('rol');

  const [vdatos, setvDatos] = useState([]);

  const ListarArranques = useListarElementos(
    `${ArranquexCamionURL}${id_cam}`
  );

  useEffect(() => {
    ListarArranques(setvDatos);
  }, [ListarArranques]);

  const handleBack = useBack({ rutac: '/detalles', rutaop: `/menuCamion/${empresa}` });
  const navigate = useNavigate();

  useEffect(() => {
    if (vdatos.length > 0) {
      if (rol === 'CONDUCTOR') {

      } else if (rol === 'SUPERVISOR' && empresa != vdatos[0].empresasModel.id_emp) {
        navigate('/notAuthorized');
      } else if (rol === 'ADMINISTRADOR' && empresa != vdatos[0].empresasModel.id_emp) {
        navigate('/notAuthorized');
      }
    }
  }, [vdatos, empresa, navigate, rol]);

  const dia = "dias";
  const semana = "semana";
  const mes = "mes";
  const year = "year";

  const [d, setD] = useState([]);
  const [s, setS] = useState([]);
  const [sl, setSL] = useState([]);
  const [m, setM] = useState([]);
  const [ml, setML] = useState([]);

  let i = 0;
  let j = 0;
  useEffect(() => {
    if (vdatos && vdatos.length > 0) {
      let filteredData = [];
      let labels = [];
      let atributo = [];
      let atributo2 = [];
      let color = '';

      const lastDay = vdatos[vdatos.length - 1].dia;
      setD(vdatos.filter((dato) => dato.dia === lastDay));

      //Semana
      const uniqueDays = new Set();
      const filteredDays = vdatos.filter((dato) => {
        const date = new Date(dato.dia);
        const dateString = date.toDateString();
        if (!uniqueDays.has(dateString)) {
          uniqueDays.add(dateString);
          return true;
        }
        return false;
      });

      // Ordena los datos filtrados por fecha en orden descendente
      filteredDays.sort((a, b) => b.dia - a.dia);

      // Toma los primeros 7 días
      const lastSevenDays = filteredDays.slice(0, 7);


      atributo = lastSevenDays.map((day) => {
        const dayData = vdatos.filter((dato) => dato.dia === day.dia);
        const Values = dayData.map((dato) => dato.corriente);
        return Values;
      }).reverse();
      setSL(atributo)
      //

      //28 dias
      const uniqueDays2 = new Set();
      const filteredDays28 = vdatos.filter((dato) => {
        const date = new Date(dato.dia);
        const dateString = date.toDateString();
        if (!uniqueDays2.has(dateString)) {
          uniqueDays2.add(dateString);
          return true;
        }
        return false;
      });


      // Ordena los datos filtrados por fecha en orden descendente
      filteredDays28.sort((a, b) => b.dia - a.dia);

      // Toma los primeros 7 días
      const lastSevenDays28 = filteredDays28.slice(0, 28);


      atributo2 = lastSevenDays28.map((day) => {
        const dayData = vdatos.filter((dato) => dato.dia === day.dia);
        const Values = dayData.map((dato) => dato.corriente);
        return Values;
      }).reverse();
      setML(atributo2);

    }
  }, [vdatos]);


  sl.map((dato) => {
    i = dato.length + i;
  });

  ml.map((dato) => {
    j = dato.length + j;
  });


  return (
    <div className="camionesMenu-contenedor">
      <div className="orden">
        <Button onClick={handleBack}>Atras</Button>
        <h1>Arranques totales: </h1>
        <div>
          <h1>Arranques del dia: {d.length} </h1>
          <div>
            <ContenedorVoltaje idc={id_cam} rango={dia} propiedad={"arranque"} />
          </div>
          <h1>Arranques de la semana: {i ? i : "0"}</h1>
          <div>
            <ContenedorVoltaje idc={id_cam} rango={semana} propiedad={"arranque"} />
          </div>
          <h1>Arranques del mes (ultimos 28 dias): {j ? j : "0"}</h1>
          <div>
            <ContenedorVoltaje idc={id_cam} rango={mes} propiedad={"arranque"} />
          </div>
          <h1>Arranques del año {m.length}</h1>
          <div>
            <ContenedorVoltaje idc={id_cam} rango={year} propiedad={"arranque"} />
          </div>
        </div>
      </div>
    </div>
  );
}
