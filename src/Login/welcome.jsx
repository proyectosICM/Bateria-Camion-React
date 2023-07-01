import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Welcome = () => {
  const username = localStorage.getItem('Username');
  const navigate = useNavigate();
  const [sal, setSal] = useState(null);
  /*
      const handleLogout = () => {
          localStorage.removeItem('token');
          localStorage.removeItem('Username');
          localStorage.removeItem('rol');
          localStorage.removeItem('empresa');
          localStorage.removeItem('trabajador');
          navigate('/login');
      };
  */
  const handleLogout = () => {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      console.log(`Clave: ${key}, Valor: ${value}`);
    }

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
      localStorage.setItem('rol', response.data.roles[0].id);
      localStorage.setItem('empresa', response.data.empresasModel.id_emp);
      localStorage.setItem('trabajador', response.data.id_tra);
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
  }, [navigate]);

  return (
    <div>
      <h2>Bienvenido, {username}!</h2>
      {sal && (
        <div>
          <p>Nombre completo: {sal.id_tra} {sal.nom_tra} {sal.ape_tra}</p>
          <p>id de Empresa: {sal.empresasModel.id_emp}</p>
          <p>Empresa: {sal.empresasModel.nom_emp}</p>
          <p>ID de rol: {sal.roles[0].id}</p>
          <p>Nombre de rol: {sal.roles[0].name}</p>
        </div>
      )}
      <button><Link to={'/detalles'}>Continuar al menú</Link></button>
      <button onClick={handleLogout}>Salir</button>
    </div>
  );

};