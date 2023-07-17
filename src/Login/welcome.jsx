import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Hooks/userProvider";
import { NavBarSelect } from "../VistasComunes/navbarSelect";
import { useListarElementos } from "../API/apiCRUD";
import { IncidenciasxCamionSR, camionxtrabajador } from "../API/apiurls";
import { TrabajadorC } from "./../VistasComunes/CRUD/TrabajadorCRUD/TrabajadorC";
import { LogoutToken } from "../Hooks/logoutToken";

export const Welcome = () => {
  const username = localStorage.getItem("Username");
  const navigate = useNavigate();
  const [sal, setSal] = useState(null);

  const handleLogout = () => {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      console.log(`Clave: ${key}, Valor: ${value}`);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("Username");
    navigate("/login");
  };

  const ListarSaludo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8080/api/trabajadores/info/${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSal(response.data);
      localStorage.setItem("rol", response.data.rolesModel.name);
      localStorage.setItem("empresa", response.data.empresasModel.id_emp);
      localStorage.setItem("trabajador", response.data.id_tra);
    } catch (error) {
      // Manejo de errores
      console.log(error);
    }
  };

  const [datos, setDatos] = useState(null);
  const rol = localStorage.getItem("rol");
  const trabajador = localStorage.getItem("trabajador");
  let camionDatos;

  camionDatos = useListarElementos(`${camionxtrabajador}${trabajador}`);

  const { userRole, setUserRole } = useContext(UserContext);

  useEffect(() => {
    
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    if (trabajador && rol == "CONDUCTOR") {
      camionDatos(setDatos);
      console.log("carajo");
    }
    localStorage.setItem("camionid", datos && datos[0].id_cam)
    ListarSaludo();
    setUserRole(localStorage.getItem("rol"));
    Redirigir();
  }, [navigate, sal, rol, camionDatos]);

  LogoutToken();
  const Redirigir = () => {
    if (rol == "CONDUCTOR") {
      if (sal && datos) {
        navigate("/redirect");
      }
    } else {
      if (sal != null) {
        navigate("/redirect");
      }
    }
  };

  return (
    <div>
      <h2>Bienvenido, {username}!</h2>
      {sal && (
        <div>
          <p>
            Nombre completo: {sal.id_tra} {sal.nom_tra} {sal.ape_tra}
          </p>
          <p>id de Empresa: {sal.empresasModel.id_emp}</p>
          <p>Empresa: {sal.empresasModel.nom_emp}</p>
          <p>ID de rol: {sal.rolesModel.id}</p>
          <p>Nombre de rol: {sal.rolesModel.name}</p>
          <p>Camion: {datos && datos[0].placa_cam}</p>
        </div>
      )}
      <button>
        <Link to={"/detalles"}>Continuar al menú</Link>
      </button>
      <button onClick={handleLogout}>Salir</button>
    </div>
  );
};
