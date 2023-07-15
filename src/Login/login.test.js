import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { Login } from "./login";


jest.mock("axios");

describe("Login", () => {
  test("renders component and performs login", async () => {
    // Mock the API response
    const responseData = { token: "mockToken", Username: "mockUser" };
    axios.post.mockResolvedValueOnce({ data: responseData });

    // Render the component
    render(<Login />);

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText("Usuario"), {
      target: { value: "mockUser" },
    });
    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "mockPassword" },
    });

    // Submit the form
    fireEvent.click(screen.getByText("Iniciar sesión"));

    // Wait for the API request to resolve
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith("/login", {
        username: "mockUser",
        pass_tra: "mockPassword",
      });
    });

    // Assert that the login was successful
    expect(screen.getByText("Accedio")).toBeInTheDocument();
    expect(localStorage.getItem("token")).toBe("mockToken");
    expect(localStorage.getItem("Username")).toBe("mockUser");
  });

  test("renders component and shows login error", async () => {
    // Mock the API response to simulate an error
    axios.post.mockRejectedValueOnce(new Error("Authentication error"));

    // Render the component
    render(<Login />);

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText("Usuario"), {
      target: { value: "mockUser" },
    });
    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "mockPassword" },
    });

    // Submit the form
    fireEvent.click(screen.getByText("Iniciar sesión"));

    // Wait for the API request to resolve
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith("/login", {
        username: "mockUser",
        pass_tra: "mockPassword",
      });
    });

    // Assert that the login error is displayed
    expect(screen.getByText("Error en la autenticacion")).toBeInTheDocument();
    expect(localStorage.getItem("token")).toBe(null);
    expect(localStorage.getItem("Username")).toBe(null);
  });
});
