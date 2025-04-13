import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  contact: string;
}

interface Pet {
  id: string;
  name: string;
  breed: string;
  species: string;
  microchip: string;
  ownerId: string;
}

export const usePetQRLogic = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [user, setUser] = useState<User | null>(null);

  // 🔹 Obtener `userId` desde localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserId(parsedUser.id || null);
        setUser(parsedUser); // ✅ Guarda también todo el user (name, contact)
      } catch (error) {
        console.error("Error al parsear el usuario desde localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    // 🔹 Obtener datos del usuario desde nuestra IPV4 de nuestra maquina local
    fetch("http://192.168.1.4:5000/users")
      .then((res) => res.json())
      .then((users: User[]) => {
        const loggedInUser = users.find((u) => u.id === userId) || null;
        setUser(loggedInUser);
      })
      .catch((err) => console.error("Error cargando usuarios:", err));

    // 🔹 Obtener datos de mascotas asociadas al usuario desde nuestra IPV4 de nuestra maquina local
    fetch("http://192.168.1.4:5000/pets")
      .then((res) => res.json())
      .then((allPets: Pet[]) => {
        const userPets = allPets.filter((pet) => pet.ownerId === userId);
        setPets(userPets);
      })
      .catch((err) => console.error("Error cargando mascotas:", err));
  }, [userId]);

  return { user, pets };
};
