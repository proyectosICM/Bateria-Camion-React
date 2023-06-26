import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../../Estilos/barnavP.css';
import logo from '../../Imagenes/logo_icm3.png';
import { AiFillSetting } from 'react-icons/ai'

export function NavbarP() {
    return (
        <div>
            <Navbar bg="dark" variant="dark" className="navbar-container">
                <Container className="navbar-container">
                    <Navbar.Brand className="logo">
                        <Link to='/' className="linkes">
                            <img src={logo} alt="Logo Inicio" className="imgl" />
                            <span>Inicio</span>
                        </Link>
                    </Navbar.Brand>
                    <Nav className="me-auto barra">
                        <Link to='/prueba1' className="linkes">LISTADO DE CAMIONES</Link>
                        <Link to='/incidenciasGE' className="linkes">INCIDENCIAS</Link>
                        <Link to='/menuCRUD' className="linkes">
                            <AiFillSetting className="link-icon" />
                        </Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
}