import React, { useDebugValue, useEffect } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { AiFillSetting } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import logo from '../Imagenes/logo_icm3.png';
import { Logout } from "../Hooks/logout";

export function NavBarSupervisor() {
    const navigate = useNavigate();

    const handleLogout = () => {
        Logout(navigate);
    };

    const rol = localStorage.getItem('rol');

    useEffect(()=> {
        console.log(rol);
    }, [rol]);
    const g  = "g"; 
 
    return (
        <>
            <Navbar bg="dark" variant="dark" className="navbar-container">
                <Container className="navbar-container">
                    <Navbar.Brand className="logo">
                        <Link to='/menuCamion' className="linkes">
                            <img src={logo} alt="Logo Inicio" className="imgl" />
                            <span>Inicio</span>
                        </Link>
                    </Navbar.Brand>
                    <Nav className="me-auto barra">
                        <Link to={`/incidenciasG`} className="linkes">
                            <span>Incidencias</span>
                        </Link>

                        <li onClick={handleLogout} className="linkes">
                            Cerrar
                        </li>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}