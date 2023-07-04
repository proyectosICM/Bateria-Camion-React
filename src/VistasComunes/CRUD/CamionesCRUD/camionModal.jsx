import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { BsFillBusFrontFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { InputSimple, SelectCruzado } from "../../../Componentes/BarraNav/forms";
import { trabajadorHURL } from "../../../API/apiurls";



export function CamionModal({ show, close, datosaeditar, editar, agregar, il }) {

    const [trabajadores, setTrabajadores] = useState([]);
    const [rutas, setRutas] = useState([]);
    const [editando, setEditando] = useState(false);


    const ListarTrabajadores = useCallback(async () => {
        const response = await axios.get(`${trabajadorHURL}${il}`);
        setTrabajadores(response.data);
    }, [il]);



    const [formData, setFormData] = useState({ 
        placa_cam: "",
        estado: true,
        trabajadoresModel: 1
    });


    useEffect(() => {
        if (datosaeditar) {
            setFormData({ ...datosaeditar });
            setEditando(true)
        } else {
            limpiar();
        }
        ListarTrabajadores();
    }, [datosaeditar, ListarTrabajadores])

    const handleSubmit = (event) => {
        event.preventDefault();
        if (editando) {
            const updatedFormData = { ...formData };
            if (
                updatedFormData.trabajadoresModel &&
                typeof updatedFormData.trabajadoresModel === "object"
            ) {
                updatedFormData.trabajadoresModel = updatedFormData.trabajadoresModel.id_tra;
            }

            editar(updatedFormData);
            limpiar();
        } else {
            agregar(formData);
        }
        close();
        limpiar();
    }

    const limpiar = () => {
        setFormData({ placa_cam: "", estado: true, trabajadoresModel: null});
        //setFormData({ placa_bus: "", mod_bus: "", est_bus: true, trabajadoresModel:null, rutasModel:null });
        setEditando(false);
    }

    

  const handleClose = () => {
    if (datosaeditar) {
      limpiar();
    }
    close();
  };


    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><BsFillBusFrontFill /> Agregar Buses</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form onSubmit={handleSubmit}>

                        <div className="form-row">
                            <InputSimple label="Placa" setDatos={setFormData} val={formData.placa_cam}
                                onChan={(e) => setFormData({ ...formData, placa_cam: e.target.value })}
                            />


                            <Form.Group className="form-group-half">
                                <Form.Label><FaUser /> Conductor</Form.Label>
                                <Form.Select
                                    name="conductor"
                                    value={formData.trabajadoresModel ? formData.trabajadoresModel.id_tra : ""}
                                    onChange={(e) => {
                                        const selectedId = e.target.value;
                                        setFormData({ ...formData, trabajadoresModel: selectedId });
                                    }}
                                >
                                    <option value={formData.trabajadoresModel ? formData.trabajadoresModel.id_tra : ""}>
                                        {formData.trabajadoresModel ? formData.trabajadoresModel.nom_tra + " " + formData.trabajadoresModel.ape_tra
                                            : "Seleccione una ruta"}
                                    </option>
                                    {trabajadores.map((trabajador) => (
                                        <option key={trabajador.id_tra} value={trabajador.id_tra}>
                                            {trabajador.nom_tra} {trabajador.ape_tra}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </div>



                        <Button type="submit">Crear</Button>
                        <Button onClick={handleClose}>Cerrar</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}