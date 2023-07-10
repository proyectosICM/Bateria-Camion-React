import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useListVDatos } from './../../../Hooks/useListVDatos';


 
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Voltaje v',
    },
  },
};

export function GraficoVoltajeB1({ idBat, idc, rango }) {

  const token = localStorage.getItem('token');

  const { vdatos, ListVDatos } = useListVDatos(idBat, idc, token);
  const [dias, setDias] = useState("");

  useEffect(() => {
    ListVDatos();
    if (rango === "detalles") {
      setDias(-5);
    } else if (rango === "dias") {

    } else if (rango === "semana") {
      setDias(-7);
    } else if (rango === "mes") { 
      setDias(-30);
    } else if (rango === "anio") {

    }
  }, [ListVDatos, vdatos, rango]);

  if (!vdatos || vdatos.length === 0) {
    return null; // O muestra un mensaje de carga, por ejemplo
  }



  const tbateria1 = vdatos.slice(dias).map((dato) => dato.voltaje);
  const labelsx = vdatos.slice(dias).map((dato) => {
    const timestamp = dato.dia;
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  });

  const labels = vdatos.slice(dias).map((dato) => dato.hora);

  const data = {
    labels,
    datasets: [
      {
        label: `Bateria con id ${idBat}`,
        data: tbateria1,
        borderColor: 'rgba(195, 0, 51)',
        backgroundColor: 'rgba(195, 0, 51)',
      },
    ],
  };

  return (
    <div className="tb">
      <h1>{rango} {dias}</h1>
      <Line options={options} data={data} />
    </div>
  );
}
