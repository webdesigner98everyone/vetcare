import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Importamos SweetAlert2
import "../styles/VaccinesTable.css";
import AddVaccination from "./AddVaccination";
import EditVaccination from "./EditVaccination";

interface Vaccination {
    id: string;
    petId: string;
    vaccineName: string;
    dateAdministered: string;
    nextDose: string;
    veterinarian: string;
}

interface Pet {
    id: string;
    name: string;
}

const VaccinationManagement: React.FC = () => {
    const [vaccinations, setVaccinations] = useState<Vaccination[]>([]);
    const [pets, setPets] = useState<Pet[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [mostrarAgregarVacuna, setMostrarAgregarVacuna] = useState(false);
    const [vacunaSeleccionada, setVacunaSeleccionada] = useState<Vaccination | null>(null);

    useEffect(() => {
        fetchVaccinations();
        fetchPets();
    }, []);

    const fetchVaccinations = async () => {
        try {
            const response = await axios.get("http://localhost:5000/vaccinations");
            setVaccinations(response.data);
        } catch (error) {
            console.error("Error fetching vaccinations:", error);
        }
    };

    const fetchPets = async () => {
        try {
            const response = await axios.get("http://localhost:5000/pets");
            setPets(response.data);
        } catch (error) {
            console.error("Error fetching pets:", error);
        }
    };

    const handleDeleteVaccination = async (id: string) => {
        // Alerta de confirmación
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción eliminará la vacuna permanentemente.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:5000/vaccinations/${id}`);
                    setVaccinations(vaccinations.filter((vaccine) => vaccine.id !== id));

                    // Mostrar alerta de éxito
                    Swal.fire({
                        title: "Eliminado",
                        text: "La vacuna ha sido eliminada correctamente.",
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false,
                    });
                } catch (error) {
                    console.error("Error deleting vaccination:", error);
                }
            }
        });
    };

    const groupedVaccinations = pets.map(pet => ({
        ...pet,
        vaccines: vaccinations.filter(vac => vac.petId === pet.id)
    })).filter(pet => pet.vaccines.length > 0);

    return (
        <div className="vacunas-container">
            <h2>Gestión de Vacunas</h2>
            <button className="add-vacuna-btn" onClick={() => setMostrarAgregarVacuna(true)}>Agregar Vacuna</button>
            <input
                type="text"
                placeholder="Buscar por nombre de mascota..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
            />
            <ul className="vacunas-list">
                {groupedVaccinations
                    .filter(pet => pet.name.toLowerCase().includes(searchTerm.toLowerCase()))

                    .map((pet) => (
                        <li key={pet.id} className="vacunas-item">
                            <p className="pet-name"><strong>{pet.name}</strong></p>
                            <ul className="vaccine-list">
                                {pet.vaccines.map(vac => (
                                    <li key={vac.id} className="vaccine-item">
                                        <p>{vac.vaccineName} (Aplicada: {vac.dateAdministered})</p>
                                        <p>🗓 Próxima Dosis: {vac.nextDose}</p>
                                        <p>Veterinario: {vac.veterinarian}</p>
                                        <div className="button-group">
                                            <button className="edit-btnvacuna" onClick={() => setVacunaSeleccionada(vac)}>✏️</button>
                                            <button className="delete-btnvacuna" onClick={() => handleDeleteVaccination(vac.id)}>🗑️</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))
                }
                {groupedVaccinations.filter(pet => pet.name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
                    <p className="no-results">❌ No se encontraron registros.</p>
                )}
            </ul>

            {/* Modal para agregar vacuna */}
            {mostrarAgregarVacuna && (
                <AddVaccination
                    onClose={() => setMostrarAgregarVacuna(false)}
                    onVaccinationAdded={fetchVaccinations}
                />
            )}

            {/* Modal para editar vacuna */}
            {vacunaSeleccionada && (
                <EditVaccination
                    vaccination={vacunaSeleccionada}
                    onClose={() => setVacunaSeleccionada(null)}
                    onVaccinationUpdated={fetchVaccinations}
                />
            )}
        </div>
    );
};

export default VaccinationManagement;
