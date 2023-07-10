import React, { useDebugValue, useEffect, useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { AiFillSetting } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import logo from '../Imagenes/logo_icm3.png';
import { Logout } from "../Hooks/logout";
import { IncidenciasxEmpresaSR } from "../API/apiurls";
import { useListarElementos } from "../API/apiCRUD";

export function NavBarSupervisor() {
    const navigate = useNavigate();

    const handleLogout = () => {
        Logout(navigate);
    };
 
    const rol = localStorage.getItem('rol');
    const id_emp = localStorage.getItem("empresa");
    const [datos, setDatos] = useState(null);
    //console.log(id_emp);
    const fetchData = useListarElementos(`${IncidenciasxEmpresaSR}${id_emp}`, setDatos);

    useEffect(() => {
      fetchData();
    }, [fetchData, datos]);

    return (
        <>
            <Navbar bg="dark" variant="dark" className="navbar-container">
                <Container className="navbar-container">
                    <Navbar.Brand className="logo">
                        <Link to='/menuECamion' className="linkes">
                            <img src={logo} alt="Logo Inicio" className="imgl" />
                            <span>Inicio</span>
                        </Link>
                    </Navbar.Brand>
                    <Nav className="me-auto barra">
                        <Link to={`/menuIncidencias`} className="linkes">
                            <span>Incidencias {datos && datos.length}</span>
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