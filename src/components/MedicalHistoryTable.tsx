import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../styles/MedicalHistoryTable.css";
import AddMedicalRecord from "./AddMedicalRecord";
import EditMedicalRecord from "./EditMedicalRecord";
import AddMedicalRecordModal from "./AddMedicalRecordModal";

interface MedicalRecord {
    id: string;
    petId: string;
    date: string;
    description: string;
    veterinarian: string;
}

interface Pet {
    id: string;
    name: string;
}

const MedicalHistoryManagement: React.FC = () => {
    const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
    const [pets, setPets] = useState<Pet[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [mostrarAgregarRegistro, setMostrarAgregarRegistro] = useState(false);
    const [registroSeleccionado, setRegistroSeleccionado] = useState<MedicalRecord | null>(null);
    const [petSeleccionada, setPetSeleccionada] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    // Estado para manejar la visibilidad del modal
    const [showAddRecordModal, setShowAddRecordModal] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [medicalRecordsResponse, petsResponse] = await Promise.all([
                axios.get("http://localhost:5000/medicalHistory"),
                axios.get("http://localhost:5000/pets")
            ]);
            setMedicalRecords(medicalRecordsResponse.data);
            setPets(petsResponse.data);
        } catch (error) {
            setError("Error al cargar los datos.");
            console.error("Error fetching data:", error);
        }
    };

    const handleDeleteRecord = async (id: string) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción eliminará el historial médico permanentemente.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:5000/medicalHistory/${id}`);
                    fetchData();
                    Swal.fire("Eliminado", "El historial médico ha sido eliminado.", "success");
                } catch (error) {
                    console.error("Error deleting medical record:", error);
                }
            }
        });
    };

    // Memoizar para evitar cálculos innecesarios
    const groupedMedicalRecords = useMemo(() => {
        return pets.map(pet => ({
            ...pet,
            records: medicalRecords.filter(record => record.petId === pet.id)
        })).filter(pet => pet.records.length > 0);
    }, [medicalRecords, pets]);

    return (
        <div className="historial-container">
            <h2>Gestión de Historial Médico</h2>
            <button onClick={() => setShowAddRecordModal(true)}>Agregar Nuevo Registro Médico</button>
            <input
                type="text"
                placeholder="Buscar por nombre de mascota..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
            />
            {error && <p className="error-message">{error}</p>}
            <ul className="historial-list">
                {groupedMedicalRecords
                    .filter(pet => pet.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((pet) => (
                        <li key={pet.id} className="historial-item">
                            <p className="pet-name"><strong>{pet.name}</strong></p>
                            <button onClick={() => {
                                setPetSeleccionada(pet.id);
                                setMostrarAgregarRegistro(true);
                            }}>➕ Agregar Registro</button>
                            <ul className="record-list">
                                {pet.records.map(record => (
                                    <li key={record.id} className="record-item">
                                        <p>📅 Fecha: {record.date}</p>
                                        <p>📝 Descripción: {record.description}</p>
                                        <p>👨‍⚕️ Veterinario: {record.veterinarian}</p>
                                        <div className="button-group">
                                            <button className="edit-btnrecord" onClick={() => {
                                                console.log("Registro seleccionado:", record);
                                                setRegistroSeleccionado(record);
                                            }}>✏️</button>
                                            <button className="delete-btnrecord" onClick={() => handleDeleteRecord(record.id)}>🗑️</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))
                }
                {groupedMedicalRecords.filter(pet => pet.name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
                    <p className="no-results">❌ No se encontraron registros.</p>
                )}
            </ul>

            {mostrarAgregarRegistro && petSeleccionada && (
                <AddMedicalRecord
                    petId={petSeleccionada}
                    onClose={() => setMostrarAgregarRegistro(false)}
                    onRecordAdded={fetchData}
                />
            )}

            {registroSeleccionado && (
                <EditMedicalRecord
                    key={registroSeleccionado.id}
                    record={registroSeleccionado}
                    onClose={() => setRegistroSeleccionado(null)}
                    onRecordUpdated={fetchData}
                />
            )}

            {showAddRecordModal && (
                <AddMedicalRecordModal
                    onClose={() => setShowAddRecordModal(false)}
                    onRecordAdded={fetchData}
                />
            )}
        </div>
    );
};

export default MedicalHistoryManagement;
