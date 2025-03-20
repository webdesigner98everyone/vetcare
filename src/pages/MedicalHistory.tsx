import React from "react";
import { useMedicalHistory } from "../components/logic/medicalHistoryLogic";
import "../styles/MedicalHistory.css"; // Importando estilos

const MedicalHistory: React.FC = () => {
  const { medicalHistory, loading, error } = useMedicalHistory();

  if (loading) return <p>Cargando historial médico...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="medical-history-container">
      <h2 className="medical-history-title">Historial Médico</h2>
      {medicalHistory.length === 0 ? (
        <p>No hay historial médico disponible.</p>
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
