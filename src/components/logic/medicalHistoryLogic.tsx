// 📂 components/logic/medicalHistoryLogic.ts
import { useState, useEffect } from "react";

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

export const useMedicalHistory = () => {
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

  return { medicalHistory, loading, error };
};
