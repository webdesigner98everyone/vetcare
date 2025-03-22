import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importamos useNavigate
import {
    FaUser,
    FaDog,
    FaSyringe,
    FaHistory,
    FaCog,
    FaSignOutAlt,
    FaHome,
    FaBars,
} from "react-icons/fa";
import "../styles/Sidebar.css";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState("Usuario");
    const navigate = useNavigate(); // Hook para redirigir

    useEffect(() => {
        // Obtener los datos del usuario desde localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const userObject = JSON.parse(storedUser);
                if (userObject.name) {
                    setUsername(userObject.name);
                }
            } catch (error) {
                console.error("Error al parsear el usuario de localStorage:", error);
            }
        }
    }, []);

    // Función para cerrar sesión
    const handleLogout = () => {
        localStorage.removeItem("user"); // Eliminar usuario del localStorage
        navigate("/login"); // Redirigir a la página de login
    };

    return (
        <div className="sidebar-wrapper">
            {/* Botón de menú hamburguesa (solo visible en pantallas pequeñas) */}
            <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
                <FaBars />
            </button>

            <div className={`sidebar ${isOpen ? "open" : ""}`}>
                <div className="sidebar-header">
                    <h1 className="highlight">VetCare Manager 🏥🐶</h1>
                </div>

                <div className="profile-section">
                    <div className="profile-picture">
                        <FaUser className="profile-icon" />
                    </div>
                    <p className="username">{username}</p>
                </div>

                <nav>
                    <ul>
                        <li>
                            <Link to="/update-profile" onClick={() => setIsOpen(false)}>
                                <FaUser /> <span>Mi Perfil</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                                <FaHome /> <span>Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/usuarios" onClick={() => setIsOpen(false)}>
                                <FaUser /> <span>Usuarios</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/mascotas" onClick={() => setIsOpen(false)}>
                                <FaDog /> <span>Mascotas</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/vacunas" onClick={() => setIsOpen(false)}>
                                <FaSyringe /> <span>Vacunas</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/historial" onClick={() => setIsOpen(false)}>
                                <FaHistory /> <span>Historial Médico</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/configuracion" onClick={() => setIsOpen(false)}>
                                <FaCog /> <span>Configuración</span>
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="logout">
                    <button onClick={handleLogout} className="logout-button">
                        <FaSignOutAlt /> <span>Salir</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
