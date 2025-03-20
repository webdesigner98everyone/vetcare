// components/logic/registerLogic.ts
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface User {
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
      await axios.post("http://localhost:5000/users", user);
      toast.success("🎉 Usuario registrado exitosamente!", { position: "top-right", autoClose: 3000, theme: "colored" });
      setUser({ name: "", email: "", password: "", address: "", contact: "", role: "viewer" });
    } catch (error) {
      toast.error("❌ Error al registrar usuario.", { position: "top-right", autoClose: 3000, theme: "colored" });
    }
  };

  return { user, handleChange, handleSubmit };
};
