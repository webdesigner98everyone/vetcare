import React, { useEffect, useState } from "react";
import "../styles/UpdateUser.css";

interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    address: string;
    contact: string;
}

interface EditarUsuarioProps {
    usuario: User;
    onClose: () => void;
    onSave: (updatedUser: User) => void;
}

const EditarUsuario: React.FC<EditarUsuarioProps> = ({ usuario, onClose, onSave }) => {
    const [formData, setFormData] = useState<User>(usuario);

    useEffect(() => {
        console.log("Recibiendo usuario para editar:", usuario);
        setFormData(usuario); // Asegura que los datos del usuario se cargan correctamente
    }, [usuario]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/users/${formData.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Error al actualizar el usuario");

            onSave(formData);
            onClose();
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
        }
    };

    return (
        <div className="modal-usuarios">
            <div className="modal-contentUsuarios">
                <h3>Editar Usuario</h3>
                <form onSubmit={handleSubmit}>
                    <label>Nombre:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />

                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />

                    <label>Rol:</label>
                    <input type="text" name="role" value={formData.role} onChange={handleChange} required />

                    <label>Dirección:</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} required />

                    <label>Contacto:</label>
                    <input type="text" name="contact" value={formData.contact} onChange={handleChange} required />

                    <div className="modal-buttons">
                        <button type="submit">Guardar</button>
                        <button type="button" onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditarUsuario;
