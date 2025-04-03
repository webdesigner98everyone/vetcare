import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../styles/UpdatePet.css"

// Definimos las interfaces para tipar correctamente los datos de las mascotas y los usuarios
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

interface EditPetProps {
    pet: Pet;
    onClose: () => void;
    onUpdate: (updatedPet: Pet) => Promise<void>;
}

const EditPet: React.FC<EditPetProps> = ({ pet, onClose, onUpdate }) => {
    // Estado para almacenar la información del formulario y los usuarios
    const [formData, setFormData] = useState<Pet>(pet);
    const [users, setUsers] = useState<User[]>([]);

    // Sincroniza el estado cuando el prop `pet` cambia
    useEffect(() => {
        setFormData(pet);
    }, [pet]);

    // Obtiene la lista de usuarios desde el backend
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

    // Maneja cambios en los inputs del formulario
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Maneja la carga de imágenes y las convierte en base64
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prevState) => ({
                    ...prevState,
                    photo: reader.result as string,
                }));
            };
            reader.readAsDataURL(file);
        }
    };
    
    // Maneja el envío del formulario para actualizar la mascota
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/pets/${formData.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Error al actualizar la mascota");

            Swal.fire({
                icon: "success",
                title: "Mascota actualizada correctamente",
                text: "Los cambios se han guardado exitosamente.",
                confirmButtonText: "Aceptar",
            });

            await onUpdate(formData);
            onClose();
        } catch (error) {
            console.error("Error al actualizar mascota:", error);
            Swal.fire({
                icon: "error",
                title: "Error al actualizar",
                text: "Hubo un problema al actualizar la mascota. Intenta nuevamente.",
                confirmButtonText: "Aceptar",
            });
        }
    };

    return (
        <div className="modal-edit-pet">
            <div className="modal-content-edit-pet">
                <h3>Editar Mascota</h3>
                <form onSubmit={handleSubmit}>
                    <label>Dueño:</label>
                    <select name="ownerId" value={formData.ownerId} onChange={handleChange} required>
                        <option value="">Selecciona el dueño</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>

                    <label>Nombre:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                    <label>Raza:</label>
                    <input type="text" name="breed" value={formData.breed} onChange={handleChange} required />

                    <label>Especie:</label>
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

                    <label>Género:</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} required>
                        <option value="">Selecciona Género</option>
                        <option value="Macho">Macho</option>
                        <option value="Hembra">Hembra</option>
                    </select>

                    <label>Fecha de Nacimiento:</label>
                    <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} required />

                    <label>Microchip:</label>
                    <input type="text" name="microchip" value={formData.microchip} onChange={handleChange} required />

                    <label>Foto:</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} />

                    {formData.photo && (
                        <div className="photo-preview-edit">
                            <img src={formData.photo} alt="Foto de la mascota" width="150" />
                        </div>
                    )}

                    <div className="modal-buttons-edit">
                        <button type="submit" className="save-btn-edit">Guardar</button>
                        <button type="button" className="cancel-btn-edit" onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPet;
