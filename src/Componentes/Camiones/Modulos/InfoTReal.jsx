import React from "react";
import { Card } from "react-bootstrap";
import { AiFillThunderbolt } from "react-icons/ai";
import { BsBatteryHalf } from "react-icons/bs";
import { FaCarBattery } from "react-icons/fa";

export function InfoTReal({ titulo, valor }) {
  let icono = null;

  if (titulo === "Voltaje") {
    icono = <AiFillThunderbolt />;
  } else if (titulo === "Carga") {
    icono = <BsBatteryHalf />;
  } else if (titulo === "Corriente") {
    icono = <FaCarBattery />;
  }

  return (
    <Card style={{ flex: 1 }}>
      <Card.Title>
        {titulo} {icono}
      </Card.Title>
      <Card.Body>{valor}</Card.Body>
    </Card>
  );
}
