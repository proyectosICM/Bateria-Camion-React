import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useListVDatos } from './../../../Hooks/useListVDatos';
import { Card } from 'react-bootstrap';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

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
 
export function GraficoCargaB1({ idBat, idc }) {
  const token = localStorage.getItem('token');

  const { vdatos, ListVDatos } = useListVDatos(idBat, idc, token);

  useEffect(() => {
    ListVDatos();
  }, [ListVDatos,vdatos]);

  if (!vdatos || vdatos.length === 0) {
    return null; // O muestra un mensaje de carga, por ejemplo
  }

  const tbateria1 = vdatos.slice(-5).map((dato) => dato.carga);
  const labelsx = vdatos.slice(-5).map((dato) => {
    const timestamp = dato.dia;
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  });

  const labels = vdatos.slice(0, 5).map((dato) => dato.hora);

  const data = {
    labels,
    datasets: [
      {
        label: `Bateria con id ${idBat}`,
        data: tbateria1,
        borderColor: 'rgba(70, 255, 51)',
        backgroundColor: 'rgba(70, 255, 51)',
      },
    ],
  };

  return (
    <Card className="tb">
      <Line options={options} data={data} />
    </Card>
  );
}
