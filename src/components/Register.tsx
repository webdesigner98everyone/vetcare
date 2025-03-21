import React from "react";
import { FaUser, FaEnvelope, FaLock, FaMapMarkerAlt, FaPhone, FaUsers } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Register.css";
import { useRegisterLogic } from "../components/logic/RegisterLogic";

const Register: React.FC = () => {
  const { user, handleChange, handleSubmit } = useRegisterLogic();

  return (
    <div className="register-container">
      <ToastContainer />
      <h1>
        <span role="img" className="emoji">🐾</span> Registro <span role="img" className="emoji">🐶</span>
      </h1>
      <p>Completa el formulario para crear una cuenta</p>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <FaUser />
          <input type="text" name="name" placeholder="Nombre" onChange={handleChange} value={user.name} required />
        </div>

        <div className="input-group">
          <FaEnvelope />
          <input type="email" name="email" placeholder="Correo" onChange={handleChange} value={user.email} required />
        </div>

        <div className="input-group">
          <FaLock />
          <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} value={user.password} required />
        </div>

        <div className="input-group">
          <FaMapMarkerAlt />
          <input type="text" name="address" placeholder="Dirección" onChange={handleChange} value={user.address} required />
        </div>

        <div className="input-group">
          <FaPhone />
          <input type="text" name="contact" placeholder="Contacto" onChange={handleChange} value={user.contact} required />
        </div>

        <div className="input-group">
          <FaUsers />
          <select name="role" onChange={handleChange} value={user.role} required>
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit" className="register-button">Registrar Usuario</button>
      </form>
    </div>
  );
};

export default Register;
