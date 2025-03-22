import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/PetsTable.css"; // Importa el CSS

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
}

const PetsTable = () => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState("");

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

    const handleDelete = async (id: string) => {
        if (window.confirm("¿Seguro que quieres eliminar esta mascota?")) {
            try {
                await axios.delete(`http://localhost:5000/pets/${id}`);
                fetchPets();
            } catch (error) {
                console.error("Error deleting pet:", error);
            }
        }
    };

    return (
        <div className="containerpets">
            <h2 className="Seccionh2">Gestión de Mascotas</h2>

            <div className="search-containerpets">
                <input
                    type="text"
                    placeholder="Buscar por nombre"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <button className="add-button" onClick={() => console.log("Agregar mascota")}>
                Agregar Mascota
            </button>

            <div className="table-containerpets">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>ID Dueño</th>
                            <th>Nombre Dueño</th>
                            <th>Raza</th>
                            <th>Especie</th>
                            <th>Género</th>
                            <th>Fecha Nacimiento</th>
                            <th>Microchip</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pets
                            .filter((pet) => pet.name.toLowerCase().includes(search.toLowerCase()))
                            .map((pet) => (
                                <tr key={pet.id}>
                                    <td>{pet.id}</td>
                                    <td>{pet.name}</td>
                                    <td>{pet.ownerId}</td>
                                    <td>{pet.ownerName}</td>
                                    <td>{pet.breed}</td>
                                    <td>{pet.species}</td>
                                    <td>{pet.gender}</td>
                                    <td>{pet.birthDate}</td>
                                    <td>{pet.microchip}</td>
                                    <td className="action-buttons">
                                        <button className="edit-btn" onClick={() => console.log("Editar", pet.id)}>✏️</button>
                                        <button className="delete-btn" onClick={() => handleDelete(pet.id)}>🗑️</button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PetsTable;
