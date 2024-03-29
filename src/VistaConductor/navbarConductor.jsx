import React, { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { AiFillSetting } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Imagenes/logo_icm3.png";
import { Logout } from "../Hooks/logout";
import { useListarElementos } from "../API/apiCRUD";
import { IncidenciasxCamionSR } from "../API/apiurls";
import { LogoutToken } from "../Hooks/logoutToken";

export function NavBarConductor() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Logout(navigate); 
  };

  LogoutToken(); 

  const id_cam = localStorage.getItem("camionid");
  const [datos, setDatos] = useState(null);

  const ListarIncidenciasSR = useListarElementos(`${IncidenciasxCamionSR}${id_cam}`);


  useEffect(() => {
    ListarIncidenciasSR(setDatos);
    const interval = setInterval(() => {
      ListarIncidenciasSR(setDatos);
    }, 4000); // Actualiza cada 5 segundos, ajusta el intervalo según tus necesidades

    return () => {
      clearInterval(interval);
    };
  }, [ListarIncidenciasSR]);



  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="navbar-container">
        <Container>
          <Navbar.Brand className="logo">
            <Link to="/detalles" className="linkes">
              <img src={logo} alt="Logo Inicio" className="imgl" />
              <span>Inicio</span>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto barra">
              <Link to={"/incidencias"} className="linkes">
                Incidencias {datos && datos.length}
              </Link>
              <Button variant="primary" onClick={handleLogout}>
                Cerrar
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
