import React from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useProfileLogic } from "../components/logic/UpdateProfileLogic";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { ConfirmModal } from "../components/ConfirmModal";

export default function UpdateProfile() {
    const navigate = useNavigate();
    const { userData, message, showModal, setShowModal, handleChange, handleSubmit, confirmUpdate, cancelUpdate } = useProfileLogic(navigate);

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
                            <Form.Label style={{ color: "#2c7a7b" }}><FaUser /> Nombre</Form.Label>
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
                            <Form.Label style={{ color: "#2c7a7b" }}><FaPhone /> Contacto</Form.Label>
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

                        <div className="d-flex gap-2">
                            <Button variant="secondary" className="w-50" onClick={cancelUpdate}>Cancelar</Button>
                            <Button variant="primary" type="submit" className="w-50">Guardar Cambios</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>

            {/* Modal de confirmación */}
            <ConfirmModal
                show={showModal}
                onCancel={() => setShowModal(false)}  // Cambiado de handleClose a onCancel
                onConfirm={confirmUpdate}
            />
        </Container>
    );
}
