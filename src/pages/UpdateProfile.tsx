import React, { useState, useEffect } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getUserById, updateUser } from "../components/logic/UpdateProfileLogic";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function UpdateProfile() {
    const navigate = useNavigate();

    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null;
    const userId = user?.id;
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        contact: "",
        address: "",
    });

    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!isAuthenticated || !userId) {
            setMessage("Usuario no autenticado");
            return;
        }

        getUserById(userId)
            .then(data => setUserData(data))
            .catch(error => setMessage(error.message));
    }, [userId, isAuthenticated]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

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

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <Card className="shadow-lg p-4" style={{ maxWidth: "500px", width: "100%" }}>
                <Card.Body>
                    <h3 className="text-center mb-3">
                        <span role="img" aria-label="paw">🐾</span> Actualizar Perfil <span role="img" aria-label="dog">🐶</span>
                    </h3>
                    <p className="text-center text-muted">Modifica tus datos y guarda los cambios</p>
                    {message && <Alert variant={message.includes("éxito") ? "success" : "danger"}>{message}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label style={{ color: "#2c7a7b" }} ><FaUser /> Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={userData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label style={{ color: "#2c7a7b" }}><FaEnvelope /> Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={userData.email}
                                disabled
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label style={{ color: "#2c7a7b" }}><FaPhone /> Teléfono</Form.Label>
                            <Form.Control
                                type="text"
                                name="contact"
                                value={userData.contact}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label style={{ color: "#2c7a7b" }}><FaMapMarkerAlt /> Dirección</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={userData.address}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Button
                            className="w-100"
                            type="submit"
                            style={{
                                backgroundColor: "#2c7a7b",
                                borderColor: "#2c7a7b",
                                color: "white",
                                transition: "background-color 0.3s ease, border-color 0.3s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "#ff9900";
                                e.currentTarget.style.borderColor = "#ff9900";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "#2c7a7b";
                                e.currentTarget.style.borderColor = "#2c7a7b";
                            }}
                        >
                            Actualizar Datos
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}
