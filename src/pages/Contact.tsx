import React from "react";
import "../styles/Contact.css";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <section className="contact-container">
      <h2 className="contact-title">
        Contáctanos <span className="highlight">Ahora</span>
      </h2>
      <p className="contact-subtitle">
        Estamos aquí para ayudarte. Si deseas conocer nuestros costos de nuestra plataforma ¡Déjanos tu mensaje y te responderemos lo antes posible!
      </p>

      <div className="contact-content">
        {/* Información de contacto */}
        <div className="contact-info">
          <div className="info-item">
            <FaMapMarkerAlt className="contact-icon" />
            <p>Cali, Colombia</p>
          </div>
          <div className="info-item">
            <FaEnvelope className="contact-icon" />
            <p>contacto@vetcare.com</p>
          </div>
          <div className="info-item">
            <FaPhoneAlt className="contact-icon" />
            <p>+57 300 123 4567</p>
          </div>
        </div>

        {/* Formulario de contacto */}
        <form className="contact-form">
          <input type="text" placeholder="Nombre Completo" required />
          <input type="email" placeholder="Correo Electrónico" required />
          <textarea placeholder="Escribe tu mensaje aquí..." rows={5} required></textarea>
          <button type="submit" className="btn-submit">Enviar Mensaje</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
