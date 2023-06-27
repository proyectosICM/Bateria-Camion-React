import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { TfiCreditCard } from "react-icons/tfi";
import { FaTruck } from "react-icons/fa";

export function InputSimple({ label,val, onChan }) {

    
    const iconos = [TfiCreditCard, FaTruck];
    
    var i = 0;

    switch(label){
        case "Placa":
            i = 0;
        break;
        case "Modelo":
            i = 1;
        break;
        default:
            console.log("error");
        break;
    }

    return (
        <>
            <Form.Group className="form-group-half">
                <Form.Label>{React.createElement(iconos[i])} {label}</Form.Label>
                <Form.Control
                    type="text"
                    name={val}
                    placeholder={label}
                    value={val}
                    onChange={onChan}
                    
                />
            </Form.Group>
        </>
    );
}




export function SelectCruzado({ val, onChan, namer, arr, idField, displayField }) {
    return (
      <Form.Group className="form-group-half">
        <Form.Label>Ruta</Form.Label>
        <Form.Select name="ruta" value={val} onChange={onChan}>
          <option value={val}>{namer}</option>
          {arr.map((dato) => (
            <option key={dato[idField]} value={dato[idField]}>
              {dato[displayField]}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
    );
  }

  
export function PruebaInp({val, namer, arr}){


    return(
        <>
            <h1>{val}</h1>
            {namer}
        </>
    );
}