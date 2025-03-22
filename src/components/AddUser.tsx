import React, { useState } from "react";
import "../styles/AddUsers.css";
import { toast, ToastContainer } from 'react-toastify'; // Importamos toast
import 'react-toastify/dist/ReactToastify.css'; // Importamos los estilos de react-toastify

interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    address: string;
    contact: string;
}

interface Props {
    onClose: () => void;
    onAdd: (user: Omit<User, "id">) => void;
    existingUsers: User[]; // Asegúrate de que esta propiedad esté definida en Props
}

const AgregarUsuario: React.FC<Props> = ({ onClose, onAdd, existingUsers }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
        address: "",
        contact: "",
    });

    // Función para generar el siguiente id secuencial
    const getNextId = (): string => {
        const lastUser = existingUsers[existingUsers.length - 1];
        const lastId = parseInt(lastUser.id); // Convertimos el ID a número
        return (lastId + 1).toString(); // Incrementamos el id y lo devolvemos como cadena
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const newUser = { ...formData, id: getNextId() }; // Añadimos el nuevo ID secuencial
            await onAdd(newUser); // Llamamos a onAdd (suponiendo que hace una operación asincrónica como agregar el usuario)
            toast.success("¡Usuario agregado exitosamente!"); // Notificación de éxito
            onClose(); // Cierra el modal después de agregar el usuario
        } catch (error) {
            toast.error("Hubo un error al agregar el usuario. Intenta nuevamente."); // Notificación de error
        }
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar
                newestOnTop={true}
                closeOnClick
                rtl={false}
            />

            <div className="modaladdUsers-overlay">
                <div className="modal-containeruser">
                    <h2>Agregar Usuario</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="name" placeholder="Nombre" onChange={handleChange} required />
                        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />

                        {/* Campo de selección para el rol */}
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
