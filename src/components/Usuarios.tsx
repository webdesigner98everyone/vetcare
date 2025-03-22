import React, { useEffect, useState } from "react";
import "../styles/usuarios.css";

// Definimos la interfaz para un usuario
interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    address: string;
    contact: string;
}

const Usuarios: React.FC = () => {
    const [usuarios, setUsuarios] = useState<User[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/users")
            .then((response) => response.json())
            .then((data: User[]) => setUsuarios(data))
            .catch((error) => console.error("Error al obtener usuarios:", error));
    }, []);

    const handleDelete = async (id: string) => {
        if (!window.confirm("¿Estás seguro de eliminar este usuario?")) return;

        try {
            await fetch(`http://localhost:5000/users/${id}`, {
                method: "DELETE",
            });
            setUsuarios(usuarios.filter((user) => user.id !== id));
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
        }
    };

    return (
        <div className="usuarios-container">
            <h4 className="Seccionh4">Bitacora De Usuarios</h4>

            <input
                type="text"
                placeholder="Buscar usuario..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
            />

            <table className="usuarios-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Dirección</th>
                        <th>Contacto</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios
                        .filter((user) =>
                            user.name.toLowerCase().includes(search.toLowerCase())
                        )
                        .map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user.address}</td>
                                <td>{user.contact}</td>
                                <td>
                                    <button className="edit-btn">Editar</button>
                                    <button className="delete-btn" onClick={() => handleDelete(user.id)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            <button className="add-btn">Agregar Usuario</button>
        </div>
    );
};

export default Usuarios;
