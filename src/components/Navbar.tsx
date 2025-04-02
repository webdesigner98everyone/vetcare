import { Navbar, Nav, Container, Dropdown, Modal, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Bell } from "react-bootstrap-icons"; // 🔔 Icono de campana
import { useNavbarLogic } from "../components/logic/NavbarLogic";
import { useState } from "react"; 

export default function NavigationBar() {
  const { user, handleLogout, handleScrollToTestimonials, notifications } = useNavbarLogic();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  // Si user es null o undefined, asignamos un objeto vacío
  const currentUser = user || {};
  const hasNotifications = notifications.length > 0;

  return (
    <Navbar style={{ backgroundColor: "#2c7a7b" }} variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">VetCare Manager🐶</Navbar.Brand>

        {/* 🔔 Campana de notificaciones con contador */}
        {currentUser.email && (
          <Nav.Link className="position-relative me-3" onClick={() => setShowNotifications(true)}>
            <Bell size={22} color="white" />
            {hasNotifications && (
              <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                {notifications.length}
              </span>
            )}
          </Nav.Link>
        )}

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {currentUser.email ? (
              <>
                {currentUser.role === "admin" && <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>}
                {currentUser.role === "viewer" && (
                  <>
                    <Nav.Link as={Link} to="/PetProfile">Mi Mascota</Nav.Link>
                    <Nav.Link as={Link} to="/history">Historial Clínico</Nav.Link>
                    <Nav.Link as={Link} to="/vaccines">Vacunas</Nav.Link>
                    <Nav.Link as={Link} to="/PetQR">QR Mascota</Nav.Link>
                  </>
                )}
                <Dropdown as={Nav.Item}>
                  <Dropdown.Toggle as={Nav.Link} id="dropdown-user" style={{ backgroundColor: "#2c7a7b", borderColor: "#2c7a7b", color: "white" }}>
                    {currentUser.name || "Usuario"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => navigate("/update-profile")}>Actualizar Datos</Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Cerrar Sesión</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/About">Quienes Somos</Nav.Link>
                <Nav.Link onClick={handleScrollToTestimonials} style={{ cursor: "pointer" }}>Testimonios</Nav.Link>
                <Nav.Link as={Link} to="/contact">Contacto</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>

      {/* Modal para notificaciones */}
      <Modal show={showNotifications} onHide={() => setShowNotifications(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Notificaciones</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {hasNotifications ? (
            notifications.map((notif, index) => <p key={index}>{notif}</p>)
          ) : (
            <p>No tienes nuevas notificaciones.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNotifications(false)}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
}
