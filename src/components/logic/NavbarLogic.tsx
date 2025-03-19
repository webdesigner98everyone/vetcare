// components/logic/navbarLogic.ts
import { useNavigate, useLocation } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";

export function useNavbarLogic() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

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

  return { user, handleLogout, handleScrollToTestimonials };
}
