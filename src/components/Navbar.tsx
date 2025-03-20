import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavbarLogic } from "../components/logic/NavbarLogic";

export default function NavigationBar() {
  const { user, handleLogout, handleScrollToTestimonials } = useNavbarLogic();

  return (
    <Navbar style={{ backgroundColor: "#2c7a7b" }} variant="dark" expand="lg">
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
                    <Nav.Link as={Link} to="/PetProfile"
                      onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "#ff9900"}
                      onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "white"}>
                      Mi Mascota
                    </Nav.Link>
                    <Nav.Link as={Link} to="/history"
                      onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "#ff9900"}
                      onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "white"}>
                      Historial Clínico
                    </Nav.Link>
                    <Nav.Link as={Link} to="/vaccines"
                      onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "#ff9900"}
                      onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "white"}>
                      Mis Vacunas
                    </Nav.Link>
                    <Nav.Link as={Link} to="/feeding"
                      onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "#ff9900"}
                      onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "white"}>
                      Mi Alimentacion
                    </Nav.Link>
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
                <Nav.Link as={Link} to="/"
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "#ff9900"}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "white"}>
                  Home</Nav.Link>
                <Nav.Link as={Link} to="/About"
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "#ff9900"}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "white"}>
                  Quienes Somos</Nav.Link>
                <Nav.Link onClick={handleScrollToTestimonials} style={{ cursor: "pointer" }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "#ff9900"}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "white"}>
                  Testimonios
                </Nav.Link>
                <Nav.Link as={Link} to="/contact"
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "#ff9900"}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "white"}>
                  Contacto
                </Nav.Link>
                <Nav.Link as={Link} to="/login"
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "#ff9900"}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "white"}>
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
