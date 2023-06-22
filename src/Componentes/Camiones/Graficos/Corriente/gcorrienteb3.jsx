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
      text: 'Corriente V',
    },
  },
};

const labels = ["12:30:00", "13:30:00","14:30:00","15:30:00", "16:30:00","17:30:00","18:30:00", "19:30:00","20:30:00"];
const tbateria3 = [28.2,23.3,29.5,16.2,17.3,13.5,32.2,29.3,16.8];

const data = {
    labels,
    datasets: [
        {
            label: "Bateria 3",
            data: tbateria3,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235)',
        }
    ],
};
export function GraficoCorrienteB3() {
  return(
    <div className='tb'>
      <Line options={options} data={data} />;
    </div>
  ); 
}