import React from "react";
import { render, screen } from "@testing-library/react";
import Suma from "./suma";

test("suma dos números correctamente", () => {
  render(<Suma a={2} b={3} />);

  const resultadoElement = screen.getByText(/Resultado:/i);
  expect(resultadoElement).toBeInTheDocument();
  expect(resultadoElement.textContent).toBe("Resultado: 5");
});
