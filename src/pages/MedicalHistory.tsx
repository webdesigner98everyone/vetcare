import React, { useEffect, useState } from "react";

interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  ownerId: string;
}

interface MedicalRecord {
  id: string;
  petId: string;
  date: string;
  description: string;
  veterinarian: string;
}

const MedicalHistory: React.FC = () => {
  const [medicalHistory, setMedicalHistory] = useState<{ pet: Pet; records: MedicalRecord[] }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMedicalHistory = async () => {
      try {
        const userString = localStorage.getItem("user");
        if (!userString) {
          setError("Usuario no autenticado");
          setLoading(false);
          return;
        }

        const user = JSON.parse(userString);
        const userId = user.id;

        // Obtener las mascotas del usuario
        const petsResponse = await fetch("http://localhost:5000/pets");
        const petsData: Pet[] = await petsResponse.json();
        const userPets = petsData.filter((pet) => pet.ownerId === userId);

        if (userPets.length === 0) {
          setError("No hay mascotas registradas para este usuario.");
          setLoading(false);
          return;
        }

        // Obtener el historial médico
        const medicalHistoryResponse = await fetch("http://localhost:5000/medicalHistory");
        const medicalHistoryData: MedicalRecord[] = await medicalHistoryResponse.json();

        // Agrupar el historial médico por mascota
        const groupedHistory = userPets.map((pet) => ({
          pet,
          records: medicalHistoryData.filter((record) => record.petId === pet.id),
        }));

        setMedicalHistory(groupedHistory);
      } catch (err) {
        setError("Error al cargar el historial médico.");
      } finally {
        setLoading(false);
      }
    };

    fetchMedicalHistory();
  }, []);

  if (loading) return <p>Cargando historial médico...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Historial Médico</h2>
      {medicalHistory.length === 0 ? (
        <p>No hay historial médico disponible.</p>
      ) : (
        medicalHistory.map(({ pet, records }) => (
          <div key={pet.id} style={{ marginBottom: "20px", padding: "15px", border: "1px solid #ddd", borderRadius: "10px", backgroundColor: "#f9f9f9" }}>
            <h3>Mascota: {pet.name}</h3>
            <p><strong>Especie:</strong> {pet.species}</p>
            <p><strong>Raza:</strong> {pet.breed}</p>
            <h4>Historial:</h4>
            {records.length > 0 ? (
              <ul>
                {records.map((record) => (
                  <li key={record.id} style={{ marginBottom: "10px" }}>
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
