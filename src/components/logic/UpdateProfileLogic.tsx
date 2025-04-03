import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Definir la URL base de la API para las peticiones de usuario

const API_URL = "http://localhost:5000/users";

export const useProfileLogic = (navigate: ReturnType<typeof useNavigate>) => {
    // Obtener el usuario desde localStorage si existe
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null;
    const userId = user?.id;
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

    const [userData, setUserData] = useState({
        // Estado para almacenar los datos del usuario
        name: "",
        email: "",
        contact: "",
        address: "",
    });
    // Estado para almacenar los datos originales antes de la edición
    const [originalData, setOriginalData] = useState(userData);
    const [message, setMessage] = useState("");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (!isAuthenticated || !userId) { // Verifica si el usuario está autenticado
            setMessage("Usuario no autenticado");
            return;
        }
        // Llamar a la API para obtener los datos del usuario
        getUserById(userId)
            .then(data => {
                setUserData(data);
                setOriginalData(data);
            })
            .catch(error => setMessage(error.message));
    }, [userId, isAuthenticated]);

    /**
     * Manejar cambios en los inputs del formulario
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    /**
   * Manejar el envío del formulario
   */
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setShowModal(true);
    };

    /**
     * Confirmar la actualización del perfil y enviar los datos a la API
     */
    const confirmUpdate = async () => {
        setShowModal(false);

        if (!userId) {
            setMessage("No se puede actualizar el perfil sin un ID de usuario");
            return;
        }

        try {
            const successMessage = await updateUser(userId, userData);
            setMessage(successMessage);
            setTimeout(() => navigate("/"), 2000);
        } catch (error: any) {
            setMessage(error.message);
        }
    };

    /**
     * Cancelar la actualización del perfil y restaurar los datos originales
     */
    const cancelUpdate = () => {
        setShowModal(false);
        setUserData(originalData);
        setMessage("Actualización cancelada. No se realizaron cambios.");
    };

    return { userData, message, showModal, setShowModal, handleChange, handleSubmit, confirmUpdate, cancelUpdate };
};

export const getUserById = async (userId: string) => {
    try {
        const response = await axios.get(`${API_URL}/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error al cargar datos del usuario", error);
        throw new Error("Error al cargar datos del usuario");
    }
};

export const updateUser = async (userId: string, userData: any) => {
    try {
        await axios.put(`${API_URL}/${userId}`, userData);
        return "Perfil actualizado con éxito";
    } catch (error) {
        console.error("Error al actualizar perfil", error);
        throw new Error("Error al actualizar perfil");
    }
};
