import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Hooks/userProvider";
import { NavBarSelect } from "../VistasComunes/navbarSelect";
//import { useListarElementos } from "../API/apiCRUD";
import { IncidenciasxCamionSR, camionxtrabajador, infoURL } from "../API/apiurls";
import { TrabajadorC } from "./../VistasComunes/CRUD/TrabajadorCRUD/TrabajadorC";
import { LogoutToken } from "../Hooks/logoutToken";
import { useListarElementos } from "../Hooks/CRUDHooks";

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

  useListarElementos(`${infoURL}${username}`, sal, setSal);

  const [datos, setDatos] = useState(null);
  const rol = localStorage.getItem("rol");
  const trabajador = localStorage.getItem("trabajador");
  let camionDatos;

  camionDatos = useListarElementos(`${camionxtrabajador}${trabajador}`, datos, setDatos);
  const { userRole, setUserRole } = useContext(UserContext);

  useEffect(() => {
    if (sal) {
      localStorage.setItem("rol", sal.rolesModel.name);
      localStorage.setItem("empresa", sal.empresasModel.id_emp);
      localStorage.setItem("trabajador", sal.id_tra);
    }
  }, [sal]);

  useEffect(() => {}, [datos]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    const fetchData = async () => {
      if (!token) {
        navigate("/login");
      }
  
      if (datos && rol == "CONDUCTOR") {
        try {
          await localStorage.setItem("camionid", datos.id_cam);
          //alert("ya");
        } catch (error) {
          console.error("Error al guardar en localStorage:", error);
        }
      }0
  
 
    };
  
    fetchData();
    setUserRole(localStorage.getItem("rol"));
    Redirigir();
  }, [navigate, sal, rol]);
  

  LogoutToken();
  const Redirigir = async() => {
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
          <p>Camion: {datos && datos.placa_cam}</p>
        </div>
      )}
      <button>
        <Link to={"/detalles"}>Continuar al menú</Link>
      </button>
      <button onClick={handleLogout}>Salir</button>
    </div>
  );
};
