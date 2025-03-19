import { FaUserShield, FaEye, FaCogs } from "react-icons/fa";
import { useState, useEffect } from "react";

export const useHomeLogic = () => {
  // Servicios de la plataforma
  const services = [
    {
      icon: <FaUserShield className="icon" />,
      title: "Gestión de Usuarios",
      description: "Registra y administra usuarios con distintos roles.",
    },
    {
      icon: <FaEye className="icon" />,
      title: "Roles de Visualización",
      description: "Define accesos según permisos de usuario.",
    },
    {
      icon: <FaCogs className="icon" />,
      title: "Gestión de Servicios",
      description: "Administra información de mascotas y vacunas.",
    },
  ];

  // Testimonios de usuarios
  const testimonials = [
    {
      name: "María López",
      comment: "VetCare Manager ha facilitado el control de las vacunas de mis mascotas. ¡Increíble plataforma!",
    },
    {
      name: "Carlos Ramírez",
      comment: "Gracias a VetCare Manager, nunca más olvidé una cita veterinaria. Muy recomendada.",
    },
    {
      name: "Ana Torres",
      comment: "La gestión de historiales médicos es súper intuitiva. ¡Me encanta la facilidad de uso!",
    },
  ];

  // Estado para verificar si el usuario está logueado
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  return { services, testimonials, isLoggedIn };
};
