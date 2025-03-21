import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import { FaExclamationTriangle } from "react-icons/fa";
import "../styles/PetQR.css";
import { usePetQRLogic } from "../components/logic/PetQRLogic";

const PetQR: React.FC = () => {
  const { user, pets } = usePetQRLogic();

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
