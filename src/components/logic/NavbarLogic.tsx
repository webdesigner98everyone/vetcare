import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";

interface Pet {
  id: number;
  name: string;
  birthDate: string;
  ownerId: number;
}

export function useNavbarLogic() {
  // Obtener usuario almacenado en `localStorage`
  const storedUser = localStorage.getItem("user");
  let user = null;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    user = null;
  }

  const navigate = useNavigate();
  const location = useLocation();
  const [hasNotifications, setHasNotifications] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);

  // Función para marcar una notificación como leída
  const markAsRead = (index: number) => {
    const updatedNotifications = [...notifications];
    updatedNotifications.splice(index, 1); // Elimina la notificación seleccionada

    setNotifications(updatedNotifications);
    setHasNotifications(updatedNotifications.length > 0);
  };

  useEffect(() => {
    if (user && user.id) {
      fetch(`http://localhost:5000/pets?ownerId=${user.id}`)
        .then((response) => response.json())
        .then((pets: Pet[]) => {
          const today = new Date();
          const tomorrow = new Date(today);
          tomorrow.setDate(today.getDate() + 1); // Fecha de mañana

          const upcomingBirthdays = pets.filter((pet: Pet) => {
            const birthDateParts = pet.birthDate.split("-"); // ["YYYY", "MM", "DD"]
            const petBirthday = new Date(
              today.getFullYear(),
              parseInt(birthDateParts[1]) - 1, // Mes (0 indexado)
              parseInt(birthDateParts[2]) // Día
            );

            return petBirthday.getDate() === tomorrow.getDate() && petBirthday.getMonth() === tomorrow.getMonth();
          });

          if (upcomingBirthdays.length > 0) {
            setHasNotifications(true);
            setNotifications(
              upcomingBirthdays.map((pet: Pet) => `${pet.name} cumple años mañana! 🎉`)
            );
          } else {
            setHasNotifications(false);
            setNotifications([]);
          }
        })
        .catch((error) => console.error("Error al obtener mascotas:", error));
    }
  }, [user]);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  // Función para desplazarse a la sección de testimonios
  const handleScrollToTestimonials = () => {
    if (location.pathname === "/") {
      scroll.scrollTo(document.getElementById("testimonios")?.offsetTop || 0, {
        duration: 800,
        smooth: "easeInOutQuart",
      });
    } else {
      navigate("/#testimonios");
      setTimeout(() => {
        scroll.scrollTo(document.getElementById("testimonios")?.offsetTop || 0, {
          duration: 800,
          smooth: "easeInOutQuart",
        });
      }, 100);
    }
  };

  return { user, handleLogout, handleScrollToTestimonials, hasNotifications, notifications };
}
