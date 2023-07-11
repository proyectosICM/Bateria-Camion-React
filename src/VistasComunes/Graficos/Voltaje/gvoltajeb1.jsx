import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useListVDatos } from './../../../Hooks/useListVDatos';
import { useListarElementos } from '../../../API/apiCRUD';
import { ArranquexCamionURL, bateriaTURL } from '../../../API/apiurls';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function GraficoVoltajeB1({ idBat, idc, rango, propiedad }) {
  const token = localStorage.getItem('token');
  const [datos, setDatos] = useState([]);
  const [vdatos, setvDatos] = useState([]);

  const ListarArranques = useListarElementos(
    `${ArranquexCamionURL}${idc}`
  );

  const ListVDatos = useListarElementos(
    `${bateriaTURL}${idBat}`
  );

  const [data, setData] = useState(null);

  useEffect(() => {
    if (propiedad === 'arranque') {
      ListarArranques(setvDatos);
    } else {
      ListVDatos(setvDatos);
    }
  }, [idBat, idc, ListarArranques, ListVDatos, propiedad, token]);

  let titulo = '';

  if (propiedad === "voltaje") {
    titulo = 'Voltaje v';
  } else if (propiedad === "carga") {
    titulo = 'Carga %';
  } else if (propiedad === "corriente") {
    titulo = 'Corriente v';
  }

  useEffect(() => {
    if (vdatos && vdatos.length > 0) {
      let filteredData = [];
      let labels = [];
      let atributo = [];
      let color = '';

      if (propiedad === "voltaje") {
        atributo = vdatos.map((dato) => dato.voltaje);
        color = 'rgba(195, 0, 51)';
      } else if (propiedad === "carga") {
        atributo = vdatos.map((dato) => dato.carga);
        color = 'rgba(70, 255, 51)';
      } else if (propiedad === "corriente") {
        atributo = vdatos.map((dato) => dato.corriente);
        color = 'rgba(195, 0, 251)';
      } else if (propiedad === "arranque") {
        atributo = vdatos.map((dato) => dato.corriente);
        color = 'rgba(195, 0, 251)';
      }

      if (rango === "detalles") {
        filteredData = vdatos.slice(-5);
        labels = filteredData.map((dato) => dato.hora);
      } else if (rango === "dias") {
        const lastDay = vdatos[vdatos.length - 1].dia;
        filteredData = vdatos.filter((dato) => dato.dia === lastDay);
        labels = filteredData.map((dato) => dato.hora);
      } else if (rango === "semana") {
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
        labels = filteredData.map((dato) => {
          const timestamp = dato.dia;
          const date = new Date(timestamp);
          return date.toLocaleDateString();
        });
      } else if (rango === "mes") {
        const uniqueDays = new Set();
        const filteredDays = vdatos.filter((dato) => {
          const date = new Date(dato.dia);
          const monthYearString = date.toLocaleDateString(undefined, {
            month: "numeric",
            year: "numeric",
          });
          if (!uniqueDays.has(monthYearString)) {
            uniqueDays.add(monthYearString);
            return true;
          }
          return false;
        });
        filteredData = filteredDays;
        labels = filteredData.map((dato) => {
          const timestamp = dato.dia;
          const date = new Date(timestamp);
          return date.toLocaleDateString();
        });
      } else if (rango === "anio") {
        // Lógica para el rango "anio" si es necesario
      }

      setData({
        labels,
        datasets: [
          {
            label: `Bateria con id ${idBat}`,
            data: atributo,
            borderColor: color,
            backgroundColor: color,
          },
        ],
      });
    }
  }, [vdatos, rango, idBat, propiedad]);

  if (!data) {
    return null; // O muestra un mensaje de carga, por ejemplo
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: titulo,
      },
    },
  };

  return (
    <div className="tb">
      <Line options={options} data={data} />
    </div>
  );
}
