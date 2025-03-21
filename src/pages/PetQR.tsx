import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react"; // Importación correcta
import "../styles/PetQR.css";
import { FaExclamationTriangle } from "react-icons/fa"; // Importar icono de alerta


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

const PetQR: React.FC = () => {
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
      } catch (error) {
        console.error("Error al parsear el usuario de localStorage", error);
      }
    }
  }, []);

  useEffect(() => {
    if (!userId) {
      console.error("No se encontró userId.");
      return;
    }

    // 🔹 Obtener datos del usuario
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((users: User[]) => {
        const loggedInUser = users.find((u) => u.id === userId) || null;
        setUser(loggedInUser);
      })
      .catch((err) => console.error("Error cargando usuarios:", err));

    // 🔹 Obtener datos de mascotas asociadas al usuario
    fetch("http://localhost:5000/pets")
      .then((res) => res.json())
      .then((allPets: Pet[]) => {
        const userPets = allPets.filter((pet) => pet.ownerId === userId);
        setPets(userPets);
      })
      .catch((err) => console.error("Error cargando mascotas:", err));
  }, [userId]);

  return (
    <div className="qr-container">
      <h2 className="qr-title">Código QR de tus Mascotas</h2>
      {user && pets.length > 0 ? (
        pets.map((pet) => (
          <div key={pet.id} className="qr-card">
            <h3>{pet.name}</h3>
            <QRCodeCanvas
              className="qr-code"
              value={JSON.stringify({
                owner: { name: user.name, contact: user.contact },
                pet: {
                  name: pet.name,
                  breed: pet.breed,
                  species: pet.species,
                  microchip: pet.microchip,
                },
              })}
              size={180}
            />
          </div>
        ))
      ) : (
        <div className="no-qr-history">
          <FaExclamationTriangle className="no-qr-icon" />
          <p>No tienes mascotas registradas para generar su QR.</p>
        </div>
      )}
    </div>
  );

};

export default PetQR;
