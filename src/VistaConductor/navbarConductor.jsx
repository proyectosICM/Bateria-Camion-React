import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { AiFillSetting } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import logo from '../Imagenes/logo_icm3.png';

export function NavBarConductor() {
    const navigate = useNavigate();

    const handleLogout = () => {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            //console.log(`Clave: ${key}, Valor: ${value}`);
        }

        localStorage.removeItem('token');
        localStorage.removeItem('Username');
        navigate('/login');
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
                        <Button onClick={handleLogout}> CERRAR SESION </Button>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}