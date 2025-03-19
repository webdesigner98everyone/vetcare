import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavbarLogic } from "../components/logic/NavbarLogic";

export default function NavigationBar() {
  const { user, handleLogout, handleScrollToTestimonials } = useNavbarLogic();

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">VetCare Manager🐶</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user.email ? (
              <>
                {user.role === "admin" && <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>}

                {user.role === "viewer" && (
                  <>
                    <Nav.Link as={Link} to="/PetProfile">Mi Mascota</Nav.Link>
                    <Nav.Link as={Link} to="/history">Historial Clínico</Nav.Link>
                    <Nav.Link as={Link} to="/vaccines">Mis Vacunas</Nav.Link>
                    <Nav.Link as={Link} to="/feeding">Mi Alimentacion</Nav.Link>
                  </>
                )}

                <Dropdown as={Nav.Item}>
                  <Dropdown.Toggle as={Nav.Link} id="dropdown-user">
                    {user.name || "Usuario"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={handleLogout}>Cerrar Sesión</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/About">Quienes Somos</Nav.Link>
                <Nav.Link onClick={handleScrollToTestimonials} style={{ cursor: "pointer" }}>
                  Testimonios
                </Nav.Link>
                <Nav.Link as={Link} to="/contact">Contacto</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
