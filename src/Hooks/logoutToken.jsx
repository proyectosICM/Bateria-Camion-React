import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function LogoutToken() { // Cambiar el nombre a "LogoutToken"
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // Renderizado del componente
  return null;
}
