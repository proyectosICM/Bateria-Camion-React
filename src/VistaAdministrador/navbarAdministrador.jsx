import React, { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { AiFillSetting } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Imagenes/logo_icm3.png";
import { Logout } from "../Hooks/logout";
import { useListarElementos } from "../API/apiCRUD";
import { IncidenciasxEmpresaSR } from "../API/apiurls";

export function NavBarAdministrador() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Logout(navigate);
  };

  const rol = localStorage.getItem("rol");
  const id_emp = localStorage.getItem("empresa");
  const [datos, setDatos] = useState(null);

  const ListarIncidenciasSR = useListarElementos(`${IncidenciasxEmpresaSR}${id_emp}`);

  useEffect(() => {
    ListarIncidenciasSR(setDatos);
  }, [ListarIncidenciasSR]);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="navbar-container">
        <Container>
          <Navbar.Brand className="logo">
            <Link to="/welcomeadd" className="linkes">
              <img src={logo} alt="Logo Inicio" className="imgl" />
              <span>Inicio</span>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/menuECamion" className="linkes">
                <img src={logo} alt="Logo Inicio" className="imgl" />
                <span>Menu</span>
              </Nav.Link>
              <Nav.Link as={Link} to="/menuIncidencias" className="linkes">
                <span>Incidencias {datos && datos.length}</span>
              </Nav.Link>
              <Nav.Link as={Link} to="/menuCRUD" className="linkes">
                <span>Administrativo</span>
              </Nav.Link>
            </Nav>
            <Nav>
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
