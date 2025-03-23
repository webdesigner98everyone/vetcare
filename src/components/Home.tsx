import { Button, Container, Row, Col, Card } from "react-bootstrap";
import Slider from "react-slick";
import { FaPaw, FaSyringe, FaStethoscope, FaQrcode, FaQuoteLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useHomeLogic } from "./logic/HomeLogic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/Home.css";

export default function Home() {
  const { testimonials, isLoggedIn } = useHomeLogic();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <Container className="home-container text-center mt-5">
      {/* 🏥 Hero Section */}
      <motion.div className="hero-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <h1>
          Bienvenido a <span className="highlight">VetCare Manager 🏥🐶</span>
        </h1>
        <p className="slogan">Una Plataforma interesada por llevar el control de tu peludito en vacunas, consultas y alimentación.</p>
        {!isLoggedIn && (
          <Link to="/register">
            <motion.div whileHover={{ scale: 1.1 }}>
              <Button variant="primary" className="cta-button" style={{ backgroundColor: "#2c7a7b", borderColor: "#2c7a7b" }}>
                Regístrate Gratis
              </Button>
            </motion.div>
          </Link>
        )}
      </motion.div>

      {/* 🚀 Sección de Características */}
      <section className="features mt-5">
        <h2>¿Qué puedes hacer en nuestra plataforma?</h2>
        <div className="features-grid">
          <motion.div whileHover={{ scale: 1.05 }} className="feature-card">
            <FaPaw className="icon" />
            <h3>Información</h3>
            <p>Guarda información detallada de tus mascotas con fotos y datos clave.</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="feature-card">
            <FaSyringe className="icon" />
            <h3>Control de Vacunas</h3>
            <p>Registra y recibe alertas sobre el calendario de vacunación de tu mascota.</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="feature-card">
            <FaStethoscope className="icon" />
            <h3>Historial Médico</h3>
            <p>Accede al historial de consultas veterinarias en cualquier momento.</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="feature-card">
            <FaQrcode className="icon" />
            <h3>Generación de QR </h3>
            <p>Te ayudamos a consolidar la información de tu mascota en un código QR.</p>
          </motion.div>
        </div>
      </section>


      {/* 🏅 Sección de Testimonios */}
      <section id="testimonios" className="testimonials mt-5">
        <h2>Lo que dicen nuestros usuarios</h2>
        <Slider {...sliderSettings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <FaQuoteLeft className="quote-icon" />
              <p>"{testimonial.comment}"</p>
              <h4>- {testimonial.name}</h4>
            </div>
          ))}
        </Slider>
      </section>
    </Container>
  );
}
