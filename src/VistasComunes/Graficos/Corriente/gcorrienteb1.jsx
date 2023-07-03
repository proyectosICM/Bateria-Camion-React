import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';
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
      text: 'Corriente v',
    },
  },
};

export function GraficoCorrienteB1({ idBat, idc }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const { vdatos, ListVDatos } = useListVDatos(idBat, idc, token);

  useEffect(() => {
    ListVDatos();
  }, [ListVDatos,vdatos]);

  if (!vdatos || vdatos.length === 0) {
    return null; // O muestra un mensaje de carga, por ejemplo
  }

 
  const tbateria1 = vdatos.map((dato) => dato.corriente);
  const labelsx = vdatos.map((dato) => {
    const timestamp = dato.dia;
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  });

  const labels = vdatos.map((dato) => dato.hora);

  const data = {
    labels,
    datasets: [
      {
        label: `Bateria con id ${idBat}`,
        data: tbateria1,
        borderColor: 'rgba(70, 255, 51)',
        backgroundColor: 'rgba(70, 255, 51)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Corriente v',
      },
    },
    scales: {
      y: {
        min: 0,
        max: 80,
      },
    },
  };

  return (
    <div className='tb'>
      <Line options={options} data={data} />
    </div>
  );
}
