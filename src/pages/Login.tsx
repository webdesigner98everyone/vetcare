import React from "react";
import { useLoginLogic } from "../components/logic/LoginLogic";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Login.css";

const Login: React.FC = () => {
  const { credentials, handleChange, handleSubmit } = useLoginLogic();

  return (
    <div className="login-container">
      <ToastContainer />
      <div className="login-card">
        <h1>🐾 Bienvenido 🐶</h1>
        <p>Ingresa tus credenciales para acceder</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaEnvelope className="icon" />
            <input
              type="email"
              name="email"
              placeholder="Correo"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <FaLock className="icon" />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-btn">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
