import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { AiFillSetting } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import logo from '../Imagenes/logo_icm3.png';
import { Logout } from "../Hooks/logout";

export function NavBarConductor() {
    const navigate = useNavigate();

    const handleLogout = () => {
        Logout(navigate);
    };

 
    return (
        <>
            <Navbar bg="dark" variant="dark" className="navbar-container">
                <Container className="navbar-container">
                    <Navbar.Brand className="logo">
                        <Link to='/detalles' className="linkes">
                            <img src={logo} alt="Logo Inicio" className="imgl" />
                            <span>Inicio</span>
                        </Link>
                    </Navbar.Brand>
                    <Nav className="me-auto barra">
                        <Link to={'/incidencias'} className="linkes">
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