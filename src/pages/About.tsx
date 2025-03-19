import { Container, Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import { useAboutLogic } from "../components/logic/AboutLogic";
import "../styles/About.css";

export default function About() {
  const { mission, vision, values } = useAboutLogic();

  return (
    <Container className="about-container">
      <motion.h2 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }}
        className="about-title"
      >
        Sobre <span className="highlight">VetCare Manager</span> 🐶🏥
      </motion.h2>

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
