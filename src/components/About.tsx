import { Container, Row, Col, Card } from "react-bootstrap";// Importación de componentes de Bootstrap para la maquetación
import { motion } from "framer-motion";// Importación de `framer-motion` para animaciones
import { useAboutLogic } from "./logic/AboutLogic";// Importación de la lógica del componente
import "../styles/About.css";// Importación de los estilos personalizados

export default function About() {
  // Obtiene los datos de misión, visión y valores desde la lógica del componente
  const { mission, vision, values } = useAboutLogic();

  return (
    <Container className="about-container">
      {/* Título con animación de aparición */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="about-title"
      >
        Sobre <span className="highlight">VetCare Manager</span> 🐶🏥
      </motion.h2>
      {/* Sección de Misión y Visión */}
      <Row className="about-section">
        <Col md={6}>
          <motion.div whileHover={{ scale: 1.05 }} className="about-box">
            <h3 className="about-heading">Misión</h3>
            <p className="about-text">{mission}</p>
          </motion.div>
        </Col>
        <Col md={6}>
          <motion.div whileHover={{ scale: 1.05 }} className="about-box">
            <h3 className="about-heading">Visión</h3>
            <p className="about-text">{vision}</p>
          </motion.div>
        </Col>
      </Row>

      <section className="about-values">
        {values.map((value, index) => (
          <motion.div key={index} whileHover={{ scale: 1.05 }}>
            <Card className="value-card">
              <h4>{value.title}</h4>
              <p>{value.description}</p>
            </Card>
          </motion.div>
        ))}
      </section>
    </Container>
  );
}
