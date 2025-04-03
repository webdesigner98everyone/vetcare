import React, { useState } from "react";
import Swal from "sweetalert2"; // Importamos SweetAlert2
import "../styles/AddUsers.css";

// Definimos la interfaz para un usuario
interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    address: string;
    contact: string;
}

// Definimos la interfaz de las propiedades que recibe el componente
interface Props {
    onClose: () => void;
    onAdd: (user: Omit<User, "id">) => void;
    existingUsers: User[];
}

// Componente funcional para agregar un usuario
const AgregarUsuario: React.FC<Props> = ({ onClose, onAdd, existingUsers }) => {
    // Estado local para manejar los datos del formulario
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
        address: "",
        contact: "",
    });

    // Función para calcular el próximo ID basado en el último usuario
    const getNextId = (): string => {
        const lastUser = existingUsers[existingUsers.length - 1];
        const lastId = parseInt(lastUser.id);
        return (lastId + 1).toString();
    };

    // Maneja los cambios en los campos del formulario
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Maneja el envío del formulario
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const newUser = { ...formData, id: getNextId() };
            await onAdd(newUser);
            Swal.fire({
                icon: "success",
                title: "¡Usuario agregado exitosamente!",
                showConfirmButton: false,
                timer: 3000,
            });
            onClose();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Hubo un error al agregar el usuario",
                text: "Intenta nuevamente.",
                confirmButtonText: "Aceptar",
            });
        }
    };

    return (
        <>
            <div className="modaladdUsers-overlay">
                <div className="modal-containeruser">
                    <h2>Agregar Usuario</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="name" placeholder="Nombre" onChange={handleChange} required />
                        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                        <select name="role" onChange={handleChange} value={formData.role} required>
                            <option value="">Selecciona un rol</option>
                            <option value="viewer">Viewer</option>
                            <option value="admin">Admin</option>
                        </select>
                        <input type="text" name="address" placeholder="Dirección" onChange={handleChange} required />
                        <input type="text" name="contact" placeholder="Contacto" onChange={handleChange} required />
                        <button type="submit">Guardar</button>
                        <button type="button" onClick={onClose}>Cancelar</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AgregarUsuario;
