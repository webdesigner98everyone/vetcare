import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../styles/AddMedicalRecord.css";

interface Props {
  onClose: () => void;
  onRecordAdded: () => void;
  petId: string;
}

const AddMedicalRecord: React.FC<Props> = ({ onClose, onRecordAdded, petId }) => {
  const [formData, setFormData] = useState({
    date: "",
    description: "",
    veterinarian: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/medicalHistory", {
        ...formData,
        petId,
      });

      Swal.fire({
        title: "¡Registro agregado!",
        text: "El historial médico ha sido registrado correctamente.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      onRecordAdded();
      onClose();
    } catch (error) {
      console.error("Error adding medical record:", error);
    }
  };

  return (
    <div className="modal-add">
      <div className="modal-contentadd">
        <h2>Agregar Historial Médico</h2>
        <form onSubmit={handleSubmit}>
          <label>Fecha:</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />

          <label>Descripción:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />

          <label>Veterinario:</label>
          <input type="text" name="veterinarian" value={formData.veterinarian} onChange={handleChange} required />

          <div className="modal-add-actions">
            <button type="submit">Guardar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMedicalRecord;
