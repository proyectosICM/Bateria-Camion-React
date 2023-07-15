import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { CamionDetalle } from "./CamionDetalle";

jest.mock("axios");

describe("CamionDetalle", () => {
  beforeEach(() => {
    axios.get.mockClear();
  });

  test("renders component and fetches data", async () => {
    // Mock the API response
    const camionData = { /* mock camion data */ };
    const incidenciasData = { /* mock incidencias data */ };
    axios.get.mockResolvedValueOnce({ data: camionData });
    axios.get.mockResolvedValueOnce({ data: incidenciasData });

    // Render the component
    render(<CamionDetalle idc="1" placa="ABC123" incidencias="/incidencias" />);

    // Wait for the API requests to resolve
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(2);
      expect(axios.get).toHaveBeenCalledWith("/api/camion/1");
      expect(axios.get).toHaveBeenCalledWith("/api/incidencias/1");
    });

    // Assert that the fetched data is rendered
    expect(screen.getByText(`Corriente de arranque ${camionData.corrienteArranque}`)).toBeInTheDocument();
    expect(screen.getByText(`Placa ABC123`)).toBeInTheDocument();
    expect(screen.getByText(`Incidencias sin revisar: ${incidenciasData.length}`)).toBeInTheDocument();
  });
});
