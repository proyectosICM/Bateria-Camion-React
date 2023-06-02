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
      text: 'Temperatura ° C',
    },
  },
};

const labels = ["12:30:00", "13:30:00","14:30:00","15:30:00", "16:30:00","17:30:00","18:30:00", "19:30:00","20:30:00"];
const tbateria4 = [16.2,23.3,24.5,16.2,22.3,15.5,35.2,29.3,18.8];

const data = {
    labels,
    datasets: [
        {
            label: "Bateria 4",
            data: tbateria4,
            borderColor: "rgba(195, 0, 248)",
            backgroundColor: "rgba(195, 0, 248)",
          }
    ],
};
export function GraficoTemperaturaB4() {
  return (
    <div className='tb'>
      <Line options={options} data={data} />;
    </div>
  );
}