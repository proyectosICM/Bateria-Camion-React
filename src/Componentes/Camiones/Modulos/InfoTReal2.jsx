import React from "react";
import { Card } from "react-bootstrap";

export function InfoTReal({titulo, valor}) {
    return (
            <Card style={{ flex: 1 }}>
                <Card.Title>{titulo}</Card.Title>
                <Card.Body>{valor}</Card.Body>
            </Card>

    );
}