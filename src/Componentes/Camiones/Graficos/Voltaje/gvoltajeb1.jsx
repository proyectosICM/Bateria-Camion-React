import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

export function GraficoVoltajeB1({ idc, datos }) {
  //console.log(datos);

  // Extraer los valores de voltaje de cada objeto en el arreglo datos
  const tbateria1 = datos.map((dato) => dato.voltaje);
  const labelsx = datos.map((dato) => {
    const timestamp = dato.dia;
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  });

  const labels = datos.map((dato) => dato.hora);

  const data = {
    labels,
    datasets: [
      {
        label: "Bateria 1",
        data: tbateria1,
        borderColor: "rgba(195, 0, 51)",
        backgroundColor: "rgba(195, 0, 51)"
      }
    ]
  };

  const options = {
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
    scales: {
      y: {

        min: 0,
        max: 30
      }
    }
  };

  return (
    <div className='tb'>
      <Line options={options} data={data} />
    </div>
  );
}
