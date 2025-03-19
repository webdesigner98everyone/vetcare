import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

const Footer: React.FC = () => {
  // Función para desplazar a la sección de Testimonios
  const scrollToTestimonials = () => {
    const section = document.getElementById("testimonios");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <footer className="footer">
      <Container>
        <Row>
          {/* Sección de Información de Contacto */}
          <Col md={4} className="footer-section">
            <h5>Contacto</h5>
            <p><FaMapMarkerAlt /> Cali, Colombia</p>
            <p><FaPhone /> +57 300 123 4567</p>
            <p><FaEnvelope /> contacto@vetcare.com</p>
          </Col>

          {/* Sección de Enlaces */}
          <Col md={4} className="footer-section">
            <h5>Enlaces</h5>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><span onClick={scrollToTestimonials} className="clickable">Testimonios</span></li>
              <li><Link to="/contact">Contacto</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </Col>

          {/* Sección de Redes Sociales */}
          <Col md={4} className="footer-section">
            <h5>Síguenos</h5>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            </div>
          </Col>
        </Row>

        {/* Línea separadora y derechos reservados */}
        <hr />
        <p className="footer-text">© 2025 VetCare Manager. Todos los derechos reservados.</p>
      </Container>
    </footer>
  );
};

export default Footer;
