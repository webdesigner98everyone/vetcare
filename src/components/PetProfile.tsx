import React, { useEffect, useState } from "react";
import { getPetsByOwnerId } from "./logic/petService";
import { Card, Alert, Spinner, Modal, Button } from "react-bootstrap";
import "../styles/PetProfile.css";

// Definimos la interfaz para la estructura de los datos de la mascota
interface Pet {
  id: string;
  ownerId: number;
  photo: string;
  name: string;
  breed: string;
  species: string;
  gender: string;
  birthDate: string;
  microchip: string;
}

const PetProfile: React.FC = () => {
  // Estados para manejar los datos y la UI del componente

  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [showModal, setShowModal] = useState(false);

  // useEffect para cargar las mascotas del usuario cuando se monta el componente
  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true);
      try {
        const userPets = await getPetsByOwnerId();
        setPets(userPets);
      } catch (err) {
        setError("Error al obtener los datos de mascotas.");
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  // Función para abrir el modal con la información de la mascota seleccionada
  const handleShowModal = (pet: Pet) => {
    setSelectedPet(pet);
    setShowModal(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPet(null);
  };

  return (
    <div className="profile-wrapper"> {/* Contenedor principal con flexbox */}
      <div className="profile-container">
        <h2>Información de tu mascota 🐶</h2>
        <p className="section-description">
          Aquí puedes visualizar el perfil de tus mascotas registradas en el sistema.
          Haz clic en una de ellas para ver más detalles.
        </p>
        {error && <Alert variant="danger">{error}</Alert>}

        {loading ? (
          <div className="text-center mt-4">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Cargando...</span>
            </Spinner>
            <p>Cargando mascotas...</p>
          </div>
        ) : pets.length > 0 ? (
          <div className="row">
            {pets.map((pet) => (
              <div key={pet.id} className="col-md-4">
                <Card className="pet-card" onClick={() => handleShowModal(pet)}>
                  <Card.Img variant="top" src={pet.photo} alt={pet.name} />
                  <Card.Body>
                    <Card.Title>{pet.name}</Card.Title>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <Alert variant="warning">
            No tienes mascotas registradas. Contactate con el administrador para iniciar el seguimiento para tus peluditos.
          </Alert>
        )}

        {/* MODAL PARA MOSTRAR DETALLES DE LA MASCOTA */}
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedPet?.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedPet && (
              <div className="modal-pet-info">
                <img src={selectedPet.photo} alt={selectedPet.name} className="modal-img" />
                <p><strong>Raza:</strong> {selectedPet.breed}</p>
                <p><strong>Especie:</strong> {selectedPet.species}</p>
                <p><strong>Género:</strong> {selectedPet.gender}</p>
                <p><strong>Fecha de nacimiento:</strong> {selectedPet.birthDate}</p>
                <p><strong>Microchip:</strong> {selectedPet.microchip}</p>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>Cerrar</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default PetProfile;
