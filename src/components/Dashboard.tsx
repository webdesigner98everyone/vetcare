import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Usuarios from "./Usuarios";
import PetsTable from "./PetsTable"; // Importa PetsTable
import MedicalHistoryTable from "./MedicalHistoryTable";
import PreferencesSettings from "./PreferencesSettings";
import VaccinesTable from "./VaccinesTable"
import "../styles/Dashboard.css";

const Dashboard: React.FC = () => {
  // Estados para almacenar la cantidad de usuarios, mascotas, vacunas y historiales médicos

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPets, setTotalPets] = useState(0);
  const [totalVaccinations, setTotalVaccinations] = useState(0);
  const [totalmedicalHistory, setTotalmedicalHistory] = useState(0);
  // Estado para manejar la sección activa del dashboard

  const [activeSection, setActiveSection] = useState("dashboard");

  // useEffect para obtener datos de la API cuando se monta el componente
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((response) => response.json())
      .then((data) => setTotalUsers(data.length))
      .catch((error) => console.error("Error al obtener usuarios:", error));

    fetch("http://localhost:5000/pets")
      .then((response) => response.json())
      .then((data) => setTotalPets(data.length))
      .catch((error) => console.error("Error al obtener mascotas:", error));

    fetch("http://localhost:5000/vaccinations")
      .then((response) => response.json())
      .then((data) => setTotalVaccinations(data.length))
      .catch((error) => console.error("Error al obtener vacunas:", error));

    fetch("http://localhost:5000/medicalHistory")
      .then((response) => response.json())
      .then((data) => setTotalmedicalHistory(data.length))
      .catch((error) => console.error("Error al obtener historiales Medicos:", error));
  }, []);

  return (
    <div className="sidebar-container">
      <Sidebar setActiveSection={setActiveSection} />
      <div className="dashboard-content">
        {activeSection === "dashboard" && (
          <>
            <h1 className="text-3xl font-bold text-white mb-4">
              Panel Administrativo
            </h1>
            <p className="text-gray-300 text-lg mb-6">
              Administra usuarios, mascotas y vacunas de forma eficiente.
            </p>

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
              <div className="card-dashboard">
                <h2>Historiales Medicos De Mascotas</h2>
                <p>{totalmedicalHistory}</p>
              </div>
            </div>
          </>
        )}

        {activeSection === "usuarios" && <Usuarios/>}
        {activeSection === "mascotas" && <PetsTable/>}
        {activeSection === "vacunas" && <VaccinesTable/>}
        {activeSection === "historial" && <MedicalHistoryTable/>}
        {activeSection === "configuracion" && <PreferencesSettings/>}

      </div>
    </div>
  );
};

export default Dashboard;
