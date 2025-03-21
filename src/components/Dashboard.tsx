import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import "../styles/dashboard.css"; 

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <h1 className="text-3xl font-bold text-white mb-4">
          Panel Administrativo
        </h1>
        <p className="text-gray-300 text-lg mb-6">
          Administra usuarios, mascotas y vacunas de forma eficiente.
        </p>

        {/* Tarjetas de estadísticas */}
        <div className="grid">
          <div className="card-dashboard">
            <h2>Total de Mascotas</h2>
            <p>120</p>
          </div>
          <div className="card-dashboard">
            <h2>Usuarios Registrados</h2>
            <p>45</p>
          </div>
          <div className="card-dashboard">
            <h2>Vacunas Aplicadas</h2>
            <p>312</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
