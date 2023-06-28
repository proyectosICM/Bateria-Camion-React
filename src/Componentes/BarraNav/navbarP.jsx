import React, { useCallback, useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../../Estilos/barnavP.css';
import logo from '../../Imagenes/logo_icm3.png';
import { AiFillSetting } from 'react-icons/ai'
import axios from "axios";
import { IncidenciasxEmpresaSR } from "../../API/apiurls";

export function NavbarP() {

    const [incidencias, setIncidencias] = useState([]);

    const ListarIncidencias = useCallback(async() => {
        const results = await axios.get(`${IncidenciasxEmpresaSR}1`);
        setIncidencias(results.data);
    });

    useEffect(()=> {
        ListarIncidencias();
    },[ListarIncidencias]);

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
                        <Link to='/incidenciasGE' className="linkes">INCIDENCIAS {incidencias.length > 0 ? incidencias.length : 0 }</Link>
                        <Link to='/menuCRUD' className="linkes">
                            <AiFillSetting className="link-icon" />
                        </Link>
                        <Link to='/login' className="linkes">INICIO DE SESION</Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
}