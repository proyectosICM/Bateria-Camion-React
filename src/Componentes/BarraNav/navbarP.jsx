import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../../Estilos/barnavP.css';
import logo from '../../Imagenes/logo_icm3.png';
import { AiFillSetting } from 'react-icons/ai'

export function NavbarP(){
    return(
        <div>
            <Navbar bg="dark" variant="dark" className="navbar-container">
                <Container className="navbar-container">
                    <Navbar.Brand className="logo">
                        <Link to='/' className="linkes">
                            <img src={logo} alt="Logo Inicio" className="imgl"/>
                            <span>Inicio</span>
                        </Link>
                    </Navbar.Brand>
                    <Nav className="me-auto barra">
                        <Link to='/prueba1' className="linkes">LISTADO DE CAMIONES</Link>
                        <Link to='/prueba2' className="linkes">INCIDENCIAS</Link>
                        <Link className="linkes"><AiFillSetting></AiFillSetting></Link>
                    </Nav>        
                </Container>
            </Navbar>
        </div>
    );
}