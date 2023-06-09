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
const tbateria1 = [25.5,30.2,20.3,25.5,30.2,20.3,25.5,30.2,20.3];

const data = {
  labels,
  datasets: [
    {
      label: "Bateria 1",
      data: tbateria1,
      borderColor: "rgba(195, 0, 51)",
      backgroundColor: "rgba(195, 0, 51)",
    }
  ],
};

export function GraficoTemperaturaB1(){
    return(
      <div className='tb'>
        <Line options={options} data={data} />;
      </div>
    ); 


}