import React from "react";
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
  onClose: () => void;
}

const PetQRModal: React.FC<PetInfo> = ({ owner, pet, onClose }) => {
  return (
    <div className="modal-overlayQR">
      <div className="modal-containerQR">
        <h2 className="modal-titleQR">Información de la Mascota</h2>
        <div className="modal-contentQR">
          <p><strong>Dueño:</strong> {owner.name}</p>
          <p><strong>Contacto:</strong> {owner.contact}</p>
          <p><strong>Nombre:</strong> {pet.name}</p>
          <p><strong>Raza:</strong> {pet.breed}</p>
          <p><strong>Especie:</strong> {pet.species}</p>
          <p><strong>Microchip:</strong> {pet.microchip}</p>
        </div>
        <button className="close-btn" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default PetQRModal;
