  import React from "react";

  export function Logout(navigate) {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      //console.log(`Clave: ${key}, Valor: ${value}`);
      localStorage.removeItem(`${key}`);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("Username");
    localStorage.removeItem("rol");
    navigate("/login");
  }

