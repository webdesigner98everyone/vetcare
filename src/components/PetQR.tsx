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
      <p className="section-descriptionQR">
        Escanea el QR para visualizar la información de tus mascotas.
      </p>
      {user && pets.length > 0 ? (
        pets.map((pet) => {
          const qrData = encodeURIComponent(
            JSON.stringify({
              owner: { name: user.name, contact: user.contact },
              pet: {
                name: pet.name,
                breed: pet.breed,
                species: pet.species,
                microchip: pet.microchip,
              },
            })
          );

          return (
            <div key={pet.id} className="qr-card">
              <h3>{pet.name}</h3>
              <QRCodeCanvas
                className="qr-code"
                value={`http://192.168.1.7:3000/qr-info/${qrData}`} // URL para mostrar info la IP utilizada es la IPV4 de nuestra maquina local
                size={180}
              />
            </div>
          );
        })
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
