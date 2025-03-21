import React from "react";
import "../styles/PrivacyPolicy.css";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="privacy-container">
      <div className="privacy-card">
        <h1>📜 Políticas de Privacidad</h1>
        <p>
          Bienvenido a nuestra plataforma. Nos tomamos muy en serio la privacidad de tus datos y nos comprometemos a proteger tu información personal.
        </p>

        <h2>📌 Información que Recopilamos</h2>
        <p>
          Recopilamos información personal, como tu nombre, correo electrónico y otros datos cuando te registras o utilizas nuestra plataforma.
        </p>

        <h2>🔒 Uso de la Información</h2>
        <p>
          Utilizamos la información recopilada para mejorar nuestros servicios, personalizar tu experiencia y garantizar la seguridad de la plataforma.
        </p>

        <h2>📢 Compartición de Datos</h2>
        <p>
          No compartimos tu información personal con terceros, excepto cuando es necesario para el funcionamiento del servicio o cuando la ley lo requiere.
        </p>

        <h2>⚙️ Seguridad de los Datos</h2>
        <p>
          Implementamos medidas de seguridad avanzadas para proteger tu información contra accesos no autorizados.
        </p>

        <h2>📅 Cambios en la Política</h2>
        <p>
          Nos reservamos el derecho de actualizar nuestras políticas. Cualquier cambio se notificará a través de la plataforma.
        </p>

        <p className="privacy-footer">
          📩 Si tienes dudas, contáctanos en <strong>vetcaremanager1@gmail.com</strong>
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
