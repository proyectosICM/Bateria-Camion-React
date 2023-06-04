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
      text: 'Voltaje V',
    },
  },
};

const labels = ["12:30:00", "13:30:00","14:30:00","15:30:00", "16:30:00","17:30:00","18:30:00", "19:30:00","20:30:00"];
const tbateria1 = [12.5,12.2,12.3,12.5,12.2,12.3,12.5,12.2,10.3];
const tbateria2 = [12.2,12.3,12.5,12.2,12.3,12.5,12.2,12.3,12.8];
const tbateria3 = [11.8,11.3,12.5,12.4,11.3,11.5,12.5,11.3,14.8];
const tbateria4 = [10.9,11.4,14.2,12.1,11.4,11.4,12.3,11.9,12.4];

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
export function GraficoVoltajeT(){
    return <Line options={options} data={data} />;
}