import axios from "axios";

const API_URL = "http://localhost:5000/users";

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
