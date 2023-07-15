import React from "react";

function Suma({ a, b }) {
  const resultado = a + b;

  return (
    <div>
      <h1>Resultado: {resultado}</h1>
    </div>
  );
}

export default Suma;
