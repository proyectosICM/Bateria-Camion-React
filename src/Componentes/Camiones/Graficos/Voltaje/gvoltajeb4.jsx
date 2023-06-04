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
const tbateria4 = [10.9,11.4,14.2,12.1,11.4,11.4,12.3,11.9,12.4];

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

export function GraficoVoltajeB4(){
    return(
      <div className='tb'>
        <Line options={options} data={data} />;
      </div>
    ); 
}