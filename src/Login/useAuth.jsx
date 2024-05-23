// This is a custom hook for handling user authentication in the application.
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { base, loginURL } from "../../api/apiurl";

export const useAuth = () => {
  // State hooks for managing the loading status and authentication errors.
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Create an axios instance with predefined base URL and credentials settings.
  const axiosInstance = axios.create({
    baseURL: base,
    withCredentials: true,
  });

  // Function to handle the login process. It sends a request to the login endpoint with the provided credentials.
  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);
    // Sending a POST request to the login endpoint.
    try {
      const response = await axiosInstance.post(loginURL, {
        username,
        password,
      });
      // On success, store the received token and username in localStorage and navigate to the welcome page.
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("Username", username);
      navigate("/redirectandW", { state: { username } });
    } catch (error) {
      // In case of an error, set the error state to display the message.
      setError("Error en la autenticación");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // The hook returns the login function, loading status, and any error message to be used by the components.
  return { login, isLoading, error };
};