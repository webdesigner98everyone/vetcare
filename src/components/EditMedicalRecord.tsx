import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../styles/EditMedicalRecord.css";

// Interfaz que define la estructura de un historial médico
interface MedicalRecord {
    id: string;
    date: string;
    description: string;
    veterinarian: string;
}

// Propiedades que recibe el componente
interface Props {
    record: MedicalRecord;
    onClose: () => void;
    onRecordUpdated: () => void;
}

const EditMedicalRecord: React.FC<Props> = ({ record, onClose, onRecordUpdated }) => {
    console.log("Renderizando modal con record:", record);

    // Estado para manejar los datos del formulario
    const [formData, setFormData] = useState<MedicalRecord>({
        id: "",
        date: "",
        description: "",
        veterinarian: ""
    });

    // Cargar los datos del historial médico seleccionado en el formulario
    useEffect(() => {
        console.log("Cargando datos del registro a editar:", record);
        if (record) {
            setFormData(record);
        }
    }, [record]);

    // Manejar cambios en los campos del formulario
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    // Enviar datos actualizados al backend
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Datos enviados en la actualización:", formData);
        try {
            await axios.put(`http://localhost:5000/medicalHistory/${formData.id}`, formData);

            Swal.fire({
                title: "¡Registro actualizado!",
                text: "El historial médico ha sido modificado correctamente.",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
            });

            onRecordUpdated();
            onClose();
        } catch (error) {
            console.error("Error updating medical record:", error);
            Swal.fire("Error", "No se pudo actualizar el registro", "error");
        }
    };

    return (
        <div className="modaledit">
            <div className="modal-contentedit">
                <h2 className="edit-title">Editar Historial Médico</h2>
                <form className="edit-form" onSubmit={handleSubmit}>
                    <label className="edit-label">Fecha:</label>
                    <input className="edit-input" type="date" name="date" value={formData.date} onChange={handleChange} required />

                    <label className="edit-label">Descripción:</label>
                    <textarea className="edit-textarea" name="description" value={formData.description} onChange={handleChange} required />

                    <label className="edit-label">Veterinario:</label>
                    <input className="edit-input" type="text" name="veterinarian" value={formData.veterinarian} onChange={handleChange} required />

                    <div className="modal-actionsedit">
                        <button className="edit-btn edit-btn-submit" type="submit">Actualizar</button>
                        <button className="edit-btn edit-btn-cancel" type="button" onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditMedicalRecord;
