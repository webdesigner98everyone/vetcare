import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "../styles/AddPets.css";

interface Pet {
    id: string;
    ownerId: string;
    name: string;
    breed: string;
    species: string;
    gender: string;
    birthDate: string;
    microchip: string;
    photo: string;
}

interface User {
    id: string;
    name: string;
}

interface Props {
    onClose: () => void;
    onAdd: (pet: Pet) => Promise<void>;
    existingPets: Pet[];
}

const AgregarMascota: React.FC<Props> = ({ onClose, onAdd, existingPets }) => {
    const [formData, setFormData] = useState<Omit<Pet, "id">>({
        ownerId: "",
        name: "",
        breed: "",
        species: "",
        gender: "",
        birthDate: "",
        microchip: "",
        photo: "",
    });

    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:5000/users");
                if (!response.ok) throw new Error("Error al obtener los usuarios");
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error al cargar usuarios:", error);
            }
        };

        fetchUsers();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({ ...prev, photo: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const getNextId = (): string => {
        if (existingPets.length === 0) return "1";
        const lastId = Math.max(...existingPets.map((pet) => parseInt(pet.id, 10)));
        return (lastId + 1).toString();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const newPet = { ...formData, id: getNextId() };
            await onAdd(newPet);
            Swal.fire({
                icon: "success",
                title: "¡Mascota agregada exitosamente!",
                showConfirmButton: false,
                timer: 3000,
            });
            onClose();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Hubo un error al agregar la mascota",
                text: (error as Error).message || "Intenta nuevamente.",
                confirmButtonText: "Aceptar",
            });
        }
    };

    return (
        <div className="modaladdPets-overlay">
            <div className="modal-containerpet">
                <h2>Agregar Mascota</h2>
                <form onSubmit={handleSubmit}>
                    <select name="ownerId" value={formData.ownerId} onChange={handleChange} required>
                        <option value="">Selecciona el dueño</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>

                    <input type="text" name="name" placeholder="Nombre Mascota" value={formData.name} onChange={handleChange} required />
                    <input type="text" name="breed" placeholder="Raza" value={formData.breed} onChange={handleChange} required />

                    <select name="species" value={formData.species} onChange={handleChange} required>
                        <option value="">Selecciona una especie</option>
                        <option value="Perro">Perro</option>
                        <option value="Gato">Gato</option>
                        <option value="Ave">Ave</option>
                        <option value="Conejo">Conejo</option>
                        <option value="Roedor">Roedor</option>
                        <option value="Reptil">Reptil</option>
                        <option value="Pez">Pez</option>
                        <option value="Otro">Otro</option>
                    </select>

                    <select name="gender" value={formData.gender} onChange={handleChange} required>
                        <option value="">Selecciona Género</option>
                        <option value="Macho">Macho</option>
                        <option value="Hembra">Hembra</option>
                    </select>

                    <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} required />
                    <input type="text" name="microchip" placeholder="Número de Microchip" value={formData.microchip} onChange={handleChange} required />

                    <input type="file" name="photo" accept="image/*" onChange={handleFileChange} required />

                    <button className="btnadd" type="submit">Guardar</button>
                    <button className="btnadd" type="button" onClick={onClose}>Cancelar</button>
                </form>
            </div>
        </div>
    );
};

export default AgregarMascota;
