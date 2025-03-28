import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../styles/NewRegisterMedical.css";

interface Pet {
  id: string;
  name: string;
}

interface AddMedicalRecordModalProps {
  onClose: () => void;
  onRecordAdded: () => void;
}

const AddMedicalRecordModal: React.FC<AddMedicalRecordModalProps> = ({ onClose, onRecordAdded }) => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPet, setSelectedPet] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [veterinarian, setVeterinarian] = useState<string>("");

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get("http://localhost:5000/pets");
        setPets(response.data);
      } catch (error) {
        console.error("Error al cargar mascotas:", error);
      }
    };
    fetchPets();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!selectedPet || !date || !description || !veterinarian) {
      Swal.fire("Error", "Todos los campos son obligatorios", "error");
      return;
    }
  
    try {
      // Obtener los registros médicos existentes
      const response = await axios.get("http://localhost:5000/medicalHistory");
      const medicalRecords = response.data;
  
      // Encontrar el último ID numérico y calcular el siguiente ID
      const lastId = medicalRecords.length > 0 
        ? Math.max(...medicalRecords.map((record: any) => parseInt(record.id, 10) || 0)) 
        : 0;
      const newId = (lastId + 1).toString(); // Convertirlo a string para mantener consistencia
  
      // Enviar el nuevo registro con ID corregido
      await axios.post("http://localhost:5000/medicalHistory", {
        id: newId, // Se asigna el nuevo ID
        petId: selectedPet,
        date,
        description,
        veterinarian,
      });
  
      Swal.fire("Éxito", "Historial médico agregado correctamente", "success");
      onRecordAdded();
      onClose();
    } catch (error) {
      console.error("Error al agregar historial médico:", error);
      Swal.fire("Error", "No se pudo agregar el historial", "error");
    }
  };

  return (
    <div className="modal-addNewRegister">
      <div className="modal-containeraddNewRegister">
        <h2>Agregar Historial Médico</h2>
        <form onSubmit={handleSubmit}>
          <label>Mascota:</label>
          <select value={selectedPet} onChange={(e) => setSelectedPet(e.target.value)} required>
            <option value="">Seleccione una mascota</option>
            {pets.map((pet) => (
              <option key={pet.id} value={pet.id}>
                {pet.name}
              </option>
            ))}
          </select>

          <label>Fecha:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

          <label>Descripción:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

          <label>Veterinario:</label>
          <input type="text" value={veterinarian} onChange={(e) => setVeterinarian(e.target.value)} required />

          <div className="modal-actionsnewRegister">
            <button type="submit">Guardar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMedicalRecordModal;
