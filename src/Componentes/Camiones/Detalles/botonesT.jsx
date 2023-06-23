import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { BsEyeSlashFill } from 'react-icons/bs';

export function BotonesT({ handleMostrarTabla, idbat }) {
    return (
      <div>
        <ButtonGroup className="bt-g">
          {idbat.map((id, index) => (
            <Button
              key={index}
              variant="success"
              onClick={() => handleMostrarTabla(`bateria${index + 1}`)}
            >
              Bateria {index + 1}
            </Button>
          ))}
          <Button variant="warning" onClick={() => handleMostrarTabla("carga")}>
            <BsEyeSlashFill /> Ocultar
          </Button>
        </ButtonGroup>
      </div>
    );
  }