import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useLoginLogic = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `http://localhost:5000/users?email=${credentials.email}&password=${credentials.password}`
      );
      if (res.data.length > 0) {
        localStorage.setItem("user", JSON.stringify(res.data[0]));
        alert("Inicio de sesión exitoso.");

        // Redirección según el rol
        if (res.data[0].role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      } else {
        alert("Credenciales incorrectas.");
      }
    } catch (error) {
      alert("Error en el inicio de sesión.");
    }
  };

  return { credentials, handleChange, handleSubmit };
};
