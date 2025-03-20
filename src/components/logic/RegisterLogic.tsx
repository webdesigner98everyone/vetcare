// components/logic/RegisterLogic.ts
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface User {
  id?: number; // Agregamos el id como opcional
  name: string;
  email: string;
  password: string;
  address: string;
  contact: string;
  role: string;
}

export const useRegisterLogic = () => {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    password: "",
    address: "",
    contact: "",
    role: "viewer",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Obtener la lista de usuarios actuales
      const response = await axios.get<User[]>("http://localhost:5000/users");
      const users = response.data;

      // Determinar el último ID y calcular el nuevo
      const lastId = users.length > 0 ? Math.max(...users.map((u) => u.id ?? 0)) : 0;
      const newUser = { ...user, id: (lastId + 1).toString() }; // Convertir a string


      // Registrar el usuario con el ID corregido
      await axios.post("http://localhost:5000/users", newUser);
      toast.success("🎉 Usuario registrado exitosamente!", { position: "top-right", autoClose: 3000, theme: "colored" });

      // Reiniciar el formulario
      setUser({ name: "", email: "", password: "", address: "", contact: "", role: "viewer" });
    } catch (error) {
      toast.error("❌ Error al registrar usuario.", { position: "top-right", autoClose: 3000, theme: "colored" });
    }
  };

  return { user, handleChange, handleSubmit };
};
