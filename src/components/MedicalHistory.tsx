import React from "react";
import { useMedicalHistory } from "./logic/medicalHistoryLogic";
import { FaPaw } from "react-icons/fa";
import "../styles/MedicalHistory.css";

const MedicalHistory: React.FC = () => {
  const { medicalHistory, loading, error } = useMedicalHistory();

  if (loading) return <p className="loading-message">Cargando historial médico...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="medical-history-container">
      <h2 className="medical-history-title">Historial Médico</h2>
      <p className="description">
        Aquí puedes visualizar el historial medico de tus mascotas registradas en el sistema y asi poder estar atento de sus controles.
      </p>
      {medicalHistory.length === 0 ? (
        <div className="no-medical-history">
          <FaPaw className="no-history-icon" />
          <p>No hay mascota registrada con este usuario para mostrar historial médico.</p>
        </div>
      ) : (
        medicalHistory.map(({ pet, records }) => (
          <div key={pet.id} className="medical-card">
            <h3>{pet.name}</h3>
            <p><strong>Especie:</strong> {pet.species}</p>
            <p><strong>Raza:</strong> {pet.breed}</p>
            <h4>Historial Médico:</h4>
            {records.length > 0 ? (
              <ul className="medical-list">
                {records.map((record) => (
                  <li key={record.id}>
                    <strong>Fecha:</strong> {record.date} <br />
                    <strong>Descripción:</strong> {record.description} <br />
                    <strong>Veterinario:</strong> {record.veterinarian}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay historial disponible para esta mascota.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MedicalHistory;
