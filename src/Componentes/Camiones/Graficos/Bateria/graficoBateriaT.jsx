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
const tbateria1 = [90,75,60,98,95,94,40,20,100];
const tbateria2 = [100,95,70,98,94,80,60,54,50];
const tbateria3 = [70,75,60,94,80,74,30,20,85];
const tbateria4 = [94,84,74,70,98,96,80,75,90];

const data = {
  labels,
  datasets: [
    {
      label: "Bateria 1",
      data: tbateria1,
      borderColor: "rgba(248, 0, 0)",
      backgroundColor: "rgba(248, 0, 0)",
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
export function GraficobBateriaT(){
    return <Line options={options} data={data} />;
}