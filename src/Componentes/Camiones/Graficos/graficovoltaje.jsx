import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Calculo de voltaje",
    },
  },
};

const labels = ["12:30:00", "13:30:00","14:30:00"];
const dataset1Data = [12.5,10.5,12.5];

const data = {
  labels,
  datasets: [
    {
      label: "Voltaje",
      data: dataset1Data,
      backgroundColor: "rgba(70, 255, 51, 0.5)",
    }
  ],
};
export function GraficoVoltaje(){
    return <Bar options={options} data={data} />;
}