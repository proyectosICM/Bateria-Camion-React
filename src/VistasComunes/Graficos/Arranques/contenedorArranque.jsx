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

  const [d, setD] = useState([])
  const [s, setS] = useState([])
  const [m, setM] = useState([])
  useEffect(() => {
    if (vdatos && vdatos.length > 0) {
      let filteredData = [];
      let labels = [];
      let atributo = [];
      let color = '';

      const lastDay = vdatos[vdatos.length - 1].dia;
      setD(vdatos.filter((dato) => dato.dia === lastDay));


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
        filteredData = filteredDays.slice(-7);
        //console.log(filteredDays)

  

      /*
      const last7Day = vdatos[vdatos.length - 1].dia;
      setS(vdatos.filter((dato) => dato.dia === lastDay));
      console.log(last7Day);
      */
      /*const lastSevenDays = vdatos[vdatos.length - 1].dia.slice(-7);
      const totalRecords = lastSevenDays.reduce((total, dato) => {
        if (dato.id && typeof dato.id === 'number') {
          return total + 1;
        } else {
          return total;
        }
      }, 0);
      setS(totalRecords);
      console.log(lastSevenDays);*/


      // Semana
      //const uniqueDays = new Set();
      /*const filteredDays = vdatos.filter((dato) => {
        const date = new Date(dato.dia);
        const dateString = date.toDateString();
        if (!uniqueDays.has(dateString)) {
          uniqueDays.add(dateString);
          return true;
        }
        return false;
      });
      const totalRegistrosSemana = filteredDays.reduce((total, dato) => total + 1, 0);
      setS(filteredDays);
      console.log(s);*/
      
      //Mes
      const uniqueDays2 = new Set();
      const filteredDays2 = vdatos.filter((dato) => {
        const date2 = new Date(dato.dia);
        const monthYearString = date2.toLocaleDateString(undefined, {
          month: "numeric",
          year: "numeric",
        });
        if (!uniqueDays.has(monthYearString)) {
          uniqueDays.add(monthYearString);
          return true;
        }
        return false;
      });
      filteredData = filteredDays2;
      setM(filteredDays2.length);

    }
  }, [vdatos]);

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
          <h1>Arranques de la semana: {s.length}</h1>
          <div>
            <ContenedorVoltaje idc={id_cam} rango={semana} propiedad={"arranque"} />
          </div>
          <h1>Arranques del mes: {m.length}</h1>
          <div>
            <ContenedorVoltaje idc={id_cam} rango={mes} propiedad={"arranque"} />
          </div>
        </div>
      </div>
    </div>
  );
}
