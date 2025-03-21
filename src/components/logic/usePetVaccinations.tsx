import { useEffect, useState } from "react";
import axios from "axios";

interface Pet {
  id: string;
  name: string;
  breed: string;
  species: string;
  gender: string;
  birthDate: string;
  microchip: string;
  photo: string;
}

interface Vaccination {
  id: string;
  petId: string;
  vaccineName: string;
  dateAdministered: string;
  nextDose: string;
  veterinarian: string;
}

export const usePetVaccinations = (userId?: string) => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [vaccinations, setVaccinations] = useState<Record<string, Vaccination[]>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchPetsAndVaccinations = async () => {
      setLoading(true);
      setError(null);

      try {
        // Obtener mascotas del usuario
        const { data: userPets } = await axios.get<Pet[]>(`http://localhost:5000/pets?ownerId=${userId}`);
        setPets(userPets);

        // Obtener vacunas solo si hay mascotas registradas
        if (userPets.length > 0) {
          const { data: allVaccinations } = await axios.get<Vaccination[]>(`http://localhost:5000/vaccinations`);
          
          // Filtrar vacunas solo para las mascotas del usuario
          const petVaccinationsMap: Record<string, Vaccination[]> = {};
          userPets.forEach((pet) => {
            petVaccinationsMap[pet.id] = allVaccinations.filter((vac) => vac.petId === pet.id);
          });

          setVaccinations(petVaccinationsMap);
        }
      } catch (err) {
        console.error("Error obteniendo datos", err);
        setError("Error al cargar los datos. Inténtalo de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    fetchPetsAndVaccinations();
  }, [userId]);

  return { pets, vaccinations, loading, error };
};
