import { useState } from "react";// Hook de React para manejar estados
import axios from "axios";// Cliente HTTP para realizar peticiones a la API
import { useNavigate } from "react-router-dom";// Hook de React Router para la navegación
import { toast } from "react-toastify"; // Librería para mostrar notificaciones

export const useLoginLogic = () => {
  // Estado para almacenar las credenciales del usuario
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  // Hook de navegación para redirigir al usuario después del login

  const navigate = useNavigate();
  // Maneja los cambios en los campos del formulario de inicio de sesión
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  // Maneja el envío del formulario de inicio de sesión
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
    // Realiza una solicitud GET al backend para verificar las credenciales del usuario

    try {
      const res = await axios.get(
        `http://localhost:5000/users?email=${credentials.email}&password=${credentials.password}`
      );
      // Si la respuesta contiene un usuario válido
      if (res.data.length > 0) {
        // Guarda los datos del usuario en el almacenamiento local

        localStorage.setItem("user", JSON.stringify(res.data[0]));
        // Muestra un mensaje de éxito
        toast.success("✅ Inicio de sesión exitoso. Redirigiendo...", {
          position: "top-right",
          autoClose: 2500,
          theme: "colored",
        });
        // Redirige al usuario según su rol
        setTimeout(() => {
          if (res.data[0].role === "admin") {
            navigate("/dashboard");
          } else {
            navigate("/");
          }
        }, 2500);
      } else {
        // Muestra un mensaje de error si las credenciales son incorrectas
        toast.error("❌ Credenciales incorrectas. Intenta nuevamente.", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
      }
    } catch (error) {
      // Maneja errores en la solicitud (problemas con el servidor, conexión, etc.)

      toast.error("🚨 Error en el inicio de sesión. Intenta más tarde.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };
  // Retorna las variables y funciones necesarias para el formulario de login

  return { credentials, handleChange, handleSubmit };
};
