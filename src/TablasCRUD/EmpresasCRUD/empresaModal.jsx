import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import {  BsBuildingsFill } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import './empresaModal.css';

export function EmpresaModal({ show, close, datosaeditar, editar, agregar }) {
  const [formData, setFormData] = useState({
    nom_emp: "",
    est_emp: true
  });

  useEffect(() => {
    if (datosaeditar) {
      setFormData(datosaeditar);
    } else {
      limpiar();
    }
  }, [datosaeditar]);

  const limpiar = () => {
    setFormData({ nom_emp: "", est_emp: true });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (datosaeditar) {
      editar(formData);
    } else {
      agregar(formData);
    }
    close();
    limpiar();
  };

  const handleClose = () => {
    if (datosaeditar) {
      limpiar();
    }
    close();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {datosaeditar ? "Editar Empresa" : "Agregar Empresa"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formNomEmp">
            <Form.Label>
              <BsBuildingsFill /> Nombre de la empresa
            </Form.Label>
            <Form.Control
              type="text"
              name="nom_emp"
              placeholder="Nombre"
              value={formData.nom_emp}
              onChange={(e) =>
                setFormData({ ...formData, nom_emp: e.target.value })
              }
            />
          </Form.Group>
          <div className="modal-buttons">
            <Button type="submit" variant="success" className="modal-button modal-button-primary">
              {datosaeditar ? "Guardar Cambios" : "Crear Empresa"}
            </Button>
            <Button variant="secondary" className="modal-button modal-button-close" onClick={handleClose}>
              <AiOutlineClose />
              Cerrar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
