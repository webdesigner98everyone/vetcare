import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import "../styles/Footer.css";
import Logo from "../assets/Logo.jpg"; 

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="footer-content">
          {/* Logo e Instagram */}
          <Col md={4} className="footer-section text-center">
            <img src={Logo} alt="Empresa Logo" className="logo-img" />
            <div className="social-icons">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="social-icon" />
              </a>
            </div>
          </Col>

          {/* Información de la Empresa */}
          <Col md={4} className="footer-section">
            <h5>VETCARE MANAGER.</h5>
            <p>Carrera 15A #10A - 3</p>
            <p>Cali - Colombia</p>
            <p>+57 313123745</p>
          </Col>

          {/* Enlaces de Navegación */}
          <Col md={4} className="footer-section">
            <h5>INFO</h5>
            <ul className="footer-links">
              <li><Link to="/About">Quienes Somos</Link></li>
              <li><Link to="/">Servicios</Link></li>
              <li><Link to="/Contact">Contáctanos</Link></li>
              <li><Link to="/privacidad">Política de Privacidad</Link></li>
            </ul>
          </Col>
        </Row>

        {/* Derechos Reservados */}
        <hr className="footer-divider" />
        <p className="footer-text">© 2025 VetCare-Manager. Todos los derechos reservados.</p>

        {/* Botón flotante de WhatsApp */}
        <a href="https://wa.me/573163449117" className="whatsapp-float" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp />
        </a>
      </Container>
    </footer>
  );
};

export default Footer;
