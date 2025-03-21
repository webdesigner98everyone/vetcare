import React, { useMemo, useEffect, useState } from "react";
import { usePetVaccinations } from "../components/logic/usePetVaccinations";
import { FaSyringe } from "react-icons/fa";
import "../styles/PetVaccines.css";

const VaccinationList: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserId(parsedUser.id || null);
      } catch (error) {
        console.error("Error al parsear el usuario de localStorage", error);
      }
    }
  }, []);

  const { pets, vaccinations, loading, error } = usePetVaccinations(userId || undefined);

  console.log("userId obtenido:", userId);
  console.log("Mascotas obtenidas:", pets);
  console.log("Vacunas obtenidas:", vaccinations);

  const content = useMemo(() => {
    if (!userId) return <p className="error-text">Usuario no identificado. Por favor, inicia sesión.</p>;
    if (loading) return <p className="loading-text">Cargando información...</p>;
    if (error) return <p className="error-text">{error}</p>;
    if (pets.length === 0) return (
      <div className="no-vaccination-history">
        <FaSyringe className="no-history-icon" />
        <p>No hay mascota registrada con este usuario para mostrar historico de Vacunas.</p>
      </div>
    );

    return pets.map((pet) => (
      <div key={pet.id} className="card">
        <h3 className="pet-name">{pet.name}</h3>
        <img src={pet.photo} alt={pet.name} className="pet-photo" />
        <p><strong>Especie:</strong> {pet.species}</p>
        <p><strong>Raza:</strong> {pet.breed}</p>
        <p><strong>Microchip:</strong> {pet.microchip}</p>

        <h4 className="section-title">Historial de Vacunación</h4>
        {vaccinations[pet.id]?.length > 0 ? (
          <div className="vaccination-history">
            {vaccinations[pet.id].map((vac) => (
              <div key={vac.id} className="vaccination-item">
                <p><strong className="highlight">Vacuna:</strong> {vac.vaccineName}</p>
                <p><strong className="highlight">Fecha aplicada:</strong> {vac.dateAdministered}</p>
                <p><strong className="highlight">Veterinario:</strong> {vac.veterinarian}</p>
                {vac.nextDose && <p><strong className="highlight">Próxima dosis:</strong> {vac.nextDose}</p>}
              </div>
            ))}
          </div>
        ) : (
          <p className="no-data-text">Sin vacunas registradas.</p>
        )}
      </div>
    ));
  }, [userId, pets, vaccinations, loading, error]);

  return (
    <div className="vaccination-container">
      <h2 className="title">Historial de Vacunas</h2>
      {content}
    </div>
  );
};

export default VaccinationList;
