import React, { useEffect, useState } from "react";
import "../styles/usuarios.css";
import EditarUsuario from "./UpdateUser";
import AgregarUsuario from "./AddUser";

interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    address: string;
    contact: string;
}

const Usuarios: React.FC = () => {
    const [usuarios, setUsuarios] = useState<User[]>([]);
    const [search, setSearch] = useState("");
    const [usuarioEditando, setUsuarioEditando] = useState<User | null>(null);
    const [mostrarModal, setMostrarModal] = useState(false); // Estado para controlar la visibilidad del modal
    const [mostrarAgregarModal, setMostrarAgregarModal] = useState(false);// Estado para añadir nuevo usuario


    useEffect(() => {
        console.log("Cargando usuarios...");
        fetch("http://localhost:5000/users")
            .then((response) => response.json())
            .then((data: User[]) => {
                console.log("Usuarios recibidos:", data);
                setUsuarios(data);
            })
            .catch((error) => console.error("Error al obtener usuarios:", error));
    }, []);

    const handleDelete = async (id: string) => {
        if (!window.confirm("¿Estás seguro de eliminar este usuario?")) return;

        try {
            await fetch(`http://localhost:5000/users/${id}`, { method: "DELETE" });
            setUsuarios(usuarios.filter((user) => user.id !== id));
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
        }
    };

    const handleEdit = (user: User) => {
        console.log("Editando usuario:", user);
        setUsuarioEditando(user);
        setMostrarModal(true);
        console.log("Estado mostrarModal:", true); // <-- Verificamos si el estado se actualiza
    };


    const handleSave = (updatedUser: User) => {
        setUsuarios(usuarios.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
        setMostrarModal(false); // Cierra el modal después de guardar
    };

    const handleAddUser = async (newUser: Omit<User, "id">) => {
        try {
            const response = await fetch("http://localhost:5000/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser),
            });

            if (!response.ok) throw new Error("Error al agregar usuario");

            const addedUser = await response.json();
            setUsuarios([...usuarios, addedUser]); // Actualiza la lista con el nuevo usuario
            setMostrarAgregarModal(false); // Cierra el modal después de agregar
        } catch (error) {
            console.error("Error al agregar usuario:", error);
        }
    };


    return (
        <div className="usuarios-container">
            <h4 className="Seccionh4">Gestión De Usuarios</h4>

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
                                <td className="action-buttonsuser">
                                    <button className="edituser-btn" onClick={() => handleEdit(user)}>✏️</button>
                                    <button className="deleteuser-btn" onClick={() => handleDelete(user.id)}>🗑️</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            <button className="add-btn" onClick={() => setMostrarAgregarModal(true)}>
                Agregar Usuario
            </button>

            {/* Modal para editar usuario */}
            {mostrarModal && usuarioEditando ? (
                <EditarUsuario
                    usuario={usuarioEditando}
                    onClose={() => setMostrarModal(false)}
                    onSave={handleSave}
                />
            ) : null}

            {mostrarAgregarModal && (
                <AgregarUsuario
                    onClose={() => setMostrarAgregarModal(false)}
                    onAdd={handleAddUser}
                    existingUsers={usuarios} // Aquí pasas el array de usuarios
                />
            )}

        </div>
    );
};

export default Usuarios;
