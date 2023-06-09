import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useListVDatos } from "./../../../Hooks/useListVDatos";
import { useListarElementos } from "../../../API/apiCRUD";
import {
  ArranquePromedioDiaxMes,
  ArranquePromedioxMes,
  ArranqueUltimoDia,
  ArranquexCamionURL,
  BateriaPromedioxMes,
  BateriaPromedioxYear,
  BateriaUltimodia,
  bateriaTURL,
} from "../../../API/apiurls";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function GraficoVoltajeB1({ idBat, idc, rango, propiedad }) {
  const token = localStorage.getItem("token");
  const [datos, setDatos] = useState([]);
  const [vdatos, setvDatos] = useState([]);

  const ListarArranques = useListarElementos(`${ArranquexCamionURL}${idc}`);

  const ListVDatos = useListarElementos(`${bateriaTURL}${idBat}`);

  const [datoYears, setDatoYears] = useState([]);
  const [datoMes, setMes] = useState([]);
  const [datoDia, setDia] = useState([]);
  const [urlY, setUrlY] = useState([]);
  const [url, setUrl] = useState("");

  let y;
  let m;
  let d;
  let ya;
  let ma;
  let da;
  if (propiedad === "arranque") {
    ya = `${ArranquePromedioxMes}${idc}`;
    ma = `${ArranquePromedioDiaxMes}${idc}`;
    da = `${ArranqueUltimoDia}${idc}`;
  } else {
    y = `${BateriaPromedioxYear}${idBat}`;
    m = `${BateriaPromedioxMes}${idBat}`;
    d = `${BateriaUltimodia}${idBat}`;
  }
  const ListDatoAYear = useListarElementos(`${ArranquePromedioxMes}${idc}`);
  const ListDatoAMes = useListarElementos(`${ArranquePromedioDiaxMes}${idc}`);
  const ListDatoADia = useListarElementos(`${ArranqueUltimoDia}${idc}`);

  const ListDatoYear = useListarElementos(`${BateriaPromedioxYear}${idBat}`);
  const ListDatoMes = useListarElementos(`${BateriaPromedioxMes}${idBat}`);
  const ListDatoDia = useListarElementos(`${BateriaUltimodia}${idBat}`);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (propiedad === "arranque") {
      ListarArranques(setvDatos);
      ListDatoAYear(setDatoYears);
      ListDatoAMes(setMes);
      ListDatoADia(setDia);
    } else {
      ListarArranques(setvDatos);
      ListDatoYear(setDatoYears);
      ListDatoMes(setMes);
      ListDatoDia(setDia);
    }
  }, [
    datoMes,
    datoYears,
    datoDia,
    vdatos,
    ListDatoDia,
    ListDatoMes,
    ListDatoYear,
    ListarArranques,
    ListDatoADia,
    ListDatoAMes,
    ListDatoAYear,
    ListarArranques,
  ]);

  /*
useEffect(() => {

    ListarArranques(setvDatos);
    ListDatoAYear(setDatoYears);
    ListDatoAMes(setMes);
    ListDatoADia(setDia);
  
},[datoMes, datoYears, datoDia, vdatos, ListDatoADia, ListDatoAMes, ListDatoAYear, ListarArranques] );
*/
  /*
useEffect(() => {
  
  ListarArranques(setvDatos);
},[ListarArranques, vdatos,ArranquexCamionURL, idc]);
*/ /*
useEffect(()=>{
  ListDatoAYear(setDatoYears);
},[ListDatoAYear, datoYears])*/
  /*
useEffect(()=>{
  ListDatoAMes(setMes);
},[ListDatoAMes, datoMes])
/*
useEffect(()=> {
  ListarArranques(setvDatos);
  ListDatoYear(setDatoYears);
},[ListVDatos]);

*/

  let titulo = "";

  if (propiedad === "voltaje") {
    titulo = "Voltaje v";
  } else if (propiedad === "carga") {
    titulo = "Carga %";
  } else if (propiedad === "corriente") {
    titulo = "Corriente v";
  }

  useEffect(() => {
    // if (vdatos && vdatos.length > 0) {
    let filteredData = [];
    let labels = [];
    let atributo = [];
    let color = "";

    if (propiedad === "voltaje") {
      atributo = datoDia.slice(-5).map((dato) => dato.voltaje);
      color = "rgba(195, 0, 51)";
    } else if (propiedad === "carga") {
      atributo = datoDia.slice(-5).map((dato) => dato.carga);
      color = "rgba(70, 255, 51)";
    } else if (propiedad === "corriente") {
      atributo = datoDia.slice(-5).map((dato) => dato.corriente);
      color = "rgba(195, 0, 251)";
    } else if (propiedad === "arranque") {
      atributo = datoDia.map((dato) => dato.corriente);
      color = "rgba(195, 0, 251)";
    } else {
      console.log("error");
    }
    //console.log(atributo[atributo.length - 1])
    if (rango === "detalles") {
      filteredData = datoDia.slice(-5);
      labels = filteredData.map((dato) => dato.hora);
    } else if (rango === "dias") {
      //const lastDay = vdatos[vdatos.length - 1].dia;
      //filteredData = vdatos.filter((dato) => dato.dia === lastDay);
      //labels = filteredData.map((dato) => dato.hora);
      labels = datoDia.map((dato) => dato.hora);
      //atributo = vdatos.filter((dato) => dato.dia === lastDay).map((dato) => dato.corriente);
      if (propiedad === "arranque") {
        atributo = datoDia.map((dato) => dato.corriente);
      } else if (propiedad === "corriente") {
        atributo = datoDia.map((dato) => dato.corriente);
      } else if (propiedad === "voltaje") {
        atributo = datoDia.map((dato) => dato.voltaje);
      } else if (propiedad === "carga") {
        atributo = datoDia.map((dato) => dato.carga);
      } else {
        console.log("error");
      }
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
      labels = lastSevenDays
        .map((day) => {
          const date = new Date(day.dia);
          return date.toLocaleDateString();
        })
        .reverse();
      if (propiedad != "arranque") {
        labels = datoMes.slice(-7).map((day) => {
          const date = new Date(day.dia);
          return date.toLocaleDateString();
        });
      }
      if (propiedad === "arranque") {
        atributo = datoMes.slice(-7).map((dato) => dato.promedio);
        labels = datoMes.slice(-7).map((day) => {
          const date = new Date(day.fecha);
          return date.toLocaleDateString();
        });
      } else if (propiedad === "voltaje") {
        atributo = datoMes.map((day) => {
          let Values;
          Values = day.voltaje;
          return Values;
        });
      } else if (propiedad === "carga") {
        atributo = datoMes.slice(-7).map((day) => {
          let Values;
          Values = day.carga;
          return Values;
        });
      } else if (propiedad === "corriente") {
        atributo = datoMes.slice(-7).map((day) => {
          let Values;
          Values = day.corriente;
          return Values;
        });
      }
      // Obtén los valores de corriente correspondientes a los últimos 7 días
      /* atributo = lastSevenDays
          .map((day) => {
            const dayData =  vdatos.filter((dato) => dato.dia === day.dia);
            let Values;
            if (propiedad === "arranque" || propiedad === "corriente") {
              Values = dayData.map((dato) => dato.corriente);
            } else if (propiedad === "voltaje") {
              Values = datoMes.map((dato) => dato.voltaje);
            } else if (propiedad === "carga") {
              Values = datoMes.map((dato) => dato.carga);
            } else {
              console.log("error");
            }
            //const Values = dayData.map((dato) => dato.corriente);
            const averageCorriente =
              Values.reduce((sum, value) => sum + value, 0) / Values.length;
            return averageCorriente;
          })
          .reverse();*/
    } else if (rango === "mes") {
      if (propiedad != "arranque") {
        labels = datoMes.map((day) => {
          const date = new Date(day.fecha);
          return date.toLocaleDateString();
        });
      }
      if (propiedad === "arranque") {
        labels = datoMes.map((day) => {
          const date = new Date(day.fecha);
          return date.toLocaleDateString();
        });
        atributo = datoMes.map((dato) => dato.promedio);
      } else if (propiedad === "voltaje") {
        atributo = datoMes.map((day) => {
          let Values;
          Values = day.voltaje;
          return Values;
        });
      } else if (propiedad === "carga") {
        atributo = datoMes.map((day) => {
          let Values;
          Values = day.carga;
          return Values;
        });
      } else if (propiedad === "corriente") {
        atributo = datoMes.map((day) => {
          let Values;
          Values = day.corriente;
          return Values;
        });
      }

      if (propiedad != "arranque") {
        labels = datoMes.map((day) => {
          const date = new Date(day.dia);
          return date.toLocaleDateString();
        });
      }
    } else if (rango === "year") {
      if (propiedad === "arranque") {
        atributo = datoYears.map((day) => {
          let Values;
          Values = day.promedioCorriente;
          return Values;
        });
        labels = datoYears.map((day) => {
          return day.mes;
        });
      } else if (propiedad === "voltaje") {
        atributo = datoYears.map((day) => {
          let Values;
          Values = day.voltaje;
          return Values;
        });
      } else if (propiedad === "carga") {
        atributo = datoYears.map((day) => {
          let Values;
          Values = day.cargaA;
          return Values;
        });
      } else if (propiedad === "corriente") {
        atributo = datoYears.map((day) => {
          let Values;
          Values = day.corriente;
          return Values;
        });
      }
      if (propiedad != "arranque") {
        labels = datoYears.map((day) => {
          return day.fecha;
        });
      }
    }

    const newData = {
      labels,
      datasets: [
        {
          label: `Dato `,
          data: atributo,
          borderColor: color,
          backgroundColor: color,
        },
      ],
    };

    if (!data || JSON.stringify(data) !== JSON.stringify(newData)) {
      setData(newData);
    }
  }, [rango, propiedad, datoDia, datoMes, datoYears, data, vdatos]);
  if (!data) {
    return null; // O muestra un mensaje de carga, por ejemplo
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
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
