import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useLoginLogic = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación simple de campos vacíos
    if (!credentials.email || !credentials.password) {
      toast.warn("⚠️ Todos los campos son obligatorios", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:5000/users?email=${credentials.email}&password=${credentials.password}`
      );

      if (res.data.length > 0) {
        localStorage.setItem("user", JSON.stringify(res.data[0]));
        toast.success("✅ Inicio de sesión exitoso. Redirigiendo...", {
          position: "top-right",
          autoClose: 2500,
          theme: "colored",
        });

        setTimeout(() => {
          if (res.data[0].role === "admin") {
            navigate("/dashboard");
          } else {
            navigate("/");
          }
        }, 2500);
      } else {
        toast.error("❌ Credenciales incorrectas. Intenta nuevamente.", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error("🚨 Error en el inicio de sesión. Intenta más tarde.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  return { credentials, handleChange, handleSubmit };
};
