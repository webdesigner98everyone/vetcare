import React, { useState } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock, FaMapMarkerAlt, FaPhone, FaUsers } from "react-icons/fa";
import "../styles/Register.css";

const Register: React.FC = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    contact: "",
    role: "viewer",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", user);
      alert("Usuario registrado exitosamente.");
    } catch (error) {
      alert("Error al registrar usuario.");
    }
  };

  return (
    <div className="register-container">
      <h1>
        <span role="img" className="emoji">🐾</span> Registro <span role="img" className="emoji">🐶</span>
      </h1>
      <p>Completa el formulario para crear una cuenta</p>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <FaUser />
          <input type="text" name="name" placeholder="Nombre" onChange={handleChange} required />
        </div>

        <div className="input-group">
          <FaEnvelope />
          <input type="email" name="email" placeholder="Correo" onChange={handleChange} required />
        </div>

        <div className="input-group">
          <FaLock />
          <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
        </div>

        <div className="input-group">
          <FaMapMarkerAlt />
          <input type="text" name="address" placeholder="Dirección" onChange={handleChange} required />
        </div>

        <div className="input-group">
          <FaPhone />
          <input type="text" name="contact" placeholder="Contacto" onChange={handleChange} required />
        </div>

        <div className="input-group">
          <FaUsers />
          <select name="role" onChange={handleChange} required>
            <option value="viewer">Tipo de Usuario</option>
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
