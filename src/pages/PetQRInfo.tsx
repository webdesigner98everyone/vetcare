import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/PetQRModal.css";

interface PetInfo {
  owner: {
    name: string;
    contact: string;
  };
  pet: {
    name: string;
    breed: string;
    species: string;
    microchip: string;
  };
}

const PetQRInfo: React.FC = () => {
  const { data } = useParams<{ data: string }>();
  const [petInfo, setPetInfo] = useState<PetInfo | null>(null);

  useEffect(() => {
    if (data) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(data));
        setPetInfo(decodedData);
      } catch (error) {
        console.error("Error al decodificar la información del QR", error);
      }
    }
  }, [data]);

  if (!petInfo) {
    return <p>Cargando información...</p>;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">Información de la Mascota</h2>
        <div className="modal-content">
          <p><strong>Dueño:</strong> {petInfo.owner.name}</p>
          <p><strong>Contacto:</strong> {petInfo.owner.contact}</p>
          <p><strong>Nombre:</strong> {petInfo.pet.name}</p>
          <p><strong>Raza:</strong> {petInfo.pet.breed}</p>
          <p><strong>Especie:</strong> {petInfo.pet.species}</p>
          <p><strong>Microchip:</strong> {petInfo.pet.microchip}</p>
        </div>
      </div>
    </div>
  );
};

export default PetQRInfo;
