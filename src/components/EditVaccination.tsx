import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

interface Pet {
    id: string;
    name: string;
}

interface Vaccination {
    id: string;
    petId: string;
    vaccineName: string;
    dateAdministered: string;
    nextDose: string;
    veterinarian: string;
}

interface EditVaccinationProps {
    vaccination: Vaccination;
    onClose: () => void;
    onVaccinationUpdated: () => void;
}

const EditVaccination: React.FC<EditVaccinationProps> = ({ vaccination, onClose, onVaccinationUpdated }) => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [petId, setPetId] = useState<string>(vaccination.petId);
    const [vaccineName, setVaccineName] = useState<string>(vaccination.vaccineName);
    const [dateAdministered, setDateAdministered] = useState<string>(vaccination.dateAdministered);
    const [nextDose, setNextDose] = useState<string>(vaccination.nextDose);
    const [veterinarian, setVeterinarian] = useState<string>(vaccination.veterinarian);

    useEffect(() => {
        fetchPets();
    }, []);

    const fetchPets = async () => {
        try {
            const response = await axios.get("http://localhost:5000/pets");
            setPets(response.data);
        } catch (error) {
            console.error("Error fetching pets:", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!petId || !vaccineName || !dateAdministered || !nextDose || !veterinarian) {
            Swal.fire("Error", "Todos los campos son obligatorios.", "error");
            return;
        }

        try {
            await axios.put(`http://localhost:5000/vaccinations/${vaccination.id}`, {
                petId,
                vaccineName,
                dateAdministered,
                nextDose,
                veterinarian,
            });

            Swal.fire("Éxito", "Vacunación actualizada correctamente.", "success");
            onVaccinationUpdated();
            onClose();
        } catch (error) {
            console.error("Error updating vaccination:", error);
            Swal.fire("Error", "Hubo un problema al actualizar la vacunación.", "error");
        }
    };

    return (
        <div className="modal-vacuna">
            <div className="modal-content-vacuna">
                <h2>Editar Vacuna</h2>
                <form onSubmit={handleSubmit}>
                    <label>Mascota:</label>
                    <select value={petId} onChange={(e) => setPetId(e.target.value)} required>
                        {pets.map((pet) => (
                            <option key={pet.id} value={pet.id}>{pet.name}</option>
                        ))}
                    </select>

                    <label>Vacuna:</label>
                    <input type="text" value={vaccineName} onChange={(e) => setVaccineName(e.target.value)} required />

                    <label>Fecha Administrada:</label>
                    <input type="date" value={dateAdministered} onChange={(e) => setDateAdministered(e.target.value)} required />

                    <label>Próxima Dosis:</label>
                    <input type="date" value={nextDose} onChange={(e) => setNextDose(e.target.value)} required />

                    <label>Veterinario:</label>
                    <input type="text" value={veterinarian} onChange={(e) => setVeterinarian(e.target.value)} required />

                    <div className="modal-buttons-vacuna">
                        <button type="submit">Actualizar</button>
                        <button type="button" onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditVaccination;
