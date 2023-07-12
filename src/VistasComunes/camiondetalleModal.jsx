import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export function CamionDetalleModal({ show,
    close,
    datosaeditar,
    editar,
    agregar, }) {
    const [formData, setFormData] = useState({
        corrienteArranque: "",
    });

    const [corrienteArranque, setCorrienteArranque] = useState("");
    const [editando, setEditando] = useState(false);

    useEffect(() => {
        if (datosaeditar) {
            setCorrienteArranque(datosaeditar.corrienteArranque);
            setEditando(true);
        } else {
            // ...
        }
    }, [datosaeditar]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (editando) {
            editar(corrienteArranque);
            limpiar();
        } else {
            agregar(corrienteArranque);
        }
        close();
        limpiar();
    };

    const limpiar = () => {
        setFormData({
            corrienteArranque: "",
        });
        setEditando(false);
    };

    const handleClose = () => {
        if (datosaeditar) {
            limpiar();
        }
        close();
    };

    const rol = localStorage.getItem("rol");
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Corriente de Arranque</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="corrienteArranque">
                        <Form.Label>Nueva Corriente de Arranque</Form.Label>
                        <Form.Control
                            type="text"
                            value={corrienteArranque}
                            onChange={(event) => setCorrienteArranque(event.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Guardar
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
