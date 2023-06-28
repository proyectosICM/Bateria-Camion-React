import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";  
import "./login.css";

export function Login() {
  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Iniciar sesión</h1>
        <h1><FaUserCircle /></h1>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Usuario</Form.Label>
            <Form.Control type="email" placeholder="Ingresa tu usuario" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Ingresa tu contraseña" />
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
    </div>
  );
}