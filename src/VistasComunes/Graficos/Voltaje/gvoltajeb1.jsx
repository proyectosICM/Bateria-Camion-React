import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useListVDatos } from './../../../Hooks/useListVDatos';
import { useListarElementos } from '../../../API/apiCRUD';
import { ArranquePromedioDiaxMes, ArranquePromedioxMes, ArranquexCamionURL, bateriaTURL } from '../../../API/apiurls';

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

  const [datoYears, setDatoYears] = useState([]);
  const [datoMes, setMes] = useState([]);
  const ListDatoYear = useListarElementos(`${ArranquePromedioxMes}${idc}`);
  const ListDatoMes = useListarElementos(`${ArranquePromedioDiaxMes}${idc}`);

  const [data, setData] = useState(null);

  useEffect(() => {
    if (propiedad === 'arranque') {
      ListarArranques(setvDatos);
      ListDatoYear(setDatoYears);
      ListDatoMes(setMes);
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
          let Values;
          if (propiedad === "arranque" || propiedad === "corriente") {
            Values = dayData.map((dato) => dato.corriente);
          } else if (propiedad === "voltaje") {
            Values = dayData.map((dato) => dato.voltaje);
          } else if (propiedad === "carga") {
            Values = dayData.map((dato) => dato.carga);
          } else {
            console.log("error");
          }
          //const Values = dayData.map((dato) => dato.corriente);
          const averageCorriente = Values.reduce((sum, value) => sum + value, 0) / Values.length;
          return averageCorriente;
        }).reverse();

      } else if (rango === "mes") {
        // *********************************************************************** //
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
        const lastSevenDays = filteredDays.slice(0, 28);
        // Obtén las etiquetas para el gráfico (horas)
        // Obtén las etiquetas para el gráfico (fechas en formato DD/MM/YY)
        if(propiedad === "arranque"){
          labels = datoMes.map((day) => {
            const date = new Date(day.fecha);
            return date.toLocaleDateString();
          });
          atributo = datoMes.map((dato) => dato.promedio);
        } else {
          labels = lastSevenDays.map((day) => {
            const date = new Date(day.dia);
            return date.toLocaleDateString();
          }).reverse();
        }


        // Obtén los valores de corriente correspondientes a los últimos 7 días
       /* atributo = lastSevenDays.map((day) => {
          const dayData = vdatos.filter((dato) => dato.dia === day.dia);
          let Values;
          if (propiedad === "arranque" || propiedad === "corriente") {
            Values = datoMes.map((dato) => dato.conteo);
            
          } else if (propiedad === "voltaje") {
            Values = dayData.map((dato) => dato.voltaje);
          } else if (propiedad === "carga") {
            Values = dayData.map((dato) => dato.carga);
          } else {
            console.log("error");
          }
          //const Values = dayData.map((dato) => dato.corriente);

          return Values;
        })*/
       
      } else if (rango === "year") {

        labels = datoYears.map((day) => {
          return day.mes;
        });

        if(propiedad === "arranque") {
                atributo = datoYears.map((day) => {
          let Values;
            Values = day.promedioCorriente;
          return Values;
        });
        }



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
