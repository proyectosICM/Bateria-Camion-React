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

  const infoCard = {
    flex: 1,
  };

  const styles = `
    @media (max-width: 800px) {
      .info-card {
        font-size: 14px;
      }
    }
  `;

  return (
    <Card style={infoCard}>
      <style>{styles}</style>
      <Card.Title>
        {titulo} <span data-testid={`icono-${titulo}`}>{icono}</span>
      </Card.Title>
      <Card.Body>{valor}</Card.Body>
    </Card>
  );
}
