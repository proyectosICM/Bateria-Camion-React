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
import "./bateriaModal.css";
import { FaUser } from "react-icons/fa";
import { camionesHURL } from "../../../API/apiurls";

export function BateriasModal({
  show,
  close,
  datosaeditar,
  editar,
  agregar,
  il,
}) {
  const [formData, setFormData] = useState({
    nom_bat: "",
    camionesModel: 1
  });
  const [editando, setEditando] = useState(false);
  const [camiones, setCamiones] = useState([]);

  const token = localStorage.getItem("token");

  const ListarCamiones = useCallback(async () => {
    const response = await axios.get(`${camionesHURL}${il}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Agregar el token en el encabezado de la solicitud
      },
    });
    setCamiones(response.data);
    console.log(response.data);
}, [il]);


  useEffect(() => {
    if (datosaeditar) {
      setFormData({ ...datosaeditar });
      setEditando(true);
    } else {
      // ...
    }
    ListarCamiones();
  }, [datosaeditar,ListarCamiones]);


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
      nom_bat: "",
      camionesModel: 1
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
                  value={formData.nom_bat}
                  onChange={(e) =>
                    setFormData({ ...formData, nom_bat: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="form-group-half">
                                <Form.Label><FaUser /> Conductor</Form.Label>
                                <Form.Select
                                    name="conductor"
                                    value={formData.camionesModel ? formData.camionesModel.id_cam : ""}
                                    onChange={(e) => {
                                        const selectedId = e.target.value;
                                        setFormData({ ...formData, camionesModel: selectedId });
                                    }}
                                >
                                    <option value={formData.camionesModel ? formData.camionesModel.id_tra : ""}>
                                        {formData.camionesModel ? formData.camionesModel.placa_cam
                                            : "Seleccione un camion"}
                                    </option>
                                    {camiones.map((camion) => (
                                        <option key={camion.id_cam} value={camion.id_cam}>
                                            {camion.placa_cam} 
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
            </div>

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
