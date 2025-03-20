import React, { useEffect, useState } from "react";
import { getPetsByOwnerId } from "../components/logic/petService";
import { Card, Alert, Spinner } from "react-bootstrap";
import "../styles/PetProfile.css";

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
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const userData = localStorage.getItem("user");
        if (!userData) {
          setError("No hay usuario logueado. Inicia sesión.");
          setLoading(false);
          return;
        }

        const user = JSON.parse(userData);
        const loggedInUserId = Number(user.id); // Convertir a número

        const userPets = await getPetsByOwnerId(loggedInUserId);
        setPets(userPets);
      } catch (err) {
        setError("Error al obtener los datos de mascotas.");
      } finally {
        setLoading(false);
      }
    };


    fetchPets();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
        <p>Cargando mascotas...</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h2>Información de tu mascota</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      {pets.length > 0 ? (
        <div className="row">
          {pets.map((pet) => (
            <div key={pet.id} className="col-md-4">
              <Card className="mb-3">
                <Card.Img variant="top" src={pet.photo} alt={pet.name} />
                <Card.Body>
                  <Card.Title>{pet.name}</Card.Title>
                  <Card.Text>
                    <strong>Raza:</strong> {pet.breed} <br />
                    <strong>Especie:</strong> {pet.species} <br />
                    <strong>Género:</strong> {pet.gender} <br />
                    <strong>Fecha de nacimiento:</strong> {pet.birthDate} <br />
                    <strong>Microchip:</strong> {pet.microchip}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <Alert variant="warning">
          No tienes mascotas registradas. Contacta con el administrador.
        </Alert>
      )}
    </div>
  );
};

export default PetProfile;
