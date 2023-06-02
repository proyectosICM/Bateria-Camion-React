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
const tbateria2 = [30.2,20.3,25.5,30.2,20.3,25.5,30.2,20.3,15.8];
const tbateria3 = [28.2,23.3,29.5,16.2,17.3,13.5,32.2,29.3,16.8];
const tbateria4 = [16.2,23.3,24.5,16.2,22.3,15.5,35.2,29.3,18.8];

const data = {
  labels,
  datasets: [
    {
      label: "Bateria 1",
      data: tbateria1,
      borderColor: "rgba(195, 0, 51)",
      backgroundColor: "rgba(195, 0, 51)",
    },
    {
      label: "Bateria 2",
      data: tbateria2,
      borderColor: "rgba(70, 255, 51)",
      backgroundColor: "rgba(70, 255, 51)",
    },
    {
      label: "Bateria 3",
      data: tbateria3,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235)',
    },
    {
      label: "Bateria 4",
      data: tbateria4,
      borderColor: "rgba(195, 0, 248)",
      backgroundColor: "rgba(195, 0, 248)",
    }
  ],
};
export function GraficoTemperaturaT(){
    return <Line options={options} data={data} />;
}