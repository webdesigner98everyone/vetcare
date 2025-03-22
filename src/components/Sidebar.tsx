import { useState } from "react";
import { Link } from "react-router-dom";
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
                    <p className="username">Usuario</p>
                </div>

                <nav>
                    <ul>
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
                    <Link to="/logout" onClick={() => setIsOpen(false)}>
                        <FaSignOutAlt /> <span>Salir</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
