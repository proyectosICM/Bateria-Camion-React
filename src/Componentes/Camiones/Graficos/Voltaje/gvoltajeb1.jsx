import React, { useCallback, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import axios from "axios";
import { bateria1URL, bateriaTURL, bateriaxcamionURL } from "../../../../API/apiurls";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Voltaje v",
    },
  },
};

export function GraficoVoltajeB1({ idBat, datos, idc }) {
  const [vdatos, setVdatos] = useState([]);

  const ListVDatos = useCallback(async () => {
    const results = await axios.get(`${bateriaTURL}/${idc}/${idBat}`);
    setVdatos(results.data);
  }, [idBat, idc]);

  useEffect(() => {
    ListVDatos();
  }, [ListVDatos]);

  if (!vdatos || vdatos.length === 0) {
    return null; // O muestra un mensaje de carga, por ejemplo
  }

  const tbateria1 = vdatos.map((dato) => dato.voltaje);
  const labelsx = vdatos.map((dato) => {
    const timestamp = dato.dia;
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  });

  const labels = vdatos.map((dato) => dato.hora);

  const data = {
    labels,
    datasets: [
      {
        label: `Bateria con id ${idBat}`,
        data: tbateria1,
        borderColor: "rgba(195, 0, 51)",
        backgroundColor: "rgba(195, 0, 51)",
      },
    ],
  };
  console.log(vdatos);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Voltaje v",
      },
    },
    scales: {
      y: {
        min: 0,
        max: 30,
      },
    },
  };

  return (
    <div className="tb">
      <Line options={options} data={data} />
    </div>
  );
}
