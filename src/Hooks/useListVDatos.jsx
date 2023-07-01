import { useState, useCallback } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { bateriaTURL } from '../API/apiurls';

export function useListVDatos(idBat, idc, token) {
  const [vdatos, setVdatos] = useState([]);
  const navigate = useNavigate();

  const ListVDatos = useCallback(async () => {
    try {
      const results = await axios.get(`${bateriaTURL}${idBat}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setVdatos(results.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Token expirado, redirigir al inicio de sesión
        navigate('/login');
      } else {
        // Otro error, manejarlo adecuadamente
        console.error("Error al obtener los datos de voltaje:", error);
      }
    }
  }, [idBat, idc, token, navigate]);

  return { vdatos, ListVDatos };
}
