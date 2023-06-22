import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import {
  BsFillPersonFill,
  BsX,
} from "react-icons/bs";
import {
  HiOutlineIdentification,
} from "react-icons/hi";
import "./trabajadorModal.css";

export function TrabajadorModal({
  show,
  close,
  datosaeditar,
  editar,
  agregar,
  il,
}) {
  const [formData, setFormData] = useState({
    nom_tra: "",
    ape_tra: "",
    dni_tra: "",
    empresasModel: il,
    est_tra: true,
  });
  const [editando, setEditando] = useState(false);



  useEffect(() => {
    if (datosaeditar) {
      setFormData({ ...datosaeditar });
      setEditando(true);
    } else {
      // ...
    }
  }, [datosaeditar]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editando) {
      editar(formData);
      limpiar();
    } else {
      agregar(formData);
    }
    close();
    limpiar();
  };
 
  const limpiar = () => {
    setFormData({
      nom_tra: "",
      ape_tra: "",
      dni_tra: "",
      empresasModel: il,
      est_tra: true,
    });
    setEditando(false);
  };


  const handleClose = () => {
    if (datosaeditar) {
      limpiar();
    }
    close();
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editando ? "Editar Trabajador" : "Agregar Trabajador"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <div className="form-row">
              <Form.Group controlId="formNombre" className="form-group-half">
                <Form.Label>
                  <BsFillPersonFill className="label-icon" />
                  Nombre:
                </Form.Label>
                <Form.Control
                  type="text"
                  name="nom_tra"
                  placeholder="Nombre"
                  value={formData.nom_tra}
                  onChange={(e) =>
                    setFormData({ ...formData, nom_tra: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formApellido" className="form-group-half">
                <Form.Label>
                  <BsFillPersonFill className="label-icon" />
                  Apellido:
                </Form.Label>
                <Form.Control
                  type="text"
                  name="ape_tra"
                  placeholder="Apellido"
                  value={formData.ape_tra}
                  onChange={(e) =>
                    setFormData({ ...formData, ape_tra: e.target.value })
                  }
                />
              </Form.Group>
            </div>



            <Form.Group controlId="formDNI">
              <Form.Label>
                <HiOutlineIdentification className="label-icon" />
                DNI:
              </Form.Label>
              <Form.Control
                type="text"
                name="dni_tra"
                placeholder="DNI"
                value={formData.dni_tra}
                onChange={(e) =>
                  setFormData({ ...formData, dni_tra: e.target.value })
                }
              />
            </Form.Group>

            

            <div className="modal-buttons">
              <Button type="submit">
                {editando ? "Guardar cambios" : "Crear"}
              </Button>
              <Button onClick={handleClose} variant='secondary'>
                <BsX className="button-icon" />
                Cerrar
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
