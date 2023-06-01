import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import camionImage from "../../Imagenes/camion.png";

export function CamionesItem({id,placa}){
    return(
        <div className="camionesItem-contenedor">
            <h1>Placa: {placa}</h1>
            <img src={camionImage} alt="camion" />
            <Link to={`/detalles/${id}`} className="linkes">
                <Button variant="success">Ver detalles</Button>
            </Link>
        </div>
    );

}