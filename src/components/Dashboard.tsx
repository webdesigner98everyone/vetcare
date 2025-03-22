import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "../styles/dashboard.css";

const Dashboard: React.FC = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPets, setTotalPets] = useState(0);
  const [totalVaccinations, setTotalVaccinations] = useState(0);

  useEffect(() => {
    // Cargar la cantidad de usuarios
    fetch("http://localhost:5000/users")
      .then((response) => response.json())
      .then((data) => setTotalUsers(data.length))
      .catch((error) => console.error("Error al obtener usuarios:", error));

    // Cargar la cantidad de mascotas
    fetch("http://localhost:5000/pets")
      .then((response) => response.json())
      .then((data) => setTotalPets(data.length))
      .catch((error) => console.error("Error al obtener mascotas:", error));

    // Cargar la cantidad de vacunas aplicadas
    fetch("http://localhost:5000/vaccinations")
      .then((response) => response.json())
      .then((data) => setTotalVaccinations(data.length))
      .catch((error) => console.error("Error al obtener vacunas:", error));
  }, []);

  return (
    <div className="sidebar-container">
      <Sidebar />
      <div className="dashboard-content">
        <h1 className="text-3xl font-bold text-white mb-4">
          Panel Administrativo
        </h1>
        <p className="text-gray-300 text-lg mb-6">
          Administra usuarios, mascotas y vacunas de forma eficiente.
        </p>

        {/* Tarjetas de estadísticas con datos reales */}
        <div className="grid">
          <div className="card-dashboard">
            <h2>Total de Mascotas</h2>
            <p>{totalPets}</p>
          </div>
          <div className="card-dashboard">
            <h2>Usuarios Registrados</h2>
            <p>{totalUsers}</p>
          </div>
          <div className="card-dashboard">
            <h2>Vacunas Aplicadas</h2>
            <p>{totalVaccinations}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
