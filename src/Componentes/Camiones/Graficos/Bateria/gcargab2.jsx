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
      text: 'Carga %',
    },
  },
};


const labels = ["12:30:00", "13:30:00","14:30:00","15:30:00", "16:30:00","17:30:00","18:30:00", "19:30:00","20:30:00"];
const tbateria2 = [100,95,70,98,94,80,60,54,50];

const data = {
    labels,
    datasets: [
      {
        label: "Bateria 2",
        data: tbateria2,
        borderColor: "rgba(70, 255, 51)",
        backgroundColor: "rgba(70, 255, 51)",
      }
    ],
  };

  
  
export function GraficoCargaB2(){
    return(
      <div className='tb'>
        <Line options={options} data={data} />;
      </div>
    ); 


}