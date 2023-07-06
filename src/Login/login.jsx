import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./login.css";
import axios from "axios";
import { base } from "../API/apiurls";
import { LogoutToken } from "../Hooks/logoutToken";

const axiosInstance = axios.create({
  baseURL: base,
  withCredentials: true,  // Agrega esta línea para permitir el envío de cookies en las solicitudes CORS
});

export function Login() {
  const [username, setUsername] = useState("");
  const [pass_tra, setPass_tra] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {

  

    e.preventDefault();
    try {
      const response = await axiosInstance.post("/login", {
        username,
        pass_tra,
      });
      setError('Accedio');
      console.log(error);
      const { token, Username } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('Username', Username);
      navigate("/welcome", { state: { username: Username } });
    } catch (error) {
      setError('Error en la autenticacion');
      console.log(error);
    }
  };

  const token = localStorage.getItem('token');

  useEffect(()=> {
    if(token){
      navigate('/redirec');
    }
  },[navigate]);

  LogoutToken();
  
  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Iniciar sesión</h1>
        <h1><FaUserCircle /></h1>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa el usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingresa la contraseña"
              value={pass_tra}
              onChange={(e) => setPass_tra(e.target.value)} />
          </Form.Group>

          <Button variant="primary" type="submit" className="login-button">
            Iniciar sesión
          </Button>
        </Form>
      </div>
      <div className="login-info">
        <h2>Gestiona y analiza el funcionamiento de tus baterias de camiones</h2>
        <Link to="/contratar">Contratar</Link>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
}