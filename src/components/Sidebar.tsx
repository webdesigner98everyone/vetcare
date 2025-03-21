import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaDog, FaSyringe, FaHistory, FaCog, FaSignOutAlt, FaHome } from "react-icons/fa";
import "../styles/Sidebar.css";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className={`dashboard-container ${isOpen ? "open" : ""}`}>
            <div className="sidebar">
                <div className="sidebar-header">
                    <h1>
                        <span className="highlight">VetCare Manager 🏥🐶</span>
                    </h1>
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
                            <Link to="/dashboard">
                                <FaHome /> <span>Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/usuarios">
                                <FaUser /> <span>Usuarios</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/mascotas">
                                <FaDog /> <span>Mascotas</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/vacunas">
                                <FaSyringe /> <span>Vacunas</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/historial">
                                <FaHistory /> <span>Historial Médico</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/configuracion">
                                <FaCog /> <span>Configuración</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="logout">
                    <Link to="/logout">
                        <FaSignOutAlt /> <span>Salir</span>
                    </Link>
                </div>
            </div>
            <div className="dashboard-content">
                {/* Aquí irá el contenido principal */}
            </div>
        </div>
    );
};

export default Sidebar;
