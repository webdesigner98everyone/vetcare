import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/PetsTable.css"; // Importa el CSS
import AddPets from "./AddPets";
import EditarMascota from "./UpdatePet";
import Swal from "sweetalert2";


interface User {
    id: string;
    name: string;
}

interface Pet {
    id: string;
    ownerId: string;
    ownerName?: string;
    name: string;
    breed: string;
    species: string;
    gender: string;
    birthDate: string;
    microchip: string;
    photo: string; // Agregar este campo para que coincida con el tipo esperado
}

const PetsTable = () => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingPet, setEditingPet] = useState<Pet | null>(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        if (users.length > 0) {
            fetchPets();
        }
    }, [users]);

    const fetchPets = async () => {
        try {
            const response = await axios.get("http://localhost:5000/pets");
            const updatedPets = response.data.map((pet: Pet) => {
                const owner = users.find((user) => user.id === pet.ownerId);
                return { ...pet, ownerName: owner ? owner.name : "Desconocido" };
            });
            setPets(updatedPets);
        } catch (error) {
            console.error("Error fetching pets:", error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:5000/users");
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // Función para eliminar una mascota con alerta de confirmación
    const handleDelete = async (id: string) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción eliminará la mascota del usuario registrada permanentemente.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:5000/pets/${id}`);
                    fetchPets();
                    Swal.fire("Eliminado", "La mascota ha sido eliminada.", "success");
                } catch (error) {
                    console.error("Error deleting pet:", error);
                    Swal.fire("Error", "No se pudo eliminar la mascota.", "error");
                }
            }
        });
    };

    const handleAddPet = async (newPet: Omit<Pet, "id">) => {
        try {
            const response = await axios.post("http://localhost:5000/pets", newPet);
            const addedPet = response.data;

            setPets((prevPets) => [...prevPets, { ...addedPet, ownerName: users.find((u) => u.id === addedPet.ownerId)?.name || "Desconocido" }]);
            setShowAddModal(false);
        } catch (error) {
            console.error("Error adding pet:", error);
        }
    };

    const handleUpdatePet = async (updatedPet: Pet) => {
        try {
            await axios.put(`http://localhost:5000/pets/${updatedPet.id}`, updatedPet);
            fetchPets();
            setEditingPet(null);
        } catch (error) {
            console.error("Error updating pet:", error);
        }
    };

    return (
        <div className="containerpets">
            <h2 className="Seccionh2">Gestión de Mascotas</h2>
            <input
                type="text"
                placeholder="Buscar por nombre de mascota"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="searchPets-input"
            />

            {showAddModal && (
                <AddPets
                    onAdd={handleAddPet}
                    onClose={() => setShowAddModal(false)}
                    existingPets={pets}
                />
            )}

            {editingPet && (
                <EditarMascota
                    pet={editingPet}
                    onUpdate={handleUpdatePet}
                    onClose={() => setEditingPet(null)}
                />
            )}

            <div className="table-containerpets">
                <table>
                    <thead>
                        <tr>
                            <th>Nombre Mascota</th>
                            <th>Raza</th>
                            <th>Especie</th>
                            <th>Género</th>
                            <th>Fecha Nacimiento</th>
                            <th>Microchip</th>
                            <th>Nombre Dueño</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pets.filter((pet) => pet.name.toLowerCase().includes(search.toLowerCase())).length === 0 ? (
                            <tr>
                                <td colSpan={8} style={{ textAlign: "center", fontWeight: "bold", padding: "10px" }}>
                                    ❌ No se encontraron Mascotas con ese nombre.
                                </td>
                            </tr>
                        ) : (
                            pets
                                .filter((pet) => pet.name.toLowerCase().includes(search.toLowerCase()))
                                .map((pet) => (
                                    <tr key={pet.id}>
                                        <td>{pet.name}</td>
                                        <td>{pet.breed}</td>
                                        <td>{pet.species}</td>
                                        <td>{pet.gender}</td>
                                        <td>{pet.birthDate}</td>
                                        <td>{pet.microchip}</td>
                                        <td>{pet.ownerName}</td>
                                        <td className="action-buttons">
                                            <button className="edit-btn" onClick={() => setEditingPet(pet)}>✏️</button>
                                            <button className="delete-btn" onClick={() => handleDelete(pet.id)}>🗑️</button>
                                        </td>
                                    </tr>
                                ))
                        )}
                    </tbody>
                </table>
                <button className="add-button" onClick={() => setShowAddModal(true)}>
                    Agregar Mascota
                </button>
            </div>
        </div>
    );
};

export default PetsTable;
