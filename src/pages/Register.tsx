import React, { useState } from "react";
import axios from "axios";
import "../styles/Register.css";

const Register: React.FC = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    address: "",   // Nuevo campo: Dirección
    contact: "",   // Nuevo campo: Contacto
    role: "viewer", // Viewer por defecto
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
      <h1>Registro de Usuario</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Nombre" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Correo" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
        <input type="text" name="address" placeholder="Dirección" onChange={handleChange} required />  {/* Nuevo campo */}
        <input type="text" name="contact" placeholder="Contacto" onChange={handleChange} required />  {/* Nuevo campo */}

        {/* Selección de rol */}
        <select name="role" onChange={handleChange} required>
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">Registrar Usuario</button>
      </form>
    </div>
  );
};

export default Register;
