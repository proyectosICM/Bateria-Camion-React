import React, { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [userRole, setUserRole] = useState(localStorage.getItem('rol') || ""); // Asignar el valor almacenado en localStorage a userRole
  
    return (
      <UserContext.Provider value={{ userRole, setUserRole }}>
        {children}
      </UserContext.Provider>
    );
  }
  
//No usado