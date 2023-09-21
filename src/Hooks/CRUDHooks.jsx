import axios from "axios";
import { useEffect } from "react";


export function useListarElementos(url, dato, setDatos) {

    const ListarCarriles = async () => {
      try {
        const token = await localStorage.getItem("token"); 
        const results = await axios.get(`${url}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDatos(results.data);
  
      } catch (error) {
        console.error("Error al obtener los datos:", error, url);
      }
    };
  
    useEffect(() => {
      const intervalId = setInterval(ListarCarriles, 2000); 
      ListarCarriles();
      return () => {
        clearInterval(intervalId); 
      };
    }, []);
  }