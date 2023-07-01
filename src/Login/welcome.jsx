import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Welcome = () => {
    const username = localStorage.getItem('Username');
    const navigate = useNavigate();
    const [sal, setSal] = useState("");
    const [user, setUser] = useState(null);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('Username');
        navigate('/login');
    };

    const ListarSaludo = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://localhost:8080/api/trabajadores/info/${username}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setSal(response.data);
        } catch (error) {
          // Manejo de errores
          console.log(error);
        }
      };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
        ListarSaludo();
        console.log(sal);
    }, [navigate, sal]);

    return (
        <div>
          <h2>Bienvenido, {username}!</h2>
          {sal && (
            <div>
              <p>Nombre completo: {sal.nom_tra} {sal.ape_tra}</p>
              <p>Empresa: {sal.empresasModel.nom_emp}</p>
            </div>
          )}
          <button>Continuar al menú</button>
          <button onClick={handleLogout}>Salir</button>
        </div>
      );
      
};