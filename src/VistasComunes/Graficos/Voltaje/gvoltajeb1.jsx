import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useListVDatos } from './../../../Hooks/useListVDatos';
import { useListarElementos } from '../../../API/apiCRUD';
import { ArranquexCamionURL, bateriaTURL } from '../../../API/apiurls';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function GraficoVoltajeB1({ idBat, idc, rango, propiedad }) {
  const token = localStorage.getItem('token');
  const [datos, setDatos] = useState([]);
  const [vdatos, setvDatos] = useState([]);

  const ListarArranques = useListarElementos(
    `${ArranquexCamionURL}${idc}`
  );

  const ListVDatos = useListarElementos(
    `${bateriaTURL}${idBat}`
  );

  const [data, setData] = useState(null);

  useEffect(() => {
    if (propiedad === 'arranque') {
      ListarArranques(setvDatos);
    } else {
      ListVDatos(setvDatos);
    }
  }, [idBat, idc, ListarArranques, ListVDatos, propiedad, token]);

  let titulo = '';

  if (propiedad === "voltaje") {
    titulo = 'Voltaje v';
  } else if (propiedad === "carga") {
    titulo = 'Carga %';
  } else if (propiedad === "corriente") {
    titulo = 'Corriente v';
  }

  useEffect(() => {
    if (vdatos && vdatos.length > 0) {
      let filteredData = [];
      let labels = [];
      let atributo = [];
      let color = '';

      if (propiedad === "voltaje") {
        atributo = vdatos.map((dato) => dato.voltaje);
        color = 'rgba(195, 0, 51)';
      } else if (propiedad === "carga") {
        atributo = vdatos.map((dato) => dato.carga);
        color = 'rgba(70, 255, 51)';
      } else if (propiedad === "corriente") {
        atributo = vdatos.map((dato) => dato.corriente);
        color = 'rgba(195, 0, 251)';
      } else if (propiedad === "arranque") {
        atributo = vdatos.map((dato) => dato.corriente);
        color = 'rgba(195, 0, 251)';
        console.log(vdatos);
      } else {
        console.log("error");
      }
      //console.log(atributo[atributo.length - 1])

      if (rango === "detalles") {
        filteredData = vdatos.slice(-5);
        labels = filteredData.map((dato) => dato.hora);
      } else if (rango === "dias") {
        const lastDay = vdatos[vdatos.length - 1].dia;
        filteredData = vdatos.filter((dato) => dato.dia === lastDay);
        labels = filteredData.map((dato) => dato.hora);

        //atributo = vdatos.filter((dato) => dato.dia === lastDay).map((dato) => dato.corriente);

        if (propiedad === "arranque" || propiedad === "corriente") {
          atributo = vdatos.filter((dato) => dato.dia === lastDay).map((dato) => dato.corriente);
        } else if (propiedad === "voltaje") {
          atributo = vdatos.filter((dato) => dato.dia === lastDay).map((dato) => dato.voltaje);
        } else if (propiedad === "carga") {
          atributo = vdatos.filter((dato) => dato.dia === lastDay).map((dato) => dato.carga);
        } else {
          console.log("error");
        }

        //atributo = atributo.slice(filteredData.length )
        //console.log("n", atributo, filteredData.length)
      } else if (rango === "semana") {
        const uniqueDays = new Set();
        const filteredDays = vdatos.filter((dato) => {
          const date = new Date(dato.dia);
          const dateString = date.toDateString();
          if (!uniqueDays.has(dateString)) {
            uniqueDays.add(dateString);
            return true;
          }
          return false;
        });

        // Ordena los datos filtrados por fecha en orden descendente
        filteredDays.sort((a, b) => b.dia - a.dia);

        // Toma los primeros 7 días
        const lastSevenDays = filteredDays.slice(0, 7);
        // Obtén las etiquetas para el gráfico (horas)
        // Obtén las etiquetas para el gráfico (fechas en formato DD/MM/YY)
        labels = lastSevenDays.map((day) => {
          const date = new Date(day.dia);
          return date.toLocaleDateString();
        }).reverse();

        // Obtén los valores de corriente correspondientes a los últimos 7 días
        atributo = lastSevenDays.map((day) => {
          const dayData = vdatos.filter((dato) => dato.dia === day.dia);
          const lastDataOfDay = dayData[dayData.length - 1];
          console.log(propiedad);

          if (propiedad === "arranque" || propiedad === "corriente") {
            return lastDataOfDay.corriente;
          } else if (propiedad === "voltaje") {
            return lastDataOfDay.voltaje;
          } else if (propiedad === "carga") {
            return lastDataOfDay.carga;
          } else {
            console.log("error");
          }
          console.log(propiedad);
        }).reverse();

      } else if (rango === "mes") {
        // Filtra los datos para obtener solo el último dato de cada mes
        const uniqueMonths = new Set();
        const filteredMonths = vdatos.filter((dato) => {
          const date = new Date(dato.dia);
          const monthYearString = date.toLocaleDateString(undefined, {
            month: 'numeric',
            year: 'numeric',
          });
          if (!uniqueMonths.has(monthYearString)) {
            uniqueMonths.add(monthYearString);
            return true;
          }
          return false;
        });

        // Ordena los datos filtrados por fecha en orden descendente
        filteredMonths.sort((a, b) => b.dia - a.dia);

        // Toma los últimos datos de cada mes
        const lastDataOfMonth = filteredMonths.map((monthData) => {
          const monthDataItems = vdatos.filter((dato) => dato.dia === monthData.dia);
          return monthDataItems[monthDataItems.length - 1];
        });

        // Obtén las etiquetas para el gráfico (fechas en formato DD/MM/YY)
        labels = lastDataOfMonth.map((monthData) => {
          const date = new Date(monthData.dia);
          return date.toLocaleDateString('es-ES');
        }).reverse();

        // Obtén los valores de corriente correspondientes a los últimos datos de cada mes
        //atributo = lastDataOfMonth.map((monthData) => monthData.corriente);

        atributo = lastDataOfMonth.map((day) => {
          const monthData = vdatos.filter((dato) => dato.dia === day.dia);
          const lastDataOfDay = monthData[monthData.length - 1];
          
          if (propiedad === "arranque" || propiedad === "corriente") {
            return lastDataOfDay.corriente;
          } else if (propiedad === "voltaje") {
            return lastDataOfDay.voltaje;
          } else if (propiedad === "carga") {
            return lastDataOfDay.carga;
          } else {
            console.log("error");
          }
        }).reverse();
      } else if (rango === "anio") {
        // Lógica para el rango "anio" si es necesario
      }

      setData({
        labels,
        datasets: [
          {
            label: `Dato `,
            data: atributo,
            borderColor: color,
            backgroundColor: color,
          },
        ],
      });
    }
  }, [vdatos, rango, idBat, propiedad]);

  if (!data) {
    return null; // O muestra un mensaje de carga, por ejemplo
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: titulo,
      },
    },
  };

  return (
    <div className="tb">
      <Line options={options} data={data} />
    </div>
  );
}
