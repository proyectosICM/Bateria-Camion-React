import React from "react";
import { Button, Card, Table } from "react-bootstrap";

export function PanelIncidencias() {
    return (
        <div className="contenedor-detalles">
            <Card style={{ width: "180rem" }}>
                <Card.Title>
                    PANEL DE INCIDENCIAS
                </Card.Title>
                <Card.Body>
                    <h2>Incidencias sin revisar</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Dia</th>
                                <th>Hora</th>
                                <th>Incidencia</th>
                                <th>Bateria</th>
                                <th>Placa</th>
                                <th>Conductor</th>
                                <th>Voltaje</th>
                                <th>Carga</th>
                                <th>Corriente</th>
                                <th>Estado</th>
                                <th>Gestion</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>22-06-2023</td>
                                <td>13:45</td>
                                <td>Voltaje excedido 29 v</td>
                                <td>Asus221</td>
                                <td>A0B-22K</td>
                                <td>Juan Velez</td>
                                <td>29 v</td>
                                <td>54 %</td>
                                <td>54 v</td>
                                <td>Sin revisar</td>
                                <td><Button>Marcar como revisada</Button></td>
                            </tr>
                        </tbody>
                    </Table>

                    <h2>Registro de incidencias</h2>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                                <th>Dia</th>
                                <th>Hora</th>
                                <th>Incidencia</th>
                                <th>Bateria</th>
                                <th>Placa</th>
                                <th>Conductor</th>
                                <th>Voltaje</th>
                                <th>Carga</th>
                                <th>Corriente</th>
                                <th>Estado</th>
                                <th>Gestion</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>22-06-2023</td>
                                <td>13:45</td>
                                <td>Carga al 5% </td>
                                <td>Asus221</td>
                                <td>A0B-22K</td>
                                <td>Juan Velez</td>
                                <td>12.5 v</td>
                                <td>54 %</td>
                                <td>54 v</td>
                                <td>Revisada</td>
                                <td><Button variant="warning">Marcar como no revisada</Button></td>
                            </tr>
                            <tr>
                                <td>22-06-2023</td>
                                <td>13:45</td>
                                <td>Voltaje excedido 25 v</td>
                                <td>Asus221</td>
                                <td>A0B-22K</td>
                                <td>Juan Velez</td>
                                <td>12 v</td>
                                <td>5 %</td>
                                <td>54 v</td>
                                <td>Revisada</td>
                                <td><Button variant="warning">Marcar como no revisada</Button></td>
                            </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </div>
    );
}