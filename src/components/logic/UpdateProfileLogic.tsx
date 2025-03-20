import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/users";

export const useProfileLogic = (navigate: ReturnType<typeof useNavigate>) => {
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null;
    const userId = user?.id;
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        contact: "",
        address: "",
    });

    const [originalData, setOriginalData] = useState(userData);
    const [message, setMessage] = useState("");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (!isAuthenticated || !userId) {
            setMessage("Usuario no autenticado");
            return;
        }

        getUserById(userId)
            .then(data => {
                setUserData(data);
                setOriginalData(data);
            })
            .catch(error => setMessage(error.message));
    }, [userId, isAuthenticated]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setShowModal(true);
    };

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
