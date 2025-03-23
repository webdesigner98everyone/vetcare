import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AddVaccination.css";

interface Pet {
    id: string;
    name: string;
}

interface AddVaccinationProps {
    onClose: () => void;
    onVaccinationAdded: () => void;
}

const AddVaccination: React.FC<AddVaccinationProps> = ({ onClose, onVaccinationAdded }) => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [petId, setPetId] = useState<string>("");
    const [vaccineName, setVaccineName] = useState<string>("");
    const [dateAdministered, setDateAdministered] = useState<string>("");
    const [nextDose, setNextDose] = useState<string>("");
    const [veterinarian, setVeterinarian] = useState<string>("");

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
            alert("Todos los campos son obligatorios.");
            return;
        }

        try {
            await axios.post("http://localhost:5000/vaccinations", {
                petId,
                vaccineName,
                dateAdministered,
                nextDose,
                veterinarian,
            });

            onVaccinationAdded();
            onClose();
        } catch (error) {
            console.error("Error adding vaccination:", error);
        }
    };

    return (
        <div className="modal-vacuna">
            <div className="modal-content-vacuna">
                <h2>Agregar Vacuna</h2>
                <form onSubmit={handleSubmit}>
                    <label>Mascota:</label>
                    <select value={petId} onChange={(e) => setPetId(e.target.value)} required>
                        <option value="">Selecciona una mascota</option>
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
                        <button type="submit">Agregar</button>
                        <button type="button" onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddVaccination;
